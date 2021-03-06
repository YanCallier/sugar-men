const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        useTarget: req.body.useTarget,
        target: req.body.target,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    console.log(auth);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/filtre/:user_id', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    const profile = await Profile.findOne({
      user: req.params.user_id
    });

    const filteredPosts = [];

    for (post of posts) {
      let positionPush = false;
      if (
        post.target &&
        post.target.positions &&
        post.target.positions[profile.position]
      ) {
        positionPush = true;
      }

      let quantityPush = false;
      if (
        post.target &&
        post.target.quantities &&
        post.target.quantities[profile.quantity]
      ) {
        quantityPush = true;
      }

      if (
        post.useTarget === 'false' ||
        quantityPush ||
        positionPush ||
        post.user.toString() === req.params.user_id
      ) {
        filteredPosts.push(post);
      }
    }

    res.json(filteredPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
//@access   Privates
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status('404').json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status('404').json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
//@access   Privates
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status('404').json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status('401').json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msd: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status('404').json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access   Privates
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res
        .status('400')
        .json({ msg: 'This post is already liked by this user' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access   Privates
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res
        .status('400')
        .json({ msg: 'This post is not liked by this user' });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a post
// @access   Privates
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status('404').json({ msg: 'Comment not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status('401').json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status('404').json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;

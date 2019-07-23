const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "Il n'y a pas de profile pour cet utilisateur" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      sugar,
      quantity,
      position,
      compagny,
      website,
      location,
      status,
      skills,
      twitter,
      youtube,
      facebook,
      linkedin,
      instagram
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (compagny) profileFields.compagny = compagny;
    if (sugar) profileFields.sugar = sugar;
    if (quantity) profileFields.quantity = quantity;
    if (position) profileFields.position = position;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/profile
// @desc     Save a friend request
// @access   Private
router.put('/friendRequest/:userId/:friendId', async (req, res) => {
  try {
    if (req.params.userId === req.params.friendId) {
      return res.status(200).json({
        msg:
          "Vous voulez être amis avec vous même ? C'est mignon :-) mais un peu flippant aussi."
      });
    }

    let profile = await Profile.findOne({ user: req.params.friendId });

    if (!profile) {
      return res.status(400).json({
        msg: "Cet utilisateur n'existe pas ou n'a pas de profile :-/"
      });
    }

    const friends = profile.friends;

    if (friends && friends.indexOf(req.params.userId) !== -1) {
      return res.status(200).json({ msg: 'Vous êtes déjà amis :-)' });
    }

    const waitingFriends = profile.waitingFriends;

    if (waitingFriends && waitingFriends.indexOf(req.params.userId) !== -1) {
      return res.status(200).json({ msg: 'Déjà envoyée :-)' });
    }

    waitingFriends.push(req.params.userId);

    profile = await Profile.findOneAndUpdate(
      { user: req.params.friendId },
      { $set: { waitingFriends: profile.waitingFriends } },
      { new: true }
    );

    return res.json({ msg: "C'est envoyé :-)" });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        msg: "Cet utilisateur n'existe pas ou n'a pas de profile :-/"
      });
    }

    res.status(500).send({ msg: 'Erreur serveur' });
  }
});

// @route    POST api/profile
// @desc     update friend and waiting friend list
// @access   Private
router.put('/updateFriends/:userId/:friendId/:waiting', async (req, res) => {
  try {
    let userProfile = await Profile.findOne({ user: req.params.userId });
    let friendProfile = await Profile.findOne({ user: req.params.friendId });

    if (req.params.waiting === 'waiting') {
      const waitingFriends = friendProfile.waitingFriends;
      waitingFriends.splice(req.params.userId);

      friendProfile = await Profile.findOneAndUpdate(
        { user: req.params.friendId },
        { $set: { waitingFriends: friendProfile.waitingFriends } },
        { new: true }
      );
    } else {
      const userFriends = userProfile.friends;

      if (userFriends.indexOf(req.params.friendId) !== -1) {
        userFriends.splice(req.params.friendId);
      } else {
        userFriends.push(req.params.friendId);
      }

      userProfile = await Profile.findOneAndUpdate(
        { user: req.params.userId },
        { $set: { friends: userFriends } },
        { new: true }
      );

      friendFriends = friendProfile.friends;

      if (friendFriends.indexOf(req.params.userId) !== -1) {
        friendFriends.splice(req.params.userId);
      } else {
        friendFriends.push(req.params.userId);
      }

      friendProfile = await Profile.findOneAndUpdate(
        { user: req.params.friendId },
        { $set: { friends: friendFriends } },
        { new: true }
      );

      return res.json({ msg: 'Mise à jour effctuée' });
    }
    return;
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        msg: "Cet utilisateur n'existe pas ou n'a pas de profile :-/"
      });
    }

    res.status(500).send({ msg: 'Erreur serveur' });
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete user, profile and posts
// @access   Privates

router.delete('/', auth, async (req, res) => {
  try {
    // remove user posts
    await Post.deleteMany({ user: req.user.id });

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

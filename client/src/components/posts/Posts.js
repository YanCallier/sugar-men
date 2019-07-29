import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading }, auth: { user } }) => {
  useEffect(() => {
    if (user) getPosts(user._id);
  }, [getPosts]);

  if (loading) {
    if (user) getPosts(user._id);
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className='text-primary large'>Parlons en ...</h1>
      <p className='lead'>Bienvenue chez toi</p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);

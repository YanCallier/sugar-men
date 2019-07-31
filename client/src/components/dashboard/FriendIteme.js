import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { friendsProfiles, updateFriends } from '../../actions/profile';

const FriendItem = ({
  updateFriends,
  friendsProfiles,
  friend,
  user,
  allFriendsProfiles,
  waiting
}) => {
  useEffect(() => {
    friendsProfiles(friend);
  }, [friendsProfiles, friend]);

  if (!allFriendsProfiles) return <Spinner />;

  const profile = allFriendsProfiles[friend];

  if (!profile) return <Spinner />;
  const endFriendRequest = accept => {
    updateFriends(user, friend, 'waiting');
    if (accept) updateFriends(user, friend);
  };

  const {
    status,
    user: { avatar, name }
  } = profile;

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img small-img' />
      <Link to={'/profile/' + friend} className='btn'>
        <strong>{name}</strong> {status}
      </Link>
      {!waiting && (
        <div>
          <Link to={'/chat'} className='btn btn-dark'>
            {/* <Link to={'/chat/' + user + '/' + friend} className='btn btn-dark'> */}
            Chat
          </Link>
          <button
            className='btn btn-dark'
            onClick={() => updateFriends(user, friend)}
          >
            Rompre
          </button>
        </div>
      )}
      {waiting && (
        <div>
          <button
            className='btn btn-dark'
            onClick={() => endFriendRequest(true)}
          >
            Yes !
          </button>{' '}
          <button
            className='btn btn-dark'
            onClick={() => endFriendRequest(false)}
          >
            Nop
          </button>
        </div>
      )}
    </div>
  );
};

FriendItem.propTypes = {
  friendsProfiles: PropTypes.func.isRequired,
  updateFriends: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allFriendsProfiles: state.profile.friendsProfiles
});

export default connect(
  mapStateToProps,
  { friendsProfiles, updateFriends }
)(FriendItem);

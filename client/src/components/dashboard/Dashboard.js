import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import FriendIteme from './FriendIteme';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [displayFriends, toggleFriends] = useState(false);

  if (loading && profile === null) return <Spinner />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {/* // # JSX Expression : Condition on the fly with the logical operator && */}
        <i className='fas fa-user' /> Bienvenue, {user && user.name}
      </p>
      {profile && (
        <Fragment>
          <div className='dash-buttons'>
            <Link to='edit-profile' className='btn btn-light'>
              <i className='fas fa-user-circle text-primary' /> Edit Profile
            </Link>
            <div
              onClick={() => toggleFriends(!displayFriends)}
              className='btn btn-light btn-large'
            >
              <i className='fas fa-user-friends text-primary' /> Voir les amis
            </div>
            <Link to='add-education' className='btn btn-light'>
              <i className='fas fa-graduation-cap text-primary' /> Add Education
            </Link>
          </div>

          {displayFriends && (
            <Fragment>
              <h2 className='my-1'>Amis</h2>
              {(!profile.friends || profile.friends.length === 0) && (
                <div>Haha vous n'avez pas d'amis</div>
              )}
              {profile.friends &&
                user &&
                profile.friends.length > 0 &&
                profile.friends.map(friend => (
                  <FriendIteme key={friend} friend={friend} user={user._id} />
                ))}
            </Fragment>
          )}

          {profile.waitingFriends &&
            profile.waitingFriends.length > 0 &&
            profile.waitingFriends.map(waitingFriend => (
              <Fragment key={waitingFriend}>
                <h2 className='my-1'>Ils aimeraient bien être votre ami :</h2>
                <FriendIteme
                  key={waitingFriend}
                  friend={waitingFriend}
                  user={user._id}
                  waiting={true}
                />
              </Fragment>
            ))}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete my account
            </button>
          </div>
        </Fragment>
      )}
      {!profile && (
        <Fragment>
          <p>
            Vous n'avez pas encore de profile, pouvez vous en créer un pour nous
            donner votre vision des choses ?
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Créer un profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);

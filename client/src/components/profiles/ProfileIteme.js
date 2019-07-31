import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { friendRequest } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileIteme = ({
  profile: {
    user: { _id, name, avatar },
    status
  },
  auth,
  friendRequest
}) => {
  const friendCheck = () => {
    friendRequest(_id, auth.user._id);
  };

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{status && <span>{status}</span>}</p>
        <Link to={'/profile/' + _id} className='btn btn-primary my-1'>
          Voir cette personne
        </Link>
        {auth.isAuthenticated && !auth.loading && auth.user._id !== _id && (
          <div className='btn btn-dark' onClick={friendCheck}>
            Demander en ami
          </div>
        )}
      </div>
    </div>
  );
};

ProfileIteme.propTypes = {
  profile: PropTypes.object.isRequired,
  friendRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { friendRequest }
)(ProfileIteme);

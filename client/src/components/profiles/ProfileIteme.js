import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileIteme = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{status && <span>{status}</span>}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={'/profile/' + _id} className='btn btn-primary my-1'>
          Voir cette personne
        </Link>
      </div>
    </div>
  );
};

ProfileIteme.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileIteme;

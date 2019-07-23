import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  const [displayFriends, toggleFriends] = useState(false);

  return (
    <div className='dash-buttons'>
      <Link to='Modifier le profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <div
        onClick={() => toggleFriends(!displayFriends)}
        className='btn btn-light btn-large'
      >
        <i className='fab fa-black-tie text-primary' /> Voir les amis
      </div>
      <Link to='add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>

      {displayFriends && (
        <Fragment>
          <div>yes</div>
        </Fragment>
      )}
    </div>
  );
};

export default DashboardActions;

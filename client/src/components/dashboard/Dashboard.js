import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
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

  //return loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>;

  // if (loading && profile === null) {
  //   return <Spinner />;
  // } else {
  //   return <Fragment>test</Fragment>;
  // }

  if (loading && profile === null) return <Spinner />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {/* // # JSX Expression : Condition on the fly with the logical operator && */}
        <i className='fas fa-user' /> welcome {user && user.name}
      </p>
      {profile && (
        <Fragment>
          <DashboardActions />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete my account
            </button>
          </div>
        </Fragment>
      )}
      {!profile && (
        <Fragment>
          <p>You don't have a profile yet, please add some infos</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Creat Profile
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

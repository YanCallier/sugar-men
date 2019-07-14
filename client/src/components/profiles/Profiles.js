import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileIteme';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h1 className='large text-primary'>Buveurs de café</h1>
      <p className='lead'>
        <i className='fas fa-coffe' /> Aller voir les autres
      </p>
      <div className='profiles'>
        {profiles.length > 0 &&
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        {!profiles.length > 0 && <h4> Il n'y a personne</h4>}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);

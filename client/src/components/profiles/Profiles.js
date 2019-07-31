import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileIteme';
import { getProfiles, getProfilesByStatus } from '../../actions/profile';

const Profiles = ({
  getProfiles,
  getProfilesByStatus,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [filter, changeFilter] = useState('');

  const onChange = value => {
    changeFilter(value);
    if (value === '') {
      getProfiles();
    } else {
      getProfilesByStatus(value);
    }
  };

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <h1 className='large text-primary'>Les sucreurs</h1>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          // chatMessage(text);
          //addPost(formData);
        }}
      >
        <div className='form-group'>
          <select
            name='filter'
            value={filter}
            onChange={e => onChange(e.target.value)}
          >
            <option value=''>Filtrer par status</option>
            <option value='sugar user (warrior)'>sugar user (warrior)</option>
            <option value='sugar user (dodger)'>sugar user (dodger)</option>
            <option value='sugar user (invisible)'>
              sugar user (invisible)
            </option>
            <option value='sugar lover (warrior)'>sugar lover (warrior)</option>
            <option value='sugar lover (dodger)'>sugar lover (dodger)</option>
            <option value='sugar lover (invisible)'>
              sugar lover (invisible)
            </option>
            <option value='sugar addict (warrior)'>
              sugar addict (warrior)
            </option>
            <option value='sugar addict (dodger)'>sugar addict (dodger)</option>
            <option value='sugar addict (invisible)'>
              sugar addict (invisible)
            </option>
            <option value='no-sugar (pacifist)'>no-sugar (pacifist)</option>
            <option value='no-sugar (intolerant)'>no-sugar (intolerant)</option>
            <option value='no-sugar (nazi)'>no-sugar (nazi)</option>
          </select>
        </div>
        {/* <input type='submit' className='btn btn-dark my-1' value='Rechercher' /> */}
      </form>
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
  getProfilesByStatus: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, getProfilesByStatus }
)(Profiles);

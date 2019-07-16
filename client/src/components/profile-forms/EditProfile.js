import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    sugar: '',
    position: '',
    quantity: '',
    location: '',
    status: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    // for (var data in formData) {
    //   if (profile && profile[data]) {
    //     console.log(profile[data]);
    //     setFormData({ [data]: profile[data] });
    //   }
    // }
    // if (profile && profile.location) {
    //   setFormData({ ...formData, location: profile.location });
    // }
    // if (profile && profile.status) {
    //   setFormData({ ...formData, status: profile.status });
    // }

    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      sugar: loading || !profile.sugar ? '' : profile.sugar,
      position: loading || !profile.position ? '' : profile.position,
      quantity: loading || !profile.quantity ? '' : profile.quantity,
      status: loading || !profile.status ? '' : profile.status
    });
  }, [loading, getCurrentProfile]);

  const {
    sugar,
    position,
    quantity,
    location,
    status,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const onChange = e => {
    formData[e.target.name] = e.target.value;

    var calcStatus;
    calcStatus = formData.sugar;
    if (formData.sugar === 'sugar') calcStatus += ' ' + formData.quantity;
    calcStatus += ' (' + formData.position + ')';
    formData.status = calcStatus;

    setFormData({ ...formData });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> {status}
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='sugar' value={sugar} onChange={e => onChange(e)}>
            <option value='0'>
              Préférez-vous mettre du sucre dans votre café ?
            </option>
            <option value='sugar'>Oui</option>
            <option value='no-sugar'>Non</option>
          </select>
        </div>
        {sugar === 'sugar' && (
          <Fragment>
            <div className='form-group'>
              <select
                name='quantity'
                value={quantity}
                onChange={e => onChange(e)}
              >
                <option value='0'>Combien ?</option>
                <option value='user'>1</option>
                <option value='lover'>2</option>
                <option value='addict'>Plus de 2</option>
              </select>
            </div>
            <div className='form-group'>
              <select
                name='position'
                value={position}
                onChange={e => onChange(e)}
              >
                <option value='0'>
                  Avez-vous déjà menti sur vos préférences ?
                </option>
                <option value='warrior'>
                  Jamais ! Ou peut-être une fois dans un moment de faiblesse...
                </option>
                <option value='dodger'>
                  De temps en temps, par exemple face à votre boss ou votre
                  belle mère
                </option>
                <option value='invisible'>Tout le temps !</option>
              </select>
            </div>
          </Fragment>
        )}
        {sugar === 'no-sugar' && (
          <div className='form-group'>
            <select
              name='position'
              value={position}
              onChange={e => onChange(e)}
            >
              <option value='0'>Comment voyez vous ceux qui en prenne ?</option>
              <option value='pacifist'>Chacun ses goûts</option>
              <option value='intolerant'>Ce n'est pas respecter le café</option>
              <option value='nazi'>Ce sont des sous-hommes</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
        )}
        {/* <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div> */}

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));

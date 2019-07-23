import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    sugar: '',
    position: '',
    quantity: ''
  });

  const { sugar, position, quantity, status } = formData;

  const changeSugar = e => {
    formData.quantity = '';
    formData.position = '';
    onChange(e);
  };

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
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Créez votre profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> {status && <Fragment>{status}</Fragment>}
        {!status && (
          <Fragment>
            Créez votre profile pour participer à la communauté sugra-men !
          </Fragment>
        )}
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <small>Préférez-vous mettre du sucre dans votre café ?</small>
          <select name='sugar' value={sugar} onChange={e => changeSugar(e)}>
            <option value=''>
              Préférez-vous mettre du sucre dans votre café ?
            </option>
            <option value='sugar'>Oui</option>
            <option value='no-sugar'>Non</option>
          </select>
        </div>
        {sugar === 'sugar' && (
          <Fragment>
            <div className='form-group'>
              <small>Combien ?</small>
              <select
                name='quantity'
                value={quantity}
                onChange={e => onChange(e)}
              >
                <option value=''>Combien ?</option>
                <option value='user'>1</option>
                <option value='lover'>2</option>
                <option value='addict'>Plus de 2</option>
              </select>
            </div>
            <div className='form-group'>
              <small>Avez-vous déjà menti sur vos préférences ?</small>
              <select
                name='position'
                value={position}
                onChange={e => onChange(e)}
              >
                <option value=''>
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
            <small>Comment voyez vous ceux qui en prenne ?</small>
            <select
              name='position'
              value={position}
              onChange={e => onChange(e)}
            >
              <option value=''>Comment voyez vous ceux qui en prenne ?</option>
              <option value='pacifist'>Chacun ses goûts</option>
              <option value='intolerant'>Ce n'est pas respecter le café</option>
              <option value='nazi'>Ce sont des sous-hommes</option>
            </select>
          </div>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));

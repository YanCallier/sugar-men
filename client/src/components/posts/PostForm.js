import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { brown, grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PrimaryCheckbox = withStyles({
  root: {
    color: brown[200],
    '&$checked': {
      color: grey[800]
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />);

const PostForm = ({ addPost }) => {
  // const [text, setText] = useState('');
  const [displayPostForm, togglePostForm] = useState(false);
  const [useTarget, toggleTarget] = useState(true);
  const [displaySugar, toggleSugar] = useState(false);
  const [displayNoSugar, toggleNoSugar] = useState(false);

  const [formData, setFormData] = useState({
    text: '',
    useTarget: useTarget,
    target: {
      positions: {},
      quantities: {}
    }
  });

  const {
    text,
    target: {
      positions: {},
      quantities: {}
    }
  } = formData;

  const openNewForm = () => {
    setText('');
    formData.target.positions = {};
    formData.target.quantities = {};
    formData.useTarget = true;
    setFormData({ ...formData });
    if (!useTarget) toggleTarget(!useTarget);
    if (displaySugar) toggleSugar(!displaySugar);
    if (displayNoSugar) toggleNoSugar(!displayNoSugar);
    togglePostForm(!displayPostForm);
  };

  const setTarget = (targetType, value) => {
    let target = formData.target[targetType];

    if (!target[value]) target[value] = true;
    else target[value] = false;

    setFormData({ ...formData });
  };

  const setText = text => {
    formData.text = text;
    setFormData({ ...formData });
  };

  const checkAll = () => {
    formData.target.positions = {};
    formData.target.quantities = {};

    if (displaySugar) toggleSugar(!displaySugar);
    if (displayNoSugar) toggleNoSugar(!displayNoSugar);

    toggleTarget(!useTarget);
    formData.useTarget = !useTarget;

    setFormData({ ...formData });
  };

  const checkSugar = () => {
    formData.target.positions.warrior = false;
    formData.target.positions.doger = false;
    formData.target.positions.invisible = false;
    formData.target.quantities = {};
    setFormData({ ...formData });

    toggleSugar(!displaySugar);
  };

  const checkNoSugar = () => {
    formData.target.positions.pacifist = false;
    formData.target.positions.intolerant = false;
    formData.target.positions.nazi = false;
    setFormData({ ...formData });

    toggleNoSugar(!displayNoSugar);
  };

  return (
    <div className='post-form'>
      <div onClick={() => openNewForm()} className='btn btn-light btn-large'>
        <i className='fas fa-pencil-alt text-dark' /> Nouveau sujet
      </div>
      {displayPostForm && (
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            addPost(formData);
            togglePostForm(!displayPostForm);
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Créer une discussion'
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <div className='my flex-between'>
            <div className='text-dark text-center'>
              <h1>
                Diffusion <i className='fas fa-bullhorn' />
              </h1>
            </div>
            <div className='mx-2'>
              <FormControlLabel
                control={
                  <PrimaryCheckbox
                    name='toutlemonde'
                    value='toutlemonde'
                    onChange={() => checkAll()}
                    inputProps={{
                      'aria-label': 'primary checkbox'
                    }}
                  />
                }
                label='Tout le monde'
              />
            </div>
            {useTarget && (
              <Fragment>
                <div className='mx-2'>
                  <FormControlLabel
                    control={
                      <PrimaryCheckbox
                        name='sugar'
                        value='sugar'
                        onChange={() => checkSugar()}
                        inputProps={{
                          'aria-label': 'primary checkbox'
                        }}
                      />
                    }
                    label='Sugar'
                  />
                  {displaySugar && (
                    <div className='flex'>
                      <div>
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='user'
                              value='user'
                              onChange={() => setTarget('quantities', 'user')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='User'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='lover'
                              value='lover'
                              onChange={() => setTarget('quantities', 'lover')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Lover'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='addict'
                              value='addict'
                              onChange={() => setTarget('quantities', 'addict')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Addict'
                        />
                        <br />
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='warrior'
                              value='warrior'
                              onChange={() => setTarget('positions', 'warrior')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Warrior'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='doger'
                              value='doger'
                              onChange={() => setTarget('positions', 'doger')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Doger'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='invisible'
                              value='invisible'
                              onChange={() =>
                                setTarget('positions', 'invisible')
                              }
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Invisible'
                        />
                        <br />
                      </div>
                    </div>
                  )}
                </div>
                <div className='mx-2'>
                  <FormControlLabel
                    control={
                      <PrimaryCheckbox
                        name='no-sugar'
                        value='no_sugar'
                        onChange={() => checkNoSugar()}
                        inputProps={{
                          'aria-label': 'primary checkbox'
                        }}
                      />
                    }
                    label='No-sugar'
                  />
                  {displayNoSugar && (
                    <div className='flex'>
                      <div>
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='pacifist'
                              value='pacifist'
                              onChange={() =>
                                setTarget('positions', 'pacifist')
                              }
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Pacifist'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='intolerant'
                              value='intolerant'
                              onChange={() =>
                                setTarget('positions', 'intolerant')
                              }
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Intolerant'
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <PrimaryCheckbox
                              name='nazi'
                              value='nazi'
                              onChange={() => setTarget('positions', 'nazi')}
                              inputProps={{
                                'aria-label': 'primary checkbox'
                              }}
                            />
                          }
                          label='Nazi'
                        />
                        <br />
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            )}
          </div>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      )}
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);

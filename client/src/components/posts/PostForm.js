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
  const [text, setText] = useState('');
  const [displayPostForm, togglePostForm] = useState(false);
  const [useTarget, toggleTarget] = useState(true);
  const [displaySugar, toggleSugar] = useState(false);
  const [displayNoSugar, toggleNoSugar] = useState(false);

  let target = ({
    positions: {},
    quantities: {}
  } = useState());

  const updateQuantity = value => {
    if (!target.quantities[value]) target.quantities[value] = true;
    else target.quantities[value] = false;
    console.log(target);
  };

  return (
    <div className='post-form'>
      <div
        onClick={() => togglePostForm(!displayPostForm)}
        className='btn btn-light btn-large'
      >
        <i className='fas fa-pencil-alt text-dark' /> Nouveau sujet
      </div>
      {displayPostForm && (
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            if (!useTarget) target = false;
            console.log(target);
            //addPost({ text });
            setText('');
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
                    onChange={() => toggleTarget(!useTarget)}
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
                        onChange={() => toggleSugar(!displaySugar)}
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
                              onChange={() => updateQuantity('user')}
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
                        onChange={() => toggleNoSugar(!displayNoSugar)}
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

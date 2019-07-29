import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const URL = 'ws://localhost:3000';

const Chat = props => {
  const ws = new WebSocket(URL);

  return (
    <Fragment>
      <div className='flex'>
        <h1 className='large text-primary'>
          <i class='fas fa-comments' />{' '}
        </h1>
        <p className='lead'>Conversation privée avec ...,</p>
      </div>
      <div className='chat' />
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          //addPost(formData);
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Expression libre'
          //   value={text}
          // onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </Fragment>
  );
};

Chat.propTypes = {};

export default Chat;

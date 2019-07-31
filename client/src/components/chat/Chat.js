import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Chat = ({ match, auth: { socket, user } }) => {
  useEffect(() => {
    if (socket) {
      socket.emit('openChat', match.params.friendId);
      socket.on('chatFriend', user => {
        setChatFriend(user);
      });
      socket.emit('chatMessage', {
        payload: {
          text: 'Chat ouvert',
          authorId: user._id,
          authorName: user.name,
          friendId: match.params.friendId
        }
      });
      socket.on('conversationUpdate', conversation => {
        setMessages(conversation);
      });
    }
  }, [socket]);

  const [chatFriend, setChatFriend] = useState({});
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const chatMessage = text => {
    setText('');
    socket.emit('chatMessage', {
      payload: {
        text: text,
        authorId: user._id,
        authorName: user.name,
        friendId: match.params.friendId
      }
    });
  };

  return (
    <Fragment>
      <div className='flex'>
        <h1 className='large text-primary'>
          <i className='fas fa-comments' />{' '}
        </h1>
        <p className='lead'>
          Conversation privée avec <strong>{chatFriend.name}</strong>
        </p>
      </div>
      <div className='chat'>
        {messages.map(message => (
          <p key={messages.indexOf(message)}>
            <strong>{message.author} : </strong>
            {message.text}
          </p>
        ))}
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          chatMessage(text);
          //addPost(formData);
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Expression libre'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Envoyer' />
      </form>
    </Fragment>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapeStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapeStateToProps,
  {}
)(Chat);

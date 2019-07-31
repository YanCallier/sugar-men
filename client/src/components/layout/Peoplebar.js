import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SugarItem from './SugarItem';
import { getOnlinePeople } from '../../actions/socketPeople';

const Peoplebar = ({ auth: { isAuthenticated, loading, socket, user } }) => {
  useEffect(() => {
    if (socket) {
      socket.emit('needPeople');

      socket.on('onlinePeople', users => {
        setOnlinePeople([]);
        for (let user in users) {
          setOnlinePeople([...onlinePeople, users[user]]);
        }
        console.log(onlinePeople);
      });
      socket.on('incomingMessage', id => {
        if (window.location.pathname !== '/chat/' + id) {
          socket.emit('unviewMessage', id);
        }
      });
      socket.on('updateUnviewMessages', unviewMessages => {
        setUnviewMessages(unviewMessages);
      });
    }
  }, [socket]);

  const [onlinePeople, setOnlinePeople] = useState([]);
  const [unviewMessages, setUnviewMessages] = useState({});

  const removeUnviewMessages = id => {
    if (socket) {
      socket.emit('removeUnviewMessages', id);
    }
  };

  return (
    <Fragment>
      {onlinePeople && onlinePeople.length > 0 && (
        <Fragment>
          <div className='peoplebar bg-dark'>
            <h2>
              <i className='fas fa-user-astronaut' />
              <span className='hide-sm '> Online</span>
            </h2>
            {onlinePeople.map(sugarnaute => (
              <Link
                to={'/chat/' + sugarnaute.id}
                key={sugarnaute.id}
                className='flex'
                onClick={() => removeUnviewMessages(sugarnaute.id)}
              >
                <SugarItem sugarnaute={sugarnaute} />
                {unviewMessages[sugarnaute.id] && (
                  <i className='fas fa-comment-dots mx' />
                )}
                {/* {unviewMessages[sugarnaute.id].  <i className='fas fa-comment-dots mx' /> }{' '}
                 */}
              </Link>
            ))}
            <h2>
              <i className='fas fa-chevron-up' />
            </h2>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Peoplebar.propTypes = {
  auth: PropTypes.object.isRequired,
  getOnlinePeople: PropTypes.func.isRequired
};

const mapeStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapeStateToProps,
  { getOnlinePeople }
)(Peoplebar);

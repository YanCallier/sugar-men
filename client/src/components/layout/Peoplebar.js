import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SugarItem from './SugarItem';
import { getOnlinePeople } from '../../actions/socketPeople';

const Peoplebar = ({
  // getOnlinePeople
  auth: { isAuthenticated, loading, socket }
}) => {
  useEffect(() => {
    if (socket) {
      socket.emit('needPeople');
      socket.on('onlinePeople', users => {
        for (let user in users) {
          setOnlinePeople([...onlinePeople, users[user]]);
          // setOnlinePeople(onlinePeople.push(user));
        }
        console.log('useEffect');
        // test(users);
      });
    }
  }, [socket]);

  const [onlinePeople, setOnlinePeople] = useState([]);
  //const onlinePeople = [];
  // const test = users => {
  //   for (let user in users) {
  //     onlinePeople.push(user);
  //   }
  // };

  // if (socket) {
  //   socket.emit('needPeople');
  //   socket.on('onlinePeople', users => {
  //     for (let user in users) {
  //       onlinePeople.push(user);
  //     }
  //   });
  // }
  console.log(onlinePeople);

  return (
    <Fragment>
      {onlinePeople && (
        <Fragment>
          <div className='peoplebar bg-dark'>
            <h2>
              <i className='fas fa-user-astronaut' /> Online
            </h2>
            {onlinePeople.map(sugarnaute => (
              <SugarItem key={sugarnaute.name} sugarnaute={sugarnaute} />
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

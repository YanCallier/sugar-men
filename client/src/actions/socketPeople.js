import { GET_ONLINE_PEOPLE } from './types';

export const getOnlinePeople = ({ auth: { socket } }) => async dispatch => {
  console.log(socket);
  // try {

  //   socket.emit('hello', res.data);

  //   dispatch({
  //     type: USER_LOADED,
  //     payload: res.data
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: AUTH_ERROR
  //   });
  // }
};

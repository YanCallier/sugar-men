import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  FRIEND_REQUEST,
  FRIENDS_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

// get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get all profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get profile by id
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get('/api/profile/user/' + userId);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or Update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`api/profile`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (edit) dispatch(setAlert('Profile Updated', 'success'));
    else {
      dispatch(setAlert('Profile Créé', 'success'));
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const friendRequest = (friendId, userId) => async dispatch => {
  try {
    const res = await axios.put(
      'api/profile/friendRequest/' + userId + '/' + friendId
    );

    dispatch({
      type: FRIEND_REQUEST,
      payload: res.data
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get friends id
export const friendsProfiles = userId => async dispatch => {
  try {
    const res = await axios.get('/api/profile/user/' + userId);
    const wrapInObjectData = {};
    wrapInObjectData[res.data.user._id] = res.data;

    dispatch({
      type: FRIENDS_PROFILES,
      payload: wrapInObjectData
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateFriends = (friendId, userId, waiting) => async dispatch => {
  try {
    const res = await axios.put(
      'api/profile/updateFriends/' + userId + '/' + friendId + '/' + waiting
    );

    dispatch({
      type: FRIEND_REQUEST,
      payload: res.data
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure ? This can NOT be undone')) {
    try {
      await axios.delete('api/profile');

      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: ACCOUNT_DELETED
      });
      dispatch(setAlert('Your account had been deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

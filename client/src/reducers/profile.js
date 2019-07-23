import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  FRIEND_REQUEST,
  FRIENDS_PROFILES
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  friendsProfiles: {},
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case FRIENDS_PROFILES:
      return {
        ...state,
        friendsProfiles: { ...state.friendsProfiles, ...payload },
        loading: false
      };
    case FRIEND_REQUEST:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}

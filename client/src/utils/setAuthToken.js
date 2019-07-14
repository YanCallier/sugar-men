import axios from 'axios';
// # axios : used to dialog with backend, perform http request as promise, make a global header as below.

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['authentication-token'] = token;
  } else {
    delete axios.defaults.headers.common['authentication-token'];
  }
};

export default setAuthToken;

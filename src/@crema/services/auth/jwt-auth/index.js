import axios from 'axios';

console.log('On hit');
const jwtAxios = axios.create({
  // baseURL: 'https://crema-mongo-api.herokuapp.com/api/', // YOUR_API_URL HERE
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api/'
      : 'https://agilewater.vercel.app/api', // YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    // delete jwtAxios.defaults.headers.common['Authorization'];
    jwtAxios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
  }
};

export default jwtAxios;

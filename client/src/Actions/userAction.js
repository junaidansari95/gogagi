import axios from 'axios';

export const getUsers = () => dispatch => {
  dispatch({ type: 'GET_ALL_USERS_REQUEST' })
  axios.get('http://localhost:3000//api/v1/users/')
    .then(result => {
      dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: result.data.data })
    })
    .catch(err => {
      dispatch({ type: 'GET_ALL_USERS_FAILURE', payload: err.response.data })
    });
};
export const addUser = (data) => dispatch => {
  dispatch({ type: 'ADD_NEW_USER_REQUEST' })
  axios.post('http://localhost:3000//api/v1/users/', data)
    .then(result => {
      dispatch({ type: 'ADD_NEW_USER_SUCCESS', payload: result.data.data })
      dispatch(getUsers())
    })
    .catch(err => {
      dispatch({ type: 'ADD_NEW_USER_FAILURE', payload: err.response.data })
    });
};
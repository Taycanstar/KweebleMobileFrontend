import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  CLEAR_ERROR,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  FETCH_USER_DATA,
  FETCH_SCOPE_DATA,
} from '../constants/actionTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token', token);

    let userData = null;
    let strUserData = await AsyncStorage.getItem('user_data');

    if (strUserData) {
      userData = JSON.parse(strUserData);
    }

    // if (token !== null) {
    //   console.log('token fetched');
    // }

    dispatch({
      type: LOGIN,
      payload: token,
    });

    if (userData) {
      //
      dispatch({
        type: FETCH_USER_DATA,
        payload: userData,
      });
    }
  };
};

export const Signup = (
  name,
  email,
  password,
  college,
  username,
  birthYear,
  birthMonth,
  birthDay,
  gender,
  blockedUsers,
  followers,
  following,
) => {
  return async dispatch => {
    try {
      let token = null;

      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/register',
        {
          name,
          email,
          password,
          college,
          username,
          birthYear,
          birthMonth,
          birthDay,
          gender,
          blockedUsers,
          followers,
          following,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // console.log(res);

      if (res && res.data && res.data.token) {
        token = res.data.token;
        await AsyncStorage.setItem('token', token);
      }

      dispatch({
        type: LOGIN,
        payload: token,
      });
    } catch (error) {
      console.log(' user already exists in signup');
      dispatch({
        type: SIGNUP_ERROR,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_SIGNUP_ERROR,
        });
      }, 3500);
      return error;
    }
  };
};

export const Login = (username, email, password) => {
  return async dispatch => {
    try {
      let token = null;

      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/login',
        {username, email, password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // then, it is backend problem, not react native

      if (res && res.data && res.data.token) {
        token = res.data.token;
        // console.log(token, '<===token');
        const userData = await axios.get(
          'https://kweeble.herokuapp.com/auth/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${res.data.token}`,
            },
          },
        );

        dispatch({
          type: FETCH_USER_DATA,
          payload: userData.data,
        });

        let strUserData = JSON.stringify(userData.data);
        await AsyncStorage.setItem('user_data', strUserData);

        await AsyncStorage.setItem('token', token);
      }

      dispatch({
        type: LOGIN,
        payload: token,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 3500);
      return error;
    }
  };
};

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: LOGOUT,
    });
  };
};

export const updateUser = editDetails => {
  return async dispatch => {
    try {
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.put(
        'https://kweeble.herokuapp.com/auth',
        editDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: FETCH_USER_DATA,
        payload: res.data,
      });
      // console.log(res.data, '<======success update');
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const updateUsername = (username, id) => {
  return async dispatch => {
    try {
      const res = await axios.put(
        `https://kweeble.herokuapp.com/api/${id}`,
        username,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      dispatch({
        type: FETCH_USER_DATA,
        payload: res.data,
      });
      // console.log(res.data, '<======success update username');
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const updateUserPhoto = formData => {
  return async dispatch => {
    try {
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/photo',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: FETCH_USER_DATA,
        payload: res.data,
      });
      // console.log(res.data, '<======success update');
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const updateScope = (editDetails, id) => {
  return async dispatch => {
    try {
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.put(
        `https://kweeble.herokuapp.com/scopes/${id}`,
        editDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: FETCH_SCOPE_DATA,
        payload: res.data,
      });
      // console.log(res.data, '<======success update');
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

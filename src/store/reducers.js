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

const initialState = {
  authToken: null,
  userData: {},
  anyData: [],
  scopeData: {},
  loginError: false,
  signupError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loginError: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: true,
      };
    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        signupError: false,
      };
    case FETCH_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case FETCH_SCOPE_DATA:
      return {
        ...state,
        scopeData: action.payload,
      };
    case 'APPS.INCREMENT':
      return {
        ...state,
        apps: {
          ...state.apps,
          notificationCount: state.apps.notificationCount + 1,
        },
      };

    case 'APPS.DECREMENT':
      return {
        ...state,
        apps: {
          ...state.apps,
          notificationCount: state.apps.notificationCount - 1,
        },
      };
    default:
      return state;
  }
};

//import { login, logout, errorLogin } from '../actions/types';


import { login,logout, errorLogin, FETCH_FACTORIES_BEGIN, FETCH_FACTORIES_SUCCESS, FETCH_FACTORIES_FAILURE } from '../actions/types';

const initialState = {
userdetails: {},
factories: []
};

const statisticsReducer = (state = initialState, action) => {
  switch(action.type) {
    case login:
    if(action.data.message)
    {
      return {
        ...state,
        errormessage: action.data.message, userdetails: ''
      };

    }
    else {
      return {
        ...state,
        errormessage: '', userdetails:  action.data
      };
    }

    case errorLogin:
    return {
      ...state,
      errormessage: action.message
    };
    case logout :
    return {
      ...state,
      errormessage: '', userdetails:  ''
    };

    case FETCH_FACTORIES_BEGIN :
    return {
      ...state,
      factories: []
    };
    case FETCH_FACTORIES_SUCCESS:
    return {
      ...state,
      factories: action.payload
    };
    case FETCH_FACTORIES_FAILURE:
    return {
      ...state,
      factories: []
    };
    default:
      return state;
  }
}

export default statisticsReducer;

//import { login, logout, errorLogin } from '../actions/types';


import { login,logout, errorLogin,
  FETCH_FACTORIES_BEGIN, FETCH_FACTORIES_SUCCESS, FETCH_FACTORIES_FAILURE,
  FETCH_FACTORIES_DETAILS_BEGIN, FETCH_FACTORIES_DETAILS_SUCCESS, FETCH_FACTORIES_DETAILS_FAILURE,
  SET_SELECTED_ITEM,
  FETCH_MARKETS_BEGIN, FETCH_MARKETS_SUCCESS, FETCH_MARKETS_FAILURE
} from '../actions/types';

const initialState = {
userdetails: {},
factories: [],
factory: {statistics: {}},
selectedItem: null,
markets: []
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
    case SET_SELECTED_ITEM:
    return {
      ...state,
      selectedItem: action.selectedItem
    }
    case FETCH_MARKETS_BEGIN:
    case FETCH_MARKETS_FAILURE:
    return {
      ...state,
      markets: []
    };
    case FETCH_MARKETS_SUCCESS:
    return {
      ...state,
      markets: action.payload
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

    case FETCH_FACTORIES_DETAILS_BEGIN :
    return {
      ...state,
      factory: {statistics: {}}
    };
    case FETCH_FACTORIES_DETAILS_SUCCESS:
    return {
      ...state,
      factory: action.payload
    };
    case FETCH_FACTORIES_DETAILS_FAILURE:
    return {
      ...state,
      factory: {statistics: {}}
    };
    default:
      return state;
  }
}

export default statisticsReducer;

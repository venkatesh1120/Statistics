import { combineReducers } from 'redux';
import placeReducer from './placeReducer';

const AppReducer = combineReducers({
  sample: placeReducer,
});

export default AppReducer;

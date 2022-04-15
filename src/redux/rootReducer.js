import {combineReducers} from 'redux';
import GIFReducer from './reducers/GIFReducer';

const rootReducer = combineReducers({
  gifs: GIFReducer,
});

export default rootReducer;

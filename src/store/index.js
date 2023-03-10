import {createStore, combineReducers, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';

const RootReducers = combineReducers({
  Reducers,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));

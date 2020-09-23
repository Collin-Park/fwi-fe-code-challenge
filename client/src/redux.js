import rootReducer from './appState/index';
import { createStore } from 'redux';

const initialState = {
  pagination: { category: '', direction: '', size: 4, from: '' },
};

export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

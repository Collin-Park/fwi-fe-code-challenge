import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';
import pagination from './pagination';

export default combineReducers({
  playerIds,
  players,
  pagination,
});

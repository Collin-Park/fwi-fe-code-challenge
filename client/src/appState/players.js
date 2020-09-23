import { FETCH_PLAYERS_SUCCESS } from './constants';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach((player) => {
    player.imageUrl = player.imageUrl.replace(/-/g, ''); //pravatar doesnt seem to support strings with dashes anymore
    newState[player.id] = player;
  });
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    default:
      return state;
  }
}

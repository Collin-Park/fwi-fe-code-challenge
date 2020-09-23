import { FETCH_PLAYERS_SUCCESS } from './constants';
import axios from 'axios';

export function fetchPlayersSuccess(data) {
  console.log('data', data);
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export async function fetchPlayers(dispatch) {
  const response = await axios.get('http://localhost:3001/players', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = response?.data;
  console.log(data);
  dispatch(fetchPlayersSuccess(data));
}

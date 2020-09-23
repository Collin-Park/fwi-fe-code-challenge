import { FETCH_PLAYERS_SUCCESS } from './constants';
import axios from 'axios';

export function fetchPlayersSuccess(data) {
  console.log('data', data);
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export async function fetchSortedPlayers(dispatch, category, direction) {
  if (!category) return;
  const response = await axios.get(
    `http://localhost:3001/players?sortBy=${category}&sortOrder=${direction}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const data = response?.data;
  dispatch(fetchPlayersSuccess(data));
}

export async function fetchPlayers(dispatch) {
  const response = await axios.get('http://localhost:3001/players', {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = response?.data;
  dispatch(fetchPlayersSuccess(data));
}

import {
  FETCH_PLAYERS_SUCCESS,
  PAGINATION_CATEGORY_DIRECTION,
} from './constants';
import axios from 'axios';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function setPagination(data) {
  return { type: PAGINATION_CATEGORY_DIRECTION, payload: { data } };
}

export async function fetchPlayersWithParams(
  dispatch,
  category = '',
  direction = '',
  size = '',
  from = ''
) {
  const response = await axios.get(
    `http://localhost:3001/players?sortBy=${category}&sortOrder=${direction}&size=${size}&from=${from}`,
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

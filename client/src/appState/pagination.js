import {
  PAGINATION_CATEGORY_DIRECTION,
  FETCH_PLAYERS_SUCCESS,
} from './constants';

const mergeFromRequest = (state, data) => {
  let newState;
  newState = { ...state, ...data };
  return newState;
};

const mergeFromFetch = (state, data) => {
  const { size, from, ...dataToPull } = data;
  let newState;
  newState = { ...state, ...dataToPull };
  return newState;
};

export default function pagination(state = {}, action) {
  switch (action.type) {
    case PAGINATION_CATEGORY_DIRECTION:
      return mergeFromRequest(state, action.payload.data);
    case FETCH_PLAYERS_SUCCESS:
      return mergeFromFetch(state, action.payload.data);
    default:
      return state;
  }
}

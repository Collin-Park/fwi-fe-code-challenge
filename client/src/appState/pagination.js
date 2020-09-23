import {
  PAGINATION_CATEGORY_DIRECTION,
  FETCH_PLAYERS_SUCCESS,
} from './constants';

const mergePaginationData = (state, data, constant) => {
  const { size, from, ...dataToPull } = data;
  let newState;
  if (constant == PAGINATION_CATEGORY_DIRECTION) {
    newState = { ...state, ...data };
  } else {
    newState = { ...state, ...dataToPull };
  }
  return newState;
};

export default function pagination(state = {}, action) {
  switch (action.type) {
    case PAGINATION_CATEGORY_DIRECTION:
      return mergePaginationData(
        state,
        action.payload.data,
        PAGINATION_CATEGORY_DIRECTION
      );
    case FETCH_PLAYERS_SUCCESS:
      return mergePaginationData(
        state,
        action.payload.data,
        FETCH_PLAYERS_SUCCESS
      );
    default:
      return state;
  }
}

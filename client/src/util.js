import { fetchPlayersWithParams, setPagination } from './appState/actions';
import { baseUrl } from './constants';
import axios from 'axios';

const createPlayer = (createPlayerParams) => {
  const {
    dataToSend,
    dispatch,
    category,
    direction,
    size,
    from,
    setCompleted,
    history,
  } = createPlayerParams;
  axios
    .post(`${baseUrl}/players`, dataToSend)
    .then(() => {
      fetchPlayersWithParams(dispatch, category, direction, size, from);
      setCompleted('Success! Redirecting . . .');
      setTimeout(() => {
        history.push('/');
      }, 3000);
    })
    .catch((err) => {
      console.log('failure', err);
      setCompleted('Sorry something went wrong, pleae try again later');
      setTimeout(() => {
        history.push('/');
      }, 3000);
    });
};

const updatePlayer = (updatePlayerParams) => {
  const {
    dataToSend,
    dispatch,
    category,
    direction,
    size,
    from,
    id,
    handleClose,
  } = updatePlayerParams;

  axios
    .patch(`${baseUrl}/players/${id}`, dataToSend)
    .then((data) => {
      fetchPlayersWithParams(dispatch, category, direction, size, from);
      handleClose();
    })
    .catch((err) => {
      console.log('failure', err);
    });
};
const deletePlayer = (deletePlayerParams) => {
  const { dispatch, category, direction, size, from, id } = deletePlayerParams;

  axios
    .delete(`${baseUrl}/players/${id}`)
    .then(() => {
      fetchPlayersWithParams(dispatch, category, direction, size, from);
    })
    .catch((err) => {
      console.log('failure', err);
    });
};

export const apiCalls = { createPlayer, updatePlayer, deletePlayer };

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const toggleSort = (toggleInput) => {
  const {
    stringMatch,
    text,
    dispatch,
    paginationState,
    category,
    setDirection,
  } = toggleInput;
  const { from, size } = paginationState;
  if (
    text.includes(stringMatch) &&
    (text.includes('↕') || text.includes('↑'))
  ) {
    dispatch(setPagination({ category, direction: 'desc' }));
    fetchPlayersWithParams(dispatch, category, 'desc', size, from);
    switch (stringMatch) {
      case 'Player':
        setDirection(['↓', '↕', '↕']);
        break;
      case 'Winnings':
        setDirection(['↕', '↓', '↕']);
        break;
      case 'Native':
        setDirection(['↕', '↕', '↓']);
        break;
      default:
        break;
    }
  } else if (text.includes(stringMatch)) {
    dispatch(setPagination({ category, direction: 'asc' }));
    fetchPlayersWithParams(dispatch, category, 'asc', size, from);
    switch (stringMatch) {
      case 'Player':
        setDirection(['↑', '↕', '↕']);
        break;
      case 'Winnings':
        setDirection(['↕', '↑', '↕']);
        break;
      case 'Native':
        setDirection(['↕', '↕', '↑']);
        break;
      default:
        break;
    }
  }
};

export const calculateNewNumbers = (size, total, active) => {
  let minPage = 1;
  let maxPage = Math.ceil(total / size);
  if (maxPage <= 5) return [minPage, maxPage];
  else if (maxPage > 5 && active < 3) return [1, 5];
  else if (maxPage - active < 3) return [maxPage - 4, maxPage];
  else return [active - 2, active + 2];
};

export const getPlayers = (state) => {
  return state?.playerIds?.map((id) => state?.players[id]);
};

import { fetchPlayersWithParams, setPagination } from './appState/actions';

export const toggleSort = (
  stringMatch,
  text,
  dispatch,
  paginationState,
  category,
  setDirection
) => {
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

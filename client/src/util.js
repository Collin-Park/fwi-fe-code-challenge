import { fetchSortedPlayers } from './appState/actions';

export const toggleSort = (
  stringMatch,
  text,
  dispatch,
  category,
  setDirection
) => {
  if (
    text.includes(stringMatch) &&
    (text.includes('↕') || text.includes('↑'))
  ) {
    fetchSortedPlayers(dispatch, category, 'desc');
    switch (stringMatch) {
      case 'Player':
        setDirection(['↓', '↕', '↕']);
        break;
      case 'Winnings':
        setDirection(['↕', '↓', '↕']);
        break;
      case 'Native':
        setDirection(['↕', '↕', '↓']);
      default:
        break;
    }
  } else if (text.includes(stringMatch)) {
    fetchSortedPlayers(dispatch, category, 'asc');
    switch (stringMatch) {
      case 'Player':
        setDirection(['↑', '↕', '↕']);
        break;
      case 'Winnings':
        setDirection(['↕', '↑', '↕']);
        break;
      case 'Native':
        setDirection(['↕', '↕', '↑']);
      default:
        break;
    }
  }
};

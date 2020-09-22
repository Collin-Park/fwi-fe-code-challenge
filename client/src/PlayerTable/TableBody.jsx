import React from 'react';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import Player from './Player';
const TableBody = ({ players }) => {
  return (
    <table
      id="player-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
        {players.map(({ id, name, country, winnings, imageUrl }) => (
          <Player key={id} props={{ id, name, country, winnings, imageUrl }} />
        ))}
      </tbody>
    </table>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;

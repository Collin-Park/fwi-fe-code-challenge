import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import PaginationBottom from '../Pagination/PaginationBottom';
import PaginationTop from '../Pagination/PaginationTop';
// import Player from './Player';
const Player = React.lazy(() => import('./Player'));
const TableBody = ({ players }) => {
  return (
    <>
      <table
        id="player-table-body"
        role="presentation"
        className="table table--body"
      >
        <tbody>
          <PaginationTop />
          {Array.isArray(players) ? (
            players.map(({ id, name, country, winnings, imageUrl }) => (
              <Suspense
                key={id}
                fallback={
                  <tr>
                    <td>Loading . . .</td>
                  </tr>
                }
              >
                <Player props={{ id, name, country, winnings, imageUrl }} />
              </Suspense>
            ))
          ) : (
            <div />
          )}
        </tbody>
      </table>
      <PaginationBottom />
    </>
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersWithParams } from '../appState/actions';
import { getPlayers } from '../util';
import './PlayerTable.scss';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const WrappedPlayerTable = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);
  const { category = '', direction = '', size = '', from = '' } = pagination;
  const players = useSelector(getPlayers);

  useEffect(() => {
    fetchPlayersWithParams(dispatch, category, direction, size, from);
  }, [dispatch, category, direction, size, from]);

  return (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <TableHeader />
      <TableBody players={players} />
    </div>
  );
};

const PlayerTable = React.memo(WrappedPlayerTable);
export default PlayerTable;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlayers } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const getPlayers = (state) => {
  console.log(state);
  // return state.players
  return state.playerIds.map((id) => state.players[id]);
};

const WrappedPlayerTable = () => {
  console.log('upper');
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPlayers(dispatch);
  }, [dispatch]);

  const players = useSelector(getPlayers);
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

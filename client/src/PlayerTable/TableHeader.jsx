import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSort } from '../util';

const TableHeader = () => {
  const paginationState = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const [direction, setDirection] = useState(['↕', '↕', '↕']);

  const SortEvent = (e) => {
    const target = e.target;
    const text = target.innerText;
    const category = target.getAttribute('data-id');
    toggleSort(
      'Player',
      text,
      dispatch,
      paginationState,
      category,
      setDirection
    );
    toggleSort(
      'Winnings',
      text,
      dispatch,
      paginationState,
      category,
      setDirection
    );
    toggleSort(
      'Native',
      text,
      dispatch,
      paginationState,
      category,
      setDirection
    );
  };

  return (
    <table
      id="player-table-header"
      role="presentation"
      className="table table--fixed"
    >
      <thead>
        <tr role="row">
          <th role="columnheader" className="table__header table__avatar" />
          <th
            role="columnheader"
            className="table__header table__player text-nowrap"
            data-id="name"
            onClick={SortEvent}
          >
            Player {direction[0]}
          </th>
          <th
            role="columnheader"
            className="table__header table__winnings text-nowrap"
            data-id="winnings"
            onClick={SortEvent}
          >
            Winnings {direction[1]}
          </th>
          <th
            role="columnheader"
            className="table__header table__native text-nowrap"
            data-id="country"
            onClick={SortEvent}
          >
            Native of {direction[2]}
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default TableHeader;

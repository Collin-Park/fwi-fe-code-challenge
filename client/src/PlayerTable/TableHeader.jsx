import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSortedPlayers } from '../appState/actions';
import { toggleSort } from '../util';
// const toggleSort = (stringMatch,text,dispatch,category,setDirection) =>{
//   if(text.includes(stringMatch)&&(text.includes("↕")||text.includes("↑"))){
//     fetchSortedPlayers(dispatch,category,"desc")
//     switch (stringMatch) {
//       case "Player":
//         setDirection(["↓","↕","↕"])
//         break;
//       case "Winnings":
//         setDirection(["↕","↓","↕"])
//         break;
//       case "Native":
//         setDirection(["↕","↕","↓"])
//         default:
//       break;
//     }
//   }
//   else if(text.includes(stringMatch)){
//     fetchSortedPlayers(dispatch,category,"asc")
//     switch (stringMatch) {
//       case "Player":
//         setDirection(["↑","↕","↕"])
//         break;
//       case "Winnings":
//         setDirection(["↕","↑","↕"])
//         break;
//       case "Native":
//         setDirection(["↕","↕","↑"])
//         default:
//       break;
//     }
//   }
// }

const TableHeader = () => {
  const dispatch = useDispatch();
  const [direction, setDirection] = useState(['↕', '↕', '↕']);

  const SortEvent = (e) => {
    const target = e.target;
    const text = target.innerText;
    const category = target.getAttribute('data-id');
    toggleSort('Player', text, dispatch, category, setDirection);
    toggleSort('Winnings', text, dispatch, category, setDirection);
    toggleSort('Native', text, dispatch, category, setDirection);
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

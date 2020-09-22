import React from 'react';
import Flags from 'react-world-flags';
import Avatar from '../Avatar';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';

export default function Player({ props }) {
  const { name, country, winnings, imageUrl } = props;
  console.log(name);
  return (
    <tr role="row" className="table__row">
      <td role="gridcell" className="table__avatar">
        <Avatar src={imageUrl} />
      </td>
      <td role="gridcell" className="table__player">
        {name}
      </td>
      <td role="gridcell" className="table__winnings">
        {winnings.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td role="gridcell" className="table__native">
        <div className="country">
          <Avatar>
            <Flags code={country} alt="" />
          </Avatar>
          {country}
        </div>
      </td>
    </tr>
  );
}

Player.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

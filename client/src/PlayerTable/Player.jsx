import React, { useState, useEffect } from 'react';
import Flags from 'react-world-flags';
import Avatar from '../Avatar';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import PopupModal from '../PopupModal/PopupModal';

export default function Player({ props }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [winnings, setWinnings] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    setName(props?.name);
    setCountry(props?.country);
    setWinnings(props?.winnings);
    setImageUrl(props?.imageUrl);
    setId(props?.id);
    return () => {};
  }, [props]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr role="row" className="table__row" onClick={handleShow}>
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

      <PopupModal props={{ handleClose, handleShow, show, ...props }} />
    </>
  );
}

Player.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { useState, useEffect } from 'react';
import Flags from 'react-world-flags';
import Avatar from '../Avatar';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import { Modal, Button, Form } from 'react-bootstrap';

export default function Player({ props }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [winnings, setWinnings] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setName(props?.name);
    setCountry(props?.country);
    setWinnings(props?.winnings);
    setImageUrl(props?.imageUrl);
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

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Full Name"
              defaultValue={name}
            />
            <br />
            <Form.Label>Winnings</Form.Label>
            <Form.Control
              type="text"
              placeholder="winnings amount"
              defaultValue={winnings.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            />
            <br />
            <Form.Control size="sm" type="text" placeholder="Small text" />
            <Form>
              <Form.File id="custom-file" label="Custom file input" custom />
            </Form>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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

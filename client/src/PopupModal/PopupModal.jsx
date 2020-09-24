import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import FormInput from '../FormInput/FormInput';

export default function PopupModal({ props }) {
  const { show, country, handleClose, name, winnings, id, imageUrl } = props;
  props = { name, winnings, id, imageUrl, country, handleClose };
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modify Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput props={props} />
      </Modal.Body>
    </Modal>
  );
}

PopupModal.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
  }).isRequired,
};

import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { COUNTRIES, baseUrl } from '../constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from '../appState/actions';

const renderCountries = () => {
  let countryArray = Object.values(COUNTRIES)?.sort();
  return countryArray.map((x, _) => {
    return <option key={x + _}>{x}</option>;
  });
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const schema = yup.object({
  name: yup.string().required(),
  winnings: yup.number().positive().integer().required(),
  country: yup.string().required(),
  imageUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?(i.pravatar.cc\/)[a-z0-9]+(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
});

export default function FormInput({ props }) {
  const dispatch = useDispatch();
  const { name, winnings, country, id, imageUrl } = props;
  const countryLong = COUNTRIES[country];

  if (id) {
    schema.fields.imageUrl._exclusive.matches = true;
  }

  const submitForm = (e) => {
    const { country, winnings, name, imageUrl } = e;
    const countryShort = getKeyByValue(COUNTRIES, country);
    const winningsInt = Number(winnings);
    const dataToSend = {
      country: countryShort,
      winnings: winningsInt,
      name,
      imageUrl,
    };
    if (id) {
      console.log(dataToSend);
      //do patch
      axios
        .patch(`${baseUrl}/players/${id}`, dataToSend)
        .then((data) => {
          console.log('success', data);
          fetchPlayers(dispatch);
        })
        .catch((err) => {
          console.log('failure', err);
        });
    } else {
      //do create
      axios
        .post(`${baseUrl}/players`, dataToSend)
        .then((data) => {
          console.log('success', data);
          fetchPlayers(dispatch);
        })
        .catch((err) => {
          console.log('failure', err);
        });
    }
  };

  const deletePlayer = () => {
    var result = window.confirm(
      'Are you sure you want to delete? Data cannot be retrieved once deleted!'
    );
    if (result) {
      console.log('yes');
      axios
        .delete(`${baseUrl}/players/${id}`)
        .then((data) => {
          console.log('success', data);
          fetchPlayers(dispatch);
        })
        .catch((err) => {
          console.log('failure', err);
        });
      //Logic to delete the item
    } else {
      console.log('no');
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => submitForm(e)}
      initialValues={{
        name,
        winnings,
        country: countryLong,
        imageUrl,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                isValid={touched.name && !errors.name}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02">
              <Form.Label>Winnings*</Form.Label>
              <Form.Control
                type="text"
                name="winnings"
                value={values.winnings}
                onChange={handleChange}
                isInvalid={!!errors.winnings}
                isValid={touched.winnings && !errors.winnings}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Country*</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={values.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
                isValid={touched.country && !errors.country}
                onBlur={handleBlur}
              >
                {renderCountries()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik04">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={values.imageUrl}
                onChange={handleChange}
                isInvalid={!!errors.imageUrl}
                isValid={touched.imageUrl && !errors.imageUrl}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type="submit">Submit form</Button>
          {id ? (
            <Button
              onClick={deletePlayer}
              className="float-right"
              variant="danger"
            >
              Delete
            </Button>
          ) : null}
          <Form.Row className="ml-1">*required</Form.Row>
        </Form>
      )}
    </Formik>
  );
}

FormInput.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number,
    imageUrl: PropTypes.string,
  }),
};

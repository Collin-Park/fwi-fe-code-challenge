import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { apiCalls, getKeyByValue } from '../util';
import { useHistory } from 'react-router-dom';
import { formInputSchema } from '../schema';

const schema = formInputSchema;

export default function FormInput({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const { name, winnings, country, id, imageUrl, handleClose } = props;
  const countryLong = COUNTRIES[country];
  const pagination = useSelector((state) => state.pagination);
  const { category = '', direction = '', size = '', from = '' } = pagination;
  const hasId = !!id;

  if (hasId) {
    schema.fields.imageUrl._exclusive.matches = true;
  }

  const submitForm = (submissionProps) => {
    const { country, winnings, name, imageUrl } = submissionProps;
    const countryShort = getKeyByValue(COUNTRIES, country);
    const winningsInt = Number(winnings);
    const dataToSend = {
      country: countryShort,
      winnings: winningsInt,
      name,
      imageUrl,
    };
    if (hasId) {
      const updatePlayerParams = {
        dataToSend,
        dispatch,
        category,
        direction,
        size,
        from,
        id,
        handleClose,
      };
      apiCalls.updatePlayer(updatePlayerParams);
    } else {
      const createPlayerParams = {
        dataToSend,
        dispatch,
        category,
        direction,
        size,
        from,
        setCompleted,
        history,
      };
      apiCalls.createPlayer(createPlayerParams);
    }
  };

  const handleDeletePlayer = () => {
    var result = window.confirm(
      'Are you sure you want to delete? Data cannot be retrieved once deleted!'
    );
    if (result) {
      const deletePlayerParams = {
        dispatch,
        category,
        direction,
        size,
        from,
        id,
      };
      apiCalls.deletePlayer(deletePlayerParams);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => submitForm(e)}
      onBlur
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
        <>
          <Form
            className={completed ? 'd-none' : ''}
            noValidate
            onSubmit={handleSubmit}
          >
            {id ? null : <h1>Create a New Player</h1>}
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
                <Form.Label>
                  Image URL{hasId ? <span>*</span> : null}
                </Form.Label>
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
            {hasId ? (
              <Button
                onClick={handleDeletePlayer}
                className="float-right"
                variant="danger"
              >
                Delete
              </Button>
            ) : null}
            <Form.Row className="ml-1">*required</Form.Row>
          </Form>
          <h1 className={`display-2 text-center ${completed ? '' : 'd-none'}`}>
            {completed}
          </h1>
        </>
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

const renderCountries = () => {
  let countryArray = Object.values(COUNTRIES)?.sort();
  return countryArray.map((x, _) => {
    return <option key={x + _}>{x}</option>;
  });
};

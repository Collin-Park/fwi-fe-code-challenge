import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../constants';

const renderCountries = () => {
  let countryArray = Object.values(COUNTRIES)?.sort();
  return countryArray.map((x, _) => {
    return <option key={x + _}>{x}</option>;
  });
};

const schema = yup.object({
  name: yup.string().required(),
  winnings: yup.number().positive().integer().required(),
  country: yup.string().required(),
  imageUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
});

export default function FormInput({ props }) {
  const name = props?.name;
  const winnings = props?.winnings;
  const country = props?.country;
  const id = props?.id;
  const imageUrl = props?.imageUrl;
  const countryLong = COUNTRIES[country];
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => {
        console.log(e);
      }}
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

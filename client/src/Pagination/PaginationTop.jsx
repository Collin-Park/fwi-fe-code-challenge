import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination, fetchPlayersWithParams } from '../appState/actions';
import { calculateNewNumbers } from '../util';
import { paginationTopSchema } from '../schema';

const schema = paginationTopSchema;

export default function PaginationTop() {
  const pagination = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const { size, total } = pagination;

  const changePerPage = (e) => {
    const number = calculateNewNumbers(e.perPage, total, 1);
    dispatch(setPagination({ size: e.perPage, active: 1, from: 0, number }));
    const { category, direction, from } = pagination;
    fetchPlayersWithParams(dispatch, category, direction, e.perPage, from);
  };

  return (
    <tr role="row" className="table__row">
      <td className="table__avatar position-relative"></td>
      <td className="table__player">
        <Formik
          className="position-absolute"
          validationSchema={schema}
          onSubmit={(e, dispatch, pagination) => {
            changePerPage(e, dispatch, pagination);
          }}
          initialValues={{
            perPage: size,
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <span className="p-0 m-0 pt-1 mr-2">Number per page:</span>
                <Form.Group className="m-0" controlId="validationFormik10">
                  <Form.Control
                    type="text"
                    name="perPage"
                    value={values.perPage}
                    onChange={handleChange}
                    isInvalid={!!errors.perPage}
                    onBlur={handleBlur}
                    placeholder="per page"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button className="ml-1 btn btn-secondary btn-sm" type="submit">
                  <p className="m-0 p-0 ">Go ></p>
                </Button>
              </Form.Row>
            </Form>
          )}
        </Formik>
      </td>
      <td className="table__winnings"></td>
      <td className="table__native"></td>
    </tr>
  );
}

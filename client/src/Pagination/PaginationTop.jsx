import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination, fetchPlayersWithParams } from '../appState/actions';

const schema = yup.object({
  perPage: yup.number().positive().integer().required(),
});

export default function PaginationTop() {
  const pagination = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const { size, total, active } = pagination;
  const calculateNewNumbers = (size, total, active) => {
    let minPage = 1;
    let maxPage = Math.ceil(total / size);
    if (maxPage <= 5) return [minPage, maxPage];
    else if (maxPage > 5 && active < 3) return [1, 5];
    else if (maxPage - active < 3) return [maxPage - 4, maxPage];
    else return [active - 2, active + 2];
  };
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
                <Button className="btn btn-secondary btn-sm" type="submit">
                  >
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

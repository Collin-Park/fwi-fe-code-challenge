import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { calculateNewNumbers } from '../util';
import { setPagination } from '../appState/actions';

export default function PaginationBottom() {
  const paginationState = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const { active = 1, size, from = 0, total } = paginationState;
  const [items, setItems] = useState(null);

  const handleClick = (e) => {
    const targetNumberString = e?.target?.innerText;
    if (targetNumberString.includes('current')) return;
    const targetNumber = Number(targetNumberString);
    const { size, total } = paginationState;
    const newPaginationNumbers = calculateNewNumbers(size, total, targetNumber);

    dispatch(
      setPagination({
        from: (targetNumber - 1) * size,
        active: targetNumber,
        number: newPaginationNumbers,
      })
    );
  };
  useEffect(() => {
    const number = paginationState.number ?? [1, 5];
    renderPaginationItems(number, active, setItems);
  }, [paginationState.number, active, setItems]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div>
        {from + 1} - {Math.min(Number(from) + Number(size), total)} / {total}
      </div>
      <Pagination onClick={handleClick}>{items}</Pagination>
    </div>
  );
}

const renderPaginationItems = (number = [1, 5], active, setItems) => {
  let items = [];
  for (let i = number[0]; i <= number[1]; i++) {
    items.push(
      <Pagination.Item key={i} active={i === active}>
        {i}
      </Pagination.Item>
    );
  }
  setItems(items);
};

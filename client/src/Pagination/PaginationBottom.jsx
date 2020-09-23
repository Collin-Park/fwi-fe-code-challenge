import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../appState/actions';

export default function PaginationBottom() {
  const paginationState = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const active = paginationState.active ?? 1;
  const [items, setItems] = useState(null);

  const handleClick = (e) => {
    const targetNumberString = e?.target?.innerText;
    if (targetNumberString.includes('current')) return;
    const targetNumber = Number(targetNumberString);
    const { size, total } = paginationState;

    const newNumber = calculateNewNumbers(size, total, targetNumber);

    dispatch(
      setPagination({
        from: (targetNumber - 1) * size,
        active: targetNumber,
        number: newNumber,
      })
    );
  };
  useEffect(() => {
    const number = paginationState.number ?? [1, 5];

    renderPaginationItems(number, active);
  }, [paginationState.number, active]);

  const renderPaginationItems = (number = [1, 5], active) => {
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
  const calculateNewNumbers = (size, total, active) => {
    let minPage = 1;
    let maxPage = Math.ceil(total / size);
    if (maxPage <= 5) return [minPage, maxPage];
    else if (maxPage > 5 && active < 3) return [1, 5];
    else if (maxPage - active < 3) return [maxPage - 4, maxPage];
    else return [active - 2, active + 2];
  };
  return (
    <div className="d-flex justify-content-center">
      <Pagination onClick={handleClick}>{items}</Pagination>
    </div>
  );
}

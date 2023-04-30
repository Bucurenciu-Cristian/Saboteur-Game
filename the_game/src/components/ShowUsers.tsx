import React from 'react';
import Square from '@components/Square';

function ShowUsers({ items, onCardClick }) {
  return (
    <>
      <div className="board-row">
        {items?.hand?.map((item, i) => (
          <Square Card={item} key={i} row={i} column={0} Occupied onClick={() => onCardClick(item, i)} />
        ))}
      </div>
      <br />
    </>
  );
}

export default ShowUsers;

import React from 'react';
import Square from '@components/Square';

function ShowUsers({ items, moveItemToMatrix }: { items; moveItemToMatrix: any; onCardClick: any }) {
  return (
    <>
      <div className="board-row">
        {items?.hand?.map((item, i) => (
          <Square
            Card={item}
            key={i}
            row={i}
            column={0}
            Occupied
            onClick={() => {
              moveItemToMatrix(i, 0, 0);
              console.log(`Locatia cartii din mana este: [${i}]`);
            }}
          />
        ))}
      </div>
      <br />
    </>
  );
}

export default ShowUsers;

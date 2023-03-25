import React, { useMemo } from 'react';
import Square from './Square';
import { IMatrix } from '../Types/DexType';

function ShowBoard({ gameMatrix }: { gameMatrix: IMatrix[][] }) {
  const renderSquareUpdated = (i: number, j: number) => {
    const onClick = () => {
      console.log(`Locatia este: [${i},${j}]`);
    };
    return <Square Card={gameMatrix[i][j].Card} Occupied={gameMatrix[i][j]?.Occupied} onClick={onClick} row={i} column={j} />;
  };

  const memoizedGameMatrix = useMemo(() => gameMatrix, [gameMatrix]);

  const memoizedRenderSquareUpdated = useMemo(() => renderSquareUpdated, [gameMatrix]);

  return (
    <>
      {memoizedGameMatrix.map((row: any[], i) => (
        <div key={i} className="board-row">
          {row.map((column, j) => (
            <div key={`${i}${j}`}>{memoizedRenderSquareUpdated(i, j)}</div>
          ))}
        </div>
      ))}
    </>
  );
}
export default ShowBoard;

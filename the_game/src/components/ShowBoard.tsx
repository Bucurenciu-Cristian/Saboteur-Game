import React, { useMemo } from 'react';
import Square from './Square';
import { IMatrix } from '../Types/DexType';

function ShowBoard({
  gameMatrix,
  onBoardSquareClick,
  validCoordinates, // Add validCoordinates as a prop
}: {
  gameMatrix: IMatrix[][];
  onBoardSquareClick: any;
  validCoordinates: any;
}) {
  const renderSquareUpdated = (i: number, j: number, validCoordinates: any) => {
    const onClick = () => {
      onBoardSquareClick(i, j);
    };
    return (
      <Square
        Card={gameMatrix[i][j]?.Card}
        Occupied={gameMatrix[i][j]?.Occupied}
        onClick={onClick}
        row={i}
        column={j}
        validCoordinates={validCoordinates} // Pass validCoordinates to Square
      />
    );
  };

  const memoizedGameMatrix = useMemo(() => gameMatrix, [gameMatrix]);

  const memoizedRenderSquareUpdated = useMemo(() => renderSquareUpdated, [gameMatrix]);

  return (
    <>
      {memoizedGameMatrix.map((row: any[], i) => (
        <div key={i} className="board-row">
          {row.map((column, j) => (
            <div key={`${i}${j}`}>{memoizedRenderSquareUpdated(i, j, validCoordinates)}</div>
          ))}
        </div>
      ))}
    </>
  );
}

export default ShowBoard;

import React, { useMemo } from 'react';
import Square from './Square';
import { IMatrix } from '../Types/DexType';

function ShowBoard({
  gameMatrix,
  onBoardSquareClick,
  validCoordinates, // Add validCoordinates as a prop
  selectedCard,
  selectedSquare,
}: {
  gameMatrix: IMatrix[][];
  onBoardSquareClick: any;
  validCoordinates: any;
  selectedCard: any;
  selectedSquare: any;
}) {
  const renderSquareUpdated = (i: number, j: number, validCoordinates: any, selectedCard: any) => {
    const onClick = () => {
      onBoardSquareClick(i, j, selectedCard);
    };
    const isCurrentSelectedSquare = i === selectedSquare.row && j === selectedSquare.column;
    const card = gameMatrix[i][j]?.Card;
    const updatedCard = isCurrentSelectedSquare ? { ...card, back: undefined } : card;
    return (
      <Square
        Card={updatedCard}
        Occupied={gameMatrix[i][j]?.Occupied}
        onClick={onClick}
        row={i}
        column={j}
        validCoordinates={validCoordinates} // Pass validCoordinates to Square
        style="square-matrix"
      />
    );
  };

  const memoizedGameMatrix = useMemo(() => gameMatrix, [gameMatrix]);

  const memoizedRenderSquareUpdated = useMemo(() => renderSquareUpdated, [renderSquareUpdated]);
  // useEffect(() => {
  //   console.log('ShowBoard - selectedCard prop changed:', selectedCard);
  // }, [selectedCard]);
  return (
    <>
      {memoizedGameMatrix.map((row: any[], i) => (
        <div key={i} className="board-row">
          {row.map((column, j) => (
            <div key={`${i}${j}`}>{memoizedRenderSquareUpdated(i, j, validCoordinates, selectedCard)}</div>
          ))}
        </div>
      ))}
    </>
  );
}

export default ShowBoard;

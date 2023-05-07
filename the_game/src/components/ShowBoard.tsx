import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
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
        <Row key={i}>
          {row.map((column, j) => (
            <Col xs="auto" className="px-0" key={`${i}${j}`}>
              {memoizedRenderSquareUpdated(i, j, validCoordinates, selectedCard)}
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
}

export default ShowBoard;

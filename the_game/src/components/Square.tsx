import React from 'react';
import Image from 'next/image';
import { Modes } from '@src/enums';
import { Button } from 'react-bootstrap';
import { imageSize } from '@src/variables';

function renderImage(Card, Occupied, row, column, isValidCoordinate) {
  const isRotated = Card?.code && Card.code[1] === Modes.Path && Card.code[7] === Modes.True;
  console.log('isRotated', isRotated);
  if (Occupied) {
    if (Card?.back) {
      return <Image src={Card?.back} width={imageSize.width} height={imageSize.height} alt="BackCard" className="rounded" />;
    }
    return (
      <Image
        src={Card?.src}
        width={imageSize.width}
        height={imageSize.height}
        alt="The rest"
        className={isRotated ? 'rotated-image rounded' : 'rounded'}
      />
    );
  }
  // return (
  //   <p style={{ color: isValidCoordinate ? 'lime' : '' }}>
  //     {row}:{column}
  //   </p>
  // );
  return isValidCoordinate ? <h1 className="text-center text-light">X</h1> : null;
}

function Square({ Card, onClick, Occupied, row, column, validCoordinates, style }) {
  const isValidCoordinate = validCoordinates?.some((coord) => coord.row === row && coord.column === column);
  return (
    <Button
      className={`square d-block lh-1 ${style} px-0 py-0`}
      onClick={onClick}
      variant="outline-dark"
      disabled={validCoordinates && !isValidCoordinate}
    >
      {renderImage(Card, Occupied, row, column, isValidCoordinate)}
    </Button>
  );
}

export default Square;

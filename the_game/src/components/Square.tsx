import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { Modes } from '@src/enums';

function renderImage(Card, Occupied, row, column, isValidCoordinate) {
  const isRotated = Card?.code && Card.code[1] === Modes.Path && Card.code[Card.code.length - 1] === Modes.True;

  if (Occupied) {
    if (Card?.back) {
      return <Image src={Card?.back} quality={10} layout="fill" alt="One of 3 cards" />;
    }
    return <Image src={Card?.src} quality={10} layout="fill" alt="The rest" className={isRotated ? 'rotated-image' : ''} />;
  }
  // return (
  //   <p style={{ color: isValidCoordinate ? 'lime' : '' }}>
  //     {row}:{column}
  //   </p>
  // );
  return isValidCoordinate ? <p style={{ color: 'green' }}>X</p> : null;
}

function Square({ Card, onClick, Occupied, row, column, validCoordinates, style }) {
  const isValidCoordinate = validCoordinates?.some((coord) => coord.row === row && coord.column === column);
  return (
    <Button className={`square ${style}`} onClick={onClick} disabled={validCoordinates && !isValidCoordinate}>
      {renderImage(Card, Occupied, row, column, isValidCoordinate)}
    </Button>
  );
}

export default Square;

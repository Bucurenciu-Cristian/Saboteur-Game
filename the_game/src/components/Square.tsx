import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { imageSize } from '../variables';

function renderImage(Card, Occupied, row, column, isValidCoordinate) {
  if (Occupied) {
    if (Card?.back) {
      return <Image src={Card?.back} quality={10} layout="fill" alt="One of 3 cards" />;
    }
    return <Image src={Card?.src} quality={10} layout="fill" alt="The rest" />;
  }
  return (
    <p style={{ color: isValidCoordinate ? 'lime' : '' }}>
      {row}:{column}
    </p>
  );
  // return isValidCoordinate ? (
  //   <p style={{ color: 'green' }}>
  //     {row}:{column}
  //   </p>
  // ) : null;
}

function Square({ Card, onClick, Occupied, row, column, validCoordinates }) {
  const isValidCoordinate = validCoordinates?.some((coord) => coord.row === row && coord.column === column);
  return (
    <Button className="square" onClick={onClick} width={imageSize.width} height={imageSize.height}>
      {renderImage(Card, Occupied, row, column, isValidCoordinate)}
    </Button>
  );
}

export default Square;

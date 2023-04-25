import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { imageSize } from '../variables';

function renderImage(Card, Occupied, row, column) {
  if (Occupied) {
    if (Card?.back) {
      return <Image src={Card?.back} layout="fill" alt="One of 3 cards" />;
    }
    return <Image src={Card?.src} layout="fill" alt="The rest" />;
  }
  return (
    <p>
      {row}:{column}
    </p>
  );
}

function Square({ Card, onClick, Occupied, row, column }) {
  return (
    <Button className="square" onClick={onClick} width={imageSize.width} height={imageSize.height}>
      {renderImage(Card, Occupied, row, column)}
    </Button>
  );
}

export default Square;

import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

const Square = ({ Card, onClick, Occupied, row, column }) => {
  return (
    <Button
      className="square"
      onClick={onClick}
      // onMouseOver={e => e.target.style.background = 'red'}
      // onMouseLeave={e => e.target.style.background = ''}
      width={50}
      height={100}
    >
      {Occupied &&
        (Card?.back ? <Image src={Card?.back} layout={'fill'} alt="" /> : <Image src={Card?.src} layout={'fill'} alt="" />)}
      {!Occupied && (
        <>
          <p>
            {row}:{column}
          </p>
        </>
      )}
    </Button>
  );
};

export default Square;

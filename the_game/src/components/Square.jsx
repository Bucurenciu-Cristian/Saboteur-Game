import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { imageSize } from '../variables';

function Square({ Card, onClick, Occupied, row, column }) {
  return (
    <Button
      className="square"
      onClick={onClick}
      // onMouseOver={e => e.target.style.background = 'red'}
      // onMouseLeave={e => e.target.style.background = ''}
      width={imageSize.width}
      height={imageSize.height}
    >
      {Occupied &&
        (Card?.back ? (
          <Image src={Card?.back} layout="fill" alt="Yollo" />
        ) : (
          <Image src={Card?.src} layout="fill" alt="Salluut" />
        ))}
      {!Occupied && (
        <p>
          {row}:{column}
        </p>
      )}
    </Button>
  );
}

/*
 * <img src="{&quot;src&quot;:&quot;/_next/static/media/rock.0c291c43.png&quot;,&quot;height&quot;:666,&quot;width&quot;:422,&quot;blurDataURL&quot;:&quot;/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frock.0c291c43.png&amp;w=5&amp;q=70&quot;,&quot;blurWidth&quot;:5,&quot;blurHeight&quot;:8}" alt="">
 * */
export default Square;

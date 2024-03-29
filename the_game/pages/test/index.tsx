import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { allTheCards } from '../../src/BusinessLogic/Logic';
import { imageSize } from '../../src/variables';
import { checkMyCards } from '../../src/BusinessLogic/CheckMyCards';
import { decrement, increment } from '../../redux/Slices/counterSlice';
import { RootState } from '../../redux/store';

function Test() {
  const [cards, setCards] = useState(allTheCards);
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    checkMyCards();
  }, []);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>

      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <h1>Test</h1>
      {cards.map((card, index) => (
        <Fragment key={index}>
          <Image src={card.src} width={imageSize.width} height={imageSize.height} quality={50} alt="random" />
        </Fragment>
      ))}
    </div>
  );
}
export default Test;

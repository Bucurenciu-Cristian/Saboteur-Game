import React, { useEffect } from 'react';
import { checkMyCards } from '@src/BusinessLogic/CheckMyCards';
import Board from '../../src/components/Board';

function Page() {
  useEffect(() => {
    checkMyCards();
  }, []);

  return <Board />;
}

export default Page;

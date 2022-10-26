import React from 'react';

function TsLearning() {
  const Random = Math.round(Math.random() * 500) + 500;
  let startTime = new Date();
  let endTime: Date
  setTimeout(() => {
    endTime = new Date()
    //This isn't working.
    // endTime = 0;
  },Random);
  //In functia de mai jos spun ca a este un numar, b la fel iar functia returneaza tot un numar.
  function add(a: number, b: number = 5 ):number {
    return a + b;
  }

  const result = add(7);
  const age = 12;
  return (
    <div>{age} Salutare din invatare</div>
  );
}

export default TsLearning;

import React from 'react';

function TsLearning() {
  const Random = Math.round(Math.random() * 500) + 500;
  let startTime = new Date();
  let endTime: Date;
  setTimeout(() => {
    endTime = new Date();
    //This isn't working.
    // endTime = 0;
  }, Random);

  //In functia de mai jos spun ca a este un numar, b la fel iar functia returneaza tot un numar.
  function add(a: number, b: number = 5): number {
    return a + b;
  }

  const result = add(7);
  //Dictionar
  const phones: {
    [k: string]:
      | {
          country: string;
          area: string;
          number: string;
        }
      | undefined;
  } = {};
  let country = phones.home?.country;
  //Array
  //Inference is working great here
  const fileExtensions = ['js', 'ts'];
  const cars = [
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2002,
    },
  ];

  //Tuples
  let myCar: [number, string, string];
  myCar = [2002, 'Toyota', 'Corolla'];
  //Acestea 2 sunt gresite.
  // myCar = [2002, "Logan", "Dacia","kicky"]
  // myCar = ["Logan", 2002, "Dacia" ]

  //Aici mai jos poti folosi push si pop pe array

  let numPair: [number, number] = [4, 5];
  numPair.pop();
  numPair.push(6);
  const numPai: readonly [number, number] = [4, 5];
  // numPai.push(6);
  // numPai.
  return <div>Salutare din invatare</div>;
}
// Te salut Kicky
// Acum te joci cu VIM, aici, si merge, de minune.
export default TsLearning;

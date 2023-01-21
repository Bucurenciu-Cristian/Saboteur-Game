//Basic
import {getFips} from "crypto";

export default getFruit = async (name: string) => {
  const fruits = {
    pineapple: '1',
    peach: '1',
    strawberry: '1'
  }
  // @ts-ignore
  return fruits[name];
};
//Equivalent
getFruit2 = (name: string) => {
  const fruits = {
    pineapple: '1',
    peach: '1',
    strawberry: '1'
  }
  // @ts-ignore
  return Promise.resolve(fruits[name]);
};

getFruit('peach')

//Async + await
const makeSmoothie = async ()=> {
    const a =  getFruit('strawberry');
    const b =  getFruit('peach');
  const promise = await Promise.all([a,b]);
  return promise
};
const makeSmoothie3 = async ()=> {
  const a = await getFruit('strawberry');
  const b = await getFruit('peach');
  return [a,b]
};
//Equivalent
// const makeSmoothie2 = () => {
//   let a;
//   return getFruit('pineapple')
//     .then(v => {
//       v = a;
//       return getFruit('strawberry');
//     })
//     .then(v => [v, a]);
// };


const fruits = ['peach', 'pineapple', 'strawberry'];
const smoothie = fruits.map(v => getFruit(v));
const fruitLoop = async () => {
  for await (const number of smoothie) {
    console.log(number);
  }
};
const fruitInspection = async () => {
  if (await getFruit('peach') === '1') {
    console.log('look peachy');

  }
};

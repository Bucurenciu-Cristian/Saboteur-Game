import { useState, useMemo, useCallback } from 'react';

function SortedList({ list, sortFunc }) {
  console.log('SortedList render');

  const sortedList = useMemo(() => {
    console.log('Running sort');
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);

  return <div>{sortedList.join(', ')}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 30]);

  //useMemo(() => {Some Heavy Thing}, [Here we put the dependency: for example, where we read from.])
  /**
   * @type {number}
   * We use numbers in the dependency array because we read from that in the reduce function.
   */
  const total = useMemo(() => numbers.reduce((acc, number) => acc + number, 0), [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = count1 + count2;

  const sortFunc = useCallback((a, b) => a.localeCompare(b) * -1, []);
  const sortFuncAsc = useCallback((a, b) => a.localeCompare(b), []);

  return (
    <>
      <div>Total: {total}</div>
      <div>Names: {names.join(', ')}</div>
      <SortedList list={names} sortFunc={sortFunc} />
      <SortedList list={names} sortFunc={sortFuncAsc} />
      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </>
  );
}

export default App;

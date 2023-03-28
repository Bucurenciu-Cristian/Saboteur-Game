import React from 'react';
import { useMachine } from '@xstate/react';
import preparationMachine from '../../src/Types/Xstate/Back-end/PreparationGame';
import parentMachine from '../../src/Types/Xstate/Back-end/main-back-machine';

// if (typeof window !== 'undefined') {
//   inspect({
//     /* options */
//     iframe: false,
//   });
// }

function SaboteurGame() {
  const [state, send] = useMachine(preparationMachine, { devTools: true });
  const [state2, send2] = useMachine(parentMachine, { devTools: true });
  const handleStartPreparation = () => {
    send('DONE');
  };
  // useEffect(() => {
  //   console.log(state.context);
  // }, [state.context]);
  return (
    <div>
      <div>
        <h1>Child Comp</h1>
        <p>Current context: {JSON.stringify(state.context)}</p>
        <p>Current state: {state.value}</p>
        {state.matches('preparationComplete') ? (
          <p>Preparation is complete!</p>
        ) : (
          <button onClick={handleStartPreparation}>Start Preparation</button>
        )}
        {state.done && <p>Done processing!</p>}
      </div>
      <div>
        <h1>Parent Comp</h1>
        <p>Current state: {state2.value}</p>
        {state2.done && <p>Done processing!</p>}
      </div>
    </div>
  );
}

export default SaboteurGame;

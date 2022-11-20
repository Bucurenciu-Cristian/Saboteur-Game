// import usePokemon from "../../src/components/State/Context";
import StateUsePage from "../../src/components/State/useState";
import StatusUseReducer from "../../src/components/State/useReducer";
import StatusUseEffect from "../../src/components/State/useEffect";
const App = () => {
  // const {pokemon} = usePokemon();

  return (<div>
    {/*{JSON.stringify(pokemon)}*/}
    {/*<StateUsePage />*/}
    {/*<StatusUseReducer/>*/}
    <StatusUseEffect/>
  </div>);
};
export default App;

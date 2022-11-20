// import usePokemon from "../../src/components/State/Context";
import StateUsePage from "../../src/components/State/useState";
import StatusUseReducer from "../../src/components/State/useReducer";
import StatusUseEffect from "../../src/components/State/useEffect";
import StatusUseMemo from "../../src/components/State/useMemo";
const RenderLine = () => <><br/><hr/><br/></>
const App = () => {
  // const {pokemon} = usePokemon();

  return (<div>
    {/*{JSON.stringify(pokemon)}*/}

    <RenderLine/>
    <StateUsePage />
    <RenderLine/>
    <StatusUseReducer/>
    <RenderLine/>
    <StatusUseEffect/>
    <RenderLine/>
    <StatusUseMemo/>
  </div>);
};
export default App;

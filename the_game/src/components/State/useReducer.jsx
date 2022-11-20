import {useReducer} from "react";

function UserForm() {
    const [state, dispatch] = useReducer(
        (state, action) => ({
            ...state,
            ...action,
        }),
        {
            first: "",
            last: "",
            nickname: ""
        }
    );
    return (
        <div>
            <input
                type="text"
                value={state.first}
                onChange={(e) => dispatch({first: e.target.value})}
            />
            <input
                type="text"
                value={state.last}
                onChange={(e) => dispatch({last: e.target.value})}
            />
            <input
                type="text"
                value={state.nickname}
                onChange={(e) => dispatch({nickname: e.target.value})}
            />
            <div>First: {state.first}</div>
            <div>Last: {state.last}</div>
            <div>Nickname: {state.nickname}</div>
        </div>
    );
}

function NameList() {
    const setname = "SET_NAME";
    const addname = "ADD_NAME";
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case setname:
                    return {...state, name: action.payload};
                case addname:
                    return {
                        ...state,
                        names: [...state.names, state.name],
                        name: "",
                    };
            }
        },
        {
            names: [],
            name: "",
        }
    );
    
    return (
        <div className="App">
            <div>
                {state.names.map((name, index) => (
                    <div key={index}>{name}</div>
                ))}
            </div>
            <input
                type="text"
                value={state.name}
                onChange={(e) =>
                    dispatch({type: setname, payload: e.target.value})
                }
            />
            <button onClick={() => dispatch({type: addname})}>Add Name</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <UserForm/>
            <NameList/>
        </div>
    );
}

export default App;

import {useState} from "react";

// function Page(){
//
//     const [count, setCount] = useState(10);
//
//     function addOne() {
        // count++, nu merge din cauza ca nu ii spui la react, rerandeaza asta pt mine, doar prin setCount poti face asta.
//         setCount(count + 1);
//     }
//
//     return <div className="App">
//         <button onClick={addOne}>{count}</button>
//         count = {count}
//     </div>
// }

function Page() {
    const [nameList, setNameList] = useState(["Ioana", "Markus", "Kicky"]);
    const [name, setName] = useState("");
    
    
    //If you have a complex function for initialization, you can do this.
    // const [name, setName] = useState(() => "Jack");
    
    function addName(e) {
        setName(e.target.value);
    }
    
    function addNameToArray() {
        setNameList([...nameList, name]);
        setName("");
    }
    
    return <div>
        <ol>
            {nameList.map(item => <li key={item}>{item}</li>)}
        </ol>
        <input type="text" value={name} onChange={addName}/>
        <h1>{name}</h1>
        <button onClick={addNameToArray}>Add Name</button>
    </div>;
}

export default Page;

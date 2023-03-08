import React, {useState} from 'react';
import ShowBoard from "./ShowBoard";
import {InitialMatrix} from "../BusinessLogic/GameEngine/Matrix";

const Board = () => {
    const [matrix] = useState(InitialMatrix);
    return (
        <div>
            <ShowBoard gameMatrix={matrix}/>
        </div>
    );
};

export default Board;

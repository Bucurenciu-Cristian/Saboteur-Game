import React, {useEffect, useState} from 'react';
import Square from "./Square";
import ShowBoard from "./ShowBoard";
import Image from "next/image";
import {Cards} from "./Cards";

const useBeginningMatrix = () => {
    const rowsFromMatrix = 5;
    const columnsFromMatrix = 9;
    //TODO La ultimul fill trebuie sa introduci un obiect gol de tipul pe care il vei gandi mai tarziu.
    const [matrix, setMatrix] = useState(Array(rowsFromMatrix).fill().map(() => Array(columnsFromMatrix).fill(null)));
    const start = <Image key={1} src={Cards[0]} layout={"fill"}/>;
    const goal = <Image key={1} src={Cards[1]} layout={"fill"}/>;
    const rock = <Image key={1} src={Cards[2]} layout={"fill"}/>;
    const rock1 = <Image key={1} src={Cards[3]} layout={"fill"}/>;
    const copyOfMatrix = [...matrix];
    //TODO Aici trebuie sa ajungi sa faci cu setMatrix, nu direct cu Matrix[x][y]
    copyOfMatrix[rowsFromMatrix - 3][rowsFromMatrix - 5] = start;
    copyOfMatrix[rowsFromMatrix - 5][columnsFromMatrix - 1] = rock;
    copyOfMatrix[rowsFromMatrix - 3][columnsFromMatrix - 1] = goal;
    copyOfMatrix[rowsFromMatrix - 1][columnsFromMatrix - 1] = rock1;
    useEffect(() => {
        setMatrix(copyOfMatrix);
    }, [matrix]);
    return matrix;
};


const Board = (props) => {
    const gameMatrix = useBeginningMatrix();
    const renderSquare = (i) => {
        return <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />;
    }
    const renderSquareUpdated = (i, j) => {
        return <Square
            value={gameMatrix[i][j]}
            onClick={() => console.log(`Locatia este: [${i},${j}]`)}
        />;
    };
    return (
        <div>
            {/*<div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>*/}
            <ShowBoard gameMatrix={gameMatrix}/>
        </div>
    );
};

export default Board;

import React, {useEffect, useMemo, useState} from 'react';
import ShowBoard from "./ShowBoard";
import Image from "next/image";
import {frontCardStart, RandomCardsWinning} from "./Cards";

const useBeginningMatrix = () => {
    const rowsFromMatrix = 7;
    const columnsFromMatrix = 11;
    //TODO La ultimul fill trebuie sa introduci un obiect gol de tipul pe care il vei gandi mai tarziu.
    const [matrix, setMatrix] = useState(Array(rowsFromMatrix).fill().map(() => Array(columnsFromMatrix).fill(null)));
    const start = <Image src={frontCardStart} layout={"fill"}/>;
    const goal = <Image src={RandomCardsWinning[0].src} layout={"fill"}/>;
    const rock = <Image src={RandomCardsWinning[1].src} layout={"fill"}/>;
    const rock1 = <Image src={RandomCardsWinning[2].src} layout={"fill"}/>;
    let copyOfMatrix = useMemo(() => matrix, [matrix]);
    
    //TODO Aici trebuie sa ajungi sa faci cu setMatrix, nu direct cu Matrix[x][y]
    copyOfMatrix[rowsFromMatrix - 4][rowsFromMatrix - 6] = {Card: start, Occupied: true};
    copyOfMatrix[rowsFromMatrix - 6][columnsFromMatrix - 2] = {Card: rock};
    copyOfMatrix[rowsFromMatrix - 4][columnsFromMatrix - 2] = {Card: goal};
    copyOfMatrix[rowsFromMatrix - 2][columnsFromMatrix - 2] = {Card: rock1};
    
    useEffect(() => {
        setMatrix(copyOfMatrix);
    }, [copyOfMatrix]);
    
    return matrix;
};


const Board = () => {
    const gameMatrix = useBeginningMatrix();
    return (
        <div>
            <ShowBoard gameMatrix={gameMatrix}/>
        </div>
    );
};

export default Board;

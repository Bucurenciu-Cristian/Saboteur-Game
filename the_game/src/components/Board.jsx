import React, {useEffect, useState} from 'react';
import Square from "./Square";
import ShowBoard from "./ShowBoard";
import Image from "next/image";
import {Cards, frontCardGold, frontCardRock1, frontCardRock2, frontCardStart, RandomCardsWinning} from "./Cards";

const useBeginningMatrix = () => {
    const rowsFromMatrix = 6;
    const columnsFromMatrix = 10;
    //TODO La ultimul fill trebuie sa introduci un obiect gol de tipul pe care il vei gandi mai tarziu.
    const [matrix, setMatrix] = useState(Array(rowsFromMatrix).fill().map(() => Array(columnsFromMatrix).fill(null)));
    const start = <Image src={frontCardStart} layout={"fill"}/>;
    const goal = <Image src={RandomCardsWinning[0].src} layout={"fill"}/>;
    const rock = <Image src={RandomCardsWinning[1].src} layout={"fill"}/>;
    const rock1 = <Image src={RandomCardsWinning[2].src} layout={"fill"}/>;
    const copyOfMatrix = [...matrix];
    //TODO Aici trebuie sa ajungi sa faci cu setMatrix, nu direct cu Matrix[x][y]
    copyOfMatrix[rowsFromMatrix - 3][rowsFromMatrix - 5] = {Card: start};
    copyOfMatrix[rowsFromMatrix - 5][columnsFromMatrix - 1] = {Card: rock};
    copyOfMatrix[rowsFromMatrix - 3][columnsFromMatrix - 1] = {Card: goal};
    copyOfMatrix[rowsFromMatrix - 1][columnsFromMatrix - 1] = {Card: rock1};
    useEffect(() => {
        setMatrix(copyOfMatrix);
    }, []);
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

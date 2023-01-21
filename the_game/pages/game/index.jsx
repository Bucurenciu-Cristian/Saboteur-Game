import React from 'react';
import {Button} from "@mui/material";
import Square from "../../src/components/Square";

const Game = () => {
    const matrice = Array(5).fill().map(() => Array(7).fill(<Square/>))
    console.log(matrice)
    return (
        <div>
            {matrice.map((row, i) => {
                return (
                    <div key={`${i}`}>
                        {row.map((column, j) => {
                            return (
                                <div key={`${i}${j}`}>
                                    {column} {"   "}
                                </div>
                            );
                        })}
                    </div>)
            })}
        </div>
    );
};

export default Game;

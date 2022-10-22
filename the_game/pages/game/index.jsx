import React from 'react';
import Tile from "../../src/components/Tile";

const Game = () => {
    const matrice = Array(5).fill().map(() => Array(7).fill(<Tile/>))
    console.log(matrice)
    
    return (
        <div>
            {matrice.map((row, i) => {
                return (
                    <div key={`${i}`}>
                        {row.map((column, j) => {
                            return (
                                <div key={`${i}${j}`} style={{display:"inline"}}>
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

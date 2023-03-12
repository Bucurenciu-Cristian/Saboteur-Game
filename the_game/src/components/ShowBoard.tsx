import React, {useMemo} from "react";
import Square from "./Square";
import {IMatrix} from "../Types/DexType";

const ShowBoard = ({gameMatrix}: { gameMatrix: IMatrix[][] }) => {

    const renderSquareUpdated = (i: number, j: number) => {
        let onClick = () => {

            console.log(`End cards found: !!!Locatia este: [${i},${j}]`);
        };
        return (
            <Square
                Card={gameMatrix[i][j].Card}
                Occupied={gameMatrix[i][j]?.Occupied}
                onClick={onClick}
            />
        );
    };

    const memoizedGameMatrix = useMemo(() => gameMatrix, [gameMatrix]);

    const memoizedRenderSquareUpdated = useMemo(
        () => renderSquareUpdated,
        [gameMatrix]
    );

    return (
        <>
            {memoizedGameMatrix.map((row: any[], i) => {
                return (
                    <div key={i} className="board-row">
                        {row.map((column, j) => {
                            return (
                                <div key={`${i}${j}`}>
                                    {memoizedRenderSquareUpdated(i, j)}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default ShowBoard;

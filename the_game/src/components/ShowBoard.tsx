import React, {useMemo} from "react";
import Square from "./Square";

const ShowBoard = ({gameMatrix}: { gameMatrix: any[][] }) => {

    const renderSquareUpdated = (i: number, j: number) => {
        return (
            <Square
                value={gameMatrix[i][j]?.Card}
                onClick={() => console.log(`Locatia este: [${i},${j}]`)}
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

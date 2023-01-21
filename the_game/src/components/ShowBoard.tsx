import React from "react";
import Square from "./Square";

// @ts-ignore
const ShowBoard = ({gameMatrix}) => {

  const renderSquareUpdated = (i: React.Key , j: number) => {
    return <Square
      value={gameMatrix[i][j]}
      onClick={() => console.log(`Locatia este: [${i},${j}]`)}
    />;
  };
  return <>{gameMatrix.map((row: any[], i: React.Key) => {
    return (
      <div key={i} className="board-row">
        {row.map((column, j) => {
          return (
            <div key={`${i}${j}`}>
              {renderSquareUpdated(i, j)}
            </div>
          );
        })}
      </div>)
  })}</>;
}
export default ShowBoard;

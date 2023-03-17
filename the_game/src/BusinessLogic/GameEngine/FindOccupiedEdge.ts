import {IMatrix} from "../../Types/DexType";
import {conDirections} from "../../constants";

export const findOccupiedEdge = (matrix: IMatrix[][]): [boolean, conDirections | []] => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    // let location: conDirections;
    let location: conDirections | undefined = undefined;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (row === 0 || row === numRows - 1 || col === 0 || col === numCols - 1) {
                // Edge cell found
                if (matrix[row][col].Occupied) {
                    if (row === 0) {
                        location = conDirections.NORTH;
                    } else if (row === numRows - 1) {
                        location = conDirections.SOUTH;
                    } else if (col === 0) {
                        location = conDirections.WEST;
                    } else if (col === numCols - 1) {
                        location = conDirections.EAST;
                    }
                }
            }
        }
    }
    if (location) {
        return [true, location]; // Edge is occupied, return true and the array of occupied edge cell indices
    } else {
        return [false, []]; // Edge is not occupied, return false and an empty array
    }
};

import {IMatrix} from "../../Types/DexType";
import {conDirections} from "../../constants";

export const findOccupiedEdge = (matrix: IMatrix[][]) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    // let location: conDirections;
    let location: conDirections | undefined = undefined;
    let locations: { direction: conDirections }[] = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (row === 0 || row === numRows - 1 || col === 0 || col === numCols - 1) {
                // Edge cell found
                if (matrix[row][col].Occupied) {
                    if (row === 0) {
                        location = conDirections.NORTH;
                        locations.push({direction: conDirections.NORTH});
                    } else if (col === numCols - 1) {
                        location = conDirections.EAST;
                        locations.push({direction: conDirections.EAST});
                    } else if (row === numRows - 1) {
                        location = conDirections.SOUTH;
                        locations.push({direction: conDirections.SOUTH});
                    } else if (col === 0) {
                        location = conDirections.WEST;
                        locations.push({direction: conDirections.WEST});
                    }
                }
            }
        }
    }
    const uniqueLocations = locations.reduce((accumulator, currentValue) => {
        // @ts-ignore
        if (!accumulator.some(obj => obj.direction === currentValue.direction)) {
            // @ts-ignore
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
    if (uniqueLocations.length > 0) {
        return [true, uniqueLocations]; // Edge is occupied, return true and the array of occupied edge cell indices
    } else {
        return [false, []]; // Edge is not occupied, return false and an empty array
    }
};

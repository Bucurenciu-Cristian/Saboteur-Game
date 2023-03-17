import {IMatrix} from "../../Types/DexType";
import {conDirections} from "../../constants";

export function neighboursCoordonate(matrix: IMatrix[][], row: number, column: number, occupied = true) {
    const neighbours = [];
    const directions = [
        {name: conDirections.NORTH, coordinate: {row: row - 1, column: column}, Occupied: occupied},
        {name: conDirections.EAST, coordinate: {row: row, column: column + 1}, Occupied: occupied},
        {name: conDirections.SOUTH, coordinate: {row: row + 1, column: column}, Occupied: occupied},
        {name: conDirections.WEST, coordinate: {row: row, column: column - 1}, Occupied: occupied},
    ];
    for (const direction of directions) {
        const {coordinate} = direction;
        const {row, column} = coordinate;
        if (row < 0 || row >= matrix.length || column < 0 || column >= matrix[row].length) {
            continue; // Skip this direction if it's outside the matrix
        }
        const isOccupied = matrix[row][column].Occupied;
        if (occupied && isOccupied) {
            neighbours.push(direction);
        } else if (!occupied && !isOccupied) {
            neighbours.push(direction);
        }
    }
    return neighbours;
}

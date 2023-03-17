import {IMatrix} from "../../Types/DexType";
import {FOT} from "../Cards/Actions";
import {isCodeAtIndex} from "./IsCodeAtIndex";
import {neighboursCards} from "./NeighboursCards";

export function isPathToFinish(matrix: IMatrix[][], startRow: number, startColumn: number): boolean {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false));

    // Assuming the starting card is at position (0, 0).
    return dfs(matrix, startRow, startColumn, visited);
}

export function dfs(matrix: IMatrix[][], row: number, column: number, visited: boolean[][]): boolean {
    if (row < 0 || row >= matrix.length || column < 0 || column >= matrix[0].length) {
        return false;
    }

    if (visited[row][column]) {
        return false;
    }
    visited[row][column] = true;
    const {code} = matrix[row][column].Card;

    if (!isCodeAtIndex(matrix, row, column, 6)) {
        return false;
    }
    if (code[8] === 'S') { // If we've reached a finish card.
        return true;
    }

    const neighbours = neighboursCards(matrix, row, column);

    for (const neighbour of neighbours) {
        const {coordinate} = neighbour;
        const {row: newRow, column: newCol} = coordinate;
        const {center, adjacent} = neighbour;
        if (center === FOT.T && adjacent === FOT.T) {
            if (dfs(matrix, newRow, newCol, visited)) {
                return true;
            }
        }
    }

    return false;
}

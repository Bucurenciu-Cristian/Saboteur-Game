import {IMatrix} from "../../Types/DexType";
import {NeighboursActions} from "../../constants";
import {neighboursCards} from "./NeighboursCards";

/**
 * Check if the current card is connected to another card
 * @param row
 * @param column
 * @param matrix
 * @param action
 */
export function checkTheCurrentCardInTable(matrix: IMatrix[][], row: number, column: number, action: string = NeighboursActions.ALL) {
    /*B P N E S W C R
    //0 1 2 3 4 5 6 7
    */
    const {Occupied} = matrix[row][column];
    if (!Occupied) {
        return false; // skip this position if it's not occupied
    }

    const directions = neighboursCards(matrix, row, column);
    const predicate = ({
                           center, adjacent
                       }: { center: string, adjacent: string }) => center === adjacent && center === "T";
    if (action === NeighboursActions.ALL) return directions.every(predicate);
    else if (action === NeighboursActions.ONE) return directions.some(predicate);
    else if (action === NeighboursActions.DIRECTIONS) return directions;
}

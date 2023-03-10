import {Matrix} from "../../variables";
import {IMatrix} from "../../Types/DexType";
import {SpecialPath} from "../Cards/Paths";
import {allTheCards} from "../Logic";

const {rowsFromMatrix, columnsFromMatrix} = Matrix;
export let InitialMatrix: IMatrix[][] = Array(rowsFromMatrix).fill(null).map(() => Array(columnsFromMatrix).fill({
    Card: "#",
    Occupied: false
}))
let s = 0;
/*InitialMatrix = InitialMatrix.map((row, rowIndex) => {
    return row.map((_) => {
        s++;
        return {Card: allTheCards[s], Occupied: true}
    })
})*/
InitialMatrix[rowsFromMatrix - 4][columnsFromMatrix - 10] = {Card: SpecialPath[0], Occupied: true};
InitialMatrix[rowsFromMatrix - 6][columnsFromMatrix - 2] = {Card: SpecialPath[1], Occupied: true};
InitialMatrix[rowsFromMatrix - 4][columnsFromMatrix - 2] = {Card: SpecialPath[2], Occupied: true};
InitialMatrix[rowsFromMatrix - 2][columnsFromMatrix - 2] = {Card: SpecialPath[3], Occupied: true};
/*
InitialMatrix[0][0] = {Card: normalPath[0], Occupied: true};
InitialMatrix[1][1] = {Card: normalPath[1], Occupied: true};
InitialMatrix[2][2] = {Card: normalPath[2], Occupied: true};
InitialMatrix[3][3] = {Card: normalPath[3], Occupied: true};
InitialMatrix[4][4] = {Card: normalPath[4], Occupied: true};
InitialMatrix[5][5] = {Card: normalPath[5], Occupied: true};
InitialMatrix[6][6] = {Card: normalPath[6], Occupied: true};
InitialMatrix[6][0] = {Card: normalPath[7], Occupied: true};
InitialMatrix[6][1] = {Card: normalPath[8], Occupied: true};
InitialMatrix[6][2] = {Card: normalPath[9], Occupied: true};
InitialMatrix[6][3] = {Card: normalPath[10], Occupied: true};
*/



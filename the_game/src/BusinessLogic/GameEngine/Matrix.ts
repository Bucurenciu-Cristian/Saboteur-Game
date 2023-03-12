import {Matrix, padding} from "../../variables";
import {IMatrix} from "../../Types/DexType";
import {NESWC, SpecialPath} from "../Cards/Paths";

const {rowsFromMatrix: row, columnsFromMatrix: column} = Matrix;
export let InitialMatrix: IMatrix[][] = Array(row).fill(null).map(() => Array(column).fill({
    Card: "#",
    Occupied: false
}))
// let s = 0;
/*InitialMatrix = InitialMatrix.map((row, rowIndex) => {
    return row.map((_) => {
        s++;
        return {Card: allTheCards[s], Occupied: true}
    })
})*/
// const randomNumber1 = Math.floor(Math.random() * 6);
const randomNumber1 = 3; // Max 6
// const randomNumber2 = Math.floor(Math.random() * 10);
const randomNumber2 = 3; // Max 10

export const centerRows = randomNumber1;
export const centerColumn = randomNumber2;
let StartRow = (padding ? row - Math.floor((row / 2)) - 1 : row - Math.floor((row / 2)) - 2);
let StartColumn = column - (padding ? column - 1 : column - 2);
let lastColumn = column - (padding ? 2 : 1);

InitialMatrix[StartRow][StartColumn] = {Card: SpecialPath[0], Occupied: true};

InitialMatrix[StartRow - 2][lastColumn] = {Card: SpecialPath[1], Occupied: true};

InitialMatrix[StartRow][lastColumn] = {Card: SpecialPath[2], Occupied: true};

InitialMatrix[StartRow + 2][lastColumn] = {Card: SpecialPath[3], Occupied: true};


//Testing the Cards connection
const randomNumbers = Array.from({length: 5}, () => Math.floor(Math.random() * 40));

InitialMatrix[centerRows][centerColumn] = {Card: NESWC[0], Occupied: true};

// Check if West direction is within bounds
let West = centerColumn - 1;
if (West >= 0) {
    InitialMatrix[centerRows][West] = {Card: NESWC[1], Occupied: true};
}

// Check if East direction is within bounds
let East = centerColumn + 1;
if (East < InitialMatrix[0].length) {
    InitialMatrix[centerRows][East] = {Card: NESWC[2], Occupied: true};
}

// Check if North direction is within bounds
let North = centerRows - 1;
if (North >= 0) {
    InitialMatrix[North][centerColumn] = {Card: NESWC[3], Occupied: true};
}

// Check if South direction is within bounds
let South = centerRows + 1;
if (South < InitialMatrix.length) {
    InitialMatrix[South][centerColumn] = {Card: NESWC[4], Occupied: true};
}


export function checkTheCurrentCardInTable(row: number, column: number, matrix: IMatrix[][]) {
    /*B P N E S W C R
    //0 1 2 3 4 5 6 7
    */
    const {Card: CardCenter, Occupied: OccupiedCenter} = matrix[row][column];

    if (!OccupiedCenter) {
        return false; // skip this position if it's not occupied
    }

    let NorthCenter;
    let EastCenter;
    let SouthCenter;
    let WestCenter;
    let SouthOfNorthCard;
    let WestOfEastCard;
    let NorthOfSouthCard;
    let EastOfWestCard;

    if (row > 0) {
        const {Card: CardNorth, Occupied: OccupiedNorth} = matrix[row - 1][column];
        if (OccupiedNorth) {
            NorthCenter = CardCenter.code[2];
            SouthOfNorthCard = CardNorth.code[4];
        }
    }

    if (column < matrix[row].length - 1) {
        const {Card: CardEast, Occupied: OccupiedEast} = matrix[row][column + 1];
        if (OccupiedEast) {
            EastCenter = CardCenter.code[3];
            WestOfEastCard = CardEast.code[5];
        }
    }

    if (row < matrix.length - 1) {
        const {Card: CardSouth, Occupied: OccupiedSouth} = matrix[row + 1][column];
        if (OccupiedSouth) {
            SouthCenter = CardCenter.code[4];
            NorthOfSouthCard = CardSouth.code[2];
        }
    }

    if (column > 0) {
        const {Card: CardWest, Occupied: OccupiedWest} = matrix[row][column - 1];
        if (OccupiedWest) {
            WestCenter = CardCenter.code[5];
            EastOfWestCard = CardWest.code[3];
        }
    }

    const directions = [];

    if (NorthCenter !== undefined && SouthOfNorthCard !== undefined) {
        directions.push({center: NorthCenter, adjacent: SouthOfNorthCard, name: "North"});
    }

    if (EastCenter !== undefined && WestOfEastCard !== undefined) {
        directions.push({center: EastCenter, adjacent: WestOfEastCard, name: "East"});
    }

    if (SouthCenter !== undefined && NorthOfSouthCard !== undefined) {
        directions.push({center: SouthCenter, adjacent: NorthOfSouthCard, name: "South"});
    }

    if (WestCenter !== undefined && EastOfWestCard !== undefined) {
        directions.push({center: WestCenter, adjacent: EastOfWestCard, name: "West"});
    }

    /*
     directions.forEach(({center, adjacent, name}) => {
         if (center === adjacent && center === "T") {
             console.info(`${name} is correct`);
         }
     });
     */
    const isAllDirectionsCorrect = directions.every(({center, adjacent}) => {
        return center === adjacent && center === "T";
    });

    if (isAllDirectionsCorrect) {
        console.info("All directions are correct");
        return true;
    } else {
        // console.info("All directions are not correct");
        return false;
    }

}

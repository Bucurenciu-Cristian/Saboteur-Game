import {Matrix, padding} from "../../variables";
import {IMatrix, ISpecialPath} from "../../Types/DexType";
import {Blocks, NESWC, normalPath, SpecialPath} from "../Cards/Paths";
import {CharTuple} from "../Logic";
import {stringify} from "../../../utils/Helpers";
import {conDirections, NeighboursActions} from "../../constants";

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

export let StartRow = (padding ? row - Math.floor((row / 2)) - 1 : row - Math.floor((row / 2)) - 2);
export let StartColumn = column - (padding ? column - 1 : column - 2);
export let lastColumn = column - (padding ? 2 : 1);

function getRandomizedArray<T>(array: T[], excludeFirstElement: boolean = false): T[] {
  // Create a copy of the original array and remove the first element if excludeFirstElement is true
  const newArray = excludeFirstElement ? array.slice(1) : array.slice();

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Return the shuffled array
  return newArray;
}

const randomizedFinalCards  = getRandomizedArray(SpecialPath, true);
InitialMatrix[StartRow][StartColumn] = {Card: SpecialPath[0], Occupied: true};

InitialMatrix[StartRow - 2][lastColumn] = {Card: randomizedFinalCards[1], Occupied: true};

InitialMatrix[StartRow][lastColumn] = {Card: randomizedFinalCards[2], Occupied: true};

InitialMatrix[StartRow + 2][lastColumn] = {Card: randomizedFinalCards[0], Occupied: true};

InitialMatrix[StartRow][lastColumn - 1] = {Card: NESWC[1], Occupied: true};

InitialMatrix[StartRow][lastColumn - 2] = {Card: NESWC[2], Occupied: true};
InitialMatrix[StartRow][lastColumn - 3] = {Card: NESWC[3], Occupied: true};
InitialMatrix[StartRow][lastColumn - 4] = {Card: NESWC[2], Occupied: true};
InitialMatrix[StartRow][lastColumn - 5] = {Card: NESWC[1], Occupied: true};
InitialMatrix[StartRow][lastColumn - 6] = {Card: NESWC[0], Occupied: true};
InitialMatrix[StartRow][lastColumn - 7] = {Card: NESWC[2], Occupied: true};

function GiveMeRandomsCardsAroundACard(centerRows: number, centerColumn: number) {
//Testing the Cards connection
    const randomNumbers = Array.from({length: 5}, () => Math.floor(Math.random() * 40));

    InitialMatrix[centerRows][centerColumn] = {Card: normalPath[randomNumbers[0]], Occupied: true};

// Check if West direction is within bounds
    let West = centerColumn - 1;
    if (West >= 0) {
        InitialMatrix[centerRows][West] = {Card: normalPath[randomNumbers[1]], Occupied: true};
    }

// Check if East direction is within bounds
    let East = centerColumn + 1;
    if (East < InitialMatrix[0].length) {
        InitialMatrix[centerRows][East] = {Card: normalPath[randomNumbers[2]], Occupied: true};
    }

// Check if North direction is within bounds
    let North = centerRows - 1;
    if (North >= 0) {
        InitialMatrix[North][centerColumn] = {Card: normalPath[randomNumbers[3]], Occupied: true};
    }

// Check if South direction is within bounds
    let South = centerRows + 1;
    if (South < InitialMatrix.length) {
        InitialMatrix[South][centerColumn] = {Card: normalPath[randomNumbers[4]], Occupied: true};
    }
}

export const centerRows = 0; // Max 6;
export const centerColumn = 1; // Max 10;
// GiveMeRandomsCardsAroundACard(centerRows, centerColumn);
// GiveMeRandomsCardsAroundACard(centerRows + 5, centerColumn + 5);
// GiveMeRandomsCardsAroundACard(centerRows + 1, centerColumn + 2);
// GiveMeRandomsCardsAroundACard(centerRows + 1, centerColumn + 4);
// GiveMeRandomsCardsAroundACard(centerRows + 1, centerColumn + 6);

// GiveMeRandomsCardsAroundACard(centerRows + 1, centerColumn + 8);


function giveMeTheNeighbours(matrix: IMatrix[][], row: number, column: number) {
    const {Card} = matrix[row][column];

    let NorthCenter;
    let EastCenter;
    let SouthCenter;
    let WestCenter;
    let SouthOfNorthCard;
    let WestOfEastCard;
    let NorthOfSouthCard;
    let EastOfWestCard;
    const north = row - 1;
    const south = row + 1;
    const west = column - 1;
    const east = column + 1;
    if (row > 0) {
        const {Card: CardNorth, Occupied: OccupiedNorth} = matrix[north][column];
        if (OccupiedNorth) {
            NorthCenter = Card.code[2];
            SouthOfNorthCard = CardNorth.code[4];
        }
    }

    if (column < matrix[row].length - 1) {
        const {Card: CardEast, Occupied: OccupiedEast} = matrix[row][east];
        if (OccupiedEast) {
            EastCenter = Card.code[3];
            WestOfEastCard = CardEast.code[5];
        }
    }

    if (row < matrix.length - 1) {
        const {Card: CardSouth, Occupied: OccupiedSouth} = matrix[south][column];
        if (OccupiedSouth) {
            SouthCenter = Card.code[4];
            NorthOfSouthCard = CardSouth.code[2];
        }
    }

    if (column > 0) {
        const {Card: CardWest, Occupied: OccupiedWest} = matrix[row][west];
        if (OccupiedWest) {
            WestCenter = Card.code[5];
            EastOfWestCard = CardWest.code[3];
        }
    }

    const directions = [];

    if (NorthCenter !== undefined && SouthOfNorthCard !== undefined) {
        directions.push({
            center: NorthCenter,
            adjacent: SouthOfNorthCard,
            name: conDirections.NORTH,
            coordinate: {row: north, column}
        });
    }

    if (EastCenter !== undefined && WestOfEastCard !== undefined) {
        directions.push({
            center: EastCenter,
            adjacent: WestOfEastCard,
            name: conDirections.EAST,
            coordinate: {row, column: east}
        });
    }

    if (SouthCenter !== undefined && NorthOfSouthCard !== undefined) {
        directions.push({
            center: SouthCenter,
            adjacent: NorthOfSouthCard,
            name: conDirections.SOUTH,
            coordinate: {row: south, column}
        });
    }

    if (WestCenter !== undefined && EastOfWestCard !== undefined) {
        directions.push({
            center: WestCenter,
            adjacent: EastOfWestCard,
            name: conDirections.WEST,
            coordinate: {row, column: west}
        });
    }
    return directions;
}

export function checkTheCurrentCardInTable(row: number, column: number, matrix: IMatrix[][], action: string = NeighboursActions.ALL) {
    /*B P N E S W C R
    //0 1 2 3 4 5 6 7
    */
    const {Occupied} = matrix[row][column];
    if (!Occupied) {
        return false; // skip this position if it's not occupied
    }

    const directions = giveMeTheNeighbours(matrix, row, column);
    const predicate = ({
                           center, adjacent
                       }: { center: string, adjacent: string }) => center === adjacent && center === "T";
    if (action === NeighboursActions.ALL) return directions.every(predicate);
    else if (action === NeighboursActions.ONE) return directions.some(predicate);
    else if (action === NeighboursActions.DIRECTIONS) return directions;
}


export function findAllEndCards(matrix: IMatrix[][], row: number, col: number): [number, number][] {
    //DOESN'T WORK, go to Alternative.

    // const matrixCopy = matrix.map(row => row.slice());  // Create a copy of the matrix
    const endCards: [number, number][] = [];

    if (matrix[row][col].Checked === 'Dead End') {  // Check if the current card is the end card
        endCards.push([row, col]);
        // console.log('End card found at: ', row, col)
    } else {
        matrix[row][col].Checked = 'Visited';  // Mark the current card as visited
        // console.log('Visited card at: ', {row}, {col})

        // Check each neighboring card
        for (const [dRow, dCol] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const neighborRow = row + dRow;
            const neighborCol = col + dCol;

            // Check if the neighboring card is within the matrix boundaries
            if (neighborRow >= 0 && neighborRow < matrix.length && neighborCol >= 0 && neighborCol < matrix[0].length) {

                // Check if the neighboring card is not occupied and has not been visited before
                if (matrix[neighborRow][neighborCol].Checked === 'Empty') {
                    matrix[neighborRow][neighborCol].Checked = 'Dead End';  // Mark the neighboring card as a dead end
                } else if (matrix[neighborRow][neighborCol].Checked !== 'Visited') {
                    const endCardsFromNeighbor = findAllEndCards(matrix, neighborRow, neighborCol);  // Recursively explore the neighboring card
                    endCards.push(...endCardsFromNeighbor);  // Add any end cards found from the neighboring card to the list of end cards
                }
            }
        }
        console.log('End cards found: ', endCards)
        matrix[row][col].Checked = 'Empty';  // Reset the current card to 'Empty' so that it can be explored again from a different path
        // console.log('Reset card at: ', {row}, {col})
    }

    return endCards;
}

export type BusySquare = [
        "T" | "F",
        "T" | "F",
        "T" | "F",
        "T" | "F"
]

/*export function findAllEndCardsAlternative(matrix: IMatrix[][], StartRow: number, StartCol: number, lista = []) {
    //Aici trebuie sa implementezi o functie care sa returneze toate drumurile posibile de la StartRow si StartCol
    //Exact ce mi-a sugerat Markus.
    //O lista ce conține cărțile ce au inca drumuri deschise
    //Prima si prima data, start-ul va fi adăugat in lista, deoarece are 4 cai de access, deci toate pe pozitia
    //respectiva vor fi cu T T T T respectiv N E S W (Clockwise)
    //La a 2 a carte pusa, consider ca se va pune in E => N, S, W sunt inca true, deci T F T T - Start, T T T F - East Card
    //La a 3 a carte pusa, consider ca se va pune in S => N, W sunt inca true, deci T F F T - Start, T T T F - East Card, F T T T - South Card
    //La a 4 a carte pusa, consider ca se va pune in W => N sunt inca true, deci T F F F - Start, T T T F - East Card, F T T T - South Card, T F T T - West Card
    //La a 5 a carte pusa, consider ca se va pune in N => 0 sunt inca true, deci F F F F - Start (scoti la acest moment din aceea lista), T T T F - East Card, F T T T - South Card, T F T T - West Card, T T F T - North Card
    if (lista.length === 0) {
      lista.push(StartRow,StartCol);
    }

    const neighbours = giveMeTheNeighbours(matrix, StartRow, StartCol);
    const directions = neighbours.map(({name}) => {
        return name;
    });
    directions.map((direction) => {
        switch (direction) {
            case conDirections.NORTH:
                //Aici trebuie sa verific daca exista o carte in North, daca da, atunci trebuie sa verific daca are cel putin o directie activata
                //Daca da, atunci trebuie sa adaug in lista, acea carte, cu directiile respective
                //Daca nu, atunci trebuie sa verific daca exista o carte in North, daca da, atunci trebuie sa verific daca are cel putin o directie activata
                // console.log(conDirections.NORTH);
                break;
            case conDirections.EAST:
                console.log(conDirections.EAST);
                break;
            case conDirections.SOUTH:
                console.log(conDirections.SOUTH);
                break;
            case conDirections.WEST:
                console.log(conDirections.WEST);
                break;
        }
    });
    stringify(directions);
}*/
export function findAllEndCardsAlternative(matrix: IMatrix[][], startRow: number, startCol: number, lista: number[][] = []) {
  // Add the starting position to the list
  //Itereaza prin toata matricea si vezi cand dai de Occupied, du-te in vecini care nu sunt ocupati si verifica care cale este libera, daca gasesti, adauga coordonatele in lista.
  const x = checkTheCurrentCardInTable(startRow, startCol+1,matrix,NeighboursActions.DIRECTIONS);
  if(x !== undefined) {
    for (const x1 of x) {
      console.log({x1});
    }
  }


  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const x = checkTheCurrentCardInTable(row, col,matrix,NeighboursActions.DIRECTIONS);
      if (x !== false) {
        console.log(x);
      }
      // if(x !== undefined) {
      //   for (const x1 of x) {
      //     if (!x1.Occupied) {
      //       console.log(x1);
      //     }
      //   }
      // }
    }
  }


  // if (lista.length === 0) {
  //   if (x !== undefined) {
  //     lista.push(x);
  //   }
  // }
  // console.log({lista});
}
export function thereIsAContinuedPath() { // Aceasta functie trebuie apelata doar cand una din cele 3 carti (gold sau rock) a fost atinsa in sensul ca una din cele 4 directii din ele a fost activata.
    //Gen cartea din Mijloc a fost atinsa din West, acum e momentul sa apelam asta.
    //Aici trebuie sa pot verifica, daca din acel punct, pot merge pe un drum continuu pana la start. Un backTracking gen
}

function isThisCardTouched(matrix: IMatrix[][], row: number, col: number) {
    //Aici trebuie sa pot verifica daca o carte a fost atinsa, adica daca are cel putin o directie activata
    //Daca da, atunci trebuie sa apelam functia de mai sus, care sa verifice daca exista un drum continuu pana la start
    for (const [dRow, dCol] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const neighborRow = row + dRow;
        const neighborCol = col + dCol;
        if (neighborRow >= 0 && neighborRow < matrix.length && neighborCol >= 0 && neighborCol < matrix[0].length) {

        }
    }
}

export interface Coordinate {
    row: number;
    col: number;
}

export function dfs(matrix: IMatrix[][], visited: boolean[][], coord: Coordinate, targetCode: CharTuple | string): boolean {
    if (coord.row < 0 || coord.row >= matrix.length || coord.col < 0 || coord.col >= matrix[0].length) {
        // we've gone out of bounds
        return false;
    }

    if (matrix[coord.row][coord.col].Checked) {
        // we've already visited this cell
        return false;
    }

    const cell = matrix[coord.row][coord.col];
    console.log('cell', cell, coord.row, coord.col);
    // Array.isArray(arr)
    if (Array.isArray(cell.Card.code) && Array.isArray(targetCode)) {
        if (!cell.Occupied && cell.Card.code.join() === targetCode.join()) {
            // we've found the target card!
            return true;
        }
    }

    visited[coord.row][coord.col] = true;

    // explore neighbors
    const north = coord.row - 1;
    const south = coord.row + 1;
    const west = coord.col - 1;
    const east = coord.col + 1;
    const neighbors: Coordinate[] = [
        {row: north, col: coord.col},
        {row: south, col: coord.col},
        {row: coord.row, col: west},
        {row: coord.row, col: east},
    ];

    for (const neighbor of neighbors) {
        if (dfs(matrix, visited, neighbor, targetCode)) {
            // we've found the target card in one of the neighbors
            return true;
        }
    }

    return false;
}

import { IMatrix } from '@src/Types/DexType';
import { conDirections, Modes } from '@src/enums';

export function neighboursCards(matrix: IMatrix[][], row: number, column: number) {
  const { Card } = matrix[row][column];

  let NorthCenter;
  let EastCenter;
  let SouthCenter;
  let WestCenter;
  let SouthOfNorthCard;
  let WestOfEastCard;
  let NorthOfSouthCard;
  let EastOfWestCard;
  const northRow = row - 1;
  const southRow = row + 1;
  const westColumn = column - 1;
  const eastColumn = column + 1;
  const [, , north, east, south, west] = Card.code;

  function isValidCell({ Card, Occupied }) {
    return Occupied && !Card.code.includes(Modes.Gold, 6) && !Card.code.includes(Modes.Rock, 6);
  }

  if (row > 0) {
    const cellNorth = matrix[northRow][column];
    if (isValidCell(cellNorth)) {
      NorthCenter = north;
      SouthOfNorthCard = cellNorth.Card.code[4];
    }
  }

  if (column < matrix[row].length - 1) {
    const cellEast = matrix[row][eastColumn];
    if (isValidCell(cellEast)) {
      EastCenter = east;
      WestOfEastCard = cellEast.Card.code[5];
    }
  }

  if (row < matrix.length - 1) {
    const cellSouth = matrix[southRow][column];
    if (isValidCell(cellSouth)) {
      SouthCenter = south;
      NorthOfSouthCard = cellSouth.Card.code[2];
    }
  }

  if (column > 0) {
    const cellWest = matrix[row][westColumn];
    if (isValidCell(cellWest)) {
      WestCenter = west;
      EastOfWestCard = cellWest.Card.code[3];
    }
  }

  const directions = [];

  if (NorthCenter && SouthOfNorthCard) {
    directions.push({
      center: NorthCenter,
      adjacent: SouthOfNorthCard,
      name: conDirections.NORTH,
      coordinate: { row: northRow, column },
    });
  }

  if (EastCenter && WestOfEastCard) {
    directions.push({
      center: EastCenter,
      adjacent: WestOfEastCard,
      name: conDirections.EAST,
      coordinate: { row, column: eastColumn },
    });
  }

  if (SouthCenter && NorthOfSouthCard) {
    directions.push({
      center: SouthCenter,
      adjacent: NorthOfSouthCard,
      name: conDirections.SOUTH,
      coordinate: { row: southRow, column },
    });
  }

  if (WestCenter && EastOfWestCard) {
    directions.push({
      center: WestCenter,
      adjacent: EastOfWestCard,
      name: conDirections.WEST,
      coordinate: { row, column: westColumn },
    });
  }
  return directions;
}

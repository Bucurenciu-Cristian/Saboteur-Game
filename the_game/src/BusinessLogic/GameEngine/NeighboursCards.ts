import { IMatrix } from '@src/Types/DexType';
import { conDirections } from '@src/enums';

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
  const north = row - 1;
  const south = row + 1;
  const west = column - 1;
  const east = column + 1;
  const [, , third, fourth, fifth, sixth] = Card.code;
  if (row > 0) {
    const { Card: CardNorth, Occupied: OccupiedNorth } = matrix[north][column];
    if (OccupiedNorth) {
      NorthCenter = third;
      const [, , , , fifth1] = CardNorth.code;
      SouthOfNorthCard = fifth1;
    }
  }

  if (column < matrix[row].length - 1) {
    const { Card: CardEast, Occupied: OccupiedEast } = matrix[row][east];
    if (OccupiedEast) {
      EastCenter = fourth;
      const { code } = CardEast;
      const [, , , , , sixth1] = code;
      WestOfEastCard = sixth1;
    }
  }

  if (row < matrix.length - 1) {
    const { Card: CardSouth, Occupied: OccupiedSouth } = matrix[south][column];
    if (OccupiedSouth) {
      SouthCenter = fifth;
      const [, , third1] = CardSouth.code;
      NorthOfSouthCard = third1;
    }
  }

  if (column > 0) {
    const { Card: CardWest, Occupied: OccupiedWest } = matrix[row][west];
    if (OccupiedWest) {
      WestCenter = sixth;
      const [, , , fourth1] = CardWest.code;
      EastOfWestCard = fourth1;
    }
  }

  const directions = [];

  if (NorthCenter !== undefined && SouthOfNorthCard !== undefined) {
    directions.push({
      center: NorthCenter,
      adjacent: SouthOfNorthCard,
      name: conDirections.NORTH,
      coordinate: { row: north, column },
    });
  }

  if (EastCenter !== undefined && WestOfEastCard !== undefined) {
    directions.push({
      center: EastCenter,
      adjacent: WestOfEastCard,
      name: conDirections.EAST,
      coordinate: { row, column: east },
    });
  }

  if (SouthCenter !== undefined && NorthOfSouthCard !== undefined) {
    directions.push({
      center: SouthCenter,
      adjacent: NorthOfSouthCard,
      name: conDirections.SOUTH,
      coordinate: { row: south, column },
    });
  }

  if (WestCenter !== undefined && EastOfWestCard !== undefined) {
    directions.push({
      center: WestCenter,
      adjacent: EastOfWestCard,
      name: conDirections.WEST,
      coordinate: { row, column: west },
    });
  }
  return directions;
}

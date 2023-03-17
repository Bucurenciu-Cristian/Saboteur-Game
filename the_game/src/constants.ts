export enum findCardActions {
    Start = 'Start',
    Final = 'Final',
}

export enum NeighboursActions {
    ONE = 'ONE',
    ALL = 'ALL',
    DIRECTIONS = 'DIRECTIONS',
}

export enum conDirections {
    NORTH = 'NORTH',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    CENTER = 'CENTER',
    FALSE = 'FALSE',
}

/*
switch (direction) {
  case conDirections.NORTH:
    // Handle north direction
    break;
  case conDirections.EAST:
    // Handle east direction
    break;
  case conDirections.SOUTH:
    // Handle south direction
    break;
  case conDirections.WEST:
    // Handle west direction
    break;
  case conDirections.CENTER:
    // Handle center direction
    break;
  case conDirections.FALSE:
    // Handle false direction
    break;
}*/

export enum Modes {
    Path = 'P',
    Player = 'L',
    Reward = 'R',
    Action = 'A',
    Base = 'B',
    Expansion = 'E',
    True = 'T',
    False = 'F',
    Gold = 'G',
    Rock = 'R',
}

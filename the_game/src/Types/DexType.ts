import { StaticImageData } from 'next/image';
import { FOT } from '../BusinessLogic/Cards/Actions';
import { Modes } from '../enums';
import { ActionCardsTypes } from './Players';

export interface dexType {
  Base: 'B';
  Path: 'P';
  N: typeof FOT;
  S: typeof FOT;
  E: typeof FOT;
  W: typeof FOT;
  C: typeof FOT;
  R: typeof FOT;
  Gold: 'G';
  Rock: 'R';
  Start: 'S';

  Axe: typeof FOT;
  Cart: typeof FOT;
  Lantern: typeof FOT;

  AxeCart: 'G';
  AxeLantern: 'B';
  CartLantern: 'E';
  AxeS: 'A';
  CartS: 'C';
  LanternS: 'L';
  Action: 'A';
  Destroy: 'D';
  Map: 'M';
  Miner: 'M';
  Player: 'L';
  Reward: 'R';
  Saboteur: 'S';
}

export interface FOTType {
  F: 'F';
  T: 'T';
}

export type CharTuple = [
  first: Modes.Base | Modes.Expansion,
  second: Modes.Path | Modes.Player | Modes.Action | Modes.Reward,
  // third?: 'T' | 'F' | 'M' | 'S' | 'E' | 'G' | dex.Base | 'D'| 'C',
  ...rest: string[]
];

export interface ICardBasic {
  code: CharTuple | string;
  src: string;
}

export interface IMatrix {
  Card: ICardBasic;
  Occupied: boolean;
}

export interface ISpecialPath extends ICardBasic {
  back?: StaticImageData | string;
}

type PathCardCode = CharTuple & { 1: Modes.Path };
type NorthPart = CharTuple & { 2: Modes.True | Modes.False };
type EastPart = CharTuple & { 3: Modes.True | Modes.False };
type SouthPart = CharTuple & { 4: Modes.True | Modes.False };
type WestPart = CharTuple & { 5: Modes.True | Modes.False };
type CenterPart = CharTuple & { 6: Modes.True | Modes.False };
type RotationPart = CharTuple & { 7: Modes.True | Modes.False };
type FinalPart = CharTuple & { 8: Modes.Gold | Modes.Rock };
type FinalCardOptional = CharTuple | FinalPart;

export type PathCard = ICardBasic & {
  code: PathCardCode & NorthPart & EastPart & SouthPart & WestPart & CenterPart & RotationPart & FinalCardOptional;
};

export type ActionCardCode = CharTuple & { 1: Modes.Action };
export type ActionCardCodeThird = CharTuple & { 2: ActionCardsTypes };
export type ActionCardCodeFour = CharTuple & { 3: Modes.True | Modes.False };
export type ActionCardCodeOptional = CharTuple | ActionCardCodeFour;

export type ActionCard = ICardBasic & { code: ActionCardCode & ActionCardCodeThird & ActionCardCodeOptional };

export type RewardCardCode = CharTuple & { 1: Modes.Reward };
export type RewardCard = ICardBasic & { code: RewardCardCode };

export type PlayerCardCode = CharTuple & { 1: Modes.Player };
export type PlayerCardCodeSecond = CharTuple & { 2: Modes.Miner | Modes.Saboteur };
export type PlayerCard = ICardBasic & { code: PlayerCardCode & PlayerCardCodeSecond };

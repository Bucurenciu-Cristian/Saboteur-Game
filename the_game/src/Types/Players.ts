import { ICardBasic } from './DexType';
import { Modes } from '../enums';

const { Miner, Saboteur } = Modes;

export interface IUser {
  id?: string;
  username: string;
  role: typeof Miner | typeof Saboteur;
  goldNuggets?: number;
  hand: ICardBasic[]; // Assuming you have a Card interface or class
  blocks: Block[]; // Assuming you have a Block interface or class
  actions: PlayerAction[]; // List of actions performed by the player
  selectedCardIndex?: number;
  score?: number;
  isTurn?: boolean;
}

export type ActionCardsTypes =
  | Modes.Axe
  | Modes.Lantern
  | Modes.Cart
  | Modes.AxeAndLantern
  | Modes.AxeAndCart
  | Modes.LanternAndCart
  | Modes.Destroy
  | Modes.Map;
export type ActionCardsTypesBlocks =
  | Modes.Axe
  | Modes.Lantern
  | Modes.Cart
  | Modes.AxeAndLantern
  | Modes.AxeAndCart
  | Modes.LanternAndCart;

export interface Block {
  type: ActionCardsTypesBlocks;
  appliedBy: IUser;
  targetPlayer: IUser;
}

type PlayableActions = Modes.playPath | Modes.Discard | Modes.playAction;

interface PlayerAction {
  type: PlayableActions;
  player: IUser;
  targetPlayer?: IUser; // For block-related actions
  card: ICardBasic;
}

import {ActionCard, ICardBasic} from "./DexType";

export interface IUser {
    id?: string | number;
    userName: string;
    Hand: ICardBasic[];
    actions: ActionCard[];
    selectedCardIndex?: number;
    score?: number;
    isTurn?: boolean;
}

interface Player {
    id: string;
    username: string;
    role: 'Miner' | 'Saboteur';
    goldNuggets: number;
    hand: ICardBasic[]; // Assuming you have a Card interface or class
    blocks: Block[]; // Assuming you have a Block interface or class
    actions: Action[]; // List of actions performed by the player
}

interface Block {
    type: 'CartOff' | 'PickaxeOff' | 'LanternOff';
    appliedBy: Player;
    targetPlayer: Player;
}

interface Action {
    type: 'PlayCard' | 'DiscardCard' | 'ApplyBlock' | 'RemoveBlock';
    player: Player;
    targetPlayer?: Player; // For block-related actions
    card: Card;
}

import {FOT} from "../BusinessLogic/Cards/Actions";
import {newFormatInterface} from "../BusinessLogic/Logic";
import {BusySquare} from "../BusinessLogic/GameEngine/Matrix";

export interface dexType {
    Action: 'A';
    Base: 'B';
    Destroy: 'D';
    Map: 'M';
    Miner: "M";
    Path: "P";
    Player: "L";
    Reward: 'R';
    Saboteur: 'S';
    N: typeof FOT;
    S: typeof FOT;
    E: typeof FOT;
    W: typeof FOT;
    C: typeof FOT;
    R: typeof FOT;
    Axe: typeof FOT;
    Cart: typeof FOT;
    Lantern: typeof FOT;
    Gold: 'G';
    Rock: 'R';
    Start: 'S';
    AxeCart: 'G';
    AxeLantern: 'B';
    CartLantern: 'E';
    AxeS: 'A',
    CartS: 'C',
    LanternS: 'L',

}

export interface FOTType {
    F: 'F';
    T: 'T'
}

export interface IMatrix {
    Card: newFormatInterface;
    Occupied: boolean;
    Checked?: string;
    Available?: BusySquare;
    //Here it is necessary to add the player who played the card because I need to know this stuff
    // User?: string;
}

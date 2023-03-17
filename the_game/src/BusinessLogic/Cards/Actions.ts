import Map from "../../../public/images/SaboteurImagesSingle/Actions/map.png";
import LanternCart from "../../../public/images/SaboteurImagesSingle/Actions/2Powers/3.png";

import Destroy from '../../../public/images/SaboteurImagesSingle/Actions/destroyPath.png'
import AxeOn from '../../../public/images/SaboteurImagesSingle/Actions/Axe/1.png'
import AxeOff from '../../../public/images/SaboteurImagesSingle/Actions/Axe/2.png'
import LanternOn from '../../../public/images/SaboteurImagesSingle/Actions/Felinar/1.png'
import LanternOff from '../../../public/images/SaboteurImagesSingle/Actions/Felinar/2.png'
import CartOn from '../../../public/images/SaboteurImagesSingle/Actions/Cart/1.png'
import CartOff from '../../../public/images/SaboteurImagesSingle/Actions/Cart/2.png'
import CartAxe from '../../../public/images/SaboteurImagesSingle/Actions/2Powers/1.png'
import LanternAxe from '../../../public/images/SaboteurImagesSingle/Actions/2Powers/2.png'

import {ActionCard, dexType, FOTType, ICardBasic} from "../../Types/DexType";
import {Modes} from "../../constants";

export let FOT: FOTType = {F: 'F', T: 'T'};
export const dex: dexType = {
    Action: 'A',
    Base: 'B',
    Destroy: 'D',
    Map: 'M',
    Miner: 'M',
    Path: 'P',
    Player: 'L',
    Reward: 'R',
    Saboteur: 'S',
    N: {...FOT},
    S: {...FOT},
    E: {...FOT},
    W: {...FOT},
    C: {...FOT},
    R: {...FOT},
    Axe: {...FOT},
    Cart: {...FOT},
    Lantern: {...FOT},
    AxeS: 'A',
    CartS: 'C',
    LanternS: 'L',
    Gold: 'G',
    Rock: 'R',
    AxeCart: 'G',
    AxeLantern: 'B',
    CartLantern: 'E',
    Start: 'S',
}
const Maps: ICardBasic[] = [
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
    {
        src: Map,
        code: [Modes.Base, Modes.Action, dex.Map]
    },
]
let TwoActions: ICardBasic[] = [
    {
        src: LanternCart,
        code: [Modes.Base, Modes.Action, dex.CartLantern]
    },
    {
        src: LanternAxe,
        code: [Modes.Base, Modes.Action, Modes.Base]
    },
    {
        src: CartAxe,
        code: [Modes.Base, Modes.Action, dex.AxeCart]
    },
];
let DestroyPath: ICardBasic[] = [
    {
        src: Destroy,
        code: [Modes.Base, Modes.Action, dex.Destroy]
    },
    {
        src: Destroy,
        code: [Modes.Base, Modes.Action, dex.Destroy]
    },
    {
        src: Destroy,
        code: [Modes.Base, Modes.Action, dex.Destroy]
    }
];
let Cart: ICardBasic[] = [
    {
        src: CartOn,
        code: [Modes.Base, Modes.Action, dex.CartS, dex.Cart.T]
    },
    {
        src: CartOn,
        code: [Modes.Base, Modes.Action, dex.CartS, dex.Cart.T]
    },
    {
        src: CartOff,
        code: [Modes.Base, Modes.Action, dex.CartS, dex.Cart.F]
    },
    {
        src: CartOff,
        code: [Modes.Base, Modes.Action, dex.CartS, dex.Cart.F]
    },
    {
        src: CartOff,
        code: [Modes.Base, Modes.Action, dex.CartS, dex.Cart.F]
    },
]
let Axe: ActionCard[] = [
    {
        src: AxeOn,
        code: [Modes.Base, Modes.Action, dex.AxeS, dex.Axe.T]
    },
    {
        src: AxeOn,
        code: [Modes.Base, Modes.Action, dex.AxeS, dex.Axe.T]
    },
    {
        src: AxeOff,
        code: [Modes.Base, Modes.Action, dex.AxeS, dex.Axe.F]

    },
    {
        src: AxeOff,
        code: [Modes.Base, Modes.Action, dex.AxeS, dex.Axe.F]

    },
    {
        src: AxeOff,
        code: [Modes.Base, Modes.Action, dex.AxeS, dex.Axe.F]

    }
]
let Lantern: ICardBasic[] = [
    {
        src: LanternOn,
        code: [Modes.Base, Modes.Action, dex.LanternS, dex.Lantern.T]
    },
    {
        src: LanternOn,
        code: [Modes.Base, Modes.Action, dex.LanternS, dex.Lantern.T]

    },
    {
        src: LanternOff,
        code: [Modes.Base, Modes.Action, dex.LanternS, dex.Lantern.F]

    },
    {
        src: LanternOff,
        code: [Modes.Base, Modes.Action, dex.LanternS, dex.Lantern.F]
    },
    {
        src: LanternOff,
        code: [Modes.Base, Modes.Action, dex.LanternS, dex.Lantern.F]

    },
];
export const Actions: ICardBasic[] = [
    ...Maps,
    ...TwoActions,
    ...DestroyPath,
    ...Cart,
    ...Axe,
    ...Lantern,
]

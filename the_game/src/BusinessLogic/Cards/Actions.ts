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

import {newFormatInterface} from "../Logic";
import {dexType, FOTType} from "../../Types/DexType";

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
const Maps: newFormatInterface[] = [
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
    {
        src: Map,
        code: [dex.Base, dex.Action, dex.Map]
    },
]
let TwoActions: newFormatInterface[] = [
    {
        src: LanternCart,
        code: [dex.Base, dex.Action, dex.CartLantern]
    },
    {
        src: LanternAxe,
        code: [dex.Base, dex.Action, dex.Base]
    },
    {
        src: CartAxe,
        code: [dex.Base, dex.Action, dex.AxeCart]
    },
];
let DestroyPath: newFormatInterface[] = [
    {
        src: Destroy,
        code: [dex.Base, dex.Action, dex.Destroy]
    },
    {
        src: Destroy,
        code: [dex.Base, dex.Action, dex.Destroy]
    },
    {
        src: Destroy,
        code: [dex.Base, dex.Action, dex.Destroy]
    }
];
let Cart: newFormatInterface[] = [
    {
        src: CartOn,
        code: [dex.Base, dex.Action, dex.CartS, dex.Cart.T]
    },
    {
        src: CartOn,
        code: [dex.Base, dex.Action, dex.CartS, dex.Cart.T]
    },
    {
        src: CartOff,
        code: [dex.Base, dex.Action, dex.CartS, dex.Cart.F]
    },
    {
        src: CartOff,
        code: [dex.Base, dex.Action, dex.CartS, dex.Cart.F]
    },
    {
        src: CartOff,
        code: [dex.Base, dex.Action, dex.CartS, dex.Cart.F]
    },
]
let Axe: newFormatInterface[] = [
    {
        src: AxeOn,
        code: [dex.Base, dex.Action, dex.AxeS, dex.Axe.T]
    },
    {
        src: AxeOn,
        code: [dex.Base, dex.Action, dex.AxeS, dex.Axe.T]
    },
    {
        src: AxeOff,
        code: [dex.Base, dex.Action, dex.AxeS, dex.Axe.F]

    },
    {
        src: AxeOff,
        code: [dex.Base, dex.Action, dex.AxeS, dex.Axe.F]

    },
    {
        src: AxeOff,
        code: [dex.Base, dex.Action, dex.AxeS, dex.Axe.F]

    }
]
let Lantern: newFormatInterface[] = [
    {
        src: LanternOn,
        code: [dex.Base, dex.Action, dex.LanternS, dex.Lantern.T]
    },
    {
        src: LanternOn,
        code: [dex.Base, dex.Action, dex.LanternS, dex.Lantern.T]

    },
    {
        src: LanternOff,
        code: [dex.Base, dex.Action, dex.LanternS, dex.Lantern.F]

    },
    {
        src: LanternOff,
        code: [dex.Base, dex.Action, dex.LanternS, dex.Lantern.F]
    },
    {
        src: LanternOff,
        code: [dex.Base, dex.Action, dex.LanternS, dex.Lantern.F]

    },
];
export const Actions: newFormatInterface[] = [
    ...Maps,
    ...TwoActions,
    ...DestroyPath,
    ...Cart,
    ...Axe,
    ...Lantern,
]

import Map from '../../../public/images/SaboteurImagesSingle/Actions/map.png';
import LanternCart from '../../../public/images/SaboteurImagesSingle/Actions/2Powers/3.png';

import Destroy from '../../../public/images/SaboteurImagesSingle/Actions/destroyPath.png';
import AxeOn from '../../../public/images/SaboteurImagesSingle/Actions/Axe/1.png';
import AxeOff from '../../../public/images/SaboteurImagesSingle/Actions/Axe/2.png';
import LanternOn from '../../../public/images/SaboteurImagesSingle/Actions/Felinar/1.png';
import LanternOff from '../../../public/images/SaboteurImagesSingle/Actions/Felinar/2.png';
import CartOn from '../../../public/images/SaboteurImagesSingle/Actions/Cart/1.png';
import CartOff from '../../../public/images/SaboteurImagesSingle/Actions/Cart/2.png';
import CartAxe from '../../../public/images/SaboteurImagesSingle/Actions/2Powers/1.png';
import LanternAxe from '../../../public/images/SaboteurImagesSingle/Actions/2Powers/2.png';

import { ActionCard, dexType, FOTType, ICardBasic } from '../../Types/DexType';
import { Modes } from '../../enums';

export let FOT: FOTType = { F: 'F', T: 'T' };
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
  N: { ...FOT },
  S: { ...FOT },
  E: { ...FOT },
  W: { ...FOT },
  C: { ...FOT },
  R: { ...FOT },
  Axe: { ...FOT },
  Cart: { ...FOT },
  Lantern: { ...FOT },
  AxeS: 'A',
  CartS: 'C',
  LanternS: 'L',
  Gold: 'G',
  Rock: 'R',
  AxeCart: 'G',
  AxeLantern: 'B',
  CartLantern: 'E',
  Start: 'S',
};
const Maps: ActionCard[] = [
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: Map,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
];
let TwoActions: ActionCard[] = [
  {
    src: LanternCart,
    code: [Modes.Base, Modes.Action, Modes.LanternAndCard],
  },
  {
    src: LanternAxe,
    code: [Modes.Base, Modes.Action, Modes.AxeAndLantern],
  },
  {
    src: CartAxe,
    code: [Modes.Base, Modes.Action, Modes.AxeAndCart],
  },
];
let DestroyPath: ActionCard[] = [
  {
    src: Destroy,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
  {
    src: Destroy,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
  {
    src: Destroy,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
];
let Cart: ActionCard[] = [
  {
    src: CartOn,
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.True],
  },
  {
    src: CartOn,
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.True],
  },
  {
    src: CartOff,
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
  {
    src: CartOff,
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
  {
    src: CartOff,
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
];
let Axe: ActionCard[] = [
  {
    src: AxeOn,
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.True],
  },
  {
    src: AxeOn,
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.True],
  },
  {
    src: AxeOff,
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
  {
    src: AxeOff,
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
  {
    src: AxeOff,
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
];
let Lantern: ActionCard[] = [
  {
    src: LanternOn,
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.True],
  },
  {
    src: LanternOn,
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.True],
  },
  {
    src: LanternOff,
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
  {
    src: LanternOff,
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
  {
    src: LanternOff,
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
];
export const Actions: ICardBasic[] = [...Maps, ...TwoActions, ...DestroyPath, ...Cart, ...Axe, ...Lantern];

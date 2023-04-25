import { ActionCard, dexType, FOTType, ICardBasic } from '@src/Types/DexType';
import { Modes } from '@src/enums';
import { CardTypes } from '@src/data/cards';

export const FOT: FOTType = { F: 'F', T: 'T' };
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
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
  {
    src: CardTypes.ACTIONS.MAP,
    code: [Modes.Base, Modes.Action, Modes.Map],
  },
];
const TwoActions: ActionCard[] = [
  {
    src: CardTypes.ACTIONS.TWO_POWERS[0],
    code: [Modes.Base, Modes.Action, Modes.LanternAndCard],
  },
  {
    src: CardTypes.ACTIONS.TWO_POWERS[1],
    code: [Modes.Base, Modes.Action, Modes.AxeAndLantern],
  },
  {
    src: CardTypes.ACTIONS.TWO_POWERS[2],
    code: [Modes.Base, Modes.Action, Modes.AxeAndCart],
  },
];
const DestroyPath: ActionCard[] = [
  {
    src: CardTypes.ACTIONS.DESTROY,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
  {
    src: CardTypes.ACTIONS.DESTROY,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
  {
    src: CardTypes.ACTIONS.DESTROY,
    code: [Modes.Base, Modes.Action, Modes.Destroy],
  },
];
const Cart: ActionCard[] = [
  {
    src: CardTypes.ACTIONS.CART[0],
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.CART[0],
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.CART[1],

    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.CART[1],
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.CART[1],
    code: [Modes.Base, Modes.Action, Modes.Cart, Modes.False],
  },
];
const Axe: ActionCard[] = [
  {
    src: CardTypes.ACTIONS.AXE[0],
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.AXE[0],
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.AXE[1],
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.AXE[1],
    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.AXE[1],

    code: [Modes.Base, Modes.Action, Modes.Axe, Modes.False],
  },
];
const Lantern: ActionCard[] = [
  {
    src: CardTypes.ACTIONS.FELINAR[0],

    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.FELINAR[0],
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.True],
  },
  {
    src: CardTypes.ACTIONS.FELINAR[1],
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.FELINAR[1],
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
  {
    src: CardTypes.ACTIONS.FELINAR[1],
    code: [Modes.Base, Modes.Action, Modes.Lantern, Modes.False],
  },
];
export const Actions: ICardBasic[] = [...Maps, ...TwoActions, ...DestroyPath, ...Cart, ...Axe, ...Lantern];

import { ICardBasic, PlayerCard } from '@src/Types/DexType';
import { Modes } from '@src/enums';
import { CardTypes } from '@src/data/cards';

export const Saboteurs: PlayerCard[] = [
  {
    src: CardTypes.PLAYERS.BAD_GUYS[0],
    code: [Modes.Base, Modes.Player, Modes.Saboteur],
  },
  {
    src: CardTypes.PLAYERS.BAD_GUYS[1],
    code: [Modes.Base, Modes.Player, Modes.Saboteur],
  },
  {
    src: CardTypes.PLAYERS.BAD_GUYS[2],
    code: [Modes.Base, Modes.Player, Modes.Saboteur],
  },
  {
    src: CardTypes.PLAYERS.BAD_GUYS[3],
    code: [Modes.Base, Modes.Player, Modes.Saboteur],
  },
];
export const Miners: PlayerCard[] = [
  {
    src: CardTypes.PLAYERS.MINERS[0],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[1],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[2],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[3],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[4],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[5],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
  {
    src: CardTypes.PLAYERS.MINERS[6],
    code: [Modes.Base, Modes.Player, Modes.Miner],
  },
];

export const Dwarfs: ICardBasic[] = [...Miners, ...Saboteurs];

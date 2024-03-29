import { Modes } from '@src/enums';
import { ICardBasic, ISpecialPath, PathCard } from '@src/Types/DexType';
import { CardTypes } from '@src/data/cards';
import { Actions } from '@cards/Actions';

export const Blocks: PathCard[] = [
  // Blocaje Don't change
  {
    src: CardTypes.PATH[5],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[6],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[14],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[15],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[26],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[27],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[31],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[32],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False, Modes.False],
  },
  {
    src: CardTypes.PATH[35],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.False, Modes.False, Modes.False],
  },
];
const SWC: PathCard[] = [
  {
    src: CardTypes.PATH[36],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[37],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    // src: twentyNine,
    src: CardTypes.PATH[28],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[29],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[30],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
];
const NESC: PathCard[] = [
  {
    src: CardTypes.PATH[18],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
    // Trebuie sa tin minte pe partea server-ului cartile care sunt in mana la jucatori
    // Serverul are adevarul absolut in toata combinatia asta.
  },
  {
    src: CardTypes.PATH[19],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[13],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[20],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[21],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];
const NEWC: PathCard[] = [
  {
    src: CardTypes.PATH[23],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[24],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[25],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[33],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[38],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
];
export const NSC: PathCard[] = [
  {
    src: CardTypes.PATH[0],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[1],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[2],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[0],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];
const EWC: PathCard[] = [
  {
    src: CardTypes.PATH[3],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[4],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[7],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
];
export const NESWC: PathCard[] = [
  {
    src: CardTypes.PATH[10],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
    // Aici ar trebui sa fie un ID si cine a pus cartea (ID-ul userului)
    //
  },
  {
    src: CardTypes.PATH[22],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[34],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[11],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[12],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
];
const ESC: PathCard[] = [
  {
    src: CardTypes.PATH[8],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[9],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[16],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: CardTypes.PATH[16],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];

export const normalPath: ICardBasic[] = [...Blocks, ...SWC, ...NESC, ...NEWC, ...NSC, ...EWC, ...NESWC, ...ESC];

export const StartCard: ICardBasic = {
  src: CardTypes.PATH_SPECIAL[0],
  code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Start],
};
export const finishCards: ISpecialPath[] = [
  {
    src: CardTypes.PATH_SPECIAL[1],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.True, Modes.True, Modes.False, Modes.Rock],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
  {
    src: CardTypes.PATH_SPECIAL[2],
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.True, Modes.Rock],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
  {
    src: CardTypes.PATH_SPECIAL[3],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Gold],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
];
export const SpecialPath: ICardBasic[] = [StartCard, ...finishCards];

export const allPaths: ICardBasic[] = [...SpecialPath, ...normalPath];

export const PathsAndActions: ICardBasic[] = [...Actions, ...normalPath];

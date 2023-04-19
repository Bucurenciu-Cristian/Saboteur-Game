import { Actions } from './Actions';
import gold from '../../../public/images/SaboteurImagesSingle/Path/gold.png';
import rock from '../../../public/images/SaboteurImagesSingle/Path/rock.png';
import rock2 from '../../../public/images/SaboteurImagesSingle/Path/rock2.png';
import { CardTypes } from '../../data/cards';
import One from '../../../public/images/SaboteurImagesSingle/Path/1.png';
import Four from '../../../public/images/SaboteurImagesSingle/Path/4.png';
import Six from '../../../public/images/SaboteurImagesSingle/Path/6.png';
import Seven from '../../../public/images/SaboteurImagesSingle/Path/7.png';
import Nine from '../../../public/images/SaboteurImagesSingle/Path/9.png';
import Eleven from '../../../public/images/SaboteurImagesSingle/Path/11.png';
import Fifteen from '../../../public/images/SaboteurImagesSingle/Path/15.png';
import Sixteen from '../../../public/images/SaboteurImagesSingle/Path/16.png';
import nineteen from '../../../public/images/SaboteurImagesSingle/Path/19.png';
import twentyFour from '../../../public/images/SaboteurImagesSingle/Path/24.png';
import twentySeven from '../../../public/images/SaboteurImagesSingle/Path/27.png';
import twentyEight from '../../../public/images/SaboteurImagesSingle/Path/28.png';
import thirtyTwo from '../../../public/images/SaboteurImagesSingle/Path/32.png';
import thirtyThree from '../../../public/images/SaboteurImagesSingle/Path/33.png';
import thirtySix from '../../../public/images/SaboteurImagesSingle/Path/36.png';
import thirtySeven from '../../../public/images/SaboteurImagesSingle/Path/37.png';
import thirtyEight from '../../../public/images/SaboteurImagesSingle/Path/38.png';
import twentyNine from '../../../public/images/SaboteurImagesSingle/Path/29.png';
import thirty from '../../../public/images/SaboteurImagesSingle/Path/30.png';
import thirtyOne from '../../../public/images/SaboteurImagesSingle/Path/31.png';
import twenty from '../../../public/images/SaboteurImagesSingle/Path/20.png';
import Fourteen from '../../../public/images/SaboteurImagesSingle/Path/14.png';
import twentyOne from '../../../public/images/SaboteurImagesSingle/Path/21.png';
import twentyTwo from '../../../public/images/SaboteurImagesSingle/Path/22.png';
import twentyFive from '../../../public/images/SaboteurImagesSingle/Path/25.png';
import twentySix from '../../../public/images/SaboteurImagesSingle/Path/26.png';
import thirtyFour from '../../../public/images/SaboteurImagesSingle/Path/34.png';
import thirtyNine from '../../../public/images/SaboteurImagesSingle/Path/39.png';
import Two from '../../../public/images/SaboteurImagesSingle/Path/2.png';
import Three from '../../../public/images/SaboteurImagesSingle/Path/3.png';
import Five from '../../../public/images/SaboteurImagesSingle/Path/5.png';
import Eight from '../../../public/images/SaboteurImagesSingle/Path/8.png';
import twentyThree from '../../../public/images/SaboteurImagesSingle/Path/23.png';
import thirtyFive from '../../../public/images/SaboteurImagesSingle/Path/35.png';
import Twelve from '../../../public/images/SaboteurImagesSingle/Path/12.png';
import Thirtheen from '../../../public/images/SaboteurImagesSingle/Path/13.png';
import Ten from '../../../public/images/SaboteurImagesSingle/Path/10.png';
import SevenTeen from '../../../public/images/SaboteurImagesSingle/Path/17.png';
import winning from '../../../public/images/SaboteurImagesSingle/Back_of_cards/winning.png';

import { ICardBasic, ISpecialPath, PathCard } from '../../Types/DexType';
import { Modes } from '../../enums';

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
const SWC: ICardBasic[] = [
  {
    src: thirtySeven,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirtyEight,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: twentyNine,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirty,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirtyOne,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False],
  },
];
const NESC: ICardBasic[] = [
  {
    src: nineteen,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
    // Trebuie sa tin minte pe partea server-ului cartile care sunt in mana la jucatori
    // Serverul are adevarul absolut in toata combinatia asta.
  },
  {
    src: twenty,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: Fourteen,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: twentyOne,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: twentyTwo,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];
const NEWC: ICardBasic[] = [
  {
    src: twentyFour,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: twentyFive,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: twentySix,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirtyFour,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirtyNine,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
];
const NSC: ICardBasic[] = [
  {
    src: One,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: Two,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: Three,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: One,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];
const EWC: ICardBasic[] = [
  {
    src: Four,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: Five,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
  {
    src: Eight,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False],
  },
];
export const NESWC: ICardBasic[] = [
  {
    src: Eleven,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
    // Aici ar trebui sa fie un ID si cine a pus cartea (ID-ul userului)
    //
  },
  {
    src: twentyThree,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: thirtyFive,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: Twelve,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
  {
    src: Thirtheen,
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False],
  },
];
const ESC: ICardBasic[] = [
  {
    src: Nine,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: Ten,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: SevenTeen,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
  {
    src: SevenTeen,
    code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False],
  },
];

export const normalPath: ICardBasic[] = [
  ...Blocks, // Done
  ...SWC, // Done
  ...NESC, // Done
  ...NEWC, // Done
  ...NSC, // Done
  ...EWC, // Done
  ...NESWC, // Done
  ...ESC, // Done
];

const StartCard: ICardBasic = {
  src: CardTypes.PATH_SPECIAL[0],
  code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Start],
  // id: 1,
};
export const finishCards: ISpecialPath[] = [
  {
    src: CardTypes.PATH_SPECIAL[1],
    // code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.True, Modes.True, Modes.False, dex.Rock],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Rock],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
  {
    src: CardTypes.PATH_SPECIAL[3],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Gold],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
  {
    src: CardTypes.PATH_SPECIAL[2],
    // code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False, Modes.Rock],
    code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.Rock],
    back: CardTypes.BACK_OF_CARDS.WINNING,
  },
];
export const SpecialPath: ICardBasic[] = [StartCard, ...finishCards];

export const allPaths: ICardBasic[] = [...SpecialPath, ...normalPath];

export const PathsAndActions: ICardBasic[] = [...normalPath, ...Actions];

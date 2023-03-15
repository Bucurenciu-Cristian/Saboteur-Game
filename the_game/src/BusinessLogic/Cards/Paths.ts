import {Actions, dex} from "./Actions";
import gold from "../../../public/images/SaboteurImagesSingle/Path/gold.png";
import start from "../../../public/images/SaboteurImagesSingle/Path/start.png";
import rock from "../../../public/images/SaboteurImagesSingle/Path/rock.png";
import rock2 from "../../../public/images/SaboteurImagesSingle/Path/rock2.png";

import One from "../../../public/images/SaboteurImagesSingle/Path/1.png";
import Four from '../../../public/images/SaboteurImagesSingle/Path/4.png'
import Six from '../../../public/images/SaboteurImagesSingle/Path/6.png'
import Seven from '../../../public/images/SaboteurImagesSingle/Path/7.png'
import Nine from '../../../public/images/SaboteurImagesSingle/Path/9.png'
import Eleven from '../../../public/images/SaboteurImagesSingle/Path/11.png'
import Fifteen from '../../../public/images/SaboteurImagesSingle/Path/15.png'
import Sixteen from '../../../public/images/SaboteurImagesSingle/Path/16.png'
import nineteen from '../../../public/images/SaboteurImagesSingle/Path/19.png'
import twentyFour from '../../../public/images/SaboteurImagesSingle/Path/24.png'
import twentySeven from '../../../public/images/SaboteurImagesSingle/Path/27.png'
import twentyEight from '../../../public/images/SaboteurImagesSingle/Path/28.png'
import thirtyTwo from '../../../public/images/SaboteurImagesSingle/Path/32.png'
import thirtyThree from '../../../public/images/SaboteurImagesSingle/Path/33.png'
import thirtySix from '../../../public/images/SaboteurImagesSingle/Path/36.png'
import thirtySeven from '../../../public/images/SaboteurImagesSingle/Path/37.png'

import winning from '../../../public/images/SaboteurImagesSingle/Back_of_cards/winning.png'
import thirtyEight from "../../../public/images/SaboteurImagesSingle/Path/38.png";
import twentyNine from "../../../public/images/SaboteurImagesSingle/Path/29.png";
import thirty from "../../../public/images/SaboteurImagesSingle/Path/30.png";
import thirtyOne from "../../../public/images/SaboteurImagesSingle/Path/31.png";
import twenty from "../../../public/images/SaboteurImagesSingle/Path/20.png";
import Fourteen from "../../../public/images/SaboteurImagesSingle/Path/14.png";
import twentyOne from "../../../public/images/SaboteurImagesSingle/Path/21.png";
import twentyTwo from "../../../public/images/SaboteurImagesSingle/Path/22.png";
import twentyFive from "../../../public/images/SaboteurImagesSingle/Path/25.png";
import twentySix from "../../../public/images/SaboteurImagesSingle/Path/26.png";
import thirtyFour from "../../../public/images/SaboteurImagesSingle/Path/34.png";
import thirtyNine from "../../../public/images/SaboteurImagesSingle/Path/39.png";
import Two from "../../../public/images/SaboteurImagesSingle/Path/2.png";
import Three from "../../../public/images/SaboteurImagesSingle/Path/3.png";
import Five from "../../../public/images/SaboteurImagesSingle/Path/5.png";
import Eight from "../../../public/images/SaboteurImagesSingle/Path/8.png";
import twentyThree from "../../../public/images/SaboteurImagesSingle/Path/23.png";
import thirtyFive from "../../../public/images/SaboteurImagesSingle/Path/35.png";
import Twelve from "../../../public/images/SaboteurImagesSingle/Path/12.png";
import Thirtheen from "../../../public/images/SaboteurImagesSingle/Path/13.png";
import Ten from "../../../public/images/SaboteurImagesSingle/Path/10.png";
import SevenTeen from "../../../public/images/SaboteurImagesSingle/Path/17.png";
import {ICardBasic, ISpecialPath} from "../../Types/DexType";

let Blocks: ICardBasic[] = [
    //Blocaje Don't change
    {
        src: Six,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.T, dex.C.F, dex.R.F]
    },
    {
        src: Seven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.F, dex.W.T, dex.C.F, dex.R.F]
    },
    {
        src: Fifteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.F, dex.R.F]
    },
    {
        src: Sixteen,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.F, dex.R.F]
    },
    {
        src: twentySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: twentyEight,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.F, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: thirtyTwo,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.F, dex.R.F]
    },
    {
        src: thirtyThree,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.F, dex.R.F]
    },
    {
        src: thirtySix,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.F, dex.C.F, dex.R.F]
    },
];
let SWC: ICardBasic[] = [
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtyEight,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyNine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirty,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtyOne,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    }
];
let NESC: ICardBasic[] = [
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
        // Trebuie sa tin minte pe partea server-ului cartile care sunt in mana la jucatori
        // Serverul are adevarul absolut in toata combinatia asta.

    },
    {
        src: twenty,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: Fourteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: twentyOne,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: twentyTwo,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
]
let NEWC: ICardBasic[] = [
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyFive,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentySix,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtyFour,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtyNine,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
];
let NSC: ICardBasic[] = [
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: Two,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: Three,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
];
let EWC: ICardBasic[] = [
    {
        src: Four,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Five,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Eight,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
];
export let NESWC: ICardBasic[] = [
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
        // Aici ar trebui sa fie un ID si cine a pus cartea (ID-ul userului)
        //
    },
    {
        src: twentyThree,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: thirtyFive,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Twelve,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Thirtheen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
];
let ESC: ICardBasic[] = [
    {
        src: Nine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: Ten,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: SevenTeen,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: SevenTeen,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    }
];

export let normalPath: ICardBasic[] = [
    ...Blocks, //Done
    ...SWC, //Done
    ...NESC, //Done
    ...NEWC, //Done
    ...NSC, //Done
    ...EWC, //Done
    ...NESWC, //Done
    ...ESC, //Done
]

export let SpecialPath: ISpecialPath[] = [
    {
        src: start,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F, dex.Start],
        // id: 1,
    },
    {
        src: rock,
        // code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.F, dex.W.T, dex.C.T, dex.R.F, dex.Rock],
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F, dex.Rock],
        back: winning
    },
    {
        src: gold,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F, dex.Gold],
        back: winning
    },
    {
        src: rock2,
        // code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.F, dex.W.F, dex.C.T, dex.R.F, dex.Rock],
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F, dex.Rock],
        back: winning
    },
];

export let allPaths: ICardBasic[] = [
    ...SpecialPath,
    ...normalPath
];

export let allPaths2: ICardBasic[] = [
    ...normalPath,
    ...Actions
]

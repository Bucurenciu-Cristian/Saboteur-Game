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
import winning from "../../../public/images/SaboteurImagesSingle/Back_of_cards/winning.png";


import {ICardBasic, ISpecialPath, PathCard} from "../../Types/DexType";
import {Modes} from "../../constants";

export let Blocks: PathCard[] = [
    //Blocaje Don't change
    {
        src: Six,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False]
    },
    {
        src: Seven,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False, Modes.False]
    },
    {
        src: Fifteen,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.False, Modes.False]
    },
    {
        src: Sixteen,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False, Modes.False]
    },
    {
        src: twentySeven,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False]
    },
    {
        src: twentyEight,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.False, Modes.True, Modes.False]
    },
    {
        src: thirtyTwo,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False]
    },
    {
        src: thirtyThree,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.False, Modes.False]
    },
    {
        src: thirtySix,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.False, Modes.False, Modes.False]
    },
];
let SWC: ICardBasic[] = [
    {
        src: thirtySeven,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False]
    },
    {
        src: thirtyEight,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False]
    },
    {
        src: twentyNine,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False]
    },
    {
        src: thirty,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False]
    },
    {
        src: thirtyOne,
        code: [Modes.Base, Modes.Path, Modes.False, Modes.False, Modes.True, Modes.True, Modes.True, Modes.False]
    }
];
let NESC: ICardBasic[] = [
    {
        src: nineteen,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False]
        // Trebuie sa tin minte pe partea server-ului cartile care sunt in mana la jucatori
        // Serverul are adevarul absolut in toata combinatia asta.

    },
    {
        src: twenty,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: Fourteen,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: twentyOne,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: twentyTwo,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.False, Modes.True, Modes.False]
    },
]
let NEWC: ICardBasic[] = [
    {
        src: twentyFour,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False]
    },
    {
        src: twentyFive,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False]
    },
    {
        src: twentySix,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False]
    },
    {
        src: thirtyFour,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False]
    },
    {
        src: thirtyNine,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.True, Modes.True, Modes.False]
    },
];
let NSC: ICardBasic[] = [
    {
        src: One,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: Two,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: Three,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False]
    },
    {
        src: One,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.True, Modes.False, Modes.True, Modes.False]
    },
];
let EWC: ICardBasic[] = [
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
export let NESWC: ICardBasic[] = [
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
let ESC: ICardBasic[] = [
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
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, dex.Start],
        // id: 1,
    },
    {
        src: rock,
        // code: [Modes.Base, Modes.Path, Modes.True, Modes.False, Modes.False, Modes.True, Modes.True, Modes.False, dex.Rock],
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, dex.Rock],
        back: winning
    },
    {
        src: gold,
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, dex.Gold],
        back: winning
    },
    {
        src: rock2,
        // code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.False, Modes.False, Modes.True, Modes.False, dex.Rock],
        code: [Modes.Base, Modes.Path, Modes.True, Modes.True, Modes.True, Modes.True, Modes.True, Modes.False, dex.Rock],
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

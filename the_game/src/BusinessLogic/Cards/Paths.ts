import {dex} from "./Actions";
import {ISpecialPath, newFormatInterface} from "../Logic";
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


let Blocks: newFormatInterface[] = [
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
let SWC: newFormatInterface[] = [
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: thirtySeven,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.F, dex.S.T, dex.W.T, dex.C.T, dex.R.F]
    }
];
let NESC: newFormatInterface[] = [
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: nineteen,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
]
let NEWC: newFormatInterface[] = [
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
    {
        src: twentyFour,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F]
    },
];
let NSC: newFormatInterface[] = [
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
];
let EWC: newFormatInterface[] = [
    {
        src: Four,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Four,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Four,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.F, dex.W.T, dex.C.T, dex.R.F],
    },
];
let NESWC: newFormatInterface[] = [
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
    {
        src: Eleven,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F],
    },
];
let ESC: newFormatInterface[] = [
    {
        src: Nine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: Nine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: Nine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    },
    {
        src: Nine,
        code: [dex.Base, dex.Path, dex.N.F, dex.E.T, dex.S.T, dex.W.F, dex.C.T, dex.R.F],
    }
];

export let normalPath: newFormatInterface[] = [
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
        code: [dex.Base, dex.Path, dex.Start]
    },
    {
        src: rock,
        code: [dex.Base, dex.Path, dex.Rock],
        back: winning
    },
    {
        src: gold,
        code: [dex.Base, dex.Path, dex.Gold],
        back: winning
    },
    {
        src: rock2,
        code: [dex.Base, dex.Path, dex.Rock],
        back: winning
    },
];

export let allPath: newFormatInterface[] = [
    // ...SpecialPath,
    ...normalPath
];

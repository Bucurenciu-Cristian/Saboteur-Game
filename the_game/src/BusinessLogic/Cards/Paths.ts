import One from "../../../public/images/SaboteurImagesSingle/Path/1.png";
import {dex} from "./Actions";
import Two from "../../../public/images/SaboteurImagesSingle/Path/2.png";
import {newFormatInterface} from "../Logic";
import gold from "../../../public/images/SaboteurImagesSingle/Path/gold.png";
import start from "../../../public/images/SaboteurImagesSingle/Path/start.png";
import rock from "../../../public/images/SaboteurImagesSingle/Path/rock.png";
import rock2 from "../../../public/images/SaboteurImagesSingle/Path/rock2.png";

let normalPath: newFormatInterface[] = [
    {
        src: One,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    },
    {
        src: Two,
        code: [dex.Base, dex.Path, dex.N.T, dex.E.F, dex.S.T, dex.W.F, dex.C.T, dex.R.F]
    }
]

let SpecialPath: newFormatInterface[] = [
    {
        src: start,
        code: [dex.Base, dex.Path, dex.Start]
    },
    {
        src: gold,
        code: [dex.Base, dex.Path, dex.Gold]
    },
    {
        src: rock,
        code: [dex.Base, dex.Path, dex.Rock]
    },
    {
        src: rock2,
        code: [dex.Base, dex.Path, dex.Rock]
    },
];

export let allPath: newFormatInterface[] = [
    ...normalPath,
    ...SpecialPath
];

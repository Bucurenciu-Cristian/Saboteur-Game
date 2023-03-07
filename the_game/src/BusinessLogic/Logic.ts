import reward from '../../public/images/SaboteurImagesSingle/Back_of_cards/reward.png'
import start2 from '../../public/images/SaboteurImagesSingle/Back_of_cards/start2.png'
import winning from '../../public/images/SaboteurImagesSingle/Back_of_cards/winning.png'
import players from '../../public/images/SaboteurImagesSingle/Back_of_cards/players.png'
import pathOrAction from '../../public/images/SaboteurImagesSingle/Back_of_cards/pathOrAction.png'

import One from "../../public/images/SaboteurImagesSingle/Path/1.png";
import Two from '../../public/images/SaboteurImagesSingle/Path/2.png'
import Three from '../../public/images/SaboteurImagesSingle/Path/3.png'
import Four from '../../public/images/SaboteurImagesSingle/Path/4.png'
import Five from '../../public/images/SaboteurImagesSingle/Path/5.png'
import Six from '../../public/images/SaboteurImagesSingle/Path/6.png'
import Seven from '../../public/images/SaboteurImagesSingle/Path/7.png'
import Eight from '../../public/images/SaboteurImagesSingle/Path/8.png'
import Nine from '../../public/images/SaboteurImagesSingle/Path/9.png'
import Ten from '../../public/images/SaboteurImagesSingle/Path/10.png'
import Eleven from '../../public/images/SaboteurImagesSingle/Path/11.png'
import Twelve from '../../public/images/SaboteurImagesSingle/Path/12.png'
import Thirtheen from '../../public/images/SaboteurImagesSingle/Path/13.png'
import Fourteen from '../../public/images/SaboteurImagesSingle/Path/14.png'
import Fiftheen from '../../public/images/SaboteurImagesSingle/Path/15.png'
import Sixteen from '../../public/images/SaboteurImagesSingle/Path/16.png'
import SevenTeen from '../../public/images/SaboteurImagesSingle/Path/17.png'
import EightTeen from '../../public/images/SaboteurImagesSingle/Path/18.png'
import nineteen from '../../public/images/SaboteurImagesSingle/Path/19.png'
import twenty from '../../public/images/SaboteurImagesSingle/Path/20.png'
import twentyOne from '../../public/images/SaboteurImagesSingle/Path/21.png'
import twentyTwo from '../../public/images/SaboteurImagesSingle/Path/22.png'
import twentyThree from '../../public/images/SaboteurImagesSingle/Path/23.png'
import twentyFour from '../../public/images/SaboteurImagesSingle/Path/24.png'
import twentyFive from '../../public/images/SaboteurImagesSingle/Path/25.png'
import twentySix from '../../public/images/SaboteurImagesSingle/Path/26.png'
import twentySeven from '../../public/images/SaboteurImagesSingle/Path/27.png'
import twentyEight from '../../public/images/SaboteurImagesSingle/Path/28.png'
import twentyNine from '../../public/images/SaboteurImagesSingle/Path/29.png'
import thirty from '../../public/images/SaboteurImagesSingle/Path/30.png'
import thirtyOne from '../../public/images/SaboteurImagesSingle/Path/31.png'
import thirtyTwo from '../../public/images/SaboteurImagesSingle/Path/32.png'
import thirtyThree from '../../public/images/SaboteurImagesSingle/Path/33.png'
import thirtyFour from '../../public/images/SaboteurImagesSingle/Path/34.png'
import thirtyFive from '../../public/images/SaboteurImagesSingle/Path/35.png'
import thirtySix from '../../public/images/SaboteurImagesSingle/Path/36.png'
import thirtySeven from '../../public/images/SaboteurImagesSingle/Path/37.png'
import thirtyEight from '../../public/images/SaboteurImagesSingle/Path/38.png'
import thirtyNine from '../../public/images/SaboteurImagesSingle/Path/39.png'


import {StaticImageData} from "next/image";
import {Actions} from "./Cards/Actions";
import {Dwarfs} from "./Cards/Dwarfs";
import {AllGold} from "./Cards/Rewards";
import {allPath} from "./Cards/Paths";


type CharTuple = [
    first: 'B' | 'E',
    second: 'P' | 'L' | 'A' | 'R',
    // third?: 'T' | 'F' | 'M' | 'S' | 'E' | 'G' | dex.Base | 'D'| 'C',
    ...rest: string[]
];

export interface newFormatInterface {
    code: CharTuple | string;
    src: StaticImageData;
}


export const allTheCards: newFormatInterface[] = [
    /* dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F */
    ...allPath,
    ...Dwarfs, // Done 11
    ...Actions, // Done 27
    ...AllGold, // Done 28
];

function isCodeProperty(prop: string): prop is string {
    // const regex =
    //   /^B(P[TF]{6}?|L[MS]?|A[TF]{3}[DMGEB]?|R)?|E([PLAR][TF]*|A(TF){2})$/;
    // const regex =
    // return regex.test(prop);
    const firstLetter = prop.charAt(0);
    const secondLetter = prop.charAt(1);
    const regexFirst = /^([BE])$/
    const regexSecond = /^([PLAR])$/
    if (regexFirst.test(firstLetter) && regexSecond.test(secondLetter)) {
        const theRest = prop.slice(2);
        if (regexFirst.test("B")) {
            switch (secondLetter) {
                case "P":
                    //NOTE: Here it is the Path cards
                    //NESWCR Mandatory (F or T)
                    //RGS Optional
                    const regexP = /^([TF]{6}|[RGS])$/;
                    // const regexP = /^([TF]{6})([RGS]?)$/;
                    console.log("Path")
                    return regexP.test(theRest);
                case "L":
                    const regexL = /^([MS])$/;
                    console.log("Dwarfs")
                    return regexL.test(theRest);
                case "A":
                    console.log("Actions")
                    const regexA = /^([DMGEB]|[LAC][FT])$/;
                    return regexA.test(theRest);
                case "R":
                    //Here is the Reward:
                    // TFF means 3 Gold
                    // FTF means 2 Gold
                    // FFT means 1 Gold
                    const regexR = /^(?=.*T)[TF]{3}$/;
                    console.log("Rewards")
                    return regexR.test(theRest);
                default:
                    console.info("Default case");
                    console.info("The second letter is: " + secondLetter)
                    console.log(prop);
                    return false;
            }
        } else if (regexFirst.test("E")) {
            //TODO: Here it is the Extension cards
            console.info("It is an extension card");
            return false;
        }
    } else {
        console.log(prop);
        console.info("It didn't passed the first 2 chars");
        return false;
    }
    return false;
}

function TypeGuardOnCards({code}: newFormatInterface) {
    if (typeof code !== "string") {
        code = code.join("");
    }
    if (isCodeProperty(code)) {

    } else {
        // throw new Error("Not a valid code",obj.code);
        console.info("Not a valid code", code?.split(""));
    }
}

export function checkMyCards() {
    allTheCards.forEach((obj) => {
        TypeGuardOnCards(obj);
    });
}

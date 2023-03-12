import {StaticImageData} from "next/image";
import {Actions} from "./Cards/Actions";
import {Dwarfs} from "./Cards/Dwarfs";
import {AllGold} from "./Cards/Rewards";
import {allPath} from "./Cards/Paths";
import {centerColumn, centerRows, checkTheCurrentCardInTable, InitialMatrix} from "./GameEngine/Matrix";


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

export interface ISpecialPath extends newFormatInterface {
    back?: StaticImageData;
}


export const allTheCards: newFormatInterface[] = [
    /* dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F */
    ...allPath,
    ...Dwarfs, // Done 11
    ...Actions, // Done 27
    ...AllGold, // Done 28
];

function isCodeProperty(prop: string): prop is string {
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
                    return regexP.test(theRest);
                case "L":
                    const regexL = /^([MS])$/;
                    return regexL.test(theRest);
                case "A":
                    const regexA = /^([DMGEB]|[LAC][FT])$/;
                    return regexA.test(theRest);
                case "R":
                    //Here is the Reward:
                    // TFF means 3 Gold
                    // FTF means 2 Gold
                    // FFT means 1 Gold
                    const regexR = /^(?=.*T)[TF]{3}$/;
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
    /*
      console.info(1, normalPath[0].code);
      const code = normalPath[0].code?.join("");
      normalPath[0].code = changeOrientation(code);
      console.info(2, normalPath[0].code);
    */

    checkTheCurrentCardInTable(centerRows, centerColumn, InitialMatrix);

    // let message = findAllEndCards(InitialMatrix, StartRow, StartColumn);
    // console.log(message);

}

export function changeOrientation(code: string): CharTuple | string {
    //This is working from my testing
    const secondLetter = code.charAt(1);
    const eightChar = code?.charAt(7);
    let codeArr = code.split("");
    const regexSixth = /^([TF])$/
    const regexSecond = /^(P)$/
    if (regexSecond.test(secondLetter) && regexSixth.test(eightChar)) {
        let [B, P, N, E, S, W, C, R] = [...codeArr];
        if (R === "T") {
            R = "F";
            codeArr = [B, P, N, E, S, W, C, R];
        } else {
            R = "T";
            //Changing N with S and E with W
            codeArr = [B, P, S, W, N, E, C, R];
        }
        return codeArr as CharTuple;
    } else {
        console.log("You're not supposed to see this.");
    }
    return codeArr as CharTuple;
}


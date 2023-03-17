import gold_reward_1 from "../../../public/images/SaboteurImagesSingle/Gold-reward/gold_reward_1.png";
import gold_reward_2 from "../../../public/images/SaboteurImagesSingle/Gold-reward/gold_reward_2.png";
import gold_reward_3 from "../../../public/images/SaboteurImagesSingle/Gold-reward/gold_reward_3.png";
import {FOT} from "./Actions";
import {ICardBasic} from "../../Types/DexType";
import {Modes} from "../../constants";


const Gold1: ICardBasic[] = [
    {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    }, {
        src: gold_reward_1,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.F, FOT.T]
    },
]
const Gold2: ICardBasic[] = [
    {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }, {
        src: gold_reward_2,
        code: [Modes.Base, Modes.Reward, FOT.F, FOT.T, FOT.F]
    }
]
const Gold3: ICardBasic[] = [
    {
        src: gold_reward_3,
        code: [Modes.Base, Modes.Reward, FOT.T, FOT.F, FOT.F]
    },
    {
        src: gold_reward_3,
        code: [Modes.Base, Modes.Reward, FOT.T, FOT.F, FOT.F]
    },

    {
        src: gold_reward_3,
        code: [Modes.Base, Modes.Reward, FOT.T, FOT.F, FOT.F]
    },

    {
        src: gold_reward_3,
        code: [Modes.Base, Modes.Reward, FOT.T, FOT.F, FOT.F]
    },

]

export const AllGold: ICardBasic[] = [
    ...Gold1,
    ...Gold2,
    ...Gold3
]
//All
// const frontGoldReward1 = gold_reward_1;
// const frontGoldReward2 = gold_reward_2;
// const frontGoldReward3 = gold_reward_3;
/*
16 Reward cards with 1
8 Reward cards with 2
4 Reward cards with 3
Total 16 + 8 * 2 + 4 * 3 = 40 Gold
*/
// const Goldish = new Array(16).fill({src: frontGoldReward1, back: backCardReward});
// const Goldish2 = new Array(8).fill({src: frontGoldReward2, back: backCardReward});
// const Goldish3 = new Array(4).fill({src: frontGoldReward3, back: backCardReward});
// export const Gold = [...Goldish, ...Goldish2, ...Goldish3];

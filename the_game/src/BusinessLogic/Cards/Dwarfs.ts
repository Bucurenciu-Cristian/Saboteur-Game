import Miner1 from "../../../public/images/SaboteurImagesSingle/Players/Miners/1.png";
import Miner2 from "../../../public/images/SaboteurImagesSingle/Players/Miners/2.png";
import Miner3 from "../../../public/images/SaboteurImagesSingle/Players/Miners/3.png";
import Miner4 from "../../../public/images/SaboteurImagesSingle/Players/Miners/4.png";
import Miner5 from "../../../public/images/SaboteurImagesSingle/Players/Miners/5.png";
import Miner6 from "../../../public/images/SaboteurImagesSingle/Players/Miners/6.png";
import Miner7 from "../../../public/images/SaboteurImagesSingle/Players/Miners/7.png";
import BadGuy1 from "../../../public/images/SaboteurImagesSingle/Players/BadGuys/1.png";
import BadGuy2 from "../../../public/images/SaboteurImagesSingle/Players/BadGuys/2.png";
import BadGuy3 from "../../../public/images/SaboteurImagesSingle/Players/BadGuys/3.png";
import BadGuy4 from "../../../public/images/SaboteurImagesSingle/Players/BadGuys/4.png";
import {dex} from "./Actions";
import {ICardBasic} from "../../Types/DexType";
import {Modes} from "../../constants";


const Saboteurs: ICardBasic[] = [
    {
        src: BadGuy1,
        code: [Modes.Base, Modes.Player, dex.Saboteur]
    },
    {
        src: BadGuy2,
        code: [Modes.Base, Modes.Player, dex.Saboteur]
    },
    {
        src: BadGuy3,
        code: [Modes.Base, Modes.Player, dex.Saboteur]
    },
    {
        src: BadGuy4,
        code: [Modes.Base, Modes.Player, dex.Saboteur]
    }
]
const Miners: ICardBasic[] = [
    {
        src: Miner1,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner2,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner3,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner4,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner5,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner6,
        code: [Modes.Base, Modes.Player, dex.Miner]
    },
    {
        src: Miner7,
        code: [Modes.Base, Modes.Player, dex.Miner]
    }
]

export const Dwarfs: ICardBasic[] = [
    ...Miners,
    ...Saboteurs
]


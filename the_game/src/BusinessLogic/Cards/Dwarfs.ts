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
import {newFormatInterface} from "../Logic";
import {dex} from "./Actions";


const Saboteurs: newFormatInterface[] = [
    {
        src: BadGuy1,
        code: [dex.Base, dex.Player, dex.Saboteur]
    },
    {
        src: BadGuy2,
        code: [dex.Base, dex.Player, dex.Saboteur]
    },
    {
        src: BadGuy3,
        code: [dex.Base, dex.Player, dex.Saboteur]
    },
    {
        src: BadGuy4,
        code: [dex.Base, dex.Player, dex.Saboteur]
    }
]
const Miners: newFormatInterface[] = [
    {
        src: Miner1,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner2,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner3,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner4,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner5,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner6,
        code: [dex.Base, dex.Player, dex.Miner]
    },
    {
        src: Miner7,
        code: [dex.Base, dex.Player, dex.Miner]
    }
]

export const Dwarfs: newFormatInterface[] = [
    ...Miners,
    ...Saboteurs
]
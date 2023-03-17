import {IUser} from "../Types/DexType";
import {allPaths2} from "./Cards/Paths";

export const usersList: IUser[] = [
    {
        UserName: 'Player1',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        Actions: []
    },
    {
        UserName: 'Player2',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        Actions: []
    },
    {
        UserName: 'Player3',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        Actions: []
    },
]

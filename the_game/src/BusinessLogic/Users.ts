import {allPaths2} from "./Cards/Paths";
import {IUser} from "../Types/Players";

export const usersList: IUser[] = [
    {
        userName: 'Player1',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        actions: []
    },
    {
        userName: 'Player2',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        actions: []
    },
    {
        userName: 'Player3',
        Hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        actions: []
    },
]

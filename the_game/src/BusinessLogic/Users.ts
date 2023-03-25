import { IUser } from '../Types/Players';
import { Modes } from '../enums';

export const usersList: IUser[] = [
  {
    username: 'Player1',
    role: Modes.Miner,
    hand: [],
    actions: [],
    blocks: [],
  },
  {
    username: 'Player2',
    role: Modes.Miner,
    hand: [],
    actions: [],
    blocks: [],
  },
  {
    username: 'Player3',
    role: Modes.Miner,
    hand: [],
    actions: [],
    blocks: [],
  },
];
export const NoOfPlayers = usersList.length;

// Populate the usersList with the users from the db.
// Populate the usersList with the users from the db.

/*
// check this before every turn.
if (!blocks.length() === 0) {
    // The user can't play a path. You have to highlight just the actions or the discard action.
} */
/*
    {
        username: 'Player2',
        role: Modes.Miner,
        hand: allPaths2.slice(0, 6).map(() => allPaths2[Math.floor(Math.random() * allPaths2.length)]),
        actions: [],
        blocks: []
    },
* */

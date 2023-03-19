import {assign, Machine} from 'xstate';

const saboteurMachine = Machine({
        id: 'saboteur',
        initial: 'setup',
        context: {
            players: [],
            currentPlayerIndex: 0,
            deck: [],
            discardPile: [],
            board: [],
            goldNuggets: [],
        },
        states: {
            setup: {
                on: {
                    SETUP_GAME: {
                        target: 'gameInProgress',
                        actions: ['initializeGame'],
                    },
                },
            },
            gameInProgress: {
                initial: 'playerTurn',
                states: {
                    playerTurn: {
                        on: {
                            PLAY_CART: {
                                actions: ['playCart'],
                            },
                            PLAY_AXE: {
                                actions: ['playAxe'],
                            },
                            END_TURN: {
                                target: 'nextPlayer',
                                actions: ['endTurn'],
                            },
                        },
                    },
                    nextPlayer: {
                        always: [
                            {
                                target: 'gameOver',
                                cond: 'isGameOver',
                            },
                            {
                                target: 'playerTurn',
                                actions: ['nextPlayer'],
                            },
                        ],
                    },
                    gameOver: {
                        type: 'final',
                    },
                },
            },
        },
    },
    {
        actions: {
            initializeGame: assign((context, event) => {
                // Implement game initialization logic here
            }),
            playCart: assign((context, event) => {
                // Implement the logic for playing the Cart action card here
            }),
            playAxe: assign((context, event) => {
                // Implement the logic for playing the Axe action card here
            }),
            endTurn: assign((context, event) => {
                // Implement the logic for ending the turn here
            }),
            nextPlayer: assign((context, event) => {
                const nextIndex = (context.currentPlayerIndex + 1) % context.players.length;
                return {
                    ...context,
                    currentPlayerIndex: nextIndex,
                };
            }),
        },
        guards: {
            isGameOver: (context, event) => {
                // Implement the logic to check if the game is over here
                return false;
            },
        },
    });

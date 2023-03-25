import { assign, createMachine } from 'xstate';

interface SaboteurContext {
  players: number;
  goldDiggers: number;
  saboteurs: number;
  remainingGold: number;
  currentPlayer: number;
  goldDistribution: number[];
}

const saboteurMachine = createMachine<SaboteurContext>(
  {
    predictableActionArguments: true,
    id: 'saboteur',
    initial: 'newRound',
    context: {
      players: 0,
      goldDiggers: 0,
      saboteurs: 0,
      remainingGold: 0,
      currentPlayer: 0,
      goldDistribution: [],
    },
    states: {
      newRound: {
        entry: 'resetGameState',
        on: {
          START_ROUND: 'endOfRound',
        },
      },
      endOfRound: {
        on: {
          GOLD_DIGGERS_WIN: {
            target: 'distributeGold',
            actions: ['prepareGoldDiggersGold'],
          },
          SABOTEURS_WIN: {
            target: 'distributeGold',
            actions: ['prepareSaboteursGold'],
          },
        },
      },
      distributeGold: {
        on: {
          DISTRIBUTE_GOLD: {
            target: 'distributeGold',
            actions: ['distributeGoldToCurrentPlayer'],
            cond: 'hasRemainingGold',
          },
          END_DISTRIBUTION: 'checkGameEnd',
        },
      },
      checkGameEnd: {
        on: {
          END_GAME: 'gameOver',
          CONTINUE_GAME: 'newRound',
        },
      },
      gameOver: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      resetGameState: assign((ctx) => ({
        ...ctx,
        currentPlayer: 0,
        remainingGold: 0,
        goldDistribution: [],
      })),
      prepareGoldDiggersGold: assign((ctx) => ({
        ...ctx,
        remainingGold: ctx.players,
        currentPlayer: 0,
      })),
      prepareSaboteursGold: assign((ctx) => {
        const goldPerSaboteur = ctx.saboteurs === 1 ? 4 : ctx.saboteurs <= 3 ? 3 : 2;
        const totalGold = ctx.saboteurs * goldPerSaboteur;
        return {
          ...ctx,
          remainingGold: totalGold,
          currentPlayer: 0,
        };
      }),
      distributeGoldToCurrentPlayer: assign((ctx) => {
        const goldDistribution = [...ctx.goldDistribution];
        goldDistribution[ctx.currentPlayer] += ctx.remainingGold > 0 ? 1 : 0;
        return {
          ...ctx,
          goldDistribution,
          remainingGold: ctx.remainingGold - 1,
          currentPlayer: (ctx.currentPlayer + 1) % ctx.players,
        };
      }),
    },
    guards: {
      hasRemainingGold: (ctx) => ctx.remainingGold > 0,
    },
  }
);

export default saboteurMachine;

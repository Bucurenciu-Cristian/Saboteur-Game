const BASE_PATH = '/images/SaboteurImagesSingle';
const ACTIONS_PATH = `${BASE_PATH}/Actions`;
const BACK_OF_CARDS_PATH = `/images/SaboteurImagesSingle/Back_of_cards`;
const GOLD_REWARD_PATH = `${BASE_PATH}/Gold-reward`;
const PATH_PATH = `${BASE_PATH}/Path`;
const PLAYERS_PATH = `${BASE_PATH}/Players`;

const BAD_GUYS_PATH = `${PLAYERS_PATH}/BadGuys`;
const MINERS_PATH = `${PLAYERS_PATH}/Miners`;

export const CardTypes = {
  ACTIONS: {
    TWO_POWERS: Array.from({ length: 3 }, (_, i) => `${ACTIONS_PATH}/2Powers/${i + 1}.png`),
    AXE: Array.from({ length: 2 }, (_, i) => `${ACTIONS_PATH}/Axe/${i + 1}.png`),
    FELINAR: Array.from({ length: 2 }, (_, i) => `${ACTIONS_PATH}/Felinar/${i + 1}.png`),
    CART: Array.from({ length: 2 }, (_, i) => `${ACTIONS_PATH}/Cart/${i + 1}.png`),
    MAP: `${ACTIONS_PATH}/map.png`,
    DESTROY: `${ACTIONS_PATH}/destroyPath.png`,
    // Add other action cards here...
  },
  BACK_OF_CARDS: {
    PATH_OR_ACTION: `${BACK_OF_CARDS_PATH}/pathOrAction.png`,
    PLAYERS: `${BACK_OF_CARDS_PATH}/players.png`,
    // WINNING: `${BACK_OF_CARDS_PATH}/winning.png`,
    WINNING: '/images/SaboteurImagesSingle/Back_of_cards/winning.png',
    REWARD: `${BACK_OF_CARDS_PATH}/reward.png`,
    Start2: `${BACK_OF_CARDS_PATH}/start2.png`,
    // Add other back_of_cards here...
  },
  GOLD_REWARD: Array.from({ length: 3 }, (_, i) => `${GOLD_REWARD_PATH}/gold_reward_${i + 1}.png`),
  PATH: Array.from({ length: 39 }, (_, i) => `${PATH_PATH}/${i + 1}.png`),
  PATH_SPECIAL: [`${PATH_PATH}/start.png`, `${PATH_PATH}/rock.png`, `${PATH_PATH}/rock2.png`, `${PATH_PATH}/gold.png`],
  PLAYERS: {
    BAD_GUYS: Array.from({ length: 4 }, (_, i) => `${BAD_GUYS_PATH}/${i + 1}.png`),
    MINERS: Array.from({ length: 7 }, (_, i) => `${MINERS_PATH}/${i + 1}.png`),
  },
  // Add other card categories here...
};

const initialPath = '/images/SaboteurImagesSingle/';

const path = {
  gold: initialPath + 'Gold-reward/',
  badGuys: initialPath + 'Players/BadGuys/',
  goodGuys: initialPath + 'Players/Miners/',
  backCard: initialPath + 'Back_of_cards/',
  actions: initialPath + 'Actions/',
  path: initialPath + 'Path/',
}
const extension = '.png';

const backCardReward = path.backCard + "reward" + extension;
const backCardPlayers = path.backCard + 'players' + extension;
const backCardWinning = path.backCard + 'winning' + extension;
const backCardPathOrAction = path.backCard + 'pathOrAction' + extension;
const backCardStart = path.backCard + 'start2' + extension;
export const backOfCard = [
  {src: backCardReward, back: backCardPlayers},
  {src: backCardPlayers, back: backCardPlayers},
  {src: backCardWinning, back: backCardPlayers},
  {src: backCardPathOrAction, back: backCardPlayers},
  {src: backCardStart, back: backCardPlayers},
];

//All
const frontCardMiner1 = path.goodGuys + 1 + extension;
const frontCardMiner2 = path.goodGuys + 2 + extension;
const frontCardMiner3 = path.goodGuys + 3 + extension;
const frontCardMiner4 = path.goodGuys + 4 + extension;
const frontCardMiner5 = path.goodGuys + 5 + extension;
const frontCardMiner6 = path.goodGuys + 6 + extension;
const frontCardMiner7 = path.goodGuys + 7 + extension;
export const GoodGuys = [
  {src: frontCardMiner1, back: backCardPlayers},
  {src: frontCardMiner2, back: backCardPlayers},
  {src: frontCardMiner3, back: backCardPlayers},
  {src: frontCardMiner4, back: backCardPlayers},
  {src: frontCardMiner5, back: backCardPlayers},
  {src: frontCardMiner6, back: backCardPlayers},
  {src: frontCardMiner7, back: backCardPlayers},
];
//All
const frontCardBadGuyBlue = path.badGuys + 1 + extension;
const frontCardBadGuyGreen = path.badGuys + 2 + extension;
const frontCardBadGuyOrange = path.badGuys + 3 + extension;
const frontCardBadGuyYellow = path.badGuys + 4 + extension;
export const BadGuys = [
  {src: frontCardBadGuyBlue, back: backCardPlayers},
  {src: frontCardBadGuyGreen, back: backCardPlayers},
  {src: frontCardBadGuyOrange, back: backCardPlayers},
  {src: frontCardBadGuyYellow, back: backCardPlayers},
];


//All
const frontGoldReward1 = path.gold + "gold-reward-1" + extension;
const frontGoldReward2 = path.gold + "gold-reward-2" + extension;
const frontGoldReward3 = path.gold + "gold-reward-3" + extension;
/*
16 Reward cards with 1
8 Reward cards with 2
4 Reward cards with 3
Total 16 + 8 * 2 + 4 * 3 = 40 Gold
*/
export const Gold = [
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward1, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward2, back: backCardReward},
  {src: frontGoldReward3, back: backCardReward},
  {src: frontGoldReward3, back: backCardReward},
  {src: frontGoldReward3, back: backCardReward},
  {src: frontGoldReward3, back: backCardReward},
]

const frontCardDestroyPath = path.actions + 'destroyPath' + extension;
const frontCardMap = path.actions + 'map' + extension;
const frontCardFelinarOn = path.actions + 'Felinar/1' + extension;
const frontCardFelinarOff = path.actions + 'Felinar/2' + extension;
const frontCardCartOn = path.actions + 'Cart/1' + extension;
const frontCardCartOff = path.actions + 'Cart/2' + extension;
const frontCardAxeOn = path.actions + 'Axe/1' + extension;
const frontCardAxeOff = path.actions + 'Axe/2' + extension;
const frontCardAxeAndCart = path.actions + '2Powers/1' + extension;
const frontCardAxeAndFelinar = path.actions + '2Powers/2' + extension;
const frontCardCardAndFelinar = path.actions + '2Powers/3' + extension;
export const Actions = [
  {src: frontCardDestroyPath, back: backCardPathOrAction},
  {src: frontCardDestroyPath, back: backCardPathOrAction},
  {src: frontCardDestroyPath, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardMap, back: backCardPathOrAction},
  {src: frontCardFelinarOn, back: backCardPathOrAction},
  {src: frontCardFelinarOn, back: backCardPathOrAction},
  {src: frontCardFelinarOff, back: backCardPathOrAction},
  {src: frontCardFelinarOff, back: backCardPathOrAction},
  {src: frontCardFelinarOff, back: backCardPathOrAction},
  {src: frontCardCartOn, back: backCardPathOrAction},
  {src: frontCardCartOn, back: backCardPathOrAction},
  {src: frontCardCartOff, back: backCardPathOrAction},
  {src: frontCardCartOff, back: backCardPathOrAction},
  {src: frontCardCartOff, back: backCardPathOrAction},
  {src: frontCardAxeOn, back: backCardPathOrAction},
  {src: frontCardAxeOn, back: backCardPathOrAction},
  {src: frontCardAxeOff, back: backCardPathOrAction},
  {src: frontCardAxeOff, back: backCardPathOrAction},
  {src: frontCardAxeOff, back: backCardPathOrAction},
  {src: frontCardAxeAndCart, back: backCardPathOrAction},
  {src: frontCardAxeAndFelinar, back: backCardPathOrAction},
  {src: frontCardCardAndFelinar, back: backCardPathOrAction},
]
export const Path = [
  path.path + 'start' + extension,
  path.path + 'gold' + extension,
  path.path + 'rock' + extension,
  path.path + 'rock2' + extension,
  path.path + '1' + extension,
  path.path + '2' + extension,
  path.path + '3' + extension,
  path.path + '4' + extension,
  path.path + '5' + extension,
  path.path + '6' + extension,
  path.path + '7' + extension,
  path.path + '8' + extension,
  path.path + '9' + extension,
  path.path + '10' + extension,
  path.path + '11' + extension,
  path.path + '12' + extension,
  path.path + '13' + extension,
  path.path + '14' + extension,
  path.path + '15' + extension,
  path.path + '16' + extension,
  path.path + '17' + extension,
  path.path + '18' + extension,
  path.path + '19' + extension,
  path.path + '20' + extension,
  path.path + '21' + extension,
  path.path + '22' + extension,
  path.path + '23' + extension,
  path.path + '24' + extension,
  path.path + '25' + extension,
  path.path + '26' + extension,
  path.path + '27' + extension,
  path.path + '28' + extension,
  path.path + '29' + extension,
  path.path + '30' + extension,
  path.path + '31' + extension,
  path.path + '32' + extension,
  path.path + '33' + extension,
  path.path + '34' + extension,
  path.path + '35' + extension,
  path.path + '36' + extension,
  path.path + '37' + extension,
  path.path + '38' + extension,
  path.path + '39' + extension
]

export const Players = [
  ...GoodGuys,
  ...BadGuys,
]
export const Cards = [
  ...Path,
  ...Players,
  ...Gold,
  ...backOfCard,
  ...Actions,
]

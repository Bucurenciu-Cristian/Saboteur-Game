import {BadGuys, GoodGuys} from "./components/Cards";
import Image from "next/image";
import {imageSize} from "./variables";
import {CardsType} from "./Types/CardsType";

export const withdrawTheCardsFromTheDeck = (cards: CardsType[], NoPlayers: number, NoOfCards: number) => {
  if (NoOfCards === 0) return []
  const firstCards = [];
  const restOfCards = [];
  const totalCards = NoPlayers * NoOfCards;
  for (let i = 0; i < totalCards; i++) {
    firstCards.push(cards[i]);
  }
  for (let i = totalCards; i < cards.length; i++) {
    restOfCards.push(cards[i]);
  }
  return [firstCards, restOfCards];
}

export const howManyCardsEachPlayerCanHave = (NoPlayers: number) => {
  switch (NoPlayers) {
    case 3:
    case 4:
    case 5:
      return 6
    case 6:
    case 7:
      return 5
    case 8:
    case 9:
    case 10:
      return 4
    default:
      return 0
  }
}

export function isBetween3and10(value: number): value is 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 {
  return value >= 3 && value <= 10;
}

export const tellMeNoPlayers = (NoPlayers: number) => {
  switch (NoPlayers) {
    case 3:
      return [
        ...GoodGuys.slice(0, 3),
        ...BadGuys.slice(0, 1)
      ]
    case 4:
      return [
        ...GoodGuys.slice(0, 4),
        ...BadGuys.slice(0, 1)
      ]
    case 5:
      return [
        ...GoodGuys.slice(0, 4),
        ...BadGuys.slice(0, 2),
      ]
    case 6:
      return [
        ...GoodGuys.slice(0, 5),
        ...BadGuys.slice(0, 2),
      ]
    case 7:
      return [
        ...GoodGuys.slice(0, 5),
        ...BadGuys.slice(0, 3),
      ]
    case 8:
      return [
        ...GoodGuys.slice(0, 6),
        ...BadGuys.slice(0, 3),
      ]
    case 9:
      return [
        ...GoodGuys,
        ...BadGuys.slice(0, 3),
      ]
    case 10:
      return [
        ...GoodGuys,
        ...BadGuys,
      ]
    default:
      return [
        ...GoodGuys.slice(0, 1),
        ...BadGuys.slice(0, 1),
      ]
  }
}

export const shuffleCards = (cards: CardsType[]) => {
  const newArray = [...cards]
  const length = newArray.length
  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor((newArray.length - start) * Math.random())
    const randomItem = newArray.splice(randomPosition, 1)

    newArray.push(...randomItem)
  }
  return newArray
}

export const giveMeACard = (cards: CardsType[]) => {
  const random = Math.floor(Math.random() * cards.length);
  return cards[random];
}

export const helpWithTheRender = (prevImages: CardsType[], nextImages: CardsType[]) => {
  if (prevImages.length !== nextImages.length) {
    return false;
  }
  for (let i = 0; i < prevImages.length; i++) {
    if (prevImages[i] !== nextImages[i]) {
      return false;
    }
  }
  return true;
}


export function getDiv(item: []) {
  return <div>
    {item.map((image, index) =>
      (
        <Image key={index}
               src={image.src}
               width={imageSize.width}
               alt="random"
               height={imageSize.height}
               quality={30}
        />
      ))}
  </div>;
}

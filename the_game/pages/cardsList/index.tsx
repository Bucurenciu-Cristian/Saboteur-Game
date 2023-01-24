import Image from 'next/image'
import pathOrAction from '../../public/images/SaboteurImagesSingle/Back_of_cards/pathOrAction.png'
import {Fragment, useMemo, useState} from "react";
import {Button} from "react-bootstrap";
import {
  randomfirstCardsInHand,
  randomRestCardsInHand
} from "../../src/components/Cards";
import {getDiv, helpWithTheRender} from "../../src/functions.tsx";
import {imageSize} from "../../src/variables";
import {CardsType} from "../../src/Types/CardsType";

const ImageList = ({ item }: CardsType[]) => {
  const [rotations, setRotations] = useState(Array(item.length).fill(0));

  return (
    <div>
      {item.map((image: CardsType, index: number) => (
        <Fragment key={index}>
          <Image
            src={image.src}
            width={imageSize.width}
            alt="random"
            height={imageSize.height}
            quality={30}
            style={{ transform: `rotate(${rotations[index]}deg)` }}
            onClick={() => {
              const newRotations = [...rotations];
              newRotations[index] += 180;
              setRotations(newRotations);
            }}
          />
        </Fragment>
      ))}
    </div>
  );
}


const Page = () => {
  const [cardsFromHand, setCardsFromHand] = useState<CardsType[]>(randomfirstCardsInHand);
  const [cardsFromDeck, setCardsFromDeck] = useState<CardsType[]>(randomRestCardsInHand);


  function RenderUsingMemo({images}: { images: [] }) {
    return useMemo(
      //This is fast, but doesn't rotate the images.
      // () => getDiv(images),
      // This is slow, but rotates the images.
      () => <ImageList item={images}/>,

      [images, helpWithTheRender]);
  }

  const handleANewCard = () => {
    const card = cardsFromDeck.shift()
    //TODO: In this case, The Saboteurs are the winners.
    if (card === undefined) throw new Error('No more cards')
    setCardsFromHand([...cardsFromHand, card])
    setCardsFromDeck(cardsFromDeck)
  };

  return (
    <>
      <Button onClick={handleANewCard}>
        <RenderUsingMemo images={[pathOrAction]}/>
      </Button>
      <br/>
      <br/>

      <RenderUsingMemo images={cardsFromHand}/>

      <br/>
      <br/>
      <br/>
      {/*<RenderUsingMemo images={cardsFromDeck}/>*/}

    </>
  );
}


//Still in progress, this is not doing much yet
/*export async function getStaticProps() {
  //
  // const fileContent = fs.readFile(join(__dirname, ''), {encoding: 'utf8'});
  //
  // fileContent
  //   .then(data =>  console.log(data))
  //   .catch(err => console.log('Error  ', err))

  const dir = process.cwd();
  return {
    props: {dir}
  }
}*/
export default Page;

import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import pathOrAction from '../../public/images/SaboteurImagesSingle/Back_of_cards/pathOrAction.png';
import { randomfirstCardsInHand, randomRestCardsInHand } from '../../src/components/Cards';
import { helpWithTheRender } from '../../src/functions';
import { imageSize } from '../../src/variables';
import { CardsType } from '../../src/Types/CardsType';

interface ImageListProps {
  item: CardsType[];
}

function ImageList({ item }: ImageListProps) {
  const [rotations, setRotations] = useState(Array(item.length).fill(0));

  return (
    <div>
      {item &&
        item.map((image: CardsType, index: number) => (
          <Fragment key={index}>
            <Image
              src={image.src}
              width={imageSize.width}
              alt="random"
              height={imageSize.height}
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

function NewCard(props: { onClick: () => void; drawACard: { src: any } }) {
  return (
    <Button onClick={props.onClick}>
      <RenderUsingMemo images={[props.drawACard]} />
    </Button>
  );
}

const RenderUsingMemo = ({ images }: { images: CardsType[] }) =>
  useMemo(
    // This is fast, but doesn't rotate the images.
    // () => getDiv(images),
    // This is slow, but rotates the images.
    () => <ImageList item={images} />,

    [images, helpWithTheRender]
  );

function Page() {
  const [cardsFromHand, setCardsFromHand] = useState<CardsType[]>(randomfirstCardsInHand);
  const [cardsFromDeck, setCardsFromDeck] = useState<CardsType[]>(randomRestCardsInHand);

  const handleANewCard = () => {
    // TODO: Here you will decide if you will go with pop or unshift
    const card = cardsFromDeck.pop();
    // TODO: You can't draw a card from an empty deck, in this case, The Saboteurs are almost the winners, check the hands of the Users as well
    if (card === undefined) throw new Error('No more cards');
    setCardsFromHand([...cardsFromHand, card]);
    setCardsFromDeck([...cardsFromDeck]);
  };

  const drawACard = { src: pathOrAction };
  return (
    <>
      <NewCard onClick={handleANewCard} drawACard={drawACard} />
      <RenderUsingMemo images={cardsFromHand} />
    </>
  );
}

// Still in progress, this is not doing much yet
/* export async function getStaticProps() {
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
} */
export default Page;

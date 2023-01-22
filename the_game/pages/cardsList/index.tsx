import Image from 'next/image'
import profilePic from '../../public/images/SaboteurImagesSingle/Path/start.png'

import {
  Actions,
  backOfCard,
  giveMeACard,
  Gold,
  Path,
  PathAndAction,
  Players, shuffle, shuffleCards, randomPlayers, RandomCardsWinning, randomCardsInHand
} from "../../src/components/Cards";
import {useMemo} from "react";

const Page = () => {
  const width = 100;
  const height = width * 1.45;

  function getDiv(item: []) {
    return <div>
      {item.map((image, index) =>
        (
          <Image key={index}
                 src={image.src}
                 width={width}
                 alt="random"
                 height={height}
          />
        ))}
    </div>;
  }
  function RenderUsingMemo({images}: { images: [] }) {
    return useMemo(
      () => getDiv(images),
      [images]
    );
  }
  const test = giveMeACard(Players);
  const test1 = shuffleCards(Players);
  console.log(Path.length)
  return (
    <>
      <RenderUsingMemo images={Path}/>
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

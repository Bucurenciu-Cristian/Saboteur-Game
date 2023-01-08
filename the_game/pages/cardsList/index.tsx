import Image from 'next/image'
import {
  Cards,
} from "../../src/components/Cards";


const Page = () => {
  const width = 75;
  const height = width * 1.5;

  function getDiv(item: string[]) {
    return <div>
      {item.map((image, index) => {
        if (index % 15 === 0) {
          return <br key={index} />
        }
        return (
          <Image key={index} src={image} width={width} height={height}/>
        );
      })}
    </div>;
  }

  return (
    <div>
      {getDiv(Cards)}
    </div>
  );
}

export default Page;

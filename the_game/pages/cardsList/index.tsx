import Image from 'next/image'
import {backOfCard, Players} from "../../src/components/Cards";
import {useMemo} from "react";
import {join} from 'path';
import {promises as fs} from "fs";

const Page = () => {
  const width = 75;
  const height = width * 1.5;

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

  return (
    <>
      <RenderUsingMemo images={backOfCard}/>
      <RenderUsingMemo images={Players}/>
    </>
  );
}


//Still in progress, this is not doing much yet
export async function getStaticProps() {

  const fileContent = fs.readFile(join(__dirname, ''), {encoding: 'utf8'});

  fileContent
    .then(data =>  console.log(data))
    .catch(err => console.log('Error  ', err))

  const dir = process.cwd();
  console.log(dir);
  return {
    props: {dir}
  }
}
export default Page;

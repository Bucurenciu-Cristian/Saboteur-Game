import React, {Fragment, useEffect, useState} from "react";
import {allTheCards, checkMyCards} from "../../src/BusinessLogic/Logic";
import Image from "next/image";
import {imageSize} from "../../src/variables";

const Test = () => {
    const [cards, setCards] = useState(allTheCards);
    useEffect(() => {
        checkMyCards()

    }, []);


    return (
        <div>
            <h1>Test</h1>
            {cards.map((card, index) => {
                return (
                    <Fragment key={index}>
                        <Image src={card.src}
                               width={imageSize.width}
                               height={imageSize.height}
                               quality={50}
                               alt="random"/>
                    </Fragment>
                )
            })}
        </div>
    )
}
export default Test;

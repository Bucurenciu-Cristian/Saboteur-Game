import React, {useEffect} from 'react';
import Board from "../../src/components/Board";
import {checkMyCards} from "../../src/BusinessLogic/Logic";

const Page = () => {
    useEffect(() => {
        checkMyCards();
    }, []);
    
    return (
        <>
            <Board/>
        </>
    );
};

export default Page;

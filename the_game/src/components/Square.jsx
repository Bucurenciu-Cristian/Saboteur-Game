import React from 'react';
import Image from "next/image";
import {Button} from "@mui/material";

const Square = (props) => {
    return (
        <Button
            className="square"
            onClick={props.onClick}
            onMouseOver={e => e.target.style.background = 'red'}
            onMouseLeave={e => e.target.style.background = ''}
            width={50}
            height={1000}
        >
            {(props.imgSrc && <Image
                src={props.imgSrc}
                width={1000}
                height={100}
            />)}
            {props.value}
        </Button>
    );
};

export default Square;

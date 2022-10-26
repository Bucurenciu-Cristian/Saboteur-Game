import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useRouter} from "next/router";
import Ts_learning from "../../src/components/Ts_learning";

const Page = () => {
    const router = useRouter();
    const id = 2;
    return (<>
        <div>Index Ioana Page</div>
        <h1><Ts_learning/></h1>
        <Button onClick={e => router.push('/')}>
            Home
        </Button>
        <Button onClick={e => router.push('/Ioana/[id]',`/Ioana/${id}`)}>ID</Button>
    </>)
};

export default Page;

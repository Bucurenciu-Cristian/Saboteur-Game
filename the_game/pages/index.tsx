import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {NewLink} from "../src/components/RoutesList";

const Home: NextPage = () => {
    const [hello, setHello] = useState(null);

    useEffect(() => {
        fetch('/api/hello')
            .then(res => res.json())
            .then(setHello)
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Available Routes</h1>

                <NewLink href={"/Table"}/>
                <NewLink href={"/cardsList"}/>
                <NewLink href={"/Socket"}/>
                <br/>
                <hr/>
                <NewLink href={"/async"}/>
                <NewLink href={"/State"}/>
                {/*<RoutesList/>*/}
            </main>
        </div>
    )
}

export default Home

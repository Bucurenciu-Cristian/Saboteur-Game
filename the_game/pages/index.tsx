import type { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <h1>Home Page</h1>
    <Button variant="primary">
      <Link href="/game/1">Game 1</Link>
    </Button>
  </div>
);

export default Home;

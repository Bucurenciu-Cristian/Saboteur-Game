import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/the_game/public/favicon.ico"/>

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>


          Still Learning this stuff <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <Link href={"/Ioana/[id]"} as={`/Ioana/1`}>
            <a className={styles.card}>

              <h2> Go to ID 1</h2>

            </a>

          </Link>
        </div>
        <div className={styles.grid}>

          <Link href={"/Ioana"}>
            <a className={styles.card}>
              Go Ioana
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

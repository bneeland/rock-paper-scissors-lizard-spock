import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Web3 from 'web3'
import Layout from '../components/layout'
import Link from 'next/link'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Rock Paper Scissors Spock Lizard</title>
        <meta name="description" content="Rock Paper Scissors Spock Lizard app" />
      </Head>
      <h1 className={styles.title}>Rock Paper Scissors Spock Lizard</h1>
      <p>An decentralized extended version of Rock Paper Scissors</p>
      <Link href="/new">
        <a>Create new round</a>
      </Link>
      <Link href="/join">
        <a>Join existing round</a>
      </Link>
      <hr />

    </Layout>
  )
}

export default Home

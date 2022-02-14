import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Web3 from 'web3'
import Layout from '../components/layout'
import Link from 'next/link'

const Home = () => {
  const [error, setError] = useState('')
  const [web3, setWeb3] = useState(null)
  const [accountAddress, setAccountAddress] = useState(null)
  const [contractTransactionHashRPS, setContractTransactionHashRPS] = useState(null)
  const [contractTransactionHashHasher, setContractTransactionHashHasher] = useState(null)
  const [contractAddressRPS, setContractAddressRPS] = useState(null)
  const [stake, setStake] = useState(null)
  const [j2, setJ2] = useState(null)
  const [c2, setC2] = useState(0)
  const [c1, setC1] = useState(0)
  const [roundIsComplete, setRoundIsComplete] = useState(false)

  const abiHasher = [{"constant":true,"inputs":[{"name":"_c","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
  const abiRPS = [{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}]






















  



  return (
    <Layout>
      <Head>
        <title>Rock Paper Scissors Spock Lizard</title>
        <meta name="description" content="Rock Paper Scissors Spock Lizard app" />
      </Head>
      <h1 className={styles.title}>Rock Paper Scissors Spock Lizard</h1>
      <p>An extended version of Rock Paper Scissors, running on the blockchain</p>
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

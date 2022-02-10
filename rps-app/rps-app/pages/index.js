import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Web3 from 'web3'

const Home = () => {
  const [error, setError] = useState('')

  let web3

  const connectWalletHandler = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // MetaMask installed
      // Connect to MetaMask wallet
      try {
        await window.ethereum.request({method: "eth_requestAccounts"})
        web3 = new Web3(window.ethereum)
      } catch(err) {
        setError(err.message)
      }
    } else {
      // MetaMask not installed
      setError("Please install MetaMask")
    }
  }

  return (
    <div>
      <Head>
        <title>Rock Paper Scissors Spock Lizard</title>
        <meta name="description" content="Rock Paper Scissors Spock Lizard app" />
      </Head>
      <h1 className={styles.title}>Rock Paper Scissors Spock Lizard</h1>
      <p>An enhanced version of Rock Paper Scissors, running on the blockchain</p>
      <button onClick={connectWalletHandler}>Connect wallet</button>
      <hr />
      <h2>Player 1</h2>
      <button>RPS</button>
      <button>solve</button>
      <hr />
      <h2>Player 2</h2>
      <button>play</button>
      <hr />
      <code>{error}</code>
    </div>
  )
}

export default Home

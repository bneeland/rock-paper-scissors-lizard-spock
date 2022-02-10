import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'

const Home = () => {
  let web3

  const connectWalletHandler = () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // MetaMask installed
      // Connect to MetaMask wallet
      window.ethereum.request({method: "eth_requestAccounts"})
      web3 = new Web3(window.ethereum)
    } else {
      // MetaMask not installed
      console.log("Please install MetaMask")
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
    </div>
  )
}

export default Home

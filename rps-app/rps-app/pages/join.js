import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/RPS.module.css'
import Web3 from 'web3'
import Layout from '../components/layout'
import Link from 'next/link'

const Join = () => {
  const [error, setError] = useState('')

  const [web3, setWeb3] = useState(null)
  const [accountAddress, setAccountAddress] = useState(null)

  const [contractAddressRPS, setContractAddressRPS] = useState(null)

  const [stake, setStake] = useState(null)

  const [c2, setC2] = useState(0)

  const [roundIsComplete, setRoundIsComplete] = useState(false)

  const contractAddressHasher = "0x024EeF22Cb87B7a18077DaDEA64CC7A05D04Fd27"
  const abiHasher = [{"constant":true,"inputs":[{"name":"_c","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
  const abiRPS = [{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}]

  const connectWalletHandler = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // MetaMask installed
      try {
        // Connect wallet
        await window.ethereum.request({method: "eth_requestAccounts"})
        // Set web3 instance
        web3 = new Web3(window.ethereum)
        setWeb3(web3)
        // Get list of accounts connected through wallet
        const accounts = await web3.eth.getAccounts()
        setAccountAddress(accounts[0])
        setError("")
      } catch(error) {
        setError(error.message)
      }
    } else {
      // MetaMask not installed
      setError("Please install MetaMask")
    }
  }

  const contractAddressRPSInputHandler = event => {
    setContractAddressRPS(event.target.value)
  }

  const getStakeHandler = () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      contractRPS.methods.stake().call((error, result) => {
        if (result !== undefined) {
          setStake(web3.utils.fromWei(result, "ether"))
          setError("")
        } else {
          setError("Stake is undefined")
        }
      })
    } catch(error) {
      setError(error.message)
    }
  }

  const c2InputHandler = event => {
    setC2(event.target.value)
  }

  const playHandler = async () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      await contractRPS.methods.play(c2).send({
        from: accountAddress,
        gas: '4700000',
        value: web3.utils.toWei(stake, "ether")
      }, function (e, tx){
        console.log(e, tx);
        if (typeof tx !== 'undefined') {
          console.log('Contract mined! transaction hash: ' + tx);
          setError("")
        } else {
          setError(e.message)
        }
      })
    } catch(error) {
      setError(error.message)
    }
  }

  const checkRoundCompleteHandler = async () => {
    // Get contract balance to check that the round is solved
    try {
      const contractBalanceRPS = await web3.eth.getBalance(contractAddressRPS)
      setError("")
      console.log(contractBalanceRPS)
      if (contractBalanceRPS == 0) {
        setRoundIsComplete(true)
      } else {
        setRoundIsComplete(false)
      }
    } catch(error) {
      setError(error.message)
    }
  }

  const timeoutPlayer1Handler = async () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      await contractRPS.methods.j1Timeout().send({
        from: accountAddress,
        gas: '4700000'
      }, function (e, tx){
        console.log(e, tx);
        if (typeof tx !== 'undefined') {
          console.log('Contract mined! transaction hash: ' + tx);
          setError("")
        } else {
          setError(e.message)
        }
      })
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Join existing round - Rock Paper Scissors Spock Lizard</title>
      </Head>
      <hr />
      Errors: {error}
      <hr />
      <button onClick={connectWalletHandler}>Connect wallet</button>
      <p><small><code>Account: {accountAddress}</code></small></p>
      <hr />
      <h1 className="text-2xl font-bold underline">Rock Paper Scissors Spock Lizard</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      <h3>Step 1: Set RPS contract address</h3>
      <p>Player 1 should have deployed an RPS contract to start a game for you to join, and should have staked ETH into that RPS contract as a bet on the game.</p>
      <p>You need to get the address of that RPS contract so you can join as player 2 for that game.</p>
      <div>
        <input onChange={contractAddressRPSInputHandler} placeholder="RPS contract address" />
        <br /><small><code>RPS contract address: {contractAddressRPS}</code></small>
      </div>
      <h3>Step 2: Get stake</h3>
      <button onClick={getStakeHandler}>Get stake</button>
      <p><small><code>Stake: {stake} ETH</code></small></p>
      <h3>Step 3: Pick a move, accept the stake, and commit to the contract</h3>
      <div>
        <input type="radio" name="c2Input" id="c2rock" value="1" onChange={c2InputHandler} /><label htmlFor="c2rock">Rock</label>
        <input type="radio" name="c2Input" id="c2paper" value="2" onChange={c2InputHandler} /><label htmlFor="c2paper">Paper</label>
        <input type="radio" name="c2Input" id="c2scissors" value="3" onChange={c2InputHandler} /><label htmlFor="c2scissors">Scissors</label>
        <input type="radio" name="c2Input" id="c2spock" value="4" onChange={c2InputHandler} /><label htmlFor="c2spock">Spock</label>
        <input type="radio" name="c2Input" id="c2lizard" value="5" onChange={c2InputHandler} /><label htmlFor="c2lizard">Lizard</label>
        <br /><small><code>c2: {c2}</code></small>
      </div>
      <button onClick={playHandler}>play</button>

      <hr />
      <p>Wait for player 1 to play his move.</p>
      <p>If player 1 hasn't played after 5 minutes, you can use the timeout function, below, to claim victory and win the full stake amount.</p>
      <hr />

      <h3>Step 4: Check if round is complete</h3>
      <button onClick={checkRoundCompleteHandler}>Check if round is complete</button>
      {roundIsComplete && <h4>Round is complete.</h4>}
      {!roundIsComplete && <h4>Round is not complete.</h4>}

      <h3>Timeout</h3>
      <div>
        <p>If player 1 hasn't played for 5 minutes after you've accepted the game and made your move, click the button below to claim victory and collect the full staked amount.</p>
        <button onClick={timeoutPlayer1Handler}>Player 1 hasn't responded—claim victory</button>
      </div>

    </Layout>
  )
}

export default Join

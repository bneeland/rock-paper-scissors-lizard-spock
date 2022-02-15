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
      <div className="mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-1 my-auto">
            <Link href="/">
              <a className="text-slate-600">&larr; Home</a>
            </Link>
          </div>
          <div className="lg:col-span-4 my-auto">
            <h1 className="text-xl font-bold text-center text-slate-500 my-4">Rock Paper Scissors Spock Lizard</h1>
          </div>
          <div className="lg:col-span-1 my-auto text-center md:text-right">
            <button onClick={connectWalletHandler} className="py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">
              Connect&nbsp;wallet
            </button>
          </div>
        </div>
        <div className="h-14 sm:h-7 text-center lg:text-right text-slate-400">
          {accountAddress && <small><code>Connected to: {accountAddress}</code></small>}
        </div>
      </div>

      {error &&
        <div className="fixed bottom-10 left-0 right-0 border z-50">
          <div className="text-center">
            <span class="bg-amber-100 drop-shadow-lg p-4 rounded-xl">
              Error: {error} <button onClick={() => {setError("")}}><svg class="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg></button>
            </span>
          </div>
        </div>
      }

      {accountAddress &&
        <h3 className="text-center text-3xl my-10 text-purple-900 font-bold">
          Enter contract address and choose your move
        </h3>
      }
      {accountAddress &&
        <div className="lg:w-3/5 xl:w-1/2 lg:mx-auto mb-3">
          <input onChange={contractAddressRPSInputHandler} placeholder="Contract address" className="w-full px-4 py-3 rounded-xl bg-white shadow-lg border text-lg font-bold" />
          <div className="text-center text-slate-400">
            {contractAddressRPS && <small><code>Contract address:<br />{contractAddressRPS}</code></small>}
          </div>
        </div>
      }




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

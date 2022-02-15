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

  const [contractTransactionHashRPS, setContractTransactionHashRPS] = useState(null)

  const [roundIsComplete, setRoundIsComplete] = useState()

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
          setContractTransactionHashRPS(tx);
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
        <title>Join existing round - Rock Paper Scissors Lizard Spock</title>
      </Head>
      <div className="mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-1 my-auto">
            <Link href="/">
              <a className="text-slate-600">&larr; Home</a>
            </Link>
          </div>
          <div className="lg:col-span-4 my-auto">
            <h1 className="text-xl font-bold text-center text-slate-500 my-4">Rock Paper Scissors Lizard Spock</h1>
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
        <div className="fixed bottom-10 left-0 right-0 z-50">
          <div className="text-center">
            <span className="bg-amber-100 drop-shadow-lg p-4 rounded-xl">
              {error} <button onClick={() => {setError("")}}><svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg></button>
            </span>
          </div>
        </div>
      }

      {!accountAddress &&
        <div className="my-32 text-center text-slate-400">
          Connect your MetaMask wallet to begin
        </div>
      }

      {accountAddress &&
        <div>
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Contract details
          </h2>
          <p className="text-center mb-6">Get the contract address from the person who created the round.</p>
          <div className="lg:w-3/5 xl:w-1/2 lg:mx-auto mb-3">
            <input onChange={contractAddressRPSInputHandler} placeholder="Contract address" className="w-full px-4 py-3 rounded-xl bg-white shadow-lg border text-lg font-bold" />
            <div className="text-center text-slate-400">
              {contractAddressRPS && <small><code>Contract address:<br />{contractAddressRPS}</code></small>}
            </div>
          </div>
        </div>
      }
      {contractAddressRPS &&
        <div className="mt-8 lg:w-1/2 lg:mx-auto">
          <button onClick={getStakeHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Get stake amount</button>
        </div>
      }
      {stake &&
        <div>
          <p className="text-slate-900 text-lg font-bold text-center my-6">Stake amount:</p>
          <div className="text-center">
            <code className="text-lg font-bold text-purple-900">{stake} ETH</code>
          </div>
        </div>
      }

      {stake &&
        <div>
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Choose your move
          </h2>
          <div className="lg:w-1/2 lg:mx-auto">
            <div className="relative mb-3">
              <input type="radio" name="c2Input" id="c2Rock" value="1" onChange={c2InputHandler} className="hidden peer" />
              <label htmlFor="c2Rock" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-purple-200 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
                <div>
                  <h6 className="text-xl font-bold">Rock</h6>
                </div>
              </label>
            </div>
            <div className="relative mb-3">
              <input type="radio" name="c2Input" id="c2Paper" value="2" onChange={c2InputHandler} className="hidden peer" />
              <label htmlFor="c2Paper" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-purple-200 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
                <div>
                  <h6 className="text-xl font-bold">Paper</h6>
                </div>
              </label>
            </div>
            <div className="relative mb-3">
              <input type="radio" name="c2Input" id="c2Scissors" value="3" onChange={c2InputHandler} className="hidden peer" />
              <label htmlFor="c2Scissors" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-purple-200 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
                <div>
                  <h6 className="text-xl font-bold">Scissors</h6>
                </div>
              </label>
            </div>
            <div className="relative mb-3">
              <input type="radio" name="c2Input" id="c2Lizard" value="4" onChange={c2InputHandler} className="hidden peer" />
              <label htmlFor="c2Lizard" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-purple-200 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
                <div>
                  <h6 className="text-xl font-bold">Lizard</h6>
                </div>
              </label>
            </div>
            <div className="relative mb-3">
              <input type="radio" name="c2Input" id="c2Spock" value="5" onChange={c2InputHandler} className="hidden peer" />
              <label htmlFor="c2Spock" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-purple-200 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
                <div>
                  <h6 className="text-xl font-bold">Spock</h6>
                </div>
              </label>
            </div>
          </div>
        </div>
      }
      {c2 !== 0 &&
        <div className="mt-8 lg:w-1/2 lg:mx-auto">
          <button onClick={playHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Play</button>
        </div>
      }
      {contractTransactionHashRPS &&
        <div className="text-center text-slate-400">
          <small><code>Transaction hash:<br />{contractTransactionHashRPS}</code></small>
        </div>
      }

      {contractTransactionHashRPS &&
        <div className="lg:w-1/2 mx-auto my-16">
          <hr />
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Wait
          </h2>
          <p className="text-slate-900 text-lg mb-6">
            Wait at least 5 minutes for your opponent to play his/her move, then proceed.
          </p>
          <p className="text-slate-900 text-lg mb-6">
            If the other player has not played after 5 minutes, you can use the timeout function, below, to claim victory and win the full stake amount.
          </p>
          <hr />
        </div>
      }

      {contractTransactionHashRPS &&
        <div>
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Check if round is complete
          </h2>
          <div className="mt-8 lg:w-1/2 lg:mx-auto">
            <button onClick={checkRoundCompleteHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Check</button>
            <div className="text-center my-6">
              {roundIsComplete && <code className="text-lg font-bold text-purple-900">Round is complete.</code>}
              {!roundIsComplete && <code className="text-lg font-bold text-purple-900">Round is not complete.</code>}
            </div>
          </div>
        </div>
      }

      {(contractTransactionHashRPS && (roundIsComplete == null || !roundIsComplete)) &&
        <div className="lg:w-1/2 mx-auto my-16">
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Timeout
          </h2>
          <p>If, after 5 minutes, your opponent has not played his/her move, click the timeout button to reclaim your stake.</p>
          <div className="mt-8">
            <button onClick={timeoutPlayer1Handler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Timeout</button>
          </div>
        </div>
      }
    </Layout>
  )
}

export default Join

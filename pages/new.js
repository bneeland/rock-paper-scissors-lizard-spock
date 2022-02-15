import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/RPS.module.css'
import Web3 from 'web3'
import Layout from '../components/layout'
import Link from 'next/link'

const New = () => {
  const [error, setError] = useState('')

  const [web3, setWeb3] = useState(null)
  const [accountAddress, setAccountAddress] = useState(null)

  const [c1CommitmentInput, setC1CommitmentInput] = useState(0)
  const [salt, setSalt] = useState()
  const [c1Hash, setC1Hash] = useState(null)

  const [j2, setJ2] = useState(null)

  const [stake, setStake] = useState(null)

  const [contractTransactionHashRPS, setContractTransactionHashRPS] = useState(null)
  const [contractAddressRPS, setContractAddressRPS] = useState(null)

  const [c1, setC1] = useState(0)

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

  const c1CommitmentInputHandler = event => {
    setC1CommitmentInput(event.target.value)
  }

  const saltInputHandler = event => {
    setSalt(event.target.value)
  }

  const getC1HashHandler = () => {
    try {
      var contractHasher = new web3.eth.Contract(abiHasher, contractAddressHasher)
      contractHasher.methods.hash(c1CommitmentInput, salt).call((error, result) => {
        setC1Hash(result)
      })
      setError("")
    } catch(error) {
      setError(error.message)
    }
  }

  const j2InputHandler = event => {
    setJ2(event.target.value)
  }

  const stakeInputHandler = event => {
    setStake(event.target.value)
  }

  const deployRPSHandler = () => {
    /* RPS compiled contract */
    var _c1Hash = c1Hash
    var _j2 = j2
    try {
      var rpsContract = new web3.eth.Contract(abiRPS);
      var rps = rpsContract.deploy({
        data: '0x608060405261012c600555604051604080610dbd833981018060405281019080805190602001909291908051906020019092919050505034600481905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160028160001916905550426006819055505050610cdc806100e16000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4395b9146100bf578063294914a4146101145780633a4b66f11461012b57806348e257cb146101565780634d03e3d21461018f57806353a04b05146101c257806380985af9146101e557806389f71d531461023c578063a5ddec7c14610267578063c37597c6146102a1578063c8391142146102f8578063f56f48f21461030f575b600080fd5b3480156100cb57600080fd5b506100fa600480360381019080803560ff169060200190929190803560ff16906020019092919050505061033a565b604051808215151515815260200191505060405180910390f35b34801561012057600080fd5b50610129610403565b005b34801561013757600080fd5b506101406104ae565b6040518082815260200191505060405180910390f35b34801561016257600080fd5b5061016b6104b4565b6040518082600581111561017b57fe5b60ff16815260200191505060405180910390f35b34801561019b57600080fd5b506101a46104c7565b60405180826000191660001916815260200191505060405180910390f35b6101e3600480360381019080803560ff1690602001909291905050506104cd565b005b3480156101f157600080fd5b506101fa610721565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024857600080fd5b50610251610747565b6040518082815260200191505060405180910390f35b34801561027357600080fd5b5061029f600480360381019080803560ff1690602001909291908035906020019092919050505061074d565b005b3480156102ad57600080fd5b506102b6610bd5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030457600080fd5b5061030d610bfa565b005b34801561031b57600080fd5b50610324610caa565b6040518082815260200191505060405180910390f35b600081600581111561034857fe5b83600581111561035457fe5b141561036357600090506103fd565b6000600581111561037057fe5b83600581111561037c57fe5b141561038b57600090506103fd565b600282600581111561039957fe5b8115156103a257fe5b0660028460058111156103b157fe5b8115156103ba57fe5b0614156103e1578160058111156103cd57fe5b8360058111156103d957fe5b1090506103fd565b8160058111156103ed57fe5b8360058111156103f957fe5b1190505b92915050565b6000600581111561041057fe5b600360009054906101000a900460ff16600581111561042b57fe5b14151561043757600080fd5b600554600654014211151561044b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050506000600481905550565b60045481565b600360009054906101000a900460ff1681565b60025481565b600060058111156104da57fe5b600360009054906101000a900460ff1660058111156104f557fe5b14151561056a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f4572726f723a20596f75206861766520616c726561647920706c617965642e0081525060200191505060405180910390fd5b60045434141515610609576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f4572726f723a20596f752068617665206e6f742070616964207468652073746181526020017f6b652e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260378152602001807f4572726f723a20596f7520617265206e6f742061737369676e6564206173207081526020017f6c61796572203220666f72207468697320726f756e642e00000000000000000081525060400191505060405180910390fd5b80600360006101000a81548160ff0219169083600581111561071257fe5b02179055504260068190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b6000600581111561075a57fe5b600360009054906101000a900460ff16600581111561077557fe5b14151515610811576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f4572726f723a20506c61796572203220686173206e6f7420706c61796564207981526020017f65742e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260378152602001807f4572726f723a20596f7520617265206e6f742061737369676e6564206173207081526020017f6c61796572203120666f72207468697320726f756e642e00000000000000000081525060400191505060405180910390fd5b6002546000191682826040518083600581111561091457fe5b60ff167f010000000000000000000000000000000000000000000000000000000000000002815260010182815260200192505050604051809103902060001916141515610a15576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260468152602001807f4572726f723a2054686973206973206e6f7420746865206d6f766520796f752081526020017f636f6d6d697474656420746f207768656e207374617274696e6720746869732081526020017f726f756e642e000000000000000000000000000000000000000000000000000081525060600191505060405180910390fd5b610a2e82600360009054906101000a900460ff1661033a565b15610a94576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f1935050505050610bc9565b610aad600360009054906101000a900460ff168361033a565b15610b1457600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f1935050505050610bc8565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050505b5b60006004819055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005811115610c0757fe5b600360009054906101000a900460ff166005811115610c2257fe5b14151515610c2f57600080fd5b6005546006540142111515610c4357600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506000600481905550565b600554815600a165627a7a72305820740f3a1dba674b4a9e2dfe363bf0fc31fc1e73b4f707b075f9fdfad4caa2fc2f0029',
        arguments: [
          _c1Hash,
          _j2,
        ]
      }).send({
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

  const getRPSContractAddressHandler = async () => {
    try {
      const transactionReceipt = await web3.eth.getTransactionReceipt(contractTransactionHashRPS)
      setContractAddressRPS(transactionReceipt.contractAddress)
      setError("")
    } catch(error) {
      setError(error.message)
    }
  }

  const contractAddressRPSInputHandler = event => {
    setContractAddressRPS(event.target.value)
  }

  const c1InputHandler = event => {
    setC1(event.target.value)
  }

  const solveHandler = async () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      await contractRPS.methods.solve(c1, salt).send({
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

  const timeoutPlayer2Handler = async () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      await contractRPS.methods.j2Timeout().send({
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
        <title>New round - Rock Paper Scissors Lizard Spock</title>
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
        <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
          Choose your move
        </h2>
      }
      {accountAddress &&
        <div className="lg:w-1/2 lg:mx-auto">
          <div className="relative mb-3">
            <input type="radio" name="c1CommitmentInput" id="c1RockCommit" value="1" onChange={c1CommitmentInputHandler} className="hidden peer" />
            <label htmlFor="c1RockCommit" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Rock</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1CommitmentInput" id="c1PaperCommit" value="2" onChange={c1CommitmentInputHandler} className="hidden peer" />
            <label htmlFor="c1PaperCommit" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Paper</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1CommitmentInput" id="c1ScissorsCommit" value="3" onChange={c1CommitmentInputHandler} className="hidden peer" />
            <label htmlFor="c1ScissorsCommit" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Scissors</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1CommitmentInput" id="c1LizardCommit" value="4" onChange={c1CommitmentInputHandler} className="hidden peer" />
            <label htmlFor="c1LizardCommit" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Lizard</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1CommitmentInput" id="c1SpockCommit" value="5" onChange={c1CommitmentInputHandler} className="hidden peer" />
            <label htmlFor="c1SpockCommit" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Spock</h6>
              </div>
            </label>
          </div>
        </div>
      }
      {c1CommitmentInput !== 0 &&
        <div className="w-1/2 my-10 mx-auto">
          <div className="mb-6">
            <p className="text-slate-900 text-lg font-bold text-center mb-6">Choose a random integer between 0 and 255 (inclusive).</p>
            <p>This will make sure that your move can&apos;t be determined by your opponent.</p>
            <p>Keep this value secret&mdash;do not reveal it to anyone. You need this value if you refresh this page during the course of the round.</p>
          </div>
          <input onChange={saltInputHandler} type="range" id="volume" name="volume" min="0" max="255" className="w-full" />
          <div className="text-center text-slate-400">
            {salt && <small><code>Salt value: {salt}</code></small>}
          </div>
        </div>
      }
      {(salt && salt>=0 && salt<=255) &&
        <div className="mt-8 lg:w-1/2 lg:mx-auto">
          <button onClick={getC1HashHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Submit</button>
        </div>
      }

      {c1Hash &&
        <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
          Create contract
        </h2>
      }
      {c1Hash &&
        <div className="lg:w-3/5 xl:w-1/2 lg:mx-auto mb-3">
          <input onChange={j2InputHandler} placeholder="Opponent&apos;s account address" className="w-full px-4 py-3 rounded-xl bg-white shadow-lg border text-lg font-bold" />
          <div className="text-center text-slate-400">
            {j2 && <small><code>Opponent&apos;s account address:<br />{j2}</code></small>}
          </div>
        </div>
      }
      {c1Hash &&
        <div className="lg:w-1/2 lg:mx-auto mb-3">
          <input onChange={stakeInputHandler} placeholder="Stake amount (ETH)" className="w-full px-4 py-3 rounded-xl bg-white shadow-lg border text-lg font-bold" />
          <div className="text-center text-slate-400">
            {stake && <small><code>Stake amount: {stake} ETH</code></small>}
          </div>
        </div>
      }
      {j2 && stake &&
        <div className="lg:w-1/2 lg:mx-auto">
          <button onClick={deployRPSHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Create contract</button>
        </div>
      }
      {contractTransactionHashRPS &&
        <div className="text-center text-slate-400">
          <small><code>Transaction hash:<br />{contractTransactionHashRPS}</code></small>
        </div>
      }
      {contractTransactionHashRPS &&
        <div className="p-10 border bg-white rounded-xl my-6">
          <p className="text-slate-500 text-center mb-4">After the contract transaction is executed:</p>
          <p className="text-slate-900 text-lg font-bold text-center mb-6">Get the contract address and send it to another player to join the round</p>

            <div className="lg:w-1/2 lg:mx-auto mb-6">
              <button onClick={getRPSContractAddressHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Get contract address</button>
            </div>
          {contractAddressRPS &&
            <div className="text-center">
              <code className="text-lg font-bold text-purple-900">{contractAddressRPS}</code>
            </div>
          }
        </div>
      }
      {(accountAddress && !contractTransactionHashRPS && !c1CommitmentInput) &&
        <div>
          <p className="my-20 text-center font-bold">Or</p>
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Re-enter existing round
          </h2>
          <div className="lg:w-3/5 xl:w-1/2 lg:mx-auto mb-3">
            <input onChange={contractAddressRPSInputHandler} placeholder="Contract address" className="w-full px-4 py-3 rounded-xl bg-white shadow-lg border text-lg font-bold" />
            <div className="text-center text-slate-400">
              {contractAddressRPS && <small><code>Contract address:<br />{contractAddressRPS}</code></small>}
            </div>
          </div>
        </div>
      }

      {contractAddressRPS &&
        <div className="lg:w-1/2 mx-auto my-16">
          <hr />
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Wait
          </h2>
          <p className="text-slate-900 text-lg mb-6">
            Wait at least 5 minutes for your opponent to play his/her move, then proceed.
          </p>
          <p className="text-slate-900 text-lg mb-6">
            If the other player has not played after 5 minutes, you can use the timeout function, below, to get your stake back.
          </p>
          <hr />
        </div>
      }

      {contractAddressRPS &&
        <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
          Confirm move
        </h2>
      }
      {contractAddressRPS &&
        <div className="lg:w-1/2 lg:mx-auto">
          <div className="relative mb-3">
            <input type="radio" name="c1Input" id="c1RockConfirm" value="1" onChange={c1InputHandler} className="hidden peer" />
            <label htmlFor="c1RockConfirm" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Rock</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1Input" id="c1PaperConfirm" value="2" onChange={c1InputHandler} className="hidden peer" />
            <label htmlFor="c1PaperConfirm" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Paper</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1Input" id="c1ScissorsConfirm" value="3" onChange={c1InputHandler} className="hidden peer" />
            <label htmlFor="c1ScissorsConfirm" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Scissors</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1Input" id="c1LizardConfirm" value="4" onChange={c1InputHandler} className="hidden peer" />
            <label htmlFor="c1LizardConfirm" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Lizard</h6>
              </div>
            </label>
          </div>
          <div className="relative mb-3">
            <input type="radio" name="c1Input" id="c1SpockConfirm" value="5" onChange={c1InputHandler} className="hidden peer" />
            <label htmlFor="c1SpockConfirm" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white shadow-lg hover:bg-blue-100 peer-checked:bg-purple-700 peer-checked:text-white cursor-pointer">
              <div>
                <h6 className="text-xl font-bold">Spock</h6>
              </div>
            </label>
          </div>
        </div>
      }
      {contractAddressRPS &&
        <div className="mt-8 lg:w-1/2 lg:mx-auto">
          <button onClick={solveHandler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Submit</button>
        </div>
      }

      {contractAddressRPS &&
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

      {(contractAddressRPS && (roundIsComplete == null || !roundIsComplete)) &&
        <div className="lg:w-1/2 mx-auto my-16">
          <h2 className="text-center text-3xl my-10 text-purple-900 font-bold">
            Timeout
          </h2>
          <p>If, after 5 minutes, your opponent has not played his/her move, click the timeout button to reclaim your stake.</p>
          <div className="mt-8">
            <button onClick={timeoutPlayer2Handler} className="text-center py-3 px-4 text-white rounded-xl w-full bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">Timeout</button>
          </div>
        </div>
      }
    </Layout>
  )
}

export default New

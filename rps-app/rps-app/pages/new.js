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
  const [c1Hash, setC1Hash] = useState(null)

  const [j2, setJ2] = useState(null)

  const [stake, setStake] = useState(null)

  const [contractTransactionHashRPS, setContractTransactionHashRPS] = useState(null)
  const [contractAddressRPS, setContractAddressRPS] = useState(null)

  const [c1, setC1] = useState(0)

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

  const c1CommitmentInputHandler = event => {
    setC1CommitmentInput(event.target.value)
  }

  const getC1HashHandler = () => {
    try {
      var contractHasher = new web3.eth.Contract(abiHasher, contractAddressHasher)
      contractHasher.methods.hash(c1CommitmentInput, 123).call((error, result) => {
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

  const c1InputHandler = event => {
    setC1(event.target.value)
  }

  const solveHandler = async () => {
    try {
      var contractRPS = new web3.eth.Contract(abiRPS, contractAddressRPS)
      await contractRPS.methods.solve(c1, 123).send({
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
        <title>New round - Rock Paper Scissors Spock Lizard</title>
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

      <h3>Step 1: Enter move (to be committed) and get c1Hash</h3>
      <div>
        <input type="radio" name="c1CommitmentInput" id="c1RockCommit" value="1" onChange={c1CommitmentInputHandler} /><label htmlFor="c1RockCommit">Rock</label>
        <input type="radio" name="c1CommitmentInput" id="c1PaperCommit" value="2" onChange={c1CommitmentInputHandler} /><label htmlFor="c1PaperCommit">Paper</label>
        <input type="radio" name="c1CommitmentInput" id="c1ScissorsCommit" value="3" onChange={c1CommitmentInputHandler} /><label htmlFor="c1ScissorsCommit">Scissors</label>
        <input type="radio" name="c1CommitmentInput" id="c1SpockCommit" value="4" onChange={c1CommitmentInputHandler} /><label htmlFor="c1SpockCommit">Spock</label>
        <input type="radio" name="c1CommitmentInput" id="c1LizardCommit" value="5" onChange={c1CommitmentInputHandler} /><label htmlFor="c1LizardCommit">Lizard</label>
        <br /><small><code>c1CommitmentInput: {c1CommitmentInput}</code></small>
      </div>
      <button onClick={getC1HashHandler}>Get c1Hash from c1</button>
      <p><small><code>c1Hash: {c1Hash}</code></small></p>

      <h3>Step 2: Deploy RPS contract</h3>
      <div>
        <input onChange={j2InputHandler} placeholder="Opponent's account address" />
        <br /><small><code>j2: {j2}</code></small>
      </div>
      <div>
        <input onChange={stakeInputHandler} placeholder="Stake (in ETH)" />
        <br /><small><code>Stake: {stake} ETH</code></small>
      </div>
      <button onClick={deployRPSHandler}>Deploy RPS</button>
      <p><small><code>RPS contract transaction hash: {contractTransactionHashRPS}</code></small></p>
      <button onClick={getRPSContractAddressHandler}>Get RPS contract address</button>
      <p><small><code>RPS contract address: {contractAddressRPS}</code></small></p>

      <hr />
      <p>Wait for player 2 to play his move.</p>
      <p>If player 2 hasn't played after 5 minutes, you can use the timeout function, below, to get your stake back.</p>
      <hr />

      <h3>Step 6: Confirm your move, and solve the round</h3>
      <div>
        <input type="radio" name="c1Input" id="c1RockConfirm" value="1" onChange={c1InputHandler} /><label htmlFor="c1RockConfirm">Rock</label>
        <input type="radio" name="c1Input" id="c1PaperConfirm" value="2" onChange={c1InputHandler} /><label htmlFor="c1PaperConfirm">Paper</label>
        <input type="radio" name="c1Input" id="c1ScissorsConfirm" value="3" onChange={c1InputHandler} /><label htmlFor="c1ScissorsConfirm">Scissors</label>
        <input type="radio" name="c1Input" id="c1SpockConfirm" value="4" onChange={c1InputHandler} /><label htmlFor="c1SpockConfirm">Spock</label>
        <input type="radio" name="c1Input" id="c1LizardConfirm" value="5" onChange={c1InputHandler} /><label htmlFor="c1LizardConfirm">Lizard</label>
        <br /><small><code>c1: {c1}</code></small>
      </div>
      <button onClick={solveHandler}>solve</button>

      <h3>Step 7: Check if round is complete</h3>
      <button onClick={checkRoundCompleteHandler}>Check if round is complete</button>
      {roundIsComplete && <h4>Round is complete.</h4>}
      {!roundIsComplete && <h4>Round is not complete.</h4>}

      <h3>Timeout</h3>
      <div>
        <p>If player 2 hasn't played for 5 minutes after you've challenged him to a round, click the button below to get your stake back.</p>
        <button onClick={timeoutPlayer2Handler}>Player 2 hasn't responded—get stake back</button>
      </div>

    </Layout>
  )
}

export default New

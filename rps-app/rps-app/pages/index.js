import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Web3 from 'web3'

const Home = () => {
  const [error, setError] = useState('')
  const [web3, setWeb3] = useState(null)
  const [accountAddress, setAccountAddress] = useState(null)
  const [contractTransactionHashRPS, setContractTransactionHashRPS] = useState(null)
  const [contractTransactionHashHasher, setContractTransactionHashHasher] = useState(null)
  const [contractAddressHasher, setContractAddressHasher] = useState(null)
  const [contractAddressRPS, setContractAddressRPS] = useState(null)
  const [c1CommitmentInput, setC1CommitmentInput] = useState(0)
  const [c1Hash, setC1Hash] = useState(null)
  const [stake, setStake] = useState(null)
  const [c2, setC2] = useState(0)
  const [c1, setC1] = useState(0)
  const [j1IsWinner, setj1IsWinner] = useState(null)

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
      } catch(error) {
        setError(error.message)
      }
    } else {
      // MetaMask not installed
      setError("Please install MetaMask")
    }
  }


  const deployRPS = () => {
    /* RPS compiled contract */
    var _c1Hash = c1Hash
    var _j2 = '0xAFfef56b5EaE0f3107BD5c130591a8496c39a928'
    var rpsContract = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}]);
    var rps = rpsContract.deploy({
      data: '0x608060405261012c600555604051604080610dbd833981018060405281019080805190602001909291908051906020019092919050505034600481905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160028160001916905550426006819055505050610cdc806100e16000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4395b9146100bf578063294914a4146101145780633a4b66f11461012b57806348e257cb146101565780634d03e3d21461018f57806353a04b05146101c257806380985af9146101e557806389f71d531461023c578063a5ddec7c14610267578063c37597c6146102a1578063c8391142146102f8578063f56f48f21461030f575b600080fd5b3480156100cb57600080fd5b506100fa600480360381019080803560ff169060200190929190803560ff16906020019092919050505061033a565b604051808215151515815260200191505060405180910390f35b34801561012057600080fd5b50610129610403565b005b34801561013757600080fd5b506101406104ae565b6040518082815260200191505060405180910390f35b34801561016257600080fd5b5061016b6104b4565b6040518082600581111561017b57fe5b60ff16815260200191505060405180910390f35b34801561019b57600080fd5b506101a46104c7565b60405180826000191660001916815260200191505060405180910390f35b6101e3600480360381019080803560ff1690602001909291905050506104cd565b005b3480156101f157600080fd5b506101fa610721565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024857600080fd5b50610251610747565b6040518082815260200191505060405180910390f35b34801561027357600080fd5b5061029f600480360381019080803560ff1690602001909291908035906020019092919050505061074d565b005b3480156102ad57600080fd5b506102b6610bd5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030457600080fd5b5061030d610bfa565b005b34801561031b57600080fd5b50610324610caa565b6040518082815260200191505060405180910390f35b600081600581111561034857fe5b83600581111561035457fe5b141561036357600090506103fd565b6000600581111561037057fe5b83600581111561037c57fe5b141561038b57600090506103fd565b600282600581111561039957fe5b8115156103a257fe5b0660028460058111156103b157fe5b8115156103ba57fe5b0614156103e1578160058111156103cd57fe5b8360058111156103d957fe5b1090506103fd565b8160058111156103ed57fe5b8360058111156103f957fe5b1190505b92915050565b6000600581111561041057fe5b600360009054906101000a900460ff16600581111561042b57fe5b14151561043757600080fd5b600554600654014211151561044b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050506000600481905550565b60045481565b600360009054906101000a900460ff1681565b60025481565b600060058111156104da57fe5b600360009054906101000a900460ff1660058111156104f557fe5b14151561056a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f4572726f723a20596f75206861766520616c726561647920706c617965642e0081525060200191505060405180910390fd5b60045434141515610609576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f4572726f723a20596f752068617665206e6f742070616964207468652073746181526020017f6b652e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260378152602001807f4572726f723a20596f7520617265206e6f742061737369676e6564206173207081526020017f6c61796572203220666f72207468697320726f756e642e00000000000000000081525060400191505060405180910390fd5b80600360006101000a81548160ff0219169083600581111561071257fe5b02179055504260068190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b6000600581111561075a57fe5b600360009054906101000a900460ff16600581111561077557fe5b14151515610811576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f4572726f723a20506c61796572203220686173206e6f7420706c61796564207981526020017f65742e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260378152602001807f4572726f723a20596f7520617265206e6f742061737369676e6564206173207081526020017f6c61796572203120666f72207468697320726f756e642e00000000000000000081525060400191505060405180910390fd5b6002546000191682826040518083600581111561091457fe5b60ff167f010000000000000000000000000000000000000000000000000000000000000002815260010182815260200192505050604051809103902060001916141515610a15576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260468152602001807f4572726f723a2054686973206973206e6f7420746865206d6f766520796f752081526020017f636f6d6d697474656420746f207768656e207374617274696e6720746869732081526020017f726f756e642e000000000000000000000000000000000000000000000000000081525060600191505060405180910390fd5b610a2e82600360009054906101000a900460ff1661033a565b15610a94576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f1935050505050610bc9565b610aad600360009054906101000a900460ff168361033a565b15610b1457600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f1935050505050610bc8565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050505b5b60006004819055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005811115610c0757fe5b600360009054906101000a900460ff166005811115610c2257fe5b14151515610c2f57600080fd5b6005546006540142111515610c4357600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506000600481905550565b600554815600a165627a7a72305820740f3a1dba674b4a9e2dfe363bf0fc31fc1e73b4f707b075f9fdfad4caa2fc2f0029',
      arguments: [
        _c1Hash,
        _j2,
      ]
    }).send({
      // from: web3.eth.accounts[0],
      // from: '0x26012CeC5C940e68C1Aea84ba0018c8217F6D943',
      from: accountAddress,
      gas: '4700000',
      value: web3.utils.toWei(stake, "ether")
    }, function (e, contract){
      console.log(e, contract);
      setContractTransactionHashRPS(contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      }
    })
  }

  const deployHasher = () => {
    /* Hasher compiled contract */
    var hasherContract = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]);
    var hasher = hasherContract.deploy({
      data: '0x608060405234801561001057600080fd5b50610113806100206000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806367ef4c13146044575b600080fd5b348015604f57600080fd5b506079600480360381019080803560ff169060200190929190803590602001909291905050506097565b60405180826000191660001916815260200191505060405180910390f35b60008282604051808360ff1660ff167f01000000000000000000000000000000000000000000000000000000000000000281526001018281526020019250505060405180910390209050929150505600a165627a7a72305820e54c8e0119de19ea5efcc52800c2b4e2fcb121ec0fb01e4695a4a3471a9664000029',
      arguments: [
      ]
    }).send({
      // from: '0x26012CeC5C940e68C1Aea84ba0018c8217F6D943',
      from: accountAddress,
      gas: '4700000'
    }, async function (e, contract){ // Remove/delete aync?
      console.log(e, contract);
      setContractTransactionHashHasher(contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      }
    })
  }

  const c1CommitmentInputHandler = event => {
    setC1CommitmentInput(event.target.value)
  }

  const getHasherContractAddress = async () => {
    const transactionReceipt = await web3.eth.getTransactionReceipt(contractTransactionHashHasher)
    setContractAddressHasher(transactionReceipt.contractAddress)
  }

  const getRPSContractAddress = async () => {
    const transactionReceipt = await web3.eth.getTransactionReceipt(contractTransactionHashRPS)
    setContractAddressRPS(transactionReceipt.contractAddress)
  }

  const callHasherContract = () => {
    var contractHasher = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}], contractAddressHasher)
    try {
      contractHasher.methods.hash(c1CommitmentInput, 123).call((error, result) => {
        setC1Hash(result)
      })
    } catch(error) {
      setError(error.message)
    }
  }

  const stakeInputHandler = event => {
    setStake(event.target.value)
  }

  const contractAddressRPSInputHandler = event => {
    setContractAddressRPS(event.target.value)
  }

  const getStakeHandler = () => {
    var contractRPS = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}], contractAddressRPS)
    try {
      contractRPS.methods.stake().call((error, result) => {
        setStake(web3.utils.fromWei(result, "ether"))
      })
    } catch(error) {
      setError(error.message)
    }
  }

  const c2InputHandler = event => {
    setC2(event.target.value)
  }

  const playHandler = async () => {
    var contractRPS = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}], contractAddressRPS)
    try {
      await contractRPS.methods.play(c2).send({
        from: accountAddress,
        gas: '4700000',
        value: web3.utils.toWei(stake, "ether")
      })
    } catch(error) {
      setError(error.message)
    }
  }

  const c1InputHandler = event => {
    setC1(event.target.value)
  }

  const solveHandler = () => {
    var contractRPS = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}], contractAddressRPS)
    try {
      contractRPS.methods.solve(c1, 123).send({
        from: accountAddress,
        gas: '4700000'
      })
      console.log("Clicked solve button")
      // setj1IsWinner(response)
    } catch(error) {
      setError(error.message)
      console.log("Solve button error")
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
      <p><small><code>Account: {accountAddress}</code></small></p>
      <hr />
      <h2>Player 1</h2>
      <h3>Step 1: Deploy Hasher contract</h3>
      <button onClick={deployHasher}>Deploy Hasher</button>
      <p><small><code>Hasher contract transaction hash: {contractTransactionHashHasher}</code></small></p>
      <button onClick={getHasherContractAddress}>Get Hasher contract address</button>
      <p><small><code>Hasher contract address: {contractAddressHasher}</code></small></p>
      <h3>Step 2: Enter move (to be committed) and get c1Hash</h3>
      <div>
        <input type="radio" name="c1CommitmentInput" id="c1rock" value="1" onChange={c1CommitmentInputHandler} /><label htmlFor="c1rock">Rock</label>
        <input type="radio" name="c1CommitmentInput" id="c1paper" value="2" onChange={c1CommitmentInputHandler} /><label htmlFor="c1paper">Paper</label>
        <input type="radio" name="c1CommitmentInput" id="c1scissors" value="3" onChange={c1CommitmentInputHandler} /><label htmlFor="c1scissors">Scissors</label>
        <input type="radio" name="c1CommitmentInput" id="c1spock" value="4" onChange={c1CommitmentInputHandler} /><label htmlFor="c1spock">Spock</label>
        <input type="radio" name="c1CommitmentInput" id="c1lizard" value="5" onChange={c1CommitmentInputHandler} /><label htmlFor="c1lizard">Lizard</label>
        <br /><small><code>c1CommitmentInput: {c1CommitmentInput}</code></small>
      </div>
      <button onClick={callHasherContract}>Call Hasher contract (get c1Hash)</button>
      <p><small><code>c1Hash: {c1Hash}</code></small></p>
      <h3>Step 3: Deploy RPS contract</h3>
      <div>
        <input onChange={stakeInputHandler} placeholder="Stake (in ETH)" />
        <br /><small><code>Stake: {stake} ETH</code></small>
      </div>
      <button onClick={deployRPS}>Deploy RPS</button>
      <p><small><code>RPS contract transaction hash: {contractTransactionHashRPS}</code></small></p>
      <button onClick={getRPSContractAddress}>Get RPS contract address</button>
      <p><small><code>RPS contract address: {contractAddressRPS}</code></small></p>
      <hr />
      <h2>Player 2</h2>
      <h3>Step 4: Set RPS contract address</h3>
      <p>Player 1 should have deployed an RPS contract to start a game for you to join, and should have staked ETH into that RPS contract as a bet on the game.</p>
      <p>You need to get the address of that RPS contract so you can join as player 2 for that game.</p>
      <div>
        <input onChange={contractAddressRPSInputHandler} placeholder="RPS contract address" />
        <br /><small><code>RPS contract address: {contractAddressRPS}</code></small>
      </div>
      <h3>Step 5: Get stake</h3>
      <button onClick={getStakeHandler}>Get stake</button>
      <p><small><code>Stake: {stake} ETH</code></small></p>
      <h3>Step 6: Pick a move, accept the stake, and commit to the contract</h3>
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
      <h2>Player 1</h2>
      <h3>Step 7: Confirm your move, and solve the round</h3>
      <div>
        <input type="radio" name="c1Input" id="c1rock" value="1" onChange={c1InputHandler} /><label htmlFor="c1rock">Rock</label>
        <input type="radio" name="c1Input" id="c1paper" value="2" onChange={c1InputHandler} /><label htmlFor="c1paper">Paper</label>
        <input type="radio" name="c1Input" id="c1scissors" value="3" onChange={c1InputHandler} /><label htmlFor="c1scissors">Scissors</label>
        <input type="radio" name="c1Input" id="c1spock" value="4" onChange={c1InputHandler} /><label htmlFor="c1spock">Spock</label>
        <input type="radio" name="c1Input" id="c1lizard" value="5" onChange={c1InputHandler} /><label htmlFor="c1lizard">Lizard</label>
        <br /><small><code>c1: {c1}</code></small>
      </div>
      <button onClick={solveHandler}>solve</button>
      <hr />
      <code>{error}</code>
    </div>
  )
}

export default Home

// Contract: 0xfeC69ACda8d3c6Cb9c1399F8c8829AF5aFafCa2c
// c1: Spock
// c2: Lizard
// Stake: 0.03 ETH
// j1 balance after staking: 0.4686 ETH
// j2 balance after staking: 0.4625 ETH
// Lizard <c2, j2> should win over Spock <c1, j1> (poisons Spock)
// TRANSFER  0.06 Ether From 0xfec69acda8d3c6cb9c1399f8c8829af5afafca2c To 0xaffef56b5eae0f3107bd5c130591a
// Translation: TRANSFER 0.06 Ether From <contract> to <j2>
// j1 balance after playing: 0.4685 ETH
// j2 balance after playing: 0.5225 ETH (= 0.4625 ETH + 0.06 ETH)
// WORKED!

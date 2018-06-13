const contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_stock",
				"type": "uint8"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "buyProduct",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getProductPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getProductStock",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "removeProduct",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var myMarketContract;
var transactionObject;
window.addEventListener('load', function () {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    startApp();
  } else {
    alert('Please install metamask : https://metamask.io/ ');
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Now you can start your app & access web3 freely:


});

function startApp() {
  var account = web3.eth.accounts[0];
  var accountInterval = setInterval(function () {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      updateInterface();
      transactionObject = {
        from: account,
        gas: 200000,
        gasPrice: 1000000000
      }
      console.log(account);
    }
  }, 100);
  transactionObject = {
    from: account,
    gas: 200000,
    gasPrice: 1000000000
  }
}
function loadcontract() {
  let adress = document.getElementById('inputAdress').value;

  let marketContract = web3.eth.contract(contractABI);
  myMarketContract = marketContract.at(adress);
  let events = myMarketContract.allEvents(function (error, log) {
    if (!error)
      console.log(log);
  });
  console.log(events);
  //TODO show/hide inputs for each actions and logic

}
function deployContract() {
  var deploycontractContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "getProductStock", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_stock", "type": "uint8" }, { "name": "_amount", "type": "uint256" }], "name": "addProduct", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "buyProduct", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "getProductPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "removeProduct", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
  var deploycontract = deploycontractContract.new(
    {
      from: web3.eth.accounts[0],
      data: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610b92806100606000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631471693914610072578063352fcdb5146100f5578063364e022f14610175578063694caedf146101e95780639726dd1914610266575b600080fd5b34801561007e57600080fd5b506100d9600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506102e7565b604051808260ff1660ff16815260200191505060405180910390f35b34801561010157600080fd5b50610173600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803560ff16906020019092919080359060200190929190505050610404565b005b6101cf600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061058f565b604051808215151515815260200191505060405180910390f35b3480156101f557600080fd5b50610250600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506108d1565b6040518082815260200191505060405180910390f35b34801561027257600080fd5b506102cd600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109ee565b604051808215151515815260200191505060405180910390f35b600073__browser/lib.sol:MarketPlace___________6330454d416001846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561037757808201518184015260208101905061035c565b50505050905090810190601f1680156103a45780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156103c257600080fd5b505af41580156103d6573d6000803e3d6000fd5b505050506040513d60208110156103ec57600080fd5b81019080805190602001909291905050509050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561045f57600080fd5b73__browser/lib.sol:MarketPlace___________63a3590a2760018585856040518563ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180858152602001806020018460ff1660ff168152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156105015780820151818401526020810190506104e6565b50505050905090810190601f16801561052e5780820380516001836020036101000a031916815260200191505b509550505050505060206040518083038186803b15801561054e57600080fd5b505af4158015610562573d6000803e3d6000fd5b505050506040513d602081101561057857600080fd5b810190808051906020019092919050505050505050565b60006001151573__browser/lib.sol:MarketPlace___________631a17bd37600185346040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561062a57808201518184015260208101905061060f565b50505050905090810190601f1680156106575780820380516001836020036101000a031916815260200191505b5094505050505060206040518083038186803b15801561067657600080fd5b505af415801561068a573d6000803e3d6000fd5b505050506040513d60208110156106a057600080fd5b8101908080519060200190929190505050151514156108c8576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610720573d6000803e3d6000fd5b5073__browser/lib.sol:MarketPlace___________6314c065e160016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168533346040518663ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825285818151815260200191508051906020019080838360005b8381101561083d578082015181840152602081019050610822565b50505050905090810190601f16801561086a5780820380516001836020036101000a031916815260200191505b50965050505050505060206040518083038186803b15801561088b57600080fd5b505af415801561089f573d6000803e3d6000fd5b505050506040513d60208110156108b557600080fd5b8101908080519060200190929190505050505b60019050919050565b600073__browser/lib.sol:MarketPlace___________63765a78b56001846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610961578082015181840152602081019050610946565b50505050905090810190601f16801561098e5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156109ac57600080fd5b505af41580156109c0573d6000803e3d6000fd5b505050506040513d60208110156109d657600080fd5b81019080805190602001909291905050509050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a4b57600080fd5b73__browser/lib.sol:MarketPlace___________63db5086fb6001846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610ad9578082015181840152602081019050610abe565b50505050905090810190601f168015610b065780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b158015610b2457600080fd5b505af4158015610b38573d6000803e3d6000fd5b505050506040513d6020811015610b4e57600080fd5b810190808051906020019092919050505090509190505600a165627a7a723058207c1bd3452085522ca59a06b292b940930e73e3cb12f8adebfcb64f480ff7187d0029',
      gas: '4700000'
    }, function (e, contract) {
      console.log(e, contract);
      if (typeof contract === 'undefined') {
        alert('Transaction rejected !');
      } else if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        alert('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        document.getElementById('inputAdress').value = contract.address;
        loadcontract();
      }
    });

}


// contractInstance.createRandomAgency.sendTransaction('name', transactionObject, (error, result) => { // do something with error checking/result here });

  function buyProduct() {
    let bp1 = document.getElementById('bp1').value;
  }
  function addProduct() {
    let ap1 = document.getElementById('ap1').value;
    let ap2 = document.getElementById('ap2').value;
    let ap3 = document.getElementById('ap3').value;
    myMarketContract.addProduct()
    // suppose you want to call a function named myFunction of myContract
    var getData = myMarketContract.addProduct.sendTransaction([ap1,ap2,ap3],transactionObject);
    //finally paas this data parameter to send Transaction
    web3.eth.sendTransaction({ to: Contractaddress, from: Accountaddress, data: getData });

  }
  function getProductPrice() {
    let gpp1 = document.getElementById('gpp1').value;
  }
  function getProductStock() {
    let gps1 = document.getElementById('gps1').value;
  }
  function removeProduct() {
    let rp1 = document.getElementById('rp1').value;
  }

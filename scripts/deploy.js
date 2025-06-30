const { Web3 } = require("web3");
const fs = require("fs");

const web3 = new Web3("http://localhost:8545");

const bytecode = fs
  .readFileSync("artifacts/contracts/StorageContract.sol/StorageContract.json")
  .toString();

const contractJson = JSON.parse(bytecode);
const abi = contractJson.abi;

const contractCode = contractJson.bytecode;

async function main() {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);

  const deploy = await contract.deploy({ data: contractCode }).send({
    from: accounts[0],
    gas: 1000000,
    gasPrice: 1000000000,
  });
  console.log("contract deploy sukses", deploy);
}

main();

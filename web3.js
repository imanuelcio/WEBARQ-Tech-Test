const { Web3 } = require("web3");
const fs = require("fs");

const web3 = new Web3("http://localhost:8545");

const contract = fs
  .readFileSync("artifacts/contracts/StorageContract.sol/StorageContract.json")
  .toString();

const contractToJSON = JSON.parse(contract);
const abi = contractToJSON.abi;
const deployAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const syncContract = new web3.eth.Contract(abi, deployAddress);
// console.log(syncContract);

async function main() {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  const currentValue = await syncContract.methods.getValue().call();
  console.log("current value", currentValue);
  console.log("sending...");
  await syncContract.methods.storeValue(1000).send({
    from: accounts[0],
    gas: 1000000,
    gasPrice: 1000000000,
  });
  console.log("sent");
  const newValue = await syncContract.methods.getValue().call();
  console.log("new value", newValue);
}
main().catch(console.error);

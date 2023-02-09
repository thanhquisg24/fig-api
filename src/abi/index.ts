// eslint-disable-next-line @typescript-eslint/no-var-requires
const TranferContractABI = require('./contract-json/FIG.json');

import { BigNumber } from 'ethers';
import Web3 from 'web3';
import { parseEther } from '@ethersproject/units';

const formAddress = '0x3B0111B2183742435D8277433a26FdC02AE5Cd12';
const formPrivateKey =
  '728ec7302e56103fbbe58d2b07a604710fed57c2d5667ef4b29495603c7397ac';
const infuraUrl = 'https://rpc-agnek.figchain.org';

const toAddress = '0x72f79E934676626d0394BC6C5ADCBF2fD914Fd79';
//Hard way (web3#signTransaction() + web3#sendSignedTransaction())
const init1 = async () => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    TranferContractABI.abi,
    TranferContractABI.networks[networkId].address,
    { from: formAddress },
  );

  const tx = myContract.methods.setData(1);
  const gas = await tx.estimateGas({ from: formAddress });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(formAddress);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId,
    },
    formPrivateKey,
  );
  console.log(`Old data value: ${await myContract.methods.data().call()}`);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`New data value: ${await myContract.methods.data().call()}`);
};

//Slightly easier (web3#sendTransaction())
const init2 = async () => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    TranferContractABI.abi,
    TranferContractABI.networks[networkId].address,
  );
  web3.eth.accounts.wallet.add({
    address: formAddress,
    privateKey: formPrivateKey,
  });

  const tx = myContract.methods.transfer(toAddress, parseEther('29'));
  const gas = await tx.estimateGas({ from: formAddress });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(formAddress);
  const txData = {
    from: formAddress,
    to: myContract.options.address,
    data: data,
    gas,
    gasPrice,
    nonce,
    chainId: networkId,
  };

  // console.log(`Old data value: ${await myContract.methods.data().call()}`);
  const receipt = await web3.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  // console.log(`New data value: ${await myContract.methods.data().call()}`);
};

//Easy way (Web3 + @truffle/hdwallet-provider)
// const init3 = async () => {
//   const provider = new Provider(
//     privateKey,
//     'https://rinkeby.infura.io/v3/74aa9a15e2524f6980edb8a377301f3c',
//   );
//   const web3 = new Web3(provider);
//   const networkId = await web3.eth.net.getId();
//   const myContract = new web3.eth.Contract(
//     MyContract.abi,
//     MyContract.networks[networkId].address,
//   );

//   console.log(await myContract.methods.data().call());
//   console.log(`Old data value: ${await myContract.methods.data().call()}`);
//   const receipt = await myContract.methods.setData(3).send({ from: address });
//   console.log(`Transaction hash: ${receipt.transactionHash}`);
//   console.log(`New data value: ${await myContract.methods.data().call()}`);
// };

// init3();
init2();

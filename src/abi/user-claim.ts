import { parseEther } from '@ethersproject/units';
import Web3 from 'web3';
import { FIG_CHAIN } from './constants';
import * as TranferContractABI from './contract-json/FIG.json';
// import { FIG_CONTACT_JSON  as TranferContractABI} from "./contract-json/FIG";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const TranferContractABI = require('./contract-json/FIG.json');

const infuraUrl = FIG_CHAIN.rpcUrl;
export const prepareTxClaim = async (
  fromWallet: {
    address: string;
    privateKey: string;
  },
  toAddress: string,
  amount: number | string,
) => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    TranferContractABI.abi,
    TranferContractABI.networks[networkId].address,
  );
  web3.eth.accounts.wallet.add({
    address: fromWallet.address,
    privateKey: fromWallet.privateKey,
  });

  const tx = myContract.methods.transfer(toAddress, parseEther(`${amount}`));
  const gas = await tx.estimateGas({ from: fromWallet.address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(fromWallet.address);
  const txData = {
    from: fromWallet.address,
    to: myContract.options.address,
    data: data,
    gas,
    gasPrice,
    nonce,
    chainId: networkId,
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    txData,
    fromWallet.privateKey,
  );
  //   signedTx.transactionHash
  console.log(`Prepare Transaction hash: ${signedTx.transactionHash}`);
  return { web3, signedTx, prepareTxHash: signedTx.transactionHash };
};

export const postTxClaim = async (
  web3: Web3,
  signedTx: any,
): Promise<string> => {
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Post Transaction hash: ${receipt.transactionHash}`);
  return receipt.transactionHash;
};

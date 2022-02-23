import Web3 from 'web3';

import abi from '../contracts/abi.json';
import { AbiItem } from "web3-utils";

const rpcURL: string | undefined = process.env.REACT_APP_API_URL;
const web3 = new Web3(rpcURL!!);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress) || {};


export const getBalance = async (address: string) => {
    let balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}

export const getTotalSupply = async () => {
    try {

        const totalSupply = await contract?.methods?.totalSupply();
        

        return totalSupply
    } catch (e) {
        return 10000
    }
}

export const getMaxSupply = async () => {
    const maxSupply = await contract.methods.MAX_SUPPLY;
    
    return maxSupply
}

export const buyNFT = async (number: number) => {
    const { ethereum } = window;
    const transactionParams = {
        to: contractAddress,
        from: ethereum.selectedAddress,
        value: web3.utils.toHex(web3.utils.toWei('0.05', 'ether')),
        gasLimit: web3.utils.toHex(300000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('350', 'gwei')),
        data: contract.methods.mint(number).encodeABI()
    };
    return await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
    })
}

export const getToken = async (address: string) => {
    return await contract.methods.walletOfOwner(address).call();
}

export const getTokenUri = async (tokenId: number) => {
    return await contract.methods.tokenURI(tokenId).call();
}

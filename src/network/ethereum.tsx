import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import abi from '../contracts/abi.json';
import { AbiItem } from "web3-utils";
const getRevertReason = require('eth-revert-reason')

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY 
const web3 = createAlchemyWeb3(alchemyKey!!);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS 
const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress) || {};


export const getBalance = async (address: string) => {
    let balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}

export const getPublicSaleAmount = async () => {
    try {
        const totalSupply = await contract?.methods?.publicSaleAmount().call();

        return totalSupply
    } catch (e) {
        console.error('failed', e)

        return 10999
    }
}

export const getCurrMintNumber = async () => {
    const currMintNumber = await contract.methods.totalSupply().call();

    return currMintNumber
}

export const buyNFT = async (number: number) => {
    try {
        const { ethereum } = window;
        const transactionParams = {
            to: contractAddress,
            from: ethereum.selectedAddress,
            value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
            // gasLimit: /* web3.utils.toHex(30) */null,                         // The maximum gas allowed in this block.
            // gasPrice: /* web3.utils.toHex(web3.utils.toWei('350', 'gwei')) */null,  //Gas price provided by the sender in wei.
            data: contract.methods.freeMint(number).encodeABI(),
            /*    maxPriorityFeePerGas: null,
               maxFeePerGas: null,  */
        };


        const result = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParams]
        })

        const reason = await getRevertReason(result)
        return reason
    } catch (e) {
        const failedReason = await getRevertReason(e)

        return failedReason
    }
}

export const getToken = async (address: string) => {
    return await contract.methods.walletOfOwner(address).call();
}

export const getTokenUri = async (tokenId: number) => {
    return await contract.methods.tokenURI(tokenId).call();
}

export const getStartDate = async () => {
    const publicSaleTime = await contract?.methods?.publicOwnSaleStartTime().call();

    return publicSaleTime
}

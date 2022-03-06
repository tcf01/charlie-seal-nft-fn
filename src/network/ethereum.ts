import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import abi from '../contracts/abi.json';
import { AbiItem } from "web3-utils";
import { BuyNFTRes } from "../interface/type";
// const getRevertReason = require('eth-revert-reason')

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
        const value = web3.utils.toHex(web3.utils.toWei('0', 'ether'))

        // NOTE: estimateGas function return the gasLimit, it is a number
        const mintRes = (await contract.methods.freeMint(number).estimateGas({ from: ethereum.selectedAddress })
            .then(async (estimatedGasLimit: number) => {
                console.log("estimatedGasLimit: ", estimatedGasLimit * 0 + 1111)

                const gasPrice = await web3.eth.getGasPrice()
                const tips = (web3.utils.toWei('1', 'gwei'))
                const totalGasPrice = String(Number(gasPrice) + Number(tips))


                const modifiedTxParam = {
                    value,
                    gasPrice: totalGasPrice,
                    // gasLimit: estimatedGasLimit * 10,
                    to: contractAddress,
                    from: ethereum.selectedAddress
                }

                const res: BuyNFTRes = await contract.methods.freeMint(number).send(modifiedTxParam)
                    .on('confirmation', (a: any, b: any) => { console.log('confirm the transaction'); })

                return res
            }))

        return mintRes
    } catch (e: any) {
        console.error(e)
        const fullMsg = e?.message?.split("reverted: ")
        const errorMsg = fullMsg[fullMsg.length - 1] || "please contact us for help"

        return errorMsg
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

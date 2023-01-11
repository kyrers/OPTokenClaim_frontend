import { Contract, ethers } from "ethers";
import { contractAddress, contractABI, targetNetwork } from '../config/config';
import { transactionFailedElement, transactionSuccessElement } from "../components/AlertScreen";

export const loadClaimContract: any = () => {
    let provider = new ethers.providers.JsonRpcProvider(targetNetwork.rpcUrl)
    return new Contract(contractAddress, contractABI, provider);
};

export const loadCurrentEpoch: any = async (contract: Contract) => {
    return (await contract.currentEpoch()).toNumber();
};

export const subscribeAddress: any = async (contract: Contract, address: string, displayAlert: (element: JSX.Element) => void) => {
    try {
        let tx = await contract.subscribe(address);
        let receipt = await tx.wait();
        let blockExplorerUrl = `${targetNetwork.blockExplorer}/tx/${receipt.transactionHash}`;
        displayAlert(transactionSuccessElement("Transaction succeeded", blockExplorerUrl));
    } catch (error: any) {
        displayAlert(transactionFailedElement(`Transaction failed ${error.reason !== undefined ? `- ${error.reason}` : ""}`));
    }
}

export const claimOPTokens: any = async (contract: Contract, address: string, displayAlert: (element: JSX.Element) => void) => {
    try {
        let tx = await contract.claimOP(address);
        let receipt = await tx.wait();
        let blockExplorerUrl = `${targetNetwork.blockExplorer}/tx/${receipt.transactionHash}`;
        displayAlert(transactionSuccessElement("Transaction succeeded", blockExplorerUrl));
    } catch (error: any) {
        displayAlert(transactionFailedElement(`Transaction failed ${error.reason !== undefined ? `- ${error.reason}` : ""}`));
    }
}

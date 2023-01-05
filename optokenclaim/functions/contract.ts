import { Contract, ethers } from "ethers";
import { contractAddress, contractABI, targetNetwork } from '../config/config';

export const loadClaimContract: any = () => {
    let provider = new ethers.providers.JsonRpcProvider(targetNetwork.rpcUrl)
    return new Contract(contractAddress, contractABI, provider);
};

export const loadCurrentEpoch: any = async (contract: Contract) => {
    return (await contract.currentEpoch()).toNumber();
};

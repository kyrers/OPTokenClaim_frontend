import { targetNetwork } from "../config/config";

export const formatErrorMessage = (error: any) => {
    return `${error.reason !== undefined ? `: ${error.reason.replace("execution reverted: ", "")}` : ""}`;
};

export const generateBlockExplorerUrl = (txHash: string) => {
    return `${targetNetwork.blockExplorer}/tx/${txHash}`;
};

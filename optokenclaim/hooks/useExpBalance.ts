import { useState } from "react";
import { useContractRead } from "wagmi";
import { claimContractABI, claimContractAddress, targetNetwork } from "../config/config";

type FunctionProps = {
    currentEpoch: number;
    address: `0x${string}` | undefined;
};

//This needs to be a custom hook because it will be used by both forms
export default function useExpBalance({ currentEpoch, address }: FunctionProps) {
    const [subscribedExpBalance, setSubscribedExpBalance] = useState<number | undefined>(undefined);

    const { refetch: fetchSubscribedExpBalance, isFetching: isFetchingSubscribedExpBalance } = useContractRead({
        address: claimContractAddress,
        abi: claimContractABI,
        functionName: "epochToSubscribedEXP",
        enabled: false,
        chainId: targetNetwork.chainId,
        args: [currentEpoch, address],
        onSuccess(data: any) {
            setSubscribedExpBalance(data / 10 ** 18);
        },
        onError() {
            setSubscribedExpBalance(undefined);
        },
    });

    return { subscribedExpBalance, isFetchingSubscribedExpBalance, setSubscribedExpBalance, fetchSubscribedExpBalance };
};

import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from "wagmi";
import { claimContractABI, claimContractAddress, targetNetwork } from "../config/config";
import { formatErrorMessage, generateBlockExplorerUrl } from "../utils/common";
import { loadingElement, transactionFailedElement, transactionSuccessElement } from "./AlertScreen";
import useExpBalance from "../hooks/useExpBalance";

type FunctionProps = {
    currentEpoch: number;
    displayAlert: (element: JSX.Element) => void;
};

export default function ClaimOPForm({ currentEpoch, displayAlert }: FunctionProps) {
    const [claimableBalance, setClaimableBalance] = useState<number | undefined>(undefined);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isToExecuteAfterNetworkChange, setIsToExecuteAfterNetworkChange] = useState(false);

    const { address, isConnected } = useAccount();

    const { fetchSubscribedExpBalance } = useExpBalance({
        currentEpoch: currentEpoch,
        address: address
    });

    const { chain } = useNetwork();

    const validAddress = undefined !== address;
    const canClaim = (claimableBalance ?? 0) > 0;
    const isTargetNetwork = chain?.id === targetNetwork.chainId;

    const { switchNetwork } = useSwitchNetwork({
        onError(error: any) {
            /*
           Always set to false here, because if it is to execute after the network changed but the user rejects switching networks, it would never be set to false.
           This would mean that when the user connected to the correct network, the app would try to send the subscribe tx
           */
            setIsToExecuteAfterNetworkChange(false);

            displayAlert(transactionFailedElement(`Transaction failed ${formatErrorMessage(error)}`));
        },
    });

    const { config, isError: isPrepareError, isLoading } = usePrepareContractWrite({
        address: claimContractAddress,
        abi: claimContractABI,
        functionName: "claimOP",
        chainId: targetNetwork.chainId,
        args: [address],
        enabled: validAddress && canClaim,
        onSuccess() {
            /*
            Always set to false here, because if the user is on the wrong chain there is a networkError, however the user can still initiate the tx and will be prompted to switch chains before sending it.
            In this flow, the isNetworkError would never be set to false.
            */
            setIsNetworkError(false);

            if (isToExecuteAfterNetworkChange) {
                setIsToExecuteAfterNetworkChange(false);
                if (write) {
                    displayAlert(loadingElement("Claiming"));
                    write?.();
                }
            }
        },
        onError() {
            /*
            Always set to false here, because if it is to execute after the network changed but usePrepareContractWrite errors out, it would never be set to false.
            This would mean that when usePrepareContractWrite reached onSuccess, it would start the tx automatically, due to isToExecuteAfterNetworkChange still being true after a chain switch happened
            */
            setIsToExecuteAfterNetworkChange(false);

            //If the user is connected and it is a network error, we can just let them execute the action and before sending the transaciton we prompt a chain switch
            if (chain && !isTargetNetwork && isConnected) {
                setIsNetworkError(true)
            } else {
                setIsNetworkError(false);
            }
        }
    });

    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            fetchClaimableBalance();
            fetchSubscribedExpBalance();
            displayAlert(transactionSuccessElement("Transaction succeeded", generateBlockExplorerUrl(data.hash)));
        },
        onError(error: any) {
            displayAlert(transactionFailedElement(`Transaction failed ${formatErrorMessage(error)}`));
        },
    });

    const { refetch: fetchClaimableBalance, isFetching: isFetchingClaimableBalance } = useContractRead({
        address: claimContractAddress,
        abi: claimContractABI,
        functionName: "calcReward",
        enabled: false,
        chainId: targetNetwork.chainId,
        args: [address, (currentEpoch > 0 ? currentEpoch - 1 : currentEpoch)],
        onSuccess(data: any) {
            setClaimableBalance(data / 10 ** 18);
        },
        onError() {
            setClaimableBalance(undefined);
        },
    });

    //Fetch when address or epoch changes. Epoch is needed to keep the claimable balance up to date
    useEffect(() => {
        if (address) {
            fetchClaimableBalance();
        } else {
            setClaimableBalance(undefined);
        }
    }, [address, currentEpoch]);

    const isButtonDisabled = () => {
        return !isConnected || !validAddress || (isPrepareError && !isNetworkError) || !canClaim || isFetchingClaimableBalance;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!isTargetNetwork) {
            setIsToExecuteAfterNetworkChange(true);
            switchNetwork?.(targetNetwork.chainId);
        } else {
            displayAlert(loadingElement("Claiming"));
            write?.();
        }
    };

    return (
        <>
            {
                isConnected && !isFetchingClaimableBalance ?
                    <>
                        <h3 className={styles.formDescriptionText}>Claimable OP: {claimableBalance !== undefined && !isFetchingClaimableBalance ? `${claimableBalance} EXP` : ""}  </h3>
                    </>
                    :
                    null
            }

            <form onSubmit={handleSubmit}>
                <button className={isLoading ? styles.loading : ""} disabled={isButtonDisabled()} type="submit">Claim</button>
            </form>
        </>
    )
};

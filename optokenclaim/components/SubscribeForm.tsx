import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from "wagmi";
import { contractABI, contractAddress, targetNetwork } from "../config/config";
import { formatErrorMessage, generateBlockExplorerUrl } from "../utils/common";
import { loadingElement, transactionFailedElement, transactionSuccessElement } from "./AlertScreen";

type FunctionProps = {
    isConnected: boolean;
    displayAlert: (element: JSX.Element) => void;
};

export default function SubscribeForm({ isConnected, displayAlert }: FunctionProps) {
    const [subscribeAddress, setSubscribeAddress] = useState<any>(undefined);
    const [prepareErrorMessage, setPrepareErrorMessage] = useState("");
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isToExecuteAfterNetworkChange, setIsToExecuteAfterNetworkChange] = useState(false);

    const validAddress = undefined !== subscribeAddress && subscribeAddress.length === 42;

    const { chain } = useNetwork();
    const isTargetNetwork = chain?.id === targetNetwork.chainId;

    const { switchNetwork } = useSwitchNetwork({
        onError(error: any) {
            displayAlert(transactionFailedElement(`Transaction failed ${formatErrorMessage(error)}`));
        },
    });

    const { config, isError: isPrepareError, isLoading, refetch } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: "subscribe",
        chainId: targetNetwork.chainId,
        args: [subscribeAddress],
        enabled: validAddress,
        onSuccess() {
            /*
            Always set to false here, because if the user is on the wrong chain there is a networkError, however the user can still initiate the tx and will be prompted to switch chains before sending it.
            In this flow, the isNetworkError would never be set to false, causing the button text to remain unchanged
            */
            setIsNetworkError(false);

            if (isToExecuteAfterNetworkChange) {
                setIsToExecuteAfterNetworkChange(false);
                if (write) {
                    displayAlert(loadingElement("Subscribing"));
                    write?.();
                }
            }
        },
        onError(err: any) { //any type is needed to access reason, otherwise wagmi only exports full message
            /*
            Always set to false here, because if it is to execute after the network changed but usePrepareContractWrite errors out, it would never be set to false.
            This would mean that when usePrepareContractWrite reached onSuccess, it would start the tx automatically, due to isToExecuteAfterNetworkChange still being true after a chain switch happened
            */
            setIsToExecuteAfterNetworkChange(false);

            //If the user is connected and it is a network error, we can just let them execute the action and before sending the transaciton we prompt a chain switch
            if (chain && !isTargetNetwork && isConnected) {
                setIsNetworkError(true);
            } else {
                setIsNetworkError(false);
                setPrepareErrorMessage(formatErrorMessage(err));
            }
        }
    });

    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            displayAlert(transactionSuccessElement("Transaction succeeded", generateBlockExplorerUrl(data.hash)));
        },
        onError(error: any) {
            displayAlert(transactionFailedElement(`Transaction failed ${formatErrorMessage(error)}`));
        },
    });

    const isButtonDisabled = () => {
        return !isConnected || !validAddress || (!write && isPrepareError && !isNetworkError);
    }

    const getButtonText = () => {
        return !isConnected ? "Connect Wallet" : isNetworkError || !isTargetNetwork ? "Connect to Optimism & Subscribe" : "Subscribe";
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!isTargetNetwork) {
            setIsToExecuteAfterNetworkChange(true);
            switchNetwork?.(targetNetwork.chainId);
        } else {
            displayAlert(loadingElement("Subscribing"));
            write?.();
        }
    };

    return (
        <>
            <h3 className={styles.headerText}>Subscribe</h3>
            <form onSubmit={handleSubmit}>
                <label className={styles.descriptionText} htmlFor="address">Address</label>
                <input id="address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Address" onChange={(e) => setSubscribeAddress(e.target.value)} />
                <button className={isLoading ? styles.loading : ""} disabled={isButtonDisabled()} type="submit">{getButtonText()}</button>
                {isPrepareError && validAddress && !isNetworkError && <span className={styles.descriptionText}>Transaction will fail{prepareErrorMessage}</span>}
            </form>
        </>
    );
};

import styles from  "../styles/Home.module.css";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractABI, contractAddress, targetNetwork } from "../config/config";
import { formatErrorMessage } from "../utils/FormatErrorMessage";

type FunctionProps = {
    isConnected: boolean;
};

export default function SubscribeForm({ isConnected } : FunctionProps) {
    const [subscribeAddress, setSubscribeAddress] = useState<any>(undefined);
    const [prepareErrorMessage, setPrepareErrorMessage ] = useState("");
    const validAddress = undefined !== subscribeAddress && subscribeAddress.length === 42;

    const { config, isError: isPrepareError, isLoading } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: "subscribe",
        chainId: targetNetwork.chainId,
        args: [subscribeAddress],
        enabled: validAddress,
        onSuccess(data) {
            console.log("SUBSCRIBE OP SUCCESS: ", data);
            // displayAlert(transactionSuccessElement("Transaction succeeded", "blockExplorerUrl"))
        },
        onError(err: any) {
            setPrepareErrorMessage(formatErrorMessage(err));
            //displayAlert(transactionFailedElement(`Transaction failed ${err.cause !== undefined ? `- ${err.message}` : ""}`));
        }
    });

    const { write } = useContractWrite(config);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        write?.();
    };

    return (
        <>
            <h3>Subscribe</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Address" onChange={(e) => setSubscribeAddress(e.target.value)} />
                <button className={isLoading ? styles.loading : ""} disabled={!write} type="submit">{!isConnected ? "Connect Wallet" : "Subscribe"}</button>
                {isPrepareError && validAddress && <span>Transaction will fail{prepareErrorMessage}</span>}
            </form>
        </>
    ) 
}
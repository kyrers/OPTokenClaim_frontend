import styles from  "../styles/Home.module.css";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractABI, contractAddress, targetNetwork } from "../config/config";
import { formatErrorMessage } from "../utils/FormatErrorMessage";

type FunctionProps = {
    isConnected: boolean;
};

export default function ClaimOPForm({ isConnected } : FunctionProps) {
    const [claimAddress, setClaimAddress] = useState<any>(undefined);
    const [prepareErrorMessage, setPrepareErrorMessage ] = useState("");
    const validAddress = undefined !== claimAddress && claimAddress.length === 42;

    const { config, isError: isPrepareError, isLoading } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractABI,
        functionName: "claimOP",
        chainId: targetNetwork.chainId,
        args: [claimAddress],
        enabled: validAddress,
        onSuccess(data) {
            console.log("CLAIM OP SUCCESS: ", data);
            // displayAlert(transactionSuccessElement("Transaction succeeded", "blockExplorerUrl"))
        },
        onError(err : any) {
            //Needed to access reason, otherwise wagmi only exports full message
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
            <h3>Claim OP</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Address" onChange={(e) => setClaimAddress(e.target.value)} />
                <button className={isLoading ? styles.loading : ""} disabled={!write} type="submit">{!isConnected ? "Connect Wallet" : "Claim OP"}</button>
                {isPrepareError && validAddress && <span>Transaction will fail{prepareErrorMessage}</span>}
            </form>
        </>
    )
}
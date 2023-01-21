import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { claimContractABI, claimContractAddress, targetNetwork, thirtyDays } from "../config/config";
import styles from "../styles/Home.module.css";
import ClaimOPForm from "./ClaimOPForm";
import SubscribeForm from "./SubscribeForm";

type FunctionProps = {
    displayAlert: (element: JSX.Element) => void;
};

type Config = {
    start: number;
    maxEpoch: number;
}

export default function MainPanel({ displayAlert }: FunctionProps) {
    const [config, setConfig] = useState<Config>(); 
    const [currentEpoch, setCurrentEpoch] = useState(0);
    const [nextEpoch, setNextEpoch] = useState("");

    const { refetch: fetchCurrentEpoch } = useContractRead({
        address: claimContractAddress,
        abi: claimContractABI,
        functionName: "currentEpoch",
        enabled: false,
        chainId: targetNetwork.chainId,
        onSuccess(data: any) {
            setCurrentEpoch(data.toNumber());
            fetchConfig();
        }
    });

    const { refetch: fetchConfig } = useContractRead({
        address: claimContractAddress,
        abi: claimContractABI,
        functionName: "config",
        enabled: false,
        chainId: targetNetwork.chainId,
        onSuccess(data: any) {
            const start = data.start.toNumber();
            const maxEpoch = data.maxEpoch.toNumber();
            let nextEpoch = "Subscription period expired";
            if (currentEpoch + 1 <= maxEpoch) {
                //Replace is needed because javascript is insane and toUTCString prints GMT...
                nextEpoch = "Next Epoch: " + new Date((start + thirtyDays * (currentEpoch + 1)) * 1000).toUTCString().replace("GMT", "UTC");
            }

            setConfig({
                start: start,
                maxEpoch: maxEpoch,
            });

            setNextEpoch(nextEpoch);
        }
    });

    useEffect(() => {
        fetchCurrentEpoch();
    }, []);

    return (
        <div className={styles.mainPanel}>
            <div className={styles.mainPanelInfo}>
                <h2 className={styles.headerText}>Current Epoch: {currentEpoch}</h2>
                <h2 className={styles.headerText}>{nextEpoch}</h2>
            </div>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <SubscribeForm currentEpoch={currentEpoch} maxEpoch={config?.maxEpoch ?? 0} displayAlert={displayAlert} />
                </div>

                <div className={styles.card} title="Claim OP">
                    <ClaimOPForm currentEpoch={currentEpoch} displayAlert={displayAlert} />
                </div>
            </div>
        </div>
    );
};

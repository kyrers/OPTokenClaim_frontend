import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Home.module.css"

type FunctionProps = {
    targetNetwork: any;
    isTargetNetwork: boolean;
    connectedWallet: string;
    setShowWalletSelector: Dispatch<SetStateAction<boolean>>;
};

export default function Header({ targetNetwork, connectedWallet, isTargetNetwork, setShowWalletSelector }: FunctionProps) {
    const formatAddress = (address: string) => {
        return address.substring(0, 6) + "..." + address.slice(-4);
    };

    return (
        <header className={styles.description}>
            <h1>EthernautDAO OP Token Claim</h1>
            <div>
                <button onClick={() => setShowWalletSelector(true)}>
                    {
                        connectedWallet !== "" ?
                            <span title={connectedWallet}>{formatAddress(connectedWallet)}</span>
                            :
                            <span>Connect wallet</span>
                    }
                </button>
                {
                    connectedWallet !== "" ?
                        isTargetNetwork ?
                            <span className={styles.centeredText} style={{ color: targetNetwork.color }}>{targetNetwork.name}</span>
                            :
                            <span className={styles.centeredText} style={{ color: "red" }}>Wrong network</span>
                        :
                        <></>
                }
            </div>
        </header>
    );
};

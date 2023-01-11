import styles from "../styles/Home.module.css"
import { MouseEventHandler } from "react";

type FunctionProps = {
    targetNetwork: any;
    connectedWallet: string;
    connect: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ targetNetwork, connectedWallet, connect }: FunctionProps) {
    const formatAddress = (address: string) => {
        return address.substring(0, 6) + "..." + address.slice(-4);
    }

    return (
        <header className={styles.description}>
            <h1>EthernautDAO OP Token Claim</h1>
            <div>
                <button onClick={connect}>
                    {
                        connectedWallet !== "" ?
                            <span title={connectedWallet}>{formatAddress(connectedWallet)}</span>
                            :
                            <span>Connect wallet</span>
                    }
                </button>
                <span className={styles.centeredText} style={{ color: targetNetwork.color }}>{targetNetwork.name}</span>
            </div>
        </header>
    );
}
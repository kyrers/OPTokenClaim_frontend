import styles from "../styles/Home.module.css";
import { Dispatch, SetStateAction } from "react";

type FunctionProps = {
    connectors: any;
    isConnected: boolean;
    onConnect: (connector: any) => void;
    onDisconnect: () => void;
    setShowWalletSelector: Dispatch<SetStateAction<boolean>>;
};

export default function WalletSelector({ connectors, isConnected, onConnect, onDisconnect, setShowWalletSelector }: FunctionProps) {
    if (isConnected) {
        return (
            <div className={styles.walletSelector} onClick={() => setShowWalletSelector(false)}>
                <div >
                    <h1 className={styles.centeredText}>Disconnect Wallet?</h1>
                    <button type="button" key="disconnect_wallet" onClick={() => onDisconnect()}>
                        Disconnect
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.walletSelector} onClick={() => setShowWalletSelector(false)}>
            <div >
                <h1 className={styles.centeredText}>Choose Wallet</h1>
                {
                    connectors.map((connector: any) => {
                        return (
                            <button type="button" key={connector.id} onClick={() => onConnect(connector)}>
                                {connector.name}
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}

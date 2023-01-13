import styles from "../styles/Home.module.css";
import { Dispatch, SetStateAction } from "react";

type FunctionProps = {
    connectors: any;
    onConnect: (connector: any) => void;
    setShowWalletSelector: Dispatch<SetStateAction<boolean>>;
};

export default function WalletSelector({ connectors, onConnect, setShowWalletSelector }: FunctionProps) {
    return (
        <div className={styles.walletSelector} onClick={() => setShowWalletSelector(false)}>
            <div >
                <h1>Choose Wallet</h1>
                {connectors.map((connector: any) => {
                    return (
                        <button type="button" key={connector.id} onClick={() => onConnect(connector)}>
                            {connector.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

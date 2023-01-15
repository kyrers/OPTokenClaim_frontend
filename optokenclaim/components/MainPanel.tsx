import styles from "../styles/Home.module.css";
import ClaimOPForm from "./ClaimOPForm";
import SubscribeForm from "./SubscribeForm";
import ThemeSwitch from "./ThemeSwitch";

type FunctionProps = {
    currentEpoch: number;
    isConnected: boolean;
};

export default function MainPanel({ currentEpoch, isConnected }: FunctionProps) {
    return (
        <div className={styles.mainPanel}>
            <div className={styles.mainPanelInfo}>
                <h2>Current Epoch: {currentEpoch} </h2>
                <ThemeSwitch />
            </div>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <SubscribeForm isConnected={isConnected} />
                </div>

                <div className={styles.card} title="Claim OP">
                    <ClaimOPForm isConnected={isConnected} />
                </div>
            </div>
        </div>
    );
};

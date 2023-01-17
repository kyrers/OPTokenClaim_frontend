import styles from "../styles/Home.module.css";
import ClaimOPForm from "./ClaimOPForm";
import SubscribeForm from "./SubscribeForm";
import ThemeSwitch from "./ThemeSwitch";

type FunctionProps = {
    currentEpoch: number;
    isConnected: boolean;
    displayAlert: (element: JSX.Element) => void;
};

export default function MainPanel({ currentEpoch, isConnected, displayAlert }: FunctionProps) {
    return (
        <div className={styles.mainPanel}>
            <div className={styles.mainPanelInfo}>
                <h2>Current Epoch: {currentEpoch} </h2>
                <ThemeSwitch />
            </div>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <SubscribeForm isConnected={isConnected} displayAlert={displayAlert} />
                </div>

                <div className={styles.card} title="Claim OP">
                    <ClaimOPForm isConnected={isConnected} displayAlert={displayAlert} />
                </div>
            </div>
        </div>
    );
};

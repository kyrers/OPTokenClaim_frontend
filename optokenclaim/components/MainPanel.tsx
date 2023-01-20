import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";
import ClaimOPForm from "./ClaimOPForm";
import SubscribeForm from "./SubscribeForm";

type FunctionProps = {
    currentEpoch: number;
    displayAlert: (element: JSX.Element) => void;
};

export default function MainPanel({ currentEpoch, displayAlert }: FunctionProps) {
    return (
        <div className={styles.mainPanel}>
            <div className={styles.mainPanelInfo}>
                <h2 className={styles.headerText}>Current Epoch: {currentEpoch} </h2>
            </div>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <SubscribeForm currentEpoch={currentEpoch} displayAlert={displayAlert} />
                </div>

                <div className={styles.card} title="Claim OP">
                    <ClaimOPForm currentEpoch={currentEpoch} displayAlert={displayAlert} />
                </div>
            </div>
        </div>
    );
};

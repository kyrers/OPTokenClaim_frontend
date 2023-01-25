import styles from "../styles/Home.module.css"
import { helpText } from "../utils/strings";

export default function HelpText() {
    return (
        <div className={styles.helpText}>
            <h2>How does it work?</h2>
            {helpText}
        </div>
    );
};

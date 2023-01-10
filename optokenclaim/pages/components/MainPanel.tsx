import styles from "../../styles/Home.module.css";
import ThemeSwitch from "./ThemeSwitch";

type FunctionProps = {
    currentEpoch: number;
    disableButtons: boolean;
    subscribe: (address: string) => void;
    claimOP: (address: string) => void;
};

export default function MainPanel({ currentEpoch, disableButtons, subscribe, claimOP }: FunctionProps) {
    const InputCard = ({ title, callback }: any) => {
        const submit = (e: any) => {
            e.preventDefault();
            callback(e.target[0].value);
        }

        return (
            <>
                <h3>{title}</h3>
                <form onSubmit={submit}>
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Address" />
                    <button disabled={disableButtons} type="submit">{disableButtons ? "Connect Wallet" : `${title}`}</button>
                </form>
            </>
        );
    }

    return (
        <div className={styles.mainPanel}>
            <div className={styles.mainPanelInfo}>
                <h2>Current Epoch: {currentEpoch} </h2>
                <ThemeSwitch />
            </div>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <InputCard title="Subscribe" callback={subscribe} />
                </div>

                <div className={styles.card} title="Claim OP">
                    <InputCard title="Claim" callback={claimOP} />
                </div>
            </div>
        </div>
    );
}

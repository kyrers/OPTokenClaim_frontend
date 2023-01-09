import styles from "../../styles/Home.module.css";

type FunctionProps = {
    currentEpoch: number;
    disableButtons: boolean;
    subscribe: (address: string) => void;
};

export default function MainPanel({ currentEpoch, disableButtons, subscribe }: FunctionProps) {
    const SubscribeCard = () => {
        const onSubscribe = async (e: any) => {
            e.preventDefault();
            subscribe(e.target[0].value);
        };

        return (
            <>
                <h3>Subscribe</h3>
                <form onSubmit={onSubscribe}>
                    <label htmlFor="subscribeAddress">Address</label>
                    <input id="subscribe_address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Subscribe Address" />
                    <button disabled={disableButtons} type="submit">{disableButtons ? "Connect Wallet" : "Subscribe"}</button>
                </form>
            </>
        );
    }

    const ClaimCard = () => {
        const onSubscribe = async (e: any) => {
            e.preventDefault();
            console.log("CLAIM ADDRESS: ", e.target[0].value);
            console.log("EPOCH: ", e.target[1].value);
            //await saveFormData({"email": email})
        };

        return (
            <>
                <h3>Claim</h3>
                <form onSubmit={onSubscribe}>
                    <label htmlFor="claimAddress">Address</label>
                    <input id="claim_address" name="address" type="text" minLength={42} maxLength={42} required placeholder="Claim Address" />

                    <label htmlFor="claimAddress">Epoch</label>
                    <input id="claim_epoch" name="epoch" type="number" min={0} max={currentEpoch > 0 ? currentEpoch - 1 : 0} required placeholder="Epoch" />

                    <button disabled={disableButtons} type="submit">{disableButtons ? "Connect Wallet" : "Claim"}</button>
                </form>
            </>
        );
    }

    return (
        <div className={styles.mainPanel}>
            <h2>Current Epoch: {currentEpoch} </h2>

            <div className={styles.grid}>
                <div className={styles.card} title="Subscribe">
                    <SubscribeCard />
                </div>

                <div className={styles.card} title="Claim OP">
                    <ClaimCard />
                </div>
            </div>
        </div>
    );
}

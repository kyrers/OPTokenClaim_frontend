import styles from "../styles/Home.module.css"
import { Dispatch, SetStateAction } from "react";
import { infoText } from "../utils/strings";

type FunctionProps = {
    show: boolean;
    element: JSX.Element;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function AlertScreen({ show, element, setShow }: FunctionProps) {
    return (
        show ?
            <div className={styles.alertScreen}>
                <div className={styles.alertContainer}>
                    {element}
                    <button onClick={() => setShow(false)}>Ok</button>
                </div>
            </div>
            :
            <></>

    );
};

export const infoElement = () => {
    return <div className={styles.alertText}>{infoText}</div>;
}

export const installWalletElement = () => {
    return <div className={styles.alertText}>Please install the selected wallet to continue</div>;
};

export const wrongChainElement = () => {
    return <div className={styles.alertText}>Please switch to the Optimism network</div>;
};

export const loadingElement = (text: string) => {
    return <div className={styles.loading}>{text}</div>;
};

export const transactionSuccessElement = (text: string, blockExplorerUrl: string) => {
    return <div className={styles.alertText}>{text} - <a href={blockExplorerUrl} target="_blank" rel="noopener noreferrer">See on block explorer</a></div>
};

export const transactionFailedElement = (text: string) => {
    return <div className={styles.alertText}>{text}</div>;
};

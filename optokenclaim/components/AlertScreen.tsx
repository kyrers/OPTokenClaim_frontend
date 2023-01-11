import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Home.module.css"

type FunctionProps = {
    show: boolean;
    element: JSX.Element;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function AlertScreen({ show, element, setShow }: FunctionProps) {
    return (
        show ?
            <div className={styles.alert}>
                {element}
                <button onClick={() => setShow(false)}>Ok</button>
            </div >
            :
            <></>
    );
}

export const installWalletElement = () => {
    return <div>Please install metamask to continue</div>;
}

export const loadingElement = (text: string) => {
    return <div className={styles.loading}>{text}</div>;
}

export const transactionSuccessElement = (text: string, blockExplorerUrl: string) => {
    return <div>{text} - <a href={blockExplorerUrl} target="_blank" rel="noopener noreferrer">See on block explorer</a></div>
}

export const transactionFailedElement = (text: string) => {
    return <div>{text}</div>;
}
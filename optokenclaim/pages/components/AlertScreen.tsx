import { Dispatch, SetStateAction } from "react";
import styles from "../../styles/Home.module.css"

type FunctionProps = {
    show: boolean;
    type: string;
    text: string;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function AlertScreen({ show, type, text, setShow }: FunctionProps) {
    return (
        show ?
            <div className={styles.alert}>
                <div className={type === "loading" ? styles.loading : ""}>{text}</div>
                <button onClick={() => setShow(false)}>Ok</button>
            </div >
            :
            <></>
    );
}

import { useEffect, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { targetNetwork } from "../config/config";
import { connect } from "../functions/connect";
import styles from "../styles/Home.module.css"
import Header from "./components/Header";

export default function Home() {
  const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [connectedWallet, setConnectedWallet] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");

  /*------------------------------------------------------------
                               HOOKS
  --------------------------------------------------------------*/
  //Connect user wallet & load contract info
  useEffect(() => {
    const promptConnect = async () => {
      const { signer, signerAddress } = await connect(displayAlert);
      setUserSigner(signer);
      setConnectedWallet(signerAddress);
    }

    promptConnect();
  }, []);

  useEffect(() => {
    //Listen to wallet changes
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    //Listen to network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }, []);
  //-------

  /*------------------------------------------------------------
                                 FUNCTIONS
  --------------------------------------------------------------*/
  const displayAlert = (type: string, title: string, text: string) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertText(text);
    setShowAlert(true);
  }
  //-------


  return (
    <>
      <main className={styles.main}>
        <Header targetNetwork={targetNetwork} connectedWallet={connectedWallet} connect={() => connect(displayAlert)} />
      </main>
    </>
  )
}

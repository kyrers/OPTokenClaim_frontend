import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { targetNetwork } from "../config/config";
import { connect } from "../functions/connect";
import { loadClaimContract, loadCurrentEpoch } from "../functions/contract";
import Header from "./components/Header";
import MainPanel from "./components/MainPanel";
import Footer from "./components/Footer";

export default function Home() {
  const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [connectedWallet, setConnectedWallet] = useState("");
  const [claimContract, setClaimContract] = useState<any>();
  const [currentEpoch, setCurrentEpoch] = useState(0);

  /*------------------------------------------------------------
                               HOOKS
  --------------------------------------------------------------*/
  //Connect user wallet & load contract
  useEffect(() => {
    loadContract();
    promptConnect();
  }, []);

  //Listen to wallet and network changes
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

  //Get current epoch
  useEffect(() => {
    if (undefined !== claimContract) {
      getCurrentEpoch();
    };
  }, [claimContract]);

  //Connect user wallet to contract
  useEffect(() => {
    if (undefined !== claimContract && null !== userSigner) {
      connectUserToContract();
    }
  }, [userSigner])
  //-------

  /*------------------------------------------------------------
                                 FUNCTIONS
  --------------------------------------------------------------*/
  const loadContract = async () => {
    const contract = await loadClaimContract();
    setClaimContract(contract);
  };

  const promptConnect = async () => {
    const { signer, signerAddress } = await connect();
    setUserSigner(signer);
    setConnectedWallet(signerAddress);
  };

  const connectUserToContract = async () => {
    setClaimContract(await claimContract.connect(userSigner));
  }

  const getCurrentEpoch = async () => {
    const epoch = await loadCurrentEpoch(claimContract);
    setCurrentEpoch(epoch);
  }
  //-------

  return (
    <>
      <main className={styles.main}>
        <Header targetNetwork={targetNetwork} connectedWallet={connectedWallet} connect={() => connect()} />
        <MainPanel currentEpoch={currentEpoch} disableButtons={"" === connectedWallet} />
        <Footer />
      </main>
    </>
  )
}

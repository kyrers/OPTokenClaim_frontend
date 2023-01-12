import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { targetNetwork } from "../config/config";
import { connect, getWalletInfo, switchChain } from "../functions/wallet";
import { claimOPTokens, loadClaimContract, loadCurrentEpoch, subscribeAddress } from "../functions/contract";
import Header from "../components/Header";
import MainPanel from "../components/MainPanel";
import Footer from "../components/Footer";
import AlertScreen, { loadingElement, wrongChainElement } from "../components/AlertScreen";

export default function Home() {
  const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [correctChain, setCorrectChain] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [claimContract, setClaimContract] = useState<any>();
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertElement, setAlertElement] = useState<JSX.Element>(<></>);

  /*------------------------------------------------------------
                               HOOKS
  --------------------------------------------------------------*/
  //Connect user wallet & load contract
  useEffect(() => {
    loadContract();
    getUserWalletInfo();
  }, []);

  //Listen to wallet and network changes
  useEffect(() => {
    if (window.ethereum) {
      //Listen to wallet changes
      window.ethereum.on('accountsChanged', (accounts: []) => {
        if (0 === accounts.length) {
          setUserSigner(null);
          setConnectedWallet("");
        } else {
          getUserWalletInfo();
        }
      });

      //Listen to network changes
      window.ethereum.on('chainChanged', () => {
        getUserWalletInfo();
      });
    }
  }, []);

  //Get current epoch
  useEffect(() => {
    if (undefined !== claimContract) {
      getCurrentEpoch();
    };
  }, [claimContract]);

  //Connect user wallet to contract
  useEffect(() => {
    if (undefined !== claimContract && null !== userSigner && correctChain) {
      console.log("Connecting to contract")
      connectUserToContract();
    }
  }, [userSigner]);
  //-------

  /*------------------------------------------------------------
                                 FUNCTIONS
  --------------------------------------------------------------*/
  const loadContract = async () => {
    const contract = await loadClaimContract();
    setClaimContract(contract);
  };

  const promptConnect = async () => {
    await connect(displayAlert);
  };

  const promptChainSwitch = async () => {
    await switchChain(displayAlert);
  };

  const getUserWalletInfo = async () => {
    const { signer, signerAddress, currentChainId } = await getWalletInfo(displayAlert);
    setUserSigner(signer);
    setConnectedWallet(signerAddress);
    setCorrectChain(currentChainId === targetNetwork.chainId);
  };

  const connectUserToContract = async () => {
    setClaimContract(await claimContract.connect(userSigner));
  };

  const getCurrentEpoch = async () => {
    const epoch = await loadCurrentEpoch(claimContract);
    setCurrentEpoch(epoch);
  };

  const handleContractInteraction = async (address: string, callback: Function) => {
    console.log("ADDY: ", address);
    if (!correctChain) {
      await promptChainSwitch().then(async () => {
        if (correctChain) {
          callback(address);
        } else {
          displayAlert(wrongChainElement());
        }
      });
    } else {
      callback(address);
    }
  }

  const subscribe = async (address: string) => {
    displayAlert(loadingElement("Subscribing"));
    await subscribeAddress(claimContract, address, displayAlert);
  };

  const claimOP = async (address: string) => {
    displayAlert(loadingElement("Claiming"));
    await claimOPTokens(claimContract, address, displayAlert);
  };

  const displayAlert = (element: JSX.Element) => {
    setAlertElement(element);
    setShowAlert(true);
  };
  //-------

  return (
    <>
      <main className={styles.main}>
        <Header targetNetwork={targetNetwork} correctChain={correctChain} connectedWallet={connectedWallet} connect={promptConnect} />
        <MainPanel currentEpoch={currentEpoch} disableButtons={"" === connectedWallet} subscribe={(address) => handleContractInteraction(address, subscribe)} claimOP={(address) => handleContractInteraction(address, claimOP)} />
        <AlertScreen show={showAlert} element={alertElement} setShow={setShowAlert} />
        <Footer />
      </main>
    </>
  )
};

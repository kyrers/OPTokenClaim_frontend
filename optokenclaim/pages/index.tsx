import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { targetNetwork } from "../config/config";
import { connect, getWalletInfo, switchChain } from "../functions/wallet";
import { claimOPTokens, loadClaimContract, loadCurrentEpoch, subscribeAddress } from "../functions/contract";
import Header from "../components/Header";
import MainPanel from "../components/MainPanel";
import Footer from "../components/Footer";
import AlertScreen, { loadingElement, wrongChainElement } from "../components/AlertScreen";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import WalletSelector from "../components/WalletSelector";

export default function Home() {
  //const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [isTargetNetwork, setIsTargetNetwork] = useState(false);
  //const [connectedWallet, setConnectedWallet] = useState("");
  const [claimContract, setClaimContract] = useState<any>();
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertElement, setAlertElement] = useState<JSX.Element>(<></>);
  const [showWalletSelector, setShowWalletSelector] = useState(false);

  const { address, connector: activeConnector, status, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector, data } = useConnect({
    onSuccess(data) {
      setIsTargetNetwork(data.chain.id === targetNetwork.chainId);
    },
    onSettled(data) {
      console.log("ON SETTLED", data);
    }
  });
  const { disconnect } = useDisconnect();

  /*------------------------------------------------------------
                               HOOKS
  --------------------------------------------------------------*/
  useEffect(() => {
    console.log(activeConnector);
    console.log(status);
    console.log(isConnected);

    console.log(error);
    console.log(isLoading);
    console.log(pendingConnector);
    console.log(data);
  }, [activeConnector]);
  //Connect user wallet & load contract
  // useEffect(() => {
  //   loadContract();
  //   getUserWalletInfo();
  // }, []);

  // //Listen to wallet and network changes
  // useEffect(() => {
  //   if (window.ethereum) {
  //     //Listen to wallet changes
  //     window.ethereum.on('accountsChanged', (accounts: []) => {
  //       if (0 === accounts.length) {
  //         /*setUserSigner(null);
  //         setConnectedWallet("");*/
  //         setUser({ signer: null, address: "", isTargetNetwork: false });

  //       } else {
  //         getUserWalletInfo();
  //       }
  //     });

  //     //Listen to network changes
  //     window.ethereum.on('chainChanged', () => {
  //       console.log("3. CHAIN CHANGED EVENT")
  //       getUserWalletInfo();
  //     });
  //   }
  // }, []);

  // //Get current epoch
  // useEffect(() => {
  //   if (undefined !== claimContract) {
  //     getCurrentEpoch();
  //   }
  // }, [claimContract]);

  // //Connect user wallet to contract
  // useEffect(() => {
  //   //if (undefined !== claimContract && null !== userSigner && isTargetNetwork) {
  //   if (undefined !== claimContract && null !== user.signer && user.isTargetNetwork) {
  //     connectUserToContract();
  //   }
  // }, [user]);
  //-------

  // /*------------------------------------------------------------
  //                                FUNCTIONS
  // --------------------------------------------------------------*/
  const loadContract = async () => {
    const contract = await loadClaimContract();
    setClaimContract(contract);
  };

  const handleConnect = async (connector: any) => {
    connect({ connector });
  };

  const handleDisconnect = async () => {
    disconnect();
  }

  const promptChainSwitch = async () => {
    console.log("2. PROMPTING CHAIN SWITCH")
    await switchChain(displayAlert);
  };

  const getUserWalletInfo = async () => {
    console.log("4. GETTING NEW USER WALLET INFO")
    const { signer, signerAddress, currentChainId } = await getWalletInfo(displayAlert);
    /*setUserSigner(signer);
    setConnectedWallet(signerAddress);
    setIsTargetNetwork(currentChainId === targetNetwork.chainId);*/
    //setUser({ signer: signer, address: signerAddress, isTargetNetwork: currentChainId === targetNetwork.chainId });
  };

  const connectUserToContract = async () => {
    console.log("5. CONNECTING TO CONTRACT")
    //setClaimContract(await claimContract.connect(userSigner));
    //setClaimContract(await claimContract.connect(user.signer));
  };

  const getCurrentEpoch = async () => {
    const epoch = await loadCurrentEpoch(claimContract);
    setCurrentEpoch(epoch);
  };

  const handleContractInteraction = async (address: string, callback: Function) => {
    /* if (!user.isTargetNetwork) {
       console.log("1. ISTARGETNETWORK IS FALSE")
       await promptChainSwitch().then(async () => {
         console.log("6. IS NOW THE CORRECT CHAIN? ", user.isTargetNetwork);
         if (isTargetNetwork) {
           await callback(address);
         } else {
           displayAlert(wrongChainElement());
         }
       });
     } else {
       await callback(address);
     }*/
  }

  const subscribe = async (address: string) => {
    /*displayAlert(loadingElement("Subscribing"));
    await subscribeAddress(claimContract, address, displayAlert);*/
  };

  const claimOP = async (address: string) => {
    /* displayAlert(loadingElement("Claiming"));
     await claimOPTokens(claimContract, address, displayAlert);*/
  };

  const displayAlert = (element: JSX.Element) => {
    setAlertElement(element);
    setShowAlert(true);
  };
  //-------

  return (
    <>
      <main className={styles.main}>
        {showWalletSelector ? <WalletSelector connectors={connectors} isConnected={isConnected} onConnect={handleConnect} onDisconnect={handleDisconnect} setShowWalletSelector={setShowWalletSelector} /> : null}
        <Header targetNetwork={targetNetwork} isTargetNetwork={isTargetNetwork} connectedWallet={address ?? ""} setShowWalletSelector={setShowWalletSelector} />
        <MainPanel currentEpoch={currentEpoch} disableButtons={undefined === address} subscribe={(address) => handleContractInteraction(address, subscribe)} claimOP={(address) => handleContractInteraction(address, claimOP)} />
        <AlertScreen show={showAlert} element={alertElement} setShow={setShowAlert} />
        <Footer />
      </main>
    </>
  )
};

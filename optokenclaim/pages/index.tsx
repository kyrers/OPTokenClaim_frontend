import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
//import { JsonRpcSigner } from "@ethersproject/providers";
import { contractABI, contractAddress, targetNetwork } from "../config/config";
//import { connect, getWalletInfo, switchChain } from "../functions/wallet";
//import { claimOPTokens, loadClaimContract, loadCurrentEpoch, subscribeAddress } from "../functions/contract";
import Header from "../components/Header";
import MainPanel from "../components/MainPanel";
import Footer from "../components/Footer";
import AlertScreen, { loadingElement, wrongChainElement } from "../components/AlertScreen";
import { useAccount, useConnect, useContractRead, useContractWrite, useDisconnect, useNetwork, usePrepareContractWrite } from "wagmi";
import WalletSelector from "../components/WalletSelector";

export default function Home() {
  //const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [isTargetNetwork, setIsTargetNetwork] = useState(false);
  //const [connectedWallet, setConnectedWallet] = useState("");
  //const [claimContract, setClaimContract] = useState<any>();
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertElement, setAlertElement] = useState<JSX.Element>(<></>);
  const [showWalletSelector, setShowWalletSelector] = useState(false);

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { refetch } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "currentEpoch",
    enabled: false,
    chainId: targetNetwork.chainId,
    onSuccess(data: any) {
      setCurrentEpoch(data.toNumber());
    }
  });

  /*------------------------------------------------------------
                               HOOKS
  --------------------------------------------------------------*/
  //Handle network changes - See Layout component describing issue with metamask
  useEffect(() => {
    setIsTargetNetwork(chain?.id === targetNetwork.chainId);
  }, [chain]);

  //Get current epoch
  useEffect(() => {
    refetch();
  }, []);

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
    /*const contract = await loadClaimContract();
    setClaimContract(contract);*/
  };

  const handleConnect = async (connector: any) => {
    await connectAsync({ connector });
  };

  const handleDisconnect = async () => {
    disconnect();
  }

  const promptChainSwitch = async () => {
    // await switchChain(displayAlert);
  };

  const getUserWalletInfo = async () => {
    // const { signer, signerAddress, currentChainId } = await getWalletInfo(displayAlert);
    /*setUserSigner(signer);
    setConnectedWallet(signerAddress);
    setIsTargetNetwork(currentChainId === targetNetwork.chainId);*/
    //setUser({ signer: signer, address: signerAddress, isTargetNetwork: currentChainId === targetNetwork.chainId });
  };

  const connectUserToContract = async () => {
    //setClaimContract(await claimContract.connect(userSigner));
    //setClaimContract(await claimContract.connect(user.signer));
  };

  const handleContractInteraction = async (address: string, callback: Function) => {
    /* if (!user.isTargetNetwork) {
       await promptChainSwitch().then(async () => {
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
    displayAlert(loadingElement("Claiming"));
    /*await claimOPTokens(claimContract, address, displayAlert);*/
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
        <MainPanel currentEpoch={currentEpoch} isConnected={isConnected}  />
        <AlertScreen show={showAlert} element={alertElement} setShow={setShowAlert} />
        <Footer />
      </main>
    </>
  )
};

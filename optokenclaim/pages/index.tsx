import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { contractABI, contractAddress, targetNetwork } from "../config/config";
import Header from "../components/Header";
import MainPanel from "../components/MainPanel";
import Footer from "../components/Footer";
import AlertScreen, { installWalletElement } from "../components/AlertScreen";
import { useAccount, useConnect, useContractRead, useDisconnect, useNetwork } from "wagmi";
import WalletSelector from "../components/WalletSelector";

export default function Home() {
  const [isTargetNetwork, setIsTargetNetwork] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertElement, setAlertElement] = useState<JSX.Element>(<></>);
  const [showWalletSelector, setShowWalletSelector] = useState(false);

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect({
    onError(error) {
      if(error.name === "ConnectorNotFoundError") {
        displayAlert(installWalletElement());
      }
    }
  });
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

  //Handle network changes - See Layout component describing issue with metamask
  useEffect(() => {
    setIsTargetNetwork(chain?.id === targetNetwork.chainId);
  }, [chain]);

  //Get current epoch
  useEffect(() => {
    refetch();
  }, []);

  const handleConnect = async (connector: any) => {
    await connectAsync({ connector });
  };

  const handleDisconnect = async () => {
    disconnect();
  }

  const displayAlert = (element: JSX.Element) => {
    setAlertElement(element);
    setShowAlert(true);
  };

  return (
    <>
      <main className={styles.main}>
        {showWalletSelector ? <WalletSelector connectors={connectors} isConnected={isConnected} onConnect={handleConnect} onDisconnect={handleDisconnect} setShowWalletSelector={setShowWalletSelector} /> : null}
        <Header targetNetwork={targetNetwork} isTargetNetwork={isTargetNetwork} connectedWallet={address ?? ""} setShowWalletSelector={setShowWalletSelector} />
        <MainPanel currentEpoch={currentEpoch} isConnected={isConnected} displayAlert={displayAlert} />
        <AlertScreen show={showAlert} element={alertElement} setShow={setShowAlert} />
        <Footer />
      </main>
    </>
  )
};

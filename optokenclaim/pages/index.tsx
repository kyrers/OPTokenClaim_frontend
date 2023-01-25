import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { targetNetwork } from "../config/config";
import Header from "../components/Header";
import MainPanel from "../components/MainPanel";
import Footer from "../components/Footer";
import AlertScreen, { installWalletElement } from "../components/AlertScreen";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import WalletSelector from "../components/WalletSelector";

export default function Home() {
  const [isTargetNetwork, setIsTargetNetwork] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertElement, setAlertElement] = useState<JSX.Element>(<></>);
  const [showWalletSelector, setShowWalletSelector] = useState(false);

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect({
    onError(error) {
      if (error.name === "ConnectorNotFoundError") {
        displayAlert(installWalletElement());
      }
    }
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  //Handle network changes - See Layout component describing issue with metamask
  useEffect(() => {
    setIsTargetNetwork(chain?.id === targetNetwork.chainId);
  }, [chain]);

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
        <MainPanel displayAlert={displayAlert} />
        <AlertScreen show={showAlert} element={alertElement} setShow={setShowAlert} />
        <Footer />
      </main>
    </>
  )
};

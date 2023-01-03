import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

type FunctionProps = {
    targetNetwork: any;
    connectedWallet: string;
    connect: MouseEventHandler<HTMLButtonElement>;
};

function Header({ targetNetwork, connectedWallet, connect }: FunctionProps) {
    const formatAddress = (address: string) => {
        return address.substring(0, 6) + "..." + address.slice(-4);
    }

    return (
        <header className="App-header">
            <h1>EthernautDAO OP Token Claim</h1>


            <div className="wallet-panel">
                <Button onClick={connect}>
                    {
                        connectedWallet !== "" ?
                            <span title={connectedWallet}>{formatAddress(connectedWallet)}</span>
                            :
                            <span>Connect wallet</span>
                    }
                </Button>
                <span className="header-target-network" style={{ color: targetNetwork.color }}>{targetNetwork.name}</span>
            </div>
        </header>
    );
}

export default Header;

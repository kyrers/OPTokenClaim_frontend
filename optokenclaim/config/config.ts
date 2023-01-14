export const NETWORKS = {
    localhost: {
        name: "localhost",
        color: "#666666",
        chainId: 1337,
        blockExplorer: "",
        rpcUrl: "http://localhost:8545",
    },
    optimism: {
        name: "Optimism",
        color: "#f01a37",
        chainId: 10,
        rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        blockExplorer: "https://optimistic.etherscan.io"
    }
};

export const targetNetwork = NETWORKS["optimism"];
export const contractAddress: `0x${string}` = "0x9b0365ec449d929f62106368eb3dc58b3d578b0b";
export const contractABI = [
    { "inputs": [{ "internalType": "address", "name": "_EXP", "type": "address" }, { "internalType": "address", "name": "_OP", "type": "address" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, 
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "months", "type": "uint256" }], "name": "ClaimExtended", "type": "event" }, 
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "OPClaimed", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Subscribed", "type": "event" },
    { "inputs": [], "name": "EXP", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "MAX_EXP", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "MAX_REWARD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "OP", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "epochNum", "type": "uint256" }], "name": "calcReward", "outputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "claimOP", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
    { "inputs": [], "name": "config", "outputs": [{ "internalType": "uint128", "name": "start", "type": "uint128" }, { "internalType": "uint128", "name": "maxEpoch", "type": "uint128" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "currentEpoch", "outputs": [{ "internalType": "uint256", "name": "epochNumber", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "epochToSubscribedEXP", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [{ "internalType": "uint256", "name": "months", "type": "uint256" }], "name": "extendClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
    { "inputs": [], "name": "maxEpoch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "subscribe", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "totalEXPAtEpoch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
    { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
];

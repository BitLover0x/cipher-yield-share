import { createPublicClient, createWalletClient, http, getContract, parseEther } from 'viem';
import { sepolia } from 'viem/chains';

// Contract ABI - FHE-encrypted yield sharing contract
export const contractABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_assetName", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_principalAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "_yieldRate", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"}
    ],
    "name": "createYieldPosition",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "uint256", "name": "shareAmount", "type": "uint256"}
    ],
    "name": "createYieldShare",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "uint256", "name": "totalDistributed", "type": "uint256"},
      {"internalType": "string", "name": "distributionHash", "type": "string"}
    ],
    "name": "distributeYield",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "positionId", "type": "uint256"}],
    "name": "getPositionInfo",
    "outputs": [
      {"internalType": "string", "name": "assetName", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "principalAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "yieldRate", "type": "uint8"},
      {"internalType": "uint8", "name": "currentYield", "type": "uint8"},
      {"internalType": "uint8", "name": "totalYield", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "shareId", "type": "uint256"}],
    "name": "getShareInfo",
    "outputs": [
      {"internalType": "uint8", "name": "shareAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "sharePercentage", "type": "uint8"},
      {"internalType": "address", "name": "shareholder", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "positionId", "type": "uint256"}],
    "name": "withdrawYield",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "positionId", "type": "uint256"}, {"internalType": "bool", "name": "isVerified", "type": "bool"}],
    "name": "verifyPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address - This would be set after deployment
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// Create public client for reading from contract
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990'),
});

// Create wallet client for writing to contract
export const createWalletClientWithAccount = (account: any) => {
  return createWalletClient({
    account,
    chain: sepolia,
    transport: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990'),
  });
};

// Contract instance
export const getContractInstance = (walletClient?: any) => {
  return getContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    client: walletClient || publicClient,
  });
};

// Contract interaction functions - NO DIRECT TRANSFERS
export const contractFunctions = {
  // Create a new yield position (encrypted)
  async createYieldPosition(
    walletClient: any,
    assetName: string,
    description: string,
    principalAmount: string,
    yieldRate: string,
    duration: number
  ) {
    const contract = getContractInstance(walletClient);
    return await contract.write.createYieldPosition([
      assetName,
      description,
      parseEther(principalAmount),
      parseEther(yieldRate),
      BigInt(duration)
    ]);
  },

  // Create yield share (encrypted)
  async createYieldShare(
    walletClient: any,
    positionId: number,
    shareAmount: string
  ) {
    const contract = getContractInstance(walletClient);
    return await contract.write.createYieldShare([
      BigInt(positionId),
      parseEther(shareAmount)
    ]);
  },

  // Distribute yield (encrypted)
  async distributeYield(
    walletClient: any,
    positionId: number,
    totalDistributed: string,
    distributionHash: string
  ) {
    const contract = getContractInstance(walletClient);
    return await contract.write.distributeYield([
      BigInt(positionId),
      parseEther(totalDistributed),
      distributionHash
    ]);
  },

  // Withdraw yield (contract-managed)
  async withdrawYield(walletClient: any, positionId: number) {
    const contract = getContractInstance(walletClient);
    return await contract.write.withdrawYield([BigInt(positionId)]);
  },

  // Verify position
  async verifyPosition(
    walletClient: any,
    positionId: number,
    isVerified: boolean
  ) {
    const contract = getContractInstance(walletClient);
    return await contract.write.verifyPosition([
      BigInt(positionId),
      isVerified
    ]);
  },

  // Read functions
  async getPositionInfo(positionId: number) {
    const contract = getContractInstance();
    return await contract.read.getPositionInfo([BigInt(positionId)]);
  },

  async getShareInfo(shareId: number) {
    const contract = getContractInstance();
    return await contract.read.getShareInfo([BigInt(shareId)]);
  }
};

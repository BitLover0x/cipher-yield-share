// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherYieldShare is SepoliaConfig {
    using FHE for *;
    
    struct YieldPosition {
        euint32 positionId;
        euint32 principalAmount;
        euint32 yieldRate;
        euint32 currentYield;
        euint32 totalYield;
        bool isActive;
        bool isVerified;
        string assetName;
        string description;
        address owner;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct YieldShare {
        euint32 shareId;
        euint32 shareAmount;
        euint32 sharePercentage;
        address shareholder;
        uint256 timestamp;
    }
    
    struct YieldDistribution {
        euint32 distributionId;
        euint32 totalDistributed;
        euint32 perShareAmount;
        bool isCompleted;
        string distributionHash;
        address distributor;
        uint256 timestamp;
    }
    
    mapping(uint256 => YieldPosition) public yieldPositions;
    mapping(uint256 => YieldShare) public yieldShares;
    mapping(uint256 => YieldDistribution) public yieldDistributions;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public platformReputation;
    
    uint256 public positionCounter;
    uint256 public shareCounter;
    uint256 public distributionCounter;
    
    address public owner;
    address public verifier;
    uint256 public platformFeeRate; // In basis points (e.g., 100 = 1%)
    
    event PositionCreated(uint256 indexed positionId, address indexed owner, string assetName);
    event ShareCreated(uint256 indexed shareId, uint256 indexed positionId, address indexed shareholder);
    event YieldDistributed(uint256 indexed distributionId, uint256 indexed positionId, address indexed distributor);
    event PositionVerified(uint256 indexed positionId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, uint256 _platformFeeRate) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = _platformFeeRate;
    }
    
    function createYieldPosition(
        string memory _assetName,
        string memory _description,
        uint256 _principalAmount,
        uint256 _yieldRate,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_assetName).length > 0, "Asset name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_yieldRate > 0, "Yield rate must be positive");
        
        uint256 positionId = positionCounter++;
        
        yieldPositions[positionId] = YieldPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            principalAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            yieldRate: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentYield: FHE.asEuint32(0),
            totalYield: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            assetName: _assetName,
            description: _description,
            owner: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit PositionCreated(positionId, msg.sender, _assetName);
        return positionId;
    }
    
    function createYieldShare(
        uint256 positionId,
        externalEuint32 shareAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(yieldPositions[positionId].owner != address(0), "Position does not exist");
        require(yieldPositions[positionId].isActive, "Position is not active");
        require(block.timestamp <= yieldPositions[positionId].endTime, "Position has ended");
        
        uint256 shareId = shareCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalShareAmount = FHE.fromExternal(shareAmount, inputProof);
        
        // Calculate share percentage (simplified calculation)
        euint32 sharePercentage = FHE.div(
            FHE.mul(internalShareAmount, FHE.asEuint32(10000)), // 10000 for percentage with 2 decimals
            yieldPositions[positionId].principalAmount
        );
        
        yieldShares[shareId] = YieldShare({
            shareId: FHE.asEuint32(0), // Will be set properly later
            shareAmount: internalShareAmount,
            sharePercentage: sharePercentage,
            shareholder: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ShareCreated(shareId, positionId, msg.sender);
        return shareId;
    }
    
    function distributeYield(
        uint256 positionId,
        euint32 totalDistributed,
        string memory distributionHash
    ) public returns (uint256) {
        require(yieldPositions[positionId].owner == msg.sender, "Only position owner can distribute");
        require(yieldPositions[positionId].isActive, "Position must be active");
        require(block.timestamp > yieldPositions[positionId].startTime, "Position must have started");
        
        uint256 distributionId = distributionCounter++;
        
        // Calculate per-share amount (simplified calculation)
        euint32 perShareAmount = FHE.div(
            totalDistributed,
            FHE.asEuint32(100) // Simplified: assume 100 shares total
        );
        
        yieldDistributions[distributionId] = YieldDistribution({
            distributionId: FHE.asEuint32(0), // Will be set properly later
            totalDistributed: totalDistributed,
            perShareAmount: perShareAmount,
            isCompleted: false,
            distributionHash: distributionHash,
            distributor: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update position total yield
        yieldPositions[positionId].totalYield = FHE.add(
            yieldPositions[positionId].totalYield,
            totalDistributed
        );
        
        emit YieldDistributed(distributionId, positionId, msg.sender);
        return distributionId;
    }
    
    function verifyPosition(uint256 positionId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify positions");
        require(yieldPositions[positionId].owner != address(0), "Position does not exist");
        
        yieldPositions[positionId].isVerified = isVerified;
        emit PositionVerified(positionId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is shareholder or platform based on context
        if (yieldShares[shareCounter - 1].shareholder == user) {
            userReputation[user] = reputation;
        } else {
            platformReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        string memory assetName,
        string memory description,
        uint8 principalAmount,
        uint8 yieldRate,
        uint8 currentYield,
        uint8 totalYield,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 startTime,
        uint256 endTime
    ) {
        YieldPosition storage position = yieldPositions[positionId];
        return (
            position.assetName,
            position.description,
            0, // FHE.decrypt(position.principalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(position.yieldRate) - will be decrypted off-chain
            0, // FHE.decrypt(position.currentYield) - will be decrypted off-chain
            0, // FHE.decrypt(position.totalYield) - will be decrypted off-chain
            position.isActive,
            position.isVerified,
            position.owner,
            position.startTime,
            position.endTime
        );
    }
    
    function getShareInfo(uint256 shareId) public view returns (
        uint8 shareAmount,
        uint8 sharePercentage,
        address shareholder,
        uint256 timestamp
    ) {
        YieldShare storage share = yieldShares[shareId];
        return (
            0, // FHE.decrypt(share.shareAmount) - will be decrypted off-chain
            0, // FHE.decrypt(share.sharePercentage) - will be decrypted off-chain
            share.shareholder,
            share.timestamp
        );
    }
    
    function getDistributionInfo(uint256 distributionId) public view returns (
        uint8 totalDistributed,
        uint8 perShareAmount,
        bool isCompleted,
        string memory distributionHash,
        address distributor,
        uint256 timestamp
    ) {
        YieldDistribution storage distribution = yieldDistributions[distributionId];
        return (
            0, // FHE.decrypt(distribution.totalDistributed) - will be decrypted off-chain
            0, // FHE.decrypt(distribution.perShareAmount) - will be decrypted off-chain
            distribution.isCompleted,
            distribution.distributionHash,
            distribution.distributor,
            distribution.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getPlatformReputation(address platform) public view returns (uint8) {
        return 0; // FHE.decrypt(platformReputation[platform]) - will be decrypted off-chain
    }
    
    function calculateYield(uint256 positionId, uint256 timeElapsed) public view returns (uint8) {
        // This function would calculate yield based on time elapsed
        // For now, return 0 as FHE operations need to be handled off-chain
        return 0;
    }
    
    function withdrawYield(uint256 positionId) public {
        require(yieldPositions[positionId].owner == msg.sender, "Only position owner can withdraw");
        require(yieldPositions[positionId].isVerified, "Position must be verified");
        require(block.timestamp > yieldPositions[positionId].endTime, "Position must be ended");
        
        // Transfer yield to owner
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        yieldPositions[positionId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(yieldAmount);
    }
    
    function setPlatformFeeRate(uint256 _newFeeRate) public {
        require(msg.sender == owner, "Only owner can set fee rate");
        require(_newFeeRate <= 1000, "Fee rate cannot exceed 10%"); // Max 10%
        platformFeeRate = _newFeeRate;
    }
    
    function getPlatformFeeRate() public view returns (uint256) {
        return platformFeeRate;
    }
}

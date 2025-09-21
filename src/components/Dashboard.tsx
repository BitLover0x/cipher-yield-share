import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Eye, EyeOff, Lock, TrendingUp, Coins, Shield, PieChart, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { contractFunctions } from '@/lib/contract';
import EncryptedChart from "@/components/EncryptedChart";
import rwaLogo from "@/assets/rwa-logo.png";

interface AssetData {
  id: string;
  name: string;
  yield: number;
  encrypted: boolean;
  value: number;
  nextPayout: string;
}

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const assets: AssetData[] = [
    { id: "1", name: "Real Estate Portfolio #1", yield: 8.5, encrypted: true, value: 125000, nextPayout: "2024-01-15" },
    { id: "2", name: "Infrastructure Bonds", yield: 6.2, encrypted: true, value: 75000, nextPayout: "2024-01-20" },
    { id: "3", name: "Commodity Assets", yield: 12.3, encrypted: true, value: 200000, nextPayout: "2024-01-10" },
  ];

  const totalYield = assets.reduce((sum, asset) => sum + (asset.value * asset.yield / 100), 0);

  // Contract interaction functions
  const handleCreatePosition = async () => {
    if (!walletClient || !isConnected) return;
    
    setIsLoading(true);
    try {
      await contractFunctions.createYieldPosition(
        walletClient,
        "Real Estate Portfolio",
        "High-yield real estate investment",
        "100000", // 100k principal
        "8.5", // 8.5% yield rate
        365 * 24 * 60 * 60 // 1 year duration
      );
      console.log("Position created successfully");
    } catch (error) {
      console.error("Error creating position:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateShare = async (positionId: number) => {
    if (!walletClient || !isConnected) return;
    
    setIsLoading(true);
    try {
      await contractFunctions.createYieldShare(
        walletClient,
        positionId,
        "10000" // 10k share amount
      );
      console.log("Share created successfully");
    } catch (error) {
      console.error("Error creating share:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistributeYield = async (positionId: number) => {
    if (!walletClient || !isConnected) return;
    
    setIsLoading(true);
    try {
      await contractFunctions.distributeYield(
        walletClient,
        positionId,
        "5000", // 5k distribution
        "0x" + Math.random().toString(16).substr(2, 64) // Random hash
      );
      console.log("Yield distributed successfully");
    } catch (error) {
      console.error("Error distributing yield:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-encryption flex items-center justify-center">
            <PieChart className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-profit bg-clip-text text-transparent">
              Confidential Yield from Real Assets
            </h1>
            <p className="text-muted-foreground font-mono">Private revenue sharing • Encrypted until payout</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant={showEncrypted ? "encryption" : "ghost"}
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="font-mono"
          >
            {showEncrypted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showEncrypted ? "Hide Encrypted" : "Show Encrypted"}
          </Button>
          
          {isConnected && (
            <Button
              onClick={handleCreatePosition}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Position
            </Button>
          )}
          
          <ConnectButton />
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Yield Card */}
        <Card className="glass-card p-6 border-card-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Total Annual Yield</h3>
            <TrendingUp className="w-5 h-5 text-profit" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-mono font-bold text-profit animate-pulse-profit">
              ${totalYield.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              From {assets.length} tokenized assets
            </div>
          </div>
        </Card>

        {/* Portfolio Value */}
        <Card className="glass-card p-6 border-card-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Portfolio Value</h3>
            <Shield className="w-5 h-5 text-tech" />
          </div>
          <div className="space-y-2">
            {showEncrypted ? (
              <div className="text-3xl font-mono font-bold text-foreground">
                ${assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
            ) : (
              <div className="text-3xl font-mono font-bold encrypted-text">
                ████████
              </div>
            )}
            <div className="text-sm text-muted-foreground font-mono">
              Encrypted until payout
            </div>
          </div>
        </Card>

        {/* Next Payout */}
        <Card className="glass-card p-6 border-card-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Next Payout</h3>
            <Coins className="w-5 h-5 text-gold" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-mono font-bold text-gold">
              Jan 10
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              Estimated: $8,200
            </div>
          </div>
        </Card>

        {/* Live Chart */}
        <Card className="glass-card p-6 border-card-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">Performance</h3>
            <PieChart className="w-5 h-5 text-encryption" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-mono font-bold text-encryption">
              +24.3%
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              Encrypted growth rate
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EncryptedChart />
        
        <Card className="glass-card p-6 border-card-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-semibold text-foreground">Asset Allocation</h3>
            <Badge variant="secondary" className="font-mono text-xs">Private</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-foreground">Real Estate</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-gradient-profit"></div>
                </div>
                <span className="text-sm font-mono text-muted-foreground">60%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-foreground">Infrastructure</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-tech"></div>
                </div>
                <span className="text-sm font-mono text-muted-foreground">30%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-foreground">Commodities</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/10 h-full bg-gradient-encryption"></div>
                </div>
                <span className="text-sm font-mono text-muted-foreground">10%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Asset List */}
      <Card className="glass-card border-card-border">
        <div className="p-6 border-b border-card-border">
          <h2 className="text-xl font-display font-semibold text-foreground">Tokenized Assets</h2>
          <p className="text-muted-foreground font-mono text-sm">Revenue data encrypted until distribution</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 rounded-lg glass-card border border-card-border hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-tech flex items-center justify-center">
                    <Lock className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{asset.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {asset.yield}% APY
                      </Badge>
                      {asset.encrypted && (
                        <Badge variant="secondary" className="font-mono text-xs bg-encryption/20 text-encryption">
                          Encrypted
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  {showEncrypted ? (
                    <div className="text-lg font-mono font-semibold text-foreground">
                      ${asset.value.toLocaleString()}
                    </div>
                  ) : (
                    <div className="text-lg font-mono font-semibold encrypted-text">
                      ████████
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground font-mono">
                    Next: {asset.nextPayout}
                  </div>
                  
                  {isConnected && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleCreateShare(parseInt(asset.id))}
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDistributeYield(parseInt(asset.id))}
                        disabled={isLoading}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Coins className="w-3 h-3 mr-1" />
                        Distribute
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
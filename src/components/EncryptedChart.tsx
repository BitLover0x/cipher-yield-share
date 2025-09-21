import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, TrendingUp } from "lucide-react";
import { useState } from "react";

interface ChartData {
  month: string;
  revenue: number;
  encrypted: boolean;
}

const EncryptedChart = () => {
  const [showData, setShowData] = useState(false);
  
  const chartData: ChartData[] = [
    { month: "Oct", revenue: 12500, encrypted: true },
    { month: "Nov", revenue: 15200, encrypted: true },
    { month: "Dec", revenue: 18750, encrypted: true },
    { month: "Jan", revenue: 22100, encrypted: false }, // Next payout
  ];

  return (
    <Card className="glass-card p-6 border-card-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">Revenue Chart</h3>
          <p className="text-sm text-muted-foreground font-mono">Encrypted until distribution</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="font-mono text-xs bg-encryption/20 text-encryption">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
          <button
            onClick={() => setShowData(!showData)}
            className="p-2 rounded-lg hover:bg-card/50 transition-colors"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={data.month} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 text-center">
                <span className="text-sm font-mono text-muted-foreground">{data.month}</span>
              </div>
              <div className="flex-1">
                <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                  {data.encrypted && !showData ? (
                    <div className="h-full bg-gradient-encryption opacity-50 encrypted-text relative">
                      <div className="absolute inset-0 bg-encryption/20 animate-encrypt-sweep"></div>
                    </div>
                  ) : (
                    <div 
                      className={`h-full transition-all duration-500 ${
                        index === chartData.length - 1 
                          ? 'bg-gradient-profit animate-pulse-profit' 
                          : 'bg-gradient-tech'
                      }`}
                      style={{ width: `${(data.revenue / 25000) * 100}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-24 text-right">
              {data.encrypted && !showData ? (
                <div className="text-sm font-mono encrypted-text">████</div>
              ) : (
                <div className="text-sm font-mono text-foreground">
                  ${data.revenue.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-profit" />
            <span className="text-sm font-mono text-muted-foreground">Next payout visible</span>
          </div>
          <div className="text-sm font-mono text-profit">
            +24.3% growth
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EncryptedChart;
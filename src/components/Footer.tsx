import { Coins } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-card-border bg-gradient-glass">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Coins className="w-8 h-8 text-gold coin-stack" />
                <Coins className="w-8 h-8 text-profit absolute top-0 left-2 coin-stack" style={{ animationDelay: '0.5s' }} />
                <Coins className="w-8 h-8 text-tech absolute top-0 left-4 coin-stack" style={{ animationDelay: '1s' }} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Private Revenue Splits</h3>
                <p className="text-sm text-muted-foreground font-mono">Stacks split privately at payout</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 text-sm font-mono">
            <div className="text-center">
              <div className="text-profit font-semibold">256-bit</div>
              <div className="text-muted-foreground">Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-tech font-semibold">Zero-Knowledge</div>
              <div className="text-muted-foreground">Proofs</div>
            </div>
            <div className="text-center">
              <div className="text-encryption font-semibold">Private</div>
              <div className="text-muted-foreground">By Design</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-card-border/50 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            © 2024 Confidential RWA Revenue Sharing. All revenue data encrypted until distribution.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
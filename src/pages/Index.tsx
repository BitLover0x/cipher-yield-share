import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-end p-4">
        <ConnectButton />
      </div>
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Index;

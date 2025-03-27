
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, ShieldCheck } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
  isLoading: boolean;
}

export const WalletConnect = ({ onConnect, isLoading }: WalletConnectProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Your Wallet
          </CardTitle>
          <CardDescription>
            Link your payment wallet to track and manage project transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Why connect your wallet?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                <span>View all transaction history in one place</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                <span>Track payments across all your projects</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                <span>Monitor pending and completed transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                <span>Secure, read-only access to your payment data</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onConnect} disabled={isLoading} className="w-full">
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="col-span-1 bg-primary/5">
        <CardHeader>
          <CardTitle>BudgetMaster Wallet</CardTitle>
          <CardDescription>
            The smart way to manage project finances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Features</h3>
            <ul className="space-y-1 text-sm">
              <li>• Real-time transaction monitoring</li>
              <li>• Project-specific payment tracking</li>
              <li>• Budget comparison with actual spend</li>
              <li>• Payment verification and history</li>
              <li>• Export transaction reports</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Security</h3>
            <p className="text-sm">
              Your financial data is securely encrypted and never stored on our servers.
              We use industry-standard security protocols to ensure your information remains private.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/projects" className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-center gap-1">
              Explore Projects <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

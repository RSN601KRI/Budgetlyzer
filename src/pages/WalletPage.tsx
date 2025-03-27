
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, CreditCard, DollarSign, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/layout/Dashboard';
import { toast } from 'sonner';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { TransactionItem } from '@/components/wallet/TransactionItem';

// Mock transactions data
const mockTransactions = [
  {
    id: 't1',
    description: 'Payment for Hotel Renovation',
    amount: 12500,
    date: '2023-07-15',
    status: 'completed',
    projectId: '1',
    category: 'Contract Payment'
  },
  {
    id: 't2',
    description: 'Material Purchase - Office Complex',
    amount: 8750,
    date: '2023-07-12',
    status: 'completed',
    projectId: '2',
    category: 'Materials'
  },
  {
    id: 't3',
    description: 'Consultant Fee - Residential Tower',
    amount: 15000,
    date: '2023-07-08',
    status: 'pending',
    projectId: '3',
    category: 'Services'
  },
  {
    id: 't4',
    description: 'Permit Application - Shopping Mall',
    amount: 3200,
    date: '2023-07-05',
    status: 'completed',
    projectId: '4',
    category: 'Administrative'
  },
  {
    id: 't5',
    description: 'Design Revisions - Hotel Renovation',
    amount: 5800,
    date: '2023-06-28',
    status: 'completed',
    projectId: '1',
    category: 'Design'
  },
  {
    id: 't6',
    description: 'Site Survey - Residential Tower',
    amount: 4500,
    date: '2023-06-22',
    status: 'completed',
    projectId: '3',
    category: 'Services'
  }
];

const WalletPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const handleConnect = () => {
    setIsLoading(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success('Wallet connected successfully!');
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return transaction.status === 'completed';
    if (activeTab === 'pending') return transaction.status === 'pending';
    return true;
  });
  
  // Calculate wallet balance
  const walletBalance = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((total, transaction) => total + transaction.amount, 0);
  
  // Calculate pending amount
  const pendingAmount = mockTransactions
    .filter(t => t.status === 'pending')
    .reduce((total, transaction) => total + transaction.amount, 0);
  
  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Wallet</h1>
            <p className="text-muted-foreground">
              Connect your payment wallet to track transactions
            </p>
          </div>
          {isConnected ? (
            <Button variant="outline" onClick={handleDisconnect}>
              Disconnect Wallet
            </Button>
          ) : (
            <Button onClick={handleConnect} disabled={isLoading}>
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
        
        {!isConnected ? (
          <WalletConnect onConnect={handleConnect} isLoading={isLoading} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium leading-none text-muted-foreground">
                      Wallet Balance
                    </p>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-semibold">${walletBalance.toLocaleString()}</h3>
                    <p className="text-xs text-green-500">Active</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium leading-none text-muted-foreground">
                      Pending
                    </p>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-semibold">${pendingAmount.toLocaleString()}</h3>
                    <p className="text-xs text-yellow-500">Awaiting</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium leading-none text-muted-foreground">
                      Monthly Activity
                    </p>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-semibold">12</h3>
                    <p className="text-xs text-green-500">Transactions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium leading-none text-muted-foreground">
                      Payment Projects
                    </p>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-semibold">4</h3>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      View and manage all your payment transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredTransactions.map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <TransactionItem transaction={transaction} />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="text-xs text-muted-foreground">
                      Showing {filteredTransactions.length} transactions
                    </div>
                    <Link to="/projects">
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Projects <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Completed Transactions</CardTitle>
                    <CardDescription>
                      View all your completed payment transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredTransactions.map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <TransactionItem transaction={transaction} />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="text-xs text-muted-foreground">
                      Showing {filteredTransactions.length} completed transactions
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Pending Transactions</CardTitle>
                    <CardDescription>
                      View all your pending payment transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredTransactions.map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <TransactionItem transaction={transaction} />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="text-xs text-muted-foreground">
                      Showing {filteredTransactions.length} pending transactions
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </div>
    </Dashboard>
  );
};

export default WalletPage;

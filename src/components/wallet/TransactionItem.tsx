
import React from 'react';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export interface TransactionProps {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  projectId: string;
  category: string;
}

interface TransactionItemProps {
  transaction: TransactionProps;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);
  
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-accent/5 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-full ${
          transaction.status === 'completed' 
            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {transaction.status === 'completed' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
        </div>
        
        <div>
          <div className="font-medium text-sm">{transaction.description}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{transaction.category}</span>
            <span>•</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              transaction.status === 'completed' 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-semibold">{formattedAmount}</div>
          <Link to={`/projects/${transaction.projectId}`} className="text-xs text-primary hover:underline">
            View project
          </Link>
        </div>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

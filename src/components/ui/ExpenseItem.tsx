
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface ExpenseProps {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseItemProps {
  expense: ExpenseProps;
  className?: string;
}

const ExpenseItem = ({ expense, className }: ExpenseItemProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(expense.amount);
  
  const formattedDate = format(new Date(expense.date), 'MMM d, yyyy');
  
  // Get a consistent but random pastel color based on the category string
  const getCategoryColor = (category: string) => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`;
  };
  
  return (
    <div className={cn("p-4 rounded-lg border border-border/50 bg-background flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium"
          style={{ backgroundColor: getCategoryColor(expense.category) }}
        >
          {expense.category.substring(0, 2).toUpperCase()}
        </div>
        
        <div>
          <h4 className="font-medium text-foreground">{expense.description}</h4>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      
      <div className="font-display font-semibold text-foreground">
        {formattedAmount}
      </div>
    </div>
  );
};

export default ExpenseItem;

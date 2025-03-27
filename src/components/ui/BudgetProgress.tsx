
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BudgetProgressProps {
  budget: number;
  spent: number;
  className?: string;
}

const BudgetProgress = ({ budget, spent, className }: BudgetProgressProps) => {
  const percentSpent = (spent / budget) * 100;
  const isOverBudget = spent > budget;
  const remainingBudget = budget - spent;
  const formattedBudget = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget);
  const formattedSpent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent);
  const formattedRemaining = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(remainingBudget));
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Budget</p>
          <p className="text-2xl font-display font-semibold">{formattedBudget}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Spent</p>
          <p className="text-2xl font-display font-semibold">{formattedSpent}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Remaining</p>
          <div className="flex items-center gap-1">
            {isOverBudget ? (
              <>
                <ArrowUp className="h-4 w-4 text-destructive" />
                <p className="text-2xl font-display font-semibold text-destructive">-{formattedRemaining}</p>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-primary" />
                <p className="text-2xl font-display font-semibold text-primary">{formattedRemaining}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span>{percentSpent.toFixed(1)}%</span>
        </div>
        
        <div className="progress-bar h-3">
          <div
            className={cn(
              "progress-value",
              isOverBudget ? "bg-destructive" : "bg-primary"
            )}
            style={{ "--progress-width": `${Math.min(percentSpent, 100)}%` } as React.CSSProperties}
          ></div>
        </div>
        
        {isOverBudget && (
          <p className="text-xs text-destructive font-medium">
            This project is {(percentSpent - 100).toFixed(1)}% over budget
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetProgress;

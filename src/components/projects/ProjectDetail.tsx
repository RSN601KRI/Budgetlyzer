
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BudgetProgress from '@/components/ui/BudgetProgress';
import ExpenseItem, { ExpenseProps } from '@/components/ui/ExpenseItem';
import { PlusCircle, Clock, ArrowLeft, FileCheck, BarChart2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface ProjectDetailProps {
  id: string;
  name: string;
  budget: number;
  spent: number;
  client: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  expenses: ExpenseProps[];
}

interface ProjectDetailComponentProps {
  project: ProjectDetailProps;
  onAddExpense?: () => void;
}

const ProjectDetail = ({ project, onAddExpense }: ProjectDetailComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const daysLeft = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate burn rate (average spend per day)
  const projectStarted = new Date(project.startDate);
  const today = new Date();
  const daysSinceStart = Math.max(1, Math.ceil((today.getTime() - projectStarted.getTime()) / (1000 * 60 * 60 * 24)));
  const burnRate = project.spent / daysSinceStart;
  
  // Estimated completion based on current burn rate
  const remainingBudget = project.budget - project.spent;
  const daysRemaining = remainingBudget > 0 ? Math.ceil(remainingBudget / burnRate) : 0;
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setDate(today.getDate() + daysRemaining);

  // Budget projection
  const budgetProjection = burnRate * daysLeft;
  const isOverBudgetProjected = (project.spent + budgetProjection) > project.budget;
  
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-display font-bold tracking-tight">{project.name}</h2>
          <div className={`px-2 py-1 text-xs rounded-full ${
            project.status === 'active' ? 'bg-primary/10 text-primary' : 
            project.status === 'completed' ? 'bg-green-100 text-green-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </div>
        </div>
        
        <Button onClick={onAddExpense}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Track your project's financial health</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetProgress budget={project.budget} spent={project.spent} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Burn Rate</p>
                    <p className="font-semibold">{formatCurrency(burnRate)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projection</p>
                    <p className="font-semibold">{formatCurrency(project.spent + budgetProjection)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`${isOverBudgetProjected ? 'bg-destructive/10' : 'bg-green-100/50 dark:bg-green-900/20'} border-0`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`${isOverBudgetProjected ? 'bg-destructive/20' : 'bg-green-100 dark:bg-green-900/40'} p-2 rounded-full`}>
                    {isOverBudgetProjected ? (
                      <TrendingUp className="h-5 w-5 text-destructive" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projected Status</p>
                    <p className={`font-semibold ${isOverBudgetProjected ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
                      {isOverBudgetProjected ? 'Over Budget' : 'Under Budget'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Key information about this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Client</p>
              <p className="font-medium">{project.client}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Timeline</p>
              <p className="font-medium">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                {project.status === 'active' ? (
                  <>
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="font-medium">{daysLeft} days remaining</p>
                  </>
                ) : project.status === 'completed' ? (
                  <>
                    <FileCheck className="h-4 w-4 text-green-600" />
                    <p className="font-medium">Completed</p>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <p className="font-medium">Pending</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className={`text-sm ${!isExpanded && project.description.length > 150 ? 'line-clamp-3' : ''}`}>
                {project.description}
              </p>
              {project.description.length > 150 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs p-0 h-auto"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="highest">Highest</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {project.expenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExpenseItem expense={expense} />
            </motion.div>
          ))}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          {project.expenses
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ExpenseItem expense={expense} />
              </motion.div>
            ))}
        </TabsContent>
        
        <TabsContent value="highest" className="space-y-4">
          {project.expenses
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ExpenseItem expense={expense} />
              </motion.div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;

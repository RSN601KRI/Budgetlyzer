
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, DollarSign, Calendar, User, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  totalBudget: number;
  spent: number;
  dueDate: string;
  status: 'in-progress' | 'completed';
  category?: string;
  // Backwards compatibility fields
  name?: string;
  client?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  key?: string;
}

const ProjectCard = ({ 
  id, 
  title, 
  name,
  description, 
  totalBudget,
  budget, 
  spent, 
  dueDate,
  endDate, 
  status, 
  category = "Project" 
}: ProjectCardProps) => {
  // Support for older data format
  const projectTitle = title || name || '';
  const projectBudget = totalBudget || budget || 0;
  const projectDueDate = dueDate || endDate || '';
  
  const percentSpent = (spent / projectBudget) * 100;
  const isOverBudget = spent > projectBudget;
  const remainingBudget = projectBudget - spent;
  const formattedBudget = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(projectBudget);
  const formattedSpent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent);
  const formattedRemaining = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(remainingBudget));
  
  const handleAction = (action: string) => {
    toast.success(`Project ${action}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <Link to={`/projects/${id}`}>
      <Card className="card-hover glass-card overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground inline-block mb-2">
                    {category}
                  </span>
                  <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">{projectTitle}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
                </div>
                <div onClick={stopPropagation}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("marked as favorite")}>
                        Mark as Favorite
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("shared")}>
                        Share Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("archived")}>
                        Archive Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-3 mb-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(projectDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>Client</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{formattedBudget}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-medium">{formattedSpent}</span>
                </div>
                
                <div className="progress-bar">
                  <div
                    className={cn(
                      "progress-value",
                      isOverBudget ? "bg-destructive" : "bg-primary"
                    )}
                    style={{ "--progress-width": `${Math.min(percentSpent, 100)}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "p-4 text-sm font-medium flex items-center justify-between group-hover:bg-opacity-90 transition-colors",
              isOverBudget 
                ? "bg-destructive/10 text-destructive" 
                : "bg-primary/10 text-primary"
            )}>
              <span>Remaining</span>
              <div className="flex items-center gap-1">
                {isOverBudget ? (
                  <>
                    <ArrowUp className="h-3 w-3" />
                    <span>-{formattedRemaining}</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-3 w-3" />
                    <span>{formattedRemaining}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;

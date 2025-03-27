
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Calendar, DollarSign, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import Dashboard from '@/components/layout/Dashboard';
import ProjectCard from '@/components/projects/ProjectCard';

const projects = [
  {
    id: '1',
    title: 'Hotel Renovation',
    description: 'Complete renovation of the Grand Plaza Hotel lobby and reception areas.',
    totalBudget: 120000,
    spent: 146400,
    dueDate: '2023-06-30',
    client: 'Horizon Architecture',
    status: 'in-progress',
    key: '1'
  },
  {
    id: '2',
    title: 'Office Complex Design',
    description: 'Design of a modern office complex with sustainable features and open workspaces.',
    totalBudget: 85000,
    spent: 42500,
    dueDate: '2023-08-15',
    client: 'TechSpace Inc.',
    status: 'in-progress',
    key: '2'
  },
  {
    id: '3',
    title: 'Residential Tower',
    description: 'Design and development of a 15-story residential tower with luxury amenities.',
    totalBudget: 250000,
    spent: 175000,
    dueDate: '2023-12-31',
    client: 'Urban Living',
    status: 'in-progress',
    key: '3'
  },
  {
    id: '4',
    title: 'Shopping Mall Expansion',
    description: 'Expansion of the Westfield Shopping Mall adding 20 new retail spaces.',
    totalBudget: 180000,
    spent: 162000,
    dueDate: '2023-10-30',
    client: 'Retail Ventures',
    status: 'completed',
    key: '4'
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter and sort projects
  const filteredProjects = projects.filter((project) => {
    // Apply search filter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'budget-high':
        return b.totalBudget - a.totalBudget;
      case 'budget-low':
        return a.totalBudget - b.totalBudget;
      case 'deadline':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default: // newest
        return parseInt(b.id) - parseInt(a.id);
    }
  });
  
  return (
    <Dashboard>
      <div className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to BudgetMaster - track your projects and finances
            </p>
          </div>
          <Button>
            Create New Project
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  Total Budget
                </p>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">$635,000</h3>
                <p className="text-xs text-green-500">+4.3%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  Spent
                </p>
                <ArrowUp className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">$525,900</h3>
                <p className="text-xs text-destructive">+12.2%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  Active Projects
                </p>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">4</h3>
                <p className="text-xs text-green-500">+2 this month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  Avg. Completion
                </p>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">68%</h3>
                <p className="text-xs text-muted-foreground">15 days left</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
                  <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  totalBudget={project.totalBudget}
                  spent={project.spent}
                  dueDate={project.dueDate}
                  status={project.status}
                />
              </motion.div>
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No projects found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;

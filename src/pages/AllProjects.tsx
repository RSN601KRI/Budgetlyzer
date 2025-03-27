import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  ListFilter, 
  Search,
  Grid, 
  List,
  SortAsc,
  SortDesc,
  ArrowDownUp,
  Calendar,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Dashboard from '@/components/layout/Dashboard';
import ProjectCard from '@/components/projects/ProjectCard';

const mockProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Redesigning the company website with new branding",
    totalBudget: 12000,
    spent: 5400,
    dueDate: "2023-12-15",
    status: "in-progress",
    category: "marketing"
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Building a new mobile application for customers",
    totalBudget: 45000,
    spent: 15000,
    dueDate: "2024-02-28",
    status: "in-progress",
    category: "development"
  },
  {
    id: "3",
    title: "Annual Conference",
    description: "Planning and budgeting for the annual industry conference",
    totalBudget: 30000,
    spent: 29000,
    dueDate: "2023-10-05",
    status: "completed",
    category: "event"
  },
  {
    id: "4",
    title: "Product Launch Campaign",
    description: "Marketing campaign for new product line",
    totalBudget: 20000,
    spent: 5000,
    dueDate: "2024-01-10",
    status: "in-progress",
    category: "marketing"
  },
  {
    id: "5",
    title: "Office Renovation",
    description: "Renovation of the main office space",
    totalBudget: 50000,
    spent: 52000,
    dueDate: "2023-09-30",
    status: "completed",
    category: "facilities"
  },
  {
    id: "6",
    title: "Sales Training Program",
    description: "Training program for the sales team",
    totalBudget: 15000,
    spent: 7500,
    dueDate: "2024-03-15",
    status: "in-progress",
    category: "hr"
  }
];

const categories = ["marketing", "development", "event", "facilities", "hr"];

const AllProjects = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const handleSort = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    toast.success(`Sorted projects ${sortDirection === "asc" ? "descending" : "ascending"}`);
  };

  const toggleFilter = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredProjects = mockProjects
    .filter(project => 
      (searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeFilters.length === 0 || activeFilters.includes(project.category)) &&
      (selectedStatus === "all" || 
       (selectedStatus === "in-progress" && project.status === "in-progress") ||
       (selectedStatus === "completed" && project.status === "completed") ||
       (selectedStatus === "overbudget" && project.spent > project.totalBudget))
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleExport = () => {
    toast.success("Projects exported successfully!");
  };

  const handleBulkAction = (action: string) => {
    toast.success(`Bulk action: ${action} initiated`);
  };

  return (
    <Dashboard>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">All Projects</h1>
            <p className="text-muted-foreground mt-2">Manage and track all your financial projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              Export
            </Button>
            <Link to="/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" title="Filter">
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="space-y-2">
                    <h4 className="font-medium">Filter by Category</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={activeFilters.includes(category)}
                            onCheckedChange={() => toggleFilter(category)}
                          />
                          <Label htmlFor={`category-${category}`} className="capitalize">{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="icon" onClick={handleSort} title="Sort">
                {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
              
              <div className="flex border rounded-md">
                <Toggle 
                  pressed={viewMode === "grid"} 
                  onPressedChange={() => setViewMode("grid")}
                  className="rounded-l-md rounded-r-none"
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Toggle>
                <Toggle 
                  pressed={viewMode === "list"} 
                  onPressedChange={() => setViewMode("list")}
                  className="rounded-l-none rounded-r-md"
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={handleStatusChange} value={selectedStatus}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overbudget">Over Budget</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.map(filter => (
                  <Button 
                    key={filter} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleFilter(filter)} 
                    className="h-7 gap-1 capitalize"
                  >
                    {filter}
                    <span className="text-xs">×</span>
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveFilters([])} 
                  className="h-7"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </Tabs>
        
        {viewMode === "grid" && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  totalBudget={project.totalBudget}
                  spent={project.spent}
                  status={project.status as any}
                  dueDate={project.dueDate}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {viewMode === "list" && (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-grow p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link to={`/projects/${project.id}`} className="hover:underline">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                          </Link>
                          <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                        </div>
                        <div className="ml-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                              : project.spent > project.totalBudget
                                ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                          }`}>
                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-medium">${project.totalBudget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Spent</p>
                          <p className={`font-medium ${project.spent > project.totalBudget ? 'text-red-500' : ''}`}>
                            ${project.spent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Due Date</p>
                          <p className="font-medium">
                            {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Category</p>
                          <p className="font-medium capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col justify-center items-center gap-2 p-4 bg-muted/50 sm:w-28">
                      <Link to={`/projects/${project.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          View
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => toast.success("Edit mode activated")}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {filteredProjects.length > 0 && viewMode === "list" && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} projects
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start" 
                      onClick={() => handleBulkAction("Archive")}
                    >
                      Archive Selected
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start" 
                      onClick={() => handleBulkAction("Export")}
                    >
                      Export Selected
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-destructive" 
                      onClick={() => handleBulkAction("Delete")}
                    >
                      Delete Selected
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => {
              setSearchTerm("");
              setActiveFilters([]);
              setSelectedStatus("all");
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </motion.div>
    </Dashboard>
  );
};

export default AllProjects;


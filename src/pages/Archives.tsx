
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Archive, Search, ArrowUpDown, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Dashboard from '@/components/layout/Dashboard';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for archived projects
const archivedProjects = [
  {
    id: "a1",
    title: "2022 Q4 Marketing Campaign",
    description: "End of year marketing campaign for product awareness",
    totalBudget: 35000,
    spent: 32400,
    completionDate: "2022-12-15",
    status: "completed",
    category: "marketing",
    archivedDate: "2023-01-20"
  },
  {
    id: "a2",
    title: "Legacy System Migration",
    description: "Migration from old CRM to new platform",
    totalBudget: 120000,
    spent: 145000,
    completionDate: "2023-03-30",
    status: "completed",
    category: "it",
    archivedDate: "2023-04-15"
  },
  {
    id: "a3",
    title: "Annual Company Retreat",
    description: "Team building and strategy retreat",
    totalBudget: 45000,
    spent: 42300,
    completionDate: "2023-05-12",
    status: "completed",
    category: "hr",
    archivedDate: "2023-06-01"
  },
  {
    id: "a4",
    title: "Product Release Beta Phase",
    description: "Beta testing phase for new product line",
    totalBudget: 65000,
    spent: 58900,
    completionDate: "2023-02-28",
    status: "completed",
    category: "product",
    archivedDate: "2023-03-15"
  },
  {
    id: "a5",
    title: "Office Relocation Project",
    description: "Moving headquarters to new location",
    totalBudget: 180000,
    spent: 195000,
    completionDate: "2022-11-15",
    status: "completed",
    category: "facilities",
    archivedDate: "2022-12-05"
  }
];

const Archives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"title" | "archivedDate" | "budget">("archivedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Animation variants
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

  // Filter projects based on search term
  const filteredProjects = archivedProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "archivedDate") {
      return sortDirection === "asc"
        ? new Date(a.archivedDate).getTime() - new Date(b.archivedDate).getTime()
        : new Date(b.archivedDate).getTime() - new Date(a.archivedDate).getTime();
    } else {
      return sortDirection === "asc"
        ? a.totalBudget - b.totalBudget
        : b.totalBudget - a.totalBudget;
    }
  });

  // Function to toggle sort direction
  const toggleSort = (field: "title" | "archivedDate" | "budget") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Dashboard>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Archives</h1>
            <p className="text-muted-foreground mt-2">Access and review completed projects</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search archives..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2022">2022</TabsTrigger>
            <TabsTrigger value="older">Older</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 text-sm font-medium">
            <div className="col-span-5 flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("title")}>
              Project
              {sortField === "title" && (
                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
              )}
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("budget")}>
              Budget
              {sortField === "budget" && (
                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
              )}
            </div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => toggleSort("archivedDate")}>
              Archived
              {sortField === "archivedDate" && (
                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
              )}
            </div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                className="border-t border-border last:border-b-0"
              >
                <div className="grid grid-cols-12 gap-4 p-4 hover:bg-accent/10 transition-colors">
                  <div className="col-span-5">
                    <Link to={`/projects/${project.id}`} className="font-medium hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                    <p className="text-muted-foreground text-sm truncate">{project.description}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div>
                      <p className="text-sm font-medium">${project.totalBudget.toLocaleString()}</p>
                      <p className={`text-xs ${project.spent > project.totalBudget ? 'text-red-500' : 'text-green-500'}`}>
                        {project.spent > project.totalBudget 
                          ? `+$${(project.spent - project.totalBudget).toLocaleString()} over`
                          : `$${(project.totalBudget - project.spent).toLocaleString()} under`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="capitalize px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {project.category}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center text-muted-foreground text-sm">
                    <Archive className="h-4 w-4 mr-2" />
                    {new Date(project.archivedDate).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {sortedProjects.length === 0 && (
            <div className="text-center py-12">
              <Archive className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No archived projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </motion.div>
    </Dashboard>
  );
};

export default Archives;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Download, MoreHorizontal, Edit, Archive, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Dashboard from '@/components/layout/Dashboard';
import ProjectDetail, { ProjectDetailProps } from '@/components/projects/ProjectDetail';

// Mock data for a specific project with expenses
const mockProjectData: Record<string, ProjectDetailProps> = {
  "1": {
    id: "1",
    name: "Hotel Renovation",
    client: "Horizon Architecture",
    budget: 120000,
    spent: 146400, // 22% over budget
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    status: "active",
    description: "Complete renovation of the Grand Plaza Hotel lobby and reception areas, including new furniture, lighting, flooring and wall treatments. The project aims to create a more modern and welcoming atmosphere for hotel guests while maintaining the historical character of the building.",
    expenses: [
      { id: "e1", description: "Furniture purchase", amount: 45000, category: "Furniture", date: "2023-02-10" },
      { id: "e2", description: "Contractor labor", amount: 38000, category: "Labor", date: "2023-03-15" },
      { id: "e3", description: "Lighting fixtures", amount: 12700, category: "Fixtures", date: "2023-02-28" },
      { id: "e4", description: "Marble flooring", amount: 26500, category: "Materials", date: "2023-04-05" },
      { id: "e5", description: "Design revisions", amount: 8800, category: "Design", date: "2023-03-20" },
      { id: "e6", description: "Unexpected plumbing work", amount: 15400, category: "Plumbing", date: "2023-04-18" }
    ]
  },
  "2": {
    id: "2",
    name: "Office Complex Design",
    client: "TechSpace Inc.",
    budget: 85000,
    spent: 42500,
    startDate: "2023-03-10",
    endDate: "2023-08-15",
    status: "active",
    description: "Design of a modern office complex with sustainable features and open workspaces. This project includes complete architectural plans, 3D renderings, and material specifications for a 3-story building with collaborative areas and private offices.",
    expenses: [
      { id: "e7", description: "Initial design work", amount: 18500, category: "Design", date: "2023-03-20" },
      { id: "e8", description: "3D renderings", amount: 7500, category: "Visualization", date: "2023-04-10" },
      { id: "e9", description: "Consultant fees", amount: 6800, category: "Consulting", date: "2023-04-25" },
      { id: "e10", description: "Material research", amount: 4200, category: "Research", date: "2023-05-05" },
      { id: "e11", description: "Client presentation", amount: 5500, category: "Presentation", date: "2023-05-15" }
    ]
  },
  "3": {
    id: "3",
    name: "Residential Tower",
    client: "Urban Living",
    budget: 250000,
    spent: 175000,
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    status: "active",
    description: "Design and development of a 15-story residential tower with luxury amenities. The project includes complete architectural plans, structural engineering, interior design concepts, and landscaping for common areas.",
    expenses: [
      { id: "e12", description: "Architectural planning", amount: 45000, category: "Architecture", date: "2023-02-15" },
      { id: "e13", description: "Structural engineering", amount: 35000, category: "Engineering", date: "2023-03-10" },
      { id: "e14", description: "Interior design concepts", amount: 28000, category: "Interior", date: "2023-04-05" },
      { id: "e15", description: "Site analysis", amount: 12000, category: "Analysis", date: "2023-02-10" },
      { id: "e16", description: "Permit applications", amount: 15000, category: "Legal", date: "2023-05-20" },
      { id: "e17", description: "Client meetings", amount: 8000, category: "Meetings", date: "2023-03-30" },
      { id: "e18", description: "3D renderings", amount: 32000, category: "Visualization", date: "2023-04-25" }
    ]
  },
  "4": {
    id: "4",
    name: "Shopping Mall Expansion",
    client: "Retail Ventures",
    budget: 180000,
    spent: 162000,
    startDate: "2023-04-15",
    endDate: "2023-10-30",
    status: "active",
    description: "Expansion of the Westfield Shopping Mall adding 20 new retail spaces. The project includes architectural design, construction documentation, and coordination with tenant requirements and building codes.",
    expenses: [
      { id: "e19", description: "Conceptual design", amount: 28000, category: "Design", date: "2023-04-25" },
      { id: "e20", description: "Site planning", amount: 22000, category: "Planning", date: "2023-05-10" },
      { id: "e21", description: "Construction documents", amount: 45000, category: "Documentation", date: "2023-06-15" },
      { id: "e22", description: "Code compliance review", amount: 18000, category: "Compliance", date: "2023-05-30" },
      { id: "e23", description: "Tenant coordination", amount: 24000, category: "Coordination", date: "2023-06-30" },
      { id: "e24", description: "Material specifications", amount: 25000, category: "Materials", date: "2023-07-15" }
    ]
  }
};

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  
  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      if (id && mockProjectData[id]) {
        setProject(mockProjectData[id]);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const handleShare = () => {
    toast.success("Project link copied to clipboard!");
  };
  
  const handleDownload = () => {
    toast.success("Project report downloading...");
  };
  
  const handleArchive = () => {
    toast.success("Project archived successfully!");
  };
  
  const handleDelete = () => {
    toast.success("Project deleted successfully!");
  };

  const handleAddExpense = () => {
    toast.success("New expense added to project!");
  };

  return (
    <Dashboard>
      {isLoading ? (
        <div className="space-y-6">
          <div className="h-10 w-48 rounded animate-pulse bg-muted"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 rounded-lg animate-pulse bg-muted lg:col-span-2"></div>
            <div className="h-64 rounded-lg animate-pulse bg-muted"></div>
          </div>
          <div className="h-80 rounded-lg animate-pulse bg-muted"></div>
        </div>
      ) : project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <Link to="/projects">
                <Button variant="outline" size="sm">Back to Projects</Button>
              </Link>
              
              <Tabs defaultValue="details" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast.success("Edit mode activated")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleArchive}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Project
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the project
                          and all associated expenses and data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="details" className="mt-0">
            <ProjectDetail project={project} onAddExpense={handleAddExpense} />
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold tracking-tight">Project Expenses</h2>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </div>
              
              <div className="space-y-4">
                {project.expenses.map((expense) => (
                  <motion.div 
                    key={expense.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{expense.description}</h3>
                          <p className="text-sm text-muted-foreground">{expense.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${expense.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <div className="text-center py-16">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Timeline Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="mt-0">
            <div className="text-center py-16">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Team Management Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          </TabsContent>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      )}
    </Dashboard>
  );
};

export default ProjectPage;

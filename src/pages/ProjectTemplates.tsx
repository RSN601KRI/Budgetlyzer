
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Folder, LayoutTemplate, Plus, Bookmark, Star, StarOff, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import Dashboard from '@/components/layout/Dashboard';

const templateCategories = [
  {
    name: "Business",
    templates: [
      { 
        id: "business-1", 
        name: "Construction Project", 
        description: "Budget template for building and construction projects", 
        icon: <Folder className="h-8 w-8 text-primary" />,
        popular: true,
        features: [
          "Cost breakdown structure",
          "Labor resource allocation",
          "Materials tracking",
          "Subcontractor management",
          "Payment milestone tracking"
        ]
      },
      { 
        id: "business-2", 
        name: "Small Business", 
        description: "For small business owners managing project finances", 
        icon: <FileText className="h-8 w-8 text-primary" />,
        popular: false,
        features: [
          "Income and expense tracking",
          "Tax categories",
          "Client management",
          "Invoice templates",
          "Financial reporting"
        ]
      },
      { 
        id: "business-3", 
        name: "Enterprise Project", 
        description: "Large-scale enterprise project financial tracking", 
        icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
        popular: true,
        features: [
          "Department budget allocation",
          "Cross-functional resource management",
          "Advanced reporting",
          "Multi-currency support",
          "Role-based access controls"
        ]
      },
    ]
  },
  {
    name: "Personal",
    templates: [
      { 
        id: "personal-1", 
        name: "Home Renovation", 
        description: "Track costs for your home improvement project", 
        icon: <Folder className="h-8 w-8 text-primary" />,
        popular: true,
        features: [
          "Room-by-room budget breakdown",
          "Contractor comparison",
          "Materials inventory",
          "Timeline planning",
          "Before/after documentation"
        ]
      },
      { 
        id: "personal-2", 
        name: "Wedding Budget", 
        description: "Plan and track your wedding expenses", 
        icon: <FileText className="h-8 w-8 text-primary" />,
        popular: false,
        features: [
          "Vendor management",
          "Guest list budget allocation",
          "Payment scheduling",
          "Expense categorization",
          "Shared access for couples"
        ]
      },
      { 
        id: "personal-3", 
        name: "Vacation Planning", 
        description: "Organize your trip budget and expenses", 
        icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
        popular: false,
        features: [
          "Destination-based budgeting",
          "Travel expense tracking",
          "Accommodation comparison",
          "Activity cost planning",
          "Currency conversion"
        ]
      },
    ]
  }
];

const ProjectTemplates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  
  // Animation variants for staggered animations
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

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
    
    const isFavorite = favorites.includes(templateId);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleUseTemplate = (templateName: string) => {
    toast.success(`Creating new project from ${templateName} template`);
  };

  const handleDownloadTemplate = (templateName: string) => {
    toast.success(`${templateName} template downloaded`);
  };

  const toggleTemplateDetails = (templateId: string) => {
    setExpandedTemplate(expandedTemplate === templateId ? null : templateId);
  };

  const filteredCategories = activeTab === "all" 
    ? templateCategories
    : activeTab === "favorites"
      ? templateCategories.map(category => ({
          ...category,
          templates: category.templates.filter(template => favorites.includes(template.id))
        })).filter(category => category.templates.length > 0)
      : activeTab === "popular"
        ? templateCategories.map(category => ({
            ...category,
            templates: category.templates.filter(template => template.popular)
          })).filter(category => category.templates.length > 0)
        : [];

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
            <h1 className="text-3xl font-display font-bold">Project Templates</h1>
            <p className="text-muted-foreground mt-2">Start with a pre-built template to save time</p>
          </div>
          <Link to="/projects/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Custom Project
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No templates found</h3>
            <p className="text-muted-foreground mb-4">You haven't added any templates to your favorites yet</p>
            <Button onClick={() => setActiveTab("all")}>View All Templates</Button>
          </div>
        ) : (
          filteredCategories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{category.name} Templates</h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {category.templates.map((template) => (
                  <motion.div 
                    key={template.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Card className="h-full border bg-card shadow-sm hover:shadow-md transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="mb-2">{template.icon}</div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(template.id)}
                          >
                            {favorites.includes(template.id) ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{template.name}</CardTitle>
                          {template.popular && <Badge variant="outline" className="text-xs bg-primary/10">Popular</Badge>}
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <Collapsible 
                          open={expandedTemplate === template.id} 
                          onOpenChange={() => toggleTemplateDetails(template.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full flex items-center justify-between mt-2 mb-2 gap-1">
                              <span>View Features</span>
                              <ChevronDown className={`h-4 w-4 transition-transform ${expandedTemplate === template.id ? 'rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2">
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {template.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="inline-block w-2 h-2 rounded-full bg-primary/30"></span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button 
                          variant="default" 
                          className="w-full"
                          onClick={() => handleUseTemplate(template.name)}
                        >
                          Use Template
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDownloadTemplate(template.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))
        )}
      </motion.div>
    </Dashboard>
  );
};

export default ProjectTemplates;

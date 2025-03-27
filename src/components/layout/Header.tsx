
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  Menu, 
  BarChart3, 
  Home, 
  CalendarDays, 
  Archive, 
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const MainNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isActive('/dashboard') && "bg-accent text-accent-foreground"
            )}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={
            (isActive('/projects') || isActive('/projects/templates') || isActive('/projects/archives')) 
              ? "bg-accent text-accent-foreground" 
              : ""
          }>
            <BarChart3 className="mr-2 h-4 w-4" />
            Projects
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/projects"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                  >
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-display font-medium">
                      View All Projects
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Track all your project finances in one place with comprehensive insights.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <Link to="/projects/new" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">New Project</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create a new budget project from scratch.
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/projects/templates" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Templates</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Start with predefined project templates.
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/projects/archives" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Archives</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View completed or archived projects.
                  </p>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/calendar">
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isActive('/calendar') && "bg-accent text-accent-foreground"
            )}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b border-border/40">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-semibold text-xl">P</span>
              </div>
              <h1 className="text-lg font-display font-semibold tracking-tight">
                Payman
              </h1>
            </Link>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <BarChart3 className="h-5 w-5" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/new" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <PlusCircle className="h-5 w-5" />
                  <span>New Project</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/templates" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <FileText className="h-5 w-5" />
                  <span>Templates</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/archives" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Archive className="h-5 w-5" />
                  <span>Archives</span>
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <CalendarDays className="h-5 w-5" />
                  <span>Calendar</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-border/40">
            <Button asChild className="w-full">
              <Link to="/projects/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={cn(
        "w-full border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-30 transition-all duration-300",
        scrolled ? "shadow-sm" : ""
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <MobileNav />
          
          <Link to="/" className="flex items-center gap-2 ml-0 md:ml-0">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-semibold text-xl">P</span>
            </div>
            <h1 className="text-lg font-display font-semibold tracking-tight">
              Payman
            </h1>
          </Link>
          
          <div className="ml-8">
            <MainNav />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/projects/new" className="hidden md:flex">
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

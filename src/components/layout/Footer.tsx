
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3,
  PlusCircle, 
  FileText,
  Archive, 
  CalendarDays 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-8 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-semibold text-xl">P</span>
              </div>
              <h1 className="text-lg font-display font-semibold tracking-tight">
                Payman
              </h1>
            </Link>
            <p className="text-sm text-muted-foreground">
              Simplify project budget management with real-time tracking, analysis, and insights.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link to="/projects/new" className="text-muted-foreground hover:text-foreground transition-colors">Create Project</Link></li>
              <li><Link to="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">Calendar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-sm uppercase tracking-wider mb-4">Project Types</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <BarChart3 className="h-4 w-4" /> All Projects
                </Link>
              </li>
              <li>
                <Link to="/projects/new" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <PlusCircle className="h-4 w-4" /> New Project
                </Link>
              </li>
              <li>
                <Link to="/projects/templates" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <FileText className="h-4 w-4" /> Project Templates
                </Link>
              </li>
              <li>
                <Link to="/projects/archives" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Archive className="h-4 w-4" /> Project Archives
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <CalendarDays className="h-4 w-4" /> Project Calendar
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Payman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

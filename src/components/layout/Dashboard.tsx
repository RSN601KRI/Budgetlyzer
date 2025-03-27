
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuLinkItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BarChart,
  CalendarDays,
  FileStack,
  Folder,
  FolderArchive,
  Grid3X3,
  Home,
  Layers,
  Settings,
  Wallet,
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenuLinkItem
                  to="/"
                  icon={Home}
                  title="Home"
                />
                <SidebarMenuLinkItem
                  to="/dashboard"
                  icon={Grid3X3}
                  title="Dashboard"
                />
                <SidebarMenuLinkItem
                  to="/projects"
                  icon={Folder}
                  title="Projects"
                  badge={<Badge variant="outline">4</Badge>}
                />
                <SidebarMenuLinkItem
                  to="/projects/templates"
                  icon={FileStack}
                  title="Templates"
                  badge={<Badge className="bg-primary">New</Badge>}
                />
                <SidebarMenuLinkItem
                  to="/calendar"
                  icon={CalendarDays}
                  title="Calendar"
                />
                <SidebarMenuLinkItem
                  to="/wallet"
                  icon={Wallet}
                  title="Wallet"
                  badge={<Badge className="bg-primary">New</Badge>}
                />
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Library</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenuLinkItem
                  to="/projects/archives"
                  icon={FolderArchive}
                  title="Archives"
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuLinkItem
              to="/settings"
              icon={Settings}
              title="Settings"
            />
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col ml-[60px] transition-all duration-300 ease-in-out xl:ml-60">
          <Header />
          <div className="flex-1 p-4 md:p-6 mx-auto max-w-7xl w-full">
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

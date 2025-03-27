
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import Index from "./pages/Index";
import ProjectPage from "./pages/ProjectPage";
import CreateProject from "./components/projects/CreateProject";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import ProjectTemplates from "./pages/ProjectTemplates";
import AllProjects from "./pages/AllProjects";
import Archives from "./pages/Archives";
import ProjectCalendar from "./pages/Calendar";
import WalletPage from "./pages/WalletPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/templates" element={<ProjectTemplates />} />
            <Route path="/projects/archives" element={<Archives />} />
            <Route path="/calendar" element={<ProjectCalendar />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

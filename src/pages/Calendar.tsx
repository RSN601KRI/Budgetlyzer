
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/layout/Dashboard';
import { cn } from '@/lib/utils';
import { format, addDays, parse, isSameDay } from 'date-fns';

// Mock data for calendar events
const projectEvents = [
  {
    id: "e1",
    title: "Website Launch",
    projectId: "1",
    date: "2024-08-15",
    type: "deadline",
    status: "upcoming"
  },
  {
    id: "e2",
    title: "Budget Review",
    projectId: "2",
    date: "2024-08-05",
    type: "meeting",
    status: "upcoming"
  },
  {
    id: "e3",
    title: "Vendor Payment Due",
    projectId: "3",
    date: "2024-08-12",
    type: "payment",
    status: "upcoming"
  },
  {
    id: "e4",
    title: "Marketing Budget Update",
    projectId: "1",
    date: "2024-08-20",
    type: "milestone",
    status: "upcoming"
  },
  {
    id: "e5",
    title: "Quarterly Budget Meeting",
    projectId: "4",
    date: "2024-08-10",
    type: "meeting",
    status: "upcoming"
  },
  {
    id: "e6",
    title: "Project Completion",
    projectId: "5",
    date: "2024-08-25",
    type: "deadline",
    status: "upcoming"
  }
];

interface CalendarEvent {
  id: string;
  title: string;
  projectId: string;
  date: string;
  type: string;
  status: string;
}

const ProjectCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [monthView, setMonthView] = useState<Date>(today);
  const [view, setView] = useState<'month' | 'day'>('month');
  
  // Function to get events for a specific day
  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return projectEvents.filter(event => 
      isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), date)
    );
  };
  
  // Function to get all days with events in the current month
  const daysWithEvents = projectEvents.map(event => parse(event.date, 'yyyy-MM-dd', new Date()));
  
  // Calendar day render function
  const renderDay = (day: Date, events: CalendarEvent[]) => {
    const hasEvents = events.length > 0;
    
    return (
      <div className="relative h-full w-full p-2">
        <time dateTime={format(day, 'yyyy-MM-dd')} className="flex h-8 w-8 items-center justify-center rounded-full">
          {format(day, 'd')}
        </time>
        {hasEvents && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {events.length > 3 ? (
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            ) : (
              events.map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              ))
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Get events for the selected date
  const selectedDateEvents = getEventsForDay(selectedDate);
  
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
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };
  
  // Function to render day view
  const renderDayView = () => {
    return (
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-center mx-2">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setView('month')}>
            Month View
          </Button>
        </CardHeader>
        <CardContent>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  variants={itemVariants}
                  className={cn(
                    "p-4 rounded-md border",
                    event.type === 'deadline' && "border-l-4 border-l-red-500",
                    event.type === 'meeting' && "border-l-4 border-l-blue-500",
                    event.type === 'payment' && "border-l-4 border-l-green-500",
                    event.type === 'milestone' && "border-l-4 border-l-purple-500"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">View Project</Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No events scheduled</h3>
                <p className="text-muted-foreground">There are no events scheduled for this day</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    );
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
            <h1 className="text-3xl font-display font-bold">Project Calendar</h1>
            <p className="text-muted-foreground mt-2">Track important project dates and budget milestones</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
        
        {view === 'month' ? (
          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
            <Card>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setView('day');
                    }
                  }}
                  onMonthChange={setMonthView}
                  className="mx-auto"
                  modifiers={{
                    hasEvent: daysWithEvents,
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: 'bold',
                      color: 'var(--primary)',
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectEvents
                      .sort((a, b) => 
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      )
                      .slice(0, 5)
                      .map((event) => (
                        <motion.div 
                          key={event.id}
                          variants={itemVariants}
                          className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/50 transition-colors"
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center",
                            event.type === 'deadline' && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                            event.type === 'meeting' && "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                            event.type === 'payment' && "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
                            event.type === 'milestone' && "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                          )}>
                            <span className="text-xs font-semibold">
                              {format(parse(event.date, 'yyyy-MM-dd', new Date()), 'dd')}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(parse(event.date, 'yyyy-MM-dd', new Date()), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </motion.div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          renderDayView()
        )}
      </motion.div>
    </Dashboard>
  );
};

export default ProjectCalendar;

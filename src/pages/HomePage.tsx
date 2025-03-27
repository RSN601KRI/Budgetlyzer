
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CreditCard, LineChart, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/layout/Dashboard';
import { useTheme } from '@/hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme();
  
  return (
    <Dashboard>
      <div className="min-h-[calc(100vh-150px)] flex flex-col">
        {/* Hero Section */}
        <section className="py-16 md:py-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4"
          >
            <motion.div 
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Budget Management Made Simple
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="relative">
                <span className="relative z-10">Payman</span>
                <motion.span 
                  className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 rounded-sm -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </span>
              <span className="block text-2xl md:text-4xl mt-2 text-muted-foreground">Smart Project Finance Tracking</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Take control of your project budgets with real-time tracking, advanced analytics, and intelligent forecasting.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/projects/new">
                <Button size="lg" className="gap-2 text-base px-8 h-12">
                  Start a new project <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8 h-12">
                  View dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-accent/50">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold mb-4">Powerful Budget Management Tools</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage project finances in one intuitive platform
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart3 className="h-10 w-10" />,
                  title: "Budget Tracking",
                  description: "Monitor your project budgets in real-time with intuitive visualizations and progress tracking."
                },
                {
                  icon: <LineChart className="h-10 w-10" />,
                  title: "Financial Forecasting",
                  description: "Predict future expenditures and identify potential budget overruns before they happen."
                },
                {
                  icon: <CreditCard className="h-10 w-10" />,
                  title: "Expense Management",
                  description: "Track and categorize all project expenses for complete financial transparency."
                },
                {
                  icon: <PieChart className="h-10 w-10" />,
                  title: "Budget Allocation",
                  description: "Easily allocate and adjust budgets across multiple projects and categories."
                },
                {
                  icon: <TrendingUp className="h-10 w-10" />,
                  title: "Performance Metrics",
                  description: "Measure financial performance against targets with custom KPIs and metrics."
                },
                {
                  icon: <BarChart3 className="h-10 w-10" />,
                  title: "Comprehensive Reports",
                  description: "Generate detailed financial reports for stakeholders and decision-makers."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: theme === 'dark' 
                      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="rounded-full bg-primary/10 p-3 inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-primary/20 to-background' : 'bg-gradient-to-br from-primary/10 to-background'}`}></div>
          </div>
          
          <div className="container relative z-10 px-4 mx-auto">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to take control of your project finances?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of project managers who use Payman to deliver projects on budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects/new">
                  <Button size="lg" className="gap-2 w-full sm:w-auto text-base px-8 h-12">
                    Start a new project <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto text-base px-8 h-12">
                    Contact us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Dashboard>
  );
};

export default HomePage;

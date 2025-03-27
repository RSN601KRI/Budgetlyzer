
import React from 'react';
import Dashboard from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  
  return (
    <Dashboard>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 space-y-16">
        <div className="text-center space-y-4">
          <motion.h1 
            className="text-4xl font-display font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Have questions about Payman? We're here to help you manage your project budgets more effectively.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            custom={0}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MailIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-3">Our team is here to help</p>
            <a href="mailto:info@payman.com" className="text-primary hover:underline">info@payman.com</a>
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PhoneIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-muted-foreground mb-3">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+11234567890" className="text-primary hover:underline">+1 (123) 456-7890</a>
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPinIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-3">Come say hello</p>
            <address className="not-italic text-primary">
              123 Finance Street<br />
              San Francisco, CA 94103
            </address>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-accent p-8 md:p-10">
                  <h2 className="text-2xl font-display font-bold mb-4">Send us a message</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form and our team will get back to you as soon as possible.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help you?" 
                        className="min-h-[120px]" 
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <SendIcon className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
                
                <div className="relative h-[300px] md:h-auto">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.77057434525!2d-122.43138266459295!3d37.774929474195305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1637261773550!5m2!1sen!2sus" 
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.9)' }}
                    loading="lazy"
                    title="Map"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Dashboard>
  );
};

export default Contact;

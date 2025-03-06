
import React from 'react';
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/akshhita12' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/in/akshita-rao-33799a251' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/akshita_rao12/' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-primary/5 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter">Thank you</a>
            <p className="mt-2 text-foreground/70 max-w-md">
              Let's connect!
                      </p>
          </div>
          
          <div>
            <p className="font-medium mb-3 text-center md:text-right">Connect with me</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} G. Akshita. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            whileHover={{ y: -3 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const titleElement = containerRef.current.querySelector('.hero-title');
      const subtitleElement = containerRef.current.querySelector('.hero-subtitle');
      const decorElement = containerRef.current.querySelector('.hero-decor');
      const decorSecondElement = containerRef.current.querySelector('.hero-decor-second');
      
      if (titleElement) {
        (titleElement as HTMLElement).style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
      }
      
      if (subtitleElement) {
        (subtitleElement as HTMLElement).style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
      }
      
      if (decorElement) {
        (decorElement as HTMLElement).style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8}px)`;
      }
      
      if (decorSecondElement) {
        (decorSecondElement as HTMLElement).style.transform = `translate(${-moveX * 0.6}px, ${-moveY * 0.6}px)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef} 
        className="section-container flex flex-col items-center justify-center text-center perspective"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-decor absolute -z-10 w-64 h-64 rounded-full bg-gradient-to-r from-neon-cyan/30 to-neon-blue/30 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-decor-second absolute -z-10 right-1/4 top-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 blur-3xl"
        />
        
        <motion.h1
          className="hero-title font-bold mb-6 tracking-tight relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
            G. Akshita Rao
          </span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
            Portfolio
          </span>
          <motion.div 
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple blur-2xl" />
          </motion.div>
        </motion.h1>
        
        <motion.p
          className="hero-subtitle max-w-xl text-lg md:text-xl text-foreground/80 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
           Final-year student eager to explore emerging technologies and tackle new challenges with innovation and curiosity.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a 
            href="#projects" 
            className="bg-gradient-to-r from-neon-cyan to-neon-blue text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-neon-blue/20"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 136, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a 
            href="#contact" 
            className="bg-transparent border border-foreground/20 hover:border-foreground/40 text-foreground px-6 py-3 rounded-full font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
          <motion.a 
            href="/Akshita.pdf" 
            download
            className="bg-gradient-to-r from-neon-purple to-neon-pink text-background px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-neon-pink/20"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
      
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/20 transition-colors"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
};

export default Hero;

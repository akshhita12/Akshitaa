
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Canvas3D from '../components/Canvas3D';
import { ThemeProvider } from '../context/ThemeContext';

const Index: React.FC = () => {
  // Smooth scrolling to sections when URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Canvas3D />
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Projects />
            <Education />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;


import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors duration-300 shadow-lg hover:shadow-neon-cyan/20"
      whileTap={{ scale: 0.95 }}
      whileHover={{ 
        scale: 1.05,
        rotate: theme === 'dark' ? 15 : -15,
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;

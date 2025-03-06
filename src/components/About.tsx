import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const About: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section id="about" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={childVariants}>
            <div className="relative">
              <motion.div 
                className="absolute -z-10 w-full h-full bg-neon-cyan/5 rounded-xl -translate-x-4 translate-y-4"
                animate={{ 
                  translateX: [-16, -12, -16],
                  translateY: [16, 12, 16],
                }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
              <div className="glass-card overflow-hidden aspect-[4/5] relative">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Developer" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={childVariants} className="space-y-6">
            <div>
              <motion.span
                variants={childVariants}
                className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary mb-4"
              >
                About Me
              </motion.span>
              <motion.h2 variants={childVariants} className="text-3xl font-bold mb-6">
                G. Akshita Rao
              </motion.h2>
            </div>
            
            <motion.p variants={childVariants} className="text-foreground/80">
              I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. 
              With a background in both design and development, I bring a unique perspective to every project.
            </motion.p>
            
            <motion.p variants={childVariants} className="text-foreground/80">
            I am a dedicated and detail-oriented final-year computer science student with a strong passion for problem-solving. Currently, I am gaining valuable experience as a College Ambassador at VALMIKI GROUP, where I enhance my leadership and communication skills while representing the organization.
            </motion.p>
            
            <motion.div variants={childVariants} className="pt-4">
              <h3 className="font-medium text-xl mb-4">Key characteristics</h3>
              <ul className="space-y-2">
                {[
                  "Detail-oriented and meticulous",
                  "Research and analysis",
                  "Strong communication and Interpersonal skills",
                  "Adaptable to new technologies",
                  "User-focused approach",
                  "Multitasking Abilities "
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={childVariants}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={childVariants} className="pt-4">
              <a 
                href="#contact" 
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

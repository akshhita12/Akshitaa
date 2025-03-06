
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  level: number; // 1-5
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend', level: 5 },
  { name: 'JavaScript', icon: '𝐉𝐒', category: 'frontend', level: 5 },
  { name: 'TypeScript', icon: '𝐓𝐒', category: 'frontend', level: 4 },
  { name: 'HTML/CSS', icon: '🌐', category: 'frontend', level: 5 },
  { name: 'Vue.js', icon: '𝐕', category: 'frontend', level: 3 },
  { name: 'Angular', icon: '𝐀', category: 'frontend', level: 3 },
  
  // Backend
  { name: 'Node.js', icon: '𝐍', category: 'backend', level: 4 },
  { name: 'Express', icon: '𝐄', category: 'backend', level: 4 },
  { name: 'MongoDB', icon: '𝐌', category: 'backend', level: 4 },
  { name: 'SQL', icon: '𝐒', category: 'backend', level: 3 },
  { name: 'Firebase', icon: '🔥', category: 'backend', level: 4 },
  
  // Design
  { name: 'Figma', icon: '𝐅', category: 'design', level: 4 },
  { name: 'UI/UX', icon: '🎨', category: 'design', level: 4 },
  { name: 'Tailwind CSS', icon: '𝐓', category: 'design', level: 5 },
  { name: 'SASS', icon: '𝐒', category: 'design', level: 4 },
  
  // Tools
  { name: 'Git', icon: '𝐆', category: 'tools', level: 4 },
  { name: 'Webpack', icon: '𝐖', category: 'tools', level: 3 },
  { name: 'Docker', icon: '𝐃', category: 'tools', level: 3 },
  { name: 'Jest', icon: '𝐉', category: 'tools', level: 3 },
];

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  isInView: boolean;
  delay: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, isInView, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-medium">
              {skill.icon}
            </div>
            <div>
              <p className="font-medium">{skill.name}</p>
              <div className="flex mt-1 space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${
                      i < skill.level ? 'bg-neon-cyan' : 'bg-foreground/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const designSkills = skills.filter(skill => skill.category === 'design');
  const toolSkills = skills.filter(skill => skill.category === 'tools');
  
  return (
    <section id="skills" className="py-20 sm:py-32 relative bg-primary/5">
      <div 
        className="absolute top-0 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10"
        style={{ opacity: isInView ? 0.6 : 0 }}
      />
      
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary mb-4">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SkillCategory 
            title="Frontend Development" 
            skills={frontendSkills} 
            isInView={isInView} 
            delay={0.1}
          />
          <SkillCategory 
            title="Backend Development" 
            skills={backendSkills} 
            isInView={isInView} 
            delay={0.2}
          />
          <SkillCategory 
            title="Design" 
            skills={designSkills} 
            isInView={isInView} 
            delay={0.3}
          />
          <SkillCategory 
            title="Tools & Workflows" 
            skills={toolSkills} 
            isInView={isInView} 
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;

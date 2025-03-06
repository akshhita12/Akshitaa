
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, Award, Building } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  description: string;
  achievements?: string[];
}

const educationData: EducationItem[] = [
  {
    degree: "Secondary Education",
    institution: "Johnson Grammar School",
    duration: "2018 - 2019",
    description: "CGPA - 9.5",
  },
  {
    degree: "Higher Secondary Education ",
    institution: "Tapasya Junior College ",
    duration: "2019 - 2021",
    description: "CGPA - 8.2",
  },
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    institution: "Vignana Bharathi Institute Of Technology",
    duration: "2021 - 2025",
    description: "CGPA - 7.13",
    achievements: [
      "MGIT-MUN Organising Committee Jan-2024 - April-2024",
      "VBIT-MUN Organising Committee Jan-2022 - May-2024",
      "Avinya-THUB-Z.A.R.C. Organising Committee Sept-2023 - Oct-2023"
    ]
  }
];

const TimelineItem: React.FC<{ item: EducationItem; index: number; isInView: boolean }> = ({ 
  item, 
  index, 
  isInView 
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-0 w-10 h-10 bg-background border-2 border-neon-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 shadow-md shadow-neon-blue/20">
        <GraduationCap className="w-5 h-5 text-neon-blue" />
      </div>
      
      {/* Content */}
      <div className={`w-5/12 px-0 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}></div>
      
      <div className={`w-5/12 px-8 py-6 ${isEven ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 20 : -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="glass-card p-6 hover:shadow-neon-blue/10 hover:border-neon-blue/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
            {item.degree}
          </h3>
          
          <div className="flex items-center gap-2 mb-3 text-foreground/70">
            <Building className="w-4 h-4" />
            <span>{item.institution}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4 text-sm text-foreground/60">
            <Calendar className="w-4 h-4" />
            <span>{item.duration}</span>
          </div>
          
          <p className="mb-4 text-foreground/80">{item.description}</p>
          
          {item.achievements && (
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-neon-purple" /> 
                <span>Achievements</span>
              </div>
              <ul className={`space-y-1 text-sm text-foreground/70 ${isEven ? 'list-disc pl-5' : 'list-none pl-0'}`}>
                {item.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  return (
    <section id="education" className="py-20 sm:py-32 relative bg-primary/5">
      <div 
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10"
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
            My Education
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Journey</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            My educational background and academic achievements that have shaped my professional journey.
          </p>
        </motion.div>
        
        <div className="relative mt-20 space-y-20">
          {educationData.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

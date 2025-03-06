
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
}

const certifications: Certification[] = [
  {
    title: "Programming Fundamentals Using Python",
    issuer: "INFOSYS",
    date: "January 2022",
    description: "Foundational course covering core programming concepts using Python.",
    skills: ["Problem-solving with Python", "Object-oriented programming (OOP)", "Data structures and algorithms", "Debugging and error handling"],
    credentialUrl: ""
  },
  {
    title: "Java Script Essentials",
    issuer: "CISCO",
    date: "August 2022",
    description: "Core JavaScript concepts and techniques for dynamic web development.",
    skills: ["DOM manipulation", "Asynchronous programming", "Event handling", "ES6+ features"],
    credentialUrl: ""
  },
  {
    title: "Web Design Course",
    issuer: "INFOSYS",
    date: "April 2023",
    description: "Comprehensive course on designing responsive and user-friendly websites.",
    skills: ["HTML & CSS fundamentals", "Responsive web design", "UI/UX principles", "Web accessibility & performance optimization"],
    credentialUrl: ""
  },
  {
    title: "Networking Essentials",
    issuer: "CISCO",
    date: "November 2023",
    description: "Fundamental course on networking concepts, protocols, and infrastructure.",
    skills: ["TCP/IP and networking protocols", "Network configuration and troubleshooting", "IP addressing and subnetting", "Security fundamentals in networking"],
    credentialUrl: ""
  },
  {
    title: "Introduction To Cyber Security",
    issuer: "CISCO",
    date: "March 2024",
    description: "Basic principles of cybersecurity, threats, and protection strategies.",
    skills: ["Cyber threats and attack types", "Network security fundamentals", "Encryption and data protection","Security best practices and risk management"],
    credentialUrl: ""
  },
  {
    title: "Machine Learning with Real World Projects",
    issuer: "INFOSYS",
    date: "November 2024",
    description: "Hands-on course covering machine learning concepts through real-world projects.",
    skills: ["Data preprocessing and feature engineering", "Supervised and unsupervised learning algorithms", "Model evaluation and optimization","Deployment of machine learning models"],
    credentialUrl: ""
  }
  
];

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="glass-card h-full p-6 flex flex-col hover:shadow-neon-red/10 hover:border-neon-red/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-neon-red">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">{cert.title}</h3>
              <p className="text-sm text-foreground/70">{cert.issuer}</p>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-foreground/60">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{cert.date}</span>
          </div>
        </div>
        
        <p className="text-sm text-foreground/80 mb-4 flex-grow">{cert.description}</p>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-background/50 backdrop-blur-sm text-xs rounded-full text-foreground/70"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {cert.credentialUrl && (
            <a 
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neon-red hover:text-neon-pink transition-colors mt-2"
            >
              <span>View Credential</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <section id="certifications" className="py-20 sm:py-32 relative bg-primary/5">
      <div 
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-neon-red/10 rounded-full blur-3xl -z-10"
        style={{ opacity: isInView ? 0.6 : 0 }}
      />
      
      <div className="section-container" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary mb-4">
            Certifications
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Certifications</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Industry-recognized certifications that validate my technical expertise and professional knowledge.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

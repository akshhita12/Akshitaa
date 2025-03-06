
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Link, Calendar, ArrowRight } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
  responsibilities: string[];
  link?: string;
}

const experienceData: ExperienceItem[] = [
  {
    title: "College Ambassador",
    company: "Valmiki Group ",
    duration: "August 2024- July 2025",
    description: "Representing Valmiki Group on campus by promoting study abroad opportunities, engaging with students, and organizing informational events.",
    responsibilities: [
      "Promote Valmiki Group Services – Spread awareness about study abroad programs, career counseling, and other services offered by Valmiki Group.",
      "Engage with Students – Act as a point of contact for students interested in overseas education, guiding them with basic information.",
      "Social Media & Digital Marketing – Share updates, success stories, and event promotions on social media platforms.",
      "Represent the Brand – Maintain a professional and enthusiastic approach while representing Valmiki Group on campus.",
      "Networking & Outreach – Build relationships with students, faculty, and administrators to expand Valmiki Group’s reach."
    ],
    link: "https://www.valmikigroup.com/"
  },
  {
    title: "ZSCALAR - Zero Trust Cloud Security Virtual Internship ",
    company: "AICTE Virtual Internship ",
    duration: "April 2024 - June 2024",
    description: "Practical exposure to Zero Trust security principles and cloud-based cybersecurity solutions",
    responsibilities: [
      "Introduction to Zero Trust Security – Understanding the principles of Zero Trust architecture and its importance in modern cybersecurity.",
      "Cloud Security Fundamentals – Learning about secure access to cloud applications, data protection, and threat prevention.",
      "Secure Remote Access – Understanding VPN alternatives, Secure Access Service Edge (SASE), and cloud-native security solutions."
    ],
    link: "https://drive.google.com/file/d/1-38LGqiR1EO0RqKdJLsG_H7a-Jc5BdMh/view?usp=drive_link"
  },
  {
    title: "GOOGLE - Android Developer Virtual Internship",
    company: "AICTE Virtual Internship",
    duration: "September 2023 - November 2023",
    description: "Hands-on internship covering Android app development, UI/UX design, API integration, and app deployment using Google’s best practices.",
    responsibilities: [
      "Android App Development Fundamentals – Understanding the basics of Android Studio, Kotlin/Java, and app architecture.",
      "Working with APIs & Databases – Implementing data storage solutions, Firebase integration, and API handling.",
      "User Interface (UI) & User Experience (UX) Design – Creating responsive and interactive mobile interfaces using Material Design.",
    ],
    link: "https://drive.google.com/file/d/1rVazmdJeq4EoFPPaumk8tCG0WvqoAiMU/view?usp=drive_link"
  }
];

const ExperienceCard: React.FC<{ experience: ExperienceItem; index: number; isInView: boolean }> = ({ 
  experience, 
  index, 
  isInView 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-8 hover:shadow-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-red">
          {experience.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm mt-2 sm:mt-0 text-foreground/60">
          <Calendar className="w-4 h-4" />
          <span>{experience.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-foreground/80">
        <Briefcase className="w-4 h-4" />
        <span className="font-medium">{experience.company}</span>
        {experience.link && (
          <a 
            href={experience.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neon-purple hover:text-neon-pink transition-colors text-sm"
          >
            <Link className="w-3 h-3" />
            <span>Visit</span>
          </a>
        )}
      </div>
      
      <p className="mb-4 text-foreground/80">{experience.description}</p>
      
      <div className="space-y-2">
        <h4 className="font-medium text-foreground/90">Key Learnings:</h4>
        <ul className="space-y-2">
          {experience.responsibilities.map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.1 * i + 0.3 }}
              className="flex items-start gap-2"
            >
              <ArrowRight className="w-4 h-4 mt-1 min-w-[16px] text-neon-purple" />
              <span className="text-foreground/70">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  return (
    <section id="experience" className="py-20 sm:py-32 relative">
      <div 
        className="absolute top-1/4 left-1/3 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl -z-10"
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
            Work Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            A collection of my professional experiences and internships that have shaped my technical skills.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8">
          {experienceData.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              experience={experience} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}

const projects: Project[] = [
  {
    title: "TRAVEL PLANNER USING AI",
    description: "Developed an AI-driven Travel Planner to generate personalized itineraries based on user preferences. Integrating real-time travel updates and dynamic recommendations for accommodations and activities.",
    image: "/ai.png",
    tags: ["Artificial Intelligence", "Travel Planning", "Machine Learning", "Personalised Itinerary"],
    demoUrl: "",
    codeUrl: ""
  },
  {
    title: "TODOS - To-Do Lister ",
    description: "To-Do Lister app for task management with due dates and priorities. Designed an intuitive user interface for easy task tracking. system failures. ",
    image: "/todos.png",
    tags: ["Task Manager", "ToDoList", "HTML, CSS, & JS", "Project Management"],
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Parking Management System ",
    description: "A parking management system automates a car parking system. It optimizes parking space and makes processes efficient. It gives real-time car parking information such as vehicle & slot counts, available slots display, reserved parking, reports, and a host of other features. ",
    image: "/parking.png",
    tags: ["Parking Management", "Python","Smart Parking", "HTML & CSS"],
    demoUrl: "",
    codeUrl: ""
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group perspective"
    >
      <div className="glass-card overflow-hidden transition-all duration-500 transform preserve-3d group-hover:shadow-xl">
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-foreground/70 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-background/50 backdrop-blur-sm text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4">
            
              <Github className="w-4 h-4" />
              <span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <section id="projects" className="py-12 sm:py-20 relative">
      <div 
        className="absolute top-1/4 right-0 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl -z-10"
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
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            A selection of my recent work, showcasing my skills in web development, UI/UX design, and creative problem-solving.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a 
            href="#" 
            className="inline-block border border-foreground/20 hover:border-foreground/40 px-6 py-3 rounded-full font-medium transition-colors"
          >
            HOME
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

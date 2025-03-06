import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // ✅ Updated handleSubmit function to use Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = { name, email, message };

    try {
      const response = await fetch("https://formspree.io/f/myzegedw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you as soon as possible.",
        });

        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: "Error sending message",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "akshitarao453@gmail.com",
      link: "mailto:akshitarao453@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+91 9346989823",
      link: "tel:+919346989823",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Hyderabad, Telangana",
      link: "",
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-32 relative" ref={sectionRef}>
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl -z-10"
        style={{ opacity: isInView ? 0.6 : 0 }}
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Further discussion? Keep in touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-foreground/80 mb-8">
                I'm always open to discussing new opportunities to be part of your vision.
                Use the form or contact me directly through the following channels.
              </p>

              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center p-4 glass-card hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">{item.title}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card p-6 md:p-8">
              {/* ✅ Removed "action" and updated onSubmit */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-foreground text-background py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                  {isSubmitting ? <span>Sending...</span> : <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

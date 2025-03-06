
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-background/80 hover:bg-background transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-foreground/70" />
        )}
      </button>
    </div>
  );
};

const DeploymentStep: React.FC<{
  title: string;
  children: React.ReactNode;
  step: number;
}> = ({ title, children, step }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: step * 0.1 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {step}
        </span>
        {title}
      </h3>
      <div className="ml-10">{children}</div>
    </motion.div>
  );
};

const DeploymentGuide: React.FC = () => {
  return (
    <section id="deployment" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Deployment Guide</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Follow these steps to deploy your portfolio project. Choose the deployment option that works best for your needs.
          </p>
        </motion.div>

        <div className="space-y-12">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Prerequisites</h3>
            <ul className="space-y-2 ml-6 list-disc text-foreground/80">
              <li>Node.js (v14.0.0 or higher)</li>
              <li>npm (v6.0.0 or higher)</li>
              <li>Git (for version control)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Local Development</h3>
            
            <DeploymentStep title="Clone the Repository" step={1}>
              <p className="text-foreground/80 mb-3">
                Start by cloning the repository to your local machine.
              </p>
              <CodeBlock code="git clone <your-repository-url>\ncd portfolio" />
            </DeploymentStep>
            
            <DeploymentStep title="Install Dependencies" step={2}>
              <p className="text-foreground/80 mb-3">
                Install all the required packages for your project.
              </p>
              <CodeBlock code="npm install" />
            </DeploymentStep>
            
            <DeploymentStep title="Start Development Server" step={3}>
              <p className="text-foreground/80 mb-3">
                Run the development server to start working on your project.
              </p>
              <CodeBlock code="npm run dev" />
              <p className="text-foreground/80 mt-2">
                This will start the development server at http://localhost:8080
              </p>
            </DeploymentStep>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Building for Production</h3>
            
            <DeploymentStep title="Create Production Build" step={1}>
              <p className="text-foreground/80 mb-3">
                Create an optimized production build of your portfolio.
              </p>
              <CodeBlock code="npm run build" />
              <p className="text-foreground/80 mt-2">
                This generates optimized files in the <code>dist</code> directory.
              </p>
            </DeploymentStep>
            
            <DeploymentStep title="Preview Production Build" step={2}>
              <p className="text-foreground/80 mb-3">
                Preview the production build locally before deploying.
              </p>
              <CodeBlock code="npm run preview" />
            </DeploymentStep>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Deployment Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-neon-cyan">Netlify</span>
                  <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Netlify">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </h4>
                <ol className="space-y-2 ml-6 list-decimal text-foreground/80">
                  <li>Create an account on Netlify</li>
                  <li>Connect your GitHub repository</li>
                  <li>
                    Configure build settings:
                    <ul className="ml-6 list-disc mt-1">
                      <li>Build command: <code>npm run build</code></li>
                      <li>Publish directory: <code>dist</code></li>
                    </ul>
                  </li>
                  <li>Deploy the site</li>
                </ol>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-neon-purple">Vercel</span>
                  <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Vercel">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </h4>
                <ol className="space-y-2 ml-6 list-decimal text-foreground/80">
                  <li>Create an account on Vercel</li>
                  <li>Connect your GitHub repository</li>
                  <li>Vercel will automatically detect your Vite project</li>
                  <li>Configure any environment variables if needed</li>
                  <li>Deploy the site</li>
                </ol>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-neon-pink">GitHub Pages</span>
                  <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Pages">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </h4>
                <ol className="space-y-2 ml-6 list-decimal text-foreground/80">
                  <li>
                    Install gh-pages package:
                    <CodeBlock code="npm install -D gh-pages" />
                  </li>
                  <li>
                    Add these scripts to your package.json:
                    <CodeBlock 
                      code={`"scripts": {\n  "predeploy": "npm run build",\n  "deploy": "gh-pages -d dist"\n}`} 
                      language="json" 
                    />
                  </li>
                  <li>
                    Configure Vite for GitHub Pages (in vite.config.ts):
                    <CodeBlock 
                      code={`base: '/your-repo-name/'`} 
                      language="typescript" 
                    />
                  </li>
                  <li>
                    Deploy to GitHub Pages:
                    <CodeBlock code="npm run deploy" />
                  </li>
                </ol>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Traditional Hosting</h4>
                <ol className="space-y-2 ml-6 list-decimal text-foreground/80">
                  <li>
                    Build the project:
                    <CodeBlock code="npm run build" />
                  </li>
                  <li>Upload the contents of the <code>dist</code> directory to your web server via FTP or other methods</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Troubleshooting</h3>
            <ul className="space-y-3 ml-6 list-disc text-foreground/80">
              <li>If you encounter CORS issues with the Three.js textures, make sure all assets are properly referenced and accessible.</li>
              <li>For problems with Tailwind CSS not applying styles correctly, verify that the PostCSS configuration is correct.</li>
              <li>If the 3D canvas doesn't render correctly, check the browser console for any Three.js errors.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentGuide;

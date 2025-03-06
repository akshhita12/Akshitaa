
# Portfolio Project Deployment Guide

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start the development server at http://localhost:8080

## Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```
   This will generate optimized production files in the `dist` directory.

2. **Preview the production build locally**
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy the site

### Option 2: Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Connect your GitHub repository
3. Vercel will automatically detect your Vite project
4. Configure any environment variables if needed
5. Deploy the site

### Option 3: GitHub Pages

1. Install gh-pages package:
   ```bash
   npm install -D gh-pages
   ```

2. Add these scripts to your package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Configure Vite for GitHub Pages (add to vite.config.ts):
   ```typescript
   base: '/your-repo-name/'
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Option 4: Traditional Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` directory to your web server via FTP or other methods

## Troubleshooting

- If you encounter CORS issues with the Three.js textures, make sure all assets are properly referenced and accessible.
- For problems with Tailwind CSS not applying styles correctly, verify that the PostCSS configuration is correct.
- If the 3D canvas doesn't render correctly, check the browser console for any Three.js errors.

## Performance Optimization

- Consider lazy loading components that aren't immediately visible
- Optimize images with tools like [Squoosh](https://squoosh.app/)
- Use the Lighthouse tool in Chrome DevTools to identify performance bottlenecks

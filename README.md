# Pierry Borges - Personal Blog & Portfolio

A modern, professional single-page personal blog built with React, TypeScript, and Tailwind CSS. This repository powers my GitHub Pages site at [pierry.github.io](https://pierry.github.io).

## Table of Contents

- [Live Site](#live-site)
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Content Management](#content-management)
- [Deployment](#deployment)
- [Development Statistics](#development-statistics)
- [Available Scripts](#available-scripts)
- [Contact](#contact)

## Live Site

**Visit:** [https://pierry.github.io](https://pierry.github.io)

The live site showcases a professional personal blog with dynamic content, GitHub integration, and responsive design optimized for all devices.

## Project Overview

This personal blog and portfolio website serves as a comprehensive platform for technical content and professional presence. The site features several key components:

**Dynamic GitHub Stats Integration**
- Real-time repository statistics and contribution data
- Visual representation of coding activity and project involvement
- Direct integration with GitHub API for live updates

**Current Focus Display**
- Automatically fetches and displays README content from the main [pierry](https://github.com/Pierry/pierry) repository
- Provides visitors with real-time insights into current projects and development focus
- Formatted markdown rendering with proper styling

**Articles System**
- Technical articles and comprehensive tool reviews
- "Tested" badges for personally validated tools and services
- Organized categorization for easy navigation
- TypeScript-based content management for type safety

**Professional Design**
- Clean, sophisticated layout using Noto Sans typography
- Muted color palette for professional appearance
- Subtle animations and hover effects
- Card-based layout with backdrop blur effects

**Responsive Architecture**
- Mobile-first design approach
- Optimized for all device sizes and orientations
- Progressive enhancement for better user experience

## Architecture

### Technology Stack

The project utilizes modern web technologies for optimal performance and maintainability:

**Frontend Framework**
- React 18 with functional components and hooks
- TypeScript for type safety and better developer experience
- Modern ES6+ JavaScript features

**Styling and UI**
- Tailwind CSS for utility-first styling approach
- shadcn/ui component library for consistent UI elements
- Custom CSS layers for specialized styling needs
- Google Fonts integration (Noto Sans, JetBrains Mono)

**Build and Development Tools**
- Vite for fast development server and optimized builds
- ESLint for code quality and consistency
- TypeScript compiler for type checking

**Deployment and Hosting**
- GitHub Pages for static site hosting
- gh-pages package for automated deployment
- Single-branch deployment workflow

**External Integrations**
- Lucide React for consistent iconography
- GitHub API for dynamic content fetching
- Custom components for external data visualization

### Project Structure

```
src/
├── articles/           # Dynamic article management system
│   ├── index.ts       # Central article registry and exports
│   ├── README.md      # Comprehensive article creation guide
│   └── *.ts           # Individual article files with metadata
├── components/
│   ├── ui/            # Reusable UI components from shadcn/ui
│   └── ReadmeDisplay.tsx  # GitHub README fetcher and renderer
├── pages/
│   └── Index.tsx      # Main application page component
├── utils/
│   └── dateUtils.ts   # Date formatting and manipulation utilities
└── lib/
    └── utils.ts       # Shared utility functions and helpers
```

## Quick Start

### System Requirements

**Prerequisites**
- Node.js version 18 or higher
- npm (comes with Node.js) or yarn package manager
- Git for version control
- Modern web browser for development

### Development Environment Setup

**1. Repository Setup**
```bash
git clone https://github.com/Pierry/pierry.github.io.git
cd pierry.github.io
```

**2. Dependency Installation**
```bash
npm install
```
This command installs all required dependencies including React, TypeScript, Tailwind CSS, and development tools.

**3. Development Server**
```bash
npm run dev
```
Starts the Vite development server with hot module replacement for instant updates during development.

**4. Access Application**
Open your browser and navigate to `http://localhost:5173` to view the application in development mode.

## Content Management

### Article Creation System

The blog uses a TypeScript-based article management system for type safety and easy maintenance. This approach provides several advantages:

**Type Safety**
- Compile-time validation of article structure
- IntelliSense support in development environments
- Reduced runtime errors from malformed content

**Easy Maintenance**
- Centralized article registry for simple management
- Consistent structure across all articles
- Version control integration for content history

**Automated Processing**
- Automatic date formatting from ISO strings
- Dynamic badge generation based on metadata
- Seamless integration with the main application

### Adding New Articles

**Step 1: Create Article File**

Create a new TypeScript file in the `src/articles/` directory following the naming convention `article-slug.ts`:

```typescript
export const myNewArticle = {
  title: "Comprehensive Article Title",
  description: "Detailed description of the article content and purpose",
  slug: "unique-article-identifier",
  createdAt: "2025-08-07", // ISO date format (YYYY-MM-DD)
  content: {
    categories: {
      "Category Name": [
        { 
          name: "Tool or Service Name", 
          description: "Detailed description of functionality", 
          cost: "Free|Freemium|Paid|Open-source", 
          link: "https://example.com",
          tested: true // Optional: displays green "Tested" badge
        }
        // Additional items...
      ]
      // Additional categories...
    }
  }
};
```

**Step 2: Register Article**

Add the new article to the central registry in `src/articles/index.ts`:

```typescript
import { myNewArticle } from './my-new-article';
import { existingArticle } from './existing-article';

export const articles: Article[] = [
  myNewArticle,     // New articles should be added at the top
  existingArticle,  // Existing articles in chronological order
  // Additional articles...
];
```


## Deployment

### Automated Deployment Process

The deployment system uses GitHub Pages with a streamlined workflow for consistent and reliable publishing.

**Build Process**
```bash
npm run build    # Creates optimized production bundle
npm run deploy   # Publishes to gh-pages branch
```

The build process optimizes all assets, minifies code, and generates static files ready for production hosting.

**GitHub Pages Configuration**
- Source branch configured to serve from gh-pages
- Automatic deployment when gh-pages branch updates
- Custom domain configuration available but not currently implemented
- HTTPS enabled by default through GitHub Pages

**Deployment Workflow**
1. Local development and testing
2. Production build generation with asset optimization
3. Deployment to gh-pages branch via automated script
4. GitHub Pages automatic publication of updated content


## Development Statistics

### Actual Development Time (Today)

This entire project was built in one session using Claude Code AI assistance.

| Task | Time Spent | Description |
|------|------------|-------------|
| **Initial Setup** | ~30 minutes | Transform existing site to modern React/TypeScript blog |
| **Articles System** | ~45 minutes | Create dynamic article system with TypeScript files |
| **Design & Styling** | ~30 minutes | Implement Noto Sans, sophisticated badges, modern colors |
| **GitHub Integration** | ~20 minutes | Add GitHub stats and README display component |
| **Contact Updates** | ~10 minutes | Fix LinkedIn, email, and remove unprofessional favicon |
| **Documentation** | ~15 minutes | Create comprehensive README |
| **Deployment Setup** | ~10 minutes | Configure GitHub Pages deployment |

**Total Development Time**: ~2.5 hours

**Development Approach**: Real-time AI assistance with immediate testing and deployment. Everything was built from scratch in a single session with iterative improvements.

## Available Scripts

| Command | Purpose | Description |
|---------|---------|-------------|
| `npm run dev` | Development Server | Starts Vite development server with hot reload |
| `npm run build` | Production Build | Creates optimized bundle for deployment |
| `npm run preview` | Build Preview | Serves production build locally for testing |
| `npm run deploy` | GitHub Pages Deploy | Publishes built site to gh-pages branch |
| `npm run lint` | Code Quality Check | Runs ESLint for code consistency |


## Contact

**Professional Links**
- GitHub: [@Pierry](https://github.com/Pierry)
- LinkedIn: [pierryborges](https://www.linkedin.com/in/pierryborges/)
- Email: pieerry@gmail.com

---

**Copyright 2025 Pierry Borges. All rights reserved.**
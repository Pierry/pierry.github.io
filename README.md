# Pierry Borges - Personal Blog & Portfolio

A modern, professional single-page personal blog built with React, TypeScript, and Tailwind CSS. This repository powers my GitHub Pages site at [pierry.github.io](https://pierry.github.io).

## 🌐 Live Site

**Visit:** [https://pierry.github.io](https://pierry.github.io)

## 📋 Project Overview

This is my personal blog and portfolio website featuring:
- **Dynamic GitHub Stats**: Live data from my repositories and contributions
- **Current Focus Display**: Real-time README from my main [pierry](https://github.com/Pierry/pierry) repository
- **Articles System**: Technical articles and tool reviews with "tested" badges
- **Professional Design**: Clean, sophisticated layout with Noto Sans typography
- **Responsive**: Mobile-first design that works on all devices

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Deployment**: GitHub Pages via gh-pages
- **Icons**: Lucide React
- **Fonts**: Noto Sans + JetBrains Mono

### Project Structure
```
src/
├── articles/           # Dynamic article system
│   ├── index.ts       # Article registry
│   ├── README.md      # Article creation guide
│   └── *.ts           # Individual article files
├── components/
│   ├── ui/            # Reusable UI components (shadcn/ui)
│   └── ReadmeDisplay.tsx  # GitHub README fetcher
├── pages/
│   └── Index.tsx      # Main page component
├── utils/
│   └── dateUtils.ts   # Date formatting utilities
└── lib/
    └── utils.ts       # Utility functions
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Development Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Pierry/pierry.github.io.git
   cd pierry.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

## 📝 Content Management

### Adding Articles
Articles are managed through TypeScript files for type safety and easy maintenance:

1. **Create new article file**: `src/articles/my-article.ts`
   ```typescript
   export const myArticle = {
     title: "My Article Title",
     description: "Brief description",
     slug: "my-article-slug",
     createdAt: "2025-08-07", // YYYY-MM-DD
     content: {
       categories: {
         "Tools": [
           { 
             name: "Tool Name", 
             description: "Description", 
             cost: "Free|Freemium|Paid|Open-source", 
             link: "https://example.com",
             tested: true // Shows green "Tested" badge
           }
         ]
       }
     }
   };
   ```

2. **Register in index**: Add to `src/articles/index.ts`

### GitHub Integration
- **Stats**: Automatically pulls from GitHub API
- **README Display**: Fetches and renders README from [Pierry/pierry](https://github.com/Pierry/pierry) repository
- **Live Updates**: Content updates when repository changes

## 🎨 Design System

### Visual Identity
- **Colors**: Professional blue/purple gradients with sophisticated gray badges
- **Typography**: Noto Sans for readability, JetBrains Mono for code
- **Layout**: Card-based design with subtle shadows and blur effects
- **Badges**: Muted, sophisticated styling instead of bright colors

### Components
- **Navigation**: Fixed header with smooth scrolling
- **Stats Cards**: GitHub activity visualization
- **Article Cards**: Clean layout with tested badges
- **Contact Cards**: Interactive hover effects

## 🚀 Deployment

### Automatic Deployment
```bash
npm run build    # Build for production
npm run deploy   # Deploy to gh-pages branch
```

### GitHub Pages Configuration
- **Source**: Deploy from `gh-pages` branch
- **Custom Domain**: Not configured (using pierry.github.io)
- **Build Process**: Manual via npm scripts

## 📊 Features

### Current Implementation
✅ **GitHub Stats Integration**  
✅ **Dynamic README Display**  
✅ **Article Management System**  
✅ **Responsive Design**  
✅ **Professional Badge System**  
✅ **Contact Information**  
✅ **SEO Optimized**  

### Planned Enhancements
🔄 **Dark/Light Mode Toggle**  
🔄 **Search Functionality**  
🔄 **RSS Feed**  
🔄 **Analytics Integration**  

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run lint` | Run ESLint |

## 🌍 Browser Support

- **Chrome**: ✅ Latest 2 versions
- **Firefox**: ✅ Latest 2 versions  
- **Safari**: ✅ Latest 2 versions
- **Edge**: ✅ Latest 2 versions
- **Mobile**: ✅ iOS Safari, Chrome Mobile

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal blog, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📞 Contact

- **GitHub**: [@Pierry](https://github.com/Pierry)
- **LinkedIn**: [pierryborges](https://www.linkedin.com/in/pierryborges/)
- **Email**: pieerry@gmail.com

---

**© 2025 Pierry Borges. All rights reserved.**
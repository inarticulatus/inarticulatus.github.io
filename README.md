# Utkarsh Tripathi — Portfolio

Personal portfolio website showcasing data engineering projects, ML research, and professional experience.

**Live:** [inarticulatus.github.io](https://inarticulatus.github.io)

## Tech Stack

- **Framework:** [Astro](https://astro.build) v5
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4
- **Math Rendering:** KaTeX (via remark-math + rehype-katex)
- **Content:** MDX for blog posts
- **Deployment:** GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── landing/       # Hero, Work, Research, Experience, Expertise
│   └── global/        # Navigation, Footer
├── content/projects/  # MDX blog posts
├── layouts/           # BaseLayout, BlogLayout
├── pages/             # Routes (index, about, projects)
└── styles/            # global.css with Tailwind theme
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- **Light summery theme** with cream background and coral accents
- **Horizontal timeline** for experience section
- **Dynamic project filtering** by category
- **LaTeX support** for mathematical content in blog posts
- **Responsive design** with mobile-first approach
- **Automatic copyright year** in footer

## License

© Utkarsh Tripathi. All rights reserved.

# Protein Pathway Visualization

## Overview
Protein Pathway is a web application for visualizing protein interactions and pathways. Built using React and Vite, it provides an intuitive interface for exploring biological data.

## Features
- Interactive visualization of protein pathways
- Fast performance with Vite
- Styled using TailwindCSS
- Cytoscape.js (Graph visualization library)
- SweetAlert2 (Custom alerts and modals)
- ESLint (Linting and code formatting)
- Modular and scalable architecture


## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Git](https://git-scm.com/)

## Getting Started
Follow these steps to set up the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/Hakam-aldeen-Kh/Protein-Pathway.git
cd Protein-Pathway
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Development Server
```sh
npm run dev
```
This will start a local development server, usually accessible at `http://localhost:5173/`.

### 4. Linting
```sh
npm run lint
```

## Project Structure
```
Protein-Pathway/
│-- public/            # Static assets
│-- src/               # Source code
│   │-- components/    # Reusable React components
│   │-- pages/         # Page components
│   │-- assets/        # Images, icons, etc.
│   │-- styles/        # TailwindCSS configuration
│   └-- main.jsx       # Application entry point
│-- .eslintrc.json     # ESLint configuration
│-- tailwind.config.js # TailwindCSS setup
│-- vite.config.js     # Vite configuration
│-- package.json       # Project metadata and dependencies
└-- README.md          # Project documentation
```

## Deployment
To deploy the application, follow these steps:

### 1. Build the Project
```sh
npm run build
```
This will generate a `dist/` folder containing the production-ready files.

### 2. Deploy to GitHub Pages (Optional)
Ensure that the `homepage` field in `package.json` is set correctly, then run:
```sh
npm run deploy
```

### 3. Deploy to Vercel (Recommended)
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```
   Follow the prompts to set up the deployment.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a Pull Request.

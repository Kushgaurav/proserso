# Proserso Frontend

A modern React application for Proserso's digital presence, empowering clients and society through technology solutions.

## Overview

This project serves as the frontend interface for Proserso's services, built with React and modern web technologies. It follows a component-based architecture with a focus on performance, accessibility, and user experience.

## Technologies Used

- React
- CSS Modules
- Modern JavaScript (ES6+)
- Responsive Design
- CSS Custom Properties

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Available Scripts

#### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

#### `npm test`
Launches the test runner in interactive watch mode

#### `npm run build`
Builds the app for production to the `build` folder

#### `npm run lint`
Runs ESLint to check code quality

## Project Structure

```
src/
├── assets/         # Images and static assets
├── components/     # Reusable UI components
├── data/          # Static data and configurations
├── pages/         # Page components
└── styles/        # CSS styles
```

## Design System

The project follows a comprehensive design system detailed in:
- [Typography System](../typography.md)
- [Color Palette](../colour_palette.md)
- [Design Guidelines](../design_guidelines.md)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow ESLint and Prettier configurations
- Write meaningful component and function names
- Include JSDoc comments for complex functions

### CSS Guidelines
- Use CSS variables for theming
- Follow BEM naming convention
- Maintain responsive design principles
- Ensure accessibility compliance

### Git Workflow
1. Create feature branches from `develop`
2. Use conventional commit messages
3. Submit PRs for review
4. Squash merge to maintain clean history

## Performance Optimization

- Lazy loading for routes
- Image optimization
- Code splitting
- Performance monitoring with Lighthouse

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Related Documentation

- [Backend API Documentation](../backend_roadmap.md)
- [Website Development Roadmap](../website_roadmap.md)

## License

This project is private and confidential. All rights reserved.

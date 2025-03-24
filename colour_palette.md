# Color System

## Table of Contents
- [Brand Colors](#brand-colors)
- [Extended Palette](#extended-palette)
- [Color Variables](#color-variables)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Color Usage](#color-usage)
- [Dark Mode](#dark-mode)
- [Implementation](#implementation)
- [Related Documents](#related-documents)

## Brand Colors

### Primary Colors
- **Brand Blue:** #007BFF
  - Main brand color
  - Used for primary actions, links, and key UI elements
  - Active states: darken 10% (#0056b3)
  - Hover states: darken 5% (#0062cc)

- **Secondary Gray:** #6C757D
  - Supporting color
  - Used for secondary actions and muted text
  - Active states: darken 10% (#545b62)
  - Hover states: darken 5% (#5a6268)

### Extended Brand Colors
- **Success Green:** #28A745
  - Positive actions and confirmations
  - Form success states
  - Progress indicators

- **Warning Yellow:** #FFC107
  - Cautionary messages
  - Important notifications
  - Pending states

- **Error Red:** #DC3545
  - Error messages
  - Destructive actions
  - Critical alerts

## Extended Palette

### Neutral Colors
- **Background Light:** #F8F9FA
  - Page backgrounds
  - Card backgrounds
  - Light mode base

- **Text Dark:** #212529
  - Primary text color
  - Headings
  - High-contrast elements

### Gray Scale
| Name          | Hex     | Usage                    |
|---------------|---------|--------------------------|
| Gray-100      | #F8F9FA | Light backgrounds        |
| Gray-200      | #E9ECEF | Borders, dividers        |
| Gray-300      | #DEE2E6 | Disabled states          |
| Gray-400      | #CED4DA | Placeholder text         |
| Gray-500      | #ADB5BD | Muted text              |
| Gray-600      | #6C757D | Secondary text           |
| Gray-700      | #495057 | Body text               |
| Gray-800      | #343A40 | Headings                |
| Gray-900      | #212529 | Dark text               |

## Color Variables

### CSS Implementation
```css
:root {
  /* Primary Colors */
  --color-primary: #007BFF;
  --color-primary-dark: #0056b3;
  --color-primary-light: #cce5ff;
  
  /* Secondary Colors */
  --color-secondary: #6C757D;
  --color-secondary-dark: #545b62;
  --color-secondary-light: #f8f9fa;
  
  /* Accent Colors */
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-error: #DC3545;
  
  /* Neutral Colors */
  --color-background: #F8F9FA;
  --color-text: #212529;
  --color-text-muted: #6C757D;
  
  /* Dark Mode */
  --color-dark-bg: #121212;
  --color-dark-surface: #1E1E1E;
  --color-dark-text: #FFFFFF;
}
```

## Accessibility Guidelines

### WCAG 2.1 Compliance
| Color Combination       | Contrast Ratio | WCAG Level |
|------------------------|----------------|------------|
| Primary on White       | 7.21:1        | AAA        |
| Secondary on White     | 4.48:1        | AA         |
| Text on Background     | 14.5:1        | AAA        |
| Primary on Dark        | 4.52:1        | AA         |

### Best Practices
- Ensure text meets WCAG AA standards minimum (4.5:1)
- Use darker shades for text on light backgrounds
- Provide sufficient contrast for interactive elements
- Consider color blindness in design choices

## Color Usage

### Interface Elements
- **Primary Actions**
  - Buttons: Primary blue
  - Links: Primary blue
  - Selected states: Primary blue

- **Secondary Actions**
  - Alternative buttons: Secondary gray
  - Cancel actions: Secondary gray
  - Supporting elements: Secondary gray

- **Feedback States**
  - Success: Green
  - Warning: Yellow
  - Error: Red
  - Info: Primary blue

### Content
- **Text Hierarchy**
  - Primary text: Dark gray (#212529)
  - Secondary text: Medium gray (#6C757D)
  - Disabled text: Light gray (#CED4DA)

- **Backgrounds**
  - Main background: Light gray (#F8F9FA)
  - Card background: White (#FFFFFF)
  - Elevated surfaces: White with shadow

## Dark Mode

### Color Mapping
```css
[data-theme="dark"] {
  --color-background: #121212;
  --color-surface: #1E1E1E;
  --color-text: #FFFFFF;
  --color-text-muted: rgba(255, 255, 255, 0.7);
  --color-border: rgba(255, 255, 255, 0.1);
  
  /* Adjusted Brand Colors */
  --color-primary: #66B2FF;
  --color-secondary: #A1A8AE;
  --color-success: #5DD879;
  --color-warning: #FFD54F;
  --color-error: #EF5350;
}
```

### Dark Mode Considerations
- Reduce contrast for comfortable viewing
- Maintain WCAG compliance
- Adjust colors for dark backgrounds
- Consider eye strain reduction
- Test in low-light conditions

## Implementation

### Usage Examples
```css
/* Button Styles */
.button-primary {
  background-color: var(--color-primary);
  color: white;
}

/* Text Styles */
.text-body {
  color: var(--color-text);
}

/* Alert Styles */
.alert-success {
  background-color: var(--color-success);
  color: white;
}
```

### Color Modifiers
- Use CSS custom properties for consistent theming
- Implement color variations through HSL adjustments
- Maintain semantic color naming
- Support dark mode through CSS variables
- Use opacity for subtle variations

## Related Documents
- [Design Guidelines](./design_guidelines.md)
- [Typography System](./typography.md)
- [Website Roadmap](./website_roadmap.md)

### [2025-03-18] - Updated Documentation
- Updated codebase.md to include recent changes related to Profile, BlogPost components, and AuthContext.

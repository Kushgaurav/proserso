# Typography System

## Table of Contents
- [Font Stack](#font-stack)
- [Type Scale](#type-scale)
- [Font Weights](#font-weights)
- [Line Heights](#line-heights)
- [Spacing System](#spacing-system)
- [Responsive Typography](#responsive-typography)
- [Implementation](#implementation)
- [Best Practices](#best-practices)
- [Related Documents](#related-documents)

## Font Stack

### Primary Font
- **Font Family:** 'Roboto'
- **Usage:** Headings, buttons, navigation
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, sans-serif

### Secondary Font
- **Font Family:** 'Open Sans'
- **Usage:** Body text, paragraphs, lists
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, sans-serif

### Monospace Font
- **Font Family:** 'Roboto Mono'
- **Usage:** Code blocks, technical content
- **Fallback:** source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace

## Type Scale

### Base Sizes
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

### Heading Sizes
| Element | Size     | Weight | Line Height |
|---------|----------|---------|------------|
| h1      | 2.5rem   | 700     | 1.2        |
| h2      | 2rem     | 700     | 1.2        |
| h3      | 1.75rem  | 600     | 1.3        |
| h4      | 1.5rem   | 600     | 1.3        |
| h5      | 1.25rem  | 600     | 1.4        |
| h6      | 1rem     | 600     | 1.4        |

## Font Weights

### Weight Scale
```css
:root {
  --font-thin: 100;
  --font-extralight: 200;
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### Weight Usage
- **Regular (400):** Body text, paragraphs
- **Medium (500):** Emphasis, subheadings
- **Semibold (600):** Strong emphasis, buttons
- **Bold (700):** Headings, important text
- **Extrabold (800):** Hero headlines

## Line Heights

### Base Line Heights
```css
:root {
  --leading-none: 1;      /* Headings */
  --leading-tight: 1.25;  /* Compact text */
  --leading-snug: 1.375;  /* Subheadings */
  --leading-normal: 1.5;  /* Body text */
  --leading-relaxed: 1.625; /* Large text */
  --leading-loose: 2;     /* Spacious text */
}
```

### Usage Guidelines
- Headings: 1.2-1.3
- Body text: 1.5-1.6
- Small text: 1.4
- Large text: 1.6-1.8

## Spacing System

### Vertical Rhythm
```css
:root {
  --baseline: 8px;
  --spacing-0: 0;
  --spacing-1: calc(var(--baseline) * 0.5);  /* 4px */
  --spacing-2: var(--baseline);              /* 8px */
  --spacing-3: calc(var(--baseline) * 1.5);  /* 12px */
  --spacing-4: calc(var(--baseline) * 2);    /* 16px */
  --spacing-6: calc(var(--baseline) * 3);    /* 24px */
  --spacing-8: calc(var(--baseline) * 4);    /* 32px */
  --spacing-12: calc(var(--baseline) * 6);   /* 48px */
  --spacing-16: calc(var(--baseline) * 8);   /* 64px */
}
```

### Margin Rules
- Headings: Bottom margin 1em
- Paragraphs: Bottom margin 1.5em
- Lists: Item spacing 0.5em
- Sections: Spacing 2-3em

## Responsive Typography

### Fluid Typography
```css
/* Example of fluid typography */
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;
  --fluid-min-size: 16;
  --fluid-max-size: 18;
  --fluid-min-ratio: 1.2;
  --fluid-max-ratio: 1.333;
}

html {
  font-size: clamp(
    var(--fluid-min-size)px,
    calc(1rem + ((1vw - var(--fluid-min-width)px/100) * var(--fluid-ratio))),
    var(--fluid-max-size)px
  );
}
```

### Breakpoint Scale
| Breakpoint | Base Size | Scale Ratio |
|------------|-----------|-------------|
| < 640px    | 16px      | 1.2         |
| 640-1024px | 16px      | 1.25        |
| > 1024px   | 18px      | 1.333       |

## Implementation

### CSS Variables
```css
:root {
  /* Font Families */
  --font-primary: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Roboto Mono', source-code-pro, monospace;

  /* Font Sizes */
  --text-base: 1rem;
  --text-scale-ratio: 1.25;

  /* Calculated Sizes */
  --text-xs: calc(var(--text-base) / var(--text-scale-ratio));
  --text-sm: calc(var(--text-base) / sqrt(var(--text-scale-ratio)));
  --text-lg: calc(var(--text-base) * sqrt(var(--text-scale-ratio)));
  --text-xl: calc(var(--text-base) * var(--text-scale-ratio));
  --text-2xl: calc(var(--text-base) * var(--text-scale-ratio) * var(--text-scale-ratio));
}
```

### Usage Examples
```css
/* Heading Styles */
h1 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

/* Body Text */
p {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}
```

## Best Practices

### Performance
- Preload critical fonts
- Use font-display: swap
- Subset large font files
- Implement progressive loading
- Cache font files effectively

### Accessibility
- Maintain minimum font sizes (16px body)
- Ensure sufficient contrast
- Support text zoom
- Use relative units
- Consider dyslexic users

### Responsive Design
- Use fluid typography
- Test on various devices
- Maintain readability
- Adjust line lengths
- Consider orientation

## Related Documents
- [Design Guidelines](./design_guidelines.md)
- [Color Palette](./colour_palette.md)
- [Website Roadmap](./website_roadmap.md)

### [2025-03-18] - Updated Documentation
- Updated codebase.md to include recent changes related to Profile, BlogPost components, and AuthContext.

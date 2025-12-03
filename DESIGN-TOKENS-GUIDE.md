# Design Tokens Implementation Guide

## What are Design Tokens?

Design tokens are reusable values that represent your design system. Instead of hardcoding colors, spacing, fonts, etc., you define them once and reference them throughout your CSS. This creates:

- **Consistency**: Same values used everywhere
- **Maintainability**: Change one token, update everywhere
- **Scalability**: Easy to add new variations (dark mode, themes)
- **Documentation**: Self-documenting design system

---

## Your Design Token Structure

### 1. **Color Tokens**

#### Primary Colors
```css
--color-primary: #007BFF;           /* Main brand blue */
--color-primary-dark: #0056b3;      /* Darker for hover states */
--color-primary-light: #E8F4FD;     /* Light version for backgrounds */
```

**Usage:**
```css
.button {
    background-color: var(--color-primary);
}

.button:hover {
    background-color: var(--color-primary-dark);
}

.button-light {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
}
```

#### Text Colors
```css
--color-text-primary: #2E3A52;      /* Main body text */
--color-text-secondary: #5D6C8A;    /* Supporting text */
--color-text-on-dark: #ffffff;      /* Text on dark backgrounds */
```

#### Background Colors
```css
--color-bg-primary: #ffffff;        /* Main white */
--color-bg-secondary: #F8F9FB;      /* Light gray page background */
--color-bg-tertiary: #F5F8FF;       /* Light blue for cards */
```

---

### 2. **Typography Tokens**

#### Font Families
```css
--font-family-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...;
--font-family-display: 'Inter', sans-serif;
```

#### Font Sizes (Scale-based)
```css
--font-size-xs: 0.75rem;    /* 12px - small labels */
--font-size-sm: 0.875rem;   /* 14px - captions */
--font-size-base: 1rem;     /* 16px - body text */
--font-size-md: 1.1rem;     /* 17.6px - slightly larger body */
--font-size-5xl: 2rem;      /* 32px - h1 */
--font-size-6xl: 3rem;      /* 48px - large h1 */
```

#### Font Weights
```css
--font-weight-regular: 400;    /* Normal text */
--font-weight-semibold: 600;   /* Labels, emphasis */
--font-weight-bold: 700;       /* Headings */
```

#### Line Heights
```css
--line-height-tight: 1.2;      /* Headings */
--line-height-normal: 1.6;     /* Regular text */
--line-height-relaxed: 1.8;    /* Readable paragraphs */
```

**Usage:**
```css
h1 {
    font-family: var(--font-family-display);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
}

body {
    font-family: var(--font-family-system);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
}
```

---

### 3. **Spacing Tokens**

These create consistent spacing throughout your design:

```css
--spacing-xs: 4px;      /* Tiny gaps */
--spacing-sm: 8px;      /* Small gaps */
--spacing-md: 12px;     /* Medium gaps */
--spacing-lg: 16px;     /* Standard gap */
--spacing-xl: 20px;     /* Larger spacing */
--spacing-2xl: 30px;    /* Even larger */
--spacing-3xl: 40px;    /* Padding for sections */
--spacing-5xl: 60px;    /* Large section spacing */
```

**Usage:**
```css
.button {
    padding: var(--spacing-md) var(--spacing-lg);  /* 12px 16px */
    margin: var(--spacing-xl);                      /* 20px all sides */
}

.section {
    padding: var(--spacing-5xl) var(--spacing-3xl);  /* 60px 40px */
    margin-bottom: var(--spacing-2xl);               /* 30px */
}

.card {
    padding: var(--spacing-2xl);                    /* 30px */
    gap: var(--spacing-lg);                         /* 16px between items */
}
```

**Utility Classes (Already included):**
```html
<div class="p-lg mb-2xl">Content here</div>
<!-- p-lg = padding: 16px -->
<!-- mb-2xl = margin-bottom: 30px -->
```

---

### 4. **Border Radius Tokens**

```css
--radius-sm: 4px;       /* Subtle corners */
--radius-md: 8px;       /* Standard corners */
--radius-lg: 12px;      /* Rounded appearance */
--radius-xl: 16px;      /* More rounded */
--radius-full: 9999px;  /* Pills/circles */
```

**Usage:**
```css
.button {
    border-radius: var(--radius-md);    /* 8px */
}

.card {
    border-radius: var(--radius-lg);    /* 12px */
}

.badge {
    border-radius: var(--radius-full);  /* Fully rounded */
}
```

---

### 5. **Shadow Tokens**

Subtle shadows for depth and hierarchy:

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);      /* Minimal */
--shadow-md: 0 4px 15px rgba(0, 0, 0, 0.04);     /* Standard */
--shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.06);     /* Elevated */
--shadow-hover: 0 12px 28px rgba(0, 0, 0, 0.1);  /* On hover/interaction */
```

**Usage:**
```css
.card {
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--transition-normal);
}

.card:hover {
    box-shadow: var(--shadow-hover);
}
```

---

### 6. **Transition Tokens**

```css
--transition-fast: 0.2s ease;           /* Quick animations */
--transition-normal: 0.3s ease;         /* Standard animations */
--transition-slow: 0.5s ease;           /* Slower, deliberate */
--transition-cubic: 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* Easing curve */
```

**Usage:**
```css
.button {
    transition: all var(--transition-normal);  /* 0.3s ease */
}

a {
    transition: color var(--transition-fast);  /* 0.2s ease */
}
```

---

## Implementation Steps

### Step 1: Import Design Tokens
Add this to the top of your CSS files or in HTML `<head>`:

```html
<!-- In HTML head: -->
<link rel="stylesheet" href="design-tokens.css">
<link rel="stylesheet" href="styles.css">
```

Or at the top of `styles.css`:
```css
@import url('design-tokens.css');
```

### Step 2: Refactor Existing CSS
Replace hardcoded values with tokens:

**Before:**
```css
.button {
    background-color: #007BFF;
    color: #ffffff;
    padding: 14px 30px;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.button:hover {
    background-color: #0056b3;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}
```

**After:**
```css
.button {
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-md);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-md);
}

.button:hover {
    background-color: var(--color-primary-dark);
    box-shadow: var(--shadow-hover);
}
```

### Step 3: Update Your styles.css
Replace values systematically. Start with:

1. All color values → color tokens
2. All font sizes → font size tokens
3. All spacing (padding/margin) → spacing tokens
4. All border-radius → radius tokens
5. All box-shadows → shadow tokens
6. All transitions → transition tokens

**Example refactor for your existing code:**

```css
/* Current */
.section {
    background: #ffffff;
    padding: 60px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

/* With tokens */
.section {
    background: var(--color-bg-primary);
    padding: var(--spacing-5xl) var(--spacing-3xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}
```

---

## Benefits for Your Project

### 1. **Consistency**
All blues are `--color-primary`, not scattered `#007BFF` values.

### 2. **Quick Theme Updates**
To change your primary color everywhere:
```css
:root {
    --color-primary: #0066CC;  /* Change once, updates everywhere */
}
```

### 3. **Dark Mode Support** (Future)
```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-text-primary: #f0f0f0;
        --color-bg-primary: #1a1a1a;
        /* ... etc */
    }
}
```

### 4. **Accessibility**
Maintain proper contrast ratios by managing colors centrally.

### 5. **New Team Members**
Developers immediately understand available values without searching your CSS.

---

## Quick Reference: Common Replacements

| Current Value | Token | Use Case |
|---|---|---|
| `#007BFF` | `var(--color-primary)` | Buttons, links, accents |
| `#ffffff` | `var(--color-bg-primary)` | Card backgrounds |
| `#2E3A52` | `var(--color-text-primary)` | Body text |
| `#5D6C8A` | `var(--color-text-secondary)` | Secondary text |
| `14px 30px` | `var(--spacing-md) var(--spacing-xl)` | Button padding |
| `40px` | `var(--spacing-3xl)` | Section padding |
| `8px` | `var(--radius-md)` | Standard corners |
| `0.3s ease` | `var(--transition-normal)` | Animations |

---

## Next Steps

1. **Import** `design-tokens.css` into your project
2. **Audit** your `styles.css` and list all hardcoded values
3. **Refactor** sections at a time (start with one component)
4. **Test** after each section to ensure nothing breaks
5. **Document** any custom values you couldn't tokenize

This system scales beautifully as your portfolio grows!

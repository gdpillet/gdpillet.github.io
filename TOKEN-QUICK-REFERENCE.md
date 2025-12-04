# Design Tokens Migration - Quick Reference

## Before & After Examples

### Colors
```css
/* BEFORE */
color: #007BFF;                    → /* AFTER */ color: var(--color-primary);
background: #2E3A52;               → /* AFTER */ background: var(--color-text-primary);
border: 1px solid #E0E4EB;        → /* AFTER */ border: 1px solid var(--color-border);
```

### Spacing
```css
/* BEFORE */
padding: 40px;                     → /* AFTER */ padding: var(--spacing-3xl);
margin: 20px 0;                   → /* AFTER */ margin: var(--spacing-xl) 0;
gap: 30px;                        → /* AFTER */ gap: var(--spacing-2xl);
```

### Typography
```css
/* BEFORE */
font-size: 2rem;                  → /* AFTER */ font-size: var(--font-size-5xl);
font-weight: 700;                 → /* AFTER */ font-weight: var(--font-weight-bold);
line-height: 1.8;                 → /* AFTER */ line-height: var(--line-height-relaxed);
```

### Border Radius
```css
/* BEFORE */
border-radius: 8px;               → /* AFTER */ border-radius: var(--radius-md);
border-radius: 12px;              → /* AFTER */ border-radius: var(--radius-lg);
```

### Shadows
```css
/* BEFORE */
box-shadow: 0 4px 15px rgba(...); → /* AFTER */ box-shadow: var(--shadow-md);
box-shadow: 0 2px 8px rgba(...);  → /* AFTER */ box-shadow: var(--shadow-sm);
```

### Transitions
```css
/* BEFORE */
transition: all 0.3s ease;        → /* AFTER */ transition: all var(--transition-normal);
transition: color 0.2s ease;      → /* AFTER */ transition: color var(--transition-fast);
```

---

## Token Categories & Values

### Color Tokens
- **Primary:** `--color-primary` (#007BFF), `--color-primary-dark` (#0056b3), `--color-primary-light` (#E8F4FD)
- **Text:** `--color-text-primary`, `--color-text-secondary`, `--color-text-on-dark`
- **Backgrounds:** `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- **Semantic:** `--color-success`, `--color-warning`, `--color-error`
- **Borders:** `--color-border`, `--color-border-light`
- **Gradients:** `--gradient-cta`, `--gradient-stat-highlight`

### Spacing Tokens
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 30px
- 3xl: 40px
- 4xl: 50px
- 5xl: 60px

### Font Tokens
- **Family:** `--font-family-system`, `--font-family-display`
- **Size:** xs (12px) through 7xl (64px)
- **Weight:** regular (400), medium (500), semibold (600), bold (700)
- **Height:** tight (1.2), normal (1.6), relaxed (1.8)

### Border Radius Tokens
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

### Shadow Tokens
- sm: subtle
- md: standard
- lg: elevated
- hover: interactive feedback

### Transition Tokens
- fast: 0.2s ease
- normal: 0.3s ease
- slow: 0.5s ease
- cubic: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Z-Index Tokens
- dropdown: 100
- sticky: 1000
- fixed: 1001
- modal: 9999

---

## Common Usage Patterns

### Button Component
```css
.button {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
    border-radius: var(--radius-md);
    transition: background-color var(--transition-normal);
    box-shadow: var(--shadow-md);
}

.button:hover {
    background-color: var(--color-primary-dark);
    box-shadow: var(--shadow-hover);
}
```

### Card Component
```css
.card {
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}
```

### Section Component
```css
.section {
    background: var(--color-bg-primary);
    margin: var(--spacing-3xl) auto;
    padding: var(--spacing-5xl) var(--spacing-3xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}
```

### Heading Styles
```css
h1 {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-2xl);
}
```

---

## Responsive Patterns

```css
/* Mobile-first approach */
.component {
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
}

@media (min-width: 769px) {
    .component {
        padding: var(--spacing-2xl);
        gap: var(--spacing-lg);
    }
}

@media (max-width: 768px) {
    .component {
        padding: var(--spacing-md);
        gap: var(--spacing-xs);
    }
}
```

---

## Utility Classes Available

```css
/* Spacing Utilities */
.p-xs, .p-sm, .p-md, .p-lg, .p-xl, .p-2xl, .p-3xl
.m-xs, .m-sm, .m-md, .m-lg, .m-xl, .m-2xl, .m-3xl
.mb-xs, .mb-sm, .mb-md, .mb-lg, .mb-xl, .mb-2xl, .mb-3xl
.mt-xs, .mt-sm, .mt-md, .mt-lg, .mt-xl, .mt-2xl, .mt-3xl

/* Text Utilities */
.text-primary      /* color: var(--color-text-primary) */
.text-secondary    /* color: var(--color-text-secondary) */
.text-white        /* color: var(--color-text-on-dark) */

/* Link Utilities */
.link-plain        /* text-decoration: none; color: inherit; */
```

**Usage:**
```html
<div class="p-2xl mb-3xl">
    <h2>Content</h2>
    <p class="text-secondary">Description</p>
    <a href="#" class="link-plain">Link</a>
</div>
```

---

## When to Create New Tokens

Create a new token when:
- A value repeats **3+ times** in the codebase
- It's a design system value (color, spacing, timing)
- It might need to change consistently across pages

**Don't create tokens for:**
- Single-use styles
- Calculated values based on other tokens
- Animation keyframes (use transition tokens instead)

---

## File Import Order

```html
<!-- In HTML head or CSS -->
<link rel="stylesheet" href="design-tokens.css">  <!-- Must be first -->
<link rel="stylesheet" href="styles.css">         <!-- Uses tokens -->
```

---

## Quick Command References

### Check for hardcoded values (regex)
```
Search pattern: (#[0-9A-Fa-f]{3,6}|[0-9]+px|[0-9.]+rem|[0-9.]+s)
```

### Convert hex to variable
```
#007BFF → var(--color-primary)
#2E3A52 → var(--color-text-primary)
```

---

## Troubleshooting

### Issue: Token not working
**Check:** Is `design-tokens.css` imported before `styles.css`?

### Issue: Different value than expected
**Check:** Browser DevTools - look for CSS variable value in cascade

### Issue: Can't find the right token
**Check:** `DESIGN-TOKENS-GUIDE.md` for complete token reference

---

## Best Practices

✅ **DO:**
- Use tokens for all design values
- Keep token names semantic (describe purpose, not color)
- Group related tokens together
- Document custom tokens
- Review token usage in code reviews

❌ **DON'T:**
- Hardcode colors, spacing, or sizes
- Create redundant tokens
- Mix token and hardcoded values in same selector
- Use overly specific token names
- Nest CSS variables (use calc() if needed)

---

## Support Resources

1. **Design Tokens Guide:** `DESIGN-TOKENS-GUIDE.md`
2. **Refactoring Summary:** `REFACTORING-SUMMARY.md`
3. **Token Definitions:** `design-tokens.css` (inline comments)
4. **Main Stylesheet:** `styles.css` (refactored examples)

---

**Last Updated:** December 4, 2025  
**Status:** Complete ✅  
**All HTML & CSS:** Error-free validation

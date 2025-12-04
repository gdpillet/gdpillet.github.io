# Dark Mode - Quick Reference

## 🌓 What Was Added

A beautiful, minimalist dark mode toggle system that respects user preferences and persists across sessions.

---

## ☀️ Light Mode (Default)
- Primary Blue: `#007BFF`
- Text: `#2E3A52` (dark gray)
- Background: `#ffffff` (white)
- Secondary BG: `#F8F9FB` (light gray)

## 🌙 Dark Mode
- Primary Blue: `#4DA6FF` (lighter, more vibrant)
- Text: `#E8ECEF` (light gray)
- Background: `#1A1F2B` (dark navy)
- Secondary BG: `#0F1419` (darker navy)

---

## 🎯 Key Features

### **1. Sun/Moon Toggle Button**
- Located in header navigation (right side)
- 50px circular button
- Clean SVG icons
- Smooth hover effects (scale + color)

### **2. Three Ways to Activate Dark Mode**

**Option A: System Preference**
- If your OS is set to dark mode, site auto-applies it

**Option B: Manual Toggle**
- Click the sun/moon icon in header
- Preference is remembered

**Option C: Force Preference**
- Manual toggle overrides system preference
- Stored in browser (localStorage)

---

## 🔧 Technical Details

### Color Tokens
All 50+ design tokens automatically adapt:
```
Light Mode:  --color-primary: #007BFF
Dark Mode:   --color-primary: #4DA6FF
(Same variable name, different value)
```

### Theme Application
Two methods for maximum compatibility:
1. `@media (prefers-color-scheme: dark)` - for system preference
2. `[data-theme="dark"]` - for manual override

### Files Involved
- `design-tokens.css` - Dark color tokens
- `styles.css` - Button styling
- `js/theme-toggle.js` - Toggle logic
- All HTML files - Button integration

---

## ♿ Accessibility

✓ WCAG AA contrast compliance (4.5:1 minimum)
✓ Keyboard accessible (Space/Enter)
✓ Respects system preferences
✓ Proper ARIA labels
✓ Screen reader friendly

---

## 📱 Responsive

- Desktop: 50px button with hover scale effect
- Mobile: 45px button (adjusts automatically)
- All icons and text scale appropriately

---

## 🧪 Test It

1. **Try the toggle**: Click sun/moon icon in header
2. **Check persistence**: Refresh page - preference remains
3. **Test system sync**: Change OS theme - watch auto-update
4. **Keyboard**: Press Space/Enter on button
5. **All pages**: Toggle works on every page

---

## 💾 Storage

Preference saved to `localStorage`:
```javascript
localStorage.getItem('theme-preference')
// Returns: 'light' or 'dark'
```

Clear it anytime to reset to system preference:
```javascript
localStorage.removeItem('theme-preference')
```

---

## 🎨 Color Palette Summary

| Component | Light | Dark | Purpose |
|-----------|-------|------|---------|
| Primary Button | #007BFF | #4DA6FF | Main interactive elements |
| Text | #2E3A52 | #E8ECEF | Body text, primary content |
| Subtle Text | #5D6C8A | #B4BCC7 | Secondary info, metadata |
| Backgrounds | #ffffff | #1A1F2B | Card/section backgrounds |
| Page BG | #F8F9FB | #0F1419 | Overall page background |
| Borders | #E0E4EB | #2D3748 | Dividers, borders |
| Success | #28A745 | #4ACD68 | Success messages |
| Error | #DC3545 | #FF6B7A | Error states |
| Warning | #FFD700 | #FFD700 | Warnings |

---

## 🚀 Performance Notes

- Zero JavaScript overhead until toggle click
- localStorage is instant
- CSS variables apply instantly (no page reflow)
- SVG icons are crisp at any size
- No external dependencies

---

## 🔮 Future Ideas

- Auto-schedule dark mode (sunset to sunrise)
- High-contrast mode option
- Custom accent color selection
- Fade transition animation
- Usage analytics

---

## 📞 Support

Need to modify colors? Edit `design-tokens.css`:
- Light mode colors in `:root`
- Dark mode colors in `@media (prefers-color-scheme: dark)`
- Also update `[data-theme="dark"]` for consistency

---

**That's it!** Your portfolio now has a stunning dark mode. 🎉

---
name: hig
description: Apple Human Interface Guidelines (HIG) design standards for mobile and web interfaces. Enforces exact touch target sizes, dynamic typography scales, layout margins, contrast ratios, and iOS/macOS interface conventions to eliminate guesswork and AI design slop.
---

# Apple Human Interface Guidelines (HIG) Skill

Apply this skill whenever designing, building, or auditing mobile screens, responsive web layouts, or native-feel interfaces.

## 1. Exact Dimensions & Tap Targets

- **Minimum Touch / Tap Target**: **44 × 44 pt** (minimum 48 × 48 px for web accessibility).
  - Even if visual icon is 20 × 20 px, the bounding interactive area (`padding` or invisible touch container) must be at least 44 × 44 pt.
  - Spacing between adjacent interactive elements: minimum **8 pt**.
- **Corner Radii (Continuous Squircle)**:
  - Buttons / Controls: **8 pt to 10 pt**
  - Cards / Modals: **12 pt to 16 pt**
  - App icons / Large containers: **20 pt to 24 pt**

## 2. Dynamic Typography Scale (Default Standard)

| Style | Size | Weight | Leading / Line Height |
|---|---|---|---|
| **Large Title** | 34 pt | Bold | 41 pt |
| **Title 1** | 28 pt | Bold / Regular | 34 pt |
| **Title 2** | 22 pt | Bold / Regular | 28 pt |
| **Title 3** | 20 pt | Semibold / Regular | 25 pt |
| **Headline** | 17 pt | Semibold | 22 pt |
| **Body** | 17 pt | Regular | 22 pt |
| **Callout** | 16 pt | Regular | 21 pt |
| **Subhead** | 15 pt | Regular | 20 pt |
| **Footnote** | 13 pt | Regular | 18 pt |
| **Caption 1** | 12 pt | Regular | 16 pt |
| **Caption 2** | 11 pt | Regular | 13 pt |

*Never invent arbitrary font sizes (e.g. 19.3px). Adhere to the established type hierarchy.*

## 3. Spacing & Margin System

- **Compact (Mobile)**:
  - Screen edge margins / gutters: **16 pt** (standard) or **20 pt** (generous).
  - Component internal padding: **12 pt** to **16 pt**.
  - Section stack spacing: **24 pt** to **32 pt**.
- **Regular (Tablet / Desktop)**:
  - Margins: **24 pt** to **32 pt**.
- **Safe Area Insets**:
  - Always respect hardware insets for notches, dynamic islands, and home indicators:
    ```css
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    ```

## 4. Contrast & Accessibility Standards

- **Text Contrast**: Minimum **4.5:1** against background for normal body text; **3:1** for large titles (18pt+ bold or 24pt+ regular).
- **Secondary / Tertiary Text**: Use opacity or semantic system grays (e.g., `#8E8E93` on dark/light), never invisible faint gray (e.g., `#CCCCCC` on white is strictly prohibited).
- **Haptic & Feedback Affordances**: Interactive buttons must have visible active/pressed states (`active:scale-[0.98]` or opacity dimming to `0.7`).

## 5. Layout Hierarchy & Content Density

1. **One Primary Action per View**: Prominent, filled button.
2. **Secondary Actions**: Outlined or tinted background.
3. **Tertiary Actions**: Borderless plain text link.
4. **Lists & Navigation**: Grouped table style with inset rounded cards and subtle separators.

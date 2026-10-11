---
name: tweak
description: In-browser live visual design tweaking panel for HTML and web applications. Injects an interactive overlay with real-time sliders for font size, container spacing, corner radius, color saturation, and section visibility, and provides a 'Bake CSS' button that extracts the calibrated values back into the project's stylesheet.
---

# Tweak: In-Browser Live Design Calibration

Use this skill when fine-tuning a frontend, landing page, or web component with the user or auditing visual spacing directly in the browser.

## 1. When to Use `/tweak`

- Fine-tuning typography hierarchy and line-heights interactively.
- Calibrating container padding, grid gaps, and section margins without editing files repeatedly.
- Experimenting with border radii (`rounded-md` vs `rounded-2xl` vs continuous squircles).
- Toggling draft sections or competing hero variations on/off.

## 2. Injected Overlay Script Pattern

When instructed to run `/tweak` on an HTML page or frontend prototype, inject this lightweight script before `</body>` (or mount it via a dev component):

```html
<!-- TWEAK OVERLAY: DEV ONLY -->
<div id="tweak-panel" style="position:fixed; bottom:20px; right:20px; z-index:999999; background:rgba(18,18,22,0.92); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:16px; width:300px; color:#fff; font-family:sans-serif; font-size:12px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <strong style="font-size:13px; letter-spacing:0.5px;">🎛️ TWEAK PANEL</strong>
    <button onclick="document.getElementById('tweak-panel').remove()" style="background:none; border:none; color:#888; cursor:pointer;">✕</button>
  </div>
  
  <label style="display:block; margin-bottom:4px;">Body Font Size: <span id="val-font">16px</span></label>
  <input type="range" min="12" max="22" value="16" oninput="document.documentElement.style.setProperty('--base-font', this.value+'px'); document.getElementById('val-font').innerText = this.value+'px';" style="width:100%; margin-bottom:10px;">

  <label style="display:block; margin-bottom:4px;">Section Spacing: <span id="val-space">64px</span></label>
  <input type="range" min="24" max="128" step="4" value="64" oninput="document.documentElement.style.setProperty('--section-gap', this.value+'px'); document.getElementById('val-space').innerText = this.value+'px';" style="width:100%; margin-bottom:10px;">

  <label style="display:block; margin-bottom:4px;">Corner Radius: <span id="val-radius">12px</span></label>
  <input type="range" min="0" max="32" value="12" oninput="document.documentElement.style.setProperty('--card-radius', this.value+'px'); document.getElementById('val-radius').innerText = this.value+'px';" style="width:100%; margin-bottom:14px;">

  <button onclick="bakeTweakValues()" style="width:100%; background:#2563eb; color:#fff; font-weight:600; border:none; border-radius:6px; padding:8px; cursor:pointer;">💾 Bake CSS to Console / Prompt</button>
</div>

<script>
function bakeTweakValues() {
  const font = getComputedStyle(document.documentElement).getPropertyValue('--base-font') || '16px';
  const space = getComputedStyle(document.documentElement).getPropertyValue('--section-gap') || '64px';
  const radius = getComputedStyle(document.documentElement).getPropertyValue('--card-radius') || '12px';
  const output = `:root {\n  --base-font: ${font.trim()};\n  --section-gap: ${space.trim()};\n  --card-radius: ${radius.trim()};\n}`;
  console.log("=== BAKED CSS VALUES ===");
  console.log(output);
  navigator.clipboard.writeText(output);
  alert("Baked CSS copied to clipboard!\n\n" + output);
}
</script>
```

## 3. The "Bake" Step

Once the user approves the sliders in the browser:
1. Extract the chosen values from the clipboard or console.
2. Permanently write the CSS variables or Tailwind class replacements into the project's stylesheet (`index.css`, `globals.css`, or component file).
3. Remove the `#tweak-panel` snippet so the production codebase remains clean.

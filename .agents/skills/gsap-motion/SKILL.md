---
name: gsap-motion
description: Showcase-grade web motion using GSAP (GreenSock Animation Platform) and ScrollTrigger. Guidelines for scroll-driven reveals, pinned hero sections, smooth scrubbed sequences, hardware-accelerated transforms, and clean lifecycle management without layout thrash.
---

# GSAP Motion Design & Implementation Skill

Use this skill whenever building web pages, landing pages, or interactive portfolios requiring world-class, fluid motion (the standard seen on `gsap.com/showcase` and Awwwards).

## 1. Core Motion Rules

1. **Hardware-Accelerated Properties Only**:
   - **Allowed**: `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `opacity`.
   - **Strictly Prohibited**: Never animate `top`, `left`, `margin`, `width`, `height`, or `padding` directly. Doing so triggers layout re-flow and frame drops.
2. **Timing & Easing Foundations**:
   - **Micro-interactions (buttons, hovers)**: `0.15s – 0.25s`, ease: `power2.out`
   - **Page reveals & card entry**: `0.5s – 0.8s`, ease: `power3.out`
   - **Scroll scrubs**: Match scroll speed with `scrub: 1` or `scrub: 1.5` for momentum.
   - **Exits**: `0.2s – 0.3s`, ease: `power2.in` (exits should always be faster than entrances).

## 2. ScrollTrigger Patterns

### A. Pinned Hero Section
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Pinned sequence with scrubbed scale & fade
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "+=120%",
    pin: true,
    scrub: 1,
    anticipatePin: 1
  }
});
tl.to(".hero-headline", { scale: 0.85, opacity: 0, y: -40, ease: "none" })
  .from(".hero-card-preview", { yPercent: 60, opacity: 0, ease: "power2.out" }, 0.2);
```

### B. Batch Text & Card Reveals on Scroll
```javascript
// Staggered reveal without manual per-element triggers
ScrollTrigger.batch(".reveal-card", {
  start: "top 85%",
  onEnter: batch => gsap.to(batch, {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: "power3.out",
    overwrite: true
  }),
  once: true // Don't replay on scroll up unless explicitly required
});
```

## 3. Modern Framework Lifecycle & Memory Safety

### React / Next.js Lifecycle (`gsap.context()`)
Always scope animations using `gsap.context()` inside `useEffect` or `useLayoutEffect` so that all triggers and tweens are cleanly killed upon component unmount:
```javascript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AnimatedComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-item", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert(); // Essential: cleans up ScrollTriggers & prevents memory leaks
  }, []);

  return <div ref={containerRef} className="container">...</div>;
}
```

## 4. Accessibility First (Reduced Motion)

Always respect the user's reduced motion settings:
```javascript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  gsap.set(".animated-element", { opacity: 1, x: 0, y: 0 });
} else {
  // run full GSAP timeline
}
```

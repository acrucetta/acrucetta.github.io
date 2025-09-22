---
title: "LAB color gradients feel more natural"
date: 2024-08-18
tags: [design, css]
---

While tweaking charts I switched to CSS `color-mix` in the LAB color space (`in lab`) to generate gradients. The interpolation keeps both saturation and perceived brightness consistent, so the steps no longer look muddy.

Fallback for older browsers: precompute the gradient stops and add them as custom properties, keeping the fancy `color-mix` as progressive enhancement.

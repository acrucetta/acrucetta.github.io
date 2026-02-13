(() => {
  const canvas = document.getElementById("site-motion-canvas");
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const page = document.documentElement;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const frameIntervalMs = 1000 / 30;
  const startTime = performance.now();

  const waves = [
    { baseline: 0.66, amplitude: 14, frequency: 0.0105, speed: 0.23, phase: 0.3, fill: "waveA" },
    { baseline: 0.76, amplitude: 13, frequency: 0.0150, speed: -0.19, phase: 1.9, fill: "waveB" },
    { baseline: 0.86, amplitude: 11, frequency: 0.0195, speed: 0.12, phase: 3.4, fill: "waveC" }
  ];

  let width = 0;
  let height = 0;
  let rafId = 0;
  let lastFrame = 0;
  let isPageVisible = !document.hidden;
  let isCanvasVisible = true;
  let palette = readPalette();

  function readPalette() {
    const styles = getComputedStyle(page);
    const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    return {
      top: token("--motion-bg-top", "#eef4ff"),
      bottom: token("--motion-bg-bottom", "#dce8ff"),
      waveA: token("--motion-wave-a", "rgba(31, 79, 149, 0.30)"),
      waveB: token("--motion-wave-b", "rgba(21, 60, 114, 0.26)"),
      waveC: token("--motion-wave-c", "rgba(10, 34, 69, 0.20)"),
      line: token("--motion-line", "rgba(255, 255, 255, 0.45)")
    };
  }

  function resize() {
    const nextWidth = canvas.clientWidth;
    const nextHeight = canvas.clientHeight;
    const nextDpr = Math.max(1, window.devicePixelRatio || 1);

    if (!nextWidth || !nextHeight) {
      return;
    }

    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.floor(width * nextDpr);
    canvas.height = Math.floor(height * nextDpr);
    context.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
  }

  function waveY(wave, x, seconds) {
    const base = height * wave.baseline;
    const primary = Math.sin((x * wave.frequency) + (seconds * wave.speed * 2.2) + wave.phase) * wave.amplitude;
    const secondary =
      Math.cos((x * wave.frequency * 0.55) - (seconds * wave.speed * 1.5) + wave.phase) * (wave.amplitude * 0.35);
    return base + primary + secondary;
  }

  function drawBackdrop() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, palette.top);
    gradient.addColorStop(1, palette.bottom);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  function drawWave(wave, seconds) {
    const step = Math.max(3, Math.round(width / 260));

    context.beginPath();
    context.moveTo(0, height);
    for (let x = 0; x <= width + step; x += step) {
      context.lineTo(x, waveY(wave, x, seconds));
    }
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = palette[wave.fill];
    context.fill();

    context.beginPath();
    for (let x = 0; x <= width + step; x += step) {
      const y = waveY(wave, x, seconds) - 1;
      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.strokeStyle = palette.line;
    context.lineWidth = 1;
    context.globalAlpha = 0.42;
    context.stroke();
    context.globalAlpha = 1;
  }

  function draw(seconds) {
    if (!width || !height) {
      resize();
    }
    if (!width || !height) {
      return;
    }

    context.clearRect(0, 0, width, height);
    drawBackdrop();
    waves.forEach((wave) => drawWave(wave, seconds));
  }

  function shouldAnimate() {
    return !reducedMotionQuery.matches && isPageVisible && isCanvasVisible;
  }

  function stopAnimation() {
    if (!rafId) {
      return;
    }
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function ensureAnimation() {
    if (rafId || !shouldAnimate()) {
      return;
    }
    rafId = requestAnimationFrame(renderFrame);
  }

  function renderFrame(now) {
    rafId = 0;
    if (!shouldAnimate()) {
      draw(0);
      return;
    }

    if (now - lastFrame >= frameIntervalMs) {
      draw((now - startTime) / 1000);
      lastFrame = now;
    }
    rafId = requestAnimationFrame(renderFrame);
  }

  function refreshStyle() {
    palette = readPalette();
    draw((performance.now() - startTime) / 1000);
  }

  function updateVisibility() {
    if (shouldAnimate()) {
      ensureAnimation();
    } else {
      stopAnimation();
      draw(0);
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasVisible = entry.isIntersecting;
        });
        updateVisibility();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
  }

  window.addEventListener(
    "resize",
    () => {
      resize();
      refreshStyle();
      updateVisibility();
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    isPageVisible = !document.hidden;
    updateVisibility();
  });

  const onReducedMotionChange = () => updateVisibility();
  const onColorSchemeChange = () => refreshStyle();

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(onReducedMotionChange);
  }

  if (typeof colorSchemeQuery.addEventListener === "function") {
    colorSchemeQuery.addEventListener("change", onColorSchemeChange);
  } else if (typeof colorSchemeQuery.addListener === "function") {
    colorSchemeQuery.addListener(onColorSchemeChange);
  }

  resize();
  draw(0);
  updateVisibility();
})();

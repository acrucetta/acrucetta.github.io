(() => {
  const canvas = document.getElementById("site-motion-canvas");
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const styleSource = canvas.parentElement || document.documentElement;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const frameIntervalMs = 1000 / 30;
  const startTime = performance.now();

  const baseWaves = [
    { baseline: 0.18, amplitude: 12, frequency: 0.0105, speed: 0.23, phase: 0.3, fill: "waveA" },
    { baseline: 0.38, amplitude: 11, frequency: 0.0140, speed: -0.19, phase: 1.4, fill: "waveB" },
    { baseline: 0.60, amplitude: 10, frequency: 0.0175, speed: 0.12, phase: 2.7, fill: "waveC" },
    { baseline: 0.82, amplitude: 9, frequency: 0.0200, speed: -0.1, phase: 3.6, fill: "waveB" }
  ];

  let width = 0;
  let height = 0;
  let rafId = 0;
  let lastFrame = 0;
  let isPageVisible = !document.hidden;
  let isCanvasVisible = true;
  let palette = readPalette();
  let motionProfile = readMotionProfile();

  function readPalette() {
    const styles = getComputedStyle(styleSource);
    const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    return {
      top: token("--motion-bg-top", "#eef4ff"),
      bottom: token("--motion-bg-bottom", "#dce8ff"),
      waveA: token("--motion-wave-a", "rgba(31, 79, 149, 0.30)"),
      waveB: token("--motion-wave-b", "rgba(21, 60, 114, 0.26)"),
      waveC: token("--motion-wave-c", "rgba(10, 34, 69, 0.20)")
    };
  }

  function readMotionProfile() {
    const styles = getComputedStyle(styleSource);
    const valueOf = (name, fallback) => {
      const raw = styles.getPropertyValue(name).trim();
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    };

    return {
      density: valueOf("--motion-density", 1),
      speed: valueOf("--motion-speed", 1)
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
    const primary =
      Math.sin((x * wave.frequency * motionProfile.density) + (seconds * wave.speed * motionProfile.speed * 2.2) + wave.phase) *
      (wave.amplitude * motionProfile.density);
    const secondary =
      Math.cos((x * wave.frequency * motionProfile.density * 0.55) - (seconds * wave.speed * motionProfile.speed * 1.5) + wave.phase) *
      (wave.amplitude * motionProfile.density * 0.35);
    return base + primary + secondary;
  }

  function drawBackdrop() {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, palette.top);
    gradient.addColorStop(1, palette.bottom);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  function sampleWave(wave, seconds, step) {
    const points = [];
    for (let x = 0; x <= width + step; x += step) {
      points.push({ x, y: waveY(wave, x, seconds) });
    }
    return points;
  }

  function sampleFlat(y, step) {
    const points = [];
    for (let x = 0; x <= width + step; x += step) {
      points.push({ x, y });
    }
    return points;
  }

  function drawBand(topPoints, bottomPoints, fillColor) {
    if (!topPoints.length || !bottomPoints.length) {
      return;
    }

    context.beginPath();
    context.moveTo(topPoints[0].x, topPoints[0].y);
    topPoints.forEach((point) => context.lineTo(point.x, point.y));
    for (let i = bottomPoints.length - 1; i >= 0; i -= 1) {
      context.lineTo(bottomPoints[i].x, bottomPoints[i].y);
    }
    context.closePath();
    context.fillStyle = fillColor;
    context.fill();
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
    const step = Math.max(3, Math.round(width / 260));
    const wavePoints = baseWaves.map((wave) => sampleWave(wave, seconds, step));
    const topEdge = sampleFlat(0, step);
    const bottomEdge = sampleFlat(height, step);

    // Fill contiguous sinusoidal bands only (no blur/highlight overlays).
    drawBand(topEdge, wavePoints[0], palette.waveA);
    drawBand(wavePoints[0], wavePoints[1], palette.waveB);
    drawBand(wavePoints[1], wavePoints[2], palette.waveC);
    drawBand(wavePoints[2], wavePoints[3], palette.waveB);
    drawBand(wavePoints[3], bottomEdge, palette.waveC);
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
    motionProfile = readMotionProfile();
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

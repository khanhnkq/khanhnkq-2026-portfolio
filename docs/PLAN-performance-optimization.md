# Project Plan: Performance Optimization (Lag Fix)

**Goal**: Eliminate scroll lag and "always-on" performance stutter, focusing on the Background and key heavy visual effects.

**Context**: User reports lag "when scrolling and all the time, maybe due to background".
**Suspected Causes**:

1.  **CSS Reflow/Paint**: `AuroraBackground` uses constantly animating gradients + `filter: blur()`. This forces the browser to repaint the entire screen on every frame.
2.  **GPU Overdraw**: Extensive use of `backdrop-filter: blur()` (found in Hero, Navbar, Cards) compounds the cost when layered over an animating background.
3.  **Unoptimized Animations**: `framer-motion` layout animations or `scroll` listeners might be running on the main thread.

---

## Phase 1: Background Optimization (Priority 1)

**Strategy**: Reduce paint cost.

- [ ] **Simplify `AuroraBackground`**:
  - Reduce the number of gradient layers.
  - Replace CSS `filter: blur()` with a pre-blurred PNG/WebP image (static texture) if dynamic movement isn't critical, OR:
  - Use `transform: translate3d()` for animation instead of `background-position` (hardware accelerated).
  - Add `opacity-50` or similar to reduce blending cost.
- [ ] **Conditional Animation**: Pause background animation when user is not scrolling or after X seconds? (Maybe too complex). **Better**: Just make it lighter.

## Phase 2: Reduce GPU Cost (Backdrop Filter)

**Strategy**: `backdrop-filter` is the most expensive CSS property after `box-shadow`.

- [ ] **Audit `backdrop-blur`**:
  - Replace standard `backdrop-blur-md` with `bg-black/80` (opaque transparent) for non-critical elements.
  - Keep `backdrop-blur` ONLY on sticky headers or focal points (Hero center).
  - Ensure `backdrop-filter` is not applied to large full-screen overlays unnecessarily.

## Phase 3: Layout & Scroll (Trigger Analysis)

- [ ] **`Lenis` Scroll**: Ensure `SmoothScroll` is configured correctly (not fighting with native scroll).
- [ ] **`Globe` & 3D**:
  - Ensure `Globe` (Cobe) uses `devicePixelRatio: 1` instead of `2` on high-DPI screens if performance is low.
  - Verify `Globe` is explicitly paused/unmounted when not in viewport (IntersectionObserver).

## Phase 4: Verification

- [ ] **FPS Meter**: Use Chrome DevTools "Rendering" -> "Frame Rendering Stats".
- [ ] **Scroll Test**: Fast scroll up/down.
- [ ] **Mobile Test**: Verify on simulated mobile device (throttled CPU).

---

## Agent Assignment

- **System**: `frontend-specialist` (CSS performance expert).
- **Files**: `src/components/ui/aurora-background.tsx`, `src/components/sections/Hero.tsx`, `src/registry/magicui/globe.tsx`.

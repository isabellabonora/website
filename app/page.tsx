"use client";
import { useEffect } from "react";

const css = `
  :root {
    --bg: #fbf7f2;
    --ink: #1c1a17;
    --ink-soft: #5c574f;
    --accent: #b5502f;
    --line: #e4dcd0;
    --mono-bg: #211d18;
    --mono-fg: #f2ede4;
    --chip: #f2ebe1;
  }

  :root[data-theme="dark"] {
    --bg: #16130f;
    --ink: #f2ede4;
    --ink-soft: #a39a8d;
    --accent: #f08a62;
    --line: #2f2a23;
    --mono-bg: #0d0b09;
    --mono-fg: #f2ede4;
    --chip: #211d18;
  }

  html, body { margin: 0; padding: 0; box-sizing: border-box; cursor: auto; overflow-x: visible; }

  /* low-specificity reset (plain universal selector) so component classes below can freely override margin/padding */
  * { box-sizing: border-box; margin: 0; padding: 0; }

  #portfolio-root { scroll-behavior: smooth; }

  html.theme-transitioning,
  html.theme-transitioning * {
    transition: background-color 0.7s ease, color 0.7s ease, border-color 0.7s ease, box-shadow 0.7s ease !important;
  }

  #portfolio-root {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  #portfolio-root main {
    max-width: calc(1120px + 2 * clamp(16px, 4vw, 48px));
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 48px);
  }

  #portfolio-root h1, #portfolio-root h2, #portfolio-root h3 {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  /* ---------- HERO ---------- */
  /* Fills exactly one screen: greeting on top, the drop in the free space,
     bio and numbers at the bottom. Rows flex, so nothing falls below the fold. */
  .hero {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    height: 100vh;
    height: 100svh;
    min-height: 520px;
    padding: 76px clamp(16px, 4vw, 48px) clamp(20px, 4.5vh, 44px);
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-areas: "hello hello" "buddy buddy" "bio stats";
    column-gap: 48px;
  }

  @keyframes rise {
    to { opacity: 1; transform: translateY(0); }
  }


  .hero-photo-toggle {
    position: relative;
    width: 96px;
    height: 96px;
    flex-shrink: 0;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .hero-photo {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 1px solid var(--line);
    clip-path: circle(0% at 50% 50%);
    animation: iris-reveal 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.2s;
    transition: filter 0.6s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hero-photo-toggle:hover .hero-photo,
  .hero-photo-toggle:focus-visible .hero-photo {
    transform: scale(1.05);
    box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--accent);
  }

  @keyframes iris-reveal {
    to { clip-path: circle(52% at 50% 50%); }
  }

  [data-theme="dark"] .hero-photo {
    filter: saturate(0.85) brightness(0.92);
  }

  .theme-badge {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--bg);
    border: 1px solid var(--line);
    box-shadow: 0 3px 8px -2px rgba(28, 26, 23, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.86rem;
    color: var(--ink);
    transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease, transform 0.25s ease;
    animation: badge-pulse 1.8s ease-out 1.4s 2;
  }

  @keyframes badge-pulse {
    0% { box-shadow: 0 3px 8px -2px rgba(28, 26, 23, 0.35), 0 0 0 0 rgba(181, 80, 47, 0.45); }
    70% { box-shadow: 0 3px 8px -2px rgba(28, 26, 23, 0.35), 0 0 0 8px rgba(181, 80, 47, 0); }
    100% { box-shadow: 0 3px 8px -2px rgba(28, 26, 23, 0.35), 0 0 0 0 rgba(181, 80, 47, 0); }
  }

  .hero-photo-toggle:hover .theme-badge,
  .hero-photo-toggle:focus-visible .theme-badge {
    transform: scale(1.12);
    border-color: var(--accent);
  }

  .theme-badge .icon-sun,
  .theme-badge .icon-moon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .theme-badge .icon-sun { color: #d99a3c; }
  .theme-badge .icon-moon { color: #cdd6e0; }

  .theme-badge .icon-moon { opacity: 0; transform: rotate(-40deg) scale(0.6); }
  .theme-badge .icon-sun { opacity: 1; transform: rotate(0deg) scale(1); }

  [data-theme="dark"] .theme-badge .icon-sun { opacity: 0; transform: rotate(40deg) scale(0.6); }
  [data-theme="dark"] .theme-badge .icon-moon { opacity: 1; transform: rotate(0deg) scale(1); }

  /* ---------- THEME WAVE ---------- */
  .theme-wave {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 260px;
    background: linear-gradient(to bottom, transparent, var(--accent) 45%, var(--accent) 55%, transparent);
    opacity: 0;
    transform: translateY(-260px);
    z-index: 250;
    pointer-events: none;
  }

  .theme-wave.active {
    opacity: 0.35;
    transition: transform 1.1s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease;
    transform: translateY(100vh);
  }

  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: var(--accent);
    z-index: 300;
    transition: width 0.1s linear;
  }

  .hero-hello {
    grid-area: hello;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .hero-hello .hero-photo-toggle,
  .hero-hello .hero-photo { flex: none; width: calc(var(--hero-fs) * 3.4); height: calc(var(--hero-fs) * 3.4); }
  .hero-hello .theme-badge { width: 20px; height: 20px; right: -6px; bottom: -6px; font-size: 0.6rem; }
  .hero {
    --hero-fs: clamp(0.9rem, 0.45vw + 0.5rem, 1.3rem);
  }
  .hero-hello h1 {
    font-family: 'Inter', sans-serif !important;
    font-size: var(--hero-fs);
    font-weight: 500 !important;
    letter-spacing: 0 !important;
    line-height: 1.35;
  }
  .hero-hello p { font-size: var(--hero-fs); color: var(--ink-soft); line-height: 1.35; }

  .hero-buddy {
    grid-area: buddy;
    align-self: center;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(8px, 2vh, 18px);
    text-align: center;
  }
  .hero-buddy p { font-size: calc(var(--hero-fs) * 0.95); max-width: 16em; line-height: 1.45; }
  .hero-buddy p span { color: var(--ink-soft); }

  .orb, .orb-spot {
    width: clamp(84px, 17vh, 210px);
    height: clamp(84px, 17vh, 210px);
    overflow: visible;
  }
  .orb-spot { flex: none; }

  /* ---------- TRAVELLING DROP ---------- */
  /* The drop isn't part of the hero: it's fixed to the viewport and springs
     from spot to spot (the hero's .orb-spot, a dock per section, the footer).
     Moved with transform from JS; scale shrinks it from hero size. */
  .buddy {
    position: fixed;
    z-index: 180;
    left: 0;
    top: 0;
    transform-origin: 0 0;
    pointer-events: none;
    will-change: transform;
    animation: buddy-in 1.1s ease 0.35s both;
  }
  .buddy .orb { display: block; filter: drop-shadow(0 8px 16px rgba(60, 90, 100, 0.22)); }
  @keyframes buddy-in { from { opacity: 0; } to { opacity: 1; } }
  .buddy-say {
    position: fixed;
    z-index: 181;
    left: 0;
    top: 0;
    max-width: 190px;
    padding: 8px 13px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: inset 0 1px 0 #fff, 0 12px 28px -16px rgba(60, 40, 25, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.82rem;
    line-height: 1.4;
    color: var(--ink);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .buddy-say.on { opacity: 1; }
  [data-theme="dark"] .buddy-say { background: rgba(26, 31, 39, 0.8); border-color: rgba(255, 255, 255, 0.14); box-shadow: none; }

  .hero-bio {
    grid-area: bio;
    align-self: end;
    max-width: 27em;
    font-size: var(--hero-fs);
  }
  .hero-lead { font-size: 1em; line-height: 1.55; }
  .hero-more { margin-top: 12px; font-size: 0.92em; line-height: 1.55; color: var(--ink-soft); }
  .hero-ctas { margin-top: 20px; display: flex; align-items: center; gap: 18px; }
  .btn-pill {
    padding: 8px 16px;
    border-radius: 999px;
    background: var(--chip);
    border: 1px solid var(--line);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 2px 6px -2px rgba(28, 26, 23, 0.15);
    color: var(--ink);
    font-size: 0.85rem;
    text-decoration: none;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .btn-pill:hover { transform: translateY(-1px); background: var(--bg); }
  .link-arrow { font-size: 0.85rem; color: var(--ink-soft); text-decoration: none; transition: color 0.2s ease; }
  .link-arrow span { display: inline-block; transition: transform 0.2s ease; }
  .link-arrow:hover { color: var(--ink); }
  .link-arrow:hover span { transform: translateX(3px); }

  .hero-stats {
    grid-area: stats;
    align-self: end;
    width: 16em;
    font-size: calc(var(--hero-fs) * 0.88);
  }
  .hero-stats div {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid var(--line);
  }
  .hero-stats div:last-child { border-bottom: 0; }
  .hero-stats dt { color: var(--ink-soft); }
  .hero-stats dd { font-family: 'JetBrains Mono', monospace; color: var(--ink); }

  /* floating pill nav */
  .topbar {
    position: fixed;
    z-index: 250;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
  }
  .tb-btn {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 14px -6px rgba(28, 26, 23, 0.2);
    color: var(--ink);
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .tb-btn:hover { transform: translateY(-1px); }
  .tb-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  .tb-list {
    position: absolute;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 200px;
    padding: 8px;
    border-radius: 16px;
    border: 1px solid var(--line);
    background: color-mix(in srgb, var(--bg) 92%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 18px 40px -18px rgba(28, 26, 23, 0.3);
    animation: rise 0.25s ease;
  }
  .tb-list[hidden] { display: none; }
  .tb-list a {
    display: flex;
    gap: 12px;
    padding: 8px 10px;
    border-radius: 10px;
    color: var(--ink);
    font-size: 0.9rem;
    text-decoration: none;
  }
  .tb-list a:hover { background: var(--chip); }
  .tb-list a span { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--ink-soft); padding-top: 3px; }

  @media (max-width: 560px) {
    .hero {
      grid-template-columns: 1fr;
      grid-template-areas: "hello" "buddy" "bio" "stats";
      padding-top: 72px;
    }
    .hero-more { display: none; }
    .hero-ctas { margin-top: 14px; }
    .hero-stats { width: auto; margin-top: clamp(12px, 3vh, 24px); }
    .hero-stats div:nth-child(n+4) { display: none; }
  }

  /* short screens (small laptops, landscape phones): drop the secondary lines */
  @media (max-height: 760px) {
    .hero-more { display: none; }
    .hero-stats div { padding: 3px 0; }
  }
  @media (max-height: 560px) {
    .hero-stats div:nth-child(n+4) { display: none; }
    .hero-buddy p { display: none; }
  }

  .jump-link {
    cursor: pointer;
    text-decoration: underline dotted;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }

  .jump-link:hover { color: var(--accent) !important; }

  @keyframes flash-highlight {
    0%, 100% { color: var(--accent); }
    50% { color: var(--ink); }
  }

  .flash-target { animation: flash-highlight 0.5s ease 2; }

  /* Opening a case: the active card lifts off the compass and grows to the
     centre while the page fades to cream; the case page picks it up from there. */
  .compass-fly {
    position: fixed !important;
    z-index: 400 !important;
    margin: 0;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    transition: left 0.6s cubic-bezier(0.65, 0, 0.35, 1), top 0.6s cubic-bezier(0.65, 0, 0.35, 1),
      width 0.6s cubic-bezier(0.65, 0, 0.35, 1), height 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  }
  .page-veil {
    position: fixed;
    inset: 0;
    z-index: 399;
    background: var(--bg);
    opacity: 0;
    transition: opacity 0.45s ease;
    pointer-events: none;
  }
  .page-veil.on { opacity: 1; }

  /* ---------- WORK COMPASS ---------- */
  /* Glass compass: a frosted rim over soft colour (the sidekick's tints),
     project cards in glass frames riding an arc that turns with the scroll. */
  .compass {
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-top: 8px;
    --card-w: min(520px, 82vw, calc((100svh - 14svh - 360px) * 1.232));
    --card-h: calc(var(--card-w) / 1.232);
    --dial-top: 14svh;
  }
  .compass-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
  }
  .compass-aura { position: absolute; inset: 0; pointer-events: none; }
  /* soft colour as radial gradients (no blur filter: cheap to animate) */
  .compass-aura span {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    animation: aura-drift 22s ease-in-out infinite alternate;
    will-change: transform;
  }
  .compass-aura span:nth-child(1) { width: 60vw; height: 46vw; left: 0; top: 18svh; background: radial-gradient(closest-side, #a8dccf, rgba(168, 220, 207, 0)); }
  .compass-aura span:nth-child(2) { width: 54vw; height: 42vw; right: -4vw; top: 8svh; background: radial-gradient(closest-side, #cbbcf4, rgba(203, 188, 244, 0)); animation-delay: -7s; }
  .compass-aura span:nth-child(3) { width: 52vw; height: 36vw; left: 24vw; top: 46svh; background: radial-gradient(closest-side, #ffd2bd, rgba(255, 210, 189, 0)); animation-delay: -13s; }
  @keyframes aura-drift {
    from { transform: translate3d(-3vw, 1vw, 0) scale(1); }
    to { transform: translate3d(3vw, -2vw, 0) scale(1.08); }
  }
  [data-theme="dark"] .compass-aura span { opacity: 0.18; }

  .compass-count {
    position: absolute;
    z-index: 3;
    top: calc(var(--dial-top) - 52px);
    left: 50%;
    transform: translateX(-50%);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
  }
  .compass-dial {
    --d: min(150vw, 1900px);
    position: absolute;
    z-index: 1;
    left: 50%;
    top: var(--dial-top);
    width: var(--d);
    height: var(--d);
    border-radius: 50%;
    /* frosted glass: a brighter rim band, a faint body, a crisp top edge */
    background:
      radial-gradient(circle, rgba(255, 255, 255, 0.16) 0 92.6%, rgba(255, 255, 255, 0.62) 93%, rgba(255, 255, 255, 0.34) 100%);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow:
      inset 0 2px 0 rgba(255, 255, 255, 0.9),
      inset 0 0 0 1px rgba(93, 127, 134, 0.08),
      0 -30px 80px -40px rgba(93, 127, 134, 0.35);
    transform: translateX(-50%);
    will-change: transform;
  }
  [data-theme="dark"] .compass-dial {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0 92.6%, rgba(255, 255, 255, 0.1) 93%, rgba(255, 255, 255, 0.05) 100%);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  .compass-dial svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .compass-dial line { stroke: var(--ink-soft); stroke-opacity: 0.22; stroke-width: 1; vector-effect: non-scaling-stroke; }
  .compass-dial line.major { stroke-opacity: 0.5; }
  .compass-name {
    position: absolute;
    left: 50%;
    top: 0;
    width: 0;
    height: 50%;
    padding: 0;
    border: 0;
    background: none;
    transform-origin: 50% 100%;
    cursor: pointer;
  }
  .compass-name span {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
    opacity: 0.55;
    transition: color 0.4s ease, opacity 0.4s ease;
  }
  .compass-name:hover span, .compass-name.is-active span { opacity: 1; }
  .compass-name.is-active span { color: var(--accent); }
  .compass-name:focus-visible span { outline: 1px solid var(--accent); outline-offset: 4px; }
  .compass-needle {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: calc(var(--dial-top) - 18px);
    width: 1px;
    height: 44px;
    background: linear-gradient(var(--ink), rgba(28, 26, 23, 0));
  }
  .compass-needle::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -3.5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ink);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.7);
  }

  .compass-cards {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: calc(var(--dial-top) + 92px);
    width: 0;
    height: 0;
  }
  .compass-card {
    position: absolute;
    left: calc(var(--card-w) / -2);
    top: 0;
    width: var(--card-w);
    height: var(--card-h);
    padding: 10px;
    border-radius: 24px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.4));
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 30px 60px -30px rgba(60, 40, 25, 0.35);
    transform-origin: 50% 100%;
    will-change: transform, opacity, filter;
  }
  [data-theme="dark"] .compass-card { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.16); }
  .compass-card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
  .compass-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

  .compass-meta {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: calc(var(--dial-top) + 92px + var(--card-h) + 26px);
    width: min(560px, calc(100vw - 32px));
    transform: translateX(-50%);
    text-align: center;
    transition: opacity 0.25s ease, transform 0.35s ease;
  }
  .compass-meta.is-changing { opacity: 0; transform: translate(-50%, 6px); }
  /* #portfolio-root: beats the global h3 weight/tracking */
  #portfolio-root .compass-meta h3 {
    font-family: 'Fraunces', serif;
    font-weight: 400;
    font-size: clamp(1.3rem, 1.6vw, 1.55rem);
    line-height: 1.2;
    letter-spacing: -0.015em;
    margin: 10px auto 8px;
    max-width: 40ch;
    text-wrap: balance;
  }
  /* title and teaser always take two lines, so the button doesn't jump from project to project */
  #portfolio-root .compass-meta h3, .compass-meta p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: calc(2lh);
  }
  .compass-meta p { max-width: 46ch; margin: 0 auto; color: var(--ink-soft); font-size: 0.95rem; text-wrap: balance; }
  /* the one action on the stage: solid ink, so it reads over the glass and aura */
  .compass-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    padding: 11px 20px;
    border-radius: 999px;
    background: var(--ink);
    color: var(--bg);
    box-shadow: 0 12px 26px -14px rgba(28, 26, 23, 0.6);
    font-size: 0.86rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .compass-cta span { transition: transform 0.25s ease; }
  .compass-cta:hover { transform: translateY(-1px); box-shadow: 0 16px 30px -14px rgba(28, 26, 23, 0.7); }
  .compass-cta:hover span { transform: translateX(3px); }
  [data-theme="dark"] .compass-cta { box-shadow: none; }

  @media (max-width: 560px) {
    .compass { --dial-top: 12svh; --card-w: calc(100vw - 48px); }
    .compass-dial { --d: 230vw; }
    .compass-cards { top: calc(var(--dial-top) + 80px); }
    .compass-meta { top: calc(var(--dial-top) + 80px + var(--card-h) + 22px); }
    .compass-meta p { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .compass-aura span { animation: none; }
  }

  /* ---------- WORK ---------- */
  .work-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .work-tag { color: var(--accent); }

  /* ---------- SECTIONS ---------- */
  /* Below the compass: the case-study column, a sticky mono label on the left
     and the content on the right. Hairline rows like the hero stats; glass and
     the sidekick's tints only where there's something to hold (photos). */
  section.block {
    padding: 56px 0 0;
  }

  #portfolio-root section.block h2 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 28px;
  }

  section.sec {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.6fr);
    gap: clamp(24px, 6vw, 96px);
    padding: clamp(72px, 10vw, 128px) 0 0;
  }

  #portfolio-root .sec-label {
    position: sticky;
    top: 88px;
    align-self: start;
    display: flex;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .sec-label span { color: var(--ink-soft); }

  .sec-body { min-width: 0; }

  #portfolio-root .sec-body h3 {
    font-family: 'Fraunces', serif;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  @media (max-width: 760px) {
    section.sec { grid-template-columns: 1fr; gap: 20px; }
    #portfolio-root .sec-label { position: static; }
  }

  /* ---------- EXPERIENCE ---------- */
  .xp {
    display: grid;
    grid-template-columns: 116px minmax(0, 1fr) auto;
    grid-template-areas: "period main tag";
    column-gap: 24px;
    padding: 24px 0;
    border-top: 1px solid var(--line);
  }
  .xp:last-child, .xp:has(+ .xp-group) { border-bottom: 1px solid var(--line); }
  .xp-group {
    margin: 0 0 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
  .xp + .xp-group { margin-top: 56px; }
  .xp-compact { padding: 16px 0; }
  #portfolio-root .xp-compact h3 { font-size: 1.12rem; }
  .xp-compact .xp-period { padding-top: 4px; }
  .xp-compact .work-tag { padding-top: 5px; }
  .xp-compact .xp-main p { margin-top: 6px; font-size: 0.9rem; }

  .xp-period {
    grid-area: period;
    padding-top: 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    color: var(--ink-soft);
    white-space: nowrap;
  }
  .xp-main { grid-area: main; }
  #portfolio-root .xp h3 { font-size: 1.35rem; line-height: 1.25; }
  .xp-org { margin-top: 2px; font-size: 0.92rem; color: var(--ink-soft); }
  .xp-main p { margin-top: 12px; max-width: 58ch; font-size: 0.95rem; color: var(--ink-soft); }
  .xp .work-tag { grid-area: tag; padding-top: 8px; white-space: nowrap; }

  @media (max-width: 560px) {
    .xp {
      grid-template-columns: 1fr auto;
      grid-template-areas: "period tag" "main main";
      row-gap: 8px;
    }
    .xp-period, .xp .work-tag { padding-top: 0; }
  }

  /* ---------- EDUCATION ---------- */
  .edu {
    display: grid;
    grid-template-columns: 116px minmax(0, 1fr);
    column-gap: 24px;
    padding: 18px 0;
    border-top: 1px solid var(--line);
  }
  .edu:last-child { border-bottom: 1px solid var(--line); }
  .edu-period {
    padding-top: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    color: var(--ink-soft);
    white-space: nowrap;
  }
  #portfolio-root .edu h3 { font-size: 1.12rem; line-height: 1.3; }
  .edu-school { font-size: 0.92rem; color: var(--ink-soft); }
  .edu-thesis { margin-top: 8px; max-width: 60ch; font-size: 0.86rem; color: var(--ink-soft); }

  @media (max-width: 560px) {
    .edu { grid-template-columns: 1fr; row-gap: 6px; }
    .edu-period { padding-top: 0; }
  }

  /* ---------- SKILLS ---------- */
  /* No boxes: three columns on the same hairline as experience and education. */
  .skill-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 32px;
  }
  .skill-card {
    padding: 18px 0 4px;
    border-top: 1px solid var(--line);
  }
  .skill-card-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
  .skill-card ul { list-style: none; margin-top: 12px; display: grid; gap: 6px; font-size: 0.95rem; }

  .tools {
    margin-top: 32px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .tools span {
    padding: 5px 13px;
    border-radius: 999px;
    border: 1px solid var(--line);
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  @media (max-width: 760px) {
    .skill-cards { grid-template-columns: 1fr; }
    .skill-card + .skill-card { margin-top: 20px; }
  }

  /* ---------- OFF DUTY ---------- */
  .offduty-text {
    font-size: 1.05rem;
    max-width: 52ch;
    color: var(--ink-soft);
  }
  .offduty-text strong { color: var(--ink); font-weight: 500; }

  .offduty-photos {
    position: relative;
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }
  .offduty-photos::before {
    /* the sidekick's tints, softly, behind the frames */
    content: "";
    position: absolute;
    inset: -14% -6%;
    z-index: -1;
    background:
      radial-gradient(closest-side, rgba(168, 220, 207, 0.45), transparent) 0% 40% / 45% 90% no-repeat,
      radial-gradient(closest-side, rgba(203, 188, 244, 0.4), transparent) 60% 0% / 45% 80% no-repeat,
      radial-gradient(closest-side, rgba(255, 210, 189, 0.45), transparent) 100% 100% / 45% 90% no-repeat;
  }
  [data-theme="dark"] .offduty-photos::before { opacity: 0.3; }
  .od-frame {
    padding: 7px;
    border-radius: 18px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.45));
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 24px 44px -28px rgba(60, 40, 25, 0.4);
  }
  [data-theme="dark"] .od-frame { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.16); }
  /* a loose stack: alternate frames sit a little lower and tilt the other way */
  .od-frame:nth-child(odd) { transform: rotate(-1.2deg); }
  .od-frame:nth-child(even) { transform: translateY(24px) rotate(1.2deg); }
  .od-frame img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: 12px;
  }

  @media (max-width: 560px) {
    .offduty-photos { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  /* ---------- CLOSING ---------- */
  /* rendered by React next to #portfolio-root, so it carries its own base styles */
  .home-end {
    display: grid;
    justify-items: center;
    gap: 22px;
    padding: clamp(96px, 12vw, 160px) 16px 56px;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }
  .home-end p { margin: 0; }
  .home-end-buddy { display: grid; justify-items: center; gap: 12px; font-size: 0.95rem; }
  .home-end-buddy span { color: var(--ink-soft); }
  .orb-spot-end { width: 96px; height: 96px; }
  .home-end .hero-ctas { margin-top: 0; }
  .home-end-sign { margin-top: 32px !important; font-size: 0.82rem; color: var(--ink-soft); }
  .home-end-sign a { color: inherit; }
  /* ---------- SCROLL REVEAL ---------- */
  /* Things appear as you reach them: each block rises from below, out of a
     soft blur, one after the other. Uses translate/scale (not transform) so it
     never fights the compass, which drives transform from JS. */
  .rv {
    opacity: 0;
    translate: 0 56px;
    scale: 0.98;
    filter: blur(8px);
    transition: opacity 0.9s ease, translate 1.1s cubic-bezier(0.22, 1, 0.36, 1), scale 1.1s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s ease;
    transition-delay: var(--d, 0s);
  }
  .rv.in { opacity: 1; translate: 0 0; scale: 1; filter: none; }
  .offduty-photos.rv .od-frame { opacity: 0; translate: 0 40px; rotate: -3deg; transition: opacity 0.8s ease, translate 1s cubic-bezier(0.22, 1, 0.36, 1), rotate 1s cubic-bezier(0.22, 1, 0.36, 1); }
  .offduty-photos.rv.in .od-frame { opacity: 1; translate: 0 0; rotate: 0deg; }
  .offduty-photos.rv .od-frame:nth-child(2) { transition-delay: 0.12s; }
  .offduty-photos.rv .od-frame:nth-child(3) { transition-delay: 0.24s; }
  .offduty-photos.rv .od-frame:nth-child(4) { transition-delay: 0.36s; }

  /* the compass assembles when you reach it: dial swings in, cards rise */
  .compass-dial { transition: opacity 1s ease, scale 1.2s cubic-bezier(0.22, 1, 0.36, 1), rotate 1.4s cubic-bezier(0.22, 1, 0.36, 1); }
  .compass:not(.in) .compass-dial { opacity: 0; scale: 0.92; rotate: 14deg; }
  .compass-cards, .compass-meta, .compass-needle, .compass-count { transition: opacity 0.9s ease 0.3s, translate 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s; }
  .compass:not(.in) .compass-cards { opacity: 0; translate: 0 80px; }
  .compass:not(.in) .compass-meta { opacity: 0; translate: 0 30px; }
  .compass:not(.in) .compass-needle, .compass:not(.in) .compass-count { opacity: 0; }

  /* hero plays in on load */
  .hero > * { animation: hero-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hero > .hero-hello { animation-delay: 0.1s; }
  .hero > .hero-buddy { animation-delay: 0.35s; }
  .hero > .hero-bio { animation-delay: 0.6s; }
  .hero > .hero-stats { animation-delay: 0.75s; }
  @keyframes hero-in { from { opacity: 0; translate: 0 40px; filter: blur(8px); } to { opacity: 1; translate: 0 0; filter: none; } }
  .hero-stats > div { animation: hero-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hero-stats > div:nth-child(1) { animation-delay: 0.85s; }
  .hero-stats > div:nth-child(2) { animation-delay: 0.93s; }
  .hero-stats > div:nth-child(3) { animation-delay: 1.01s; }
  .hero-stats > div:nth-child(4) { animation-delay: 1.09s; }
  .hero-stats > div:nth-child(5) { animation-delay: 1.17s; }

  @media (prefers-reduced-motion: reduce) {
    .rv, .offduty-photos.rv .od-frame { opacity: 1; translate: none; scale: none; rotate: none; filter: none; transition: none; }
    .compass:not(.in) .compass-dial, .compass:not(.in) .compass-cards, .compass:not(.in) .compass-meta,
    .compass:not(.in) .compass-needle, .compass:not(.in) .compass-count { opacity: 1; scale: none; rotate: none; translate: none; }
    .hero > *, .hero-stats > div { animation: none; }
  }

  /* ---------- SIDE NAV DOTS ---------- */
  .side-nav {
    position: fixed;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 14px;
    z-index: 100;
  }

  .side-nav a {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--line);
    display: block;
    position: relative;
    transition: background 0.25s, transform 0.25s;
  }

  .side-nav a::after {
    content: attr(data-label);
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    color: var(--ink-soft);
    background: var(--bg);
    padding: 2px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .side-nav a:hover::after { opacity: 1; }

  .side-nav a:hover { transform: scale(1.3); }

  .side-nav a.active {
    background: var(--accent);
    transform: scale(1.3);
  }

  @media (max-width: 860px) {
    .side-nav { display: none; }
  }

  /* ---------- SIDE PANEL ---------- */
  .panel-overlay {
    position: fixed;
    inset: 0;
    background: rgba(28, 26, 23, 0.35);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 199;
  }

  .panel-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .side-panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: min(560px, 92vw);
    background: var(--bg);
    box-shadow: -18px 0 40px -20px rgba(28, 26, 23, 0.4);
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 200;
    padding: 40px 32px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .side-panel.open { transform: translateX(0); }

  .side-panel.expanded { width: min(880px, 96vw); }

  @media (max-width: 560px) {
    .side-panel { padding: 28px 20px; }
  }

  .side-panel .panel-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .side-panel .panel-close,
  .side-panel .panel-expand {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: var(--ink-soft);
    transition: color 0.2s;
  }

  .side-panel .panel-close:hover,
  .side-panel .panel-expand:hover { color: var(--accent); }

  .side-panel .panel-expand {
    display: none;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 5px 12px;
  }

  @media (min-width: 640px) {
    .side-panel .panel-expand { display: inline-flex; }
  }

  .side-panel .panel-expand .arrow {
    display: inline-block;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .side-panel.expanded .panel-expand .arrow { transform: rotate(180deg); }

  .side-panel .panel-fade {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .side-panel.content-in .panel-fade { opacity: 1; transform: translateY(0); }

  .side-panel h3 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .side-panel .panel-tagline {
    font-size: 1rem;
    color: var(--ink-soft);
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }

  .side-panel ul {
    list-style: none;
  }

  .side-panel #panel-list li {
    font-size: 0.9rem;
    color: var(--ink-soft);
    padding: 14px 0;
    border-top: 1px dashed var(--line);
  }

  .side-panel #panel-list li:last-child { border-bottom: 1px dashed var(--line); }

  .side-panel #panel-list li strong {
    display: block;
    color: var(--ink);
    font-family: 'Fraunces', serif;
    font-size: 1.02rem;
    font-weight: 500;
    margin-bottom: 4px;
  }

  #panel-process {
    background: var(--chip);
    border-radius: 12px;
    padding: 4px 18px;
    margin-top: 8px;
  }

  #panel-process .panel-section-label { margin-top: 18px; }

  #panel-process li {
    font-size: 0.88rem;
    color: var(--ink-soft);
    padding: 13px 0;
    border-top: 1px solid rgba(28, 26, 23, 0.08);
  }

  #panel-process li:last-child { border-bottom: none; }

  #panel-process li strong {
    display: flex;
    align-items: baseline;
    gap: 8px;
    color: var(--ink);
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 3px;
  }

  #panel-process li {
    counter-increment: process-step;
  }

  #panel-process ul { counter-reset: process-step; }

  #panel-process li strong::before {
    content: counter(process-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    flex-shrink: 0;
  }

  .panel-gallery {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .panel-gallery img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid var(--line);
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
  }

  .panel-gallery img:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 32px -18px rgba(28, 26, 23, 0.35);
  }

  .panel-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    color: var(--ink-soft);
    margin: 6px 0 22px;
  }

  .panel-section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
    margin: 26px 0 10px;
  }

  .panel-quote {
    margin-top: 22px;
    padding: 16px 18px;
    border-left: 2px solid var(--line);
    font-style: italic;
    font-size: 0.9rem;
    color: var(--ink-soft);
  }

  .panel-tag {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid currentColor;
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  /* ---------- INTERSTITIAL (cinematic scroll-scrubbed reveal: blur/scale/color tied to scroll position) ---------- */
  .interstitial {
    position: relative;
    padding: clamp(72px, 10vw, 128px) 0 0;
  }

  .interstitial .int-frame {
    position: relative;
    display: block;
    height: clamp(240px, 40vw, 520px);
    padding: 10px;
    border-radius: 24px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.45));
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 30px 60px -32px rgba(60, 40, 25, 0.35);
    cursor: pointer;
  }
  [data-theme="dark"] .interstitial .int-frame { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.16); }
  .interstitial .int-frame::before {
    content: "";
    position: absolute;
    inset: -12% -6%;
    z-index: -1;
    background:
      radial-gradient(closest-side, rgba(168, 220, 207, 0.45), transparent) 0% 40% / 55% 80% no-repeat,
      radial-gradient(closest-side, rgba(203, 188, 244, 0.4), transparent) 100% 20% / 50% 70% no-repeat,
      radial-gradient(closest-side, rgba(255, 210, 189, 0.4), transparent) 50% 100% / 50% 60% no-repeat;
  }
  [data-theme="dark"] .interstitial .int-frame::before { opacity: 0.3; }
  .interstitial .int-clip {
    display: block;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
  }

  .interstitial .int-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    display: block;
    will-change: filter, transform;
  }

  .interstitial .int-caption {
    margin-top: 16px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
    text-decoration: none;
    cursor: pointer;
  }
  .interstitial .int-caption:hover { color: var(--ink) !important; }
`;

// Selected Work compass: one stop per case study, in dial order.
const workItems = [
  { slug: "career-paths-platform", dial: "Career paths", tag: "HR Tech, Internal Product", tagClass: "tag-ai", img: "/work/v2/career-paths.jpg", title: "Making growth visible: from a career framework to a tool people use", teaser: "From interviews to shipped code, designed and built end to end with AI." },
  { slug: "narrative-landing-page", dial: "Story landing", tag: "AI SaaS, Landing Page", tagClass: "tag-ai", img: "/work/v2/story-landing.jpg", title: "Designing a landing page that doesn't tell a story, it is one", teaser: "Complete creative freedom, one hidden instruction, and a 48-hour timeframe." },
  { slug: "warehouse-workflow-manager", dial: "Warehouse", tag: "Fashion &amp; Retail, Logistics", tagClass: "tag-design", img: "/work/v2/warehouse.jpg", title: "Bringing digital workflows into a physical environment", teaser: "Five systems, no single source of truth, manual workarounds every single day." },
  { slug: "smart-financing-application-flow", dial: "Funding flow", tag: "Financial Technology", tagClass: "tag-startup", img: "/work/v2/funding-flow.jpg", title: "Turning a document-heavy funding application into a guided flow", teaser: "Multi-step, multi-document, zero guidance. Most people gave up halfway." },
  { slug: "retail-store-management-tools", dial: "Store teams", tag: "Fashion &amp; Retail, Mobile + Desktop", tagClass: "tag-community", img: "/work/v2/store-teams.jpg", title: "Designing for global store teams with different needs and different devices", teaser: "One team, completely different needs, and devices that had nothing in common." },
  { slug: "facility-management-platform", dial: "Facility SaaS", tag: "Facility Management, SaaS", tagClass: "tag-design", img: "/work/v2/facility-saas.jpg", title: "When powerful software becomes too complex to use", teaser: "A platform with everything, that users actively worked around." },
];

const COMPASS_STEP = 22; // degrees between two projects on the dial

const compassTicks = Array.from({ length: 240 }, (_, i) =>
  `<line x1="0" y1="-491" x2="0" y2="${i % 10 === 0 ? -474 : -484}" transform="rotate(${i * 1.5})" class="${i % 10 === 0 ? "major" : ""}" />`
).join("");

const compassHtml = `
    <div class="compass" id="compass" style="height: ${workItems.length * 80 + 100}vh">
      <div class="compass-stage">
        <div class="compass-aura" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="compass-count"><span id="compass-index">01</span> / ${String(workItems.length).padStart(2, "0")}</div>
        <div class="compass-needle" aria-hidden="true"></div>
        <div class="compass-dial" id="compass-dial">
          <svg viewBox="-500 -500 1000 1000" aria-hidden="true">${compassTicks}</svg>
          ${workItems.map((w, i) => `<button type="button" class="compass-name ${w.tagClass}" data-index="${i}" style="transform: rotate(${i * COMPASS_STEP}deg)"><span>${w.dial}</span></button>`).join("")}
        </div>
        <div class="compass-cards" id="compass-cards">
          ${workItems.map((w, i) => `<a class="compass-card" href="/work/${w.slug}" data-index="${i}" tabindex="${i === 0 ? 0 : -1}" aria-label="${w.title}"><img src="${w.img}" alt="" /></a>`).join("")}
        </div>
        <div class="compass-meta" id="compass-meta">
          <div class="work-tag ${workItems[0].tagClass}" id="compass-tag">${workItems[0].tag}</div>
          <h3 id="compass-title">${workItems[0].title}</h3>
          <p id="compass-teaser">${workItems[0].teaser}</p>
          <a class="compass-cta" id="compass-cta" href="/work/${workItems[0].slug}">Read the case study <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
`;

const bodyHtml = `
<div id="progress-bar"></div>
<div class="theme-wave" id="theme-wave"></div>


<main>

<header class="topbar">
  <a class="tb-btn" href="#top" aria-label="Back to top">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z"/></svg>
  </a>
  <button class="tb-btn" id="tb-menu" type="button" aria-expanded="false" aria-controls="tb-list" aria-label="Menu">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14M5 15h14"/></svg>
  </button>
  <nav class="tb-list" id="tb-list" hidden>
    <a href="#work"><span>01</span>Work</a>
    <a href="#experience"><span>02</span>Experience</a>
    <a href="#education"><span>03</span>Education</a>
    <a href="#skills"><span>04</span>Skills</a>
    <a href="#offduty"><span>05</span>Off duty</a>
    <a href="mailto:isabellabonora1@gmail.com"><span>06</span>Contact ↗</a>
  </nav>
</header>

  <section class="hero" id="top">
    <div class="hero-hello">
      <button class="hero-photo-toggle" id="theme-toggle" type="button" aria-label="Toggle night mode" aria-pressed="false" title="Click for night mode">
        <img class="hero-photo" src="/isabella-portrait.jpg" alt="Isabella Bonora" />
        <span class="theme-badge" aria-hidden="true">
          <span class="icon-sun">☀</span>
          <span class="icon-moon">☾</span>
        </span>
      </button>
      <div>
        <h1>Hello, I'm Isabella.</h1>
        <p>I design products, and build them.</p>
      </div>
    </div>

    <div class="hero-buddy">
      <div class="orb-spot" id="orb-spot"></div>
      <p>Hi, I'm Isa's sidekick. <span>Scroll on, I'll show you around.</span></p>
    </div>

    <div class="hero-bio">
      <p class="hero-lead">Product &amp; UX designer with a non-linear path: a startup of my own in 2020, then projects with early-stage teams, and since 2023 at CodicePlastico, from discovery to shipped code.</p>
      <p class="hero-more">I also facilitate hackathons, speak at events and run a tech community.</p>
      <div class="hero-ctas">
        <a class="btn-pill" href="mailto:isabellabonora1@gmail.com">Contact</a>
        <a class="link-arrow" href="#work">See the work <span aria-hidden="true">→</span></a>
      </div>
    </div>

    <dl class="hero-stats">
      <div><dt>Years in product</dt><dd>06</dd></div>
      <div><dt>Case studies</dt><dd>06</dd></div>
      <div><dt>Community members</dt><dd>90+</dd></div>
      <div><dt>Public talks</dt><dd>03</dd></div>
      <div><dt>Hackathons facilitated</dt><dd>02</dd></div>
    </dl>
  </section>

  <section class="block reveal" id="work">
    <h2>Selected Work</h2>

${compassHtml}
  </section>

  <section class="sec reveal" id="experience">
    <h2 class="sec-label"><span>02</span>Experience</h2>
    <div class="sec-body">
      <div class="xp-group">Product work</div>
      <div class="xp">
        <div class="xp-period">2023 → now</div>
        <div class="xp-main">
          <h3>Product &amp; UX Designer</h3>
          <div class="xp-org">CodicePlastico</div>
          <p>End-to-end UX for B2B and B2C products across 14 clients: from co-design workshops to hi-fi prototypes and developer handoff. AI is part of the daily workflow (Claude, Gemini, Figma AI), to get from requirements to something testable faster.</p>
        </div>
        <div class="work-tag tag-design">Design</div>
      </div>
      <div class="xp">
        <div class="xp-period">2021 → now</div>
        <div class="xp-main">
          <h3>Product Designer &amp; No-code Builder</h3>
          <div class="xp-org">Freelance</div>
          <p>Design and build MVPs for early-stage startups (3 so far) in Bubble.io, from user research to production. Long-term partner for one of them, growing its MVP into a scaled platform.</p>
        </div>
        <div class="work-tag tag-ai">No-code</div>
      </div>
      <div class="xp">
        <div class="xp-period">2020 → 2021</div>
        <div class="xp-main">
          <h3>Co-founder</h3>
          <div class="xp-org">Mimiroo, Startup Geeks Incubator</div>
          <p>A platform matching tutors and students, built inside the Startup Geeks incubator. Led validation and research, then designed, built and tested the MVP myself.</p>
        </div>
        <div class="work-tag tag-startup">Startup</div>
      </div>

      <div class="xp-group">Alongside</div>
      <div class="xp xp-compact">
        <div class="xp-period">2026 → now</div>
        <div class="xp-main">
          <h3>Startup Mentor</h3>
          <div class="xp-org">Startup Geeks</div>
          <p>Back at the incubator that hosted Mimiroo, now mentoring early-stage founders on problem and idea validation and on scoping the MVP.</p>
        </div>
        <div class="work-tag tag-startup">Startup</div>
      </div>
      <div class="xp xp-compact">
        <div class="xp-period">2025 → now</div>
        <div class="xp-main">
          <h3>Hackathon Facilitator</h3>
          <div class="xp-org">Sprintaly</div>
          <p>Two editions of a residential hackathon in Turin for under-30s, about 170 participants in total, from problem framing to MVP.</p>
        </div>
        <div class="work-tag tag-startup">Startup</div>
      </div>
      <div class="xp xp-compact">
        <div class="xp-period">2025 → now</div>
        <div class="xp-main">
          <h3>Founder &amp; Community Organizer</h3>
          <div class="xp-org">Digital People</div>
          <p>A <span class="count-up" data-target="90">0</span>+ member community for tech people in Trentino-Alto Adige. 7+ meetups so far, talks on AI-native design.</p>
        </div>
        <div class="work-tag tag-community">Community</div>
      </div>
    </div>
  </section>

  <section class="interstitial reveal" id="interstitial">
    <a class="int-frame" href="#offduty">
      <span class="int-clip"><img src="/isa/isa-talk-xpug-crop.jpg" alt="Isabella speaking on Rethink UX at XPUG Trento" /></span>
    </a>
    <div class="int-caption jump-link" data-jump="offduty">Rethink UX, XPUG Trento ↓</div>
  </section>

  <section class="sec reveal" id="education">
    <h2 class="sec-label"><span>03</span>Education</h2>
    <div class="sec-body">
      <div class="edu">
        <div class="edu-period">2021 → 2023</div>
        <div>
          <h3>UX / UI Design Master</h3>
          <p class="edu-school">Start2Impact University</p>
        </div>
      </div>

      <div class="edu">
        <div class="edu-period">2020 → 2022</div>
        <div>
          <h3>MSc Management of Innovation &amp; Entrepreneurship</h3>
          <p class="edu-school">University of Milan</p>
          <p class="edu-thesis">Thesis: "User Experience in Early-Stage Startups: The Impact of Lean UX on Entrepreneurial Idea Development."</p>
        </div>
      </div>

      <div class="edu">
        <div class="edu-period">2017 → 2020</div>
        <div>
          <h3>BSc Business Administration</h3>
          <p class="edu-school">University of Brescia</p>
          <p class="edu-thesis">Thesis on Big Data analytics with Power BI.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec reveal" id="skills">
    <h2 class="sec-label"><span>04</span>Skills &amp; Tools</h2>
    <div class="sec-body">
      <div class="skill-cards">
        <div class="skill-card">
          <div class="skill-card-label">Design</div>
          <ul><li>UX Research</li><li>User Journey &amp; Flow</li><li>Wireframing &amp; Prototyping</li><li>UI Design</li><li>Usability Testing</li></ul>
        </div>
        <div class="skill-card">
          <div class="skill-card-label">Strategy</div>
          <ul><li>As-is Analysis</li><li>Competitor Analysis</li><li>Market Research</li><li>Requirements Gathering</li></ul>
        </div>
        <div class="skill-card">
          <div class="skill-card-label">Facilitation</div>
          <ul><li>Co-design Workshops</li><li>Hackathon Facilitation</li></ul>
        </div>
      </div>

      <div class="tools">
        <span>Figma</span><span>Bubble.io</span><span>Github</span><span>Framer</span><span>Whimsical</span><span>Miro</span><span>Notion</span><span>Claude</span><span>VS Code</span><span>Midjourney</span><span>Webflow</span>
      </div>
    </div>
  </section>

  <section class="sec reveal" id="offduty">
    <h2 class="sec-label"><span>05</span>Off Duty</h2>
    <div class="sec-body">
      <p class="offduty-text">Outside of product work, I'm usually on a yoga mat, out for a run, <strong>slowly, but consistently</strong>, or in the kitchen attempting a pizza that doesn't always come out right. I also spend a lot of time with the Digital People community I founded, meeting up in person and talking AI-native design at local events.</p>
      <div class="offduty-photos">
        <figure class="od-frame"><img src="/isa/isa-talk-1.JPG" alt="Isabella speaking at a tech community event" /></figure>
        <figure class="od-frame"><img src="/isa/isa-talk-2.JPG" alt="Isabella facilitating a community event" /></figure>
        <figure class="od-frame"><img src="/isa/community.jpeg" alt="Digital People community meetup" /></figure>
        <figure class="od-frame"><img src="/isa/photo_2026-07-18 10.58.34.jpeg" alt="Isabella off duty" /></figure>
      </div>
    </div>
  </section>
</main>

<div class="buddy" id="buddy">
  <svg class="orb" id="orb" viewBox="-100 -100 200 200" aria-hidden="true">
    <defs>
      <path id="orb-shape" />
      <clipPath id="orb-clip"><use href="#orb-shape" /></clipPath>
      <radialGradient id="orb-glass" cx="42%" cy="38%" r="62%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.35" />
        <stop offset="0.7" stop-color="#e8f1f0" stop-opacity="0.45" />
        <stop offset="1" stop-color="#b7cfd0" stop-opacity="0.8" />
      </radialGradient>
      <linearGradient id="orb-edge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.95" />
        <stop offset="0.45" stop-color="#ffffff" stop-opacity="0.15" />
        <stop offset="1" stop-color="#5d7f86" stop-opacity="0.7" />
      </linearGradient>
      <filter id="orb-blur-s" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id="orb-blur-l" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
      <filter id="orb-blur-xl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="16" /></filter>
    </defs>
    <ellipse id="orb-shadow" cx="0" cy="88" rx="44" ry="6" fill="rgba(93, 127, 134, 0.22)" filter="url(#orb-blur-l)" />
    <g id="orb-g">
      <g clip-path="url(#orb-clip)">
        <rect x="-100" y="-100" width="200" height="200" fill="#f4f7f6" />
        <g filter="url(#orb-blur-xl)">
          <circle class="orb-tint" data-k="0" r="42" fill="#a8dccf" />
          <circle class="orb-tint" data-k="1" r="38" fill="#cbbcf4" />
          <circle class="orb-tint" data-k="2" r="36" fill="#ffd2bd" />
        </g>
        <use href="#orb-shape" fill="url(#orb-glass)" />
        <ellipse cx="6" cy="56" rx="30" ry="12" fill="#ffffff" opacity="0.7" filter="url(#orb-blur-l)" />
        <ellipse id="orb-spec" cx="-24" cy="-32" rx="28" ry="15" fill="#fff" opacity="0.75" filter="url(#orb-blur-s)" transform="rotate(-30)" />
        <ellipse id="orb-spec-dot" cx="-30" cy="-36" rx="10" ry="3.8" fill="#fff" transform="rotate(-30)" />
      </g>
      <use href="#orb-shape" fill="none" stroke="url(#orb-edge)" stroke-width="2.4" />
      <g id="orb-eyes">
        <g class="orb-eye" transform="translate(-15 -2)">
          <ellipse rx="4.6" ry="6.4" fill="#1c2a2c" />
          <circle cx="1.4" cy="-2.2" r="1.4" fill="#fff" />
        </g>
        <g class="orb-eye" transform="translate(15 -2)">
          <ellipse rx="4.6" ry="6.4" fill="#1c2a2c" />
          <circle cx="1.4" cy="-2.2" r="1.4" fill="#fff" />
        </g>
      </g>
    </g>
  </svg>
</div>
<p class="buddy-say" id="buddy-say" aria-live="polite"></p>

<div class="panel-overlay" id="panel-overlay"></div>
<aside class="side-panel" id="side-panel">
  <div class="panel-top">
    <button class="panel-close" id="panel-close">close ✕</button>
    <button class="panel-expand" id="panel-expand"><span class="expand-label">expand</span> <span class="arrow">→</span></button>
  </div>
  <div class="panel-tag panel-fade" id="panel-tag"></div>
  <h3 class="panel-fade" id="panel-title"></h3>
  <p class="panel-role panel-fade" id="panel-role"></p>
  <p class="panel-tagline panel-fade" id="panel-tagline"></p>
  <div class="panel-gallery panel-fade" id="panel-gallery"></div>
  <div class="panel-section-label panel-fade" id="panel-list-label">Overview</div>
  <ul class="panel-fade" id="panel-list"></ul>
  <div class="panel-fade" id="panel-process"></div>
  <div class="panel-quote panel-fade" id="panel-quote"></div>
</aside>
`;

export default function Home() {
  // The drop: a soft blob whose outline breathes, that leans toward the cursor
  // and floats; the highlight slides the other way so it reads as a 3D surface.
  useEffect(() => {
    const shape = document.getElementById("orb-shape");
    const g = document.getElementById("orb-g");
    const shadow = document.getElementById("orb-shadow");
    const spec = document.getElementById("orb-spec");
    const dot = document.getElementById("orb-spec-dot");
    const svg = document.getElementById("orb");
    if (!shape || !g || !shadow || !spec || !dot || !svg) return;

    const tints = Array.from(svg.querySelectorAll<SVGCircleElement>(".orb-tint"));
    const eyes = svg.querySelector<SVGGElement>("#orb-eyes")!;
    const N = 18;
    const R = 62;
    const lean = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    // poking: only the spot under the cursor gives way, a shallow local dent
    // that quivers for a moment when touched; the rest of the drop stays put
    const pointer = { x: -1e4, y: -1e4 };
    let poke = 0;
    let pokeAngle = 0;
    let jiggle = 0;
    let wasIn = false;
    let raf = 0;
    let blinkAt = 2.5;

    // closed Catmull-Rom spline through the points, as cubic Béziers
    const toPath = (pts: { x: number; y: number }[]) => {
      let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
      for (let i = 0; i < pts.length; i++) {
        const p0 = pts[(i - 1 + pts.length) % pts.length];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        const p3 = pts[(i + 2) % pts.length];
        const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
        d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
      }
      return d + "Z";
    };

    const frame = (ms: number) => {
      const t = ms / 1000;
      lean.x += (target.x - lean.x) * 0.06;
      lean.y += (target.y - lean.y) * 0.06;
      const leanAngle = Math.atan2(lean.y, lean.x);
      const leanMag = Math.min(1, Math.hypot(lean.x, lean.y));

      // cursor position in the drawing's own units (the viewBox is 200 wide)
      const box = svg.getBoundingClientRect();
      const ux = ((pointer.x - (box.left + box.width / 2)) / box.width) * 200;
      const uy = ((pointer.y - (box.top + box.height / 2)) / box.height) * 200;
      const inside = Math.hypot(ux, uy) < R * 1.15;
      if (inside && !wasIn) jiggle = 1;
      wasIn = inside;
      if (inside) pokeAngle = Math.atan2(uy, ux);
      poke += ((inside ? 1 : 0) - poke) * 0.12;
      jiggle *= 0.965;

      // nearly round: a gentle breath plus a soft squash while floating
      const float = Math.sin(t * 1.1);
      const pts = Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2;
        // low harmonics of the angle, so the outline stays smooth however many points it has
        const wobble = 0.018 * Math.sin(t * 0.8 + a * 2) + 0.01 * Math.sin(t * 1.5 + a * 3 + 1.3);
        const pull = 0.05 * leanMag * Math.max(0, Math.cos(a - leanAngle));
        const near = Math.max(0, Math.cos(a - pokeAngle)) ** 10; // 1 under the cursor, 0 a little way off
        const dent = -near * (0.1 * poke + 0.03 * jiggle * Math.sin(t * 12));
        const r = R * (1 + wobble + pull + dent);
        return { x: Math.cos(a) * r * (1 + float * 0.015), y: Math.sin(a) * r * (1 - float * 0.015) };
      });
      shape.setAttribute("d", toPath(pts));

      // colour drifting inside the glass
      tints.forEach((c, k) => {
        const ph = t * 0.35 + k * 2.1;
        c.setAttribute("cx", (Math.cos(ph) * 26 - lean.x * 10).toFixed(2));
        c.setAttribute("cy", (Math.sin(ph * 1.3) * 24 - lean.y * 10).toFixed(2));
      });

      // eyes follow the cursor and blink every few seconds
      let lid = 1;
      if (t > blinkAt) {
        const k = (t - blinkAt) / 0.16;
        lid = k < 1 ? Math.abs(1 - 2 * k) * 0.9 + 0.1 : 1;
        if (k >= 1) blinkAt = t + 2.5 + Math.random() * 3.5;
      }
      lid *= 1 - 0.2 * poke; // a slight squint while poked
      eyes.setAttribute("transform", `translate(${(lean.x * 12).toFixed(2)} ${(lean.y * 9).toFixed(2)}) scale(1 ${lid.toFixed(3)})`);

      g.setAttribute("transform", `translate(${(lean.x * 6).toFixed(2)} ${(float * 5 + lean.y * 4).toFixed(2)})`);
      shadow.setAttribute("rx", (44 - float * 5).toFixed(2));
      shadow.setAttribute("opacity", (0.9 - float * 0.12).toFixed(2));
      spec.setAttribute("transform", `translate(${(-lean.x * 8).toFixed(2)} ${(-lean.y * 8).toFixed(2)}) rotate(-30)`);
      dot.setAttribute("transform", `translate(${(-lean.x * 10).toFixed(2)} ${(-lean.y * 10).toFixed(2)}) rotate(-30)`);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(window.innerWidth, window.innerHeight) * 0.6;
      target = { x: dx / reach, y: dy / reach };
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame(0);
      cancelAnimationFrame(raf);
      return;
    }
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Floating pill nav: the menu opens a small list of sections.
  useEffect(() => {
    const btn = document.getElementById("tb-menu");
    const list = document.getElementById("tb-list");
    if (!btn || !list) return;
    const setOpen = (open: boolean) => {
      list.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    };
    const onBtn = (e: MouseEvent) => { e.stopPropagation(); setOpen(list.hidden); };
    const onDoc = (e: MouseEvent) => { if (!list.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    btn.addEventListener("click", onBtn);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      btn.removeEventListener("click", onBtn);
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Selected Work compass: scroll turns the dial; the project cards ride an arc
  // with it (active one centred and sharp, neighbours smaller and blurred).
  // The position eases toward the scroll target so the motion stays soft.
  useEffect(() => {
    const host = document.getElementById("compass");
    const dial = document.getElementById("compass-dial");
    if (!host || !dial) return;
    const cards = Array.from(host.querySelectorAll<HTMLAnchorElement>(".compass-card"));
    const names = Array.from(host.querySelectorAll<HTMLButtonElement>(".compass-name"));
    const meta = document.getElementById("compass-meta")!;
    const cta = document.getElementById("compass-cta") as HTMLAnchorElement;
    const tag = document.getElementById("compass-tag")!;
    const title = document.getElementById("compass-title")!;
    const teaser = document.getElementById("compass-teaser")!;
    const index = document.getElementById("compass-index")!;
    const n = workItems.length;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = -1;
    let current = 0;
    let target = 0;
    let raf = 0;
    let swap = 0;
    let idle = 0;
    let settled = false;

    const setActive = (i: number) => {
      if (i === active) return;
      active = i;
      const w = workItems[i];
      names.forEach((b, k) => b.classList.toggle("is-active", k === i));
      cards.forEach((c, k) => { c.tabIndex = k === i ? 0 : -1; });
      index.textContent = String(i + 1).padStart(2, "0");
      cta.href = `/work/${w.slug}`;
      meta.classList.add("is-changing");
      clearTimeout(swap);
      swap = window.setTimeout(() => {
        tag.className = `work-tag ${w.tagClass}`;
        tag.innerHTML = w.tag;
        title.textContent = w.title;
        teaser.textContent = w.teaser;
        meta.classList.remove("is-changing");
      }, 220);
    };

    const render = (c: number) => {
      dial.style.transform = `translateX(-50%) rotate(${-c * COMPASS_STEP}deg)`;
      const arc = Math.min(1100, window.innerWidth * 1.1);
      cards.forEach((card, k) => {
        const d = k - c;
        const ad = Math.abs(d);
        if (ad > 2.2) { card.style.visibility = "hidden"; return; }
        card.style.visibility = "visible";
        const angle = d * 28 * (Math.PI / 180);
        const x = Math.sin(angle) * arc;
        const y = (1 - Math.cos(angle)) * arc;
        const scale = 1 - Math.min(ad, 2) * 0.2;
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(d * 28).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = String(Math.max(0, 1 - ad * 0.5).toFixed(3));
        card.style.filter = ad < 0.05 ? "none" : `blur(${(ad * 3).toFixed(2)}px)`;
        card.style.zIndex = String(10 - Math.round(ad * 3));
      });
      setActive(Math.round(c));
    };

    const readTarget = () => {
      const travel = host.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -host.getBoundingClientRect().top / travel));
      target = p * (n - 1);
    };
    // once scrolling pauses, the compass settles like a magnet on the nearest project
    const tick = () => {
      const goal = settled ? Math.round(target) : target;
      current += (goal - current) * (settled ? 0.08 : 0.14);
      if (Math.abs(goal - current) < 0.001) current = goal;
      render(current);
      raf = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      readTarget();
      settled = false;
      clearTimeout(idle);
      idle = window.setTimeout(() => { settled = true; if (!raf) raf = requestAnimationFrame(tick); }, 160);
      if (still) { current = target; render(current); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const goTo = (i: number) => {
      const travel = host.offsetHeight - window.innerHeight;
      const top = host.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (i / (n - 1)) * travel + 1, behavior: still ? "auto" : "smooth" });
    };
    const nameHandlers = names.map((b) => {
      const handler = () => goTo(Number(b.dataset.index));
      b.addEventListener("click", handler);
      return { b, handler };
    });
    // clicking a side card turns the compass to it instead of opening it
    // open a case with a flight: clone the card, grow it to the centre, then navigate
    const still2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const openCase = (k: number) => {
      const href = `/work/${workItems[k].slug}`;
      if (still2) { window.location.href = href; return; }
      const card = cards[k];
      const r = card.getBoundingClientRect();
      const fly = card.cloneNode(true) as HTMLElement;
      fly.classList.add("compass-fly");
      Object.assign(fly.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      const veil = document.createElement("div");
      veil.className = "page-veil";
      document.body.append(veil, fly);
      const w = Math.min(960, window.innerWidth * 0.86);
      const h = w / 1.232;
      const target = { left: (window.innerWidth - w) / 2, top: Math.max(24, (window.innerHeight - h) / 2), width: w, height: h };
      requestAnimationFrame(() => {
        veil.classList.add("on");
        Object.assign(fly.style, { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` });
      });
      try { sessionStorage.setItem("case-fly", JSON.stringify(target)); } catch { /* private mode: no hand-off */ }
      window.setTimeout(() => { window.location.href = href; }, 620);
    };
    const cardHandlers = cards.map((c) => {
      const handler = (e: MouseEvent) => {
        e.preventDefault();
        const k = Number(c.dataset.index);
        if (k !== active) goTo(k); else openCase(k);
      };
      c.addEventListener("click", handler);
      return { c, handler };
    });
    const onCta = (e: MouseEvent) => { e.preventDefault(); openCase(active); };
    cta.addEventListener("click", onCta);
    // back from a case via bfcache: drop the flight leftovers
    const onPageShow = () => document.querySelectorAll(".compass-fly, .page-veil").forEach((el) => el.remove());
    window.addEventListener("pageshow", onPageShow);

    // "/#work-3" lands on that project (used by the back link on case pages)
    const landFromHash = () => {
      const m = /^#work-(\d+)$/.exec(window.location.hash);
      if (!m) return;
      const k = Math.min(n - 1, Number(m[1]));
      const travel = host.offsetHeight - window.innerHeight;
      const top = host.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (k / (n - 1)) * travel + 1, behavior: "auto" });
    };
    landFromHash();
    window.addEventListener("hashchange", landFromHash);

    readTarget();
    current = target;
    render(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(swap);
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      nameHandlers.forEach(({ b, handler }) => b.removeEventListener("click", handler));
      cardHandlers.forEach(({ c, handler }) => c.removeEventListener("click", handler));
      cta.removeEventListener("click", onCta);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("hashchange", landFromHash);
    };
  }, []);
  // The drop comes along: it leaves the hero as you scroll, springs to a dock
  // in each section (under the sticky label on wide screens, a corner on
  // phones), says one line about where you are, and lands in the footer.
  useEffect(() => {
    const buddy = document.getElementById("buddy");
    const say = document.getElementById("buddy-say");
    const heroSpot = document.getElementById("orb-spot");
    const endSpot = document.getElementById("orb-spot-end");
    if (!buddy || !say || !heroSpot || !endSpot) return;

    const lines: Record<string, string> = {
      work: "Isa found out at an incubator that designing and building go together. Never stopped.",
      experience: "Fun fact: Startup Geeks incubated Isa's first startup. Now Isa mentors there.",
      interstitial: "That's Isa on stage at XPUG.",
      education: "Before Business Administration, Isa spent a year studying foreign languages. Wrong path, quick switch.",
      skills: "First job abroad? A guesthouse in the middle of nowhere, Scotland.",
      offduty: "Isa was racing on the track before knowing what a career was.",
    };
    const sections = Object.keys(lines).map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const DOCK = 88;
    type Side = "below" | "right" | "above";
    type Target = { id: string; x: number; y: number; size: number; side: Side };

    const target = (): Target => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const hero = heroSpot.getBoundingClientRect();
      if (hero.bottom > vh * 0.3) return { id: "top", x: hero.left, y: hero.top, size: hero.width, side: "below" };
      const end = endSpot.getBoundingClientRect();
      if (end.top < vh * 0.85) return { id: "end", x: end.left, y: end.top, size: end.width, side: "below" };
      const mid = vh * 0.45;
      const sec = sections.find((el) => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; }) ?? sections[0];
      const id = sec.id;
      if (vw <= 760) return { id, x: vw - 64 - 16, y: vh - 64 - 24, size: 64, side: "above" };
      if (id === "interstitial") {
        const f = sec.querySelector(".int-frame")!.getBoundingClientRect();
        return { id, x: f.left + 28, y: f.bottom - DOCK - 28, size: DOCK, side: "right" };
      }
      const label = sec.querySelector(".sec-label") ?? document.querySelector(".sec-label")!;
      const l = label.getBoundingClientRect();
      if (id === "work") return { id, x: l.left, y: vh * 0.5, size: DOCK, side: "below" };
      return { id, x: l.left, y: Math.max(l.bottom, 0) + 32, size: DOCK, side: "below" };
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: 0, y: 0, size: 0 };
    const vel = { x: 0, y: 0, size: 0 };
    let first = true;
    let shown = "";
    let sayTimer = 0;
    let raf = 0;

    const frame = () => {
      const t = target();
      if (first || reduce) {
        pos.x = t.x; pos.y = t.y; pos.size = t.size;
        first = false;
      } else {
        // a spring: tight while it sits in the hero, loose (a little bounce) when travelling
        const [k, damp] = t.id === "top" ? [0.35, 0.45] : [0.08, 0.8];
        (["x", "y", "size"] as const).forEach((key) => {
          vel[key] = vel[key] * damp + (t[key] - pos[key]) * k;
          pos[key] += vel[key];
        });
      }
      const base = buddy.offsetWidth || t.size;
      buddy.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) scale(${(pos.size / base).toFixed(4)})`;

      if (t.id !== shown) {
        shown = t.id;
        say.classList.remove("on");
        clearTimeout(sayTimer);
        const text = lines[t.id];
        if (text) sayTimer = window.setTimeout(() => { say.textContent = text; say.classList.add("on"); }, 450);
      }
      const w = say.offsetWidth, h = say.offsetHeight, s = pos.size;
      const [sx, sy] =
        t.side === "right" ? [pos.x + s + 12, pos.y + s / 2 - h / 2]
        : t.side === "above" ? [pos.x + s - w, pos.y - h - 10]
        : [pos.x, pos.y + s + 10];
      say.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(sayTimer);
    };
  }, []);

  // Cinematic scroll-scrubbed reveal: the talk photo starts blurred, desaturated and
  // slightly scaled up, then sharpens/colors/settles continuously as the section
  // crosses the viewport - tied to scroll position, not a fixed-length animation.
  useEffect(() => {
    const host = document.getElementById("interstitial");
    const photo = host?.querySelector(".int-frame img") as HTMLImageElement | null;
    if (!host || !photo) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = host!.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top just enters the viewport, 1 once it's fully in view
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.7)));
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

      const blur = (1 - eased) * 18;
      const saturation = 0.15 + eased * 0.85;
      const scale = 1.08 - eased * 0.08;

      photo.style.filter = `blur(${blur}px) saturate(${saturation})`;
      photo.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    // .jump-link elements (interstitial caption/photo, work summaries, etc.)
    // scroll to their target section and flash its heading.
    function onDocumentJumpLinkClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest(".jump-link") as HTMLElement | null;
      if (!link) return;
      e.preventDefault();
      const targetId = link.dataset.jump as string;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      const heading = targetEl.querySelector("h2");
      if (heading) {
        heading.classList.remove("flash-target");
        void (heading as HTMLElement).offsetWidth;
        heading.classList.add("flash-target");
      }
    }
    document.addEventListener("click", onDocumentJumpLinkClick);

    // day / night toggle
    const themeToggle = document.getElementById("theme-toggle") as HTMLButtonElement;
    const themeWave = document.getElementById("theme-wave") as HTMLElement;
    let themeAnimating = false;

    function setTheme(theme: string) {
      document.documentElement.classList.add("theme-transitioning");
      document.documentElement.setAttribute("data-theme", theme);
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 750);
    }

    function onThemeToggle() {
      if (themeAnimating) return;
      themeAnimating = true;

      themeWave.classList.remove("active");
      void themeWave.offsetWidth;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");

      requestAnimationFrame(() => themeWave.classList.add("active"));

      setTimeout(() => {
        themeWave.classList.remove("active");
        themeAnimating = false;
      }, 1300);
    }
    themeToggle.addEventListener("click", onThemeToggle);

    // reading progress bar
    const progressBar = document.getElementById("progress-bar") as HTMLElement;
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
    window.addEventListener("scroll", onScroll);

    // scroll reveal
    // every block inside a .reveal section appears on its own; blocks that
    // arrive together are staggered so they come in one after the other
    const revealObserver = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--d", `${(n++ * 0.09).toFixed(2)}s`);
          el.classList.add("in");
          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".reveal > *:not(.compass):not(.sec-body), .reveal .sec-body > *, .reveal .xp, .reveal .edu, .reveal .skill-card").forEach((el) => {
      if (el.querySelector(".xp, .edu, .skill-card")) return; // wrappers: their rows animate instead
      el.classList.add("rv");
      revealObserver.observe(el);
    });
    const compassEl = document.getElementById("compass");
    const compassObserver = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { compassEl?.classList.add("in"); compassObserver.disconnect(); }
    }, { rootMargin: "0px 0px -30% 0px" });
    if (compassEl) compassObserver.observe(compassEl);

    // side nav active state
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".side-nav a"));
    const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href") as string));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(`.side-nav a[href="#${entry.target.id}"]`);
          if (entry.isIntersecting && link) {
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => s && navObserver.observe(s));

    // count-up
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || "0", 10);
          const duration = 900;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = String(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".count-up").forEach((el) => countObserver.observe(el));

    // topic side panel data
    type PanelItem = { h: string; d: string };
    type TopicData = { title: string; tagline: string; items: PanelItem[] };
    type CaseData = {
      tag: string; tagColor: string; title: string; role: string; tagline: string;
      gallery: string[]; items: PanelItem[]; process: PanelItem[]; quote: string;
    };

    const topics: Record<string, TopicData> = {
      design: {
        title: "Design",
        tagline: "Research and prototyping that gets tested with real users, not just shipped as mockups.",
        items: [
          { h: "Product discovery @ CodicePlastico", d: "Turn ambiguous B2B/B2C requirements into testable prototypes, keeping stakeholders aligned end to end." },
          { h: "UX research & usability testing", d: "Wireframing, prototyping and usability testing across every freelance and startup project." },
          { h: "UX/UI Design Master, Start2Impact", d: "Practical program covering research, wireframing, UI design and testing." },
        ],
      },
      ai: {
        title: "AI & No-code",
        tagline: "Using AI and no-code tools to close the gap between a design decision and a working product.",
        items: [
          { h: "AI-native workflow @ CodicePlastico", d: "Integrate Claude, Gemini and Figma AI to sync design and technical documentation, cutting implementation errors." },
          { h: "No-code builder, freelance", d: "Build production-ready MVPs myself in Bubble.io, from validation to a working, scaled platform." },
          { h: "Speaking on AI-native design", d: "Talks at Product Heroes and XPUG on how AI changes the design-to-build process." },
        ],
      },
      startup: {
        title: "Startup",
        tagline: "Comfortable in high-uncertainty, early-stage environments where the problem is still being defined.",
        items: [
          { h: "Hackathon Facilitator @ Sprintaly", d: "Coach teams through Lean validation and rapid prototyping to pitch-ready MVPs in 48 to 72 hour sprints." },
          { h: "Product Lead & Co-founder, Mimiroo", d: "Startup Geeks Incubator: defined business model, ran competitor analysis, built and tested an EdTech MVP." },
          { h: "MSc Management of Innovation, Unimi", d: "Thesis on the impact of Lean UX on entrepreneurial idea development." },
        ],
      },
      community: {
        title: "Community",
        tagline: "Building spaces where people learn from each other, in person and consistently.",
        items: [
          { h: "Founder, Digital People", d: "Founded and scaled a tech community of 90+ members, running monthly meetups since 2025." },
          { h: "Co-design workshops & facilitation", d: "Facilitating alignment sessions that turn complex ideas into clear, shared value propositions." },
        ],
      },
    };


    const overlay = document.getElementById("panel-overlay") as HTMLElement;
    const panel = document.getElementById("side-panel") as HTMLElement;
    const panelExpand = document.getElementById("panel-expand") as HTMLButtonElement;
    const panelFadeEls = Array.from(document.querySelectorAll<HTMLElement>(".side-panel .panel-fade"));

    panelFadeEls.forEach((el, i) => {
      el.style.transitionDelay = `${0.05 + i * 0.05}s`;
    });

    const panelExpandLabel = panelExpand.querySelector(".expand-label") as HTMLElement;

    function onPanelExpand() {
      const isExpanded = panel.classList.toggle("expanded");
      panelExpandLabel.textContent = isExpanded ? "collapse" : "expand";
    }
    panelExpand.addEventListener("click", onPanelExpand);

    const panelTag = document.getElementById("panel-tag") as HTMLElement;
    const panelTitle = document.getElementById("panel-title") as HTMLElement;
    const panelRole = document.getElementById("panel-role") as HTMLElement;
    const panelTagline = document.getElementById("panel-tagline") as HTMLElement;
    const panelGallery = document.getElementById("panel-gallery") as HTMLElement;
    const panelList = document.getElementById("panel-list") as HTMLElement;
    const panelProcess = document.getElementById("panel-process") as HTMLElement;
    const panelQuote = document.getElementById("panel-quote") as HTMLElement;
    const pillButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".pill-btn"));

    function openPanel(data: TopicData | CaseData | undefined, key?: string) {
      if (!data) return;
      const caseData = data as CaseData;
      if (caseData.tag) {
        panelTag.textContent = caseData.tag;
        panelTag.style.color = caseData.tagColor || "var(--accent)";
        panelTag.style.display = "inline-block";
      } else {
        panelTag.style.display = "none";
      }
      panelTitle.textContent = data.title;
      panelRole.textContent = caseData.role || "";
      panelRole.style.display = caseData.role ? "block" : "none";
      panelTagline.textContent = data.tagline;
      panelGallery.innerHTML = caseData.gallery
        ? caseData.gallery.map((src) => `<img src="${src}" alt="${data.title}" />`).join("")
        : "";
      panelGallery.style.display = caseData.gallery ? "flex" : "none";
      panelList.innerHTML = data.items.map((it) => `<li><strong>${it.h}</strong>${it.d}</li>`).join("");
      panelProcess.innerHTML = caseData.process
        ? '<div class="panel-section-label">Process</div><ul>' +
          caseData.process.map((it) => `<li><strong>${it.h}</strong>${it.d}</li>`).join("") +
          "</ul>"
        : "";
      panelQuote.textContent = caseData.quote ? '"' + caseData.quote + '"' : "";
      panelQuote.style.display = caseData.quote ? "block" : "none";
      overlay.classList.add("open");
      panel.classList.add("open");
      panel.classList.remove("content-in");
      panel.scrollTop = 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => panel.classList.add("content-in"));
      });
      pillButtons.forEach((b) => b.classList.toggle("active", b.dataset.topic === key));
    }

    function closePanel() {
      overlay.classList.remove("open");
      panel.classList.remove("open");
      panel.classList.remove("content-in");
      panel.classList.remove("expanded");
      panelExpandLabel.textContent = "expand";
      pillButtons.forEach((b) => b.classList.remove("active"));
    }

    const pillHandlers = pillButtons.map((btn) => {
      const handler = () => {
        if (btn.classList.contains("active")) {
          closePanel();
        } else {
          openPanel(topics[btn.dataset.topic as string], btn.dataset.topic);
        }
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    const panelCloseBtn = document.getElementById("panel-close") as HTMLButtonElement;
    panelCloseBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);

    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closePanel();
    }
    document.addEventListener("keydown", onEscape);

    return () => {
      themeToggle.removeEventListener("click", onThemeToggle);
      window.removeEventListener("scroll", onScroll);
      panelExpand.removeEventListener("click", onPanelExpand);
      pillHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      panelCloseBtn.removeEventListener("click", closePanel);
      overlay.removeEventListener("click", closePanel);
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("click", onDocumentJumpLinkClick);
      revealObserver.disconnect();
      compassObserver.disconnect();
      navObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div id="portfolio-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <footer className="home-end">
        <div className="home-end-buddy">
          <div className="orb-spot orb-spot-end" id="orb-spot-end" />
          <p>That&apos;s the tour. <span>Isa&apos;s one email away.</span></p>
        </div>
        <div className="hero-ctas">
          <a className="btn-pill" href="mailto:isabellabonora1@gmail.com">Contact</a>
          <a className="link-arrow" href="https://www.linkedin.com/in/isabella-bonora/" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
        <p className="home-end-sign">Isabella Bonora · <a href="mailto:isabellabonora1@gmail.com">isabellabonora1@gmail.com</a></p>
      </footer>
    </>
  );
}

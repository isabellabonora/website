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
    --bg: #12151a;
    --ink: #eef0f2;
    --ink-soft: #8d97a3;
    --accent: #ff8a65;
    --line: #262c35;
    --mono-bg: #0a0c10;
    --mono-fg: #eef0f2;
    --chip: #1a1f27;
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
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px;
  }

  #portfolio-root h1, #portfolio-root h2, #portfolio-root h3 {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  /* ---------- HERO ---------- */
  .hero {
    padding: 96px 0 48px;
    display: flex;
    align-items: center;
    gap: 32px;
    opacity: 0;
    transform: translateY(8px);
    animation: rise 0.7s ease forwards;
  }

  @keyframes rise {
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 560px) {
    .hero {
      padding: 72px 0 40px;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
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

  .hero h1 {
    font-weight: 500;
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
  }

  .hero h1 em {
    font-style: normal;
    font-weight: 500;
    background: linear-gradient(100deg, var(--ink) 20%, var(--accent) 45%, var(--ink) 70%);
    background-size: 220% 100%;
    background-position: 0% 50%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine 6s ease-in-out infinite;
  }

  @keyframes shine {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .hero .role {
    margin-top: 20px;
    font-size: 1.08rem;
    color: var(--ink-soft);
  }

  .hero .role strong {
    color: var(--ink);
    font-weight: 500;
  }

  .hero-links {
    margin-top: 22px;
    display: flex;
    gap: 18px;
    font-size: 0.92rem;
  }

  .hero-links a {
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--line);
    padding-bottom: 1px;
    transition: border-color 0.2s, color 0.2s;
  }

  .hero-links a:hover {
    border-color: var(--accent);
    color: var(--accent);
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

  /* ---------- ROAD GAME ---------- */
  .rg-stage {
    position: relative;
    margin: 40px 0 64px;
    background: var(--mono-bg);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 12px 32px -12px rgba(28, 26, 23, 0.35);
    opacity: 0;
    animation: rise 0.7s ease forwards 0.15s;
  }

  .rg-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--mono-fg);
    opacity: 0.7;
  }

  .rg-bar button {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    background: none;
    border: 1px solid rgba(255,255,255,0.18);
    color: var(--mono-fg);
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.85;
  }

  .rg-bar button:hover { color: var(--accent); border-color: var(--accent); }

  .rg-svg-wrap { position: relative; }
  /* fixed to the light-theme paper/ink values (not var(--bg)/var(--ink)) so the
     stage stays a bright paper strip inside the dark frame in both themes */
  .rg-svg-wrap svg { display: block; width: 100%; height: clamp(180px, 30vw, 240px); background: #fbf7f2; }

  .rg-ground-tick { fill: #1c1a17; opacity: 0.4; shape-rendering: crispEdges; }
  .rg-hill { fill: #1c1a17; opacity: 0.12; }
  .rg-cloud { fill: #1c1a17; opacity: 0.18; }

  .rg-sprite-scale rect { fill: #1c1a17; shape-rendering: crispEdges; }

  .rg-icon { transform: scale(1.8); transform-box: fill-box; transform-origin: center; }
  .rg-sprite-scale { transform: scale(1.6); transform-box: fill-box; transform-origin: bottom center; }
  .rg-icon rect, .rg-icon path, .rg-icon circle { shape-rendering: crispEdges; }
  .rg-icon .fill { fill: var(--accent); }
  .rg-icon .fill-soft { fill: #1c1a17; }
  .rg-icon .outline { fill: none; stroke: var(--accent); stroke-width: 1.6; }
  .rg-pizza-crust { fill: #e8b978; stroke: var(--accent); stroke-width: 1; shape-rendering: crispEdges; }
  .rg-pizza-topping { fill: var(--accent); shape-rendering: crispEdges; }

  @keyframes rg-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.6); }
    100% { transform: scale(1); }
  }
  @keyframes rg-burst-ring {
    0% { r: 6; opacity: 0.9; stroke-width: 3; }
    100% { r: 34; opacity: 0; stroke-width: 0.5; }
  }
  .rg-burst { fill: none; stroke: var(--accent); animation: rg-burst-ring 0.5s ease-out forwards; pointer-events: none; }

  .rg-hud {
    position: absolute;
    top: 14px; right: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: #1c1a17;
    background: rgba(28,26,23,0.06);
    border: 1px solid rgba(28,26,23,0.16);
    border-radius: 5px;
    padding: 5px 10px;
  }
  .rg-hud strong { color: var(--accent); font-variant-numeric: tabular-nums; }

  .rg-card {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--mono-fg);
    background: var(--mono-bg);
    border: 1px solid rgba(255,255,255,0.14);
    border-left: 2px solid var(--accent);
    border-radius: 6px;
    padding: 16px 18px;
    width: min(520px, 92%);
    max-height: 88%;
    overflow: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -46%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.5);
    z-index: 8;
  }
  .rg-card.show { opacity: 1; transform: translate(-50%, -50%); pointer-events: auto; }
  .rg-card .rg-tag {
    display: flex; justify-content: space-between; align-items: baseline; gap: 8px;
    font-size: 0.64rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 2px;
  }
  .rg-card .rg-period {
    display: block;
    font-size: 0.66rem;
    color: var(--mono-fg);
    opacity: 0.6;
    margin-bottom: 8px;
  }
  .rg-card .rg-close { all: unset; cursor: pointer; color: var(--mono-fg); opacity: 0.6; font-size: 0.8rem; padding: 2px 6px; }
  .rg-card .rg-close:hover { color: var(--accent); opacity: 1; }
  .rg-card .rg-cta-row { display: flex; gap: 8px; margin-top: 14px; }
  .rg-card .rg-cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-decoration: none;
    background: none;
    border: 1px solid var(--accent);
    color: var(--accent);
    padding: 7px 12px;
    border-radius: 5px;
  }
  .rg-card .rg-cta:hover { background: var(--accent); color: var(--mono-bg); }
  .rg-card .rg-cta.secondary { border-color: rgba(255,255,255,0.18); color: var(--mono-fg); opacity: 0.7; }
  .rg-card .rg-cta.secondary:hover { border-color: var(--accent); color: var(--accent); background: none; opacity: 1; }

  .rg-veil {
    position: absolute; inset: 0;
    background: rgba(0, 0, 0, 0.35);
    opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 7;
  }
  .rg-veil.show { opacity: 1; pointer-events: auto; }

  .rg-jump-row {
    padding: 14px 16px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--mono-fg);
    opacity: 0.75;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .rg-jump-row span { opacity: 1; }
  .rg-jump-btn {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    background: var(--accent);
    border: 1px solid var(--accent);
    color: var(--mono-bg);
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .rg-jump-btn:hover { opacity: 0.88; }
  .rg-jump-btn:active { transform: translateY(1px); }

  .rg-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 4px 16px 18px;
  }
  .rg-legend button {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    background: none;
    border: 1px solid rgba(255,255,255,0.16);
    color: var(--mono-fg);
    padding: 6px 10px;
    border-radius: 12px;
    cursor: pointer;
    opacity: 0.55;
  }
  .rg-legend button.caught { color: var(--accent); border-color: var(--accent); opacity: 1; }
  .rg-legend button:hover { opacity: 1; border-color: var(--accent); color: var(--accent); }

  @media (max-width: 560px) {
    .rg-bar { flex-wrap: wrap; gap: 8px; font-size: 0.66rem; }
    .rg-svg-wrap svg { height: clamp(150px, 46vw, 200px); }
    .rg-hud { top: 10px; right: 10px; font-size: 0.62rem; padding: 4px 8px; }
    .rg-card { font-size: 0.76rem; padding: 14px 15px; }
    .rg-card .rg-cta-row { flex-wrap: wrap; }
    .rg-card .rg-cta { flex: 1 1 auto; text-align: center; }
    .rg-jump-row { flex-direction: column; align-items: flex-start; gap: 10px; }
    .rg-jump-btn { align-self: stretch; text-align: center; }
    .rg-legend { padding: 4px 12px 16px; gap: 6px; }
    .rg-legend button { font-size: 0.66rem; padding: 5px 9px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .rg-item-wrap { animation: none !important; }
  }

  /* ---------- WORK ---------- */
  .work-entry {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 20px;
    padding: 16px 14px;
    margin: 0 -14px 26px;
    border-radius: 10px;
    transition: background 0.35s ease;
    background: none;
    border-width: 0;
    width: calc(100% + 28px);
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    color: var(--ink);
  }

  .work-entry:last-child { margin-bottom: 0; }
  .work-entry:hover { background: var(--chip); }

  .work-entry img {
    width: 96px;
    height: 96px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--line);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .work-entry:hover img {
    transform: scale(1.06) rotate(-1deg);
  }

  .work-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .work-tag.tag-ai { color: #3d726b; }
  .work-tag.tag-design { color: #b5502f; }
  .work-tag.tag-startup { color: #8a3450; }
  .work-tag.tag-community { color: #a9822a; }

  .work-entry h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 4px;
    transition: color 0.25s ease, transform 0.25s ease;
    display: inline-block;
  }

  .work-entry:hover h3 {
    color: var(--accent);
    transform: translateX(4px);
  }

  .work-entry p {
    margin-top: 6px;
    font-size: 0.92rem;
    color: var(--ink-soft);
  }

  .work-entry .work-tag::after {
    content: '→';
    margin-left: 6px;
    opacity: 0;
    transition: opacity 0.25s, margin-left 0.25s;
  }

  .work-entry:hover .work-tag::after {
    opacity: 1;
    margin-left: 10px;
  }

  @media (max-width: 560px) {
    .work-entry { grid-template-columns: 1fr; }
    .work-entry img { width: 100%; height: auto; aspect-ratio: 16/9; }
  }

  /* ---------- SECTIONS ---------- */
  section.block {
    padding: 56px 0;
    border-top: 1px solid var(--line);
  }

  section.block h2 {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    font-family: 'Inter', sans-serif;
    margin-bottom: 28px;
  }

  .entry {
    display: grid;
    grid-template-columns: 130px 16px 1fr;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
    position: relative;
    padding: 12px 14px;
    margin-left: -14px;
    margin-right: -14px;
    border-radius: 10px;
  }

  .entry:last-child { margin-bottom: 0; }

  .entry .period {
    font-size: 0.82rem;
    color: var(--ink-soft);
    font-family: 'JetBrains Mono', monospace;
  }

  #experience .entry .dot {
    justify-self: center;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
  }

  .entry .role-title {
    font-family: 'Fraunces', serif;
    font-size: 1.15rem;
    font-weight: 500;
  }

  .entry .org {
    grid-column: 3;
    color: var(--ink-soft);
    font-size: 0.92rem;
    margin-top: 2px;
  }

  .entry p.desc {
    grid-column: 3;
    margin-top: 8px;
    font-size: 0.95rem;
    color: var(--ink-soft);
    max-width: 52ch;
  }

  @media (max-width: 560px) {
    .entry {
      grid-template-columns: 1fr;
      align-items: start;
      gap: 6px;
    }
    .entry .dot { display: none; }
    .entry .org, .entry p.desc { grid-column: 1; }
  }

  /* ---------- SKILLS ---------- */
  .skill-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 20px;
    margin-bottom: 18px;
    font-size: 0.92rem;
  }

  .skill-row:last-child { margin-bottom: 0; }

  .skill-row .label {
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    padding-top: 2px;
  }

  .skill-row .items { color: var(--ink-soft); }

  .tools-row {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
    display: flex;
    flex-wrap: wrap;
    gap: 8px 10px;
    font-size: 0.86rem;
  }

  .tools-row span {
    color: var(--ink);
    background: var(--chip);
    border: 1px solid var(--line);
    padding: 3px 10px;
    border-radius: 20px;
  }

  @media (max-width: 560px) {
    .skill-row { grid-template-columns: 1fr; gap: 4px; }
  }

  /* ---------- OFF DUTY ---------- */
  .offduty-text {
    font-size: 1.02rem;
    color: var(--ink-soft);
    max-width: 56ch;
  }

  .offduty-text strong { color: var(--ink); font-weight: 500; }

  .offduty-photos {
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .offduty-photos img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--line);
  }

  @media (max-width: 560px) {
    .offduty-photos { grid-template-columns: repeat(2, 1fr); }
  }

  /* ---------- FOOTER ---------- */
  #portfolio-root footer {
    padding: 48px 0 80px;
    border-top: 1px solid var(--line);
    font-size: 0.88rem;
    color: var(--ink-soft);
  }

  #portfolio-root footer a {
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--line);
  }

  #portfolio-root footer a:hover { border-color: var(--accent); color: var(--accent); }

  /* ---------- SCROLL REVEAL ---------- */
  .reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
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

  /* ---------- EXPERIENCE TIMELINE ---------- */
  #experience { position: relative; }

  #experience::before {
    content: '';
    position: absolute;
    left: 146px;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: var(--line);
  }

  @media (max-width: 560px) {
    #experience::before { display: none; }
  }

  /* ---------- EDUCATION LIST ---------- */
  .edu-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 20px;
    padding: 14px 0;
    border-top: 1px solid var(--line);
  }

  .edu-row .edu-main {
    font-size: 1rem;
    order: 2;
  }

  .edu-row .edu-main strong {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    color: var(--ink);
  }

  .edu-row .edu-main span {
    color: var(--ink-soft);
  }

  .edu-row .edu-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: var(--ink-soft);
    white-space: nowrap;
    order: 1;
    padding-top: 2px;
  }

  @media (max-width: 560px) {
    .edu-row { grid-template-columns: 1fr; gap: 4px; }
    .edu-row .edu-period { order: 1; }
    .edu-row .edu-main { order: 2; }
  }

  .edu-thesis {
    font-size: 0.86rem;
    color: var(--ink-soft);
    font-style: italic;
    margin: -6px 0 14px 150px;
  }

  @media (max-width: 560px) {
    .edu-thesis { margin-left: 0; }
  }

  /* ---------- KEYWORD TAGS ---------- */
  .kw {
    font-weight: 500;
    color: var(--ink-soft);
    transition: color 0.5s ease;
  }

  .kw-design.kw-visible { color: #b5502f; }
  .kw-ai.kw-visible { color: #3d726b; }
  .kw-startup.kw-visible { color: #8a3450; }
  .kw-community.kw-visible { color: #a9822a; }

  /* ---------- TOPIC PILLS ---------- */
  .topic-pills {
    margin: 0 0 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pill-btn {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
    background: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .pill-design { color: #b5502f; border: 1px solid #b5502f55; }
  .pill-ai { color: #3d726b; border: 1px solid #3d726b55; }
  .pill-startup { color: #8a3450; border: 1px solid #8a345055; }
  .pill-community { color: #a9822a; border: 1px solid #a9822a55; }

  .pill-design:hover, .pill-design.active { background: #b5502f; color: #fff; }
  .pill-ai:hover, .pill-ai.active { background: #3d726b; color: #fff; }
  .pill-startup:hover, .pill-startup.active { background: #8a3450; color: #fff; }
  .pill-community:hover, .pill-community.active { background: #a9822a; color: #fff; }

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
    width: min(460px, 92vw);
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

  .side-panel.expanded { width: min(760px, 96vw); }

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
    padding: 40px 0 56px;
    border-top: 1px solid var(--line);
  }

  .interstitial .int-frame {
    position: relative;
    display: block;
    width: 100%;
    height: 320px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
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
    margin-top: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    color: var(--ink-soft);
    cursor: pointer;
  }
  .interstitial .int-caption:hover { color: var(--accent); }

  @media (max-width: 560px) {
    .interstitial .int-frame { height: 220px; }
  }
`;

const bodyHtml = `
<div id="progress-bar"></div>
<div class="theme-wave" id="theme-wave"></div>

<nav class="side-nav">
  <a href="#work" data-label="Work"></a>
  <a href="#experience" data-label="Experience"></a>
  <a href="#education" data-label="Education"></a>
  <a href="#skills" data-label="Skills"></a>
  <a href="#offduty" data-label="Off Duty"></a>
</nav>

<main>

  <section class="hero">
    <button class="hero-photo-toggle" id="theme-toggle" type="button" aria-label="Toggle night mode" aria-pressed="false" title="Click for night mode">
      <img class="hero-photo" src="/isabella-portrait.jpg" alt="Isabella Bonora" />
      <span class="theme-badge" aria-hidden="true">
        <span class="icon-sun">☀</span>
        <span class="icon-moon">☾</span>
      </span>
    </button>
    <div>
      <h1>Isabella <em>Bonora</em></h1>
      <p class="role"><strong>Product &amp; UX Designer</strong>, bridging <span class="kw kw-design">design</span> and implementation with <span class="kw kw-ai">AI-native workflows</span> and <span class="kw kw-ai">no-code</span>.</p>
      <div class="hero-links">
        <a href="mailto:isabellabonora1@gmail.com">email</a>
        <a href="https://www.linkedin.com/in/isabella-bonora/" target="_blank" rel="noopener">linkedin</a>
      </div>
    </div>
  </section>

  <div class="topic-pills">
    <button class="pill-btn pill-design" data-topic="design">Design</button>
    <button class="pill-btn pill-ai" data-topic="ai">AI &amp; No-code</button>
    <button class="pill-btn pill-startup" data-topic="startup">Startup</button>
    <button class="pill-btn pill-community" data-topic="community">Community</button>
  </div>

  <section class="rg-stage" id="road-game">
    <div class="rg-bar">
      <span id="rg-state">running, space to jump</span>
      <button id="rg-reset">reset</button>
    </div>

    <div class="rg-svg-wrap" id="rg-svg-wrap">
      <svg id="rg-svg" viewBox="0 0 900 260" preserveAspectRatio="xMidYMid meet">
        <g id="rg-scenery"></g>
        <g id="rg-ground-ticks"></g>

        <g id="rg-item-wrap" class="rg-item-wrap" style="display:none;">
          <g class="rg-icon" id="rg-icon-athletics">
            <rect class="fill" x="-8" y="5" width="16" height="3" />
            <rect class="fill" x="-7" y="0" width="12" height="5" />
            <rect class="fill" x="3" y="-2" width="4" height="4" />
          </g>
          <g class="rg-icon" id="rg-icon-falsestart" style="display:none;">
            <rect class="outline" x="-7" y="-2" width="14" height="11" />
            <rect class="fill" x="-2" y="-6" width="4" height="4" />
          </g>
          <g class="rg-icon" id="rg-icon-economics" style="display:none;">
            <rect class="fill" x="-7" y="1" width="3" height="8" />
            <rect class="fill" x="-2" y="-3" width="3" height="12" />
            <rect class="fill" x="3" y="-7" width="3" height="16" />
          </g>
          <g class="rg-icon" id="rg-icon-masters" style="display:none;">
            <path class="fill" d="M -9 -1 L 0 -7 L 9 -1 L 0 4 Z" />
            <rect class="fill" x="6" y="-1" width="1.6" height="9" />
          </g>
          <g class="rg-icon" id="rg-icon-startup" style="display:none;">
            <path class="fill" d="M 0 -10 C 5 -6, 5 2, 0 8 C -5 2, -5 -6, 0 -10 Z" />
            <path class="fill" d="M -4 4 L -8 9 L -2 7 Z" />
            <path class="fill" d="M 4 4 L 8 9 L 2 7 Z" />
          </g>
          <g class="rg-icon" id="rg-icon-uxnocode" style="display:none;">
            <rect class="outline" x="-8" y="-6" width="16" height="10" />
            <rect class="fill" x="-9" y="4" width="18" height="2.5" />
          </g>
          <g class="rg-icon" id="rg-icon-product" style="display:none;">
            <path class="rg-pizza-crust" d="M -9 -2 L 9 -2 L 0 12 Z" />
            <circle class="rg-pizza-topping" cx="-2" cy="2" r="1.4" />
            <circle class="rg-pizza-topping" cx="3" cy="1" r="1.4" />
            <circle class="rg-pizza-topping" cx="0" cy="6" r="1.4" />
          </g>
          <g class="rg-icon" id="rg-icon-now" style="display:none;">
            <path class="fill" d="M 0 -9 C 6 -9, 8 -3, 0 8 C -8 -3, -6 -9, 0 -9 Z" />
            <circle class="fill-soft" cx="0" cy="-3" r="2.6" />
          </g>
        </g>

        <g id="rg-sprite">
          <g class="rg-sprite-scale">
            <rect x="-5" y="-15" width="10" height="8" />
            <rect x="-3" y="-7" width="3" height="3" id="rg-leg-a" />
            <rect x="1" y="-7" width="3" height="3" id="rg-leg-b" />
          </g>
        </g>
      </svg>

      <div class="rg-hud"><strong id="rg-hud-count">0</strong>/8 caught</div>
      <div id="rg-veil" class="rg-veil"></div>
      <div id="rg-active-card" class="rg-card"></div>
    </div>

    <div class="rg-jump-row">
      <span>space bar to jump, catch what drifts by</span>
      <button class="rg-jump-btn" id="rg-jump-btn">jump ↑</button>
    </div>

    <div class="rg-legend" id="rg-legend"></div>
  </section>

  <section class="block reveal" id="work">
    <h2>Selected Work</h2>

    <button class="work-entry" data-case="saas">
      <img src="/work/landing-page-large.png" alt="AI SaaS landing page project" />
      <div>
        <div class="work-tag tag-ai">AI SaaS, Landing Page</div>
        <h3>Designing a landing page that doesn't tell a story, it is one</h3>
        <p>Complete creative freedom, one hidden instruction, and a 48-hour timeframe.</p>
      </div>
    </button>

    <button class="work-entry" data-case="retail">
      <img src="/work/digital workflow-large.png" alt="Fashion and retail logistics project" />
      <div>
        <div class="work-tag tag-design">Fashion &amp; Retail, Logistics</div>
        <h3>Bringing digital workflows into a physical environment</h3>
        <p>Five systems, no single source of truth, manual workarounds every single day.</p>
      </div>
    </button>

    <button class="work-entry" data-case="fintech">
      <img src="/work/funding application-large.png" alt="Fintech funding application project" />
      <div>
        <div class="work-tag tag-startup">Financial Technology</div>
        <h3>Designing a funding application flow that people could actually complete</h3>
        <p>Multi-step, multi-document, zero guidance. Most people gave up halfway.</p>
      </div>
    </button>

    <button class="work-entry" data-case="storeteams">
      <img src="/work/global store teams-large.png" alt="Fashion and retail mobile and desktop project" />
      <div>
        <div class="work-tag tag-community">Fashion &amp; Retail, Mobile + Desktop</div>
        <h3>Designing for global store teams with different needs and different devices</h3>
        <p>One team, completely different needs, and devices that had nothing in common.</p>
      </div>
    </button>

    <button class="work-entry" data-case="facility">
      <img src="/work/powerful software-large.png" alt="Facility management SaaS project" />
      <div>
        <div class="work-tag tag-design">Facility Management, SaaS</div>
        <h3>When powerful software becomes too complex to use</h3>
        <p>A platform with everything, that users actively worked around.</p>
      </div>
    </button>
  </section>

  <section class="block reveal" id="experience">
    <h2>Experience</h2>

    <div class="entry">
      <div class="period">2023 to present</div>
      <span class="dot"></span>
        <div class="role-title">Product &amp; UX Designer</div>
        <div class="org">CodicePlastico</div>
        <p class="desc">Lead end-to-end <span class="kw kw-design">product discovery</span> for complex B2B and B2C platforms, turning ambiguous business requirements into testable prototypes. Integrate <span class="kw kw-ai">AI workflows</span> (Claude, Gemini, Figma AI) to keep design and dev docs in sync, and work directly with developers to ensure smooth handoffs.</p>
    </div>

    <div class="entry">
      <div class="period">2025 to present</div>
      <span class="dot"></span>
        <div class="role-title">Founder &amp; Community Organizer</div>
        <div class="org">Digital People</div>
        <p class="desc">Founded and scaled a <span class="kw kw-community">tech community</span> of <span class="count-up" data-target="80">0</span>+ members, organizing monthly meetups and speaking on <span class="kw kw-ai">AI-native design</span> at events like Product Heroes and XPUG.</p>
    </div>

    <div class="entry">
      <div class="period">2025 to present</div>
      <span class="dot"></span>
        <div class="role-title">Hackathon Facilitator</div>
        <div class="org">Sprintaly</div>
        <p class="desc">Coach multidisciplinary teams through problem framing, <span class="kw kw-startup">Lean validation</span> and rapid prototyping to deliver pitch-ready <span class="kw kw-startup">MVPs</span> in 48 to 72 hour sprints, helping them turn complex ideas into investor-ready value propositions.</p>
    </div>

    <div class="entry">
      <div class="period">2021 to present</div>
      <span class="dot"></span>
        <div class="role-title">Product Designer &amp; No-code Builder</div>
        <div class="org">Freelance</div>
        <p class="desc">Launched multiple production-ready <span class="kw kw-startup">MVPs</span> for early-stage <span class="kw kw-startup">startups</span>, from problem validation and <span class="kw kw-design">UX research</span> through functional <span class="kw kw-ai">Bubble.io</span> implementation. Long-term partner for a growing startup, evolving its MVP into a scaled platform.</p>
    </div>

    <div class="entry">
      <div class="period">2020 to 2021</div>
      <span class="dot"></span>
        <div class="role-title">Product Lead &amp; Co-founder</div>
        <div class="org">Mimiroo, Startup Geeks Incubator</div>
        <p class="desc">End-to-end development of an <span class="kw kw-startup">EdTech project</span>: defined the business model and value proposition, ran competitor analysis, and built/tested a functional <span class="kw kw-startup">MVP</span> in Bubble.io to validate core assumptions with real users.</p>
    </div>
  </section>

  <section class="interstitial reveal" id="interstitial">
    <a class="int-frame" href="#offduty">
      <img src="/isa/isa-talk-xpug-crop.jpg" alt="Isabella speaking on Rethink UX at XPUG Trento" />
    </a>
    <div class="int-caption jump-link" data-jump="offduty">Rethink UX, XPUG Trento ↓</div>
  </section>

  <section class="block reveal" id="education">
    <h2>Education</h2>

    <div class="edu-row">
      <div class="edu-main"><strong>UX / UI Design Master</strong><span>, Start2Impact University</span></div>
      <div class="edu-period">2021 to 2022</div>
    </div>

    <div class="edu-row">
      <div class="edu-main"><strong>MSc Management of Innovation &amp; Entrepreneurship</strong><span>, University of Milan</span></div>
      <div class="edu-period">2020 to 2022</div>
    </div>
    <p class="edu-thesis">Thesis: "User Experience in Early-Stage Startups: The Impact of Lean UX on Entrepreneurial Idea Development."</p>

    <div class="edu-row">
      <div class="edu-main"><strong>BSc Business Administration</strong><span>, University of Brescia</span></div>
      <div class="edu-period">2017 to 2020</div>
    </div>
    <p class="edu-thesis">Thesis on Big Data analytics with Power BI.</p>
  </section>

  <section class="block reveal" id="skills">
    <h2>Skills &amp; Tools</h2>

    <div class="skill-row">
      <div class="label">Design</div>
      <div class="items"><span class="kw kw-design">UX Research</span>, User Journey &amp; Flow, Wireframing &amp; Prototyping, UI Design, Usability Testing</div>
    </div>
    <div class="skill-row">
      <div class="label">Strategy</div>
      <div class="items"><span class="kw kw-startup">As-is Analysis</span>, Competitor Analysis, Market Research, Requirements Gathering</div>
    </div>
    <div class="skill-row">
      <div class="label">Facilitation</div>
      <div class="items"><span class="kw kw-community">Co-design Workshops</span>, Hackathon Facilitation</div>
    </div>

    <div class="tools-row">
      <span>Figma</span><span>Bubble.io</span><span>Github</span><span>Framer</span><span>Whimsical</span><span>Miro</span><span>Notion</span><span>Claude</span><span>VS Code</span><span>Midjourney</span><span>Webflow</span>
    </div>
  </section>

  <section class="block reveal" id="offduty">
    <h2>Off Duty</h2>
    <p class="offduty-text">Outside of product work, I'm usually on a yoga mat, out for a run, <strong>slowly, but consistently</strong>, or in the kitchen attempting a pizza that doesn't always come out right. I also spend a lot of time with the <span class="kw kw-community">Digital People</span> community I founded, meeting up in person and talking <span class="kw kw-ai">AI-native design</span> at local events.</p>
    <div class="offduty-photos">
      <img src="/isa/isa-talk-1.JPG" alt="Isabella speaking at a tech community event" />
      <img src="/isa/isa-talk-2.JPG" alt="Isabella facilitating a community event" />
      <img src="/isa/community.jpeg" alt="Digital People community meetup" />
      <img src="/isa/photo_2026-07-18 10.58.34.jpeg" alt="Isabella off duty" />
    </div>
  </section>

  <footer>
    <p>Isabella Bonora, <a href="mailto:isabellabonora1@gmail.com">isabellabonora1@gmail.com</a></p>
    <p style="margin-top:6px;">
      <a href="https://www.linkedin.com/in/isabella-bonora/" target="_blank" rel="noopener">LinkedIn</a>
    </p>
  </footer>

</main>

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

  // Road game: dino-runner mechanics replacing the old terminal. The figure
  // stays put, ground ticks scroll left (driven by the same offset as the
  // approaching item, so direction/speed can never drift out of sync), and
  // catching an item (space to jump) opens a card with that career stop.
  useEffect(() => {
    const svg = document.getElementById("rg-svg") as unknown as SVGSVGElement;
    const svgWrap = document.getElementById("rg-svg-wrap") as HTMLElement;
    const sprite = document.getElementById("rg-sprite") as unknown as SVGGElement;
    const legA = document.getElementById("rg-leg-a") as unknown as SVGRectElement;
    const legB = document.getElementById("rg-leg-b") as unknown as SVGRectElement;
    const itemWrap = document.getElementById("rg-item-wrap") as unknown as SVGGElement;
    const groundTicksEl = document.getElementById("rg-ground-ticks") as unknown as SVGGElement;
    const sceneryEl = document.getElementById("rg-scenery") as unknown as SVGGElement;
    const hudCount = document.getElementById("rg-hud-count") as HTMLElement;
    const activeCard = document.getElementById("rg-active-card") as HTMLElement;
    const cardVeil = document.getElementById("rg-veil") as HTMLElement;
    const stageState = document.getElementById("rg-state") as HTMLElement;
    const jumpBtn = document.getElementById("rg-jump-btn") as HTMLButtonElement;
    const resetBtn = document.getElementById("rg-reset") as HTMLButtonElement;
    const legendEl = document.getElementById("rg-legend") as HTMLElement;

    const CHAR_X = 150;
    const GROUND_Y = 200;
    const ITEM_Y = 130; // must be airborne to reach this
    const CATCH_RADIUS = 48;
    const SCROLL_SPEED = 230; // px/sec, shared by ground ticks and the item so they can never drift out of sync
    const JUMP_DURATION = 0.55; // sec
    const JUMP_HEIGHT = 78;
    const TICK_GAP = 24;
    const VIEW_W = 900;
    const SVGNS = "http://www.w3.org/2000/svg";

    let worldOffset = 0;
    const tickCount = Math.ceil(VIEW_W / TICK_GAP) + 2;
    const ticks: SVGRectElement[] = [];
    for (let i = 0; i < tickCount; i++) {
      const t = document.createElementNS(SVGNS, "rect");
      t.setAttribute("class", "rg-ground-tick");
      t.setAttribute("y", String(GROUND_Y));
      t.setAttribute("width", "10");
      t.setAttribute("height", "2");
      groundTicksEl.appendChild(t);
      ticks.push(t);
    }
    function layoutTicks() {
      const shift = ((worldOffset % TICK_GAP) + TICK_GAP) % TICK_GAP;
      ticks.forEach((t, i) => t.setAttribute("x", String(i * TICK_GAP - shift - TICK_GAP)));
    }

    const HILL_TILE = 300, HILL_PARALLAX = 0.35;
    const CLOUD_TILE = 260, CLOUD_PARALLAX = 0.55;
    const hills: SVGPathElement[] = [];
    const hillCount = Math.ceil(VIEW_W / HILL_TILE) + 2;
    for (let i = 0; i < hillCount; i++) {
      const h = document.createElementNS(SVGNS, "path");
      h.setAttribute("class", "rg-hill");
      h.setAttribute("d", "M 0 0 Q 75 -46 150 0 Q 225 -30 300 0 L 300 40 L 0 40 Z");
      sceneryEl.appendChild(h);
      hills.push(h);
    }
    const clouds: SVGGElement[] = [];
    const cloudCount = Math.ceil(VIEW_W / CLOUD_TILE) + 2;
    for (let i = 0; i < cloudCount; i++) {
      const c = document.createElementNS(SVGNS, "g") as unknown as SVGGElement;
      c.setAttribute("class", "rg-cloud");
      c.innerHTML = '<rect x="0" y="0" width="26" height="7" rx="3.5"></rect><rect x="8" y="-5" width="16" height="7" rx="3.5"></rect>';
      sceneryEl.appendChild(c);
      clouds.push(c);
    }
    function layoutScenery() {
      const hillShift = (((worldOffset * HILL_PARALLAX) % HILL_TILE) + HILL_TILE) % HILL_TILE;
      hills.forEach((h, i) => {
        h.setAttribute("transform", `translate(${i * HILL_TILE - hillShift - HILL_TILE},${GROUND_Y - 40})`);
      });
      const cloudShift = (((worldOffset * CLOUD_PARALLAX) % CLOUD_TILE) + CLOUD_TILE) % CLOUD_TILE;
      clouds.forEach((c, i) => {
        c.setAttribute("transform", `translate(${i * CLOUD_TILE - cloudShift - CLOUD_TILE},${40 + (i % 3) * 18})`);
      });
    }

    const order = ["athletics", "falsestart", "economics", "masters", "startup", "uxnocode", "product", "now"];
    const content: Record<string, { tag: string; period: string; text: string }> = {
      athletics: {
        tag: "athletics", period: "growing up in Italy",
        text: "Born in 1997. Years of competitive athletics before I knew what a career even was. Training was the first thing that was ever fully mine.",
      },
      falsestart: {
        tag: "false start", period: "2016, after high school",
        text: "A year studying Languages for Business, then a summer working in a B&B in the middle of nowhere in Scotland, before switching direction entirely.",
      },
      economics: {
        tag: "economics & business", period: "2017 to 2020",
        text: "BSc in Business Administration, University of Brescia. The switch that actually stuck.",
      },
      masters: {
        tag: "master's, milan", period: "2020 to 2022",
        text: "MSc Management of Innovation & Entrepreneurship, University of Milan. Thesis on Lean UX in early-stage startups.",
      },
      startup: {
        tag: "startup & incubator", period: "2020 to 2021",
        text: "Co-founded Mimiroo, an edtech startup, inside a startup incubator during the Master's. This is where discovering design and development could happen in the same project changed everything after.",
      },
      uxnocode: {
        tag: "ux & no-code", period: "2021 to 2023",
        text: "A UX/UI Design Master alongside freelance work: going deep on UX research and prototyping while shipping real, working products for early-stage startups using no-code tools like Bubble.io.",
      },
      product: {
        tag: "product, ux & community", period: "2023 to now",
        text: "Working as a Product & UX Designer, leading discovery for B2B and B2C platforms. Alongside that: founded an 80+ person tech community (Digital People) in Northern Italy, facilitate startup hackathons, and give talks on UX and AI at events like Product Heroes and XPUG.",
      },
      now: {
        tag: "now: europe", period: "today",
        text: "Based wherever I happen to be in Europe at the moment. Laptop, curiosity, and a stubborn habit of showing up.",
      },
    };

    order.forEach((id) => {
      const btn = document.createElement("button");
      btn.textContent = content[id].tag;
      btn.dataset.id = id;
      btn.addEventListener("click", () => openCard(id, true));
      legendEl.appendChild(btn);
    });

    const caught = new Set<string>();
    let queue = [...order];
    let activeItemId: string | null = null;
    let itemX = VIEW_W + 60;
    let paused = false;
    let jumping = false;
    let jumpStart = 0;
    let lastFrame: number | null = null;
    let strideAt = 0;
    let strideToggle = false;
    let completionShown = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function spriteY() {
      if (!jumping) return 0;
      const t = Math.min(1, (performance.now() - jumpStart) / (JUMP_DURATION * 1000));
      if (t >= 1) { jumping = false; return 0; }
      return -JUMP_HEIGHT * 4 * t * (1 - t);
    }

    function spawnNext() {
      if (queue.length === 0) {
        activeItemId = null;
        itemWrap.style.display = "none";
        stageState.textContent = "all 8 caught, nothing left running";
        return;
      }
      activeItemId = queue.shift() as string;
      itemX = VIEW_W + 60;
      itemWrap.setAttribute("transform", `translate(${itemX},${ITEM_Y})`);
      itemWrap.style.display = "";
      itemWrap.querySelectorAll<SVGGElement>(".rg-icon").forEach((g) => {
        g.style.display = g.id === "rg-icon-" + activeItemId ? "" : "none";
      });
      stageState.textContent = "running, space to jump";
    }

    function burstAt(x: number, y: number) {
      const ring = document.createElementNS(SVGNS, "circle");
      ring.setAttribute("cx", String(x));
      ring.setAttribute("cy", String(y));
      ring.setAttribute("class", "rg-burst");
      svg.appendChild(ring);
      ring.addEventListener("animationend", () => ring.remove());
    }

    function showCompletion() {
      completionShown = true;
      activeCard.innerHTML =
        '<span class="rg-tag">path complete<button class="rg-close" aria-label="close">×</button></span>'
        + '<span class="rg-period">all 8 caught</span>'
        + "That's the path so far, ready for what's next. If any of this looks like a fit, I'd like to hear from you."
        + '<div class="rg-cta-row">'
        + '<a class="rg-cta" href="mailto:isabellabonora1@gmail.com">email me</a>'
        + '<a class="rg-cta secondary" href="https://www.linkedin.com/in/isabella-bonora/" target="_blank" rel="noopener">linkedin</a>'
        + "</div>";
      activeCard.classList.add("show");
      cardVeil.classList.add("show");
      paused = true;
      activeCard.querySelector(".rg-close")?.addEventListener("click", closeCard);
      cardVeil.onclick = closeCard;
    }

    function openCard(id: string, fromLegend: boolean) {
      const c = content[id];
      activeCard.innerHTML = '<span class="rg-tag">' + c.tag + '<button class="rg-close" aria-label="close">×</button></span>'
        + '<span class="rg-period">' + c.period + "</span>" + c.text;
      activeCard.classList.add("show");
      cardVeil.classList.add("show");
      paused = true;
      if (!caught.has(id)) {
        caught.add(id);
        hudCount.textContent = String(caught.size);
        const legendBtn = legendEl.querySelector<HTMLButtonElement>(`[data-id="${id}"]`);
        legendBtn?.classList.add("caught");
        if (!fromLegend) burstAt(CHAR_X, ITEM_Y);
      }
      activeCard.querySelector(".rg-close")?.addEventListener("click", closeCard);
      cardVeil.onclick = closeCard;
    }

    function closeCard() {
      activeCard.classList.remove("show");
      cardVeil.classList.remove("show");
      paused = false;
      lastFrame = null;
      if (activeItemId === null && queue.length === 0) {
        stageState.textContent = "all 8 caught, nothing left running";
        if (!completionShown && caught.size === order.length) {
          setTimeout(showCompletion, 450);
        }
      } else if (activeItemId === null) {
        spawnNext();
      }
    }

    function tryJump() {
      if (paused || jumping) return;
      jumping = true;
      jumpStart = performance.now();
    }

    function onKeydownSpace(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (activeCard.classList.contains("show")) { closeCard(); return; }
      tryJump();
    }
    document.addEventListener("keydown", onKeydownSpace);
    jumpBtn.addEventListener("click", tryJump);

    function onStagePointerDown(e: PointerEvent) {
      if ((e.target as HTMLElement).closest(".rg-card") || (e.target as HTMLElement).closest(".rg-veil")) return;
      tryJump();
    }
    svgWrap.addEventListener("pointerdown", onStagePointerDown);

    function onReset() {
      caught.clear();
      queue = [...order];
      activeItemId = null;
      worldOffset = 0;
      completionShown = false;
      hudCount.textContent = "0";
      legendEl.querySelectorAll(".caught").forEach((b) => b.classList.remove("caught"));
      closeCard();
      spawnNext();
    }
    resetBtn.addEventListener("click", onReset);

    let raf = 0;

    function loop(now: number) {
      if (lastFrame === null) lastFrame = now;
      const dt = (now - lastFrame) / 1000;
      lastFrame = now;

      if (!paused) {
        worldOffset += SCROLL_SPEED * dt;
        layoutTicks();
        layoutScenery();

        if (now - strideAt > 130) { strideToggle = !strideToggle; strideAt = now; }
        legA.setAttribute("y", strideToggle ? "-7" : "-5");
        legB.setAttribute("y", strideToggle ? "-5" : "-7");

        if (activeItemId) {
          itemX -= SCROLL_SPEED * dt;
          const dx = Math.abs(itemX - CHAR_X);
          const airborne = jumping && spriteY() < -34;
          if (dx < CATCH_RADIUS && airborne) {
            itemWrap.style.display = "none";
            const caughtId = activeItemId;
            activeItemId = null;
            openCard(caughtId, false);
          } else if (itemX < CHAR_X - CATCH_RADIUS - 20) {
            queue.push(activeItemId);
            activeItemId = null;
            itemWrap.style.display = "none";
            setTimeout(() => { if (!paused) spawnNext(); }, 900);
          } else {
            const bob = Math.sin(now / 300) * 6;
            itemWrap.setAttribute("transform", `translate(${itemX},${ITEM_Y + bob})`);
          }
        }
      }

      const y = spriteY();
      sprite.setAttribute("transform", `translate(${CHAR_X},${GROUND_Y + y})`);

      raf = requestAnimationFrame(loop);
    }

    layoutTicks();
    layoutScenery();
    spawnNext();
    if (reducedMotion) {
      order.forEach((id) => {
        caught.add(id);
        legendEl.querySelector<HTMLButtonElement>(`[data-id="${id}"]`)?.classList.add("caught");
      });
      hudCount.textContent = String(order.length);
      stageState.textContent = "reduced motion: use the list below, all stops already available";
      itemWrap.style.display = "none";
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeydownSpace);
      jumpBtn.removeEventListener("click", tryJump);
      svgWrap.removeEventListener("pointerdown", onStagePointerDown);
      resetBtn.removeEventListener("click", onReset);
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
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

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

    // keyword highlight on scroll
    const kwObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("kw-visible"), i * 40);
            kwObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );
    document.querySelectorAll(".kw").forEach((el) => kwObserver.observe(el));

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
          { h: "Founder, Digital People", d: "Founded and scaled a tech community of 80+ members, running monthly meetups since 2025." },
          { h: "Co-design workshops & facilitation", d: "Facilitating alignment sessions that turn complex ideas into clear, shared value propositions." },
        ],
      },
    };

    const cases: Record<string, CaseData> = {
      saas: {
        tag: "AI SaaS, Landing Page",
        tagColor: "#3d726b",
        title: "A landing page that doesn't tell a story, it is one",
        role: "Product Designer, Desktop + Mobile, Brand & Conversion",
        tagline: "Complete creative freedom, a wow effect, 48 hours, and one instruction hidden in the brief: build the page around this story.",
        gallery: ["/work/landing-page-large.png", "/work/landing-page-detail.png"],
        items: [
          { h: "The brief", d: "An AI-native SaaS startup was repositioning from an internal tool into a standalone product. They needed a landing page, total creative freedom, and pointed at one hero example: a comment that becomes a paying customer, automatically." },
          { h: "The challenge", d: "With no constraints, most landing pages converge on the same safe layout. One line in the brief, \"build the page around this story,\" was meant as content. Taking it literally as architecture became the whole project." },
        ],
        process: [
          { h: "Research before pixels", d: "Mapped the company mid-pivot, its old visual identity, and the market gap between enterprise AI tools and consumer DM automation." },
          { h: "The story as the architecture", d: "Structured the scroll itself as a five-step story, one comment becoming an order, with color used semantically: red for the alert, blue for the system acting, green for resolved." },
          { h: "From static frames to a living page", d: "Built with an AI-assisted workflow, from structured HTML into Figma, then an animated prototype for everything a static frame can’t show." },
        ],
        quote: "Freedom in a brief doesn’t make work more creative, it makes everyone converge on the safe answer. The real brief is hidden in one line. The job is finding it, and defending where it takes you.",
      },
      retail: {
        tag: "Fashion & Retail, Logistics",
        tagColor: "#b5502f",
        title: "Bringing digital workflows into a physical environment",
        role: "UX & Product Designer, B2B Internal Tool, Supply Chain",
        tagline: "Five systems, no single source of truth, manual workarounds every single day.",
        gallery: ["/work/digital workflow-large.png", "/work/digital workflow-detail.png"],
        items: [
          { h: "The brief", d: "A global fashion brand needed a dependable system for warehouse teams to manage, execute and monitor factory loading operations across multiple countries." },
          { h: "The problem", d: "The platform existed, the process did not. Warehouse teams relied on five disconnected systems, spreadsheets, Teams, paper forms and two legacy tools, with a 20-minute reconciliation before every shift." },
        ],
        process: [
          { h: "Understanding physical reality", d: "Spent time on the warehouse floor mapping goods from unloading to staging, revealing what each of the five systems was patching for." },
          { h: "Designing for the warehouse context", d: "Tablet-first, large touch targets for gloved hands, low-light readable, max two taps per action, no dropdowns or jargon." },
          { h: "One source of truth", d: "Unified all five systems into a single real-time timeline shared by pickers, managers and dispatch, removing the pre-shift reconciliation entirely." },
        ],
        quote: "If I could go back, I’d have spent more time with night-shift workers, not just day teams, workflow patterns changed significantly after midnight.",
      },
      fintech: {
        tag: "Financial Technology",
        tagColor: "#8a3450",
        title: "A funding application flow that people could actually complete",
        role: "UX/UI Designer, Desktop, FinTech",
        tagline: "Multi-step, multi-document, zero guidance, most people gave up halfway.",
        gallery: ["/work/funding application-large.png", "/work/funding application-detail.png"],
        items: [
          { h: "The brief", d: "A financial intermediary connecting businesses with banks needed a guided, first-time-friendly application flow to replace a tedious, manual document process." },
          { h: "The problem", d: "Vague instructions, scattered document requirements and zero progress indicators. The most common feedback was \"I thought I did it wrong.\"" },
        ],
        process: [
          { h: "Discovery & journey mapping", d: "Mapped the end-to-end flow to find every dropout point and its underlying cause, ambiguous guidance, too many documents, no visibility into progress." },
          { h: "Conversational flow redesign", d: "Turned the form into a sequential, dialogue-like progression, questions grouped thematically with context at each step." },
          { h: "AI automation", d: "Added auto document population from user answers, live validation, and instant identity extraction from ID scans." },
        ],
        quote: "Designing high-stakes processes demands a different approach, beyond reducing friction, you have to design for the anxiety underneath it.",
      },
      storeteams: {
        tag: "Fashion & Retail, Mobile + Desktop",
        tagColor: "#a9822a",
        title: "Designing for global store teams with different needs and different devices",
        role: "UX/UI Designer, Mobile + Desktop, Fashion & Retail",
        tagline: "One team, completely different needs, and devices that had nothing in common.",
        gallery: ["/work/global store teams-large.png", "/work/global store teams-detail.png"],
        items: [
          { h: "The brief", d: "A global fashion brand needed two synchronized tools: a desktop platform for managers and a mobile app for store associates, working together without forcing a shared interface." },
          { h: "The problem", d: "Managers worked in spreadsheets on weekly timelines, associates worked on the floor in two-hour windows. A unified interface would have failed one of the two groups." },
        ],
        process: [
          { h: "Parallel research tracks", d: "Shadowed managers during planning and associates on the floor, surfacing sharply different mental models between the two groups." },
          { h: "A shared data foundation", d: "Defined the data both platforms needed before designing either interface, so planning and task decisions were made once and reflected everywhere." },
          { h: "Multilingual testing", d: "Testing across markets and languages showed icon-heavy navigation beat text labels for speed, especially under time pressure on the shop floor." },
        ],
        quote: "Store associates were more tech-savvy than stakeholders assumed, they just had no patience for slow, cluttered UIs. Designing for both without compromising either was the real challenge.",
      },
      facility: {
        tag: "Facility Management, SaaS",
        tagColor: "#b5502f",
        title: "When powerful software becomes too complex to use",
        role: "UX/UI Designer, Desktop SaaS",
        tagline: "A platform with everything, that users actively worked around.",
        gallery: ["/work/powerful software-large.png", "/work/powerful software-detail.png"],
        items: [
          { h: "The brief", d: "A facility management SaaS used by large organizations to manage buildings, maintenance and operations. Feature-rich, but users kept working around it with spreadsheets, sticky notes and WhatsApp groups." },
          { h: "The problem", d: "Years of accumulated features, none ever removed. New users took weeks to become productive, and experienced users had memorized paths that no longer made sense." },
        ],
        process: [
          { h: "Mapping what users did vs. what the system expected", d: "Task analysis of 12 common actions: only 3 matched the path the system expected, the other 9 required knowing where things lived first." },
          { h: "Ruthless information hierarchy", d: "Card sorting with real users across departments, reorganizing the IA around what people were trying to achieve, not how the system was built." },
          { h: "Progressive disclosure", d: "Kept every power feature, but removed them from primary navigation, surfacing advanced functionality only when needed in context." },
        ],
        quote: "The hardest part wasn’t designing the new experience, it was convincing stakeholders that removing visible features could increase product value.",
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
        panelTag.style.display = "block";
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

    const workEntries = Array.from(document.querySelectorAll<HTMLButtonElement>(".work-entry"));
    const workHandlers = workEntries.map((btn) => {
      const handler = () => openPanel(cases[btn.dataset.case as string]);
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

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
      workHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      pillHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      panelCloseBtn.removeEventListener("click", closePanel);
      overlay.removeEventListener("click", closePanel);
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("click", onDocumentJumpLinkClick);
      revealObserver.disconnect();
      navObserver.disconnect();
      countObserver.disconnect();
      kwObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div id="portfolio-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}

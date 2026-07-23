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

  #portfolio-root * { box-sizing: border-box; margin: 0; padding: 0; }

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

  /* ---------- TERMINAL ---------- */
  .terminal {
    position: relative;
    margin: 40px 0 64px;
    background: var(--mono-bg);
    color: var(--mono-fg);
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.86rem;
    overflow: hidden;
    box-shadow: 0 12px 32px -12px rgba(28, 26, 23, 0.35);
    opacity: 0;
    animation: rise 0.7s ease forwards 0.15s;
  }

  .terminal::before {
    content: '';
    position: absolute;
    top: var(--glow-y, 50%);
    left: var(--glow-x, 50%);
    width: 320px;
    height: 320px;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(181, 80, 47, 0.18), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .terminal:hover::before { opacity: 1; }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 11px 14px;
    background: #17140f;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .terminal-bar span {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #4a453c;
  }

  .terminal-bar .label {
    margin-left: 8px;
    color: #857e70;
    font-size: 0.75rem;
    width: auto;
    height: auto;
    border-radius: 0;
    background: none;
  }

  .terminal-body {
    padding: 20px 20px 24px;
    min-height: 190px;
  }

  .terminal-line {
    display: flex;
    gap: 8px;
    position: relative;
  }

  .prompt-sym { color: var(--accent); }

  .input-wrap {
    position: relative;
    flex: 1;
  }

  #cmd-ghost {
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.86rem;
    color: #55503f;
    white-space: pre;
    pointer-events: none;
  }

  #cmd-ghost .typed { color: transparent; }

  #cmd-input {
    position: relative;
    background: none;
    border: none;
    outline: none;
    color: var(--mono-fg);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.86rem;
    width: 100%;
    caret-color: var(--accent);
    z-index: 1;
  }

  #cmd-input::placeholder { color: #6b6558; }

  .jump-link,
  .jump-cmd {
    cursor: pointer;
    text-decoration: underline dotted;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }

  .jump-link:hover,
  .jump-cmd:hover { color: #f2a679 !important; }

  @keyframes flash-highlight {
    0%, 100% { color: var(--accent); }
    50% { color: var(--ink); }
  }

  .flash-target { animation: flash-highlight 0.5s ease 2; }

  .terminal-output {
    margin-top: 14px;
    white-space: pre-wrap;
    color: #d8d2c5;
  }

  .terminal-output .k { color: #e8a06f; }

  .terminal-hints {
    margin-top: 16px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .hint-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #c9c3b6;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem;
    padding: 4px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .hint-btn:hover {
    background: rgba(181, 80, 47, 0.25);
    color: #f2ede4;
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
    grid-template-columns: 130px 1fr;
    gap: 20px;
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
    padding-top: 3px;
  }

  .entry .role-title {
    font-family: 'Fraunces', serif;
    font-size: 1.15rem;
    font-weight: 500;
  }

  .entry .org {
    color: var(--ink-soft);
    font-size: 0.92rem;
    margin-top: 2px;
  }

  .entry p.desc {
    margin-top: 8px;
    font-size: 0.95rem;
    color: var(--ink-soft);
    max-width: 52ch;
  }

  @media (max-width: 560px) {
    .entry {
      grid-template-columns: 1fr;
      gap: 6px;
    }
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
    left: 140px;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: var(--line);
  }

  #experience .entry .period {
    position: relative;
  }

  #experience .entry .period::after {
    content: '';
    position: absolute;
    right: -18px;
    top: calc(0.92rem - 3.5px);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
  }

  @media (max-width: 560px) {
    #experience::before { display: none; }
    #experience .entry .period::after { display: none; }
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

  <section class="terminal" id="terminal">
    <div class="terminal-bar">
      <span></span><span></span><span></span>
      <div class="label" id="terminal-label">isa@portfolio — zsh</div>
    </div>
    <div class="terminal-body">
      <div class="terminal-line">
        <span class="prompt-sym">&gt;</span>
        <div class="input-wrap">
          <div id="cmd-ghost"></div>
          <input id="cmd-input" type="text" placeholder="who-am-i" autocomplete="off" spellcheck="false" />
        </div>
      </div>
      <div class="terminal-hints">
        <button class="hint-btn" data-cmd="who-am-i">who-am-i</button>
        <button class="hint-btn" data-cmd="what-i-do">what-i-do</button>
        <button class="hint-btn" data-cmd="work">work</button>
        <button class="hint-btn" data-cmd="skills">skills</button>
        <button class="hint-btn" data-cmd="resume">resume</button>
        <button class="hint-btn" data-cmd="email">email</button>
      </div>
      <div class="terminal-output" id="cmd-output"></div>
    </div>
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
      <div>
        <div class="role-title">Product &amp; UX Designer</div>
        <div class="org">CodicePlastico</div>
        <p class="desc">Lead end-to-end <span class="kw kw-design">product discovery</span> for complex B2B and B2C platforms, turning ambiguous business requirements into testable prototypes. Integrate <span class="kw kw-ai">AI workflows</span> (Claude, Gemini, Figma AI) to keep design and dev docs in sync, and work directly with developers to ensure smooth handoffs.</p>
      </div>
    </div>

    <div class="entry">
      <div class="period">2025 to present</div>
      <div>
        <div class="role-title">Founder &amp; Community Organizer</div>
        <div class="org">Digital People</div>
        <p class="desc">Founded and scaled a <span class="kw kw-community">tech community</span> of <span class="count-up" data-target="80">0</span>+ members, organizing monthly meetups and speaking on <span class="kw kw-ai">AI-native design</span> at events like Product Heroes and XPUG.</p>
      </div>
    </div>

    <div class="entry">
      <div class="period">2025 to present</div>
      <div>
        <div class="role-title">Hackathon Facilitator</div>
        <div class="org">Sprintaly</div>
        <p class="desc">Coach multidisciplinary teams through problem framing, <span class="kw kw-startup">Lean validation</span> and rapid prototyping to deliver pitch-ready <span class="kw kw-startup">MVPs</span> in 48 to 72 hour sprints, helping them turn complex ideas into investor-ready value propositions.</p>
      </div>
    </div>

    <div class="entry">
      <div class="period">2021 to present</div>
      <div>
        <div class="role-title">Product Designer &amp; No-code Builder</div>
        <div class="org">Freelance</div>
        <p class="desc">Launched multiple production-ready <span class="kw kw-startup">MVPs</span> for early-stage <span class="kw kw-startup">startups</span>, from problem validation and <span class="kw kw-design">UX research</span> through functional <span class="kw kw-ai">Bubble.io</span> implementation. Long-term partner for a growing startup, evolving its MVP into a scaled platform.</p>
      </div>
    </div>

    <div class="entry">
      <div class="period">2020 to 2021</div>
      <div>
        <div class="role-title">Product Lead &amp; Co-founder</div>
        <div class="org">Mimiroo, Startup Geeks Incubator</div>
        <p class="desc">End-to-end development of an <span class="kw kw-startup">EdTech project</span>: defined the business model and value proposition, ran competitor analysis, and built/tested a functional <span class="kw kw-startup">MVP</span> in Bubble.io to validate core assumptions with real users.</p>
      </div>
    </div>
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
  useEffect(() => {
    const input = document.getElementById("cmd-input") as HTMLInputElement;
    const output = document.getElementById("cmd-output") as HTMLElement;

    const responses: Record<string, string> = {
      "who-am-i":
        "I'm Isa, Product & UX Designer, MSc in Management of Innovation.\nI turn ambiguous problems into testable prototypes, then stay close through build so nothing gets lost between design and what actually ships.",
      "what-i-do":
        "<span class='k'>Product discovery</span>\nturning vague business asks into prototypes people can actually test\n\n<span class='k'>AI-native workflow</span>\nusing Claude, Gemini & Figma AI to keep design and dev docs in sync\n\n<span class='k'>No-code build</span>\nshipping working MVPs myself in Bubble.io, not just mockups\n\n<span class='k'>Facilitation</span>\nrunning startup hackathons & co-design workshops under pressure",
      experience:
        "<span class='k'>2023 to now</span>\nProduct & UX Designer @ CodicePlastico\n\n<span class='k'>2025 to now</span>\nFounder @ Digital People (80+ member tech community)\n\n<span class='k'>2025 to now</span>\nHackathon Facilitator @ Sprintaly\n\n<span class='k'>2021 to now</span>\nFreelance Product Designer & No-code Builder\n\n<span class='k'>2020 to 21</span>\nProduct Lead & Co-founder, Mimiroo (Startup Geeks Incubator)",
      skills:
        "<span class='k'>Design & Research</span>\nUX Research, Wireframing & Prototyping, UI Design, Usability Testing\n\n<span class='k'>Strategy</span>\nAs-is & Competitor Analysis, Market Research\n\n<span class='k'>Facilitation</span>\nCo-design Workshops, Hackathon Facilitation\n\n<span class='k'>Tools</span>\nFigma, Bubble.io, Framer, Webflow, Claude, VS Code",
      "off-duty":
        "Off the clock: yoga, running (slowly, but consistently), and making pizza that doesn't always come out right.",
      help: "Try one of: who-am-i, what-i-do, experience, work, skills, off-duty, resume, email, linkedin",
      work: "Five real projects I've worked on, across AI SaaS, retail, fintech and facility management.\nI can't share everything about each one, but <span class='k jump-link' data-jump='work'>jump to Selected Work ↓</span> and click through for what I can show.",
    };

    const commandList = [
      "who-am-i", "what-i-do", "experience", "work", "skills",
      "off-duty", "resume", "email", "linkedin", "help", "clear",
    ];

    const synonyms: Record<string, string> = {
      cv: "resume",
      curriculum: "resume",
      "curriculum vitae": "resume",
      contact: "email",
      contatti: "email",
      reach: "email",
      projects: "work",
      progetti: "work",
      portfolio: "work",
      "case studies": "work",
      casestudies: "work",
      about: "who-am-i",
      bio: "who-am-i",
      intro: "who-am-i",
      services: "what-i-do",
      capabilities: "what-i-do",
    };

    function levenshtein(a: string, b: string) {
      const m = a.length, n = b.length;
      const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          dp[i][j] = a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        }
      }
      return dp[m][n];
    }

    function closestCommand(cmd: string): string | null {
      const candidates = [...commandList, ...Object.keys(synonyms)];
      let best: string | null = null;
      let bestDist = Infinity;
      candidates.forEach((c) => {
        const d = levenshtein(cmd, c);
        if (d < bestDist) { bestDist = d; best = c; }
      });
      if (!best || bestDist > 2) return null;
      return synonyms[best] || best;
    }

    const phraseMatches: { test: RegExp; target: string }[] = [
      { test: /years? of experience|how (long|many years)/, target: "experience" },
      { test: /what tools|tech stack|which tools|stack do you use/, target: "skills" },
      { test: /how (can|do) i (contact|reach)|get in touch|talk to you|speak with you|hire you/, target: "email" },
      { test: /what (projects|work) have you|show me (your work|projects)|see your work|case stud/, target: "work" },
      { test: /who are you|tell me about yourself/, target: "who-am-i" },
      { test: /what do you do|your role|your job/, target: "what-i-do" },
      { test: /download.*(cv|resume)|see your resume|see your cv/, target: "resume" },
    ];

    function matchPhrase(cmd: string): string | null {
      const hit = phraseMatches.find((p) => p.test.test(cmd));
      return hit ? hit.target : null;
    }

    const actions: Record<string, () => void> = {
      resume: () => window.open("https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view", "_blank"),
      email: () => { window.location.href = "mailto:isabellabonora1@gmail.com"; },
      linkedin: () => window.open("https://www.linkedin.com/in/isabella-bonora/", "_blank"),
    };

    const actionMessages: Record<string, string> = {
      resume: "Opening CV...",
      email: "Opening your email client...",
      linkedin: "Opening LinkedIn in a new tab...",
    };

    let typeTimer: ReturnType<typeof setInterval> | null = null;

    function typeHTML(html: string, el: HTMLElement, prefix?: string) {
      if (typeTimer) clearInterval(typeTimer);
      el.innerHTML = prefix || "";
      const tokens = html.match(/<[^>]+>|[\s\S]/g) || [];
      let i = 0;
      typeTimer = setInterval(() => {
        if (i >= tokens.length) {
          if (typeTimer) clearInterval(typeTimer);
          return;
        }
        el.innerHTML += tokens[i];
        i++;
      }, 12);
    }

    const terminalLabel = document.getElementById("terminal-label") as HTMLElement;

    const history: string[] = [];
    let historyIndex = 0;

    function runCommand(raw: string) {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      history.push(cmd);
      historyIndex = history.length;
      if (cmd === "clear") {
        output.innerHTML = "";
        terminalLabel.textContent = "isa@portfolio — zsh";
        return;
      }
      const resolved = synonyms[cmd] || matchPhrase(cmd) || cmd;
      if (actions[resolved]) {
        typeHTML(actionMessages[resolved], output);
        terminalLabel.textContent = `isa@portfolio — ${resolved}`;
        setTimeout(actions[resolved], 500);
      } else if (responses[resolved]) {
        typeHTML(responses[resolved], output);
        terminalLabel.textContent = `isa@portfolio — ${resolved}`;
      } else {
        const suggestion = closestCommand(cmd);
        if (suggestion) {
          typeHTML(`command not found: ${cmd}\ndid you mean <span class="k jump-cmd" data-cmd="${suggestion}">${suggestion}</span>?`, output);
        } else {
          typeHTML(`command not found: ${cmd}\nI probably don't have a command for that, the info's likely somewhere below ↓. Or skip the terminal entirely and <span class="k jump-cmd" data-cmd="email">email me directly</span>, always happy to talk it through :)`, output);
        }
        terminalLabel.textContent = "isa@portfolio — zsh";
      }
    }

    output.addEventListener("click", (e) => {
      const cmdLink = (e.target as HTMLElement).closest(".jump-cmd") as HTMLElement | null;
      if (cmdLink) {
        runCommand(cmdLink.dataset.cmd as string);
        return;
      }
      const link = (e.target as HTMLElement).closest(".jump-link") as HTMLElement | null;
      if (!link) return;
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
    });

    const ghost = document.getElementById("cmd-ghost") as HTMLElement;

    function updateGhost() {
      const val = input.value;
      if (!val) { ghost.innerHTML = ""; return; }
      const match = commandList.find((c) => c.startsWith(val.toLowerCase()) && c !== val.toLowerCase());
      if (!match) { ghost.innerHTML = ""; return; }
      ghost.innerHTML = `<span class="typed">${val}</span>${match.slice(val.length)}`;
    }

    input.addEventListener("input", updateGhost);

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        runCommand(input.value);
        input.value = "";
        updateGhost();
      } else if (e.key === "Tab") {
        e.preventDefault();
        const val = input.value.toLowerCase();
        const match = commandList.find((c) => c.startsWith(val));
        if (match) { input.value = match; updateGhost(); }
      } else if (e.key === "ArrowRight" && input.selectionStart === input.value.length) {
        const val = input.value;
        const match = commandList.find((c) => c.startsWith(val.toLowerCase()) && c !== val.toLowerCase());
        if (match) { input.value = match; updateGhost(); }
      } else if (e.key === "ArrowUp") {
        if (history.length === 0) return;
        e.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
        updateGhost();
      } else if (e.key === "ArrowDown") {
        if (history.length === 0) return;
        e.preventDefault();
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || "";
        updateGhost();
      }
    }
    input.addEventListener("keydown", onKeydown);

    const hintBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".hint-btn"));
    const hintHandler = (btn: HTMLButtonElement) => () => {
      const cmd = btn.dataset.cmd as string;
      input.value = cmd;
      updateGhost();
      input.focus();
      setTimeout(() => {
        runCommand(cmd);
        input.value = "";
        updateGhost();
      }, 380);
    };
    const hintHandlers = hintBtns.map((btn) => {
      const handler = hintHandler(btn);
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    typeHTML(
      "Just quick shortcuts. Try <span class='k'>who-am-i</span>, or <span class='k'>resume</span> / <span class='k'>email</span> to reach me directly.\nUse <span class='k'>tab</span> to autocomplete, <span class='k'>↑ / ↓</span> for history.",
      output
    );
    input.focus();

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

    // terminal cursor glow
    const terminalEl = document.getElementById("terminal") as HTMLElement;
    function onTerminalMove(e: MouseEvent) {
      const rect = terminalEl.getBoundingClientRect();
      terminalEl.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      terminalEl.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    }
    terminalEl.addEventListener("mousemove", onTerminalMove);

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
      if (typeTimer) clearInterval(typeTimer);
      input.removeEventListener("input", updateGhost);
      input.removeEventListener("keydown", onKeydown);
      hintHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      themeToggle.removeEventListener("click", onThemeToggle);
      window.removeEventListener("scroll", onScroll);
      terminalEl.removeEventListener("mousemove", onTerminalMove);
      panelExpand.removeEventListener("click", onPanelExpand);
      workHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      pillHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      panelCloseBtn.removeEventListener("click", closePanel);
      overlay.removeEventListener("click", closePanel);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div id="portfolio-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}

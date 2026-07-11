"use client";
import { useEffect } from "react";
import { projects } from "./project/data";

const skills = [
  "UX Design", "Bubble.io", "Product Design", "Hackathons", "No-Code",
  "Facilitation", "Startups", "Workshops", "Innovation", "Co-Design",
  "Figma", "Ai", "Design Systems", "User Research", "Framer",
];

const toolTags = [
  "Product Strategy", "MVP Thinking", "User Research", "Design Systems",
  "Bubble.io", "UX/UI Design", "Claude", "Figma", "Prototyping",
  "No Code", "Workshops", "Facilitation", "Community",
  "Card Sorting", "Journey Mapping", "Usability Testing",
];
/* color follows the same dark / green / pink split used in "The work I care
   about": dark = Design & UX, green = Innovation & Startups, pink = No-Code & Emerging Tech */
const toolTagColors = ["green", "green", "dark", "dark", "pink", "dark", "pink", "dark", "dark", "pink", "green", "green", "green", "dark", "dark", "dark"];
const workTilts = [-4, 3, -2, 4];

export default function Home() {

  useEffect(() => {
    /* ── page-transition entry: recede the drop from wherever it grew on the
       previous page, so it reads as one continuous motion across navigation ── */
    const overlay = document.getElementById("pageTransitionOverlay");
    if (overlay) {
      const ox = sessionStorage.getItem("pt-ox") || "50%";
      const oy = sessionStorage.getItem("pt-oy") || "50%";
      overlay.style.setProperty("--ox", ox);
      overlay.style.setProperty("--oy", oy);
      overlay.classList.add("no-transition", "active");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.classList.remove("no-transition");
          overlay.classList.remove("active");
        });
      });
    }

    /* ── cursor ── */
    const cur = document.getElementById("cur")!;
    let MX = window.innerWidth * .08, MY = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      MX = e.clientX; MY = e.clientY;
      cur.style.left = MX + "px"; cur.style.top = MY + "px";
    };
    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", () => cur.classList.add("big"));
      el.addEventListener("mouseleave", () => cur.classList.remove("big"));
    });

    /* ── cursor softens over photos that are actually clickable
       (.work-image sits inside the clickable .work-row card; the hero and
       about photos are decorative only, so they don't get the treatment) ── */
    const photoEls = document.querySelectorAll(".work-image");
    photoEls.forEach(el => {
      el.addEventListener("mouseenter", () => cur.classList.add("photo"));
      el.addEventListener("mouseleave", () => cur.classList.remove("photo"));
    });

    /* ── cursor color adapts to dark sections for contrast ── */
    const darkZones = document.querySelectorAll("#stats, #footer");
    const onDarkEnter = () => cur.style.setProperty("--cur-rgb", "250,248,243");
    const onDarkLeave = () => cur.style.setProperty("--cur-rgb", "196,85,58");
    darkZones.forEach(el => {
      el.addEventListener("mouseenter", onDarkEnter);
      el.addEventListener("mouseleave", onDarkLeave);
    });

    /* ── magnetic hover (optionally combined with scroll parallax) ── */
    const magnetic = document.querySelectorAll<HTMLElement>(".magnetic");
    const magState = new Map<HTMLElement, { mx: number; my: number }>();
    magnetic.forEach(el => magState.set(el, { mx: 0, my: 0 }));

    const applyMagTransform = (el: HTMLElement) => {
      const s = magState.get(el) || { mx: 0, my: 0 };
      const factor = parseFloat(el.dataset.parallax || "0");
      let py = 0;
      if (factor) {
        const r = el.getBoundingClientRect();
        const centerOffset = (r.top + r.height / 2) - window.innerHeight / 2;
        py = -centerOffset * factor;
      }
      el.style.transform = `translate(${s.mx}px, ${s.my + py}px)`;
    };

    magnetic.forEach(el => {
      const onMagMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const s = magState.get(el)!;
        s.mx = (e.clientX - (r.left + r.width / 2)) * 0.15;
        s.my = (e.clientY - (r.top + r.height / 2)) * 0.18;
        applyMagTransform(el);
      };
      const onMagLeave = () => {
        const s = magState.get(el)!;
        s.mx = 0; s.my = 0;
        applyMagTransform(el);
      };
      el.addEventListener("mousemove", onMagMove);
      el.addEventListener("mouseleave", onMagLeave);
    });

    /* ── drop-fill buttons: the drop grows from wherever the cursor enters ── */
    const dropBtns = document.querySelectorAll<HTMLElement>(".drop-btn");
    const onDropEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--dx", (e.clientX - r.left) + "px");
      el.style.setProperty("--dy", (e.clientY - r.top) + "px");
    };
    dropBtns.forEach(el => el.addEventListener("mouseenter", onDropEnter));

    /* ── nav scroll-spy: highlight Work / About while their section is in view ── */
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-r a[data-nav]");
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const id = (e.target as HTMLElement).id;
        const link = document.querySelector<HTMLAnchorElement>(`.nav-r a[data-nav="${id}"]`);
        if (link && e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    navLinks.forEach(l => {
      const id = l.dataset.nav!;
      const sec = document.getElementById(id);
      if (sec) navObs.observe(sec);
    });

    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const progressEl = document.getElementById("scrollProgress");
    const marqueeTrack = document.querySelector<HTMLElement>(".marquee-track");
    const railDrop = document.getElementById("homeRailDrop");

    let parallaxRaf = 0;
    const onScrollParallaxTick = () => {
      parallaxRaf = 0;
      parallaxEls.forEach(el => applyMagTransform(el));

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressEl) progressEl.style.width = pct + "%";
      if (railDrop) railDrop.style.top = pct + "%";
    };
    const onScrollParallax2 = () => {
      if (!parallaxRaf) parallaxRaf = requestAnimationFrame(onScrollParallaxTick);
    };
    window.addEventListener("scroll", onScrollParallax2, { passive: true });
    onScrollParallaxTick();

    /* marquee: starts fast, eases down once to a steady, readable pace,
       then stays there regardless of scrolling */
    let marqueeCurrent = 3;
    let marqueeRaf: number;
    const marqueeSettle = () => {
      marqueeCurrent += (1 - marqueeCurrent) * 0.02;
      if (marqueeTrack) marqueeTrack.style.animationDuration = (60 / marqueeCurrent) + "s";
      if (Math.abs(marqueeCurrent - 1) > 0.01) {
        marqueeRaf = requestAnimationFrame(marqueeSettle);
      } else if (marqueeTrack) {
        marqueeTrack.style.animationDuration = "60s";
      }
    };
    marqueeSettle();

    /* ── hero canvas: a subtle orb, reacting to the cursor ── */
    const oc = document.getElementById("natureCanvas") as HTMLCanvasElement;
    const octx = oc.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => {
      const box = oc.getBoundingClientRect();
      W = oc.width = box.width; H = oc.height = box.height;
    };
    resize(); window.addEventListener("resize", resize);
    let SMX = W / 2, SMY = H / 2;

    const RINGS = 40;
    const rings = Array.from({ length: RINGS }, (_, i) => ({
      t: i / (RINGS - 1),
      phase: Math.random() * Math.PI * 2,
      speed: .006 + Math.random() * .01,
    }));

    let oceanRaf: number;
    function drawScene() {
      SMX += (MX - SMX) * .05; SMY += (MY - SMY) * .05;
      octx.clearRect(0, 0, W, H);
      const cx = W * .5, cy = H * .5;
      const maxR = Math.min(W, H) * .42;
      const dxm = SMX - cx, dym = SMY - cy;
      const mouseAngle = Math.atan2(dym, dxm);
      const mouseDist = Math.min(1, Math.hypot(dxm, dym) / (maxR * 2.2));

      rings.forEach((r) => {
        r.phase += r.speed;
        const baseR = 10 + r.t * maxR;
        const segs = 80;
        octx.beginPath();
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          const wobble = Math.sin(a * 4 + r.phase) * (2 + r.t * 6);
          const pull = Math.cos(a - mouseAngle) * mouseDist * maxR * .2 * (.3 + r.t);
          const rad = baseR + wobble + pull;
          const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad * .9;
          s === 0 ? octx.moveTo(x, y) : octx.lineTo(x, y);
        }
        octx.closePath();
        const ringA = (1 - r.t) * .35 + .04;
        octx.strokeStyle = `rgba(196,85,58,${ringA})`;
        octx.lineWidth = 1 + (1 - r.t) * 1.2;
        octx.stroke();
      });

      oceanRaf = requestAnimationFrame(drawScene);
    }
    drawScene();

    /* ── connective thread: a fixed line, present on screen through the entire scroll, ties every section together ── */
    const threadC = document.getElementById("threadCanvas") as HTMLCanvasElement;
    const threadCtx = threadC.getContext("2d")!;
    let TW = 0, TH = 0;
    const resizeThread = () => { TW = threadC.width = 56; TH = threadC.height = window.innerHeight; };
    resizeThread();
    window.addEventListener("resize", resizeThread);

    const mixRgbThread = (a: number[], b: number[], t: number) =>
      a.map((v, i) => Math.round(v + (b[i] - v) * t));

    let threadRaf: number;
    function drawThread() {
      threadCtx.clearRect(0, 0, TW, TH);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const mood = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;
      const rgb = mixRgbThread([196, 85, 58], [138, 172, 190], mood);

      const mouseInfluence = (MX / window.innerWidth - .08) * 14;
      const scrollPhase = window.scrollY * .006;
      threadCtx.beginPath();
      for (let y = 0; y <= TH; y += 6) {
        const wobble = Math.sin(y * .012 + scrollPhase) * 8 + Math.sin(y * .03 - scrollPhase * 1.6) * 3;
        const x = TW / 2 + wobble + mouseInfluence;
        y === 0 ? threadCtx.moveTo(x, y) : threadCtx.lineTo(x, y);
      }
      threadCtx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.32)`;
      threadCtx.lineWidth = 1.4;
      threadCtx.stroke();
      threadRaf = requestAnimationFrame(drawThread);
    }
    drawThread();

    /* ── hero text reveal ── */
    const words = document.querySelectorAll<HTMLElement>(".tw");
    words.forEach((w, i) => setTimeout(() => { w.style.transform = "translateY(0)"; }, 300 + i * 160));
    const tot = 300 + words.length * 160;
    setTimeout(() => {
      document.getElementById("hsub")?.classList.add("show");
      document.getElementById("nav")?.classList.add("show");
      document.getElementById("heroCta")?.classList.add("show");
    }, tot + 100);

    /* ── scroll reveal ── */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = parseInt((e.target as HTMLElement).dataset.delay || "0");
          setTimeout(() => e.target.classList.add("show"), d);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll(".work-row, .what-card, .beyond-card, .skills-wrap, .title-wrap, .section-rule").forEach(c => obs.observe(c));

    /* ── stat counters ── */
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseInt(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const numEl = el.querySelector(".stat-num") as HTMLElement;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          numEl.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        statObs.unobserve(el);
      });
    }, { threshold: .4 });
    document.querySelectorAll(".stat").forEach(el => statObs.observe(el));

    /* ── wave underline (Work rows) ── */
    interface WaveState { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; phase: number; on: boolean; raf: number | null; }
    const waveCs: Record<string, WaveState> = {};
    document.querySelectorAll<HTMLCanvasElement>(".case-wave").forEach(c => {
      const id = c.dataset.wave!;
      waveCs[id] = { canvas: c, ctx: c.getContext("2d")!, phase: 0, on: false, raf: null };
    });
    function animWave(id: string) {
      const w = waveCs[id]; if (!w) return;
      const W2 = w.canvas.width = w.canvas.offsetWidth;
      const H2 = w.canvas.height = w.canvas.offsetHeight || 14;
      w.phase += .09;
      w.ctx.clearRect(0, 0, W2, H2);
      w.ctx.beginPath();
      for (let x = 0; x <= W2; x += 2) {
        const s1 = Math.sin(x * .04 + w.phase) * 3;
        const y = H2 / 2 + s1;
        x === 0 ? w.ctx.moveTo(x, y) : w.ctx.lineTo(x, y);
      }
      w.ctx.strokeStyle = "rgba(196,85,58,.7)";
      w.ctx.lineWidth = 2;
      w.ctx.stroke();
      if (w.on) w.raf = requestAnimationFrame(() => animWave(id));
    }
    document.querySelectorAll<HTMLElement>(".work-row").forEach(c => {
      const id = (c.querySelector(".case-wave") as HTMLCanvasElement)?.dataset.wave;
      if (!id) return;
      c.addEventListener("mouseenter", () => { waveCs[id].on = true; animWave(id); });
      c.addEventListener("mouseleave", () => {
        waveCs[id].on = false; if (waveCs[id].raf) cancelAnimationFrame(waveCs[id].raf!);
        waveCs[id].ctx.clearRect(0, 0, waveCs[id].canvas.width, waveCs[id].canvas.height);
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScrollParallax2);
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
      cancelAnimationFrame(marqueeRaf);
      cancelAnimationFrame(oceanRaf);
      window.removeEventListener("resize", resizeThread);
      cancelAnimationFrame(threadRaf);
      obs.disconnect();
      statObs.disconnect();
      dropBtns.forEach(el => el.removeEventListener("mouseenter", onDropEnter));
      navObs.disconnect();
      darkZones.forEach(el => {
        el.removeEventListener("mouseenter", onDarkEnter);
        el.removeEventListener("mouseleave", onDarkLeave);
      });
    };
  }, []);

  function goToProject(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const overlay = document.getElementById("pageTransitionOverlay");
    if (!overlay) { window.location.href = href; return; }
    const ox = e.clientX + "px", oy = e.clientY + "px";
    sessionStorage.setItem("pt-ox", ox);
    sessionStorage.setItem("pt-oy", oy);
    overlay.style.setProperty("--ox", ox);
    overlay.style.setProperty("--oy", oy);
    overlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 550);
  }

  return (
    <>
      <div id="cur" />
      <div id="pageTransitionOverlay" />
      <canvas id="threadCanvas" />
      <div className="home-rail-drop" id="homeRailDrop" />
      <div id="scrollProgress" />

      {/* NAV */}
      <nav id="nav">
        <a href="/" className="logo">ib.</a>
        <ul className="nav-r">
          <li><a href="#work" data-nav="work">Work</a></li>
          <li><a href="#about" data-nav="about">About</a></li>
          <li><a href="https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view" target="_blank" className="cta drop-btn magnetic"><span className="btn-label">My CV</span></a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-top">
            <p className="hero-eyebrow">Hi, I&apos;m Isa!</p>
            <div className="hero-titles">
              <div className="tline"><span className="tw">Designer.</span></div>
              <div className="tline"><span className="tw">Builder.</span></div>
              <div className="tline"><span className="tw">Speaker.</span></div>
            </div>
            <p className="hero-subtitle" id="hsub">
              I turn messy realities into products people want to use.
            </p>
          </div>
          <a href="mailto:isabellabonora1@gmail.com" className="hero-cta drop-btn magnetic" id="heroCta"><span className="btn-label">Let&apos;s talk! →</span></a>
        </div>
        <div className="hero-right">
          <canvas id="natureCanvas" />
          <div className="hero-photo-wrap magnetic" data-parallax="0.06">
            <img src="/hero-photo.png" alt="Isabella Bonora" className="hero-photo" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...skills, ...skills].map((s, i) => (
            <span className="marquee-pill" key={i}>{s}<span className="marquee-dot" /></span>
          ))}
        </div>
      </div>

      {/* WHAT I DO */}
      <section id="what">
        <div className="section-head">
          <span className="section-eyebrow">What I do</span>
          <span className="section-rule" />
          <div className="title-wrap"><h2 className="section-title reveal-title">The work I care about</h2></div>
        </div>
        <div className="what-grid">
          <div className="what-card what-card-main" data-delay="0">
            <div className="what-card-top">
              <h3 className="what-label">Design &amp; UX</h3>
              <p className="what-text">I design digital products that people enjoy and that build business outcomes. From research, prototyping and systems thinking to complex screen clarity, balancing user needs with business impact.</p>
            </div>
          </div>
          <div className="what-col">
            <div className="what-card what-card-green" data-delay="100">
              <div className="what-card-top">
                <h3 className="what-label">Innovation &amp; Startups</h3>
                <p className="what-text">Adaptability meets focus. Technical tradeoffs, uncertainty, velocity, navigated.</p>
              </div>
            </div>
            <div className="what-card what-card-pink" data-delay="200">
              <div className="what-card-top">
                <h3 className="what-label">No Code &amp; Emerging Tech</h3>
                <p className="what-text">Speed through no-code and dev-light approaches. Less friction, more innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="work-head">
          <span className="section-eyebrow">Selected Work</span>
          <span className="section-rule" />
          <div className="title-wrap"><h2 className="section-title reveal-title">Case studies</h2></div>
        </div>

        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/project/${p.slug}`}
            className={`work-row${i % 2 === 1 ? " reverse" : ""}`}
            data-delay={i * 100}
            onClick={(e) => goToProject(e, `/project/${p.slug}`)}
          >
            <div className="work-text">
              <div className="work-tag-body">
                <span className="work-tag">{p.sector}</span>
                <h3 className="work-title">{p.title}</h3>
                <canvas className="case-wave" data-wave={`w${i}`} />
                <p className="work-desc">{p.heroQuote}</p>
                <span className="work-link magnetic">Read case study <span className="arrow">→</span></span>
              </div>
            </div>
            <div className="work-image magnetic" data-parallax="0.04">
              <div className="work-image-card" style={{ "--tilt": `${workTilts[i]}deg` } as React.CSSProperties}>
                <img src={`/cs${i + 1}.png`} alt="" />
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-photo-col">
          <div className="about-photo-shadow magnetic" data-parallax="0.05">
            <div className="about-photo-frame">
              <img src="/about-photo-figma.png" alt="Isabella Bonora" />
              <p className="about-photo-caption">UX &amp; Product Designer · Founder Digital People Community · Master&apos;s Entrepreneurship</p>
            </div>
          </div>
        </div>
        <div className="about-body">
          <h2 className="about-lead">I started with economics. Then discovered I could design AND build.</h2>
          <p className="about-text">Today I work at the intersection of product design, facilitation, and no-code building. What drives me is the exact point where design decisions become business decisions, and the other way around.</p>
          <p className="about-text">I hold a degree in Economics and a Master&apos;s in Entrepreneurship, but the real shift happened when I stopped treating strategy, design, and building as separate jobs. Outside client work, I facilitate workshops and hackathons and run Digital People, a community for tech and digital professionals in Trentino, because I&apos;ve never believed the best ideas happen alone.</p>
          <a href="https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view" target="_blank" className="about-link magnetic">View full CV <span className="arrow">→</span></a>
        </div>
      </section>

      {/* STATS */}
      <section id="stats">
        <span className="section-eyebrow stats-eyebrow">The receipts</span>
        <div className="stats-grid">
          <div className="stat" data-count="100" data-suffix="+">
            <span className="stat-num">0</span>
            <span className="stat-label">Digital People members</span>
          </div>
          <div className="stat" data-count="2">
            <span className="stat-num">0</span>
            <span className="stat-label">Hackathon editions facilitated</span>
          </div>
          <div className="stat" data-count="5" data-suffix="+">
            <span className="stat-num">0</span>
            <span className="stat-label">Years across design &amp; no-code</span>
          </div>
          <div className="stat" data-count="150" data-suffix="+">
            <span className="stat-num">0</span>
            <span className="stat-label">Yoga classes attended</span>
          </div>
        </div>
      </section>

      {/* BEYOND THE SCREEN */}
      <section id="beyond">
        <div className="section-head">
          <div className="title-wrap"><h2 className="section-title reveal-title">Beyond the screen</h2></div>
          <p className="hero-subtitle beyond-subtitle" style={{ color: "var(--ink)", opacity: .7 }}>Where product design meets facilitation and building.</p>
        </div>
        <div className="beyond-grid">
          <div className="beyond-card beyond-card-wide beyond-card-photo" data-delay="0">
            <img src="/beyond-1.png" alt="Digital People community event" />
            <div className="beyond-card-body">
              <span className="beyond-card-tag">Founder · Trento</span>
              <h3 className="beyond-card-title">Digital People Community</h3>
              <p className="beyond-card-text">A meetup community for tech and digital professionals in Trentino, connecting remote workers, founders, and curious minds.</p>
              <span className="beyond-card-year">2025-26</span>
            </div>
          </div>
          <div className="beyond-card beyond-card-narrow beyond-card-photo" data-delay="100">
            <img src="/beyond-2.png" alt="Sprintaly hackathon" />
            <div className="beyond-card-body">
              <span className="beyond-card-tag">Facilitator · Turin</span>
              <h3 className="beyond-card-title beyond-card-title-sm">Sprintaly Hackathon</h3>
              <p className="beyond-card-text">Guided under-30 teams through two residential social innovation hackathons.</p>
              <span className="beyond-card-year">2 editions</span>
            </div>
          </div>
          <div className="beyond-card beyond-card-narrow" data-delay="200">
            <div className="beyond-card-quote-wrap">
              <p className="beyond-card-quote">&ldquo;From idea to shipped MVP&rdquo;</p>
              <div className="beyond-card-quote-meta">
                <span className="beyond-card-role">Mimiroo · Startup Geeks Incubator</span>
                <span className="beyond-card-when">2020-21</span>
                <span className="beyond-card-role-tag">Startup Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLS */}
      <section id="skills">
        <span className="skills-watermark">Skills &amp; Tools</span>
        <div className="title-wrap"><h2 className="section-title skills-title reveal-title">Skills &amp; Tools</h2></div>
        <div className="skills-wrap" data-delay="0">
          {toolTags.map((t, i) => (
            <span className={`skill-pill ${toolTagColors[i]}`} key={i}>{t}</span>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <div className="footer-top">
          <div className="footer-left">
            <span className="footer-name">Isabella Bonora</span>
            <a href="mailto:isabellabonora1@gmail.com" className="footer-cta drop-btn magnetic"><span className="btn-label">Contact Me →</span></a>
          </div>
          <div className="footer-social">
            <span className="footer-social-label">Social</span>
            <a href="https://www.linkedin.com/in/isabella-bonora/" target="_blank" className="magnetic">LinkedIn</a>
            <a href="https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view" target="_blank" className="magnetic">View CV</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>isabellabonora © 2026</span>
          <span>Built with love &amp; coffee</span>
        </div>
      </footer>
    </>
  );
}

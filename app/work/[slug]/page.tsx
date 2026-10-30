"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "../data";
import Sidekick from "../../Sidekick";

const sections = [
  { id: "glance", label: "In short" },
  { id: "challenge", label: "Challenge" },
  { id: "decisions", label: "Key decisions" },
  { id: "gallery", label: "Gallery" },
  { id: "outcome", label: "Outcome" },
  { id: "learned", label: "What I learned" },
];

export default function CasePage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  if (!project) notFound();

  const [menuOpen, setMenuOpen] = useState(false);
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // landing from the compass: the card that flew to the centre settles into the hero
    let fly: HTMLElement | null = null;
    let raw: string | null = null;
    try { raw = sessionStorage.getItem("case-fly"); sessionStorage.removeItem("case-fly"); } catch { /* private mode */ }
    const hero = document.querySelector<HTMLElement>(".cs-hero-frame");
    if (raw && hero && !still && window.scrollY < 10) {
      const from = JSON.parse(raw) as { left: number; top: number; width: number; height: number };
      hero.classList.add("is-landing");
      fly = document.createElement("div");
      fly.className = "cs-frame cs-fly";
      fly.innerHTML = `<img src="${project.heroImage}" alt="" />`;
      Object.assign(fly.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
      document.body.append(fly);
      const f = fly;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        Object.assign(f.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      }));
      // transitionend can be skipped (no distance to travel, background tab):
      // a timer makes sure the hero always comes back
      let landed = false;
      const land = () => {
        if (landed) return;
        landed = true;
        hero.classList.remove("is-landing");
        f.style.opacity = "0";
        window.setTimeout(() => f.remove(), 260);
      };
      f.addEventListener("transitionend", (e) => { if (e.propertyName === "top") land(); });
      window.setTimeout(land, 1000);
    }

    // things appear as you reach them; blocks that arrive together are staggered
    const obs = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${(n++ * 0.1).toFixed(2)}s`);
          el.classList.add("is-in");
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    const items = ".cs-label, h2, .cs-body, .cs-glass-card, .cs-stat, .cs-decisions li, .cs-gallery figure, .cs-points li, .cs-quote, .cs-next-buddy, .cs-next-card, .cs-contact";
    document.querySelectorAll<HTMLElement>(".cs-reveal").forEach((sec) =>
      sec.querySelectorAll<HTMLElement>(items).forEach((el) => {
        if (el.closest(".cs-decisions li") && !el.matches("li")) return; // rows animate as a whole
        el.classList.add("cs-rv");
        obs.observe(el);
      })
    );

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);

    // scroll-linked motion: each [data-scroll] element gets --p, its progress
    // through the viewport (0 entering at the bottom, 1 leaving at the top)
    const movers = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of movers) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty("--p", p.toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    if (!still) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      obs.disconnect();
      fly?.remove();
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slug, project.heroImage]);

  // Fallbacks keep older case studies readable until their new fields are written.
  const meta = project.meta;
  const glance = project.glance ?? {
    problem: project.challenge.text,
    did: project.process.map((s) => s.heading).join(" · "),
    outcome: project.screensPoints[0],
  };
  const gallery = project.gallery ?? [{ src: project.screensImage, caption: project.screensPoints.join(" · ") }];
  const visibleSections = sections.filter((s) => s.id !== "decisions" || project.decisions);

  return (
    <div className="cs">
      <header className="cs-topbar">
        <Link className="cs-tb-btn" href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z" /></svg>
        </Link>
        <button className="cs-tb-btn" type="button" aria-label="Sections" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14M5 15h14" /></svg>
        </button>
        {menuOpen && (
          <nav className="cs-tb-list" onClick={() => setMenuOpen(false)}>
            {visibleSections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.label}</a>
            ))}
            <a href={`/#work-${idx}`}><span>↩</span>All work</a>
          </nav>
        )}
      </header>

      {/* ── Header: what, who, when ── */}
      <section className="cs-head">
        <a href={`/#work-${idx}`} className="cs-back">← Work</a>
        <div className="cs-head-grid">
          <div>
            <p className="cs-mono">{project.num} · {project.sector}</p>
            <h1>{project.title}</h1>
            <p className="cs-lead">{project.teaser ?? project.heroQuote}</p>
          </div>
          {meta ? (
            <dl className="cs-meta">
              {([["Year", meta.year], ["Role", meta.role], ["Worked with", meta.team], ["Platform", meta.platform], ["Tools", meta.tools]] as const)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
            </dl>
          ) : (
            <dl className="cs-meta">
              <div><dt>Focus</dt><dd>{project.tags.join(", ")}</dd></div>
              <div><dt>Highlight</dt><dd>{project.brief.stat}</dd></div>
            </dl>
          )}
        </div>
        <div className="cs-hero-frame" data-scroll>
          <img src={project.heroImage} alt={project.title} />
        </div>
      </section>

      {/* ── In short: the 20-second read ── */}
      <section id="glance" className="cs-block cs-reveal">
        <p className="cs-label">In short</p>
        <div className="cs-glance">
          {([["The problem", glance.problem], ["What I did", glance.did], ["The outcome", glance.outcome]] as const).map(([k, v], i) => (
            <article key={k} className="cs-glass-card">
              <span className="cs-mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{k}</h3>
              <p>{v}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Context and challenge ── */}
      <section id="challenge" className="cs-block cs-reveal">
        <p className="cs-label">Context &amp; challenge</p>
        <div className="cs-two">
          <div>
            <h2>{project.challenge.heading}</h2>
            <p className="cs-body">{project.brief.text}</p>
            <p className="cs-body">{project.challenge.text}</p>
          </div>
          <div className="cs-stats">
            {[project.challenge.stat1, project.challenge.stat2].map((st) => (
              <div key={st.label} className="cs-stat">
                <p className="cs-stat-value">{st.value}</p>
                <p className="cs-stat-label">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key decisions (or the process, for older case studies) ── */}
      <section id="decisions" className="cs-block cs-reveal">
        <p className="cs-label">{project.decisions ? "Key decisions" : "Process"}</p>
        <ol className="cs-decisions">
          {project.decisions
            ? project.decisions.map((d, i) => (
                <li key={d.title}>
                  <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p className="cs-choice"><span className="cs-mono">Chose</span>{d.chose}</p>
                    {d.over && <p className="cs-choice cs-choice-over"><span className="cs-mono">Over</span>{d.over}</p>}
                    <p className="cs-body">{d.why}</p>
                  </div>
                </li>
              ))
            : project.process.map((s, i) => (
                <li key={s.heading}>
                  <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.heading}</h3>
                    <p className="cs-body">{s.body}</p>
                  </div>
                </li>
              ))}
        </ol>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="cs-block cs-gallery-block cs-reveal">
        <p className="cs-label">From the work</p>
        <div className="cs-gallery" data-scroll tabIndex={0} aria-label="Project gallery, scroll sideways">
          {gallery.map((g, i) => (
            <figure key={g.src}>
              <div className="cs-frame"><img src={g.src} alt={g.caption} loading="lazy" /></div>
              <figcaption><span className="cs-mono">{i + 1} / {gallery.length}</span>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Outcome ── */}
      <section id="outcome" className="cs-block cs-reveal">
        <p className="cs-label">Outcome</p>
        <div className="cs-two">
          <p className="cs-body cs-body-lg">{project.outcome ?? project.screensPoints.join(" ")}</p>
          <ul className="cs-points">
            {project.screensPoints.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
      </section>

      {/* ── Reflection ── */}
      <section id="learned" className="cs-block cs-reveal">
        <p className="cs-label">What I learned</p>
        <blockquote className="cs-quote">{project.reflection}</blockquote>
      </section>

      {/* ── Next ── */}
      <section className="cs-next cs-reveal" data-scroll>
        <div className="cs-next-buddy">
          <Sidekick size={96} />
          <p>That&apos;s the story. <span>There&apos;s another one right here.</span></p>
        </div>
        <a href={`/work/${next.slug}`} className="cs-next-card">
          <div className="cs-frame"><img src={next.heroImage} alt="" /></div>
          <div>
            <p className="cs-mono">Next · {next.sector}</p>
            <h3>{next.title}</h3>
            <span className="cs-cta">Read the case study <span aria-hidden="true">→</span></span>
          </div>
        </a>
        <p className="cs-contact">Want to talk about it? <a href="mailto:isabellabonora1@gmail.com">isabellabonora1@gmail.com</a></p>
      </section>
    </div>
  );
}

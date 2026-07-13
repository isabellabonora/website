"use client";
import { useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { getProject, projects } from "../data";
import Link from "next/link";

const heroTilt = -3;

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const project = getProject(slug);
  if (!project) notFound();

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
    const onMove = (e: MouseEvent) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);

    const bigEls = document.querySelectorAll("a, button");
    const onBigEnter = () => cur.classList.add("big");
    const onBigLeave = () => cur.classList.remove("big");
    bigEls.forEach((el) => {
      el.addEventListener("mouseenter", onBigEnter);
      el.addEventListener("mouseleave", onBigLeave);
    });

    /* the hero and screens images aren't clickable here, so the cursor
       doesn't get the "photo" soft-expand treatment on them */

    /* ── cursor color: this project's accent by default, cream over the
       dark nav-footer bar for contrast ── */
    const accentRgb = project.color.slice(5, -1);
    cur.style.setProperty("--cur-rgb", accentRgb);
    const darkZone = document.querySelector(".prj-navfooter");
    const onDarkEnter = () => cur.style.setProperty("--cur-rgb", "250,248,243");
    const onDarkLeave = () => cur.style.setProperty("--cur-rgb", accentRgb);
    darkZone?.addEventListener("mouseenter", onDarkEnter);
    darkZone?.addEventListener("mouseleave", onDarkLeave);

    /* ── magnetic hover ── */
    const magnetic = document.querySelectorAll<HTMLElement>(".magnetic");
    const onMagMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - (r.left + r.width / 2)) * 0.15;
      const my = (e.clientY - (r.top + r.height / 2)) * 0.18;
      el.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const onMagLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
    };
    magnetic.forEach((el) => {
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
    dropBtns.forEach((el) => el.addEventListener("mouseenter", onDropEnter));

    /* ── reading rail: a drop travels down the left edge as you scroll,
       standing in for the home page's connective thread with the same
       "drop" language instead of the thread's wobble ── */
    const railDrop = document.getElementById("prjRailDrop");
    const onRailScroll = () => {
      if (!railDrop) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      railDrop.style.top = (pct * 100) + "%";
    };
    window.addEventListener("scroll", onRailScroll, { passive: true });
    onRailScroll();

    /* ── nav + hero reveal ── */
    const revealTimer = setTimeout(() => {
      document.getElementById("nav")?.classList.add("show");
      document.querySelector(".prj-hero")?.classList.add("show");
    }, 100);

    /* ── scroll reveal ── */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".prj-reveal").forEach((el) => obs.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      bigEls.forEach((el) => {
        el.removeEventListener("mouseenter", onBigEnter);
        el.removeEventListener("mouseleave", onBigLeave);
      });
      darkZone?.removeEventListener("mouseenter", onDarkEnter);
      darkZone?.removeEventListener("mouseleave", onDarkLeave);
      magnetic.forEach((el) => {
        el.removeEventListener("mousemove", onMagMove);
        el.removeEventListener("mouseleave", onMagLeave);
      });
      dropBtns.forEach((el) => el.removeEventListener("mouseenter", onDropEnter));
      window.removeEventListener("scroll", onRailScroll);
      clearTimeout(revealTimer);
      obs.disconnect();
    };
  }, [slug]);

  function goTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const overlay = document.getElementById("pageTransitionOverlay");
    if (!overlay) { router.push(href); return; }
    const ox = e.clientX + "px", oy = e.clientY + "px";
    sessionStorage.setItem("pt-ox", ox);
    sessionStorage.setItem("pt-oy", oy);
    overlay.style.setProperty("--ox", ox);
    overlay.style.setProperty("--oy", oy);
    overlay.classList.add("active");
    setTimeout(() => { router.push(href); }, 680);
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <>
      <div id="cur" />
      <div id="pageTransitionOverlay" className="no-transition active" />
      <span className="pt-mark">ib.</span>
      <div className="prj-rail"><div className="prj-rail-drop" id="prjRailDrop" /></div>

      {/* NAV */}
      <nav id="nav" className="prj-navbar">
        <a href="/" className="logo" onClick={(e) => goTo(e, "/")}>ib.</a>
        <ul className="nav-r">
          <li><a href="/work" onClick={(e) => goTo(e, "/work")}>Work</a></li>
          <li><a href="/#about" onClick={(e) => goTo(e, "/#about")}>About</a></li>
          <li><a href="https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view" target="_blank" className="cta drop-btn magnetic"><span className="btn-label">My CV</span></a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="prj-hero">
        <div className="prj-hero-left">
          <a href="/work" className="prj-back drop-btn magnetic" onClick={(e) => goTo(e, "/work")}>
            <span className="btn-label"><span className="prj-back-arrow">←</span> Back to Work</span>
          </a>
          <div className="prj-hero-copy">
            <span className="prj-sector">{project.sector}</span>
            <h1 className="prj-title">{project.title}</h1>
            <div className="prj-tags">
              {project.tags.map((t) => (
                <span key={t} className="prj-tag">{t}</span>
              ))}
            </div>
            <p className="prj-quote">"{project.heroQuote}"</p>
          </div>
        </div>
        <div className="prj-hero-image work-image">
          <div className="prj-photo work-image-card" style={{ "--tilt": `${heroTilt}deg` } as React.CSSProperties}>
            <img src={project.heroImage} alt={project.title} />
          </div>
        </div>
      </section>

      {/* BRIEF */}
      <section className="prj-brief prj-reveal">
        <div className="prj-brief-text">
          <div className="prj-label">The Brief</div>
          <p className="prj-brief-body">{project.brief.text}</p>
        </div>
        <div className="prj-brief-stat">
          <div className="prj-brief-tags">
            {project.brief.tags.map((t) => (
              <span key={t} className="prj-pill">{t}</span>
            ))}
          </div>
          <p className="prj-brief-stat-value">{project.brief.stat}</p>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="prj-challenge prj-reveal">
        <div className="prj-challenge-text">
          <div className="prj-label">The Challenge</div>
          <h2 className="prj-challenge-heading">{project.challenge.heading}</h2>
          <p className="prj-challenge-body">{project.challenge.text}</p>
        </div>
        <div className="prj-stats">
          <div className="prj-stat-card">
            <p className="prj-stat-value">{project.challenge.stat1.value}</p>
            <p className="prj-stat-label">{project.challenge.stat1.label}</p>
          </div>
          <div className="prj-stat-card">
            <p className="prj-stat-value">{project.challenge.stat2.value}</p>
            <p className="prj-stat-label">{project.challenge.stat2.label}</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="prj-process">
        <div className="prj-label prj-process-label">Process</div>
        <div className="prj-process-list">
          {project.process.map((s, i) => (
            <div key={i} className="prj-process-item prj-reveal" data-delay={i * 120}>
              <div className="prj-process-left">
                <span className="prj-process-num">0{i + 1}</span>
                <h3 className="prj-process-heading">{s.heading}</h3>
              </div>
              <p className="prj-process-body">{s.body}</p>
              {i < project.process.length - 1 && <div className="prj-process-rule" />}
            </div>
          ))}
        </div>
      </section>

      {/* SCREENS */}
      <section className="prj-screens prj-reveal">
        <div className="prj-screens-image-wrap">
          <img src={project.screensImage} alt={`${project.title} screens`} className="prj-photo prj-screens-image" />
        </div>
        <div className="prj-screens-points">
          {project.screensPoints.map((p) => (
            <div key={p} className="prj-screens-point">
              <span className="prj-dot" />
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REFLECTION */}
      <section className="prj-reflection prj-reveal">
        <div className="prj-reflection-mark">"</div>
        <blockquote className="prj-reflection-text">{project.reflection}</blockquote>
        <p className="prj-reflection-author">Isa</p>
      </section>

      {/* NAV FOOTER */}
      <div className="prj-navfooter">
        <Link href={`/work/${prevProject.slug}`} className="prj-navfooter-side magnetic" onClick={(e) => goTo(e, `/work/${prevProject.slug}`)}>
          ← {prevProject.title.split(" ").slice(0, 3).join(" ")}
        </Link>
        <Link href="/work" className="prj-navfooter-home drop-btn magnetic" onClick={(e) => goTo(e, "/work")}>
          <span className="btn-label">Back to Work</span>
        </Link>
        <Link href={`/work/${nextProject.slug}`} className="prj-navfooter-side magnetic" onClick={(e) => goTo(e, `/work/${nextProject.slug}`)}>
          {nextProject.title.split(" ").slice(0, 3).join(" ")} →
        </Link>
      </div>
    </>
  );
}

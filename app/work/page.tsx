"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "./data";
import "./work.css";
import "./[slug]/project.css";

const workTilts = [-4, 3, -2, 4, -3];

export default function WorkPage() {
  const router = useRouter();

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
    bigEls.forEach(el => {
      el.addEventListener("mouseenter", onBigEnter);
      el.addEventListener("mouseleave", onBigLeave);
    });

    const photoEls = document.querySelectorAll(".work-image");
    const onPhotoEnter = () => cur.classList.add("photo");
    const onPhotoLeave = () => cur.classList.remove("photo");
    photoEls.forEach(el => {
      el.addEventListener("mouseenter", onPhotoEnter);
      el.addEventListener("mouseleave", onPhotoLeave);
    });

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
    magnetic.forEach(el => {
      el.addEventListener("mousemove", onMagMove);
      el.addEventListener("mouseleave", onMagLeave);
    });

    /* ── drop-fill buttons ── */
    const dropBtns = document.querySelectorAll<HTMLElement>(".drop-btn");
    const onDropEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--dx", (e.clientX - r.left) + "px");
      el.style.setProperty("--dy", (e.clientY - r.top) + "px");
    };
    dropBtns.forEach(el => el.addEventListener("mouseenter", onDropEnter));

    /* ── reading rail ── */
    const railDrop = document.getElementById("workRailDrop");
    const onRailScroll = () => {
      if (!railDrop) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      railDrop.style.top = (pct * 100) + "%";
    };
    window.addEventListener("scroll", onRailScroll, { passive: true });
    onRailScroll();

    /* ── nav + header reveal ── */
    const revealTimer = setTimeout(() => {
      document.getElementById("nav")?.classList.add("show");
      document.querySelectorAll(".work-page-head, .work-page-head .section-rule, .work-page-head .title-wrap")
        .forEach(el => el.classList.add("show"));
    }, 100);

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
    document.querySelectorAll(".work-row").forEach(c => obs.observe(c));

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
      bigEls.forEach(el => {
        el.removeEventListener("mouseenter", onBigEnter);
        el.removeEventListener("mouseleave", onBigLeave);
      });
      photoEls.forEach(el => {
        el.removeEventListener("mouseenter", onPhotoEnter);
        el.removeEventListener("mouseleave", onPhotoLeave);
      });
      magnetic.forEach(el => {
        el.removeEventListener("mousemove", onMagMove);
        el.removeEventListener("mouseleave", onMagLeave);
      });
      dropBtns.forEach(el => el.removeEventListener("mouseenter", onDropEnter));
      window.removeEventListener("scroll", onRailScroll);
      clearTimeout(revealTimer);
      obs.disconnect();
    };
  }, []);

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

  return (
    <>
      <div id="cur" />
      <div id="pageTransitionOverlay" className="no-transition active" />
      <span className="pt-mark">ib.</span>
      <div className="prj-rail"><div className="prj-rail-drop" id="workRailDrop" /></div>

      {/* NAV */}
      <nav id="nav">
        <a href="/" className="logo" onClick={(e) => goTo(e, "/")}>ib.</a>
        <ul className="nav-r">
          <li><a href="/work" className="active">Work</a></li>
          <li><a href="/#about" onClick={(e) => goTo(e, "/#about")}>About</a></li>
          <li><a href="https://drive.google.com/file/d/1BTYYnIWpKvz0lza_J3MkC6NBpez5lSQr/view" target="_blank" className="cta drop-btn magnetic"><span className="btn-label">My CV</span></a></li>
        </ul>
      </nav>

      <section id="work">
        <div className="work-head work-page-head">
          <span className="section-eyebrow">Portfolio</span>
          <span className="section-rule" />
          <div className="title-wrap"><h2 className="section-title reveal-title">Work</h2></div>
          <p className="work-page-subtitle">Five different problems, five different approaches. Pick one and see how it went.</p>
        </div>

        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/work/${p.slug}`}
            className={`work-row${i % 2 === 1 ? " reverse" : ""}`}
            data-delay={i * 100}
            onClick={(e) => goTo(e, `/work/${p.slug}`)}
          >
            <div className="work-text">
              <div className="work-tag-body">
                <span className="work-tag">{p.sector}</span>
                <h3 className="work-title">{p.title}</h3>
                <canvas className="case-wave" data-wave={`w${i}`} />
                <p className="work-desc">{p.teaser ?? p.heroQuote}</p>
                <span className="work-link magnetic">Read case study <span className="arrow">→</span></span>
              </div>
            </div>
            <div className="work-image magnetic">
              <div className="work-image-card" style={{ "--tilt": `${workTilts[i]}deg` } as React.CSSProperties}>
                <img src={p.heroImage} alt="" />
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* NAV FOOTER */}
      <div className="prj-navfooter">
        <span className="prj-navfooter-side" />
        <a href="/#about" className="prj-navfooter-home drop-btn magnetic" onClick={(e) => goTo(e, "/#about")}>
          <span className="btn-label">More about me</span>
        </a>
        <span className="prj-navfooter-side" />
      </div>
    </>
  );
}

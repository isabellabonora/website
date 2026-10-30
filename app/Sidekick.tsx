"use client";
import { useEffect, useId, useRef } from "react";

// Isa's sidekick: a glass drop that breathes, floats, leans toward the cursor
// and blinks. Same drawing as the home page hero, packaged for React pages.
export default function Sidekick({ size = 120 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel)!;
    const shape = q<SVGPathElement>(`#${uid}-shape`);
    const g = q<SVGGElement>(".sk-body");
    const shadow = q<SVGEllipseElement>(".sk-shadow");
    const spec = q<SVGEllipseElement>(".sk-spec");
    const dot = q<SVGEllipseElement>(".sk-dot");
    const eyes = q<SVGGElement>(".sk-eyes");
    const tints = Array.from(svg.querySelectorAll<SVGCircleElement>(".sk-tint"));

    const N = 8;
    const R = 62;
    const lean = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
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
      const float = Math.sin(t * 1.1);
      const pts = Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2;
        const wobble = 0.018 * Math.sin(t * 0.8 + i * 1.7) + 0.01 * Math.sin(t * 1.5 + i * 2.9);
        const pull = 0.05 * leanMag * Math.max(0, Math.cos(a - leanAngle));
        const r = R * (1 + wobble + pull);
        return { x: Math.cos(a) * r * (1 + float * 0.015), y: Math.sin(a) * r * (1 - float * 0.015) };
      });
      shape.setAttribute("d", toPath(pts));
      tints.forEach((c, k) => {
        const ph = t * 0.35 + k * 2.1;
        c.setAttribute("cx", (Math.cos(ph) * 26 - lean.x * 10).toFixed(2));
        c.setAttribute("cy", (Math.sin(ph * 1.3) * 24 - lean.y * 10).toFixed(2));
      });
      let lid = 1;
      if (t > blinkAt) {
        const k = (t - blinkAt) / 0.16;
        lid = k < 1 ? Math.abs(1 - 2 * k) * 0.9 + 0.1 : 1;
        if (k >= 1) blinkAt = t + 2.5 + Math.random() * 3.5;
      }
      eyes.setAttribute("transform", `translate(${(lean.x * 12).toFixed(2)} ${(lean.y * 9).toFixed(2)}) scale(1 ${lid.toFixed(3)})`);
      g.setAttribute("transform", `translate(${(lean.x * 6).toFixed(2)} ${(float * 5 + lean.y * 4).toFixed(2)})`);
      shadow.setAttribute("rx", (44 - float * 5).toFixed(2));
      shadow.setAttribute("opacity", (0.9 - float * 0.12).toFixed(2));
      spec.setAttribute("transform", `translate(${(-lean.x * 8).toFixed(2)} ${(-lean.y * 8).toFixed(2)}) rotate(-30)`);
      dot.setAttribute("transform", `translate(${(-lean.x * 10).toFixed(2)} ${(-lean.y * 10).toFixed(2)}) rotate(-30)`);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const reach = Math.max(window.innerWidth, window.innerHeight) * 0.6;
      target = { x: (e.clientX - (r.left + r.width / 2)) / reach, y: (e.clientY - (r.top + r.height / 2)) / reach };
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
  }, [uid]);

  const id = (name: string) => `${uid}-${name}`;
  return (
    <svg ref={svgRef} viewBox="-100 -100 200 200" width={size} height={size} aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <path id={id("shape")} />
        <clipPath id={id("clip")}><use href={`#${id("shape")}`} /></clipPath>
        <radialGradient id={id("glass")} cx="42%" cy="38%" r="62%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#e8f1f0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#b7cfd0" stopOpacity="0.8" />
        </radialGradient>
        <linearGradient id={id("edge")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#5d7f86" stopOpacity="0.45" />
        </linearGradient>
        <filter id={id("bs")} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id={id("bl")} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
        <filter id={id("bxl")} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="16" /></filter>
      </defs>
      <ellipse className="sk-shadow" cx="0" cy="88" rx="44" ry="6" fill="rgba(93, 127, 134, 0.22)" filter={`url(#${id("bl")})`} />
      <g className="sk-body">
        <g clipPath={`url(#${id("clip")})`}>
          <rect x="-100" y="-100" width="200" height="200" fill="#f4f7f6" />
          <g filter={`url(#${id("bxl")})`}>
            <circle className="sk-tint" r="36" fill="#a8dccf" />
            <circle className="sk-tint" r="32" fill="#cbbcf4" />
            <circle className="sk-tint" r="30" fill="#ffd2bd" />
          </g>
          <use href={`#${id("shape")}`} fill={`url(#${id("glass")})`} />
          <ellipse cx="6" cy="56" rx="30" ry="12" fill="#ffffff" opacity="0.7" filter={`url(#${id("bl")})`} />
          <ellipse className="sk-spec" cx="-24" cy="-32" rx="28" ry="15" fill="#fff" opacity="0.75" filter={`url(#${id("bs")})`} transform="rotate(-30)" />
          <ellipse className="sk-dot" cx="-30" cy="-36" rx="10" ry="3.8" fill="#fff" transform="rotate(-30)" />
        </g>
        <use href={`#${id("shape")}`} fill="none" stroke={`url(#${id("edge")})`} strokeWidth="1.6" />
        <g className="sk-eyes">
          <g transform="translate(-15 -2)">
            <ellipse rx="4.6" ry="6.4" fill="#1c2a2c" />
            <circle cx="1.4" cy="-2.2" r="1.4" fill="#fff" />
          </g>
          <g transform="translate(15 -2)">
            <ellipse rx="4.6" ry="6.4" fill="#1c2a2c" />
            <circle cx="1.4" cy="-2.2" r="1.4" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  );
}

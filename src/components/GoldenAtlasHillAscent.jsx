import React, { useMemo } from 'react';

/**
 * GoldenAtlasHillAscent
 * Atlas dorado de líneas facetadas (low-poly), sin rostro, inspirado en el logo HOMBROS:
 * sostiene sobre la cabeza una esfera azul profunda con estrellas y anillos orbitales
 * mientras sube un cerro.
 *
 *  E (ecológico)  -> deltoides y trapecios
 *  S (social)     -> brazos (bíceps, antebrazos)
 *  K (cognitivo)  -> pecho, abdomen y torso
 *  H = (E·S·K)^(1/3) -> la esfera se eleva y los brazos se extienden
 */

const CX = 450;
const R = 108;
const ground = (x) => 760 - 0.19 * x;

const f = (n) => n.toFixed(1);
const P = (x, y) => `${f(x)},${f(y)}`;
const pts = (...a) => a.map(([x, y]) => P(x, y)).join(' ');

// Miembro facetado: 6 vértices (hombro+, bulto+, codo+, codo-, bulto-, hombro-)
function limbGeom(a, b, w0, wm, w1, t = 0.45) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const m = [a[0] + dx * t, a[1] + dy * t];
  const off = (p, w, s) => [p[0] + nx * w * s, p[1] + ny * w * s];
  return {
    a, b, m,
    a1: off(a, w0, 1), m1: off(m, wm, 1), b1: off(b, w1, 1),
    b2: off(b, w1, -1), m2: off(m, wm, -1), a2: off(a, w0, -1),
  };
}

function Limb({ g, sw, o = 0.3 }) {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <polygon points={pts(g.a1, g.m1, g.b1, g.b2, g.m2, g.a2)} fill="url(#goldFill)" fillOpacity={o + 0.35} stroke="url(#goldV)" strokeWidth={sw} />
      {/* triangulación */}
      <polyline points={pts(g.a1, g.m2, g.b2)} fill="none" stroke="#FFE9A0" strokeOpacity="0.55" strokeWidth={sw * 0.5} />
      <polyline points={pts(g.a2, g.m1, g.b1)} fill="none" stroke="#FFE9A0" strokeOpacity="0.4" strokeWidth={sw * 0.5} />
      <polyline points={pts(g.a, g.m, g.b)} fill="none" stroke="#FFF4CC" strokeOpacity="0.5" strokeWidth={sw * 0.45} />
    </g>
  );
}

function Facet({ points, sw, o = 0.35 }) {
  return (
    <polygon points={points} fill="url(#goldFill)" fillOpacity={o} stroke="url(#goldV)" strokeWidth={sw} strokeLinejoin="round" />
  );
}

const star4 = (s) =>
  `M0 ${-s} Q ${s * 0.14} ${-s * 0.14} ${s} 0 Q ${s * 0.14} ${s * 0.14} 0 ${s} Q ${-s * 0.14} ${s * 0.14} ${-s} 0 Q ${-s * 0.14} ${-s * 0.14} 0 ${-s} Z`;

function Branch({ scale, flip, x, y }) {
  const P0 = [0, 90], P1 = [-34, 20], P2 = [-6, -78];
  const bez = (t) => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
  ];
  const tan = (t) => [
    2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]),
    2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]),
  ];
  const leaves = [0.12, 0.28, 0.44, 0.6, 0.76, 0.92].flatMap((t, i) => {
    const [px, py] = bez(t);
    const [tx, ty] = tan(t);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    return [-1, 1].map((s) => (
      <ellipse key={`${i}${s}`} cx={px} cy={py} rx="3.6" ry="11"
        transform={`rotate(${ang + 90 + s * 52} ${px} ${py}) translate(0 -9)`}
        fill={s > 0 ? '#F2C94C' : '#7DB2B2'} fillOpacity="0.9" />
    ));
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip * scale} ${scale})`}>
      <path d={`M${P0} Q${P1} ${P2}`} fill="none" stroke="#C9A24A" strokeWidth="2.2" />
      {leaves}
    </g>
  );
}

export default function GoldenAtlasHillAscent({ E = 0.7, S = 0.65, K = 0.68, className = '' }) {
  const e = Math.max(0.1, Math.min(1, E));
  const s = Math.max(0.1, Math.min(1, S));
  const k = Math.max(0.1, Math.min(1, K));
  const H = Math.cbrt(e * s * k);
  const avg = (e + s + k) / 3;
  const sw = 2 + 1.6 * avg; // grosor de línea

  // --- Esfera ---
  const sy = 300 - 100 * H;
  const sr = R + 8 * avg;

  // --- Medidas musculares ---
  const c = 54 + 24 * k;          // semiancho de pecho
  const w = 28 + 9 * k;           // semiancho de cintura
  const dr = 15 + 14 * e;         // radio del deltoides
  const shY = 364;
  const shX = c + 8;             // hombro respecto al centro

  const Lsh = [CX - shX, shY];
  const Rsh = [CX + shX, shY];

  // Manos: bajo los flancos de la esfera
  const hx = sr * 0.9;
  const hy = sy + sr * 0.5;
  const Lh = [CX - hx, hy];
  const Rh = [CX + hx, hy];

  // Codos (se abren y bajan cuando H es bajo)
  const slack = 1 - H;
  const elbow = (sh, hand, dir) => [
    (sh[0] + hand[0]) / 2 + dir * (16 + slack * 52),
    (sh[1] + hand[1]) / 2 + slack * 46,
  ];
  const Le = elbow(Lsh, Lh, -1);
  const Re = elbow(Rsh, Rh, 1);

  const uArm = (sh, el) => limbGeom(sh, el, dr * 0.95, 12 + 15 * s, 9 + 4 * s, 0.4);
  const fArm = (el, h) => limbGeom(el, h, 10 + 5 * s, 10 + 9 * s, 7.5, 0.35);
  const LU = uArm(Lsh, Le), RU = uArm(Rsh, Re);
  const LF = fArm(Le, Lh), RF = fArm(Re, Rh);

  // Piernas (escalando: izquierda abajo, derecha en paso alto)
  const hipY = 528;
  const LHip = [CX - 20, hipY], RHip = [CX + 20, hipY];
  const LKnee = [CX - 52, 610], RKnee = [CX + 64, 596];
  const LFoot = [CX - 62, ground(CX - 62) - 14];
  const RFoot = [CX + 72, ground(CX + 72) - 14];
  const thigh = (h, kn) => limbGeom(h, kn, 22 + 7 * avg, 19 + 11 * avg, 12, 0.4);
  const shin = (kn, ft) => limbGeom(kn, ft, 12, 12 + 6 * avg, 7, 0.3);
  const LT = thigh(LHip, LKnee), RT = thigh(RHip, RKnee);
  const LS = shin(LKnee, LFoot), RS = shin(RKnee, RFoot);
  const foot = ([x, y]) => pts([x - 9, y - 4], [x + 8, y - 6], [x + 34, y + 10], [x + 30, y + 14], [x - 14, y + 14]);

  // Torso
  const pecB = 420 + 10 * k;
  const aw = w * 0.62;

  // Cabeza facetada sin rostro
  const hc = [CX, 290];
  const headPts = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return [hc[0] + Math.cos(a) * 19, hc[1] + Math.sin(a) * 25];
  });

  const innerStars = useMemo(() => [
    [-46, -38, 6], [38, -48, 7], [-22, 14, 5], [52, 20, 6], [-60, 40, 4],
    [12, -18, 9], [66, -14, 4], [-28, -64, 4], [6, 46, 5], [-70, -8, 3.5],
    [32, 58, 3.5], [-42, 62, 3], [0, 0, 8],
  ], []);

  const leafScale = 0.55 + 0.6 * e;
  const lift = Math.max(0, (H - 0.55) / 0.45);

  const mirror = (fn) => (
    <>
      {fn(-1)}
      {fn(1)}
    </>
  );

  return (
    <div className={`relative w-full max-w-5xl mx-auto select-none ${className}`}>
      <svg viewBox="0 0 900 800" className="w-full h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldV" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="700">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#F2C94C" />
            <stop offset="100%" stopColor="#B77F12" />
          </linearGradient>
          <linearGradient id="goldFill" gradientUnits="userSpaceOnUse" x1="300" y1="200" x2="600" y2="700">
            <stop offset="0%" stopColor="#FFE9A0" />
            <stop offset="50%" stopColor="#D9A22A" />
            <stop offset="100%" stopColor="#6B4410" />
          </linearGradient>
          <radialGradient id="sphereGrad" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#27489A" />
            <stop offset="40%" stopColor="#12275B" />
            <stop offset="80%" stopColor="#0A1332" />
            <stop offset="100%" stopColor="#050918" />
          </radialGradient>
          <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#4C8DFF" stopOpacity={0.25 + 0.3 * H} />
            <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3345" />
            <stop offset="100%" stopColor="#0A1119" />
          </linearGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="flare" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ================= CERRO ================= */}
        <polygon points={`0,800 0,${ground(0)} 900,${ground(900)} 900,800`} fill="url(#hillGrad)" />
        {[28, 70, 112, 160].map((d, i) => (
          <path key={i} d={`M0 ${ground(0) + d} L900 ${ground(900) + d}`} stroke="#D4A373" strokeOpacity={0.28 - i * 0.04} strokeWidth="1.2" strokeDasharray={i % 2 ? '2 7' : '8 6'} />
        ))}
        <path d={`M-10 ${ground(-10)} L910 ${ground(910)}`} stroke="url(#goldV)" strokeWidth="3" filter="url(#glow)" />
        {/* Rocas de apoyo */}
        <polygon points={pts([LFoot[0] - 26, ground(LFoot[0]) + 14], [LFoot[0] - 6, ground(LFoot[0]) - 2], [LFoot[0] + 48, ground(LFoot[0]) + 4], [LFoot[0] + 40, ground(LFoot[0]) + 22])} fill="#17283A" stroke="#D4A373" strokeOpacity="0.8" />
        <polygon points={pts([RFoot[0] - 22, ground(RFoot[0]) + 14], [RFoot[0] - 2, ground(RFoot[0]) - 3], [RFoot[0] + 52, ground(RFoot[0]) + 2], [RFoot[0] + 42, ground(RFoot[0]) + 22])} fill="#17283A" stroke="#F2C94C" strokeOpacity="0.9" />
        {/* Cumbre */}
        <g transform={`translate(830 ${ground(830) - 24})`}>
          <path d={star4(14)} fill="#7DB2B2" filter="url(#flare)" />
        </g>

        {/* ================= ESFERA ================= */}
        <g>
          <circle cx={CX} cy={sy} r={sr + 36} fill="url(#auraGrad)" />
          <Branch scale={leafScale} flip={1} x={CX - sr - 26} y={sy + 6} />
          <Branch scale={leafScale} flip={-1} x={CX + sr + 26} y={sy + 6} />
          <circle cx={CX} cy={sy} r={sr} fill="url(#sphereGrad)" stroke="url(#goldV)" strokeWidth={2 + avg} filter="url(#glow)" />
          <circle cx={CX} cy={sy} r={sr - 3} fill="none" stroke="#6CB4FF" strokeOpacity={0.3 + 0.4 * H} strokeWidth="1.2" />
          {innerStars.map(([dx, dy, r], i) => (
            <g key={i} transform={`translate(${CX + (dx * sr) / 100} ${sy + (dy * sr) / 100})`}>
              <path d={star4(r * (1 + 0.4 * H))} fill="#fff" filter={r > 5 ? 'url(#flare)' : undefined} opacity={0.75 + 0.25 * H} />
            </g>
          ))}
          {[[-26, 1.38, 0.34, '#FFF4CC'], [32, 1.34, 0.32, '#F2C94C']].map(([rot, rx, ry, col], i) => (
            <ellipse key={i} cx={CX} cy={sy} rx={sr * rx} ry={sr * ry} fill="none" stroke={col} strokeWidth={2.2 + 0.6 * avg} transform={`rotate(${rot} ${CX} ${sy})`} filter="url(#glow)" />
          ))}
          {/* Corona de tres estrellas */}
          <g transform={`translate(${CX} ${sy - sr - 42 - 8 * H})`}><path d={star4(20)} fill="#F2C94C" filter="url(#flare)" /></g>
          <g transform={`translate(${CX - 64} ${sy - sr - 22 - 6 * H})`}><path d={star4(11)} fill="#F2C94C" filter="url(#flare)" /></g>
          <g transform={`translate(${CX + 64} ${sy - sr - 22 - 6 * H})`}><path d={star4(11)} fill="#F2C94C" filter="url(#flare)" /></g>
        </g>

        {/* ================= ATLAS DORADO ================= */}
        <g transform={`rotate(-3 ${CX} 690)`} filter="url(#glow)">
          {/* Pierna trasera (abajo del cerro) */}
          <Limb g={LS} sw={sw} o={0.15} />
          <Limb g={LT} sw={sw} o={0.2} />
          <polygon points={foot(LFoot)} fill="url(#goldFill)" fillOpacity="0.6" stroke="url(#goldV)" strokeWidth={sw} strokeLinejoin="round" />
          {/* Pierna delantera (paso alto) */}
          <Limb g={RS} sw={sw} o={0.3} />
          <Limb g={RT} sw={sw} o={0.3} />
          <polygon points={foot(RFoot)} fill="url(#goldFill)" fillOpacity="0.7" stroke="url(#goldV)" strokeWidth={sw} strokeLinejoin="round" />
          {/* Rótulas */}
          <polygon points={pts([LKnee[0] - 9, LKnee[1] - 2], [LKnee[0], LKnee[1] - 10], [LKnee[0] + 9, LKnee[1] - 2], [LKnee[0], LKnee[1] + 8])} fill="#FFE9A0" fillOpacity="0.4" stroke="#FFE9A0" strokeWidth="1" />
          <polygon points={pts([RKnee[0] - 9, RKnee[1] - 2], [RKnee[0], RKnee[1] - 10], [RKnee[0] + 9, RKnee[1] - 2], [RKnee[0], RKnee[1] + 8])} fill="#FFE9A0" fillOpacity="0.4" stroke="#FFE9A0" strokeWidth="1" />

          {/* Torso en V */}
          <Facet
            points={pts([CX - c - 4, 372], [CX + c + 4, 372], [CX + w + 2, 462], [CX + w + 8, hipY + 4], [CX - w - 8, hipY + 4], [CX - w - 2, 462])}
            sw={sw} o={0.28}
          />
          {/* Pectorales */}
          {mirror((d) => (
            <Facet
              key={d}
              points={pts([CX, 372], [CX + d * (c + 2), 378], [CX + d * (c * 0.82), pecB - 8], [CX + d * (c * 0.4), pecB + 4], [CX + d * 3, pecB - 4])}
              sw={sw * 0.85} o={0.5}
            />
          ))}
          <line x1={CX} y1="370" x2={CX} y2={hipY} stroke="#FFF4CC" strokeOpacity="0.6" strokeWidth={sw * 0.5} />
          {/* Abdominales */}
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>{mirror((d) => (
              <polygon key={`${i}${d}`}
                points={pts([CX + d * 2.5, 436 + i * 25], [CX + d * aw, 438 + i * 25], [CX + d * (aw - 1), 456 + i * 25], [CX + d * 2.5, 456 + i * 25])}
                fill="url(#goldFill)" fillOpacity={0.3 + 0.35 * k} stroke="#FFE9A0" strokeOpacity="0.8" strokeWidth="1.3" strokeLinejoin="round" />
            ))}</React.Fragment>
          ))}
          {/* Oblicuos */}
          {mirror((d) => (
            <polyline key={d} points={pts([CX + d * (aw + 5), 440], [CX + d * (w - 2), 480], [CX + d * (w + 4), hipY - 6])} fill="none" stroke="#FFE9A0" strokeOpacity="0.55" strokeWidth="1.3" />
          ))}
          {/* Pelvis en V */}
          <polyline points={pts([CX - w - 6, hipY - 6], [CX, hipY + 16], [CX + w + 6, hipY - 6])} fill="none" stroke="url(#goldV)" strokeWidth={sw * 0.9} strokeLinejoin="round" />

          {/* Trapecios y cuello */}
          {mirror((d) => (
            <Facet key={d} points={pts([CX + d * 8, 322], [CX + d * (c + 14 + 6 * e), shY - 4], [CX + d * (c - 2), 376], [CX + d * 6, 352])} sw={sw * 0.85} o={0.45} />
          ))}
          <Facet points={pts([CX - 11, 310], [CX + 11, 310], [CX + 15, 352], [CX - 15, 352])} sw={sw * 0.85} o={0.35} />

          {/* Cabeza sin rostro */}
          <polygon points={headPts.map(([x, y]) => P(x, y)).join(' ')} fill="url(#goldFill)" fillOpacity="0.5" stroke="url(#goldV)" strokeWidth={sw} strokeLinejoin="round" />
          {headPts.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
            <line key={i} x1={hc[0]} y1={hc[1] - 4} x2={x} y2={y} stroke="#FFF4CC" strokeOpacity="0.35" strokeWidth="1" />
          ))}

          {/* Brazos */}
          {[[LU, LF, -1], [RU, RF, 1]].map(([u, fa, d]) => (
            <g key={d}>
              <Limb g={u} sw={sw} o={0.28} />
              <Limb g={fa} sw={sw} o={0.28} />
              {/* Codo */}
              <polygon points={pts([u.b[0] - 6, u.b[1]], [u.b[0], u.b[1] - 7], [u.b[0] + 6, u.b[1]], [u.b[0], u.b[1] + 6])} fill="#FFE9A0" fillOpacity="0.5" stroke="#FFE9A0" strokeWidth="1" />
            </g>
          ))}

          {/* Deltoides (hexágonos facetados) */}
          {[[Lsh, -1], [Rsh, 1]].map(([p, d]) => {
            const cxp = p[0] + d * 3;
            const cyp = p[1] + 2;
            const ring = Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return [cxp + Math.cos(a) * dr * 1.05, cyp + Math.sin(a) * dr];
            });
            return (
              <g key={d} strokeLinejoin="round">
                <polygon points={ring.map(([x, y]) => P(x, y)).join(' ')} fill="url(#goldFill)" fillOpacity={0.55 + 0.25 * e} stroke="url(#goldV)" strokeWidth={sw} />
                {ring.map(([x, y], i) => (
                  <line key={i} x1={cxp} y1={cyp} x2={x} y2={y} stroke="#FFF4CC" strokeOpacity="0.35" strokeWidth="1" />
                ))}
              </g>
            );
          })}

          {/* Manos que sostienen la esfera */}
          {[[Lh, -1], [Rh, 1]].map(([p, d]) => (
            <g key={d} strokeLinejoin="round" strokeLinecap="round">
              <polygon points={pts([p[0] - 9, p[1] + 8], [p[0] - 8, p[1] - 9], [p[0] + 6, p[1] - 13], [p[0] + 11, p[1] + 2], [p[0] + 3, p[1] + 12])} fill="#FFE9A0" fillOpacity="0.75" stroke="url(#goldV)" strokeWidth={sw * 0.9} />
              <path d={`M${p[0] - d * 2} ${p[1] - 12} q ${d * -8} -12 ${d * -16} -6 M${p[0] + d * 3} ${p[1] - 12} q ${d * -4} -13 ${d * -14} -12`} fill="none" stroke="#FFF4CC" strokeWidth="2" />
            </g>
          ))}
        </g>

        {/* Rayos de elevación */}
        {lift > 0 && (
          <g opacity={lift * 0.8} stroke="#F2C94C" strokeWidth="1.3" strokeDasharray="3 5" filter="url(#glow)">
            <line x1={Lsh[0]} y1={Lsh[1] - 20} x2={CX - sr * 0.5} y2={sy + sr * 0.9} />
            <line x1={Rsh[0]} y1={Rsh[1] - 20} x2={CX + sr * 0.5} y2={sy + sr * 0.9} />
          </g>
        )}
      </svg>
    </div>
  );
}

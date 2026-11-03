import React, { useMemo } from 'react';

/**
 * GoldenAtlasHillAscent — Edición "Olympian Titan / Zeus Quality"
 *
 * Anatomía escultórica volumétrica inspirada en el físico heroico de Zeus (God of War)
 * fusionada con la identidad dorada sin rostro y la esfera cósmica de HOMBROS:
 *  - Cinemática inversa (2-bone IK) real para hombros, codos, muñecas y rodillas.
 *  - Músculos orgánicos con curvas de Bézier cúbicas, sombreado volumétrico 3D
 *    (oclusión ambiental, bronce dorado difuso, lóbulos especulares y luz de borde).
 *  - Brazaletes olímpicos dorados en los antebrazos y faldellín griego (quitón)
 *    con pliegues 3D y greca clásica dorada.
 *  - Dinámica de pendiente acoplada a Entropía (1 - H) vs. Sintropía (H).
 */

const CX = 450;
const R = 108;
const f = (n) => n.toFixed(1);

// Resolución de cinemática inversa de 2 huesos (hombro -> codo -> mano)
function solveIK(A, B, L1, L2, side) {
  const dx = B[0] - A[0];
  const dy = B[1] - A[1];
  const dist = Math.hypot(dx, dy) || 1;
  const maxReach = L1 + L2 - 2;
  const d = Math.min(dist, maxReach);
  const ux = dx / dist;
  const uy = dy / dist;
  // Normal exterior (side = -1 izquierda, +1 derecha)
  const nx = side === -1 ? uy : -uy;
  const ny = side === -1 ? -ux : ux;
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  return [A[0] + ux * a + nx * h, A[1] + uy * a + ny * h];
}

// Genera un músculo orgánico volumétrico entre dos articulaciones A y B usando curvas Bézier
function buildOrganicLimb(A, B, wStart, wMid1, wMid2, wEnd, bulgeT1 = 0.38, bulgeT2 = 0.48) {
  const dx = B[0] - A[0];
  const dy = B[1] - A[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;

  const pt = (t, w) => [A[0] + dx * t + nx * w, A[1] + dy * t + ny * w];

  const s1 = pt(0, wStart);
  const s2 = pt(0, -wStart);
  const c1a = pt(bulgeT1 * 0.5, wMid1 * 1.08);
  const c1b = pt(bulgeT1 + (1 - bulgeT1) * 0.45, wMid1 * 0.95);
  const e1 = pt(1, wEnd);

  const e2 = pt(1, -wEnd);
  const c2b = pt(bulgeT2 + (1 - bulgeT2) * 0.45, -wMid2 * 0.95);
  const c2a = pt(bulgeT2 * 0.5, -wMid2 * 1.08);

  const outline = `M ${f(s1[0])} ${f(s1[1])} C ${f(c1a[0])} ${f(c1a[1])}, ${f(c1b[0])} ${f(c1b[1])}, ${f(e1[0])} ${f(e1[1])} L ${f(e2[0])} ${f(e2[1])} C ${f(c2b[0])} ${f(c2b[1])}, ${f(c2a[0])} ${f(c2a[1])}, ${f(s2[0])} ${f(s2[1])} Z`;

  // Lóbulo especular interno para dar volumen 3D de videojuego
  const hStart = pt(0.14, wStart * 0.25);
  const hC1 = pt(bulgeT1, wMid1 * 0.62);
  const hC2 = pt(0.72, wMid1 * 0.38);
  const hEnd = pt(0.86, wEnd * 0.15);
  const hBack1 = pt(0.68, -wMid2 * 0.12);
  const hBack2 = pt(0.32, -wMid2 * 0.18);
  const highlight = `M ${f(hStart[0])} ${f(hStart[1])} C ${f(hC1[0])} ${f(hC1[1])}, ${f(hC2[0])} ${f(hC2[1])}, ${f(hEnd[0])} ${f(hEnd[1])} C ${f(hBack1[0])} ${f(hBack1[1])}, ${f(hBack2[0])} ${f(hBack2[1])}, ${f(hStart[0])} ${f(hStart[1])} Z`;

  // Surco anatómico de separación muscular
  const gStart = pt(0.12, 0);
  const gMid = pt(0.5, (wMid1 - wMid2) * 0.18);
  const gEnd = pt(0.88, 0);
  const groove = `M ${f(gStart[0])} ${f(gStart[1])} Q ${f(gMid[0])} ${f(gMid[1])} ${f(gEnd[0])} ${f(gEnd[1])}`;

  return { outline, highlight, groove, ux, uy, nx, ny, len, pt };
}

function VolumetricLimb({ g, sw = 2 }) {
  return (
    <g>
      {/* Sombra base profunda */}
      <path d={g.outline} fill="url(#zeusShadow)" stroke="#2A1704" strokeWidth={sw + 1.8} strokeLinejoin="round" />
      {/* Volumen muscular bronce-oro */}
      <path d={g.outline} fill="url(#zeusMuscle)" stroke="url(#goldRim)" strokeWidth={sw * 0.85} strokeLinejoin="round" />
      {/* Lóbulo de luz especular 3D */}
      <path d={g.highlight} fill="url(#zeusSpec)" opacity="0.78" />
      {/* Surco anatómico */}
      <path d={g.groove} fill="none" stroke="#3A2006" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
      <path d={g.groove} fill="none" stroke="#FFE9A6" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
    </g>
  );
}

// Brazalete Olímpico Dorado (estilo Zeus God of War)
function OlympianBracer({ elbow, hand, rWrist, rForearm }) {
  const dx = hand[0] - elbow[0];
  const dy = hand[1] - elbow[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  const band = (t0, t1, r0, r1) => {
    const p0a = [elbow[0] + dx * t0 + nx * r0, elbow[1] + dy * t0 + ny * r0];
    const p0b = [elbow[0] + dx * t0 - nx * r0, elbow[1] + dy * t0 - ny * r0];
    const p1a = [elbow[0] + dx * t1 + nx * r1, elbow[1] + dy * t1 + ny * r1];
    const p1b = [elbow[0] + dx * t1 - nx * r1, elbow[1] + dy * t1 - ny * r1];
    const mid0 = [elbow[0] + dx * t0 + (dx / len) * 4, elbow[1] + dy * t0 + (dy / len) * 4];
    const mid1 = [elbow[0] + dx * t1 + (dx / len) * 4, elbow[1] + dy * t1 + (dy / len) * 4];
    return {
      path: `M ${f(p0a[0])} ${f(p0a[1])} Q ${f(mid0[0])} ${f(mid0[1])} ${f(p0b[0])} ${f(p0b[1])} L ${f(p1b[0])} ${f(p1b[1])} Q ${f(mid1[0])} ${f(mid1[1])} ${f(p1a[0])} ${f(p1a[1])} Z`,
      ring: `M ${f(p0a[0])} ${f(p0a[1])} Q ${f(mid0[0])} ${f(mid0[1])} ${f(p0b[0])} ${f(p0b[1])}`,
    };
  };

  const bMain = band(0.58, 0.94, rForearm * 1.08, rWrist * 1.12);
  const rings = [0.62, 0.72, 0.82, 0.91].map((t, idx) => {
    const r = rForearm * (1 - (t - 0.58) * 0.4) * 1.1;
    return band(t, t + 0.03, r, r * 0.98).ring;
  });

  return (
    <g>
      <path d={bMain.path} fill="url(#bracerGold)" stroke="#2A1602" strokeWidth="2.2" />
      {rings.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#3A1F04" strokeWidth="3.2" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#FFF4C2" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </g>
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
      <ellipse
        key={`${i}${s}`}
        cx={px}
        cy={py}
        rx="3.8"
        ry="11.5"
        transform={`rotate(${ang + 90 + s * 52} ${px} ${py}) translate(0 -9)`}
        fill={s > 0 ? '#F2C94C' : '#7DB2B2'}
        fillOpacity="0.92"
      />
    ));
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${flip * scale} ${scale})`}>
      <path d={`M${P0} Q${P1} ${P2}`} fill="none" stroke="#C9A24A" strokeWidth="2.4" />
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
  const sw = 1.6 + 1.1 * avg;

  // --- Entropía / sintropía en la pendiente del cerro ---
  const entropy = 1 - H;
  const m = 0.07 + 0.2 * entropy;
  const ground = (x) => 678 - m * (x - CX);
  const ridgeCol = entropy > 0.5 ? '#E0745A' : '#F2C94C';
  const nRocks = Math.round((9 * Math.max(0, entropy - 0.15)) / 0.85);
  const nSprouts = Math.round((11 * Math.max(0, H - 0.35)) / 0.65);
  const tilt = -Math.atan(m) * (180 / Math.PI) * 0.32;

  // --- Esfera Cósmica ---
  const sy = 290 - 96 * H;
  const sr = R + 10 * avg;

  // --- Proporciones Anatómicas de Titán Olímpico (estilo Zeus) ---
  const chestW = 58 + 26 * k + 8 * e;     // Semiancho torácico / dorsal
  const waistW = 33 + 8 * k;              // Cintura atlética estrecha
  const hipW = 38 + 7 * k;                // Cadera
  const deltR = 24 + 18 * e;              // Radio del deltoides (hombro)
  const bicepPeak = 18 + 16 * s;          // Pico de bíceps
  const tricepSweep = 16 + 14 * s;        // Curva exterior del tríceps
  const forearmBulk = 14 + 12 * s;        // Grosor braquiorradial

  const shY = 362;
  const shX = chestW + 6;
  const Lsh = [CX - shX, shY];
  const Rsh = [CX + shX, shY];

  // Manos acunando la esfera
  const hx = sr * 0.85;
  const hy = sy + sr * 0.5;
  const Lh = [CX - hx, hy];
  const Rh = [CX + hx, hy];

  // Codos por cinemática inversa de 2 huesos
  const L1 = 88 + 6 * s;
  const L2 = 86 + 4 * s;
  const Le = solveIK(Lsh, Lh, L1, L2, -1);
  const Re = solveIK(Rsh, Rh, L1, L2, 1);

  // Geometría orgánica de brazos (bíceps interior, tríceps exterior)
  const LU = buildOrganicLimb(Lsh, Le, deltR * 0.62, tricepSweep, bicepPeak, 13 + 4 * s, 0.45, 0.52);
  const RU = buildOrganicLimb(Rsh, Re, deltR * 0.62, bicepPeak, tricepSweep, 13 + 4 * s, 0.52, 0.45);
  const LF = buildOrganicLimb(Le, Lh, 13 + 4 * s, forearmBulk, forearmBulk * 0.88, 9.5, 0.32, 0.36);
  const RF = buildOrganicLimb(Re, Rh, 13 + 4 * s, forearmBulk * 0.88, forearmBulk, 9.5, 0.36, 0.32);

  // Piernas musculosas en ascenso
  const hipY = 515;
  const LHip = [CX - hipW * 0.58, hipY + 8];
  const RHip = [CX + hipW * 0.58, hipY + 4];
  const LKnee = [CX - 54, 608];
  const RKnee = [CX + 62, 592];
  const LFoot = [CX - 66, ground(CX - 66) - 12];
  const RFoot = [CX + 74, ground(CX + 74) - 12];

  const quadSweep = 24 + 12 * avg;
  const calfBulk = 15 + 8 * avg;
  const LT = buildOrganicLimb(LHip, LKnee, 24 + 8 * avg, quadSweep, quadSweep * 0.85, 14, 0.42, 0.55);
  const RT = buildOrganicLimb(RHip, RKnee, 24 + 8 * avg, quadSweep * 0.85, quadSweep, 14, 0.55, 0.42);
  const LS = buildOrganicLimb(LKnee, LFoot, 13, calfBulk, calfBulk * 0.82, 8.5, 0.32, 0.38);
  const RS = buildOrganicLimb(RKnee, RFoot, 13, calfBulk * 0.82, calfBulk, 8.5, 0.38, 0.32);

  const pecBottom = 418 + 10 * k;

  const innerStars = useMemo(
    () => [
      [-46, -38, 6], [38, -48, 7], [-22, 14, 5], [52, 20, 6], [-60, 40, 4],
      [12, -18, 9], [66, -14, 4], [-28, -64, 4], [6, 46, 5], [-70, -8, 3.5],
      [32, 58, 3.5], [-42, 62, 3], [0, 0, 8],
    ],
    []
  );

  const leafScale = 0.55 + 0.6 * e;
  const lift = Math.max(0, (H - 0.55) / 0.45);

  return (
    <div className={`relative w-full max-w-5xl mx-auto select-none ${className}`}>
      <svg viewBox="0 0 900 800" className="w-full h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Sombreado Volumétrico Tipo Zeus / God of War */}
          <linearGradient id="zeusMuscle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE89E" />
            <stop offset="28%" stopColor="#DCA234" />
            <stop offset="68%" stopColor="#8F5B14" />
            <stop offset="100%" stopColor="#422505" />
          </linearGradient>

          <radialGradient id="zeusChestL" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="35%" stopColor="#E5AD3B" />
            <stop offset="75%" stopColor="#8C5812" />
            <stop offset="100%" stopColor="#3B2004" />
          </radialGradient>

          <radialGradient id="zeusChestR" cx="62%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="35%" stopColor="#E5AD3B" />
            <stop offset="75%" stopColor="#8C5812" />
            <stop offset="100%" stopColor="#3B2004" />
          </radialGradient>

          <radialGradient id="zeusDelt" cx="45%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="30%" stopColor="#F0BC46" />
            <stop offset="70%" stopColor="#9A6215" />
            <stop offset="100%" stopColor="#3D2105" />
          </radialGradient>

          <linearGradient id="zeusSpec" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF2" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFE58F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D49419" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="zeusShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B2206" />
            <stop offset="100%" stopColor="#170C02" />
          </linearGradient>

          <linearGradient id="goldRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="50%" stopColor="#F2C94C" />
            <stop offset="100%" stopColor="#8C5A0E" />
          </linearGradient>

          <linearGradient id="bracerGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#593808" />
            <stop offset="30%" stopColor="#F5CA4E" />
            <stop offset="50%" stopColor="#FFF8D6" />
            <stop offset="75%" stopColor="#C98A1E" />
            <stop offset="100%" stopColor="#422604" />
          </linearGradient>

          {/* Quitón / Faldellín Olímpico Blanco Marfil con Sombras de Pliegues */}
          <linearGradient id="chitonCloth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7F5F0" />
            <stop offset="45%" stopColor="#D8D4CA" />
            <stop offset="80%" stopColor="#9E9B95" />
            <stop offset="100%" stopColor="#696866" />
          </linearGradient>

          <linearGradient id="goldV" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="700">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#F2C94C" />
            <stop offset="100%" stopColor="#B77F12" />
          </linearGradient>

          <radialGradient id="sphereGrad" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#27489A" />
            <stop offset="40%" stopColor="#12275B" />
            <stop offset="80%" stopColor="#0A1332" />
            <stop offset="100%" stopColor="#050918" />
          </radialGradient>

          <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#4C8DFF" stopOpacity={0.28 + 0.32 * H} />
            <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#23374B" />
            <stop offset="45%" stopColor="#152230" />
            <stop offset="100%" stopColor="#090F16" />
          </linearGradient>

          <radialGradient id="olympusCloud" cx="50%" cy="20%" r="65%">
            <stop offset="0%" stopColor="#3B526B" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#1B2838" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0B1522" stopOpacity="0" />
          </radialGradient>

          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="flare" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="titanDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* ================= ATMÓSFERA OLÍMPICA DE FONDO ================= */}
        <ellipse cx="450" cy="210" rx="430" ry="190" fill="url(#olympusCloud)" />
        <path
          d="M 40 240 Q 220 190 420 220 T 860 195"
          fill="none"
          stroke="#4F6D8C"
          strokeOpacity="0.18"
          strokeWidth="28"
          strokeLinecap="round"
        />

        {/* ================= CERRO / MONTE OLIMPO ================= */}
        <polygon points={`0,800 0,${ground(0)} 900,${ground(900)} 900,800`} fill="url(#hillGrad)" />
        <polygon
          points={`0,800 0,${ground(0)} 900,${ground(900)} 900,800`}
          fill={entropy > 0.5 ? '#C86D51' : '#7DB2B2'}
          fillOpacity={Math.abs(H - 0.5) * 0.22}
        />
        {/* Facetas rocosas 3D en la ladera */}
        <polygon
          points={`120,${ground(120) + 18} 290,${ground(290) + 8} 340,800 80,800`}
          fill="#0E1822"
          opacity="0.55"
        />
        <polygon
          points={`520,${ground(520) + 12} 740,${ground(740) + 6} 820,800 490,800`}
          fill="#0E1822"
          opacity="0.5"
        />
        {[28, 70, 112, 160].map((d, i) => (
          <path
            key={i}
            d={`M0 ${ground(0) + d} L900 ${ground(900) + d}`}
            stroke="#D4A373"
            strokeOpacity={0.28 - i * 0.04}
            strokeWidth="1.2"
            strokeDasharray={i % 2 ? '2 7' : '8 6'}
          />
        ))}
        <path
          d={`M-10 ${ground(-10)} L910 ${ground(910)}`}
          stroke={entropy > 0.5 ? ridgeCol : 'url(#goldV)'}
          strokeWidth="3.5"
          filter="url(#glow)"
        />

        {/* Entropía: rocas que se desprenden y ruedan cuesta abajo */}
        {Array.from({ length: nRocks }, (_, i) => {
          const x0 = 560 + ((i * 97) % 300);
          const y0 = ground(x0) - 4;
          const dur = 3 + (i % 4) * 0.7;
          return (
            <g key={`r${i}`} opacity="0.9">
              <polygon
                points="-6,-2 0,-7 7,-1 4,6 -5,5"
                fill="#3A2F2C"
                stroke="#E0745A"
                strokeWidth="1.2"
                transform={`translate(${x0} ${y0})`}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  additive="replace"
                  values={`${x0} ${y0};${x0 - 170} ${y0 + 170 * m}`}
                  dur={`${dur}s`}
                  begin={`${-i * 0.6}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${dur}s`}
                  begin={`${-i * 0.6}s`}
                  repeatCount="indefinite"
                />
              </polygon>
            </g>
          );
        })}

        {/* Sintropía: brotes dorados y verdes que crecen sobre el sendero */}
        {Array.from({ length: nSprouts }, (_, i) => {
          const x = 520 + i * 32;
          const y = ground(x);
          const h = 10 + 10 * H + (i % 3) * 3;
          return (
            <g key={`s${i}`} transform={`translate(${x} ${y})`}>
              <path d={`M0 0 Q ${i % 2 ? 3 : -3} ${-h / 2} 0 ${-h}`} stroke="#7DB2B2" strokeWidth="1.8" fill="none" />
              <ellipse cx={-4} cy={-h * 0.65} rx="2.5" ry="5.2" transform={`rotate(-40 -4 ${-h * 0.65})`} fill="#7DB2B2" />
              <ellipse cx={4} cy={-h * 0.85} rx="2.5" ry="5.2" transform={`rotate(40 4 ${-h * 0.85})`} fill="#F2C94C" />
              <circle cx="0" cy={-h - 4} r="1.8" fill="#FFF4CC">
                <animate attributeName="cy" values={`${-h - 2};${-h - 24}`} dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Rocas de apoyo esculpidas bajo los pies */}
        <polygon
          points={`${LFoot[0] - 28},${ground(LFoot[0]) + 16} ${LFoot[0] - 8},${ground(LFoot[0]) - 2} ${LFoot[0] + 50},${ground(LFoot[0]) + 4} ${LFoot[0] + 42},${ground(LFoot[0]) + 24}`}
          fill="#17283A"
          stroke="#D4A373"
          strokeWidth="1.5"
        />
        <polygon
          points={`${RFoot[0] - 24},${ground(RFoot[0]) + 16} ${RFoot[0] - 4},${ground(RFoot[0]) - 3} ${RFoot[0] + 54},${ground(RFoot[0]) + 2} ${RFoot[0] + 44},${ground(RFoot[0]) + 24}`}
          fill="#17283A"
          stroke="#F2C94C"
          strokeWidth="1.8"
        />

        {/* Cumbre */}
        <g transform={`translate(830 ${ground(830) - 24})`}>
          <path d={star4(14)} fill="#7DB2B2" filter="url(#flare)" />
        </g>

        {/* ================= ESFERA CÓSMICA ================= */}
        <g>
          <circle cx={CX} cy={sy} r={sr + 38} fill="url(#auraGrad)" />
          <Branch scale={leafScale} flip={1} x={CX - sr - 26} y={sy + 6} />
          <Branch scale={leafScale} flip={-1} x={CX + sr + 26} y={sy + 6} />
          <circle
            cx={CX}
            cy={sy}
            r={sr}
            fill="url(#sphereGrad)"
            stroke="url(#goldV)"
            strokeWidth={2.4 + avg}
            filter="url(#glow)"
          />
          <circle cx={CX} cy={sy} r={sr - 3} fill="none" stroke="#6CB4FF" strokeOpacity={0.35 + 0.4 * H} strokeWidth="1.4" />
          {innerStars.map(([dx, dy, r], i) => (
            <g key={i} transform={`translate(${CX + (dx * sr) / 100} ${sy + (dy * sr) / 100})`}>
              <path d={star4(r * (1 + 0.4 * H))} fill="#fff" filter={r > 5 ? 'url(#flare)' : undefined} opacity={0.78 + 0.22 * H} />
            </g>
          ))}
          {[
            [-26, 1.38, 0.34, '#FFF4CC'],
            [32, 1.34, 0.32, '#F2C94C'],
          ].map(([rot, rx, ry, col], i) => (
            <ellipse
              key={i}
              cx={CX}
              cy={sy}
              rx={sr * rx}
              ry={sr * ry}
              fill="none"
              stroke={col}
              strokeWidth={2.4 + 0.6 * avg}
              transform={`rotate(${rot} ${CX} ${sy})`}
              filter="url(#glow)"
            />
          ))}
          {/* Corona de tres estrellas */}
          <g transform={`translate(${CX} ${sy - sr - 42 - 8 * H})`}>
            <path d={star4(21)} fill="#F2C94C" filter="url(#flare)" />
          </g>
          <g transform={`translate(${CX - 64} ${sy - sr - 22 - 6 * H})`}>
            <path d={star4(11.5)} fill="#F2C94C" filter="url(#flare)" />
          </g>
          <g transform={`translate(${CX + 64} ${sy - sr - 22 - 6 * H})`}>
            <path d={star4(11.5)} fill="#F2C94C" filter="url(#flare)" />
          </g>
        </g>

        {/* ================= TITÁN DORADO (CALIDAD ZEUS VOLUMÉTRICO) ================= */}
        <g transform={`rotate(${tilt} ${CX} 685)`} filter="url(#titanDropShadow)">
          {/* 1. PIERNAS VOLUMÉTRICAS CON CURVAS MUSCULARES (VASTO LATERAL, MEDIAL Y GEMELOS) */}
          <VolumetricLimb g={LS} sw={sw} />
          <VolumetricLimb g={LT} sw={sw} />
          <VolumetricLimb g={RS} sw={sw} />
          <VolumetricLimb g={RT} sw={sw} />

          {/* Rótulas y Cnémidas/Grebas Griegas Doradas */}
          {[LKnee, RKnee].map(([kx, ky], idx) => (
            <g key={idx}>
              <path
                d={`M ${kx - 11} ${ky - 2} Q ${kx} ${ky - 15} ${kx + 11} ${ky - 2} Q ${kx} ${ky + 14} ${kx - 11} ${ky - 2} Z`}
                fill="url(#bracerGold)"
                stroke="#3A1F04"
                strokeWidth="1.8"
              />
              <ellipse cx={kx} cy={ky - 3} rx="5" ry="4" fill="#FFF7D6" opacity="0.65" />
            </g>
          ))}

          {/* Pies / Sandalias Olímpicas de Bronce y Oro */}
          {[LFoot, RFoot].map(([fx, fy], idx) => (
            <g key={idx}>
              <path
                d={`M ${fx - 12} ${fy - 6} Q ${fx + 6} ${fy - 10} ${fx + 34} ${fy + 8} Q ${fx + 36} ${fy + 15} ${fx - 15} ${fy + 14} Z`}
                fill="url(#bracerGold)"
                stroke="#2A1602"
                strokeWidth="2"
              />
              <path d={`M ${fx - 8} ${fy + 2} L ${fx + 22} ${fy + 9}`} stroke="#FFF4C2" strokeWidth="1.4" />
            </g>
          ))}

          {/* 2. DORSALES ANCHOS (LATISSIMUS DORSI - SILUETA EN "V" DE ZEUS) */}
          <path
            d={`M ${CX - chestW - 8} ${shY + 8}
                C ${CX - chestW - 14 * e} ${shY + 55}, ${CX - waistW - 10} ${hipY - 55}, ${CX - waistW} ${hipY - 12}
                L ${CX + waistW} ${hipY - 12}
                C ${CX + waistW + 10} ${hipY - 55}, ${CX + chestW + 14 * e} ${shY + 55}, ${CX + chestW + 8} ${shY + 8} Z`}
            fill="url(#zeusShadow)"
            stroke="url(#goldRim)"
            strokeWidth={sw}
          />
          {/* Luz en las alas dorsales */}
          <path
            d={`M ${CX - chestW - 5} ${shY + 14} Q ${CX - chestW - 8 * e} ${shY + 56} ${CX - waistW - 4} ${hipY - 36}`}
            fill="none"
            stroke="#FFE58F"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d={`M ${CX + chestW + 5} ${shY + 14} Q ${CX + chestW + 8 * e} ${shY + 56} ${CX + waistW + 4} ${hipY - 36}`}
            fill="none"
            stroke="#FFE58F"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* 3. TRAPECIOS POTENTES Y CUELLO MUSCULOSO */}
          <path
            d={`M ${CX - 18} 308
                C ${CX - 34} 330, ${CX - chestW * 0.85} ${shY - 18}, ${Lsh[0] + 6} ${shY + 4}
                L ${Rsh[0] - 6} ${shY + 4}
                C ${CX + chestW * 0.85} ${shY - 18}, ${CX + 34} 330, ${CX + 18} 308 Z`}
            fill="url(#zeusMuscle)"
            stroke="url(#goldRim)"
            strokeWidth={sw}
          />
          {/* Relieve clavicular y haces del trapecio */}
          <path
            d={`M ${CX - 16} 316 Q ${CX - chestW * 0.48} ${shY - 8} ${Lsh[0] + 14} ${shY - 2}`}
            fill="none"
            stroke="#FFF4CC"
            strokeWidth="2.4"
            opacity="0.7"
          />
          <path
            d={`M ${CX + 16} 316 Q ${CX + chestW * 0.48} ${shY - 8} ${Rsh[0] - 14} ${shY - 2}`}
            fill="none"
            stroke="#FFF4CC"
            strokeWidth="2.4"
            opacity="0.7"
          />
          {/* Esternocleidomastoideo (columnas del cuello) */}
          <path
            d={`M ${CX - 14} 305 L ${CX - 4} 358 M ${CX + 14} 305 L ${CX + 4} 358`}
            stroke="#3B2004"
            strokeWidth="2.5"
            opacity="0.65"
          />
          <path
            d={`M ${CX - 11} 305 L ${CX - 3} 356 M ${CX + 11} 305 L ${CX + 3} 356`}
            stroke="#FFF2BF"
            strokeWidth="1.2"
            opacity="0.65"
          />

          {/* 4. PECTORALES ESCULTÓRICOS CON VOLUMEN 3D */}
          {/* Pectoral Izquierdo */}
          <path
            d={`M ${CX - 2} 360
                L ${CX - chestW + 4} ${shY + 2}
                C ${CX - chestW - 6} ${shY + 28}, ${CX - chestW * 0.88} ${pecBottom + 4}, ${CX - chestW * 0.42} ${pecBottom + 6}
                C ${CX - 16} ${pecBottom + 6}, ${CX - 4} ${pecBottom - 6}, ${CX - 2} ${pecBottom - 12} Z`}
            fill="url(#zeusChestL)"
            stroke="#2E1802"
            strokeWidth="2.2"
          />
          <path
            d={`M ${CX - 6} 365
                L ${CX - chestW + 10} ${shY + 6}
                C ${CX - chestW + 4} ${shY + 24}, ${CX - chestW * 0.7} ${pecBottom - 6}, ${CX - 10} ${pecBottom - 10} Z`}
            fill="url(#zeusSpec)"
            opacity="0.55"
          />
          {/* Pectoral Derecho */}
          <path
            d={`M ${CX + 2} 360
                L ${CX + chestW - 4} ${shY + 2}
                C ${CX + chestW + 6} ${shY + 28}, ${CX + chestW * 0.88} ${pecBottom + 4}, ${CX + chestW * 0.42} ${pecBottom + 6}
                C ${CX + 16} ${pecBottom + 6}, ${CX + 4} ${pecBottom - 6}, ${CX + 2} ${pecBottom - 12} Z`}
            fill="url(#zeusChestR)"
            stroke="#2E1802"
            strokeWidth="2.2"
          />
          <path
            d={`M ${CX + 6} 365
                L ${CX + chestW - 10} ${shY + 6}
                C ${CX + chestW - 4} ${shY + 24}, ${CX + chestW * 0.7} ${pecBottom - 6}, ${CX + 10} ${pecBottom - 10} Z`}
            fill="url(#zeusSpec)"
            opacity="0.55"
          />
          {/* Sombra inferior sub-pectoral y surco esternal */}
          <path
            d={`M ${CX - chestW * 0.92} ${pecBottom - 8}
                C ${CX - chestW * 0.65} ${pecBottom + 10}, ${CX - 14} ${pecBottom + 8}, ${CX} ${pecBottom - 8}
                C ${CX + 14} ${pecBottom + 8}, ${CX + chestW * 0.65} ${pecBottom + 10}, ${CX + chestW * 0.92} ${pecBottom - 8}`}
            fill="none"
            stroke="#FFF2BF"
            strokeWidth="1.6"
            opacity="0.85"
          />

          {/* 5. ABDOMINALES ORGÁNICOS ESCULPIDOS Y SERRATOS */}
          {/* Línea alba profunda */}
          <line x1={CX} y1={pecBottom - 6} x2={CX} y2={hipY - 12} stroke="#2A1502" strokeWidth="3.2" />
          {[0, 1, 2].map((row) => {
            const yTop = pecBottom + 6 + row * 24;
            const yBot = yTop + 20;
            const wRow = (waistW * (0.68 - row * 0.06)) * (0.9 + 0.18 * k);
            return (
              <g key={row}>
                {/* Lóbulo abdominal izquierdo */}
                <path
                  d={`M ${CX - 3} ${yTop + 2}
                      C ${CX - wRow * 0.6} ${yTop - 2}, ${CX - wRow} ${yTop + 2}, ${CX - wRow} ${(yTop + yBot) / 2}
                      C ${CX - wRow} ${yBot - 1}, ${CX - wRow * 0.55} ${yBot + 2}, ${CX - 3} ${yBot - 2} Z`}
                  fill="url(#zeusChestL)"
                  stroke="#3A1E04"
                  strokeWidth="1.8"
                />
                <ellipse cx={CX - wRow * 0.48} cy={yTop + 7} rx={wRow * 0.3} ry="3.8" fill="#FFF4CC" opacity={0.35 + 0.3 * k} />

                {/* Lóbulo abdominal derecho */}
                <path
                  d={`M ${CX + 3} ${yTop + 2}
                      C ${CX + wRow * 0.6} ${yTop - 2}, ${CX + wRow} ${yTop + 2}, ${CX + wRow} ${(yTop + yBot) / 2}
                      C ${CX + wRow} ${yBot - 1}, ${CX + wRow * 0.55} ${yBot + 2}, ${CX + 3} ${yBot - 2} Z`}
                  fill="url(#zeusChestR)"
                  stroke="#3A1E04"
                  strokeWidth="1.8"
                />
                <ellipse cx={CX + wRow * 0.48} cy={yTop + 7} rx={wRow * 0.3} ry="3.8" fill="#FFF4CC" opacity={0.35 + 0.3 * k} />
              </g>
            );
          })}

          {/* Serratos e intercostales */}
          {[0, 1, 2].map((i) => {
            const syRib = pecBottom + 8 + i * 16;
            const sxOut = waistW + 10 - i * 3;
            const sxIn = waistW * 0.68;
            return (
              <g key={`serr${i}`} opacity="0.75">
                <path d={`M ${CX - sxOut} ${syRib - 4} Q ${CX - (sxOut + sxIn) / 2} ${syRib + 5} ${CX - sxIn} ${syRib + 2}`} fill="none" stroke="#FFE58F" strokeWidth="2" strokeLinecap="round" />
                <path d={`M ${CX + sxOut} ${syRib - 4} Q ${CX + (sxOut + sxIn) / 2} ${syRib + 5} ${CX + sxIn} ${syRib + 2}`} fill="none" stroke="#FFE58F" strokeWidth="2" strokeLinecap="round" />
              </g>
            );
          })}

          {/* 6. QUITÓN / FALDELLÍN OLÍMPICO DE ZEUS CON GRECA DORADA */}
          <g>
            {/* Faja / Cinturón plisado */}
            <path
              d={`M ${CX - waistW - 5} ${hipY - 18}
                  Q ${CX} ${hipY - 10} ${CX + waistW + 5} ${hipY - 18}
                  L ${CX + hipW + 6} ${hipY + 6}
                  Q ${CX} ${hipY + 14} ${CX - hipW - 6} ${hipY + 6} Z`}
              fill="url(#chitonCloth)"
              stroke="#8C7A5B"
              strokeWidth="1.8"
            />
            {/* Pliegues horizontales de la faja */}
            <path d={`M ${CX - waistW - 2} ${hipY - 10} Q ${CX} ${hipY - 2} ${CX + waistW + 2} ${hipY - 10}`} fill="none" stroke="#7A766E" strokeWidth="1.5" />
            <path d={`M ${CX - waistW} ${hipY - 3} Q ${CX} ${hipY + 5} ${CX + waistW} ${hipY - 3}`} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />

            {/* Faldellín central con caída entre las piernas y borde de greca griega */}
            <path
              d={`M ${CX - waistW * 0.72} ${hipY + 4}
                  L ${CX + waistW * 0.72} ${hipY + 4}
                  L ${CX + waistW * 0.56} ${hipY + 86}
                  Q ${CX} ${hipY + 94} ${CX - waistW * 0.56} ${hipY + 86} Z`}
              fill="url(#chitonCloth)"
              stroke="#B89B5E"
              strokeWidth="1.8"
            />
            {/* Pliegues verticales sombreados del paño */}
            <path d={`M ${CX - 8} ${hipY + 8} L ${CX - 6} ${hipY + 88}`} stroke="#8E8B82" strokeWidth="2" opacity="0.6" />
            <path d={`M ${CX + 8} ${hipY + 8} L ${CX + 6} ${hipY + 88}`} stroke="#8E8B82" strokeWidth="2" opacity="0.6" />

            {/* Bordes dorados verticales con Greca Griega (como en la foto de Zeus) */}
            <path
              d={`M ${CX - waistW * 0.62} ${hipY + 5} L ${CX - waistW * 0.48} ${hipY + 85}`}
              stroke="url(#bracerGold)"
              strokeWidth="5.5"
            />
            <path
              d={`M ${CX + waistW * 0.62} ${hipY + 5} L ${CX + waistW * 0.48} ${hipY + 85}`}
              stroke="url(#bracerGold)"
              strokeWidth="5.5"
            />
            <path
              d={`M ${CX - waistW * 0.62} ${hipY + 5} L ${CX - waistW * 0.48} ${hipY + 85}`}
              stroke="#3B2004"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <path
              d={`M ${CX + waistW * 0.62} ${hipY + 5} L ${CX + waistW * 0.48} ${hipY + 85}`}
              stroke="#3B2004"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          </g>

          {/* 7. CABEZA ESCULTÓRICA SIN ROSTRO (ESTILO ESTATUA OLÍMPICA / ZEUS) */}
          <g>
            {/* Melena / Corona Olímpica esculpida detrás de la cabeza */}
            <path
              d={`M ${CX - 22} 288
                  Q ${CX - 28} 262 ${CX} 254
                  Q ${CX + 28} 262 ${CX + 22} 288
                  Q ${CX + 26} 308 ${CX + 16} 318
                  L ${CX - 16} 318
                  Q ${CX - 26} 308 ${CX - 22} 288 Z`}
              fill="url(#zeusShadow)"
              stroke="url(#goldRim)"
              strokeWidth="1.6"
            />
            {/* Rostro liso esculpido con pómulos y mandíbula heroica */}
            <path
              d={`M ${CX} 260
                  C ${CX + 16} 260, ${CX + 21} 274, ${CX + 19} 290
                  C ${CX + 18} 304, ${CX + 11} 316, ${CX} 320
                  C ${CX - 11} 316, ${CX - 18} 304, ${CX - 19} 290
                  C ${CX - 21} 274, ${CX - 16} 260, ${CX} 260 Z`}
              fill="url(#zeusDelt)"
              stroke="url(#goldRim)"
              strokeWidth={sw}
            />
            {/* Brillo frontal en la testa sin facciones */}
            <ellipse cx={CX - 4} cy={278} rx="8" ry="12" fill="url(#zeusSpec)" opacity="0.7" />
            {/* Arco superciliar sutil de estatua clásica */}
            <path
              d={`M ${CX - 13} 284 Q ${CX} 288 ${CX + 13} 284`}
              fill="none"
              stroke="#4A2805"
              strokeWidth="1.6"
              opacity="0.55"
            />
          </g>

          {/* 8. BRAZOS VOLUMÉTRICOS (BÍCEPS, TRÍCEPS Y ANTEBRAZOS) */}
          <VolumetricLimb g={LU} sw={sw} />
          <VolumetricLimb g={RU} sw={sw} />
          <VolumetricLimb g={LF} sw={sw} />
          <VolumetricLimb g={RF} sw={sw} />

          {/* Brazaletes Olímpicos de Oro en las muñecas/antebrazos */}
          <OlympianBracer elbow={Le} hand={Lh} rForearm={forearmBulk * 0.92} rWrist={10.5} />
          <OlympianBracer elbow={Re} hand={Rh} rForearm={forearmBulk * 0.92} rWrist={10.5} />

          {/* 9. DELTOIDES REDONDEADOS DE 3 CABEZAS (HOMBROS DE ZEUS) */}
          {[
            [Lsh, -1],
            [Rsh, 1],
          ].map(([p, d]) => {
            const cxp = p[0] + d * 4;
            const cyp = p[1] + 2;
            const rx = deltR * 1.08;
            const ry = deltR * 0.96;
            return (
              <g key={d}>
                {/* Volumen principal redondeado del deltoides */}
                <path
                  d={`M ${cxp - d * rx * 0.65} ${cyp - ry * 0.78}
                      C ${cxp + d * rx * 0.55} ${cyp - ry * 1.05}, ${cxp + d * rx * 1.18} ${cyp - ry * 0.25}, ${cxp + d * rx * 0.95} ${cyp + ry * 0.65}
                      C ${cxp + d * rx * 0.55} ${cyp + ry * 1.15}, ${cxp - d * rx * 0.45} ${cyp + ry * 0.95}, ${cxp - d * rx * 0.75} ${cyp + ry * 0.35}
                      C ${cxp - d * rx * 0.9} ${cyp - ry * 0.15}, ${cxp - d * rx * 0.85} ${cyp - ry * 0.55}, ${cxp - d * rx * 0.65} ${cyp - ry * 0.78} Z`}
                  fill="url(#zeusDelt)"
                  stroke="url(#goldRim)"
                  strokeWidth={sw}
                />
                {/* Lóbulo especular 3D en la cabeza lateral del deltoides */}
                <ellipse
                  cx={cxp + d * rx * 0.18}
                  cy={cyp - ry * 0.22}
                  rx={rx * 0.52}
                  ry={ry * 0.42}
                  transform={`rotate(${d * 22} ${cxp + d * rx * 0.18} ${cyp - ry * 0.22})`}
                  fill="url(#zeusSpec)"
                  opacity="0.82"
                />
                {/* Surcos de separación de las 3 cabezas del deltoides */}
                <path
                  d={`M ${cxp - d * rx * 0.2} ${cyp - ry * 0.7} Q ${cxp + d * rx * 0.15} ${cyp} ${cxp + d * rx * 0.05} ${cyp + ry * 0.82}`}
                  fill="none"
                  stroke="#3B2004"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d={`M ${cxp + d * rx * 0.35} ${cyp - ry * 0.62} Q ${cxp + d * rx * 0.58} ${cyp + ry * 0.05} ${cxp + d * rx * 0.42} ${cyp + ry * 0.78}`}
                  fill="none"
                  stroke="#FFE9A6"
                  strokeWidth="1.1"
                  opacity="0.55"
                />
              </g>
            );
          })}

          {/* 10. MANOS ESCULPIDAS SOSTENIENDO LA ESFERA */}
          {[
            [Lh, -1],
            [Rh, 1],
          ].map(([p, d]) => (
            <g key={d} strokeLinejoin="round" strokeLinecap="round">
              {/* Palma / Dorso musculoso de la mano */}
              <path
                d={`M ${p[0] - 11} ${p[1] + 9}
                    C ${p[0] - 13} ${p[1] - 4}, ${p[0] - 6} ${p[1] - 14}, ${p[0] + 6} ${p[1] - 14}
                    C ${p[0] + 14} ${p[1] - 10}, ${p[0] + 13} ${p[1] + 6}, ${p[0] + 4} ${p[1] + 12} Z`}
                fill="url(#zeusDelt)"
                stroke="url(#goldRim)"
                strokeWidth={sw * 0.85}
              />
              {/* Dedos articulados aferrando la curvatura de la esfera */}
              {[-6, -1, 4, 9].map((off, idx) => (
                <path
                  key={idx}
                  d={`M ${p[0] + d * off * 0.8} ${p[1] - 10} Q ${p[0] - d * (6 + idx * 3)} ${p[1] - 22 - idx * 1.5} ${p[0] - d * (14 + idx * 3.5)} ${p[1] - 16 - idx}`}
                  fill="none"
                  stroke="url(#goldRim)"
                  strokeWidth="3.2"
                />
              ))}
            </g>
          ))}
        </g>

        {/* ================= RAYOS OLÍMPICOS DE ZEUS EN SINTROPÍA ALTA ================= */}
        {lift > 0 && (
          <g opacity={lift * 0.92} filter="url(#flare)">
            {/* Relámpago dorado izquierdo */}
            <polyline
              points={`${Lsh[0]},${Lsh[1] - 16} ${Lsh[0] - 18},${(Lsh[1] + sy) / 2 + 12} ${Lsh[0] + 6},${(Lsh[1] + sy) / 2 - 8} ${CX - sr * 0.55},${sy + sr * 0.82}`}
              fill="none"
              stroke="#FFF7D6"
              strokeWidth="2.4"
            />
            {/* Relámpago dorado derecho */}
            <polyline
              points={`${Rsh[0]},${Rsh[1] - 16} ${Rsh[0] + 18},${(Rsh[1] + sy) / 2 + 12} ${Rsh[0] - 6},${(Rsh[1] + sy) / 2 - 8} ${CX + sr * 0.55},${sy + sr * 0.82}`}
              fill="none"
              stroke="#FFF7D6"
              strokeWidth="2.4"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

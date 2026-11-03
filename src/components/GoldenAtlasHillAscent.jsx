import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assets';

/**
 * GoldenAtlasHillAscent — Edición "Monte Olimpo & Escalinata Monumental (Calidad Zeus)"
 *
 * Combina:
 *  1. Escenario panorámico del Monte Olimpo (templos corintios, pebeteros dorados,
 *     mar de nubes y rayos crepusculares).
 *  2. Escalinata Olímpica 3D en perspectiva cuyos peldaños de mármol y greca dorada
 *     se empinan y agrietan con la Entropía (1 - H) o se allanan y florecen con la
 *     Sintropía (H), manteniendo ambos pies del Titán exactamente apoyados en los
 *     peldaños 0 y 2.
 *  3. Titán Dorado estilo Zeus (God of War) con malla de deformación muscular 2D
 *     en tiempo real (HTML5 Canvas Triangle Mesh) reactiva a E, S, K y H.
 */

const CX = 450;
const W = 900;
const H_VIEW = 800;

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

// Deformador esquelético 2D del Titán Zeus con adaptación de paso a la escalinata
function createTitanDeformer(e, s, k, aspect = 768 / 1376) {
  const H = Math.cbrt(e * s * k);
  const avg = (e + s + k) / 3;
  const entropy = 1 - H;

  const baseH = 458 + 48 * avg;
  const baseW = baseH * aspect * (0.85 + 0.26 * (0.38 * e + 0.34 * k + 0.28 * s));
  const boxX = CX - baseW * 0.49;
  const footTargetY = 736;
  const boxY = footTargetY - baseH * 0.976;

  const de = e - 0.45;
  const ds = s - 0.45;
  const dk = k - 0.45;
  const dH = H - 0.5;

  const deform = (u, v) => {
    let du = 0;
    let dv = 0;

    // 1. Deltoides y Trapecios (E - Hombro Ecológico)
    for (const [side, cu] of [
      [-1, 0.28],
      [1, 0.72],
    ]) {
      const d2 = ((u - cu) / 0.2) ** 2 + ((v - 0.25) / 0.13) ** 2;
      if (d2 < 9) {
        const w = Math.exp(-d2);
        du += (side * 0.045 * de + (u - cu) * 0.24 * de) * w;
        dv += ((v - 0.25) * 0.18 * de - 0.015 * de) * w;
      }
    }

    // 2. Bíceps, Tríceps y Antebrazos con Brazaletes (S - Hombro Social)
    for (const [side, cu, cv] of [
      [-1, 0.17, 0.18],
      [1, 0.83, 0.18],
    ]) {
      const d2 = ((u - cu) / 0.18) ** 2 + ((v - cv) / 0.14) ** 2;
      if (d2 < 9) {
        const w = Math.exp(-d2);
        du += ((u - cu) * 0.3 * ds + side * 0.042 * ds) * w;
        dv += (v - cv) * 0.12 * ds * w;
      }
    }

    // 3. Pectorales, Dorsales en V y Cuádriceps (K - Hombro Cognitivo)
    const dChest = ((u - 0.5) / 0.3) ** 2 + ((v - 0.33) / 0.15) ** 2;
    if (dChest < 9) {
      du += (u - 0.5) * 0.28 * dk * Math.exp(-dChest);
    }

    const dLegs = ((u - 0.5) / 0.32) ** 2 + ((v - 0.58) / 0.16) ** 2;
    if (dLegs < 9) {
      du += (u - 0.5) * 0.2 * dk * Math.exp(-dLegs);
    }

    // 4. Empuje de Brazos y Elevación sobre la Cabeza (H)
    const armV = Math.max(0, Math.min(1, (0.32 - v) / 0.2));
    const armU = Math.max(0, Math.min(1, (Math.abs(u - 0.5) - 0.1) / 0.14));
    const armMask = armV ** 1.2 * armU;
    if (armMask > 0) {
      dv -= 0.075 * dH * armMask;
      du -= (u > 0.5 ? 1 : -1) * 0.025 * dH * armMask;
    }

    // 5. Adaptación de la pierna derecha al peralte de los escalones (Entropía vs. Sintropía)
    const rlegU = Math.max(0, Math.min(1, (u - 0.46) / 0.12));
    const rlegV = Math.max(0, Math.min(1, (v - 0.48) / 0.14));
    const rlegMask = rlegU * rlegV;
    if (rlegMask > 0) {
      dv += 0.058 * (H - 0.35) * rlegMask;
    }

    return [boxX + (u + du) * baseW, boxY + (v + dv) * baseH];
  };

  return { deform, H, avg, entropy, baseW, baseH, boxX, boxY };
}

function drawWarpedTriangle(ctx, img, u0, v0, u1, v1, u2, v2, x0, y0, x1, y1, x2, y2) {
  const cx = (x0 + x1 + x2) / 3;
  const cy = (y0 + y1 + y2) / 3;
  const pad = 0.55;
  const expand = (px, py) => {
    const dx = px - cx;
    const dy = py - cy;
    const d = Math.hypot(dx, dy) || 1;
    return [px + (dx / d) * pad, py + (dy / d) * pad];
  };
  const [ex0, ey0] = expand(x0, y0);
  const [ex1, ey1] = expand(x1, y1);
  const [ex2, ey2] = expand(x2, y2);

  const sx0 = u0 * img.width;
  const sy0 = v0 * img.height;
  const sx1 = u1 * img.width;
  const sy1 = v1 * img.height;
  const sx2 = u2 * img.width;
  const sy2 = v2 * img.height;

  const dU1 = sx1 - sx0;
  const dV1 = sy1 - sy0;
  const dU2 = sx2 - sx0;
  const dV2 = sy2 - sy0;
  const det = dU1 * dV2 - dU2 * dV1;
  if (Math.abs(det) < 1e-5) return;

  const a = ((x1 - x0) * dV2 - (x2 - x0) * dV1) / det;
  const c = ((x2 - x0) * dU1 - (x1 - x0) * dU2) / det;
  const e = x0 - a * sx0 - c * sy0;

  const b = ((y1 - y0) * dV2 - (y2 - y0) * dV1) / det;
  const d = ((y2 - y0) * dU1 - (y1 - y0) * dU2) / det;
  const f = y0 - b * sx0 - d * sy0;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ex0, ey0);
  ctx.lineTo(ex1, ey1);
  ctx.lineTo(ex2, ey2);
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

export default function GoldenAtlasHillAscent({ E = 0.7, S = 0.65, K = 0.68, className = '' }) {
  const e = Math.max(0.1, Math.min(1, E));
  const s = Math.max(0.1, Math.min(1, S));
  const k = Math.max(0.1, Math.min(1, K));

  const canvasRef = useRef(null);
  const [titanImg, setTitanImg] = useState(null);
  const titanUrl = getAssetUrl('art/zeus_golden_titan.png');
  const olympusBgUrl = getAssetUrl('art/olympus_backdrop.jpg');

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (active) setTitanImg(img);
    };
    img.src = titanUrl;
    return () => {
      active = false;
    };
  }, [titanUrl]);

  const rig = useMemo(() => {
    const { deform, H, avg, entropy, baseW, baseH, boxX, boxY } = createTitanDeformer(e, s, k);
    const palmL = deform(0.185, 0.068);
    const palmR = deform(0.805, 0.068);
    const shL = deform(0.28, 0.245);
    const shR = deform(0.72, 0.245);
    const footL = deform(0.322, 0.976);
    const footR = deform(0.712, 0.862);

    // Acople exacto entre las palmas abiertas del Titán y el borde de la esfera
    const sx = (palmL[0] + palmR[0]) / 2;
    const palmHalfSpan = Math.max(40, (palmR[0] - palmL[0]) / 2);
    const sr = Math.max(palmHalfSpan * 1.15, 116 + 18 * avg);
    const dyContact = Math.sqrt(Math.max(0, sr * sr - palmHalfSpan * palmHalfSpan));
    const palmY = (palmL[1] + palmR[1]) / 2;
    const sy = palmY - dyContact + 10;

    // Geometría de la Escalinata Olímpica:
    // El pie izquierdo apoya en el peldaño k = 0 y el pie derecho en el peldaño k = 2
    const stepW = Math.max(38, (footR[0] - footL[0]) / 2);
    const riserH = Math.max(10, (footL[1] - footR[1]) / 2);
    const stairOriginX = footL[0] - stepW * 0.48;
    const stairOriginY = footL[1] + 2;
    const m = riserH / stepW;

    const stepAt = (idx) => ({
      idx,
      x0: stairOriginX + idx * stepW,
      x1: stairOriginX + (idx + 1) * stepW,
      y: stairOriginY - idx * riserH,
    });

    const steps = [];
    for (let idx = -9; idx <= 13; idx++) {
      steps.push(stepAt(idx));
    }

    const ground = (x) => stairOriginY - m * (x - stairOriginX);

    return {
      deform,
      ground,
      H,
      avg,
      entropy,
      m,
      stepW,
      riserH,
      stairOriginX,
      stairOriginY,
      steps,
      baseW,
      baseH,
      boxX,
      boxY,
      palmL,
      palmR,
      shL,
      shR,
      footL,
      footR,
      sx,
      sy,
      sr,
    };
  }, [e, s, k]);

  // Renderizado a 60 FPS de la malla triangular 2D deformada del Titán Zeus
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !titanImg) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H_VIEW);

    const cols = 24;
    const rows = 32;
    const grid = [];

    for (let r = 0; r <= rows; r++) {
      const v = r / rows;
      const rowPts = [];
      for (let c = 0; c <= cols; c++) {
        const u = c / cols;
        const [x, y] = rig.deform(u, v);
        rowPts.push({ u, v, x, y });
      }
      grid.push(rowPts);
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p00 = grid[r][c];
        const p10 = grid[r][c + 1];
        const p01 = grid[r + 1][c];
        const p11 = grid[r + 1][c + 1];

        drawWarpedTriangle(
          ctx,
          titanImg,
          p00.u,
          p00.v,
          p10.u,
          p10.v,
          p01.u,
          p01.v,
          p00.x,
          p00.y,
          p10.x,
          p10.y,
          p01.x,
          p01.y
        );
        drawWarpedTriangle(
          ctx,
          titanImg,
          p10.u,
          p10.v,
          p11.u,
          p11.v,
          p01.u,
          p01.v,
          p10.x,
          p10.y,
          p11.x,
          p11.y,
          p01.x,
          p01.y
        );
      }
    }
  }, [titanImg, rig]);

  const {
    ground,
    H,
    avg,
    entropy,
    m,
    stepW,
    riserH,
    steps,
    palmL,
    palmR,
    shL,
    shR,
    sx,
    sy,
    sr,
  } = rig;

  const isEntropic = entropy > 0.5;
  const trimCol = isEntropic ? '#E0745A' : '#F2C94C';
  const nRocks = Math.round((9 * Math.max(0, entropy - 0.15)) / 0.85);
  const nSprouts = Math.round((9 * Math.max(0, H - 0.35)) / 0.65);
  const leafScale = 0.58 + 0.62 * e;
  const lift = Math.max(0, (H - 0.52) / 0.48);

  // Profundidad 3D en perspectiva de cada peldaño de mármol
  const depthDX = -58;
  const depthDY = -22;

  // Polígono del muro lateral de soporte bajo los peldaños
  const wallPolygon = useMemo(() => {
    const pts = [`-60,820`];
    steps.forEach((st) => {
      pts.push(`${st.x0.toFixed(1)},${(st.y + riserH).toFixed(1)}`);
      pts.push(`${st.x0.toFixed(1)},${st.y.toFixed(1)}`);
      pts.push(`${st.x1.toFixed(1)},${st.y.toFixed(1)}`);
    });
    pts.push(`960,820`);
    return pts.join(' ');
  }, [steps, riserH]);

  const innerStars = useMemo(
    () => [
      [-46, -38, 6],
      [38, -48, 7],
      [-22, 14, 5],
      [52, 20, 6],
      [-60, 40, 4],
      [12, -18, 9],
      [66, -14, 4],
      [-28, -64, 4],
      [6, 46, 5],
      [-70, -8, 3.5],
      [32, 58, 3.5],
      [-42, 62, 3],
      [0, 0, 8],
    ],
    []
  );

  return (
    <div className={`relative w-full max-w-5xl mx-auto select-none aspect-[9/8] overflow-hidden rounded-2xl ${className}`}>
      {/* =====================================================================
          CAPA 0: FONDO PANORÁMICO DEL MONTE OLIMPO (CALIDAD VIDEOJUEGO)
          ===================================================================== */}
      <img
        src={olympusBgUrl}
        alt="Monte Olimpo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700"
        style={{
          filter: isEntropic
            ? 'brightness(0.78) contrast(1.12) saturate(0.9)'
            : 'brightness(0.92) contrast(1.08) saturate(1.12)',
        }}
      />
      {/* Viñeta atmosférica para dar máximo contraste al Titán y a la Esfera */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(8, 15, 30, 0.18) 0%, rgba(7, 13, 24, 0.52) 68%, rgba(5, 9, 18, 0.82) 100%)',
        }}
      />

      {/* =====================================================================
          CAPA 1 (SVG): ESCALINATA MONUMENTAL OLÍMPICA 3D Y ESFERA CÓSMICA
          ===================================================================== */}
      <svg
        viewBox="0 0 900 800"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
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
            <stop offset="52%" stopColor="#4C8DFF" stopOpacity={0.32 + 0.35 * H} />
            <stop offset="82%" stopColor="#F2C94C" stopOpacity={0.14 + 0.22 * H} />
            <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
          </radialGradient>

          {/* Gradientes de Mármol Olímpico para Peldaños y Muro */}
          <linearGradient id="marbleTread" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isEntropic ? '#4A3B3C' : '#566A80'} />
            <stop offset="55%" stopColor={isEntropic ? '#2E2528' : '#334659'} />
            <stop offset="100%" stopColor="#182330" />
          </linearGradient>

          <linearGradient id="marbleRiser" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A3B4D" />
            <stop offset="100%" stopColor="#101822" />
          </linearGradient>

          <linearGradient id="stairWallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2D3D" />
            <stop offset="45%" stopColor="#121C27" />
            <stop offset="100%" stopColor="#070C12" />
          </linearGradient>

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
        </defs>

        {/* ================= ESCALINATA MONUMENTAL DEL OLIMPO ================= */}
        {/* Muro lateral de sillares de mármol bajo los peldaños */}
        <polygon points={wallPolygon} fill="url(#stairWallGrad)" />
        <polygon
          points={wallPolygon}
          fill={isEntropic ? '#C86D51' : '#7DB2B2'}
          fillOpacity={Math.abs(H - 0.5) * 0.16}
        />

        {/* Friso de Greca Griega Dorada que recorre el muro de la escalinata */}
        <line
          x1="-20"
          y1={ground(-20) + 42}
          x2="920"
          y2={ground(920) + 42}
          stroke={trimCol}
          strokeOpacity="0.65"
          strokeWidth="2"
        />
        <line
          x1="-20"
          y1={ground(-20) + 52}
          x2="920"
          y2={ground(920) + 52}
          stroke={trimCol}
          strokeOpacity="0.55"
          strokeWidth="6"
          strokeDasharray="8 6"
        />
        <line
          x1="-20"
          y1={ground(-20) + 62}
          x2="920"
          y2={ground(920) + 62}
          stroke={trimCol}
          strokeOpacity="0.65"
          strokeWidth="2"
        />

        {/* Peldaños 3D en perspectiva (Huella superior + Contrahuella vertical + Moldura dorada) */}
        {steps.map((st) => {
          const isFootStep = st.idx === 0 || st.idx === 2;
          const x0 = st.x0;
          const x1 = st.x1;
          const y0 = st.y;
          const y1 = st.y + riserH;

          const treadPts = `${x0.toFixed(1)},${y0.toFixed(1)} ${x1.toFixed(1)},${y0.toFixed(1)} ${(x1 + depthDX).toFixed(1)},${(y0 + depthDY).toFixed(1)} ${(x0 + depthDX).toFixed(1)},${(y0 + depthDY).toFixed(1)}`;
          const riserPts = `${x0.toFixed(1)},${y0.toFixed(1)} ${(x0 + depthDX).toFixed(1)},${(y0 + depthDY).toFixed(1)} ${(x0 + depthDX).toFixed(1)},${(y1 + depthDY).toFixed(1)} ${x0.toFixed(1)},${y1.toFixed(1)}`;

          return (
            <g key={st.idx}>
              {/* Contrahuella vertical (Riser) */}
              <polygon
                points={riserPts}
                fill="url(#marbleRiser)"
                stroke={trimCol}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              {/* Huella superior de mármol (Tread) */}
              <polygon
                points={treadPts}
                fill="url(#marbleTread)"
                stroke={isFootStep ? '#FFF1B8' : trimCol}
                strokeOpacity={isFootStep ? 0.95 : 0.7}
                strokeWidth={isFootStep ? 2.2 : 1.3}
              />
              {/* Borde frontal biselado en oro/terracota del escalón */}
              <line
                x1={x0}
                y1={y0}
                x2={x1}
                y2={y0}
                stroke={isFootStep ? '#FFF7D6' : trimCol}
                strokeWidth={isFootStep ? 3.2 : 2.2}
                filter={isFootStep ? 'url(#glow)' : undefined}
              />
              {/* Grietas volcánicas en régimen entrópico */}
              {isEntropic && st.idx % 2 === 0 && (
                <path
                  d={`M ${x0 + stepW * 0.35} ${y0} L ${x0 + stepW * 0.28} ${y0 + riserH * 0.55} L ${x0 + stepW * 0.42} ${y0 + riserH * 0.9}`}
                  fill="none"
                  stroke="#E0745A"
                  strokeWidth="1.4"
                  opacity="0.75"
                />
              )}
            </g>
          );
        })}

        {/* Entropía: fragmentos de mármol que ruedan escaleras abajo */}
        {Array.from({ length: nRocks }, (_, i) => {
          const x0 = 560 + ((i * 97) % 300);
          const y0 = ground(x0) - 6;
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

        {/* Sintropía: brotes de laurel dorado y celadón en los peldaños superiores */}
        {Array.from({ length: nSprouts }, (_, i) => {
          const stIdx = 3 + i;
          const st = steps.find((sObj) => sObj.idx === stIdx);
          if (!st) return null;
          const x = st.x0 + stepW * 0.55;
          const y = st.y;
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

        {/* ================= ESFERA CÓSMICA AZUL OSCURA CON ESTRELLAS ================= */}
        <g>
          <circle cx={sx} cy={sy} r={sr + 44} fill="url(#auraGrad)" />
          <Branch scale={leafScale} flip={1} x={sx - sr - 24} y={sy + 8} />
          <Branch scale={leafScale} flip={-1} x={sx + sr + 24} y={sy + 8} />
          <circle
            cx={sx}
            cy={sy}
            r={sr}
            fill="url(#sphereGrad)"
            stroke="url(#goldV)"
            strokeWidth={2.8 + avg}
            filter="url(#glow)"
          />
          <circle
            cx={sx}
            cy={sy}
            r={sr - 3.5}
            fill="none"
            stroke="#6CB4FF"
            strokeOpacity={0.4 + 0.42 * H}
            strokeWidth="1.5"
          />
          {innerStars.map(([dx, dy, r], i) => (
            <g key={i} transform={`translate(${sx + (dx * sr) / 100} ${sy + (dy * sr) / 100})`}>
              <path
                d={star4(r * (1 + 0.4 * H))}
                fill="#FFFFFF"
                filter={r > 5 ? 'url(#flare)' : undefined}
                opacity={0.82 + 0.18 * H}
              />
            </g>
          ))}
          {/* Anillos orbitales */}
          {[
            [-26, 1.36, 0.34, '#FFF4CC'],
            [32, 1.32, 0.32, '#F2C94C'],
          ].map(([rot, rx, ry, col], i) => (
            <ellipse
              key={i}
              cx={sx}
              cy={sy}
              rx={sr * rx}
              ry={sr * ry}
              fill="none"
              stroke={col}
              strokeWidth={2.4 + 0.6 * avg}
              transform={`rotate(${rot} ${sx} ${sy})`}
              filter="url(#glow)"
            />
          ))}
          {/* Corona de tres estrellas superiores */}
          <g transform={`translate(${sx} ${sy - sr - 38 - 8 * H})`}>
            <path d={star4(21)} fill="#F2C94C" filter="url(#flare)" />
          </g>
          <g transform={`translate(${sx - 66} ${sy - sr - 18 - 6 * H})`}>
            <path d={star4(11.5)} fill="#F2C94C" filter="url(#flare)" />
          </g>
          <g transform={`translate(${sx + 66} ${sy - sr - 18 - 6 * H})`}>
            <path d={star4(11.5)} fill="#F2C94C" filter="url(#flare)" />
          </g>
        </g>

        {/* Fallback instantáneo mientras hidrata el canvas */}
        {!titanImg && (
          <image
            href={titanUrl}
            x={rig.boxX}
            y={rig.boxY}
            width={rig.baseW}
            height={rig.baseH}
            preserveAspectRatio="none"
          />
        )}
      </svg>

      {/* =====================================================================
          CAPA 2 (CANVAS 2D MESH DEFORMER): TITÁN DORADO CALIDAD ZEUS
          ===================================================================== */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H_VIEW}
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.82)]"
      />

      {/* =====================================================================
          CAPA 3 (FRENTE SVG): DESTELLOS DE AGARRE Y RAYOS OLÍMPICOS DE ZEUS
          ===================================================================== */}
      <svg
        viewBox="0 0 900 800"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Puntos de energía dorada en las palmas donde sostienen la esfera */}
        {[palmL, palmR].map(([px, py], idx) => (
          <g key={idx} transform={`translate(${px} ${py})`} opacity={0.55 + 0.4 * H}>
            <circle cx="0" cy="0" r={6 + 5 * H} fill="#F2C94C" opacity="0.35" filter="url(#flare)" />
            <path d={star4(6 + 4 * H)} fill="#FFF7D6" filter="url(#flare)" />
          </g>
        ))}

        {/* Rayos Olímpicos de Zeus cuando la sintropía eleva la esfera */}
        {lift > 0 && (
          <g opacity={lift * 0.9} filter="url(#flare)">
            <polyline
              points={`${shL[0]},${shL[1]} ${shL[0] - 24},${(shL[1] + palmL[1]) / 2} ${palmL[0] - 6},${palmL[1] + 18} ${palmL[0]},${palmL[1]}`}
              fill="none"
              stroke="#FFF7D6"
              strokeWidth="2.2"
            />
            <polyline
              points={`${shR[0]},${shR[1]} ${shR[0] + 24},${(shR[1] + palmR[1]) / 2} ${palmR[0] + 6},${palmR[1] + 18} ${palmR[0]},${palmR[1]}`}
              fill="none"
              stroke="#FFF7D6"
              strokeWidth="2.2"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

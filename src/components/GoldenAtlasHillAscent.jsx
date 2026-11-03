import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assets';

/**
 * GoldenAtlasHillAscent — Edición "Diosa Olímpica en Ascenso por la Escalinata del Olimpo"
 *
 * Combina:
 *  1. Escenario 3D en perspectiva frontal del Monte Olimpo con su gran escalinata
 *     de mármol clásico, balaustradas, pebeteros de fuego sagrado y columnas corintias.
 *     La inclinación/peralte visual de la escalinata responde dinámicamente a la
 *     Entropía (1 - H, escalinata más empinada y sombría) vs. Sintropía (H, escalinata
 *     más tendida, luminosa y coronada por energía dorada).
 *  2. Diosa Olímpica dorada de espaldas subiendo los peldaños de mármol mientras
 *     sostiene la Esfera Cósmica azul oscura con estrellas sobre sus hombros, con
 *     malla de deformación muscular 2D en tiempo real (HTML5 Canvas Triangle Mesh)
 *     reactiva a E (hombros/deltoides), S (brazos/antebrazos) y K (espalda dorsal y piernas).
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

// Deformador anatómico 2D de la Diosa Olímpica vista de espaldas subiendo la escalinata
function createTitanDeformer(e, s, k, aspect = 768 / 1376) {
  const H = Math.cbrt(e * s * k);
  const avg = (e + s + k) / 3;
  const entropy = 1 - H;

  // Escala corporal y ascenso progresivo por los peldaños según H
  const baseH = 445 + 42 * avg;
  const baseW = baseH * aspect * (0.88 + 0.22 * (0.38 * e + 0.34 * k + 0.28 * s));
  const boxX = CX - baseW * 0.495;
  const footTargetY = 778 - 22 * H;
  const boxY = footTargetY - baseH * 0.964;

  const de = e - 0.45;
  const ds = s - 0.45;
  const dk = k - 0.45;
  const dH = H - 0.5;

  const deform = (u, v) => {
    let du = 0;
    let dv = 0;

    // 1. Deltoides y Hombros Olímpicos vistos de espaldas (E - Hombro Ecológico)
    for (const [side, cu] of [
      [-1, 0.31],
      [1, 0.69],
    ]) {
      const d2 = ((u - cu) / 0.17) ** 2 + ((v - 0.255) / 0.11) ** 2;
      if (d2 < 9) {
        const w = Math.exp(-d2);
        du += (side * 0.042 * de + (u - cu) * 0.24 * de) * w;
        dv += ((v - 0.255) * 0.16 * de - 0.016 * de) * w;
      }
    }

    // 2. Bíceps, Tríceps y Antebrazos con Brazaletes Dorados (S - Hombro Social)
    for (const [side, cu, cv] of [
      [-1, 0.20, 0.19],
      [1, 0.80, 0.19],
    ]) {
      const d2 = ((u - cu) / 0.16) ** 2 + ((v - cv) / 0.13) ** 2;
      if (d2 < 9) {
        const w = Math.exp(-d2);
        du += ((u - cu) * 0.28 * ds + side * 0.036 * ds) * w;
        dv += (v - cv) * 0.12 * ds * w;
      }
    }

    // 3. Espalda Alta / Dorsales en V y Piernas de Ascenso (K - Hombro Cognitivo)
    const dBack = ((u - 0.5) / 0.24) ** 2 + ((v - 0.315) / 0.12) ** 2;
    if (dBack < 9) {
      // Ensancha dorsales preservando la cintura ceñida en v ~ 0.42
      const waistGuard = Math.max(0, 1 - Math.max(0, (v - 0.37) / 0.06));
      du += (u - 0.5) * 0.26 * dk * Math.exp(-dBack) * (0.4 + 0.6 * waistGuard);
    }

    const dLegs = ((u - 0.54) / 0.26) ** 2 + ((v - 0.64) / 0.18) ** 2;
    if (dLegs < 9) {
      du += (u - 0.52) * 0.18 * dk * Math.exp(-dLegs);
    }

    // 4. Empuje de Brazos y Elevación de la Esfera sobre la Cabeza (H)
    const armV = Math.max(0, Math.min(1, (0.31 - v) / 0.21));
    const armU = Math.max(0, Math.min(1, (Math.abs(u - 0.5) - 0.11) / 0.14));
    const armMask = armV ** 1.2 * armU;
    if (armMask > 0) {
      dv -= 0.072 * dH * armMask;
      du -= (u > 0.5 ? 1 : -1) * 0.022 * dH * armMask;
    }

    // 5. Impulso de la pierna derecha subiendo el peldaño superior (Entropía vs. Sintropía)
    const rlegU = Math.max(0, Math.min(1, (u - 0.51) / 0.11));
    const rlegV = Math.max(0, Math.min(1, (v - 0.48) / 0.14)) * Math.max(0, Math.min(1, (0.84 - v) / 0.08));
    const rlegMask = rlegU * rlegV;
    if (rlegMask > 0) {
      dv -= 0.035 * dH * rlegMask;
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
  const titanUrl = getAssetUrl('art/zeus_golden_goddess.png');
  const olympusBgUrl = getAssetUrl('art/olympus_stairs_backdrop.jpg');

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
    const palmL = deform(0.148, 0.076);
    const palmR = deform(0.850, 0.076);
    const shL = deform(0.31, 0.255);
    const shR = deform(0.69, 0.255);
    const footL = deform(0.480, 0.964);
    const footR = deform(0.622, 0.781);

    // Acople entre las palmas abiertas de la Diosa y el arco inferior de la Esfera Cósmica
    const sx = (palmL[0] + palmR[0]) / 2;
    const palmHalfSpan = Math.max(40, (palmR[0] - palmL[0]) / 2);
    const sr = Math.max(palmHalfSpan * 1.12, 114 + 16 * avg);
    const dyContact = Math.sqrt(Math.max(0, sr * sr - palmHalfSpan * palmHalfSpan));
    const palmY = (palmL[1] + palmR[1]) / 2;
    const sy = palmY - dyContact + 8;

    return {
      deform,
      H,
      avg,
      entropy,
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

  // Renderizado a 60 FPS de la malla triangular 2D deformada de la Diosa Olímpica
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
    H,
    avg,
    entropy,
    palmL,
    palmR,
    shL,
    shR,
    footL,
    footR,
    sx,
    sy,
    sr,
  } = rig;

  const isEntropic = entropy > 0.5;
  const trimCol = isEntropic ? '#E0745A' : '#F2C94C';
  const leafScale = 0.58 + 0.62 * e;
  const lift = Math.max(0, (H - 0.52) / 0.48);

  // Efecto Entropía vs. Sintropía sobre la inclinación/perspectiva de la Escalinata 3D:
  // En Entropía (H bajo), la escalinata se estira verticalmente luciendo más empinada e imponente.
  // En Sintropía (H alto), la pendiente cede y la terraza del Olimpo se acerca.
  const stairScaleY = 1 + (0.5 - H) * 0.14;
  const stairScaleX = 1 - (0.5 - H) * 0.04;
  const stairTranslateY = (0.5 - H) * -18;

  // Líneas de luz en perspectiva sobre los bordes de los peldaños de mármol 3D
  const perspectiveSteps = useMemo(() => {
    const arr = [];
    const count = 11;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1); // 0 = base en primer plano, 1 = terraza superior
      const p = t ** 0.78;
      const yBase = 782 - p * 318;
      // Modulación vertical por Entropía/Sintropía coherente con el fondo
      const y = 780 - (780 - yBase) * stairScaleY + stairTranslateY * (1 - p * 0.4);
      const halfSpan = 295 * (1 - p * 0.52) * stairScaleX;
      arr.push({
        i,
        t,
        y,
        x0: CX - halfSpan,
        x1: CX + halfSpan,
      });
    }
    return arr;
  }, [stairScaleY, stairScaleX, stairTranslateY]);

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
          CAPA 0: ESCALINATA MONUMENTAL 3D DEL MONTE OLIMPO (REACTIVA A H)
          ===================================================================== */}
      <img
        src={olympusBgUrl}
        alt="Escalinata del Monte Olimpo"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transformOrigin: '50% 96%',
          transform: `translateY(${stairTranslateY.toFixed(1)}px) scale(${stairScaleX.toFixed(3)}, ${stairScaleY.toFixed(3)})`,
          filter: isEntropic
            ? `brightness(${(0.74 + 0.18 * H).toFixed(2)}) contrast(1.14) saturate(0.88)`
            : `brightness(${(0.88 + 0.14 * H).toFixed(2)}) contrast(1.06) saturate(1.12)`,
        }}
      />
      {/* Atmósfera radial: tinte ámbar/tormenta en Entropía, resplandor dorado/celeste en Sintropía */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: isEntropic
            ? 'radial-gradient(circle at 50% 34%, rgba(12, 18, 34, 0.14) 0%, rgba(28, 14, 18, 0.46) 68%, rgba(6, 9, 16, 0.84) 100%)'
            : 'radial-gradient(circle at 50% 32%, rgba(242, 201, 76, 0.08) 0%, rgba(7, 13, 24, 0.42) 68%, rgba(5, 9, 18, 0.78) 100%)',
        }}
      />

      {/* =====================================================================
          CAPA 1 (SVG): DESTELLOS EN PELDAÑOS 3D Y ESFERA CÓSMICA CON ESTRELLAS
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

          <linearGradient id="stepEdgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={trimCol} stopOpacity="0" />
            <stop offset="22%" stopColor={trimCol} stopOpacity={isEntropic ? '0.45' : '0.55'} />
            <stop offset="50%" stopColor="#FFF4CC" stopOpacity={0.25 + 0.45 * H} />
            <stop offset="78%" stopColor={trimCol} stopOpacity={isEntropic ? '0.45' : '0.55'} />
            <stop offset="100%" stopColor={trimCol} stopOpacity="0" />
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

        {/* ================= BORDES LUMINOSOS EN PERSPECTIVA SOBRE LOS PELDAÑOS 3D ================= */}
        {perspectiveSteps.map((st) => (
          <line
            key={st.i}
            x1={st.x0}
            y1={st.y}
            x2={st.x1}
            y2={st.y}
            stroke="url(#stepEdgeGlow)"
            strokeWidth={1.6 - st.t * 0.7}
            opacity={0.35 + 0.35 * Math.abs(H - 0.5)}
          />
        ))}

        {/* Sombra y halo de apoyo de las sandalias sobre los peldaños de mármol */}
        {[
          [footL[0], footL[1], 28, 7],
          [footR[0], footR[1], 24, 6],
        ].map(([fx, fy, rx, ry], idx) => (
          <g key={`fstep-${idx}`}>
            <ellipse cx={fx} cy={fy + 2} rx={rx * 1.25} ry={ry * 1.3} fill="#04070E" opacity="0.68" filter="url(#glow)" />
            <ellipse
              cx={fx}
              cy={fy + 1}
              rx={rx}
              ry={ry * 0.65}
              fill="none"
              stroke={trimCol}
              strokeWidth="1.5"
              strokeOpacity={0.55 + 0.35 * H}
              filter="url(#glow)"
            />
          </g>
        ))}

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
          CAPA 2 (CANVAS 2D MESH DEFORMER): DIOSA OLÍMPICA DORADA DE ESPALDAS
          ===================================================================== */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H_VIEW}
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.85)]"
      />

      {/* =====================================================================
          CAPA 3 (FRENTE SVG): DESTELLOS DE AGARRE Y RAYOS OLÍMPICOS EN SINTROPÍA
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

        {/* Rayos Olímpicos cuando la Sintropía eleva la esfera */}
        {lift > 0 && (
          <g opacity={lift * 0.9} filter="url(#flare)">
            <polyline
              points={`${shL[0]},${shL[1]} ${shL[0] - 22},${(shL[1] + palmL[1]) / 2} ${palmL[0] - 6},${palmL[1] + 18} ${palmL[0]},${palmL[1]}`}
              fill="none"
              stroke="#FFF7D6"
              strokeWidth="2.2"
            />
            <polyline
              points={`${shR[0]},${shR[1]} ${shR[0] + 22},${(shR[1] + palmR[1]) / 2} ${palmR[0] + 6},${palmR[1] + 18} ${palmR[0]},${palmR[1]}`}
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

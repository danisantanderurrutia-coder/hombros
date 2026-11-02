import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * GoldenAtlasHillAscent:
 * An interactive, geometric gold line-art figure (Atlas / Sisyphus transcended)
 * ascending a steep hill while hoisting a cosmic, deep-blue starry sphere.
 * 
 * Dynamic behaviors:
 * - As E, S, K increase:
 *   - The muscles (deltoids, biceps, chest, quads) physically bulge and expand.
 *   - The golden stroke weights and inner energetic fibers intensify.
 *   - The sphere is pushed high above the head, breaking free from the suffocating lower stance.
 *   - The climber's stance straightens with triumphant strength up the mountain.
 *   - The orbital rings and stars radiate brighter.
 *   - The botanical branches flourish and bloom.
 */
export default function GoldenAtlasHillAscent({
  E = 0.70, // Hombro Ecológico [0.1 .. 1.0]
  S = 0.65, // Hombro Social [0.1 .. 1.0]
  K = 0.68, // Hombro Cognitivo/Económico [0.1 .. 1.0]
  className = '',
}) {
  // Clamped values
  const valE = Math.max(0.1, Math.min(1.0, E));
  const valS = Math.max(0.1, Math.min(1.0, S));
  const valK = Math.max(0.1, Math.min(1.0, K));

  // Liebig Carrying Capacity: Geometric mean
  const H = Math.pow(valE * valS * valK, 1 / 3);
  // Average composite power
  const P = (valE + valS + valK) / 3;

  // Muscle expansion factors
  // Bulge expands coordinates outward
  const shoulderBulk = 6 + 26 * Math.pow(valE, 0.85); // Deltoids expansion
  const armBulk = 5 + 20 * Math.pow(valS, 0.85);      // Biceps/forearms expansion
  const coreBulk = 4 + 18 * Math.pow(valK, 0.85);     // Torso & chest expansion
  const legBulk = 5 + 16 * Math.pow(P, 0.85);         // Quads & calves expansion

  // Dynamic stroke weight and glow
  const lineStrokeWidth = (2.0 + 2.2 * P).toFixed(2);
  const fiberOpacity = (0.25 + 0.65 * P).toFixed(2);

  // Sphere lift calculations:
  // Low H (0.15): Sphere heavy, low at Y = 300, elbows deeply bent.
  // High H (1.00): Sphere lifted high into the sky at Y = 130, arms extended overhead in glorious V!
  const sphereCenterY = 300 - 165 * Math.pow(H, 0.9);
  const sphereCenterX = 450 + 10 * (1 - H); // Subtle lateral forward thrust as it rises
  const sphereRadius = 108 + 14 * Math.pow(P, 0.8); // Expands slightly as capacity expands

  // Climber base positioning on mountain slope
  // Mountain ground line: ascends from (0, 710) to (900, 470), slope is ~ -0.266
  // Hip center:
  const hipX = 390 + 20 * H;
  const hipY = 510 - 15 * H;

  // Torso / Neck / Head coordinates (tilts and straightens as H rises)
  const postureStraighten = (H - 0.5) * 18; // degrees correction
  const chestX = hipX + 32 + (H * 10);
  const chestY = hipY - 95 - (H * 22);

  const neckX = chestX + 16;
  const neckY = chestY - 45;

  const headX = neckX + 14;
  const headY = neckY - 32;

  // Deltoids (Shoulders) positions
  const leftShoulderX = chestX - 38 - shoulderBulk * 0.7;
  const leftShoulderY = chestY - 12 - (H * 10);

  const rightShoulderX = chestX + 42 + shoulderBulk * 0.7;
  const rightShoulderY = chestY - 22 - (H * 14);

  // Hand grips cupping the sphere bottom-left and bottom-right
  const leftHandAngle = 135 * (Math.PI / 180);
  const rightHandAngle = 45 * (Math.PI / 180);

  const leftHandX = sphereCenterX + (sphereRadius + 4) * Math.cos(leftHandAngle);
  const leftHandY = sphereCenterY + (sphereRadius + 4) * Math.sin(leftHandAngle);

  const rightHandX = sphereCenterX + (sphereRadius + 4) * Math.cos(rightHandAngle);
  const rightHandY = sphereCenterY + (sphereRadius + 4) * Math.sin(rightHandAngle);

  // Elbows (Inverse kinematics style position that opens up as hands rise)
  // Left elbow
  const leftElbowX = leftShoulderX - 25 - armBulk * 0.6 - (1 - H) * 22;
  const leftElbowY = (leftShoulderY + leftHandY) / 2 + 25 * (1 - H);

  // Right elbow
  const rightElbowX = rightShoulderX + 28 + armBulk * 0.6 + (1 - H) * 20;
  const rightElbowY = (rightShoulderY + rightHandY) / 2 + 22 * (1 - H);

  // Legs in mountain-climbing step:
  // Back leg (left): pushed back down the slope, bearing initial weight
  const leftKneeX = hipX - 65;
  const leftKneeY = hipY + 55;
  const leftFootX = hipX - 110;
  const leftFootY = 635; // Planted on slope

  // Front leg (right): high knee step uphill forward
  const rightKneeX = hipX + 70 + (H * 15);
  const rightKneeY = hipY + 30 - (H * 10);
  const rightFootX = hipX + 95 + (H * 12);
  const rightFootY = 570; // Planted on higher rock step

  // Generate dynamic stars inside the sphere
  const innerStars = useMemo(() => [
    { cx: -42, cy: -35, r: 2.8, sparkle: true, delay: 0 },
    { cx: 35, cy: -45, r: 3.2, sparkle: true, delay: 0.4 },
    { cx: -20, cy: 15, r: 2.2, sparkle: true, delay: 0.8 },
    { cx: 48, cy: 22, r: 2.6, sparkle: true, delay: 1.2 },
    { cx: -55, cy: 38, r: 1.8, sparkle: false, delay: 0 },
    { cx: 10, cy: -20, r: 3.8, sparkle: true, delay: 0.2 },
    { cx: 62, cy: -15, r: 2.0, sparkle: false, delay: 0 },
    { cx: -25, cy: -60, r: 1.9, sparkle: false, delay: 0 },
    { cx: 5, cy: 45, r: 2.5, sparkle: true, delay: 1.0 },
    { cx: -68, cy: -10, r: 1.6, sparkle: false, delay: 0 },
    { cx: 30, cy: 55, r: 1.7, sparkle: false, delay: 0 },
    { cx: -40, cy: 62, r: 1.5, sparkle: false, delay: 0 },
    { cx: 0, cy: 0, r: 4.2, sparkle: true, delay: 0.6 },
  ], []);

  // Laurel branch leaves scale with Ecological (valE) and H
  const leafScale = 0.5 + 0.65 * valE;

  return (
    <div className={`relative w-full max-w-5xl mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 900 740"
        className="w-full h-auto drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* =======================================================
              DEFINICIÓN DE GRADIENTES DORADOS Y CÓSMICOS
              ======================================================= */}
          
          {/* Dorado Metálico Principal */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="25%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#E5A93C" />
            <stop offset="75%" stopColor="#FFDF78" />
            <stop offset="100%" stopColor="#B37D14" />
          </linearGradient>

          {/* Dorado Radiante con Brillo Máximo */}
          <linearGradient id="goldRadiant" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D49419" />
            <stop offset="40%" stopColor="#FFE47A" />
            <stop offset="70%" stopColor="#FFFBE6" />
            <stop offset="100%" stopColor="#F3B329" />
          </linearGradient>

          {/* Relleno translúcido para facetas musculares */}
          <linearGradient id="muscleFacetFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF78" stopOpacity={0.22 + 0.28 * P} />
            <stop offset="50%" stopColor="#D49419" stopOpacity={0.12 + 0.20 * P} />
            <stop offset="100%" stopColor="#4A2E00" stopOpacity={0.05} />
          </linearGradient>

          {/* Esfera Cósmica: Azul Ultra Profundo a Índigo */}
          <radialGradient id="sphereCosmicGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#25438C" />
            <stop offset="35%" stopColor="#142654" />
            <stop offset="70%" stopColor="#0B1430" />
            <stop offset="100%" stopColor="#040816" />
          </radialGradient>

          {/* Halo de atmósfera de la esfera */}
          <radialGradient id="sphereAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#38BDF8" stopOpacity={0.25 * H} />
            <stop offset="85%" stopColor="#6366F1" stopOpacity={0.15 * H} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Cerro / Ladera de la Montaña: Estratos de Suelo Regenerativo */}
          <linearGradient id="mountainSlopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#233544" />
            <stop offset="30%" stopColor="#192834" />
            <stop offset="70%" stopColor="#111B24" />
            <stop offset="100%" stopColor="#0A1017" />
          </linearGradient>

          {/* Líneas topográficas doradas del cerro */}
          <linearGradient id="topoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A373" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#F5D061" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7DB2B2" stopOpacity="0.8" />
          </linearGradient>

          {/* Filtro de Resplandor Dorado (Glow) */}
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Filtro de Resplandor Intenso para Estrellas */}
          <filter id="starFlare" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =======================================================
            FONDO AMBIENTAL: ATMÓSFERA Y LADERA DEL CERRO
            ======================================================= */}
        {/* Cielo suave matinal / cósmico */}
        <rect x="0" y="0" width="900" height="740" fill="transparent" />

        {/* Resplandor cósmico detrás del cerro hacia la cumbre */}
        <circle cx="820" cy="380" r="280" fill="url(#sphereAuraGrad)" opacity={0.6} />

        {/* Capas geológicas del cerro que asciende hacia la derecha */}
        {/* Capa de roca profunda */}
        <path
          d="M 0 710 L 900 460 L 900 740 L 0 740 Z"
          fill="url(#mountainSlopeGrad)"
          stroke="rgba(212, 163, 115, 0.25)"
          strokeWidth="1.5"
        />

        {/* Estrato intermedio: Curvas de nivel topográficas doradas / celadón */}
        <path
          d="M 0 725 Q 300 660 600 580 T 900 495"
          fill="none"
          stroke="url(#topoLineGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <path
          d="M 0 740 Q 320 680 620 605 T 900 525"
          fill="none"
          stroke="url(#topoLineGrad)"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 0 695 Q 350 635 680 545 T 900 465"
          fill="none"
          stroke="url(#topoLineGrad)"
          strokeWidth="2"
        />

        {/* Cresta rocosa principal del cerro (sendero de ascenso) */}
        <path
          d="M -20 705 L 180 670 L 320 635 L 500 575 L 680 520 L 920 455"
          fill="none"
          stroke="#F5D061"
          strokeWidth="3"
          filter="url(#goldGlow)"
        />

        {/* Rocas de apoyo para los pies del escalador */}
        <polygon
          points={`${leftFootX - 25},${leftFootY + 5} ${leftFootX + 35},${leftFootY + 5} ${leftFootX + 15},${leftFootY + 30} ${leftFootX - 20},${leftFootY + 25}`}
          fill="#1C2D3D"
          stroke="#D4A373"
          strokeWidth="1.5"
        />
        <polygon
          points={`${rightFootX - 20},${rightFootY + 5} ${rightFootX + 45},${rightFootY - 5} ${rightFootX + 30},${rightFootY + 25} ${rightFootX - 15},${rightFootY + 28}`}
          fill="#1C2D3D"
          stroke="#F5D061"
          strokeWidth="2"
          filter="url(#goldGlow)"
        />

        {/* Hitos / Marcadores en el cerro */}
        <g transform="translate(140, 680)" opacity="0.7">
          <circle cx="0" cy="0" r="3" fill="#D4A373" />
          <text x="10" y="4" fill="#C86D51" fontSize="10" fontFamily="monospace" fontWeight="bold">
            0% Entropía
          </text>
        </g>
        <g transform="translate(480, 595)" opacity="0.85">
          <circle cx="0" cy="0" r="3" fill="#F5D061" />
          <text x="10" y="4" fill="#F5D061" fontSize="10" fontFamily="monospace" fontWeight="bold">
            Límite Elástico (Hombros)
          </text>
        </g>
        <g transform="translate(760, 490)">
          <circle cx="0" cy="0" r="4" fill="#7DB2B2" />
          <text x="10" y="4" fill="#7DB2B2" fontSize="10" fontFamily="monospace" fontWeight="bold">
            Cumbre Sintrópica
          </text>
        </g>


        {/* =======================================================
            ESFERA CELESTIAL AZUL OSCURA CON ESTRELLAS Y ANILLOS
            (Sostenida en alto; asciende con H)
            ======================================================= */}
        <g id="celestialSphereGroup">
          
          {/* Halo radiante de fondo de la esfera */}
          <circle
            cx={sphereCenterX}
            cy={sphereCenterY}
            r={sphereRadius + 22}
            fill="url(#sphereAuraGrad)"
          />

          {/* Globo principal: azul marino cósmico profundo */}
          <circle
            cx={sphereCenterX}
            cy={sphereCenterY}
            r={sphereRadius}
            fill="url(#sphereCosmicGrad)"
            stroke="#F5D061"
            strokeWidth={2 + 1.2 * P}
            filter="url(#goldGlow)"
          />

          {/* Borde celeste interno de refracción atmosférica */}
          <circle
            cx={sphereCenterX}
            cy={sphereCenterY}
            r={sphereRadius - 2}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            opacity={0.45 + 0.4 * H}
          />

          {/* Red de meridianos y paralelos celestes sutiles */}
          <ellipse
            cx={sphereCenterX}
            cy={sphereCenterY}
            rx={sphereRadius * 0.9}
            ry={sphereRadius * 0.35}
            fill="none"
            stroke="rgba(125, 178, 178, 0.3)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <ellipse
            cx={sphereCenterX}
            cy={sphereCenterY}
            rx={sphereRadius * 0.35}
            ry={sphereRadius * 0.9}
            fill="none"
            stroke="rgba(125, 178, 178, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* Anillo Orbital 1: Inclinado hacia la derecha (-28°) */}
          <g transform={`rotate(-28, ${sphereCenterX}, ${sphereCenterY})`}>
            <ellipse
              cx={sphereCenterX}
              cy={sphereCenterY}
              rx={sphereRadius * 1.36}
              ry={sphereRadius * 0.38}
              fill="none"
              stroke="#FFF8DB"
              strokeWidth={2.4 + 0.6 * P}
              filter="url(#goldGlow)"
            />
            {/* Brillo en el borde del anillo */}
            <circle
              cx={sphereCenterX + sphereRadius * 1.36}
              cy={sphereCenterY}
              r="3.5"
              fill="#FFFFFF"
              filter="url(#starFlare)"
            />
          </g>

          {/* Anillo Orbital 2: Inclinado hacia la izquierda (+34°) */}
          <g transform={`rotate(34, ${sphereCenterX}, ${sphereCenterY})`}>
            <ellipse
              cx={sphereCenterX}
              cy={sphereCenterY}
              rx={sphereRadius * 1.32}
              ry={sphereRadius * 0.36}
              fill="none"
              stroke="#F5D061"
              strokeWidth={2.2 + 0.6 * P}
              filter="url(#goldGlow)"
            />
            {/* Brillo en el borde del segundo anillo */}
            <circle
              cx={sphereCenterX - sphereRadius * 1.32}
              cy={sphereCenterY}
              r="3"
              fill="#FFFFFF"
              filter="url(#starFlare)"
            />
          </g>

          {/* Constelación de estrellas interiores (4-point sparkle stars & dots) */}
          {innerStars.map((s, idx) => {
            const posX = sphereCenterX + (s.cx * sphereRadius) / 100;
            const posY = sphereCenterY + (s.cy * sphereRadius) / 100;

            if (s.sparkle) {
              const sz = s.r * (1 + 0.3 * H);
              return (
                <g key={idx} transform={`translate(${posX}, ${posY})`}>
                  {/* Destello de 4 puntas como en la imagen */}
                  <path
                    d={`M 0 ${-sz * 2.2} Q 0 0 ${sz * 2.2} 0 Q 0 0 0 ${sz * 2.2} Q 0 0 ${-sz * 2.2} 0 Q 0 0 0 ${-sz * 2.2} Z`}
                    fill="#FFFFFF"
                    filter="url(#starFlare)"
                  />
                  <circle cx="0" cy="0" r={sz * 0.6} fill="#F5D061" />
                </g>
              );
            }
            return (
              <circle
                key={idx}
                cx={posX}
                cy={posY}
                r={s.r}
                fill="#FFFFFF"
                opacity="0.85"
              />
            );
          })}

          {/* Corona Superior de 3 Estrellas Flotantes (como en la imagen cargada) */}
          {/* Estrella Central Grande */}
          <g transform={`translate(${sphereCenterX}, ${sphereCenterY - sphereRadius - 38 - 10 * H})`}>
            <path
              d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z"
              fill="url(#goldRadiant)"
              filter="url(#starFlare)"
            />
            <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
          </g>

          {/* Estrella Izquierda Flotante */}
          <g transform={`translate(${sphereCenterX - 65}, ${sphereCenterY - sphereRadius - 20 - 8 * H})`}>
            <path
              d="M 0 -12 Q 0 0 12 0 Q 0 0 0 12 Q 0 0 -12 0 Q 0 0 0 -12 Z"
              fill="#F5D061"
              filter="url(#starFlare)"
            />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Estrella Derecha Flotante */}
          <g transform={`translate(${sphereCenterX + 65}, ${sphereCenterY - sphereRadius - 20 - 8 * H})`}>
            <path
              d="M 0 -12 Q 0 0 12 0 Q 0 0 0 12 Q 0 0 -12 0 Q 0 0 0 -12 Z"
              fill="#F5D061"
              filter="url(#starFlare)"
            />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Ramas de Olivo / Laurel Solarpunk en los costados de la esfera (como en el logo) */}
          {/* Rama Izquierda */}
          <g transform={`translate(${sphereCenterX - sphereRadius - 16}, ${sphereCenterY - 10}) scale(${leafScale})`}>
            <path
              d="M 0 50 Q -35 10 -15 -45 Q -5 -80 15 -110"
              fill="none"
              stroke="#7DB2B2"
              strokeWidth="2.5"
            />
            {/* Hojas */}
            <path d="M -15 35 Q -35 25 -25 15 C -15 25 -10 32 -15 35 Z" fill="#F5D061" stroke="#487075" strokeWidth="1" />
            <path d="M -22 0 Q -48 -8 -32 -20 C -20 -10 -18 -4 -22 0 Z" fill="#7DB2B2" stroke="#F5D061" strokeWidth="1" />
            <path d="M -12 -38 Q -38 -50 -20 -60 C -10 -50 -8 -42 -12 -38 Z" fill="#F5D061" stroke="#487075" strokeWidth="1" />
            <path d="M 5 -75 Q -15 -95 0 -105 C 10 -95 10 -82 5 -75 Z" fill="#7DB2B2" stroke="#F5D061" strokeWidth="1" />
          </g>

          {/* Rama Derecha */}
          <g transform={`translate(${sphereCenterX + sphereRadius + 16}, ${sphereCenterY - 10}) scale(${-leafScale}, ${leafScale})`}>
            <path
              d="M 0 50 Q -35 10 -15 -45 Q -5 -80 15 -110"
              fill="none"
              stroke="#7DB2B2"
              strokeWidth="2.5"
            />
            {/* Hojas */}
            <path d="M -15 35 Q -35 25 -25 15 C -15 25 -10 32 -15 35 Z" fill="#F5D061" stroke="#487075" strokeWidth="1" />
            <path d="M -22 0 Q -48 -8 -32 -20 C -20 -10 -18 -4 -22 0 Z" fill="#7DB2B2" stroke="#F5D061" strokeWidth="1" />
            <path d="M -12 -38 Q -38 -50 -20 -60 C -10 -50 -8 -42 -12 -38 Z" fill="#F5D061" stroke="#487075" strokeWidth="1" />
            <path d="M 5 -75 Q -15 -95 0 -105 C 10 -95 10 -82 5 -75 Z" fill="#7DB2B2" stroke="#F5D061" strokeWidth="1" />
          </g>

        </g>


        {/* =======================================================
            FIGURA HUMANA DORADA: LÍNEAS GEOMÉTRICAS SIN ROSTRO
            (Los músculos crecen con E, S, K y las piernas suben el cerro)
            ======================================================= */}
        <g id="goldenClimberFigure" filter="url(#goldGlow)">
          
          {/* 1. PIERNA TRASERA (IZQUIERDA) - Empuja desde la ladera baja */}
          {/* Muslo Trasero */}
          <polygon
            points={`
              ${hipX - 15},${hipY}
              ${leftKneeX - 10 - legBulk * 0.4},${leftKneeY - 5}
              ${leftKneeX + 12 + legBulk * 0.4},${leftKneeY + 5}
              ${hipX + 10},${hipY + 15}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Línea de tensión muscular del cuádriceps trasero */}
          <line
            x1={hipX - 2}
            y1={hipY + 6}
            x2={leftKneeX}
            y2={leftKneeY}
            stroke="#FFE57F"
            strokeWidth="1.5"
            strokeOpacity={fiberOpacity}
          />

          {/* Pantorrilla y Tendón de Aquiles Trasero */}
          <polygon
            points={`
              ${leftKneeX - 8},${leftKneeY}
              ${leftFootX - 12 - legBulk * 0.3},${leftFootY - 15}
              ${leftFootX + 14},${leftFootY - 12}
              ${leftKneeX + 10},${leftKneeY + 6}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Pie Trasero firmemente clavado en la roca */}
          <polygon
            points={`
              ${leftFootX - 14},${leftFootY - 10}
              ${leftFootX + 22},${leftFootY - 5}
              ${leftFootX + 18},${leftFootY + 6}
              ${leftFootX - 22},${leftFootY + 5}
            `}
            fill="#D49419"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />

          {/* 2. PIERNA DELANTERA (DERECHA) - Paso firme hacia arriba */}
          {/* Muslo Delantero Alto */}
          <polygon
            points={`
              ${hipX + 10},${hipY}
              ${rightKneeX - 10},${rightKneeY - 15 - legBulk * 0.5}
              ${rightKneeX + 16 + legBulk * 0.5},${rightKneeY + 10}
              ${hipX + 25},${hipY + 22}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Línea de fibra del recto femoral derecho */}
          <line
            x1={hipX + 18}
            y1={hipY + 10}
            x2={rightKneeX + 4}
            y2={rightKneeY}
            stroke="#FFE57F"
            strokeWidth="1.8"
            strokeOpacity={fiberOpacity}
          />

          {/* Pantorrilla Delantera */}
          <polygon
            points={`
              ${rightKneeX - 4},${rightKneeY + 8}
              ${rightFootX - 12 - legBulk * 0.3},${rightFootY - 12}
              ${rightFootX + 16 + legBulk * 0.3},${rightFootY - 10}
              ${rightKneeX + 14},${rightKneeY + 4}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Pie Delantero en apoyo dinámico */}
          <polygon
            points={`
              ${rightFootX - 12},${rightFootY - 8}
              ${rightFootX + 28},${rightFootY - 15}
              ${rightFootX + 32},${rightFootY + 4}
              ${rightFootX - 16},${rightFootY + 6}
            `}
            fill="#D49419"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />


          {/* 3. PELVIS Y ZONA CORE (ABDOMEN Y OBLICUOS) */}
          {/* Pelvis facetada */}
          <polygon
            points={`
              ${hipX - 22},${hipY - 15}
              ${hipX + 28},${hipY - 18}
              ${hipX + 20},${hipY + 20}
              ${hipX - 15},${hipY + 18}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />

          {/* Abdominales y cintura facetada (expande con K y P) */}
          {/* Nivel inferior de abdominales */}
          <polygon
            points={`
              ${hipX - 18 - coreBulk * 0.4},${hipY - 15}
              ${hipX + 24 + coreBulk * 0.4},${hipY - 18}
              ${chestX + 22 + coreBulk * 0.5},${chestY + 45}
              ${chestX - 20 - coreBulk * 0.5},${chestY + 45}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Línea central alba del abdomen */}
          <line
            x1={(hipX + 2)}
            y1={hipY - 16}
            x2={(chestX + 2)}
            y2={chestY + 12}
            stroke="#FFE57F"
            strokeWidth="1.6"
            strokeOpacity={fiberOpacity}
          />
          {/* Cortes transversales de abdominales */}
          <line
            x1={hipX - 10 - coreBulk * 0.3}
            y1={hipY - 32}
            x2={hipX + 16 + coreBulk * 0.3}
            y2={hipY - 34}
            stroke="url(#goldMetallic)"
            strokeWidth="1.2"
          />
          <line
            x1={chestX - 14 - coreBulk * 0.3}
            y1={chestY + 30}
            x2={chestX + 18 + coreBulk * 0.3}
            y2={chestY + 28}
            stroke="url(#goldMetallic)"
            strokeWidth="1.2"
          />


          {/* 4. PECHO / PECTORALES GRANDES (EXPANDEN CON FUERZA) */}
          {/* Pectoral Izquierdo */}
          <polygon
            points={`
              ${chestX + 2},${chestY + 14}
              ${chestX - 26 - coreBulk * 0.7},${chestY + 10}
              ${leftShoulderX + 15},${leftShoulderY + 12}
              ${neckX - 6},${neckY + 8}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Pectoral Derecho */}
          <polygon
            points={`
              ${chestX + 2},${chestY + 14}
              ${neckX - 2},${neckY + 8}
              ${rightShoulderX - 12},${rightShoulderY + 10}
              ${chestX + 32 + coreBulk * 0.7},${chestY + 8}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Esternón y Clavículas en V dorada */}
          <line
            x1={neckX}
            y1={neckY + 8}
            x2={chestX + 2}
            y2={chestY + 14}
            stroke="#FFF4D0"
            strokeWidth="2"
          />
          <line
            x1={neckX - 4}
            y1={neckY + 8}
            x2={leftShoulderX + 10}
            y2={leftShoulderY + 5}
            stroke="#F5D061"
            strokeWidth="1.8"
          />
          <line
            x1={neckX + 4}
            y1={neckY + 8}
            x2={rightShoulderX - 8}
            y2={rightShoulderY + 4}
            stroke="#F5D061"
            strokeWidth="1.8"
          />


          {/* 5. CUELLO Y CABEZA SIN ROSTRO (ESTILO EXACTO DE LA IMAGEN) */}
          {/* Cuello trapezoidal potente */}
          <polygon
            points={`
              ${neckX - 12},${neckY + 10}
              ${neckX + 14},${neckY + 10}
              ${headX + 6},${headY + 18}
              ${headX - 8},${headY + 18}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />

          {/* Cabeza: Óvalo / huevo de contorno dorado puro, sin rostro */}
          <ellipse
            cx={headX}
            cy={headY}
            rx={14 + 1.5 * P}
            ry={19 + 1.5 * P}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldRadiant)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Faceta de luz interior en la frente/corona sin rasgos faciales */}
          <path
            d={`M ${headX - 6} ${headY - 6} Q ${headX} ${headY - 12} ${headX + 6} ${headY - 6}`}
            fill="none"
            stroke="#FFF8DB"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />


          {/* 6. HOMBROS (DELTOIDES GIGANTES - CRECEN CON E) */}
          {/* Hombro Izquierdo (Deltoides Lateral + Anterior) */}
          <polygon
            points={`
              ${neckX - 6},${neckY + 8}
              ${leftShoulderX - shoulderBulk * 0.6},${leftShoulderY - 4}
              ${leftShoulderX - shoulderBulk * 0.9},${leftShoulderY + 18 + shoulderBulk * 0.4}
              ${leftShoulderX + 10},${leftShoulderY + 28}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Estría muscular del deltoides izquierdo */}
          <line
            x1={leftShoulderX - shoulderBulk * 0.4}
            y1={leftShoulderY + 2}
            x2={leftShoulderX + 2}
            y2={leftShoulderY + 22}
            stroke="#FFE57F"
            strokeWidth="1.6"
            strokeOpacity={fiberOpacity}
          />

          {/* Hombro Derecho (Deltoides Lateral + Anterior) */}
          <polygon
            points={`
              ${neckX + 6},${neckY + 8}
              ${rightShoulderX + 8},${rightShoulderY + 28}
              ${rightShoulderX + shoulderBulk * 0.9},${rightShoulderY + 18 + shoulderBulk * 0.4}
              ${rightShoulderX + shoulderBulk * 0.6},${rightShoulderY - 4}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Estría muscular del deltoides derecho */}
          <line
            x1={rightShoulderX + shoulderBulk * 0.4}
            y1={rightShoulderY + 2}
            x2={rightShoulderX - 2}
            y2={rightShoulderY + 22}
            stroke="#FFE57F"
            strokeWidth="1.6"
            strokeOpacity={fiberOpacity}
          />


          {/* 7. BRAZOS Y ANTEBRAZOS (CRECEN CON S, ELEVAN LA ESFERA) */}
          {/* Brazo Izquierdo (Bíceps / Tríceps) */}
          <polygon
            points={`
              ${leftShoulderX - shoulderBulk * 0.5},${leftShoulderY + 12}
              ${leftElbowX - armBulk * 0.6},${leftElbowY}
              ${leftElbowX + armBulk * 0.4},${leftElbowY + 16}
              ${leftShoulderX + 6},${leftShoulderY + 26}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Antebrazo Izquierdo hacia la esfera */}
          <polygon
            points={`
              ${leftElbowX - armBulk * 0.4},${leftElbowY}
              ${leftHandX - 8},${leftHandY + 4}
              ${leftHandX + 10},${leftHandY - 6}
              ${leftElbowX + armBulk * 0.4},${leftElbowY + 16}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Mano Izquierda sosteniendo firmemente la esfera */}
          <polygon
            points={`
              ${leftHandX - 10},${leftHandY + 2}
              ${leftHandX + 2},${leftHandY - 14}
              ${leftHandX + 16},${leftHandY - 6}
              ${leftHandX + 6},${leftHandY + 12}
            `}
            fill="#FFE47A"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Dedos izquierdos curvados sobre el borde de la esfera */}
          <path
            d={`M ${leftHandX - 6} ${leftHandY - 8} Q ${leftHandX + 4} ${leftHandY - 16} ${leftHandX + 12} ${leftHandY - 8}`}
            fill="none"
            stroke="#FFF8DB"
            strokeWidth="2.2"
          />

          {/* Brazo Derecho (Bíceps / Tríceps) */}
          <polygon
            points={`
              ${rightShoulderX + shoulderBulk * 0.5},${rightShoulderY + 12}
              ${rightShoulderX - 6},${rightShoulderY + 26}
              ${rightElbowX - armBulk * 0.4},${rightElbowY + 16}
              ${rightElbowX + armBulk * 0.6},${rightElbowY}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Antebrazo Derecho hacia la esfera */}
          <polygon
            points={`
              ${rightElbowX + armBulk * 0.4},${rightElbowY}
              ${rightElbowX - armBulk * 0.4},${rightElbowY + 16}
              ${rightHandX - 10},${rightHandY - 6}
              ${rightHandX + 8},${rightHandY + 4}
            `}
            fill="url(#muscleFacetFill)"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Mano Derecha sosteniendo firmemente la esfera */}
          <polygon
            points={`
              ${rightHandX + 10},${rightHandY + 2}
              ${rightHandX - 6},${rightHandY + 12}
              ${rightHandX - 16},${rightHandY - 6}
              ${rightHandX - 2},${rightHandY - 14}
            `}
            fill="#FFE47A"
            stroke="url(#goldMetallic)"
            strokeWidth={lineStrokeWidth}
          />
          {/* Dedos derechos curvados sobre el borde de la esfera */}
          <path
            d={`M ${rightHandX + 6} ${rightHandY - 8} Q ${rightHandX - 4} ${rightHandY - 16} ${rightHandX - 12} ${rightHandY - 8}`}
            fill="none"
            stroke="#FFF8DB"
            strokeWidth="2.2"
          />

        </g>

        {/* =======================================================
            RAYOS DE ENERGÍA Y LIFT DINÁMICOS
            (Conectan los hombros con la elevación del cosmos)
            ======================================================= */}
        {H > 0.6 && (
          <g opacity={((H - 0.6) / 0.4).toFixed(2)} filter="url(#goldGlow)">
            {/* Rayos dorados que irradian desde los hombros */}
            <line x1={leftShoulderX} y1={leftShoulderY} x2={sphereCenterX - 60} y2={sphereCenterY + 40} stroke="#F5D061" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1={chestX} y1={chestY} x2={sphereCenterX} y2={sphereCenterY + 50} stroke="#FFF8DB" strokeWidth="2" strokeDasharray="5 3" />
            <line x1={rightShoulderX} y1={rightShoulderY} x2={sphereCenterX + 60} y2={sphereCenterY + 40} stroke="#F5D061" strokeWidth="1.5" strokeDasharray="4 2" />
          </g>
        )}

      </svg>
    </div>
  );
}

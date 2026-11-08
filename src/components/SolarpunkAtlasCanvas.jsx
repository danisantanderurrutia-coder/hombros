import React from 'react';

/**
 * InstitutionalAtlasCanvas (Fondo Institucional de Cartografía Geodésica & Cuenca Hidrográfica)
 * Reemplaza el antiguo wallpaper por un fondo cartográfico sobrio, arquitectónico y científico:
 * - Curvas de nivel topográficas vectoriales (cuenca hidrográfica y cotas de altura).
 * - Red dendrítica de drenaje fluvial y líneas de flujo.
 * - Retícula geodésica UTM con marcas de cruz técnica en las intersecciones.
 * - Coordenadas marginales y metadatos del Sistema Metabólico Territorial.
 */
export default function SolarpunkAtlasCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. LIENZO ARQUITECTÓNICO DE BASE (TRAVERTINO PULIDO & ALABASTRO) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            linear-gradient(180deg, 
              #F8F6F1 0%, 
              #F5F2EC 40%, 
              #F3EFE7 80%,
              #F0EBE2 100%
            )
          `
        }}
      />

      {/* 2. GRADIENTE CENITAL SUAVE DE LUZ Y AMORTIGUACIÓN DE CONTRASTE */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 70%),
            radial-gradient(circle 900px at 85% 80%, rgba(72, 112, 117, 0.05) 0%, transparent 60%),
            radial-gradient(circle 800px at 15% 25%, rgba(146, 118, 96, 0.04) 0%, transparent 60%)
          `
        }}
      />

      {/* 3. CURVAS DE NIVEL TOPOGRÁFICAS VECTORIALES (TOPOGRAFÍA REAL DE CUENCA) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="#28475A" strokeWidth="0.8" opacity="0.16">
          {/* Curva de nivel 100m */}
          <path d="M-100,280 C240,240 480,320 720,290 C960,260 1200,340 1440,310 C1680,280 1880,330 2050,300" />
          {/* Curva de nivel 200m */}
          <path d="M-100,340 C220,300 460,390 700,360 C940,330 1180,410 1420,380 C1660,350 1860,400 2050,370" />
          {/* Curva de nivel 300m (Principal / Maestra) */}
          <path d="M-100,410 C200,370 440,460 680,430 C920,400 1160,480 1400,450 C1640,420 1840,470 2050,440" strokeWidth="1.3" opacity="0.25" />
          {/* Curva de nivel 400m */}
          <path d="M-100,490 C180,450 420,540 660,510 C900,480 1140,560 1380,530 C1620,500 1820,550 2050,520" />
          {/* Curva de nivel 500m */}
          <path d="M-100,580 C160,540 400,630 640,600 C880,570 1120,650 1360,620 C1600,590 1800,640 2050,610" />
          {/* Curva de nivel 600m (Principal / Maestra) */}
          <path d="M-100,680 C140,640 380,730 620,700 C860,670 1100,750 1340,720 C1580,690 1780,740 2050,710" strokeWidth="1.3" opacity="0.25" />
          {/* Curva de nivel 700m */}
          <path d="M-100,790 C120,750 360,840 600,810 C840,780 1080,860 1320,830 C1560,800 1760,850 2050,820" />
          {/* Curva de nivel 800m */}
          <path d="M-100,910 C100,870 340,960 580,930 C820,900 1060,980 1300,950 C1540,920 1740,970 2050,940" />

          {/* Círculos concéntricos de cumbre montañosa / parteaguas */}
          <ellipse cx="1520" cy="220" rx="280" ry="140" opacity="0.14" />
          <ellipse cx="1520" cy="220" rx="200" ry="100" opacity="0.18" />
          <ellipse cx="1520" cy="220" rx="120" ry="60" strokeWidth="1.2" opacity="0.22" />
          <ellipse cx="1520" cy="220" rx="50" ry="25" opacity="0.28" />

          {/* Macizo secundario en ladera poniente */}
          <ellipse cx="320" cy="850" rx="260" ry="120" opacity="0.14" />
          <ellipse cx="320" cy="850" rx="180" ry="80" opacity="0.18" />
          <ellipse cx="320" cy="850" rx="90" ry="40" strokeWidth="1.2" opacity="0.22" />
        </g>

        {/* Ejes de drenaje fluvial / Red de cuenca */}
        <g fill="none" stroke="#487075" strokeWidth="1.1" opacity="0.22" strokeDasharray="3 4">
          <path d="M1520,220 C1400,380 1280,520 1150,680 C1020,820 860,940 720,1080" />
          <path d="M980,450 C1040,520 1100,600 1150,680" />
          <path d="M1380,560 C1280,620 1200,660 1150,680" />
        </g>
      </svg>

      {/* 4. RETÍCULA CARTOGRÁFICA GEODÉSICA CON MARCAS DE INTERSECCIÓN (+) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cartoGeoGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Líneas sutiles de cuadrícula */}
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(40, 71, 90, 0.08)" strokeWidth="0.75" />
            
            {/* Cruz de mira de precisión cartográfica en el nodo (+) */}
            <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="rgba(40, 71, 90, 0.28)" strokeWidth="0.9" />
            <path d="M 115 0 L 125 0 M 120 -5 L 120 5" stroke="rgba(40, 71, 90, 0.28)" strokeWidth="0.9" />
            <path d="M -5 120 L 5 120 M 0 115 L 0 125" stroke="rgba(40, 71, 90, 0.28)" strokeWidth="0.9" />
            <path d="M 115 120 L 125 120 M 120 115 L 120 125" stroke="rgba(40, 71, 90, 0.28)" strokeWidth="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cartoGeoGrid)" />
      </svg>

      {/* 5. METADATOS TÉCNICOS & COORDENADAS MARGINALES INSTITUCIONALES */}
      <div className="absolute top-2 left-6 text-[10px] font-mono font-bold tracking-widest text-[#28475A]/70 flex items-center gap-3 bg-white/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-[#D4C9B8]/70 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
        <span>33° 26' 16" S · 70° 39' 01" W</span>
        <span>•</span>
        <span>SISTEMA METABÓLICO HOMBROS</span>
        <span>•</span>
        <span>CARTOGRAFÍA DE CUENCAS</span>
      </div>

      <div className="absolute bottom-2 left-6 text-[10px] font-mono font-bold tracking-widest text-[#28475A]/70 flex items-center gap-3 bg-white/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-[#D4C9B8]/70 shadow-xs">
        <span>DATUM: WGS-84 / SIRGAS-CHILE</span>
        <span>•</span>
        <span>ESCALA TOPOGRÁFICA 1:25.000</span>
        <span>•</span>
        <span>RED HIDROGRÁFICA CONTINUA</span>
      </div>
    </div>
  );
}

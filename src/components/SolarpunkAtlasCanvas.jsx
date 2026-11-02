import React from 'react';

/**
 * SolarpunkAtlasCanvas
 * Fondo cartográfico vivo de alta gama ("Formal Increíble").
 * Combina curvas de nivel topográficas (isobaras de cuenca), redes dendríticas de ríos,
 * filigrana de latitud/longitud, atmósfera solar cálida y micro-partículas bioluminiscentes.
 */
export default function SolarpunkAtlasCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Gradient: Atmósfera Solar Travertino & Celadón */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(125, 178, 178, 0.28) 0%, transparent 65%),
            radial-gradient(circle 900px at 5% 30%, rgba(200, 109, 81, 0.16) 0%, transparent 60%),
            radial-gradient(circle 1000px at 95% 65%, rgba(72, 112, 117, 0.22) 0%, transparent 60%),
            radial-gradient(circle 800px at 50% 90%, rgba(212, 163, 115, 0.18) 0%, transparent 65%),
            linear-gradient(180deg, #F5F2EB 0%, #EDE6D8 100%)
          `
        }}
      />

      {/* 2. Topographic Elevation Waves (Curvas de Nivel Topográficas Vectoriales) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-45"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="contourGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#487075" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7DB2B2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4A373" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="contourGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C86D51" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#D4A373" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#487075" stopOpacity="0.35" />
          </linearGradient>

          <pattern id="cartoFineGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(146, 118, 96, 0.07)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(146, 118, 96, 0.15)" />
            <circle cx="60" cy="60" r="1.5" fill="rgba(146, 118, 96, 0.15)" />
          </pattern>
        </defs>

        {/* Retícula Cartográfica Fina */}
        <rect width="100%" height="100%" fill="url(#cartoFineGrid)" />

        {/* Ondas Topográficas de Cuenca (Isohipsas / Curvas de Nivel) */}
        <g fill="none" strokeWidth="1.2">
          {/* Nivel 100m */}
          <path
            d="M -100,120 Q 300,60 650,180 T 1500,100"
            stroke="url(#contourGrad1)"
            strokeDasharray="4,2"
          />
          {/* Nivel 200m */}
          <path
            d="M -80,200 Q 280,140 700,250 T 1550,190"
            stroke="url(#contourGrad1)"
          />
          {/* Nivel 300m */}
          <path
            d="M -120,290 Q 320,220 740,330 T 1520,280"
            stroke="url(#contourGrad1)"
            strokeWidth="1.8"
          />
          {/* Nivel 400m */}
          <path
            d="M -60,370 Q 350,300 780,410 T 1560,360"
            stroke="url(#contourGrad1)"
          />
          {/* Nivel 500m (Línea Maestra de Cuenca) */}
          <path
            d="M -100,460 Q 400,380 820,500 T 1540,450"
            stroke="url(#contourGrad2)"
            strokeWidth="2.2"
          />
          {/* Nivel 600m */}
          <path
            d="M -80,550 Q 420,480 880,590 T 1580,540"
            stroke="url(#contourGrad2)"
          />
          {/* Nivel 700m */}
          <path
            d="M -120,640 Q 460,570 920,680 T 1520,630"
            stroke="url(#contourGrad2)"
            strokeDasharray="5,3"
          />
          {/* Nivel 800m */}
          <path
            d="M -60,730 Q 500,660 980,770 T 1560,720"
            stroke="url(#contourGrad2)"
          />
          {/* Nivel 900m */}
          <path
            d="M -100,820 Q 540,750 1020,850 T 1540,810"
            stroke="url(#contourGrad2)"
            strokeWidth="1.6"
          />
        </g>

        {/* Dendritas Fluviales (Ríos de Cuenca en Celadón Vivo) */}
        <g fill="none" stroke="#7DB2B2" strokeWidth="1.6" opacity="0.65" strokeLinecap="round">
          {/* Río Troncal Principal */}
          <path d="M 1480,120 Q 1100,320 780,460 T 100,880" strokeWidth="2.4" />
          {/* Afluente Derecho */}
          <path d="M 1250,30 Q 1020,180 850,340" strokeWidth="1.4" />
          {/* Afluente Izquierdo */}
          <path d="M 960,650 Q 720,620 540,710" strokeWidth="1.2" />
        </g>

        {/* Rosa de los Vientos Cartográfica en Filigrana de Latón (Margen Inferior Derecho) */}
        <g transform="translate(1320, 780)" opacity="0.32" stroke="#927660" fill="none">
          <circle cx="0" cy="0" r="48" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="0" cy="0" r="36" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="2" fill="#927660" />
          <line x1="0" y1="-56" x2="0" y2="56" strokeWidth="1.2" />
          <line x1="-56" y1="0" x2="56" y2="0" strokeWidth="1.2" />
          <polygon points="0,-48 4,-12 0,-4" fill="#927660" />
          <polygon points="0,-48 -4,-12 0,-4" fill="#C86D51" />
          <polygon points="0,48 4,12 0,4" fill="#927660" />
          <polygon points="48,0 12,4 4,0" fill="#927660" />
          <polygon points="-48,0 -12,-4 -4,0" fill="#927660" />
          <text x="-4" y="-60" className="text-[10px] font-serif font-bold fill-[#927660]">N</text>
          <text x="-4" y="68" className="text-[10px] font-serif font-bold fill-[#927660]">S</text>
          <text x="62" y="4" className="text-[10px] font-serif font-bold fill-[#927660]">E</text>
          <text x="-70" y="4" className="text-[10px] font-serif font-bold fill-[#927660]">W</text>
        </g>
      </svg>

      {/* 3. Coordenadas Marginales de Atlas en los Bordes */}
      <div className="absolute top-2 left-6 text-[9px] font-mono font-bold tracking-widest text-[#927660]/40 flex items-center gap-4">
        <span>33° 26' 16" S · 70° 39' 01" W</span>
        <span>•</span>
        <span>SISTEMA METABÓLICO HOMBROS</span>
        <span>•</span>
        <span>ESCALA 1:25.000 (CUENCA BIOMÉTRICA)</span>
      </div>

      <div className="absolute bottom-2 left-6 text-[9px] font-mono font-bold tracking-widest text-[#927660]/40 flex items-center gap-4">
        <span>DATUM: WGS-84 / SIRGAS-CHILE</span>
        <span>•</span>
        <span>TERMODINÁMICA ABIERTA & MEDIOS CONTINUOS</span>
      </div>

      {/* 4. Micro-Partículas Bioluminiscentes Vivas (Polvo Solar Flotante) */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="bio-mote bio-mote-1" />
        <span className="bio-mote bio-mote-2" />
        <span className="bio-mote bio-mote-3" />
        <span className="bio-mote bio-mote-4" />
        <span className="bio-mote bio-mote-5" />
        <span className="bio-mote bio-mote-6" />
      </div>
    </div>
  );
}

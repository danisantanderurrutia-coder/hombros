import React from 'react';
import { getAssetUrl } from '../utils/assets';

/**
 * SolarpunkAtlasCanvas (Propuesta 2: Paisaje Panorámico Inmersivo "Formal Increíble")
 * Muestra el paisaje panorámico continuo de cuenca agroecológica (terrazas de travertino,
 * acueducto, río celadón y cumbres andinas al amanecer) con velo arquitectónico de vellum,
 * coordenadas marginales geodésicas y partículas de polvo solar flotante.
 */
export default function SolarpunkAtlasCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. PAISAJE PANORÁMICO REALISTA ULTRA-WIDE */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={getAssetUrl('art/solarpunk_panoramic_canvas.jpg')}
          alt="Paisaje Panorámico Solarpunk Hombros"
          className="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.04]"
        />
      </div>

      {/* 2. VELO ARQUITECTÓNICO VELLUM / CRISTAL TRAVERTINO Y CELADÓN */}
      {/* Garantiza legibilidad 100% nítida de los datos mientras el paisaje respira alrededor */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(245, 242, 235, 0.60) 0%, 
              rgba(245, 242, 235, 0.42) 35%, 
              rgba(237, 230, 216, 0.58) 75%,
              rgba(232, 224, 209, 0.75) 100%
            ),
            radial-gradient(ellipse 90% 60% at 50% -10%, rgba(125, 178, 178, 0.20) 0%, transparent 60%),
            radial-gradient(circle 800px at 90% 70%, rgba(72, 112, 117, 0.15) 0%, transparent 65%)
          `,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }}
      />

      {/* 3. FILIGRANA DE RETÍCULA CARTOGRÁFICA DE CAMPO */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cartoFineGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(146, 118, 96, 0.12)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(72, 112, 117, 0.25)" />
            <circle cx="80" cy="80" r="1.5" fill="rgba(72, 112, 117, 0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cartoFineGrid)" />
      </svg>

      {/* 4. COORDENADAS MARGINALES Y COTAS DE ATLAS EN LOS BORDES */}
      <div className="absolute top-2 left-6 text-[10px] font-mono font-extrabold tracking-widest text-[#28475A]/60 flex items-center gap-4 bg-white/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/40 shadow-2xs">
        <span>33° 26' 16" S · 70° 39' 01" W</span>
        <span>•</span>
        <span>SISTEMA METABÓLICO HOMBROS</span>
        <span>•</span>
        <span>CUENCA AGROECOLÓGICA · ESCALA 1:25.000</span>
      </div>

      <div className="absolute bottom-2 left-6 text-[10px] font-mono font-extrabold tracking-widest text-[#28475A]/60 flex items-center gap-4 bg-white/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/40 shadow-2xs">
        <span>DATUM: WGS-84 / SIRGAS-CHILE</span>
        <span>•</span>
        <span>TERMODINÁMICA ABIERTA & MEDIOS CONTINUOS</span>
      </div>

      {/* 5. MICRO-PARTÍCULAS BIOLUMINISCENTES VIVAS (POLVO SOLAR FLOTANTE) */}
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

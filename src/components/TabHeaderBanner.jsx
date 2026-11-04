import React from 'react';
import { Activity, Globe, GitCompare, Layers, Database, BookOpen, Compass, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

const TAB_METADATA = {
  core: {
    tag: 'MOTOR MATEMÁTICO & REOLÓGICO DEL MODELO HOMBROS',
    title: 'CORE · El Corazón Constitutivo del Modelo Territorial',
    subtitle: 'Este es el CORE del modelo HOMBROS donde operan sus ecuaciones biofísicas fundamentales. Incluye brevemente: (1) Capacidad Portante y Trípode de Liebig (H), (2) Tensión Sistémica y Curva Esfuerzo-Deformación (σ), (3) Tasa Sintrópica (Γ), (4) Simulador Prospectivo a 36 meses y (5) Vista del Organismo Integrado.',
    image: getAssetUrl('art/header_core_agroecology.jpg'),
    icon: Activity,
    accent: '#7DB2B2',
  },
  audit: {
    tag: 'PROTOCOLO SEIA 2.0, HIPÓTESIS DE CUENCA & ROI BIOFÍSICO',
    title: 'Auditoría de Tracción Territorial, Hipótesis de Hombros & Dictamen Pre-Inversional',
    subtitle: 'Formulación de hipótesis paramétricas [0, 1], ensayo de tracción pre-inversión (σ₀ → σ_proj), conector de telemetría AgriTwin y calculadora de Costo de Inacción vs. Inversión Sintrópica.',
    image: getAssetUrl('art/header_cases_metrics.jpg'),
    icon: GitCompare,
    accent: '#C86D51',
  },
  articles: {
    tag: 'INCIDENCIA LEGISLATIVA, REFORMA AL SEIA & ENSAYOS OLCA',
    title: 'Artículos de Política Pública, Reforma al SEIA 2.0 & Tetralogía OLCA',
    subtitle: 'Propuesta estrella de Reforma Estructural a la Ley 19.300 (Cláusula de Salvaguarda Pre-Inversional), 4 Policy Briefs adaptados de los ensayos publicados en el OLCA y arquitectura de integración con AgriTwin.',
    image: getAssetUrl('art/header_theory_library.jpg'),
    icon: BookOpen,
    accent: '#28475A',
  },
  world_map: {
    tag: 'ATLAS GEODÉSICO, SEMÁFORO DE CIUDADES & CONTRASTE GLOBAL',
    title: 'Atlas Territorial, Semáforo Operativo Situado & Metabolismo',
    subtitle: 'Cartografía orbital, Semáforo Biofísico en 25 ciudades de Chile Central y Europa, contraste empírico multi-sitio, desplazamiento de emisiones Scope 1-3, Red Panal y fuentes de datos abiertas.',
    image: getAssetUrl('art/header_world_watershed.jpg'),
    icon: Globe,
    accent: '#487075',
  },
  cases: {
    tag: 'TALLER DE INGENIERÍA ECOLÓGICA',
    title: 'Contraste Multimodelo y Diagnóstico de Resiliencia',
    subtitle: 'Evaluación comparativa entre modelos tradicionales de vulnerabilidad y la mecánica de medios continuos de Hombros.',
    image: getAssetUrl('art/header_cases_metrics.jpg'),
    icon: GitCompare,
    accent: '#927660',
  },
  scenarios: {
    tag: 'PROSPECTIVA Y RESTAURACIÓN DE PAISAJES',
    title: 'Simulador de Escenarios y Transición Regenerativa',
    subtitle: 'Proyecciones estocásticas ante shocks climáticos, variación de precipitaciones y desescalada extractiva.',
    image: getAssetUrl('art/header_scenarios_future.jpg'),
    icon: Layers,
    accent: '#C86D51',
  },
  data_sources: {
    tag: 'ESTACIÓN HIDROLÓGICA Y AMBIENTAL',
    title: 'Fuentes de Datos Abiertos y Trazabilidad Empírica',
    subtitle: 'Monitoreo territorial grounded: registros climáticos, sensores de cuenca y metadatos verificados.',
    image: getAssetUrl('art/header_data_sources.jpg'),
    icon: Database,
    accent: '#28475A',
  },
  theory: {
    tag: 'BIBLIOTECA VIVA DEL BOSQUE',
    title: 'Marco Epistémico y Genealogía de Pensamiento',
    subtitle: 'Sustento conceptual sobre hombros de gigantes: bioeconomía, termodinámica abierta, buen vivir y ecología política.',
    image: getAssetUrl('art/header_theory_library.jpg'),
    icon: BookOpen,
    accent: '#BFA588',
  },
};

export default function TabHeaderBanner({ activeTab }) {
  const meta = TAB_METADATA[activeTab] || TAB_METADATA.core;
  const Icon = meta.icon;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#D4C9B8]/80 shadow-md mb-8 group bg-[#EDE8DC]">
      {/* Background Image */}
      <div className="relative h-44 sm:h-52 md:h-60 w-full overflow-hidden">
        <img 
          src={meta.image} 
          alt={meta.title} 
          className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.05] group-hover:scale-102 transition-transform duration-700"
          onError={(e) => {
            const fallback = getAssetUrl('art/header_core_agroecology.jpg');
            if (e.target.src !== fallback) {
              e.target.src = fallback;
            }
          }}
        />
        
        {/* Soft Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16202A]/90 via-[#1E293B]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16202A]/85 via-transparent to-[#16202A]/30 pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/40 backdrop-blur-md border border-white/20 text-[#7FDBDA] shadow-sm">
            <Icon className="w-3 h-3 text-[#7FDBDA]" />
            {meta.tag}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {meta.title}
        </h1>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-200/90 max-w-2xl leading-relaxed font-sans hidden sm:block drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          {meta.subtitle}
        </p>
      </div>

      {/* Travertine bottom rim */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#2B6CB0] via-[#7FDBDA] to-[#FAF8F5]" />
    </div>
  );
}

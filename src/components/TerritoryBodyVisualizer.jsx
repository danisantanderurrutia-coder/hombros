import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Activity, Compass, Wind, Droplets, Trees, Users, Mountain,
  Sparkles, AlertTriangle, ShieldCheck, Flame, ArrowRight, CheckCircle2,
  Maximize2, Eye, RefreshCw, Zap, Scale, HeartHandshake, HelpCircle
} from 'lucide-react';
import { InlineMath, BlockMath } from './KaTeXMath';
import { getAssetUrl } from '../utils/assets';

export default function TerritoryBodyVisualizer({ santanderState, territory }) {
  // Modo de visualización: 'mirror' (Espejo Mujer ⇄ Cuenca) | 'volumetric' (Capas Isométricas 3D) | 'stress_continuum' (Medio Continuo) | 'state_manifold' (Variedad de Estados) | 'dissipative' (Estructura Disipativa)
  const [activeMode, setActiveMode] = useState('mirror');
  const [selectedLayerId, setSelectedLayerId] = useState('shoulders_cities');
  
  // Controles dinámicos para el simulador de cuerpo
  const [appliedStress, setAppliedStress] = useState(santanderState?.sigma || 0.72);
  const [extractivismLoad, setExtractivismLoad] = useState(50); // 0 a 100
  const [governancePact, setGovernancePact] = useState(true);
  const [activeMetabolicPulse, setActiveMetabolicPulse] = useState(true);

  // Puntos de Acople en Espejo Anatómico (Mujer ⇄ Cuenca)
  const MIRROR_HOTSPOTS = [
    {
      id: 'shoulders_cities',
      name: '1. Hombros & Músculos ⇄ Ciudades Policéntricas & Red Vial',
      humanPart: 'Cintura Escapular (Hombros, Trapecio, Deltoides) y Fascia Muscular',
      basinPart: 'Ciudades de Cuenca (Parral, Cauquenes, Chanco) y Red Conectiva Vial/Puentes',
      humanDesc: 'Los hombros y la musculatura esquelética reciben y distribuyen la tracción mecánica. Soportan las cargas vitales de trabajo y cuidado sin desgarro ni fractura mientras rige el régimen elástico.',
      basinDesc: 'La cuenca no es mononodal: integra una red policéntrica de ciudades (un centro de valle como Parral, núcleos de secano-costa como Cauquenes y Chanco, y caseríos rurales). Las carreteras y puentes actúan como fascia y tendones que sostienen la movilidad metabólica.',
      hombroVar: 'Sección Portante H = (E · S · K)^{1/3} · Capacidad de Carga',
      color: '#f59e0b',
      humanCoords: 'top-[22%] left-[50%] -translate-x-1/2',
      basinCoords: 'top-[48%] left-[45%]'
    },
    {
      id: 'lungs_atmosphere',
      name: '2. Pulmones & Árbol Bronquial ⇄ Atmósfera, Brisas & Canopia',
      humanPart: 'Pulmones Translúcidos, Tráquea y Alvéolos con Intercambio Gaseoso',
      basinPart: 'Envoltura Atmosférica, Brisas Marinas/Orográficas y Bosque Nativo',
      humanDesc: 'Los pulmones inhalan oxígeno y disipan calor metabólico y CO₂ a través de una superficie alveolar ramificada de 70 m².',
      basinDesc: 'La masa de aire de la cuenca, regulada por las masas boscosas nativas y las brisas de la cordillera a la costa, limpia micropartículas PM2.5 y disipa la saturación térmica del valle.',
      hombroVar: 'E_3 (Calidad del Aire / Dispersión PM2.5) + E_2 (Canopia Nativa)',
      color: '#38bdf8',
      humanCoords: 'top-[30%] left-[50%] -translate-x-1/2',
      basinCoords: 'top-[25%] left-[30%]'
    },
    {
      id: 'heart_rivers',
      name: '3. Corazón & Sistema Vascular ⇄ Red de Ríos, Embalse & Acuíferos',
      humanPart: 'Corazón Pulsátil y Vasos Sanguíneos (Arterias Carmesí y Venas Cian)',
      basinPart: 'Nieve Cordillerana, Río Longaví, Embalse Bullileo y Napas Subterráneas',
      humanDesc: 'La bomba cardíaca impulsa 5 litros de sangre por minuto a través de miles de kilómetros de capilares, llevando agua, electrolitos y nutrientes a cada célula viva.',
      basinDesc: 'El caudal continuo del río y la recarga de los acuíferos profundos alimentan a los 5 Comités de Agua Potable Rural (APR). Si se sobreotorgan derechos de agua (DAA), el sistema sufre una hemorragia por desecación.',
      hombroVar: 'E_1 (Estrés Hídrico de Cuenca / Falkenmark > 2.500 m³)',
      color: '#ef4444',
      humanCoords: 'top-[36%] left-[52%] -translate-x-1/2',
      basinCoords: 'top-[42%] left-[60%]'
    },
    {
      id: 'digestive_soil',
      name: '4. Sistema Digestivo & Microbiota ⇄ Suelo Vivo, Materia Orgánica & Keyline',
      humanPart: 'Aparato Digestivo, Hígado y Microbioma Simbiótico Intestinal',
      basinPart: 'Suelo Vivo Arado en Curvas de Nivel (Keyline), Humus y Micorrizas',
      humanDesc: 'El intestino digiere la biomasa exterior transformándola en energía bio-disponible gracias a trillones de bacterias simbióticas.',
      basinDesc: 'El suelo vivo es el estómago de la cuenca: transforma la roca mineral y los rastrojos en humus fértil que retiene hasta 8 veces su peso en agua (capacidad de campo), evitando la erosión por arrastre.',
      hombroVar: 'E_4 (Salud Edáfica / Retención Hídrica en Perfil)',
      color: '#10b981',
      humanCoords: 'top-[48%] left-[50%] -translate-x-1/2',
      basinCoords: 'top-[60%] left-[38%]'
    },
    {
      id: 'nervous_care',
      name: '5. Sistema Nervioso & Vínculos de Apego ⇄ Redes APR & Gobernanza Comunitaria',
      humanPart: 'Médula Espinal, Sistema Neurovegetativo y Vínculos de Afecto/Cuidado',
      basinPart: 'Comités APR, Juntas Vecinales, Economía del Cuidado y Gobernanza Ostrom',
      humanDesc: 'El sistema nervioso regula la homeostasis interna y transmite señales de dolor o alerta ante lesiones, modulando el gasto de energía mediante empatía y apego.',
      basinDesc: 'La autogestión comunitaria del agua (APRs) y la economía campesina del cuidado ($S_1$) son el cerebro y corazón social de la cuenca, aportando el factor de amortiguación institucional $\\kappa$ que previene el colapso.',
      hombroVar: 'S_1 (Tiempo de Cuidado) + S_4 (Tejido APR) + \\kappa (Gobernanza Ostrom)',
      color: '#d946ef',
      humanCoords: 'top-[42%] left-[50%] -translate-x-1/2',
      basinCoords: 'top-[50%] left-[52%]'
    }
  ];

  const activeHotspot = MIRROR_HOTSPOTS.find(h => h.id === selectedLayerId) || MIRROR_HOTSPOTS[0];

  // Cálculo del régimen mecánico según el estrés aplicado
  const currentRegime = appliedStress < 0.85
    ? { name: 'Elástico (Respiración Homeostática)', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', tag: 'AAA/AA' }
    : appliedStress < 1.00
    ? { name: 'Fluencia (Fatiga Silenciosa de Materiales)', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/40', tag: 'B' }
    : appliedStress < 1.25
    ? { name: 'Deformación Plástica (Herida Ecosistémica Irreversible)', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/40', tag: 'C' }
    : { name: 'Fractura Catastrófica (Colapso / Zona de Sacrificio)', color: 'text-red-500 font-bold', bg: 'bg-red-500/20', border: 'border-red-500/70', tag: 'D' };

  // Estratos Anatómicos del Cuerpo Territorial
  const STRATA_LAYERS = [
    {
      id: 'atmosphere',
      name: '1. Envoltura Atmosférica & Radiación',
      biologicalAnalogy: 'Los Pulmones & Respiración Térmica',
      description: 'Regula la insolación solar, evapotranspiración potencial, dispersión de aerosoles y ciclo del carbono/oxígeno.',
      hombroVar: 'E₃ (Calidad del Aire / PM2.5)',
      color: '#38bdf8',
      depth: '0 a 2.000 m s.n.m.',
      icon: Wind,
      organState: appliedStress > 1.0 ? 'Saturación térmica y micropartículas retenidas' : 'Dispersión y brisas limpias'
    },
    {
      id: 'canopy',
      name: '2. Canopia & Cobertura Vegetal Viva',
      biologicalAnalogy: 'La Piel Fotosintética & Sistema Inmune',
      description: 'El manto de bosque nativo y policultivo que amortigua el impacto de la lluvia, retiene humedad y modula el albedo.',
      hombroVar: 'E₂ (Vegetación Nativa > 60%)',
      color: '#4ade80',
      depth: 'Estrato aéreo superior',
      icon: Trees,
      organState: appliedStress > 1.2 ? 'Desprendimiento por tala y monocultivo pirófito' : 'Tejido vivo esclerófilo denso'
    },
    {
      id: 'social',
      name: '3. Asentamientos, Cuidados & Redes Comunitarias',
      biologicalAnalogy: 'El Sistema Nervioso & Tejido Sensitivo',
      description: 'Comités de Agua Potable Rural (APR), economía del cuidado, tiempo de vida compartida y gobernanza colectiva de Ostrom.',
      hombroVar: 'S₁ (Cuidado) + S₄ (Tejido Asociativo APR)',
      color: '#f43f5e',
      depth: 'Superficie habitada',
      icon: Users,
      organState: appliedStress > 1.0 ? 'Precarización laboral y sobreendeudamiento' : 'Gobernanza policéntrica activa'
    },
    {
      id: 'soil',
      name: '4. Suelo Vivo & Ecosfera de Infiltración',
      biologicalAnalogy: 'El Aparato Digestivo & Esponja Muscular',
      description: 'Estructura edáfica viva (materia orgánica, micorrizas, capacidad de campo). Transforma la roca inerte en alimento y agua retenida.',
      hombroVar: 'E₄ (Capacidad de Campo / Retención Edáfica)',
      color: '#d97706',
      depth: '0 a 2 metros de perfil fértil',
      icon: Sparkles,
      organState: appliedStress > 0.85 ? 'Compactación por maquinaria y pérdida de materia orgánica' : 'Estructura grumosa Keyline viva'
    },
    {
      id: 'aquifer',
      name: '5. Acuífero Subterráneo & Basamento Geológico',
      biologicalAnalogy: 'El Sistema Circulatorio Profundo & Esqueleto',
      description: 'Napas freáticas profundas, roca madre fracturada y almacenamiento milenario que sostiene el caudal base de estío.',
      hombroVar: 'E₁ (Balance Hídrico Falkenmark > 2.500 m³)',
      color: '#0284c7',
      depth: 'Subsuelo profundo (-10 a -300 m)',
      icon: Droplets,
      organState: appliedStress > 1.1 ? 'Napa deprimida por sobreotorgamiento de DAA' : 'Recarga freática en equilibrio'
    }
  ];

  const selectedLayer = STRATA_LAYERS.find(l => l.id === selectedLayerId) || STRATA_LAYERS[3];

  return (
    <div className="space-y-8">
      {/* =========================================================================
          HERO BANNER: EL TERRITORIO NO ES UN PLANO CARTESIANO, ES UN CUERPO VIVO
          ========================================================================= */}
      <div className="card-magenta rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#D83F87]/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-[#D83F87]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-[#376E6F] text-white shadow-lg shrink-0">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-700 text-white shadow-xs">
                  Anatomía Bio-Digital 3D
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#376E6F] text-white shadow-xs">
                  Física de Medios Continuos & No-Equilibrio
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-black">
                El Territorio como Cuerpo: Corporeidad del Ecosistema
              </h1>
              <p className="text-xs sm:text-sm mt-1 text-black font-medium max-w-3xl leading-relaxed">
                Superando la ceguera del "plano cartesiano 2D": El territorio posee <strong className="font-bold">volumen, espesor biológico, circulación sanguínea (hidrología), piel (canopia), órganos digestivos (suelo vivo) y memoria física ante el estrés</strong>.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-[#D4C9B8] shadow-sm">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Tensión Basal</span>
              <span className="text-lg font-serif font-bold text-slate-900">σ = {appliedStress.toFixed(3)}</span>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${currentRegime.bg} ${currentRegime.color} ${currentRegime.border}`}>
              {currentRegime.tag}
            </div>
          </div>
        </div>

        {/* Selector de Modos de Corporeidad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-[#D4C9B8]/70 relative z-10">
          <button
            onClick={() => setActiveMode('mirror')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeMode === 'mirror'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md border border-amber-300 ring-2 ring-amber-400/40'
                : 'bg-white/80 text-slate-800 hover:bg-white border border-[#D4C9B8]'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-500" />
            <span>★ Espejo Mujer ⇄ Cuenca</span>
          </button>

          <button
            onClick={() => setActiveMode('volumetric')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeMode === 'volumetric'
                ? 'bg-[#376E6F] text-white border border-[#254b4c] shadow-md'
                : 'bg-white/80 text-slate-800 hover:bg-white border border-[#D4C9B8]'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>2. Estratos del Cuerpo (3D)</span>
          </button>

          <button
            onClick={() => setActiveMode('stress_continuum')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeMode === 'stress_continuum'
                ? 'bg-[#D83F87] text-white border border-[#9b1d56] shadow-md'
                : 'bg-white/80 text-slate-800 hover:bg-white border border-[#D4C9B8]'
            }`}
          >
            <Activity className="w-4 h-4 text-pink-300" />
            <span>3. Medio Continuo</span>
          </button>

          <button
            onClick={() => setActiveMode('state_manifold')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeMode === 'state_manifold'
                ? 'bg-[#8D69A6] text-white border border-[#583971] shadow-md'
                : 'bg-white/80 text-slate-800 hover:bg-white border border-[#D4C9B8]'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-300" />
            <span>4. Variedad de Estados</span>
          </button>

          <button
            onClick={() => setActiveMode('dissipative')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeMode === 'dissipative'
                ? 'bg-[#C86D51] text-white border border-[#8f3a1f] shadow-md'
                : 'bg-white/80 text-slate-800 hover:bg-white border border-[#D4C9B8]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>5. Estructura Disipativa</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODO 1: VISOR BIO-DIGITAL EN ESPEJO (MUJER ⇄ CUENCA TERRITORIAL)
          ========================================================================= */}
      {activeMode === 'mirror' && (
        <div className="space-y-6">
          {/* Header de la Lámina en Espejo */}
          <div className="card-slate rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-400/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Lámina Bio-Digital Da Vinci
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-emerald-400/30">
                    Isomorfismo Anatómico
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-extrabold text-white">
                  Anatomía Comparada: El Cuerpo de la Mujer y la Corporeidad del Territorio
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
                Punto Activo: <span className="font-bold text-white">{activeHotspot.name.split('·')[0]}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              El modelo HOMBROS demuestra que un territorio <strong className="text-white">no es una superficie bidimensional para la extracción de rentas</strong>, sino un organismo vivo equivalente al cuerpo humano: posee <strong className="text-amber-300">hombros y músculos</strong> que cargan el peso (ciudades policéntricas e infraestructuras viales), <strong className="text-cyan-300">sangre circulatoria</strong> (ríos y acuíferos), <strong className="text-emerald-300">pulmones y piel</strong> (atmósfera y canopia vegetal) y <strong className="text-purple-300">órganos digestivos</strong> (el suelo vivo Keyline).
            </p>

            {/* Selector de Puntos de Acople en Espejo */}
            <div className="flex flex-wrap gap-2 pt-2">
              {MIRROR_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedLayerId === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedLayerId(hotspot.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full inline-block shrink-0" 
                      style={{ backgroundColor: hotspot.color }}
                    />
                    <span>{hotspot.name.split('·')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DUAL CANVAS: DOS IMÁGENES EN SPLIT-SCREEN CON OVERLAYS VIVOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* LADO IZQUIERDO: CUERPO HUMANO (MUJER / HOMBROS Y MÚSCULOS) */}
            <div className="card-slate rounded-3xl p-5 shadow-2xl border border-white/10 flex flex-col justify-between space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping inline-block" />
                  I. Cuerpo Humano (Mujer · Hombros & Músculos)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Rostro en penumbra · Foco biomecánico</span>
              </div>

              {/* Contenedor de la Imagen con Hotspot Dinámico */}
              <div className="relative rounded-2xl overflow-hidden bg-[#070b12] border border-white/10 min-h-[440px] flex items-center justify-center">
                <img
                  src={getAssetUrl('art/anatomia_cuerpo_humano_mujer.jpg')}
                  alt="Anatomía Humana de la Mujer (Hombros, Músculos y Órganos)"
                  className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Hotspot Luminoso Sincronizado */}
                <div 
                  className={`absolute ${activeHotspot.humanCoords} pointer-events-none transition-all duration-500`}
                >
                  <div 
                    className="w-16 h-16 rounded-full border-2 animate-pulse flex items-center justify-center shadow-lg"
                    style={{ borderColor: activeHotspot.color, backgroundColor: `${activeHotspot.color}25` }}
                  >
                    <span className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: activeHotspot.color }} />
                  </div>
                </div>

                {/* Badge flotante inferior */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs font-mono text-slate-200 flex items-center justify-between">
                  <span className="text-amber-300 font-bold truncate">{activeHotspot.humanPart}</span>
                  <span className="text-[10px] text-slate-400 uppercase">Cuerpo Físico</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                <strong>Biomecánica del Cuidado:</strong> {activeHotspot.humanDesc}
              </p>
            </div>

            {/* LADO DERECHO: CUERPO TERRITORIAL (CUENCA / CIUDADES E INFRAESTRUCTURA) */}
            <div className="card-slate rounded-3xl p-5 shadow-2xl border border-white/10 flex flex-col justify-between space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping inline-block" />
                  II. Cuerpo Territorial (Cuenca · Ciudades & Vías)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Parral · Cauquenes · Chanco · Keyline</span>
              </div>

              {/* Contenedor de la Imagen con Hotspot Dinámico */}
              <div className="relative rounded-2xl overflow-hidden bg-[#070b12] border border-white/10 min-h-[440px] flex items-center justify-center">
                <img
                  src={getAssetUrl('art/anatomia_cuerpo_territorial_cuenca.jpg')}
                  alt="Anatomía Territorial de la Cuenca (Ciudades, Ríos, Infraestructuras y Acuífero)"
                  className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Hotspot Luminoso Sincronizado */}
                <div 
                  className={`absolute ${activeHotspot.basinCoords} pointer-events-none transition-all duration-500`}
                >
                  <div 
                    className="w-16 h-16 rounded-full border-2 animate-pulse flex items-center justify-center shadow-lg"
                    style={{ borderColor: activeHotspot.color, backgroundColor: `${activeHotspot.color}25` }}
                  >
                    <span className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: activeHotspot.color }} />
                  </div>
                </div>

                {/* Badge flotante inferior */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs font-mono text-slate-200 flex items-center justify-between">
                  <span className="text-teal-300 font-bold truncate">{activeHotspot.basinPart}</span>
                  <span className="text-[10px] text-slate-400 uppercase">Cuenca Viva</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                <strong>Biofísica Territorial:</strong> {activeHotspot.basinDesc}
              </p>
            </div>
          </div>

          {/* FICHA TÉCNICA DE EQUIVALENCIA Y LEY DE TRACCIÓN */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#131b26] via-[#1a2736] to-[#0f1721] border border-amber-400/40 shadow-xl space-y-3 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Equivalencia Bio-Matemática HOMBROS:
              </span>
              <span className="text-emerald-300 font-bold">
                {activeHotspot.hombroVar}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-1">
                <span className="font-mono text-amber-400 font-bold block text-[11px]">
                  En el Cuerpo de la Mujer:
                </span>
                <p className="leading-relaxed">
                  Si se amputa un músculo o se deseca una arteria, el cuerpo no puede compensar el daño inyectando dinero o construyendo una prótesis monetaria. La integridad es no-lineal y orgánica.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-1">
                <span className="font-mono text-teal-400 font-bold block text-[11px]">
                  En la Cuenca y sus Ciudades:
                </span>
                <p className="leading-relaxed">
                  Si un monocultivo seca el acuífero de Parral o contamina la costa de Chanco, pagar indemnizaciones de RSE no repone el agua viva. Rige el <strong>Principio de No-Sustituibilidad de Liebig</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 2: VISUALIZADOR ISOMÉTRICO VOLUMÉTRICO (LOS 5 ESTRATOS ANATÓMICOS)
          ========================================================================= */}
      {activeMode === 'volumetric' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Columna Izquierda (7/12): Escenario Isométrico Interactivo */}
          <div className="lg:col-span-7 card-slate rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-serif font-bold text-white">
                  Corte Transversal Volumétrico de la Cuenca
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Modelo No-Cartesiano
              </span>
            </div>

            {/* Isometría Interactiva en SVG Renderizado */}
            <div className="relative bg-[#070b12] rounded-2xl p-6 border border-white/10 overflow-hidden min-h-[380px] flex flex-col justify-center items-center">
              <div className="w-full max-w-md space-y-3 relative z-10">
                {STRATA_LAYERS.map((layer, idx) => {
                  const isSelected = selectedLayerId === layer.id;
                  const Icon = layer.icon;
                  // Cálculo de deformación visual si hay tensión alta
                  const strainShift = appliedStress > 1.0 ? (idx * 3) : 0;
                  
                  return (
                    <motion.div
                      key={layer.id}
                      onClick={() => setSelectedLayerId(layer.id)}
                      whileHover={{ scale: 1.02, x: 6 }}
                      style={{
                        transform: `perspective(600px) rotateX(15deg) translateY(${strainShift}px)`
                      }}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 relative ${
                        isSelected
                          ? 'bg-white/15 border-white shadow-lg ring-2 ring-emerald-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg text-white"
                            style={{ backgroundColor: layer.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                              <span>{layer.name}</span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-sans italic">
                              {layer.biologicalAnalogy}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 block">{layer.depth}</span>
                          <span className="text-[11px] font-mono font-bold" style={{ color: layer.color }}>
                            {layer.hombroVar.split(' ')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Línea de micro-fractura si el estrés es crítico */}
                      {appliedStress >= 1.0 && (idx === 2 || idx === 3) && (
                        <div className="mt-2 pt-2 border-t border-rose-500/40 text-[10px] font-mono text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>Fisura por tensión mecánica: {appliedStress >= 1.25 ? 'Fractura plástica activa' : 'Fatiga edáfica'}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Fondo decorativo con gradiente de profundidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/30 via-transparent to-amber-950/10 pointer-events-none" />
            </div>

            {/* Selector de Estrés Aplicado (Simula tracción física sobre las capas) */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">Carga de Sobreesfuerzo Territorial:</span>
                <span className={`font-bold ${currentRegime.color}`}>
                  σ = {appliedStress.toFixed(3)} ({currentRegime.name.split(' ')[0]})
                </span>
              </div>
              <input
                type="range"
                min="0.30"
                max="1.70"
                step="0.05"
                value={appliedStress}
                onChange={(e) => setAppliedStress(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.30 (Reposo Elástico)</span>
                <span>0.85 (Límite Elástico)</span>
                <span>1.00 (Fluencia)</span>
                <span>1.25 (Fractura)</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha (5/12): Ficha Anatómica del Órgano Seleccionado */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-slate rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider">
                  Biopsia del Órgano Ecosistémico
                </span>
                <span className="text-[11px] font-mono text-slate-400">{selectedLayer.depth}</span>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-xl text-white shadow-md"
                  style={{ backgroundColor: selectedLayer.color }}
                >
                  {React.createElement(selectedLayer.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-white">
                    {selectedLayer.name}
                  </h4>
                  <p className="text-xs text-emerald-300 font-mono font-medium">
                    {selectedLayer.biologicalAnalogy}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {selectedLayer.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Variable Canónica en HOMBROS:
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {selectedLayer.hombroVar}
                </span>
              </div>

              <div className={`p-3.5 rounded-xl border ${currentRegime.bg} ${currentRegime.border} space-y-1`}>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-300 block">
                  Estado Bajo Estrés Actual (σ = {appliedStress.toFixed(2)}):
                </span>
                <p className={`text-xs font-sans font-medium ${currentRegime.color}`}>
                  {selectedLayer.organState}
                </p>
              </div>

              {/* Callout de Episteme Física */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-sans space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Por qué esto destruye el Modelo Neoclásico:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  En una contabilidad tradicional de PIB o SEIA 1.0, si el estrato 5 (acuífero) se agota, el sistema económico anota como "crecimiento" el negocio de vender camiones aljibe. En el <strong>cuerpo territorial</strong>, drenar el acuífero mata la piel vegetal (estrato 2) y precariza el cuidado humano (estrato 3). <em>No hay sustituibilidad posible entre órganos vitales.</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 2: MEDIO CONTINUO SOCIO-METABÓLICO (ESFUERZO Y DEFORMACIÓN)
          ========================================================================= */}
      {activeMode === 'stress_continuum' && (
        <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-pink-400 tracking-wider block">
                Mecánica de Sólidos & Resistencia Territorial
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                La Ecuación Constitutiva del Territorio como Medio Continuo
              </h3>
            </div>
            <div className="text-xs font-mono bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-xl border border-pink-500/30">
              Ley de Cauchy · σ = D / H
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizador de Deformación y Tensores (7/12) */}
            <div className="lg:col-span-7 bg-[#080d16] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Respuesta Mecánica del Tejido:</span>
                <span className={`font-bold ${currentRegime.color}`}>{currentRegime.name}</span>
              </div>

              {/* Malla de Deformación Reológica */}
              <div className="relative h-48 bg-[#0c1424] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                <div 
                  className="transition-all duration-500 rounded-2xl border-2 flex flex-col items-center justify-center p-4 text-center relative"
                  style={{
                    width: `${Math.min(95, 60 + appliedStress * 20)}%`,
                    height: `${Math.max(40, 85 - appliedStress * 25)}%`,
                    borderColor: appliedStress > 1.25 ? '#ef4444' : appliedStress > 1.0 ? '#fb7185' : appliedStress > 0.85 ? '#facc15' : '#10b981',
                    backgroundColor: appliedStress > 1.25 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.10)',
                    transform: `skewX(${appliedStress > 1.0 ? (appliedStress - 1.0) * 12 : 0}deg)`
                  }}
                >
                  <span className="text-xs font-mono font-bold text-white block">
                    Cuerpo Deformable: ε = {((appliedStress - 0.5) * 0.42).toFixed(3)}
                  </span>
                  <span className="text-[10px] text-slate-300 font-sans mt-1">
                    {appliedStress < 0.85 ? 'Comportamiento Elástico (Recuperable)' : appliedStress < 1.0 ? 'Disipación Viscoelástica' : 'Histéresis Plástica (Daño Permanente)'}
                  </span>

                  {appliedStress >= 1.25 && (
                    <span className="absolute -top-3 px-2 py-0.5 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold">
                      FRACTURA CATASTRÓFICA
                    </span>
                  )}
                </div>

                {/* Líneas de Esfuerzo Cortante de Fondo */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
              </div>

              {/* Slider de Carga */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>Modificar Esfuerzo de Tracción (σ):</span>
                  <span className="font-bold text-white">{appliedStress.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.40"
                  max="1.60"
                  step="0.05"
                  value={appliedStress}
                  onChange={(e) => setAppliedStress(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Fundamento Teórico & Explicación (5/12) */}
            <div className="lg:col-span-5 space-y-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider block">
                  El Error de la Economía Neoclásica
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Las teorías estándar modelan la economía como un sistema puntual reversible sin memoria física. Pero los ecosistemas son <strong>medios continuos no lineales con histéresis</strong>: una vez que un acuífero sufre compactación geológica o una comunidad rural pierde sus escuelas y cooperativas por emigración forzada, el sistema no regresa al punto inicial simplemente retirando la faena minera o el monocultivo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  Regla de Decisión Operativa
                </span>
                <p className="text-slate-200 leading-relaxed">
                  <strong>Salvaguarda Ex-Ante SEIA 2.0:</strong> Todo proyecto cuya carga proyectada sitúe al territorio por encima del límite elástico (<InlineMath math="\sigma_{\text{proj}} > 0.85" />) queda formalmente rechazado antes de evaluación, impidiendo que la cuenca acumule fatiga de materiales irreversible.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 3: VARIEDAD DIFERENCIAL Y ESPACIO DE ESTADOS (TOPOLOGÍA DE ESTABILIDAD)
          ========================================================================= */}
      {activeMode === 'state_manifold' && (
        <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-purple-400 tracking-wider block">
                Topología de Sistemas Complejos & Dinámica No Lineal
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                La Variedad de Estados: Cuencas de Atracción y Puntos de Inflexión (Tipping Points)
              </h3>
            </div>
            <div className="text-xs font-mono bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-xl border border-purple-500/30">
              Espacio de Fases · <InlineMath math="\mathcal{M} = \mathbb{R}^n" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizador 2.5D de Cuenca de Atracción (7/12) */}
            <div className="lg:col-span-7 bg-[#0a0814] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Paisaje de Potencial Ecosistémico $V(x)$:</span>
                <span className="text-purple-400 font-bold">
                  {appliedStress < 0.85 ? 'Cuenca Profunda (Resiliencia Alta)' : appliedStress < 1.1 ? 'Barrera Aplanada (Vulnerabilidad)' : 'Bifurcación / Deslizamiento a Colapso'}
                </span>
              </div>

              {/* Representación gráfica de la cuenca de potencial */}
              <div className="relative h-48 bg-[#100d20] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full p-4" viewBox="0 0 400 150">
                  {/* Curva de Pozo de Potencial */}
                  <path
                    d={
                      appliedStress < 0.85
                        ? "M 20 40 Q 150 140 250 80 T 380 30"
                        : appliedStress < 1.15
                        ? "M 20 60 Q 150 110 250 95 T 380 40"
                        : "M 20 80 Q 150 90 250 130 T 380 140"
                    }
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    className="transition-all duration-700"
                  />

                  {/* Esfera del Estado Territorial rodando en el pozo */}
                  <circle
                    cx={
                      appliedStress < 0.85 ? 150 : appliedStress < 1.15 ? 190 : 290
                    }
                    cy={
                      appliedStress < 0.85 ? 95 : appliedStress < 1.15 ? 98 : 125
                    }
                    r="9"
                    fill={appliedStress >= 1.15 ? '#ef4444' : '#10b981'}
                    className="transition-all duration-500 shadow-lg"
                  />

                  {/* Etiquetas de Atractores */}
                  <text x="80" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Atractor Homeostático
                  </text>
                  <text x="260" y="25" fill="#f43f5e" fontSize="10" fontFamily="monospace">
                    Atractor Degradado (Desierto)
                  </text>
                </svg>

                <div className="absolute bottom-2 text-center text-[10px] font-mono text-slate-400">
                  {appliedStress >= 1.15 
                    ? '⚠️ ¡TIPPING POINT CRUZADO! El sistema rueda irreversiblemente hacia el régimen degradado.' 
                    : '✓ Estado dentro del valle de atracción resiliente.'}
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-sans text-slate-300">
                <strong>Lección de Dinámica No Lineal:</strong> Un territorio no decae de forma suave y proporcional. Puede absorber estrés durante años aparentando normalidad mientras su pozo de potencial se aplana silenciosamente, hasta que una perturbación menor (una sequía estival) provoca un colapso brusco imposible de revertir con subsidios.
              </div>
            </div>

            {/* Panel de Control de Parámetros (5/12) */}
            <div className="lg:col-span-5 space-y-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                  Simular Perturbación en el Paisaje
                </span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Sobrecarga Extractiva Exógena:</span>
                    <span className="font-bold text-white">{extractivismLoad}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={extractivismLoad}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setExtractivismLoad(val);
                      setAppliedStress(0.50 + (val / 100) * 0.90);
                    }}
                    className="w-full accent-purple-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-300 font-mono text-[11px]">Pactos Vecinales Regenerativos (κ):</span>
                  <button
                    onClick={() => setGovernancePact(!governancePact)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      governancePact
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {governancePact ? 'Activo (κ +0.35)' : 'Inactivo (κ = 0)'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold font-mono text-[11px]">
                  <Compass className="w-4 h-4" />
                  <span>Geometría Diferencial en HOMBROS</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Las decisiones políticas no deben optimizar un único número escalar de flujo monetario ($PIB$), sino asegurar que la trayectoria del territorio en su variedad de estados permanezca lejos de las crestas de bifurcación de Poincaré.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 4: ESTRUCTURA DISIPATIVA AUTO-ORGANIZADA (METABOLISMO ABIERTO)
          ========================================================================= */}
      {activeMode === 'dissipative' && (
        <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider block">
                Termodinámica del No-Equilibrio · Prigogine & Georgescu-Roegen
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                Estructura Disipativa: El Flujo Metabólico de Neguentropía
              </h3>
            </div>
            <div className="text-xs font-mono bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-xl border border-amber-500/30">
              Tasa Sintrópica · <InlineMath math="\Gamma = \frac{d}{dt}\ln H(t)" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Tarjeta 1: Entrada de Baja Entropía */}
            <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  1. Entrada (<InlineMath math="\dot{Q}_{\text{in}}" />)
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-sm font-serif font-bold text-white">Baja Entropía Exógena</h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Radiación solar, precipitación orográfica, recarga de nieve cordillerana y biodiversidad polinaria. Es el combustible físico que mantiene al territorio lejos del equilibrio térmico inerte.
              </p>
              <div className="text-[10px] font-mono text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                Flujo Vital Solar: +1.200 W/m²
              </div>
            </div>

            {/* Tarjeta 2: Trabajo Metabólico Sintrópico */}
            <div className="p-5 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  2. Trabajo Interno (<InlineMath math="\Gamma" />)
                </span>
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <h4 className="text-sm font-serif font-bold text-white">Auto-Organización & Neguentropía</h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Fotosíntesis, acumulación de materia orgánica en suelos, redes de ayuda mutua APR y tecnologías Keyline que retienen energía útil y reproducen la capacidad portante (H).
              </p>
              <div className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                Velocidad Sintrópica: <InlineMath math="\Gamma > 0" /> (Regeneración)
              </div>
            </div>

            {/* Tarjeta 3: Disipación & Canibalismo Metabólico */}
            <div className="p-5 rounded-2xl bg-white/5 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  3. Salida (<InlineMath math="\dot{S}_{\text{out}}" />)
                </span>
                <Flame className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="text-sm font-serif font-bold text-white">Disipación Entrópica & Exportación</h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Calor residual, lixiviados y erosión. Cuando una metrópolis externa extrae materias primas sin restituir (<InlineMath math="\Psi_{\text{ext}} > 0.50" />), impone un régimen de <em>canibalismo metabólico</em> que agota la estructura disipativa.
              </p>
              <div className="text-[10px] font-mono text-rose-300 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                Desplazamiento Entrópico: <InlineMath math="\Psi_{\text{ext}} = 76.5\%" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LAS TRES CERTEZAS PARA LA TOMA DE DECISIONES POLÍTICAS Y COMUNITARIAS
          ========================================================================= */}
      <div className="card-slate rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <HeartHandshake className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-serif font-bold text-white">
            Las Tres Certezas del Territorio como Cuerpo para la Acción Territorial
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold text-[11px] block">
              1. No al Reduccionismo Atomizado
            </span>
            <p className="text-slate-300 leading-relaxed">
              El territorio no es la suma de encuestas de hogares. Tratar la pobreza sin medir la tensión del acuífero y el suelo es como tratar la anemia de una persona sin revisar si sus arterias están cortadas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-mono text-amber-400 font-bold text-[11px] block">
              2. Respeto al Umbral Elástico
            </span>
            <p className="text-slate-300 leading-relaxed">
              Cualquier intervención que fuerce al sistema más allá de <InlineMath math="\sigma = 0.85" /> entra en daño plástico acumulativo. Ninguna compensación monetaria ni obras de RSE pueden reparar un hueso roto o un río seco.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-mono text-purple-400 font-bold text-[11px] block">
              3. Dirección Estratégica Sintrópica
            </span>
            <p className="text-slate-300 leading-relaxed">
              La única meta de desarrollo legítima para un gobierno local es maximizar la tasa sintrópica (<InlineMath math="\Gamma > 0" />): asegurar que cada año el cuerpo territorial tenga más materia orgánica, más agua retenida y mayor soberanía comunitaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

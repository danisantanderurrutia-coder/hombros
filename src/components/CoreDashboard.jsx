import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, RotateCcw, AlertOctagon, ShieldCheck, Activity, 
  Sparkles, Scale, Cpu, Flame, Layers, 
  Info, CheckCircle2, ShieldAlert, Terminal, Zap,
  Gauge, Users, Trees, Coins, HelpCircle, ArrowRight,
  ChevronRight, FileText, ExternalLink, BarChart3, TrendingUp
} from 'lucide-react';
import StressStrainCurve from './StressStrainCurve';
import BasalResourceMeters from './BasalResourceMeters';
import MechanicalBalance from './MechanicalBalance';
import SyntropyDial from './SyntropyDial';
import ThreeShouldersBreakdown from './ThreeShouldersBreakdown';
import OrganismVisualAvatar from './OrganismVisualAvatar';
import { calculateHombrosFullState } from '../models/santanderModel';
import { evaluateTerritoryState } from '../models/mechanics';
import { PROTOTYPICAL_PRESETS, VARIABLE_METADATA } from '../models/prototypicalModel';

export default function CoreDashboard() {
  // Navigation Subtabs
  const [activeSubtab, setActiveSubtab] = useState('hombros'); // 'hombros' | 'tension' | 'sintropia' | 'semaforo' | 'organismo'

  // Active Archetype Preset
  const [selectedPresetId, setSelectedPresetId] = useState('sintropico');
  const [manipulationMode, setManipulationMode] = useState('essential'); // 'essential' (3 shoulders) vs 'advanced' (12 variables)

  // Current Working State initialized from Preset
  const activePreset = useMemo(() => {
    return PROTOTYPICAL_PRESETS.find(p => p.id === selectedPresetId) || PROTOTYPICAL_PRESETS[0];
  }, [selectedPresetId]);

  // Customizable variables state
  const [customVariables, setCustomVariables] = useState(activePreset.variables);
  const [customPressures, setCustomPressures] = useState(activePreset.pressureVars);

  // Environmental and external modifiers
  const [modifiers, setModifiers] = useState({
    climateShock: 0,
    extractivePressure: 0,
    regenerativeInvestment: 0,
  });

  // When changing preset, update the custom variables
  const handleSelectPreset = (presetId) => {
    setSelectedPresetId(presetId);
    const p = PROTOTYPICAL_PRESETS.find(x => x.id === presetId);
    if (p) {
      setCustomVariables({ ...p.variables });
      setCustomPressures({ ...p.pressureVars });
      setModifiers({ climateShock: 0, extractivePressure: 0, regenerativeInvestment: 0 });
    }
  };

  // Synthetic territory object for mechanics.js and santanderModel.js
  const syntheticTerritory = useMemo(() => {
    return {
      id: 'prototypical_organism',
      name: 'Organismo Territorial Prototípico',
      variables: customVariables,
      pressureVars: customPressures,
      resources: activePreset.resources,
      materialProperties: activePreset.materialProperties,
      history: [
        { year: 2017, H: 0.65 },
        { year: 2024, H: 0.60 }
      ]
    };
  }, [customVariables, customPressures, activePreset]);

  // Calculate Santander's Mathematical Model State
  const santanderState = useMemo(() => {
    return calculateHombrosFullState(syntheticTerritory, {
      pressureMod: modifiers.extractivePressure,
      regenMod: modifiers.regenerativeInvestment
    });
  }, [syntheticTerritory, modifiers]);

  // Calculate Continuum Mechanics State (σ vs ε, Yield Point, Resources)
  const mechanicsState = useMemo(() => {
    return evaluateTerritoryState(syntheticTerritory, modifiers);
  }, [syntheticTerritory, modifiers]);

  // Handlers for sliders
  const handleVariableChange = (key, val) => {
    setCustomVariables(prev => ({ ...prev, [key]: parseFloat(val) }));
    setSelectedPresetId('custom');
  };

  const handlePressureChange = (key, val) => {
    setCustomPressures(prev => ({ ...prev, [key]: parseFloat(val) }));
    setSelectedPresetId('custom');
  };

  // Adjust an entire shoulder directly (in essential mode)
  const handleShoulderChange = (shoulderLetter, val) => {
    const floatVal = parseFloat(val);
    setSelectedPresetId('custom');
    setCustomVariables(prev => {
      const updated = { ...prev };
      if (shoulderLetter === 'S') {
        updated.s1 = floatVal; updated.s2 = floatVal; updated.s3 = floatVal; updated.s4 = floatVal;
      } else if (shoulderLetter === 'E') {
        updated.e1 = floatVal; updated.e2 = floatVal; updated.e3 = floatVal; updated.e4 = floatVal;
      } else if (shoulderLetter === 'K') {
        updated.k1 = floatVal; updated.k2 = floatVal; updated.k3 = floatVal; updated.k4 = floatVal;
      }
      return updated;
    });
  };

  const handleModifierChange = (key, val) => {
    setModifiers(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  const handleReset = () => {
    handleSelectPreset('sintropico');
  };

  // Calculations for Neoclassical (Arithmetic) vs Liebig (Geometric) Gap
  const H_geom = santanderState.H;
  const H_arit = (santanderState.S + santanderState.E + santanderState.K) / 3;
  const liebigGap = parseFloat((H_arit - H_geom).toFixed(3));
  const safetyFactor = santanderState.D > 0 ? parseFloat((santanderState.H / santanderState.D).toFixed(2)) : 999;

  // Subtabs list definition
  const subtabs = [
    { 
      id: 'hombros', 
      number: '1', 
      label: 'Capacidad Portante (H)', 
      tag: 'Los 3 Hombros', 
      icon: ShieldCheck,
      color: 'from-[#DA7B93] to-[#D83F87]' 
    },
    { 
      id: 'tension', 
      number: '2', 
      label: 'Tensión Sistémica (σ)', 
      tag: 'Reología & Cargas', 
      icon: Scale,
      color: 'from-[#8D69A6] to-[#44318D]' 
    },
    { 
      id: 'sintropia', 
      number: '3', 
      label: 'Tasa Sintrópica (Γ)', 
      tag: 'Metabolismo Basal', 
      icon: Sparkles,
      color: 'from-[#376E6F] to-[#254b4c]' 
    },
    { 
      id: 'semaforo', 
      number: '4', 
      label: 'Semáforo Operativo', 
      tag: 'Lámina 21 & Alertas', 
      icon: AlertOctagon,
      color: 'from-amber-500 to-rose-600' 
    },
    { 
      id: 'organismo', 
      number: '5', 
      label: 'Organismo Integrado', 
      tag: 'Vista Holística', 
      icon: Cpu,
      color: 'from-fuchsia-500 to-teal-500' 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 animate-fade-in"
    >
      
      {/* =========================================================================
          CABECERA & HUD DE SIGNOS VITALES PERSISTENTE (SIEMPRE VISIBLE)
          ========================================================================= */}
      <div className="rounded-3xl p-6 sm:p-7 card-magenta relative overflow-hidden shadow-2xl border border-white/15">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D83F87]/20 via-[#44318D]/15 to-transparent pointer-events-none rounded-bl-full" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2 bg-[#2A1B3D] text-[#D83F87] border border-[#D83F87]/40 shadow-sm">
              <Terminal className="w-3 h-3 text-[#D83F87]" />
              [ LABORATORIO METABÓLICO DEL NÚCLEO · MOTOR LNM ]
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              El Núcleo: Leyes Biofísicas del Territorio
            </h1>
            
            <p className="mt-1 text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              Laboratorio cibernético universal: desacoplado de casos particulares para la 
              <strong className="text-[#DA7B93]"> experimentación progresiva con las leyes constitutivas</strong> del autosustento. 
              Explora cada función en sus subpestañas especializadas o audita el organismo completo.
            </p>
          </div>

          {/* Quick Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[#140b20] hover:bg-[#2A1B3D] text-[#DA7B93] border border-[#D83F87]/40 shadow-lg shadow-black/40 self-start lg:self-center transition-all hover:border-[#D83F87]"
            title="Restablecer todos los parámetros al arquetipo sintrópico basal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#DA7B93]" />
            REINICIAR TELEMETRÍA
          </button>
        </div>

        {/* HUD TELEMETRÍA EN TIEMPO REAL: SIGNOS VITALES */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          
          {/* Signo 1: Estado / Régimen */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Régimen Vital</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                santanderState.hasCriticalShoulder ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' :
                santanderState.sigma < 0.85 ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' :
                santanderState.sigma <= 1.00 ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' :
                'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
              }`} />
              <strong className={`font-mono text-xs font-bold ${
                santanderState.hasCriticalShoulder ? 'text-rose-300' :
                santanderState.sigma < 0.85 ? 'text-emerald-300' :
                santanderState.sigma <= 1.00 ? 'text-amber-300' :
                'text-rose-400'
              }`}>
                {santanderState.hasCriticalShoulder ? 'CRÍTICO' :
                 santanderState.sigma < 0.85 ? 'SINTRÓPICO' :
                 santanderState.sigma <= 1.00 ? 'FATIGA' : 'SOBRECARGA'}
              </strong>
            </div>
          </div>

          {/* Signo 2: Capacidad Portante H */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>H (Capacidad)</span>
              <span className="text-[#DA7B93] font-bold">√(S·E·K)</span>
            </div>
            <div className="text-xl font-mono font-bold text-white mt-0.5">
              {santanderState.H.toFixed(3)}
            </div>
          </div>

          {/* Signo 3: Tensión Sistémica σ */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>σ (Tensión)</span>
              <span className="text-purple-300 font-bold">D / H</span>
            </div>
            <div className={`text-xl font-mono font-bold mt-0.5 ${
              santanderState.sigma < 0.85 ? 'text-emerald-300' :
              santanderState.sigma <= 1.00 ? 'text-amber-300' : 'text-rose-400'
            }`}>
              {santanderState.sigma.toFixed(3)}
            </div>
          </div>

          {/* Signo 4: Factor de Seguridad */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Factor Seg. (FS)</span>
              <span className="text-teal-300 font-bold">H / D</span>
            </div>
            <div className={`text-xl font-mono font-bold mt-0.5 ${
              safetyFactor >= 1.2 ? 'text-emerald-300' :
              safetyFactor >= 1.0 ? 'text-amber-300' : 'text-rose-400'
            }`}>
              {safetyFactor.toFixed(2)}x
            </div>
          </div>

          {/* Signo 5: Tasa Sintrópica Γ */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Γ (Sintropía)</span>
              <span className="text-cyan-300 font-bold">ΔH/(H·Δt)</span>
            </div>
            <div className={`text-xl font-mono font-bold mt-0.5 ${
              santanderState.gamma > 0 ? 'text-emerald-300' :
              santanderState.gamma === 0 ? 'text-slate-300' : 'text-rose-400'
            }`}>
              {santanderState.gamma > 0 ? `+${santanderState.gamma.toFixed(3)}` : santanderState.gamma.toFixed(3)}
            </div>
          </div>

        </div>

        {/* SELECTOR RÁPIDO DE MÓDULOS ARQUETÍPICOS */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Cpu className="w-3.5 h-3.5 text-[#DA7B93]" />
            Cargar Arquetipo:
          </span>
          {PROTOTYPICAL_PRESETS.map(preset => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D83F87] to-[#376E6F] text-white font-serif font-bold border-white/40 shadow-md ring-1 ring-[#D83F87]/50'
                    : 'bg-[#180e25]/90 text-slate-300 hover:text-white hover:bg-[#2A1B3D] border-white/10 text-[11px]'
                }`}
              >
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BARRA DE NAVEGACIÓN PROGRESIVA EN SUBPESTAÑAS DEL NÚCLEO
          ========================================================================= */}
      <div className="bg-[#180e25]/90 border border-white/10 p-1.5 rounded-2xl shadow-xl backdrop-blur-md sticky top-20 z-40">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
          {subtabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubtab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-left relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D83F87] via-[#8D69A6] to-[#376E6F] text-white shadow-lg border border-white/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-[#DA7B93] group-hover:bg-white/10'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-80 leading-none">
                    {tab.tag}
                  </div>
                  <div className="text-xs font-serif font-semibold truncate leading-tight mt-0.5">
                    {tab.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          CONTENIDO DINÁMICO SEGÚN LA SUBPESTAÑA ACTIVA
          ========================================================================= */}
      <AnimatePresence mode="wait">
        
        {/* =======================================================================
            SUBPESTAÑA 1: CAPACIDAD PORTANTE (H) & LOS 3 HOMBROS
            ======================================================================= */}
        {activeSubtab === 'hombros' && (
          <motion.div
            key="subtab_hombros"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 1.1 Explicación Anatómica y Epistémica */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#DA7B93]" />
                <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                  Anatomía de los 3 Hombros y la Ecuación Fundamental de Capacidad Portante
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-300">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-serif font-bold text-[#DA7B93] text-sm block">1. Hombro Social ($S$)</span>
                  <p>
                    Cohesión vecinal, capital humano, solvencia de las instituciones locales y paz territorial (ausencia de violencia estructural). Sin tejido social, ninguna infraestructura perdura.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-serif font-bold text-[#376E6F] text-sm block">2. Hombro Ambiental ($E$)</span>
                  <p>
                    Integridad ecosistémica de bosque nativo, ciclo hidrológico por cuenca, suelo vivo no erosionado y resiliencia climática. Es el cimiento biofísico irreemplazable de la vida.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-serif font-bold text-[#8D69A6] text-sm block">3. Hombro Económico ($K$)</span>
                  <p>
                    Diversificación productiva (no monoproducción), autonomía presupuestaria municipal, equidad distributiva ($1-\text{Gini}$) y tasa de reinversión regenerativa.
                  </p>
                </div>
              </div>

              {/* Comparador Interactivo: Media Geométrica de Liebig vs. Media Aritmética Neoclásica */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#201030] to-[#121c25] border border-white/15 shadow-inner">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#DA7B93] font-bold block">
                      Demostración Matemática: Falacia de Sustituibilidad
                    </span>
                    <h3 className="text-base font-serif font-bold text-white">
                      Ley del Mínimo de Liebig: Media Geométrica vs. Promedio Aritmético Neoclásico
                    </h3>
                  </div>
                  <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-slate-200">
                    Ecuación: <strong className="text-[#DA7B93]">H = (S · E · K)<sup>1/3</sup></strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center font-mono">
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30">
                    <span className="text-[10px] text-slate-400 block uppercase">HOMBROS (Liebig / Geométrica)</span>
                    <strong className="text-2xl text-emerald-400 block mt-1">{H_geom.toFixed(3)}</strong>
                    <span className="text-[10px] text-emerald-300/80">No compensatoria (Realidad biofísica)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-purple-500/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Modelo Neoclásico (Aritmética)</span>
                    <strong className="text-2xl text-purple-300 block mt-1">{H_arit.toFixed(3)}</strong>
                    <span className="text-[10px] text-purple-300/80">Sustituible (Falsa solvencia)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-[#DA7B93]/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Brecha de Autoengaño Económico</span>
                    <strong className="text-2xl text-[#DA7B93] block mt-1">
                      {liebigGap > 0 ? `+${liebigGap.toFixed(3)}` : liebigGap.toFixed(3)}
                    </strong>
                    <span className="text-[10px] text-slate-300">
                      {liebigGap > 0.15 
                        ? '⚠️ Alerta: El dinero enmascara la destrucción del suelo o agua' 
                        : 'Equilibrio relativo entre los tres hombros'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2 Laboratorio Interactivo de Palancas */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#DA7B93]" />
                    <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                      Laboratorio de Calibración de Hombros
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modifica los valores para observar el impacto directo en la capacidad portante $H$
                  </p>
                </div>

                {/* Alternador de Modo: 3 Hombros vs 12 Variables */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setManipulationMode('essential')}
                    className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                      manipulationMode === 'essential'
                        ? 'bg-[#376E6F] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Modo Esencial (3 Hombros)
                  </button>
                  <button
                    onClick={() => setManipulationMode('advanced')}
                    className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                      manipulationMode === 'advanced'
                        ? 'bg-[#D83F87] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Modo Detallado (12 Variables)
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              {manipulationMode === 'essential' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hombro Social */}
                  <div className="p-4 rounded-2xl card-rose space-y-2.5 shadow-md">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold font-serif text-[#DA7B93] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#DA7B93]" />
                        Hombro Social (S)
                      </span>
                      <span className="font-mono font-bold text-white text-base">
                        {santanderState.S.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.01"
                      value={santanderState.S}
                      onChange={e => handleShoulderChange('S', e.target.value)}
                      className="w-full accent-[#DA7B93] cursor-pointer h-2 bg-black/40 rounded-lg"
                    />
                    <p className="text-[11px] text-slate-300 leading-tight">
                      Cohesión comunitaria, instituciones, educación y paz social.
                    </p>
                  </div>

                  {/* Hombro Ambiental */}
                  <div className={`p-4 rounded-2xl card-teal space-y-2.5 shadow-md transition-all ${
                    santanderState.E < 0.25 ? 'ring-2 ring-rose-500 bg-rose-950/70' : ''
                  }`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold font-serif text-[#376E6F] flex items-center gap-2">
                        <Trees className="w-4 h-4 text-[#376E6F]" />
                        Hombro Ambiental (E)
                      </span>
                      <span className={`font-mono font-bold text-base ${santanderState.E < 0.25 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                        {santanderState.E.toFixed(2)} {santanderState.E < 0.25 && '⚠️ CRÍTICO'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.01"
                      value={santanderState.E}
                      onChange={e => handleShoulderChange('E', e.target.value)}
                      className="w-full accent-[#376E6F] cursor-pointer h-2 bg-black/40 rounded-lg"
                    />
                    <p className="text-[11px] text-slate-300 leading-tight">
                      Integridad ecosistémica, disponibilidad hídrica, suelo vivo y resiliencia climática.
                    </p>
                  </div>

                  {/* Hombro Económico */}
                  <div className="p-4 rounded-2xl card-indigo space-y-2.5 shadow-md">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold font-serif text-[#8D69A6] flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#8D69A6]" />
                        Hombro Económico (K)
                      </span>
                      <span className="font-mono font-bold text-white text-base">
                        {santanderState.K.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.01"
                      value={santanderState.K}
                      onChange={e => handleShoulderChange('K', e.target.value)}
                      className="w-full accent-[#8D69A6] cursor-pointer h-2 bg-black/40 rounded-lg"
                    />
                    <p className="text-[11px] text-slate-300 leading-tight">
                      Diversificación productiva, autonomía local, equidad distributiva y balance regenerativo.
                    </p>
                  </div>
                </div>
              ) : (
                /* Modo Detallado: 12 Variables con Metadatos */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Social */}
                  <div className="space-y-3 p-4 rounded-2xl card-rose shadow-md">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#DA7B93] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Hombro Social (4 Variables)
                    </span>
                    {['s1', 's2', 's3', 's4'].map(k => (
                      <div key={k} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">{VARIABLE_METADATA[k].name}</span>
                          <strong className="font-mono text-white">{customVariables[k]?.toFixed(2)}</strong>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.02"
                          value={customVariables[k] || 0.5}
                          onChange={e => handleVariableChange(k, e.target.value)}
                          className="w-full accent-[#DA7B93] cursor-pointer h-1.5 bg-black/40 rounded"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Ambiental */}
                  <div className="space-y-3 p-4 rounded-2xl card-teal shadow-md">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#376E6F] flex items-center gap-1.5">
                      <Trees className="w-3.5 h-3.5" /> Hombro Ambiental (4 Variables)
                    </span>
                    {['e1', 'e2', 'e3', 'e4'].map(k => (
                      <div key={k} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">{VARIABLE_METADATA[k].name}</span>
                          <strong className="font-mono text-white">{customVariables[k]?.toFixed(2)}</strong>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.02"
                          value={customVariables[k] || 0.5}
                          onChange={e => handleVariableChange(k, e.target.value)}
                          className="w-full accent-[#376E6F] cursor-pointer h-1.5 bg-black/40 rounded"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Económico */}
                  <div className="space-y-3 p-4 rounded-2xl card-indigo shadow-md">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8D69A6] flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5" /> Hombro Económico (4 Variables)
                    </span>
                    {['k1', 'k2', 'k3', 'k4'].map(k => (
                      <div key={k} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">{VARIABLE_METADATA[k].name}</span>
                          <strong className="font-mono text-white">{customVariables[k]?.toFixed(2)}</strong>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.02"
                          value={customVariables[k] || 0.5}
                          onChange={e => handleVariableChange(k, e.target.value)}
                          className="w-full accent-[#8D69A6] cursor-pointer h-1.5 bg-black/40 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alerta de Hombro Crítico */}
              {santanderState.hasCriticalShoulder && (
                <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 flex items-start gap-3 text-xs text-rose-100 shadow-xl">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <strong className="text-sm font-bold block text-rose-300 font-serif">
                      ¡Alerta de Hombro Crítico (&lt; 0.25)! — Demostración de la Media Geométrica
                    </strong>
                    <p className="mt-0.5 leading-relaxed text-slate-200">
                      El hombro <strong>{santanderState.criticalDetails.join(', ')}</strong> ha caído bajo el umbral biofísico de sustento vital. 
                      Aunque los otros dos hombros estén al máximo, la media geométrica <em>H = (S · E · K)<sup>1/3</sup></em> desploma la capacidad portante. 
                      <strong>El dinero no puede sustituir a un acuífero destruido ni a una comunidad fracturada.</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 1.3 Desglose Anatómico Completo de los Tres Hombros */}
            <ThreeShouldersBreakdown santanderState={santanderState} territory={syntheticTerritory} />
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 2: TENSIÓN SISTÉMICA (σ) & REOLOGÍA DE MATERIALES
            ======================================================================= */}
        {activeSubtab === 'tension' && (
          <motion.div
            key="subtab_tension"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 2.1 Explicación de la Ley Constitutiva */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <Scale className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                  Ley de Tensión de Cauchy Territorial: σ = D / H
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-serif font-bold text-purple-300 text-sm block">
                    ¿De qué se compone la Tensión (σ)?
                  </span>
                  <p>
                    La <strong>tensión sistémica $\sigma$</strong> es el cociente directo entre la <strong>Presión de Desarrollo $D$</strong> que soporta el territorio y su <strong>Capacidad Portante $H$</strong>. Funciona de manera idéntica a la tensión mecánica uniaxial de un material sólido.
                  </p>
                  <p className="font-mono text-[11px] text-[#DA7B93]">
                    σ &lt; 0.85 (Elástico) · 0.85 ≤ σ &lt; 1.00 (Fluencia) · σ ≥ 1.25 (Fractura)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-serif font-bold text-amber-300 text-sm block">
                    Las 3 Fuerzas de la Presión de Desarrollo (D)
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    <li><strong className="text-rose-400">D₁ (Extracción):</strong> Tasa de cosecha respecto a la tasa de reposición biológica.</li>
                    <li><strong className="text-teal-300">D₂ (Demografía):</strong> Densidad poblacional respecto a la infraestructura física.</li>
                    <li><strong className="text-purple-300">D₃ (Dependencia):</strong> Drenaje de plusvalía y dependencia de inversión externa.</li>
                  </ul>
                </div>
              </div>

              {/* Controles de las 3 Presiones de Desarrollo */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold block mb-3">
                  Laboratorio de Fuerzas de Carga (D):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  
                  {/* D1 */}
                  <div className="p-3.5 rounded-2xl card-plum space-y-1.5 shadow-md">
                    <div className="flex justify-between">
                      <span className="text-slate-300">D₁: Intensidad Extractiva</span>
                      <strong className="text-rose-400 font-bold">{customPressures.d1.toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.5"
                      step="0.05"
                      value={customPressures.d1}
                      onChange={e => handlePressureChange('d1', e.target.value)}
                      className="w-full accent-rose-500 cursor-pointer h-1.5 bg-black/40 rounded"
                    />
                    <span className="text-[10px] text-slate-400 block">Presión sobre recursos bióticos y minerales</span>
                  </div>

                  {/* D2 */}
                  <div className="p-3.5 rounded-2xl card-teal space-y-1.5 shadow-md">
                    <div className="flex justify-between">
                      <span className="text-slate-300">D₂: Presión Demográfica</span>
                      <strong className="text-[#376E6F] font-bold">{customPressures.d2.toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.0"
                      step="0.05"
                      value={customPressures.d2}
                      onChange={e => handlePressureChange('d2', e.target.value)}
                      className="w-full accent-[#376E6F] cursor-pointer h-1.5 bg-black/40 rounded"
                    />
                    <span className="text-[10px] text-slate-400 block">Carga sobre saneamiento y suelo urbano</span>
                  </div>

                  {/* D3 */}
                  <div className="p-3.5 rounded-2xl card-magenta space-y-1.5 shadow-md">
                    <div className="flex justify-between">
                      <span className="text-slate-300">D₃: Dependencia Externa</span>
                      <strong className="text-[#D83F87] font-bold">{customPressures.d3.toFixed(2)}x</strong>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="2.0"
                      step="0.05"
                      value={customPressures.d3}
                      onChange={e => handlePressureChange('d3', e.target.value)}
                      className="w-full accent-[#D83F87] cursor-pointer h-1.5 bg-black/40 rounded"
                    />
                    <span className="text-[10px] text-slate-400 block">Exposición a choques y fuga de plusvalía</span>
                  </div>

                </div>
              </div>
            </div>

            {/* 2.2 Balanza Mecánica y Factor de Seguridad */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MechanicalBalance santanderState={santanderState} />
              
              {/* Panel de Reología & Histéresis Didáctica */}
              <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    <h3 className="font-serif font-bold text-white text-base">
                      Histéresis Reológica y Daño Permanente
                    </h3>
                  </div>
                  <div className="space-y-3 mt-3 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>¿Por qué un territorio no vuelve a ser el mismo tras una sobrecarga?</strong>
                    </p>
                    <p>
                      En régimen elástico ($\sigma &lt; 0.85$), el territorio absorbe la perturbación y regresa íntegramente a su equilibrio. Pero si se supera el <strong>límite de fluencia ($\sigma &gt; 0.85$)</strong>, el sistema entra en régimen plástico: se produce <em>histéresis energética</em>.
                    </p>
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                      <strong>Cicatriz Territorial:</strong> La degradación de un acuífero o la erosión de la capa vegetal fértil genera una <em>deformación residual permanente</em>. Aunque cesen las faenas extractivas, repararlo requiere una inversión exergética masiva durante décadas.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Estado Reológico Actual:</span>
                  <span className={`px-2.5 py-1 rounded-lg font-bold ${
                    santanderState.sigma < 0.85 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                    santanderState.sigma <= 1.00 ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                    'bg-rose-950 text-rose-300 border border-rose-500/40'
                  }`}>
                    {santanderState.sigma < 0.85 ? 'RÉGIMEN ELÁSTICO REVERSIBLE' :
                     santanderState.sigma <= 1.00 ? 'ZONA DE FLUENCIA ASINTÓTICA' :
                     'HISTÉRESIS PLÁSTICA / DAÑO ESTRUCTURAL'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2.3 Curva de Esfuerzo-Deformación Interactiva */}
            <StressStrainCurve state={mechanicsState} territory={syntheticTerritory} />
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 3: TASA SINTRÓPICA (Γ) & METABOLISMO BASAL
            ======================================================================= */}
        {activeSubtab === 'sintropia' && (
          <motion.div
            key="subtab_sintropia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 3.1 Fundamentación Termodinámica */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                  Tasa Sintrópica (Γ) y Acumulación Negentrópica Territorial
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-serif font-bold text-cyan-300 text-sm block">
                    ¿De qué se compone la Tasa Sintrópica (Γ)?
                  </span>
                  <p>
                    La sintropía mide la <strong>derivada temporal de la capacidad portante</strong> normalizada:
                  </p>
                  <div className="p-2.5 rounded-xl bg-black/60 font-mono text-center text-cyan-300 border border-cyan-500/30">
                    Γ = ΔH / (H · Δt) [año⁻¹]
                  </div>
                  <p>
                    Mientras la entropía disipa energía y desestructura el territorio, la <strong>sintropía activa ($\Gamma &gt; 0$)</strong> mide la capacidad de acumular orden biológico, biomasa, agua en cuenca y soberanía comunitaria en el tiempo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="font-serif font-bold text-emerald-300 text-sm block">
                    Los 4 Recursos Basales de Supervivencia
                  </span>
                  <p>
                    Todo organismo territorial requiere cuatro amortiguadores vitales para garantizar su homeostasis sin depender de importaciones externas forzadas:
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    <li><strong>Agua Viva:</strong> Caudal ecológico de cuenca no privatizado.</li>
                    <li><strong>Suelo Fértil:</strong> Capa edáfica activa y microbiología viva.</li>
                    <li><strong>Biomasa & Cobertura:</strong> Fotosíntesis neta y bosque nativo.</li>
                    <li><strong>Autonomía Energética:</strong> Exergía disponible localmente.</li>
                  </ul>
                </div>
              </div>

              {/* Modificadores de Choque Climático e Inversión Regenerativa */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-1/2 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Inversión Regenerativa Activa:</span>
                    <strong className="text-emerald-400 font-bold">
                      +{(modifiers.regenerativeInvestment * 100).toFixed(0)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.0"
                    step="0.05"
                    value={modifiers.regenerativeInvestment}
                    onChange={e => handleModifierChange('regenerativeInvestment', e.target.value)}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-black/40 rounded"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Choque Climático (Sequía/Incendio):</span>
                    <strong className="text-rose-400 font-bold">
                      {(modifiers.climateShock * 100).toFixed(0)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={modifiers.climateShock}
                    onChange={e => handleModifierChange('climateShock', e.target.value)}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-black/40 rounded"
                  />
                </div>
              </div>
            </div>

            {/* 3.2 Visualizadores del Laboratorio Sintrópico */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SyntropyDial santanderState={santanderState} />
              <BasalResourceMeters territory={syntheticTerritory} state={mechanicsState} />
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 4: SEMÁFORO OPERATIVO & PROTOCOLOS (LÁMINA 21)
            ======================================================================= */}
        {activeSubtab === 'semaforo' && (
          <motion.div
            key="subtab_semaforo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 4.1 Marco de Gobernanza Territorial */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <AlertOctagon className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                    Protocolo de Gobernanza Territorial y Reglas Si/Entonces (Lámina 21)
                  </h2>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-bio-deep border border-cyan-500/40 text-cyan-300 font-bold">
                  Código de Acción: {santanderState.actionCode}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Este sistema traduce la telemetría biofísica en <strong>decisiones normativas y directrices de política pública territorial</strong>. Si un parámetro cruza un umbral crítico de fatiga o fractura, el protocolo dicta de manera vinculante la acción preventiva o de emergencia correspondiente.
              </p>

              {/* Matriz de Umbrales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <span>🟢</span> CÓDIGO: MONITOR / SAFE
                  </div>
                  <p className="text-[11px] text-slate-300">
                    σ &lt; 0.85 y todos los hombros &gt; 0.50. Margen de resiliencia holgado; fomento sintrópico.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <span>🟡</span> CÓDIGO: AJUSTAR / MITIGAR
                  </div>
                  <p className="text-[11px] text-slate-300">
                    0.85 ≤ σ &lt; 1.00 o hombro entre 0.25 y 0.40. Moratoria a nuevas extracciones; refuerzo basal.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                    <span>🔴</span> CÓDIGO: FRENAR / EMERGENCIA
                  </div>
                  <p className="text-[11px] text-slate-300">
                    σ ≥ 1.00 o cualquier hombro &lt; 0.25. Paralización inmediata de actividades destructivas.
                  </p>
                </div>
              </div>
            </div>

            {/* 4.2 Lista de Alertas Activas en Tiempo Real */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-serif font-bold text-white text-base">
                    Dictámenes Activos para la Condición Territorial Actual
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {santanderState.activeAlerts.length} regla(s) disparada(s)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {santanderState.activeAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 text-xs shadow-md transition-all ${
                      alert.severity === 'critical'
                        ? 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                        : alert.severity === 'high'
                          ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                          : 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{alert.signal}</span>
                    <div className="space-y-1">
                      <strong className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                        Condición Disparadora: {alert.condition}
                      </strong>
                      <p className="leading-relaxed text-slate-200">
                        {alert.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 5: ORGANISMO INTEGRADO (VISTA HOLÍSTICA)
            ======================================================================= */}
        {activeSubtab === 'organismo' && (
          <motion.div
            key="subtab_organismo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* 5.1 Avatar Bio-Digital a Pantalla Completa */}
            <OrganismVisualAvatar santanderState={santanderState} activePreset={activePreset} />

            {/* 5.2 Cuadro Sinóptico y Ficha Arquetípica */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h3 className="font-serif font-bold text-white text-base">
                  Ficha Diagnóstica del Arquetipo: {activePreset.name}
                </h3>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-black/40 p-4 rounded-2xl border border-white/10">
                "{activePreset.description}"
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase">Hombro S</span>
                  <strong className="text-lg text-[#DA7B93] block mt-0.5">{santanderState.S.toFixed(2)}</strong>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase">Hombro E</span>
                  <strong className="text-lg text-[#376E6F] block mt-0.5">{santanderState.E.toFixed(2)}</strong>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase">Hombro K</span>
                  <strong className="text-lg text-[#8D69A6] block mt-0.5">{santanderState.K.toFixed(2)}</strong>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase">Tensión σ</span>
                  <strong className="text-lg text-purple-300 block mt-0.5">{santanderState.sigma.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* 5.3 Balanza + Dial en Vista Resumen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MechanicalBalance santanderState={santanderState} />
              <SyntropyDial santanderState={santanderState} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </motion.div>
  );
}

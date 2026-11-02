import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, RotateCcw, AlertOctagon, ShieldCheck, Activity, 
  Sparkles, Scale, Cpu, Flame, Layers, 
  Info, CheckCircle2, ShieldAlert, Terminal, Zap,
  Gauge, Users, Trees, Coins, HelpCircle, ArrowRight,
  ChevronRight, FileText, ExternalLink, BarChart3, TrendingUp,
  Globe, MapPin, Building2, AlertTriangle, Compass
} from 'lucide-react';

import StressStrainCurve from './StressStrainCurve';
import BasalResourceMeters from './BasalResourceMeters';
import MechanicalBalance from './MechanicalBalance';
import OrganismVisualAvatar from './OrganismVisualAvatar';
import ThreeShouldersBreakdown from './ThreeShouldersBreakdown';

// Specialized SVG Figures
import ShouldersRadarTripod from './ShouldersRadarTripod';
import SyntropyGauge from './SyntropyGauge';
import PhysicalTrafficLight from './PhysicalTrafficLight';

import { calculateHombrosFullState } from '../models/santanderModel';
import { evaluateTerritoryState } from '../models/mechanics';
import { PROTOTYPICAL_PRESETS, VARIABLE_METADATA } from '../models/prototypicalModel';
import { INITIAL_TERRITORIES } from '../models/territories';

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

  // Selected territory for Subtab 4 (Semáforo & Ciudades)
  const [selectedCityId, setSelectedCityId] = useState('quintero_puchuncavi');
  const [cityStressDelta, setCityStressDelta] = useState(0);

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

  // COUPLED CONTINUUM MECHANICS STATE (Directly drives StressStrainCurve using sigma = D / H)
  const coupledMechanicsState = useMemo(() => {
    const yieldStress = activePreset.materialProperties?.yieldStress || 0.85;
    const ultimateStress = activePreset.materialProperties?.ultimateStress || 1.10;
    const fractureStress = activePreset.materialProperties?.fractureStress || 1.25;
    const modulusElasticity = activePreset.materialProperties?.modulusElasticity || 1.25;

    // REAL COUPLING TO SANTANDER'S MODEL: sigma = D / H
    const sigma = santanderState.sigma;
    const epsilonYield = yieldStress / modulusElasticity;

    let epsilon = 0;
    let regime = 'green';
    let statusTitle = '';

    if (sigma < yieldStress * 0.75) {
      epsilon = sigma / modulusElasticity;
      regime = 'green';
      statusTitle = 'Zona Segura y Sintrópica (Régimen Elástico)';
    } else if (sigma < yieldStress) {
      epsilon = sigma / modulusElasticity;
      regime = 'amber';
      statusTitle = 'Tensión Elástica (Fatiga Absorbible)';
    } else if (sigma < fractureStress) {
      const plasticOver = sigma - yieldStress;
      epsilon = epsilonYield + Math.pow(plasticOver, 1.2) * 1.5;
      regime = 'red';
      statusTitle = 'Deformación Plástica (Daño Estructural / Histéresis)';
    } else {
      epsilon = epsilonYield + 1.2;
      regime = 'black';
      statusTitle = 'Punto de Fractura y Colapso Metabólico';
    }

    // Basal Resource Metrics calculation
    const rawMetrics = evaluateTerritoryState(syntheticTerritory, modifiers);

    return {
      sigma: parseFloat(sigma.toFixed(3)),
      epsilon: parseFloat(epsilon.toFixed(3)),
      regime,
      statusTitle,
      resourceMetrics: rawMetrics.resourceMetrics,
      materialProperties: {
        yieldStress,
        ultimateStress,
        fractureStress,
        modulusElasticity
      }
    };
  }, [santanderState.sigma, activePreset, syntheticTerritory, modifiers]);

  // Selected City Evaluation for Subtab 4 (Semáforo & Ciudades)
  const activeCityData = useMemo(() => {
    if (selectedCityId === 'prototype') {
      return {
        id: 'prototype',
        name: 'Organismo Prototípico (Calibración Actual)',
        country: 'Modelo Universal',
        bioregion: 'Sintrópico / Prototípico',
        description: 'Territorio con los parámetros y palancas configurados actualmente en El Núcleo.',
        state: santanderState
      };
    }

    const terr = INITIAL_TERRITORIES.find(t => t.id === selectedCityId) || INITIAL_TERRITORIES[0];
    const evaluated = calculateHombrosFullState(terr, {
      pressureMod: cityStressDelta,
      regenMod: 0
    });

    return {
      id: terr.id,
      name: terr.name,
      country: terr.country,
      bioregion: terr.bioregion,
      coordinates: terr.coordinates,
      description: terr.description,
      state: evaluated
    };
  }, [selectedCityId, cityStressDelta, santanderState]);

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

  // Quick adjust H directly in Subtab 2
  const handleDirectHAdjust = (val) => {
    const floatVal = parseFloat(val);
    setSelectedPresetId('custom');
    setCustomVariables(prev => {
      const updated = { ...prev };
      ['s1','s2','s3','s4','e1','e2','e3','e4','k1','k2','k3','k4'].forEach(k => {
        updated[k] = floatVal;
      });
      return updated;
    });
  };

  // Direct interactive adjustment of stress σ on the rheological curve
  const handleStressChange = (targetSigma) => {
    const targetD = targetSigma * santanderState.H;
    const newD1 = Math.max(0.1, Math.min(3.0, (targetD * 3) - customPressures.d2 - customPressures.d3));
    setCustomPressures(prev => ({
      ...prev,
      d1: parseFloat(newD1.toFixed(2))
    }));
    setSelectedPresetId('custom');
  };

  const handleModifierChange = (key, val) => {
    setModifiers(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  const handleReset = () => {
    handleSelectPreset('sintropico');
    setCityStressDelta(0);
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
      tag: 'Trípode & Hombros', 
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
      label: 'Semáforo & Ciudades', 
      tag: 'Lámina 21 & Mapa', 
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

  // Key cities list for Subtab 4
  const featuredCities = [
    { id: 'prototype', name: 'Prototipo Personalizado', country: 'Actual', tag: 'Laboratorio' },
    { id: 'chanco', name: 'Chanco', country: 'Chile', tag: 'Resiliencia Costera' },
    { id: 'quintero_puchuncavi', name: 'Quintero-Puchuncaví', country: 'Chile', tag: 'Zona Sacrificio' },
    { id: 'copenhagen', name: 'Copenhague', country: 'Dinamarca', tag: 'Exporta Entropía' },
    { id: 'barcelona', name: 'Barcelona', country: 'España', tag: 'Densidad & Histéresis' },
    { id: 'aconcagua', name: 'Valle de Aconcagua', country: 'Chile', tag: 'Crisis Hídrica' },
    { id: 'bilbao', name: 'Bilbao', country: 'España', tag: 'Reconversión' },
    { id: 'amsterdam', name: 'Ámsterdam', country: 'Países Bajos', tag: 'Metabolismo Externo' },
    { id: 'kamikatsu', name: 'Kamikatsu', country: 'Japón', tag: 'Basura Cero' },
    { id: 'medellin', name: 'Medellín', country: 'Colombia', tag: 'Tejido Barrial' },
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
              Laboratorio cibernético universal: cada métrica está vinculada 
              <strong className="text-[#DA7B93]"> directamente a su figura interactiva</strong>. 
              Modifica las variables y observa la deformación reológica, el trípode de Liebig, el dial sintrópico y el semáforo territorial en tiempo real.
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
            SUBPESTAÑA 1: CAPACIDAD PORTANTE (H) & LOS 3 HOMBROS (VINCULADO A TRÍPODE)
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
            {/* 1.1 Fila Principal: Variables de Calibración frente al Trípode Geométrico */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Controles de Hombros (Columna Izquierda 7/12) */}
              <div className="lg:col-span-7 p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#DA7B93]" />
                      <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                        Palancas de Calibración de Hombros
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">
                      Mueve las barras y observa cómo se deforma el trípode al instante
                    </p>
                  </div>

                  {/* Mode Switcher */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                    <button
                      onClick={() => setManipulationMode('essential')}
                      className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                        manipulationMode === 'essential'
                          ? 'bg-[#376E6F] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      3 Hombros
                    </button>
                    <button
                      onClick={() => setManipulationMode('advanced')}
                      className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                        manipulationMode === 'advanced'
                          ? 'bg-[#D83F87] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      12 Variables
                    </button>
                  </div>
                </div>

                {/* Sliders Grid */}
                {manipulationMode === 'essential' ? (
                  <div className="space-y-4">
                    {/* Hombro Social */}
                    <div className="p-4 rounded-2xl card-rose space-y-2 shadow-md">
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
                      <p className="text-[11px] text-slate-300">
                        Cohesión comunitaria, instituciones, educación y paz social.
                      </p>
                    </div>

                    {/* Hombro Ambiental */}
                    <div className={`p-4 rounded-2xl card-teal space-y-2 shadow-md transition-all ${
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
                      <p className="text-[11px] text-slate-300">
                        Integridad ecosistémica, disponibilidad hídrica por cuenca y suelo vivo.
                      </p>
                    </div>

                    {/* Hombro Económico */}
                    <div className="p-4 rounded-2xl card-indigo space-y-2 shadow-md">
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
                      <p className="text-[11px] text-slate-300">
                        Diversificación productiva, autonomía local, equidad distributiva y balance regenerativo.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Modo Detallado: 12 Variables */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Social */}
                    <div className="space-y-2 p-3 rounded-2xl card-rose shadow-md text-xs">
                      <span className="block font-mono font-bold uppercase tracking-wider text-[#DA7B93] text-[10px]">
                        Hombro Social (S₁-S₄)
                      </span>
                      {['s1', 's2', 's3', 's4'].map(k => (
                        <div key={k} className="space-y-0.5">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-300 truncate">{VARIABLE_METADATA[k].name}</span>
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
                    <div className="space-y-2 p-3 rounded-2xl card-teal shadow-md text-xs">
                      <span className="block font-mono font-bold uppercase tracking-wider text-[#376E6F] text-[10px]">
                        Hombro Ambiental (E₁-E₄)
                      </span>
                      {['e1', 'e2', 'e3', 'e4'].map(k => (
                        <div key={k} className="space-y-0.5">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-300 truncate">{VARIABLE_METADATA[k].name}</span>
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
                    <div className="space-y-2 p-3 rounded-2xl card-indigo shadow-md text-xs">
                      <span className="block font-mono font-bold uppercase tracking-wider text-[#8D69A6] text-[10px]">
                        Hombro Económico (K₁-K₄)
                      </span>
                      {['k1', 'k2', 'k3', 'k4'].map(k => (
                        <div key={k} className="space-y-0.5">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-300 truncate">{VARIABLE_METADATA[k].name}</span>
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
              </div>

              {/* Figura Geométrica Dinámica: Trípode de Hombros (Columna Derecha 5/12) */}
              <div className="lg:col-span-5">
                <ShouldersRadarTripod
                  S={santanderState.S}
                  E={santanderState.E}
                  K={santanderState.K}
                  H={santanderState.H}
                  hasCriticalShoulder={santanderState.hasCriticalShoulder}
                  criticalDetails={santanderState.criticalDetails}
                  onShoulderChange={handleShoulderChange}
                />
              </div>

            </div>

            {/* 1.2 Comparador Interactivo de la Ley de Liebig */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#201030] to-[#121c25] border border-white/15 shadow-xl">
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
                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 block uppercase">HOMBROS (Liebig / Geométrica)</span>
                  <strong className="text-2xl text-emerald-400 block mt-1">{H_geom.toFixed(3)}</strong>
                  <span className="text-[10px] text-emerald-300/80">No compensatoria (Realidad biofísica)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/30">
                  <span className="text-[10px] text-slate-400 block uppercase">Modelo Neoclásico (Aritmética)</span>
                  <strong className="text-2xl text-purple-300 block mt-1">{H_arit.toFixed(3)}</strong>
                  <span className="text-[10px] text-purple-300/80">Sustituible (Falsa solvencia monetaria)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-[#DA7B93]/30">
                  <span className="text-[10px] text-slate-400 block uppercase">Brecha de Autoengaño Económico</span>
                  <strong className="text-2xl text-[#DA7B93] block mt-1">
                    {liebigGap > 0 ? `+${liebigGap.toFixed(3)}` : liebigGap.toFixed(3)}
                  </strong>
                  <span className="text-[10px] text-slate-300">
                    {liebigGap > 0.15 
                      ? '⚠️ El dinero enmascara la destrucción del suelo o agua' 
                      : 'Equilibrio relativo entre los tres hombros'}
                  </span>
                </div>
              </div>
            </div>

            {/* 1.3 Desglose Anatómico Completo */}
            <ThreeShouldersBreakdown santanderState={santanderState} territory={syntheticTerritory} />
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 2: TENSIÓN SISTÉMICA (σ) & REOLOGÍA (VINCULADA A CURVA Y BALANZA)
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
            {/* 2.1 Palancas de Carga (D) y Capacidad (H) frente a Balanza y Curva */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                      Palancas Mecánicas: Ley de Cauchy Territorial (σ = D / H)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    Ajusta la Carga de Desarrollo (D) y la Resistencia (H) para mover la balanza y la curva reológica
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-slate-400">Tensión Directa:</span>
                  <strong className={`text-sm ${
                    santanderState.sigma < 0.85 ? 'text-emerald-400' :
                    santanderState.sigma <= 1.00 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    σ = {santanderState.sigma.toFixed(3)}
                  </strong>
                </div>
              </div>

              {/* Controles de Carga D1, D2, D3 + Control de Resistencia H */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                
                {/* D1 */}
                <div className="p-3.5 rounded-2xl card-plum space-y-1.5 shadow-md">
                  <div className="flex justify-between">
                    <span className="text-slate-300">D₁: Extracción</span>
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
                  <span className="text-[10px] text-slate-400 block truncate">Carga biótica y mineral</span>
                </div>

                {/* D2 */}
                <div className="p-3.5 rounded-2xl card-teal space-y-1.5 shadow-md">
                  <div className="flex justify-between">
                    <span className="text-slate-300">D₂: Demografía</span>
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
                  <span className="text-[10px] text-slate-400 block truncate">Carga sobre infraestructura</span>
                </div>

                {/* D3 */}
                <div className="p-3.5 rounded-2xl card-magenta space-y-1.5 shadow-md">
                  <div className="flex justify-between">
                    <span className="text-slate-300">D₃: Dependencia</span>
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
                  <span className="text-[10px] text-slate-400 block truncate">Fuga exógena de plusvalía</span>
                </div>

                {/* Direct Control of H (Capability) */}
                <div className="p-3.5 rounded-2xl card-indigo space-y-1.5 shadow-md border border-white/15">
                  <div className="flex justify-between">
                    <span className="text-slate-200 font-bold">H: Resistencia Base</span>
                    <strong className="text-emerald-400 font-bold">{santanderState.H.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="1.0"
                    step="0.02"
                    value={santanderState.H}
                    onChange={e => handleDirectHAdjust(e.target.value)}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-black/40 rounded"
                  />
                  <span className="text-[10px] text-slate-300 block truncate">Modula el soporte estructural</span>
                </div>

              </div>
            </div>

            {/* 2.2 Balanza Mecánica y Curva Reológica en Cascada Vertical */}
            <div className="space-y-6">
              {/* Balanza Mecánica con Inclinación Física y Fluidéz Orgánica */}
              <MechanicalBalance santanderState={santanderState} />
              
              {/* Curva de Esfuerzo-Deformación Conectada Directamente a sigma = D / H (Debajo de la Balanza e Interactiva) */}
              <StressStrainCurve 
                state={coupledMechanicsState} 
                territory={syntheticTerritory} 
                onStressChange={handleStressChange}
              />
            </div>

            {/* 2.3 Panel de Reología & Histéresis Territorial */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                <h3 className="font-serif font-bold text-white text-base">
                  Histéresis Reológica y la Memoria Física del Territorio
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cuando un territorio supera el <strong>límite de fluencia ($\sigma &gt; 0.85$)</strong>, el sistema abandona el régimen elástico reversible. 
                Ocurre <strong>deformación plástica permanente</strong>: compactación y erosión irrecuperable de la capa arable, salinización de acuíferos o quebre del tejido de cuidados vecinales. 
                Aunque se detenga la extracción a cero ($D \to 0$), <strong>el territorio no vuelve a su estado original sin subsidios masivos de energía y tiempo</strong>.
              </p>
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 3: TASA SINTRÓPICA (Γ) & METABOLISMO BASAL (VINCULADA A DIAL Y BATERÍAS)
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
            {/* 3.1 Palancas de Flujo Metabólico */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                      Palancas del Ciclaje Sintrópico y Homeostasis Basal
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    Modula los flujos de regeneración y perturbación climática para mover la aguja del velocímetro
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-slate-300">
                  <span>Velocidad Negentrópica:</span>
                  <strong className={santanderState.gamma >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    Γ = {santanderState.gamma >= 0 ? `+${santanderState.gamma.toFixed(3)}` : santanderState.gamma.toFixed(3)}/año
                  </strong>
                </div>
              </div>

              {/* Sliders de Flujo Metabólico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                
                {/* Inversión Regenerativa */}
                <div className="p-3.5 rounded-2xl card-teal space-y-1.5 shadow-md">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Siembra de Agua & Suelo:</span>
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
                  <span className="text-[10px] text-slate-400 block truncate">Reforestación, zanjas de infiltración</span>
                </div>

                {/* Choque Climático */}
                <div className="p-3.5 rounded-2xl card-plum space-y-1.5 shadow-md">
                  <div className="flex justify-between">
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
                  <span className="text-[10px] text-slate-400 block truncate">Disminuye caudales y fotosíntesis</span>
                </div>

                {/* Presión Extractiva Exógena */}
                <div className="p-3.5 rounded-2xl card-magenta space-y-1.5 shadow-md sm:col-span-2 lg:col-span-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Intensidad de Cosecha Neta:</span>
                    <strong className="text-[#DA7B93] font-bold">
                      {(customPressures.d1).toFixed(2)}x
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={customPressures.d1}
                    onChange={e => handlePressureChange('d1', e.target.value)}
                    className="w-full accent-[#DA7B93] cursor-pointer h-1.5 bg-black/40 rounded"
                  />
                  <span className="text-[10px] text-slate-400 block truncate">Tasa de vaciado de reservas</span>
                </div>

              </div>
            </div>

            {/* 3.2 Visualizadores Vinculados: Velocímetro Sintrópico con Aguja + Baterías de Recursos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Velocímetro Dinámico SVG */}
              <SyntropyGauge
                gamma={santanderState.gamma}
                gammaStatus={santanderState.gammaStatus}
                gammaTitle={santanderState.gammaTitle}
                H={santanderState.H}
              />

              {/* Baterías de Recursos Basales */}
              <BasalResourceMeters territory={syntheticTerritory} state={coupledMechanicsState} />
            </div>
          </motion.div>
        )}

        {/* =======================================================================
            SUBPESTAÑA 4: SEMÁFORO OPERATIVO FÍSICO & MAPA DE CIUDADES (LÁMINA 21)
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
            {/* 4.1 Fila Principal: Semáforo Físico Iluminado frente al Explorador de Ciudades */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* SEMÁFORO BIOFÍSICO LUMINOSO (Columna Izquierda 4/12) */}
              <div className="lg:col-span-4">
                <PhysicalTrafficLight
                  trafficLight={activeCityData.state.trafficLight}
                  actionCode={activeCityData.state.actionCode}
                  actionTitle={activeCityData.state.trafficTitle}
                  sigma={activeCityData.state.sigma}
                  hasCriticalShoulder={activeCityData.state.hasCriticalShoulder}
                />
              </div>

              {/* SELECTOR Y MAPA DE CIUDADES DEL MUNDO (Columna Derecha 8/12) */}
              <div className="lg:col-span-8 p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-teal-400" />
                      <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                        Benchmarking Territorial de Ciudades del Mundo
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Haz clic en cualquier ciudad para evaluar su semáforo biofísico y directrices de gobernanza
                    </p>
                  </div>

                  <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-bio-deep border border-cyan-500/30 text-cyan-300 font-bold">
                    {featuredCities.length} Territorios
                  </span>
                </div>

                {/* Grid de Ciudades */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {featuredCities.map(city => {
                    const isSelected = selectedCityId === city.id;
                    return (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCityId(city.id);
                          setCityStressDelta(0);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#D83F87]/30 to-[#376E6F]/30 border-white/40 ring-1 ring-white/30 shadow-lg'
                            : 'bg-black/40 hover:bg-white/5 border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono opacity-80 mb-1">
                          <span className="text-slate-400 truncate">{city.country}</span>
                          <span className="text-[#DA7B93] text-[9px]">{city.tag}</span>
                        </div>
                        <div className="text-xs font-serif font-bold text-white truncate">
                          {city.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Ficha Territorial de la Ciudad Seleccionada */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold block">
                        Territorio Activo:
                      </span>
                      <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#DA7B93]" />
                        {activeCityData.name} ({activeCityData.country})
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-slate-300">
                        H = {activeCityData.state.H.toFixed(2)}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-slate-300">
                        σ = {activeCityData.state.sigma.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5 font-serif">
                    "{activeCityData.description}"
                  </p>

                  {/* Simulador de Choque Directo en la Ciudad */}
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Simular Sobrecarga Extractiva en este Territorio:</span>
                      <strong className={`font-bold ${
                        cityStressDelta > 0.3 ? 'text-rose-400' : 'text-amber-300'
                      }`}>
                        +{cityStressDelta > 0 ? (cityStressDelta * 100).toFixed(0) : 0}% de Presión
                      </strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={cityStressDelta}
                      onChange={e => setCityStressDelta(parseFloat(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer h-1.5 bg-black/40 rounded"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* 4.2 Lista de Dictámenes y Alertas de la Lámina 21 para el Territorio Activo */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-white text-base">
                    Dictámenes de Gobernanza Territorial (Lámina 21) para {activeCityData.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {activeCityData.state.activeAlerts.length} protocolo(s) vinculante(s)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCityData.state.activeAlerts.map(alert => (
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
            SUBPESTAÑA 5: ORGANISMO INTEGRADO (VISTA HOLÍSTICA SIN DUPLICIDAD DE RIG)
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
            {/* 5.1 Avatar Bio-Digital Completo */}
            <OrganismVisualAvatar santanderState={santanderState} activePreset={activePreset} />

            {/* 5.2 Matriz de Diagnóstico Territorial Sintético (Síntesis de Todas las Capas) */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h3 className="font-serif font-bold text-white text-base">
                  Matriz Cibernética de Síntesis Territorial
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                {/* 1. Hombros Base */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase block">Capa 1: Los 3 Hombros</span>
                  <div className="space-y-1 text-slate-200">
                    <div className="flex justify-between"><span>Social (S):</span> <b className="text-[#DA7B93]">{santanderState.S.toFixed(2)}</b></div>
                    <div className="flex justify-between"><span>Ambiental (E):</span> <b className="text-[#376E6F]">{santanderState.E.toFixed(2)}</b></div>
                    <div className="flex justify-between"><span>Económico (K):</span> <b className="text-[#8D69A6]">{santanderState.K.toFixed(2)}</b></div>
                  </div>
                </div>

                {/* 2. Capacidad e Índice */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase block">Capa 2: Capacidad & Carga</span>
                  <div className="space-y-1 text-slate-200">
                    <div className="flex justify-between"><span>Capacidad Portante (H):</span> <b className="text-emerald-400">{santanderState.H.toFixed(3)}</b></div>
                    <div className="flex justify-between"><span>Presión Externa (D):</span> <b className="text-rose-400">{santanderState.D.toFixed(3)}</b></div>
                    <div className="flex justify-between"><span>Margen de Reserva (H-D):</span> <b className={santanderState.H - santanderState.D >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{(santanderState.H - santanderState.D).toFixed(2)}</b></div>
                  </div>
                </div>

                {/* 3. Tensión y Reología */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase block">Capa 3: Tensión & Seguridad</span>
                  <div className="space-y-1 text-slate-200">
                    <div className="flex justify-between"><span>Tensión Cauchy (σ):</span> <b className="text-purple-300">{santanderState.sigma.toFixed(3)}</b></div>
                    <div className="flex justify-between"><span>Factor Seguridad (FS):</span> <b className="text-teal-300">{safetyFactor.toFixed(2)}x</b></div>
                    <div className="flex justify-between"><span>Régimen Elástico:</span> <b className="text-white">{coupledMechanicsState.regime.toUpperCase()}</b></div>
                  </div>
                </div>

                {/* 4. Ciclaje Sintrópico */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase block">Capa 4: Ciclaje Sintrópico</span>
                  <div className="space-y-1 text-slate-200">
                    <div className="flex justify-between"><span>Velocidad (Γ):</span> <b className={santanderState.gamma >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{santanderState.gamma.toFixed(3)}/año</b></div>
                    <div className="flex justify-between"><span>Estado Negentrópico:</span> <b className="text-cyan-300">{santanderState.gammaStatus}</b></div>
                    <div className="flex justify-between"><span>Código Acción:</span> <b className="text-white">{santanderState.actionCode}</b></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5.3 Ficha Diagnóstica del Arquetipo Territorial Activo */}
            <div className="p-6 rounded-3xl card-slate border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Building2 className="w-5 h-5 text-[#DA7B93]" />
                <h3 className="font-serif font-bold text-white text-base">
                  Arquetipo Activo: {activePreset.name}
                </h3>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-black/40 p-4 rounded-2xl border border-white/10 font-serif">
                "{activePreset.description}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <strong className="text-white font-serif block">Implicancia para la Planificación:</strong>
                  <p>
                    Este arquetipo ilustra la interacción no-lineal entre el metabolismo social y la base biofísica. 
                    Cualquier política que intente estimular la inversión sin verificar el factor de seguridad $FS &gt; 1.0$ acelera la entrada en régimen plástico irreversible.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <strong className="text-white font-serif block">Protocolo de Intervención Recomendado:</strong>
                  <p>
                    Reemplazar subsidios extractivos por bonos de regeneración de suelo y agua. Establecer gobernanza comunitaria de cuenca para blindar el Hombro Ambiental antes de permitir nueva actividad productiva.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </motion.div>
  );
}

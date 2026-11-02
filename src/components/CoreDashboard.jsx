import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, RotateCcw, AlertOctagon, ShieldCheck, Activity, 
  Sun, Sparkles, Scale, TrendingUp, Cpu, Flame, Layers, 
  RefreshCw, Info, CheckCircle2, ShieldAlert, Terminal, Zap
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 animate-fade-in"
    >
      
      {/* 1. Bio-Digital HUD Hero Card (Blended FCINQ + HAUS) */}
      <div className="rounded-3xl p-6 sm:p-8 transition-all duration-300 card-magenta relative overflow-hidden shadow-2xl">
        {/* Subtle holographic cyber-grid overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D83F87]/20 via-[#44318D]/15 to-transparent pointer-events-none rounded-bl-full" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 bg-[#2A1B3D] text-[#D83F87] border border-[#D83F87]/40 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-[#D83F87]" />
              [ BIO-TELEMETRY MATRIX: LNM ENGINE ]
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              El Organismo Territorial Biofísico
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              Laboratorio cibernético universal: desacoplado de casos particulares para permitir la 
              <strong className="text-[#DA7B93]"> experimentación pura con las palancas biofísicas de cualquier territorio del planeta</strong>. 
              Manipula los 3 Hombros ($S, E, K$), las presiones de desarrollo ($D$) y audita la respuesta de tensión, deformación y regeneración en tiempo real.
            </p>
          </div>

          {/* Quick Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#140b20] hover:bg-[#2A1B3D] text-[#D83F87] border border-[#D83F87]/40 shadow-lg shadow-black/40 self-start lg:self-center transition-all hover:border-[#D83F87]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D83F87]" />
            RESET TELEMETRY
          </button>
        </div>

        {/* Archetype Presets Selector Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="text-[11px] font-mono text-[#DA7B93] uppercase tracking-wider font-bold block mb-2.5 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#DA7B93]" />
            Cargar Módulo Arquetípico:
          </span>
          
          <div className="flex flex-wrap items-center gap-2.5">
            {PROTOTYPICAL_PRESETS.map(preset => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`text-xs px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D83F87] via-[#8D69A6] to-[#376E6F] text-white font-serif font-bold border-white/40 shadow-lg shadow-[#D83F87]/30 ring-2 ring-[#D83F87]/50'
                      : 'bg-[#180e25]/90 text-slate-300 hover:text-white hover:bg-[#2A1B3D] border-white/10 font-medium'
                  }`}
                >
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-[#A4B3B6] italic bg-black/40 p-3 rounded-2xl border border-white/10 max-w-4xl font-serif">
            "{activePreset.description}"
          </p>
        </div>
      </div>

      {/* 2. Visual Organism Avatar & Living Bio-Telemetry Center */}
      <OrganismVisualAvatar santanderState={santanderState} activePreset={activePreset} />

      {/* 3. Interactive Control Panel: Manipulate Shoulders & Pressures */}
      <div className="p-6 sm:p-8 rounded-3xl card-slate shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#DA7B93]" />
              <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                Palancas Cibernéticas del Metabolismo Territorial
              </h2>
            </div>
            <p className="text-xs text-[#A4B3B6] mt-0.5 font-mono">
              [ REAL-TIME FEEDBACK: H = (S · E · K)⅓ · σ = D / H ]
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
            
            {/* Hombro Social (S) */}
            <div className="p-4 rounded-2xl card-rose space-y-2.5 shadow-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-serif text-[#DA7B93] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DA7B93] shadow-[0_0_8px_#DA7B93] inline-block"></span>
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

            {/* Hombro Ambiental (E) */}
            <div className={`p-4 rounded-2xl card-teal space-y-2.5 shadow-md transition-all ${
              santanderState.E < 0.25 ? 'ring-2 ring-rose-500 bg-rose-950/70' : ''
            }`}>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-serif text-[#376E6F] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#376E6F] shadow-[0_0_8px_#376E6F] inline-block"></span>
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
                Integridad ecosistémica, disponibilidad de agua, suelo vivo y resiliencia climática.
              </p>
            </div>

            {/* Hombro Económico (K) */}
            <div className="p-4 rounded-2xl card-indigo space-y-2.5 shadow-md">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-serif text-[#8D69A6] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8D69A6] shadow-[0_0_8px_#8D69A6] inline-block"></span>
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
          /* Advanced Mode: 12 Individual Observable Variables */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Social Group */}
            <div className="space-y-3 p-4 rounded-2xl card-rose shadow-md">
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#DA7B93]">
                Hombro Social: 4 Variables
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

            {/* Environmental Group */}
            <div className="space-y-3 p-4 rounded-2xl card-teal shadow-md">
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#376E6F]">
                Hombro Ambiental: 4 Variables
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

            {/* Economic Group */}
            <div className="space-y-3 p-4 rounded-2xl card-indigo shadow-md">
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8D69A6]">
                Hombro Económico: 4 Variables
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

        {/* Development Pressures */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          
          {/* Pressure 1: Extractivism */}
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
          </div>

          {/* Pressure 2: Demographic */}
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
          </div>

          {/* Pressure 3: Capital Drain */}
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
          </div>

        </div>

        {/* Dynamic Critical Non-Compensatory Alert Warning */}
        {santanderState.hasCriticalShoulder && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 flex items-start gap-3 text-xs text-rose-100 shadow-xl"
          >
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
          </motion.div>
        )}
      </div>

      {/* 3. The Physical Balance & Syntropic Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MechanicalBalance santanderState={santanderState} />
        <SyntropyDial santanderState={santanderState} />
      </div>

      {/* 4. Mechanics Core: Stress-Strain Curve + Basal Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressStrainCurve state={mechanicsState} territory={syntheticTerritory} />
        <BasalResourceMeters territory={syntheticTerritory} state={mechanicsState} />
      </div>

      {/* 5. Detailed Breakdown of the Three Shoulders (S, E, K) */}
      <ThreeShouldersBreakdown santanderState={santanderState} territory={syntheticTerritory} />

      {/* 6. Actionable Traffic Light & Operational Signals (Lámina 21) */}
      <div className="p-6 sm:p-8 rounded-3xl bio-hud-panel shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              Semáforo Operativo y Reglas Si/Entonces (Lámina 21)
            </h3>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-bio-deep border border-cyan-500/30 text-cyan-300 font-bold">
            Código: {santanderState.actionCode}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {santanderState.activeAlerts.map(alert => (
            <div 
              key={alert.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
                alert.severity === 'critical'
                  ? 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                  : alert.severity === 'high'
                    ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                    : 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <span className="text-xl">{alert.signal}</span>
              <div>
                <strong className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  Condición: {alert.condition}
                </strong>
                <p className="mt-0.5 leading-snug text-slate-300">
                  {alert.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

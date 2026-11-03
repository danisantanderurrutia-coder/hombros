import React, { useState } from 'react';
import { Users, Trees, Coins, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Layers, Sliders, Calculator, Database } from 'lucide-react';
import { NORMALIZATION_GOALPOSTS, normalizeRawValue, denormalizeScoreToRaw } from '../models/normalization';
import { InlineMath } from './KaTeXMath';

export default function ThreeShouldersBreakdown({ santanderState, territory }) {
  const [expandedShoulder, setExpandedShoulder] = useState('ambiental');
  const [selectedNormVar, setSelectedNormVar] = useState('e2');
  const [customRawInput, setCustomRawInput] = useState(
    denormalizeScoreToRaw('e2', santanderState?.currentVars?.e2 ?? 0.38)
  );
  const [showNormLab, setShowNormLab] = useState(true);

  const { S, E, K, H, H_base, phiCrit, hasCriticalShoulder, currentVars } = santanderState;

  const toggleShoulder = (id) => {
    setExpandedShoulder(prev => prev === id ? null : id);
  };

  const handleSelectNormVar = (varKey, currentScore) => {
    setSelectedNormVar(varKey);
    setCustomRawInput(denormalizeScoreToRaw(varKey, currentScore));
    setShowNormLab(true);
  };

  const activeSpec = NORMALIZATION_GOALPOSTS[selectedNormVar] || NORMALIZATION_GOALPOSTS.e2;
  const computedLiveScore = normalizeRawValue(selectedNormVar, customRawInput);

  const shoulders = [
    {
      id: 'social',
      name: 'Hombro Social (S)',
      val: S,
      icon: Users,
      cardClass: 'card-rose',
      textColor: 'text-[#DA7B93]',
      badgeBg: 'bg-[#301b24] text-[#DA7B93] border-[#DA7B93]/40',
      description: 'Cohesión comunitaria, instituciones locales, capital humano y ausencia de violencia estructural.',
      variables: [
        { key: 's1', name: 'Cohesión Social (S₁)', val: currentVars.s1, desc: 'Confianza comunitaria + organización territorial activa', source: 'Comunidad / CASEN' },
        { key: 's2', name: 'Capacidad Institucional (S₂)', val: currentVars.s2, desc: 'Eficiencia presupuestaria municipal + participación local', source: 'SINIM / SUBDERE' },
        { key: 's3', name: 'Capital Humano (S₃)', val: currentVars.s3, desc: 'Años de escolaridad promedio + saberes locales', source: 'CASEN / MINEDUC' },
        { key: 's4', name: 'Ausencia de Violencia (S₄)', val: currentVars.s4, desc: 'Inverso de tasa de delitos y conflictividad socioambiental', source: 'CEAD / INDH' }
      ]
    },
    {
      id: 'ambiental',
      name: 'Hombro Ambiental (E)',
      val: E,
      icon: Trees,
      cardClass: 'card-teal',
      textColor: 'text-[#376E6F]',
      badgeBg: 'bg-[#173132] text-[#376E6F] border-[#376E6F]/40',
      description: 'Integridad ecosistémica, disponibilidad hídrica por cuenca, suelo vivo y resiliencia climática.',
      variables: [
        { key: 'e1', name: 'Integridad Ecosistémica (E₁)', val: currentVars.e1, desc: 'Cobertura de bosque nativo / superficie de cuenca', source: 'CONAF / Sentinel-2' },
        { key: 'e2', name: 'Disponibilidad Hídrica (E₂)', val: currentVars.e2, desc: 'm³/hab/año renovable neto (escala logarítmica Falkenmark)', source: 'DGA / SNIA' },
        { key: 'e3', name: 'Calidad de Suelo (E₃)', val: currentVars.e3, desc: '% Materia orgánica edáfica libre de toxicidad por metales', source: 'CIREN / LUCAS' },
        { key: 'e4', name: 'Resiliencia Climática (E₄)', val: currentVars.e4, desc: 'Inverso de concentración PM2.5 (µg/m³) y exposición térmica', source: 'SINCA / ARClim' }
      ]
    },
    {
      id: 'economico',
      name: 'Hombro Económico (K)',
      val: K,
      icon: Coins,
      cardClass: 'card-indigo',
      textColor: 'text-[#8D69A6]',
      badgeBg: 'bg-[#261c46] text-[#8D69A6] border-[#44318D]/50',
      description: 'Diversificación productiva, autonomía de ingreso, distribución justa y equilibrio regenerativo.',
      variables: [
        { key: 'k1', name: 'Diversificación Productiva (K₁)', val: currentVars.k1, desc: 'Inverso del Índice Herfindahl-Hirschman sectorial (IHH)', source: 'SII / Rubros' },
        { key: 'k2', name: 'Autonomía Económica (K₂)', val: currentVars.k2, desc: '% ingresos propios locales / ingresos totales municipales', source: 'SINIM / Municipal' },
        { key: 'k3', name: 'Distribución del Ingreso (K₃)', val: currentVars.k3, desc: 'Re-escalado de equidad sobre Coeficiente de Gini [0.22 - 0.65]', source: 'CASEN / WID' },
        { key: 'k4', name: 'Balance Biótico (K₄)', val: currentVars.k4, desc: 'Ratio tasa regenerativa / tasa extractiva material', source: 'Cuentas MFA' }
      ]
    }
  ];

  return (
    <div className="rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl card-magenta space-y-6">
      {/* Header with Geometric Mean Formula & Hypothesis Framing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-[#2A1B3D] border-[#D83F87]/40 text-[#D83F87] shadow-sm">
              Nivel 1, 2 & 3: Hipótesis Paramétricas, Hombros y Media Geométrica
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-sm">
              Fase Pre-Fondo · Validación Empírica & Acople AgriTwin
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight mt-2 text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#D83F87]" />
            Hipótesis de Capacidad Portante: H = (S · E · K)<sup>1/3</sup> · Φ<sub>crit</sub>
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            <strong>Estatus Epistemológico (Hipótesis de Trabajo):</strong> Los puntajes de los Tres Hombros operan como <em>hipótesis paramétricas falsables</em> formuladas con registros abiertos (Tier 1/2) para nuestra postulación a fondos de investigación. Su implementación financiada desplegará validación empírica <strong>Tier 3</strong> en terreno (sondeos hidrogeofísicos SEV, Eddy Covariance y telemetría satelital <strong>AgriTwin</strong> Sentinel-2 STAC/COG).
          </p>
        </div>

        {/* Global H Indicator */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#160b24]/90 shadow-xl shrink-0 font-mono text-center min-w-[190px]">
          <span className="block text-[10px] text-[#A4B3B6] uppercase tracking-wider font-bold">Capacidad Efectiva H</span>
          <span className="text-3xl font-serif font-black text-white">{H.toFixed(3)}</span>
          {hasCriticalShoulder && H_base && (
            <span className="block text-[10px] text-rose-400 font-mono">
              H<sub>base</sub>={H_base.toFixed(2)} × Φ<sub>crit</sub>={phiCrit?.toFixed(2)}
            </span>
          )}
          <span className="block text-[10px] text-[#DA7B93] mt-0.5 font-bold">
            {hasCriticalShoulder ? '⚠️ PENALIZACIÓN LIEBIG ACTIVA' : '✓ EQUILIBRIO BIOFÍSICO'}
          </span>
        </div>
      </div>

      {/* 3 Distinct Shoulders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shoulders.map(sh => {
          const Icon = sh.icon;
          const isExpanded = expandedShoulder === sh.id;
          const isCritical = sh.val < 0.25;

          return (
            <div 
              key={sh.id}
              className={`rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between ${sh.cardClass} ${
                isCritical ? 'ring-2 ring-rose-500 shadow-rose-950/50' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#140b20]/80 border border-white/10">
                      <Icon className={`w-5 h-5 ${sh.textColor}`} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        {sh.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Índice Normalizado [0 - 1]
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${sh.badgeBg}`}>
                    {sh.val.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                  {sh.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? 'bg-rose-500' : 'bg-gradient-to-r from-white/40 to-white'
                      }`}
                      style={{ width: `${Math.round(sh.val * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Collapsible details for the 4 internal variables with Raw-to-Score inspection */}
                {isExpanded && (
                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                    {sh.variables.map(v => {
                      const spec = NORMALIZATION_GOALPOSTS[v.key];
                      const equivRaw = denormalizeScoreToRaw(v.key, v.val);
                      const isVarSelected = selectedNormVar === v.key;

                      return (
                        <div 
                          key={v.key} 
                          onClick={() => handleSelectNormVar(v.key, v.val)}
                          className={`p-2.5 rounded-xl border font-mono cursor-pointer transition-all ${
                            isVarSelected 
                              ? 'bg-white/15 border-white/50 shadow-md' 
                              : 'bg-black/30 border-white/10 hover:bg-black/50'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[11px] mb-0.5">
                            <span className="font-bold text-white">{v.name}</span>
                            <span className="font-bold text-emerald-300">{v.val?.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-amber-200/90 mb-1">
                            <span>Dato Crudo: <strong>{equivRaw} {spec?.unit}</strong></span>
                            <span className="underline text-[9px] text-slate-300">Auditar fórmula</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans leading-tight">
                            {v.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleShoulder(sh.id)}
                className="mt-4 pt-2.5 border-t border-white/10 text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-between w-full transition-colors"
              >
                <span>{isExpanded ? 'Ocultar Variables & Datos Crudos' : 'Ver Variables & Datos Crudos'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* PUENTE METODOLÓGICO: MOTOR DE NORMALIZACIÓN (DEL DATO CRUDO AL 0 - 1) */}
      {/* ===================================================================== */}
      <div className="pt-4 border-t border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#DA7B93]" />
            <h4 className="text-sm sm:text-base font-serif font-bold text-white">
              Puente Metodológico: Función de Normalización (Dato Físico Crudo → Índice [0, 1])
            </h4>
          </div>
          <button
            onClick={() => setShowNormLab(!showNormLab)}
            className="text-xs font-mono px-3 py-1 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 border border-white/15 self-start sm:self-auto"
          >
            {showNormLab ? 'Ocultar Inspector de Postes de Meta' : 'Abrir Inspector de Postes de Meta'}
          </button>
        </div>

        {showNormLab && (
          <div className="p-5 rounded-2xl bg-black/45 border border-white/15 space-y-4">
            {/* Variable Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {Object.values(NORMALIZATION_GOALPOSTS).filter(g => g.shoulder !== 'D').map(g => (
                <button
                  key={g.id}
                  onClick={() => handleSelectNormVar(g.id, currentVars[g.id] ?? 0.5)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border ${
                    selectedNormVar === g.id
                      ? 'bg-[#D83F87] text-white border-white/40 shadow-md'
                      : 'bg-black/40 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {g.code} · {g.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left: Goalposts & Formula */}
              <div className="lg:col-span-7 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#DA7B93] font-bold block">
                      {activeSpec.shoulderName} · {activeSpec.dataTier}
                    </span>
                    <h5 className="text-base font-serif font-bold text-white">
                      {activeSpec.code}: {activeSpec.name}
                    </h5>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/10 text-slate-200 border border-white/15">
                    Polaridad: {activeSpec.polarity === 'INVERSE_LINEAR' ? 'Inversa (Menos es Mejor)' : activeSpec.polarity === 'LOG_BOUNDED' ? 'Logarítmica (Falkenmark)' : 'Directa (Más es Mejor)'}
                  </span>
                </div>

                <p className="text-slate-300 font-sans leading-relaxed">
                  <strong>Variable Cruda Observable:</strong> {activeSpec.rawMetricName} (<code className="text-amber-300">{activeSpec.unit}</code>). {activeSpec.rationale}
                </p>

                {/* 3 Goalposts Bar */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 font-mono">
                  <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30">
                    <span className="text-[9px] uppercase text-rose-300 block">Colapso (Score = 0.00)</span>
                    <strong className="text-sm text-white">{activeSpec.goalposts.collapseMin} {activeSpec.unit}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30">
                    <span className="text-[9px] uppercase text-amber-300 block">Umbral Liebig (0.25)</span>
                    <strong className="text-sm text-white">{activeSpec.goalposts.liebigCrit} {activeSpec.unit}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                    <span className="text-[9px] uppercase text-emerald-300 block">Óptimo Sintrópico (1.00)</span>
                    <strong className="text-sm text-white">{activeSpec.goalposts.syntropicOpt} {activeSpec.unit}</strong>
                  </div>
                </div>
              </div>

              {/* Right: Live Converter Calculator */}
              <div className="lg:col-span-5 p-4 rounded-2xl bg-[#160b24] border border-white/15 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-mono uppercase text-slate-300 font-bold">
                    Simulador de Normalización en Vivo
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    <InlineMath math={activeSpec.formulaLatex} />
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Ingresa Dato Crudo (X<sub>raw</sub>):</span>
                    <span className="text-amber-300 font-bold">{customRawInput} {activeSpec.unit}</span>
                  </div>
                  <input
                    type="range"
                    min={Math.min(activeSpec.goalposts.collapseMin, activeSpec.goalposts.syntropicOpt)}
                    max={Math.max(activeSpec.goalposts.collapseMin, activeSpec.goalposts.syntropicOpt)}
                    step={(Math.abs(activeSpec.goalposts.syntropicOpt - activeSpec.goalposts.collapseMin) / 100) || 0.01}
                    value={customRawInput}
                    onChange={(e) => setCustomRawInput(parseFloat(e.target.value))}
                    className="w-full accent-[#D83F87] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/10 font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Índice Normalizado {activeSpec.code}</span>
                    <span className="text-xs text-slate-300">
                      {computedLiveScore < 0.25 ? '🔴 Activa Penalización Liebig (<0.25)' : computedLiveScore < 0.60 ? '🟡 Zona de Transición' : '🟢 Soporte Sintrópico Robusto'}
                    </span>
                  </div>
                  <span className={`text-2xl font-bold ${computedLiveScore < 0.25 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {computedLiveScore.toFixed(3)}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#DA7B93] shrink-0" />
                  <span className="truncate">Fuentes: {activeSpec.officialSources.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

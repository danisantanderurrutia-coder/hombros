import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, Scale, Calculator, Activity, FileCheck2,
  AlertTriangle, CheckCircle2, Flame, Globe, Sliders, Printer,
  ArrowRight, Database, Layers, TrendingUp, Lock, Unlock, RotateCcw, Image
} from 'lucide-react';
import { INITIAL_TERRITORIES } from '../models/territories';
import { calculateHombrosFullState } from '../models/santanderModel';
import { NORMALIZATION_GOALPOSTS, normalizeRawValue, denormalizeScoreToRaw } from '../models/normalization';
import { InlineMath, BlockMath } from './KaTeXMath';
import { getAssetUrl } from '../utils/assets';

const INVESTMENT_ARCHETYPES = [
  {
    id: 'baseline',
    name: '0. Línea Base Actual (Sin Proyecto Incremental)',
    badge: 'Estado Basal σ₀',
    deltaD1: 0.0,
    deltaD2: 0.0,
    deltaD3: 0.0,
    deltaE: 0.0,
    deltaS: 0.0,
    deltaK: 0.0,
    description: 'Evalúa la solvencia metabólica actual de la cuenca sin añadir nueva carga extractiva ni inmobiliaria.'
  },
  {
    id: 'agro_forestal',
    name: '1. Expansión Monocultivo Forestal / Agroexportación (+5.000 ha)',
    badge: 'Ensayo Extractivo (ΔD₁ +0.28)',
    deltaD1: 0.28,
    deltaD2: 0.02,
    deltaD3: 0.12,
    deltaE: -0.09,
    deltaS: -0.03,
    deltaK: -0.04,
    description: 'Simula la concesión de nuevos derechos consuntivos de agua y sustitución de vegetación nativa por monocultivo intensivo de exportación.'
  },
  {
    id: 'inmobiliario_turistico',
    name: '2. Megaproyecto Inmobiliario / Resort Turístico Costero',
    badge: 'Sellado & Flotante (ΔD₂ +0.25, ΔD₃ +0.22)',
    deltaD1: 0.08,
    deltaD2: 0.25,
    deltaD3: 0.22,
    deltaE: -0.07,
    deltaS: -0.05,
    deltaK: 0.02,
    description: 'Impermeabilización de humedales/suelo absorbente, aumento de población flotante estival y encarecimiento especulativo del suelo.'
  },
  {
    id: 'industrial_portuario',
    name: '3. Complejo Termo-Industrial / Hub Logístico Portuario',
    badge: 'Alta Carga Tóxica (ΔD₁ +0.40, ΔE -0.14)',
    deltaD1: 0.40,
    deltaD2: 0.10,
    deltaD3: 0.25,
    deltaE: -0.14,
    deltaS: -0.08,
    deltaK: 0.04,
    description: 'Incremento severo de emisiones directas (SO₂, PM2.5, metales pesados) y presión sobre la sección transversal biofísica de la cuenca.'
  },
  {
    id: 'restauracion_sintropica',
    name: '4. Plan de Inversión Sintrópica & Gobernanza Cooperativa en Panal',
    badge: 'Regeneración Activa (ΔE +0.14, ΔS +0.10)',
    deltaD1: -0.15,
    deltaD2: 0.0,
    deltaD3: -0.10,
    deltaE: 0.14,
    deltaS: 0.10,
    deltaK: 0.12,
    description: 'Cosecha de aguas lluvia (Keyline), reforestación con bosque nativo esclerófilo, agroforestería sintrópica y cooperativas locales.'
  }
];

export default function MetabolicAuditView() {
  const [selectedTerritoryId, setSelectedTerritoryId] = useState('chanco');
  const [selectedArchetypeId, setSelectedArchetypeId] = useState('agro_forestal');
  const [activeAuditStep, setActiveAuditStep] = useState('all'); // 'all' | 'step1_norm' | 'step2_traction' | 'step3_rating'
  const [rawOverrides, setRawOverrides] = useState({});
  const [customDeltaD, setCustomDeltaD] = useState(null);
  const [customDeltaE, setCustomDeltaE] = useState(null);

  const territory = useMemo(() => {
    return INITIAL_TERRITORIES.find(t => t.id === selectedTerritoryId) || INITIAL_TERRITORIES[0];
  }, [selectedTerritoryId]);

  const archetype = useMemo(() => {
    return INVESTMENT_ARCHETYPES.find(a => a.id === selectedArchetypeId) || INVESTMENT_ARCHETYPES[0];
  }, [selectedArchetypeId]);

  const handleSelectTerritory = (id) => {
    setSelectedTerritoryId(id);
    setRawOverrides({});
  };

  const handleSelectArchetype = (id) => {
    setSelectedArchetypeId(id);
    setCustomDeltaD(null);
    setCustomDeltaE(null);
  };

  // Compute effective normalized variables from territory + any user raw overrides in Step 1
  const effectiveVariables = useMemo(() => {
    const base = { ...territory.variables };
    for (const [varKey, rawVal] of Object.entries(rawOverrides)) {
      if (base[varKey] !== undefined) {
        base[varKey] = normalizeRawValue(varKey, rawVal);
      }
    }
    return base;
  }, [territory, rawOverrides]);

  // Baseline State (sigma_0)
  const baselineState = useMemo(() => {
    return calculateHombrosFullState({
      ...territory,
      variables: effectiveVariables
    });
  }, [territory, effectiveVariables]);

  // Projected State after Investment Traction Test (sigma_proj)
  const tractionAudit = useMemo(() => {
    const d1Delta = customDeltaD !== null ? customDeltaD : archetype.deltaD1;
    const d2Delta = customDeltaD !== null ? customDeltaD * 0.5 : archetype.deltaD2;
    const d3Delta = customDeltaD !== null ? customDeltaD * 0.7 : archetype.deltaD3;
    const eDelta = customDeltaE !== null ? customDeltaE : archetype.deltaE;

    const projVars = {
      s1: Math.min(1, Math.max(0.02, effectiveVariables.s1 + archetype.deltaS)),
      s2: Math.min(1, Math.max(0.02, effectiveVariables.s2 + archetype.deltaS * 0.8)),
      s3: effectiveVariables.s3,
      s4: Math.min(1, Math.max(0.02, effectiveVariables.s4 + archetype.deltaS)),

      e1: Math.min(1, Math.max(0.02, effectiveVariables.e1 + eDelta)),
      e2: Math.min(1, Math.max(0.02, effectiveVariables.e2 + eDelta * 1.15)),
      e3: Math.min(1, Math.max(0.02, effectiveVariables.e3 + eDelta)),
      e4: Math.min(1, Math.max(0.02, effectiveVariables.e4 + eDelta * 0.8)),

      k1: Math.min(1, Math.max(0.02, effectiveVariables.k1 + archetype.deltaK)),
      k2: Math.min(1, Math.max(0.02, effectiveVariables.k2 + archetype.deltaK)),
      k3: effectiveVariables.k3,
      k4: Math.min(1, Math.max(0.02, effectiveVariables.k4 + eDelta * 0.9))
    };

    const projPressures = {
      d1: Math.max(0.05, territory.pressureVars.d1 + d1Delta),
      d2: Math.max(0.05, territory.pressureVars.d2 + d2Delta),
      d3: Math.max(0.05, territory.pressureVars.d3 + d3Delta)
    };

    const projState = calculateHombrosFullState({
      ...territory,
      variables: projVars,
      pressureVars: projPressures
    });

    const yieldStress = 0.85;
    const fractureStress = 1.25;
    const E_mod = territory.materialProperties?.modulusElasticity || 1.25;

    // Strain & Plastic Hysteresis Calculation
    const eps0 = baselineState.sigma <= yieldStress
      ? baselineState.sigma / E_mod
      : (yieldStress / E_mod) + Math.pow(baselineState.sigma - yieldStress, 1.25) * 1.6;

    const epsProj = projState.sigma <= yieldStress
      ? projState.sigma / E_mod
      : (yieldStress / E_mod) + Math.pow(projState.sigma - yieldStress, 1.25) * 1.6;

    const plasticLossPct = projState.sigma > yieldStress
      ? Math.min(95, Math.round((projState.sigma - yieldStress) * 75))
      : 0;

    const recoveryMonths = projState.sigma > fractureStress
      ? 180
      : projState.sigma > yieldStress
      ? Math.round(18 + (projState.sigma - yieldStress) * 72)
      : 0;

    // Binding Verdict (SEIA 2.0)
    let verdictCode = 'APPROVED';
    let verdictTitle = 'APROBADO · DENTRO DE MARGEN ELÁSTICO REVERSIBLE';
    let verdictBadge = 'bg-emerald-600 text-white border-emerald-400';
    let verdictSummary = 'La sección transversal de la cuenca (H) absorbe la tracción del proyecto sin cruzar el límite de fluencia (σ < 0.85). El impacto es 100% elástico y reversible.';

    if (projState.hasCriticalShoulder || projState.sigma >= fractureStress) {
      verdictCode = 'MORATORIUM';
      verdictTitle = 'MORATORIA BIOFÍSICA VINCULANTE · FRACTURA DE CUENCA';
      verdictBadge = 'bg-rose-700 text-white border-rose-400';
      verdictSummary = projState.hasCriticalShoulder
        ? `Activación del Operador de Liebig (Φ_crit = ${projState.phiCrit}): ${projState.criticalDetails.join(', ')}. Ninguna compensación financiera puede autorizar la ruptura de un soporte vital.`
        : `La tensión proyectada (σ = ${projState.sigma.toFixed(2)}) supera el umbral de fractura catastrófica (1.25), consolidando una Zona de Sacrificio irreversible.`;
    } else if (projState.sigma >= 1.00) {
      verdictCode = 'REJECTED_PLASTIC';
      verdictTitle = 'RECHAZADO · INDUCE DEFORMACIÓN PLÁSTICA E HISTÉRESIS';
      verdictBadge = 'bg-[#C86D51] text-white border-amber-300';
      verdictSummary = `El proyecto empuja a la cuenca al régimen plástico irreversible (σ = ${projState.sigma.toFixed(2)} ≥ 1.00), provocando un ${plasticLossPct}% de daño estructural permanente y ${recoveryMonths} meses de pasivo de recuperación.`;
    } else if (projState.sigma >= yieldStress) {
      verdictCode = 'CONDITIONAL';
      verdictTitle = 'CONDICIONADO · EN LÍMITE DE FLUENCIA (EXIGE REGENERACIÓN SIMÉTRICA)';
      verdictBadge = 'bg-amber-600 text-white border-amber-300';
      verdictSummary = `El proyecto sitúa al territorio en la frontera de fatiga elástica (0.85 ≤ σ = ${projState.sigma.toFixed(2)} < 1.00). Solo puede ejecutarse si invierte previamente en elevar H hasta devolver σ < 0.80.`;
    }

    // Biophysical Solvency Rating (Replaces Moody's / S&P)
    let solvencyRating = 'AAA · Sintrópico';
    let solvencyColor = 'text-emerald-400';
    if (projState.hasCriticalShoulder || projState.sigma >= 1.35) {
      solvencyRating = 'D · Default Ecosistémico';
      solvencyColor = 'text-rose-400';
    } else if (projState.sigma >= 1.15) {
      solvencyRating = 'CCC · Insolvencia Plástica';
      solvencyColor = 'text-rose-300';
    } else if (projState.sigma >= 1.00) {
      solvencyRating = 'B · Deuda Metabólica Alta';
      solvencyColor = 'text-amber-400';
    } else if (projState.sigma >= 0.85) {
      solvencyRating = 'BBB · Fluencia Vigilada';
      solvencyColor = 'text-yellow-300';
    } else if (projState.sigma >= 0.70) {
      solvencyRating = 'AA · Elástico Estable';
      solvencyColor = 'text-teal-300';
    }

    // Scope 3 Anti-Dumping & Metabolic Cannibalism Audit
    const em = projState.emissionsMetrics;
    const extRatioPct = Math.round((em.scope3Upstream / Math.max(0.1, em.consumptionTotal)) * 100);
    const isMetabolicCannibalism = extRatioPct > 50 && em.scope3Upstream > 4.0;
    const restitutionTaxUSDPerCap = isMetabolicCannibalism
      ? Math.round((em.scope3Upstream - 2.5) * 145)
      : 0;

    return {
      projState,
      eps0: parseFloat(eps0.toFixed(3)),
      epsProj: parseFloat(epsProj.toFixed(3)),
      deltaSigma: parseFloat((projState.sigma - baselineState.sigma).toFixed(3)),
      plasticLossPct,
      recoveryMonths,
      verdictCode,
      verdictTitle,
      verdictBadge,
      verdictSummary,
      solvencyRating,
      solvencyColor,
      extRatioPct,
      isMetabolicCannibalism,
      restitutionTaxUSDPerCap
    };
  }, [territory, effectiveVariables, baselineState, archetype, customDeltaD, customDeltaE]);

  const varGroups = [
    { shoulder: 'S', title: 'Hombro Social (S)', keys: ['s1', 's2', 's3', 's4'], color: 'border-[#DA7B93]/40 bg-[#301b24]/60' },
    { shoulder: 'E', title: 'Hombro Ambiental (E)', keys: ['e1', 'e2', 'e3', 'e4'], color: 'border-[#376E6F]/50 bg-[#173132]/60' },
    { shoulder: 'K', title: 'Hombro Económico (K)', keys: ['k1', 'k2', 'k3', 'k4'], color: 'border-[#8D69A6]/50 bg-[#261c46]/60' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* =================================================================== */}
      {/* HEADER EJECUTIVO DEL SISTEMA DE AUDITORÍA CANÓNICA HOMBROS          */}
      {/* =================================================================== */}
      <div className="card-magenta rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D83F87]/35 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D83F87]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C86D51] text-white">
                Estándar Metodológico Verificable · SEIA 2.0 Biofísico
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#376E6F] text-white">
                Protocolo OECD/JRC + Liebig + Cauchy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-black tracking-tight">
              Sistema de Auditoría de Tracción Territorial & Solvencia Metabólica
            </h1>
            <p className="text-xs sm:text-sm text-black font-medium mt-1.5 max-w-3xl leading-relaxed">
              De un sitio web informativo a una <strong>metodología auditable de 3 eslabones</strong>: 
              <strong> (I)</strong> Normalización trazable desde el dato físico crudo (<InlineMath math="X_{\text{raw}} \to [0,1]" />), 
              <strong> (II)</strong> Ensayo de Tracción Mecánica pre-inversión (<InlineMath math="\sigma_0 \to \sigma_{\text{proj}}" />) y 
              <strong> (III)</strong> Rating de Solvencia Biofísica con fiscalización de Canibalismo Metabólico (Scope 3).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#28475A] hover:bg-[#1e3544] text-white text-xs font-mono font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Acta de Dictamen</span>
            </button>
          </div>
        </div>

        {/* Selector de Territorio y Filtro de Eslabones */}
        <div className="mt-6 pt-5 border-t border-[#D4C9B8] flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-black mr-1">Cuenca Auditada:</span>
            {INITIAL_TERRITORIES.map(t => (
              <button
                key={t.id}
                onClick={() => handleSelectTerritory(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  selectedTerritoryId === t.id
                    ? 'bg-[#487075] text-white border-[#376E6F] shadow-md'
                    : 'bg-white/85 text-slate-800 border-[#D4C9B8] hover:bg-white'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Flujo Completo (I + II + III)' },
              { id: 'step1_norm', label: 'I. Dato Crudo → [0,1]' },
              { id: 'step2_traction', label: 'II. Ensayo de Tracción' },
              { id: 'step3_rating', label: 'III. Rating & Acta' }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setActiveAuditStep(st.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all border ${
                  activeAuditStep === st.id
                    ? 'bg-[#C86D51] text-white border-[#927660]'
                    : 'bg-white/70 text-slate-800 border-[#D4C9B8] hover:bg-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ESLABÓN I: AUDITORÍA DE NORMALIZACIÓN (DEL DATO CRUDO AL 0 - 1)     */}
      {/* =================================================================== */}
      {(activeAuditStep === 'all' || activeAuditStep === 'step1_norm') && (
        <div className="card-teal rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7DB2B2]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-emerald-500/30">
                Eslabón Metodológico I · Protocolo Goalpost Scaling (OECD/JRC + Falkenmark + Liebig)
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-emerald-300" />
                1. Trazabilidad de Normalización: Del Dato Físico Crudo al Espacio [0, 1]
              </h2>
              <p className="text-xs text-slate-200 mt-1 max-w-3xl leading-relaxed">
                Cada variable de <strong>{territory.name}</strong> se audita en su unidad física real antes de ingresar a la media geométrica. Puedes modificar cualquier dato crudo para verificar cómo las funciones de transferencia (Directa, Inversa o Logarítmica) recalculan el hombro y activan el corte de Liebig (<InlineMath math="H_i < 0.25" />).
              </p>
            </div>

            {Object.keys(rawOverrides).length > 0 && (
              <button
                onClick={() => setRawOverrides({})}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-md shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Datos Oficiales ({Object.keys(rawOverrides).length})</span>
              </button>
            )}
          </div>

          {/* 3 Columns for S, E, K Raw-to-Normalized Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {varGroups.map(group => {
              const shoulderScore = baselineState[group.shoulder];
              const isShoulderCrit = shoulderScore < 0.25;

              return (
                <div key={group.shoulder} className={`p-4 rounded-2xl border ${group.color} space-y-3`}>
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div>
                      <h3 className="font-serif font-bold text-base text-white">{group.title}</h3>
                      <span className="text-[10px] font-mono text-slate-300">Promedio Ponderado Nivel 2</span>
                    </div>
                    <span className={`px-3 py-1 rounded-xl font-mono text-sm font-black border ${
                      isShoulderCrit ? 'bg-rose-600 text-white border-rose-300 animate-pulse' : 'bg-black/50 text-emerald-300 border-white/20'
                    }`}>
                      {group.shoulder} = {shoulderScore.toFixed(3)}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {group.keys.map(k => {
                      const spec = NORMALIZATION_GOALPOSTS[k];
                      const normVal = effectiveVariables[k];
                      const currentRaw = rawOverrides[k] !== undefined
                        ? rawOverrides[k]
                        : denormalizeScoreToRaw(k, territory.variables[k]);
                      const isCritVar = normVal < 0.25;

                      return (
                        <div key={k} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 font-mono text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{spec.code} · {spec.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              isCritVar ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {normVal.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-300">
                            <span>Dato Crudo: <strong className="text-amber-300">{currentRaw} {spec.unit}</strong></span>
                            <span className="text-slate-400">{spec.dataTier.split(' ')[0]} {spec.dataTier.split(' ')[1]}</span>
                          </div>

                          <input
                            type="range"
                            min={Math.min(spec.goalposts.collapseMin, spec.goalposts.syntropicOpt)}
                            max={Math.max(spec.goalposts.collapseMin, spec.goalposts.syntropicOpt)}
                            step={(Math.abs(spec.goalposts.syntropicOpt - spec.goalposts.collapseMin) / 100) || 0.01}
                            value={currentRaw}
                            onChange={(e) => setRawOverrides(prev => ({ ...prev, [k]: parseFloat(e.target.value) }))}
                            className="w-full accent-[#D83F87] cursor-pointer h-1.5"
                          />

                          <div className="flex justify-between text-[9px] text-slate-400 pt-0.5">
                            <span>0.0: {spec.goalposts.collapseMin}</span>
                            <span className="text-amber-300/90">Liebig(0.25): {spec.goalposts.liebigCrit}</span>
                            <span>1.0: {spec.goalposts.syntropicOpt}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Embedded Canonical Figure 6 */}
          <div className="p-4 rounded-2xl bg-[#0c0714] border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7">
              <img
                src={getAssetUrl('docs/figures/fig6_normalization_transfer_functions.png')}
                alt="Figura 6: Funciones de Transferencia y Normalización Canónica"
                className="w-full max-h-[300px] object-contain rounded-xl border border-white/10"
              />
            </div>
            <div className="lg:col-span-5 space-y-2.5 text-xs text-slate-200 p-2">
              <span className="px-2.5 py-1 rounded-md bg-[#376E6F] text-white font-mono text-[10px] font-bold uppercase">
                Nueva Figura 6 Canónica (R v4.5.2)
              </span>
              <h4 className="font-serif font-bold text-base text-white">
                Curvas de Transferencia Multi-Polaridad y Umbral de Liebig
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">
                Generada por <code className="text-emerald-300">scripts/R/01_data_harmonization.R</code> y <code className="text-emerald-300">06_figure_factory.R</code>. Demuestra cómo las tres familias matemáticas (Lineal Directa, Logarítmica Hídrica de Falkenmark y Lineal Inversa) proyectan magnitudes heterogéneas al intervalo <InlineMath math="[0, 1]" />, fijando en <InlineMath math="H_i = 0.25" /> la zona roja de micro-fractura de Liebig.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ESLABÓN II: ENSAYO DE TRACCIÓN TERRITORIAL PRE-INVERSIÓN (SEIA 2.0) */}
      {/* =================================================================== */}
      {(activeAuditStep === 'all' || activeAuditStep === 'step2_traction') && (
        <div className="card-indigo rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#8D69A6]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-500/30">
                Eslabón Metodológico II · Ensayo de Carga Virtual Uniaxial (Cauchy + Hooke + Griffith)
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2">
                <Scale className="w-6 h-6 text-amber-300" />
                2. Ensayo de Tracción Territorial Pre-Inversión (Stress-Test de Cuenca)
              </h2>
              <p className="text-xs text-slate-200 mt-1 max-w-3xl leading-relaxed">
                Antes de autorizar un proyecto extractivo, inmobiliario, energético o turístico en <strong>{territory.name}</strong>, sometemos su sección portante (<InlineMath math="H" />) a la tracción incremental del proyecto (<InlineMath math="\Delta D, \Delta E" />). Si el esfuerzo resultante <InlineMath math="\sigma_{\text{proj}}" /> cruza el límite de fluencia (<InlineMath math="0.85" />), el proyecto induce daño plástico irreversible.
              </p>
            </div>
          </div>

          {/* Selector de Arquetipo de Proyecto a Auditar */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-300 font-bold block">
              Selecciona el Proyecto / Intervención a Someter a Auditoría en {territory.name}:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
              {INVESTMENT_ARCHETYPES.map(arch => {
                const isSelected = selectedArchetypeId === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => handleSelectArchetype(arch.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#D83F87]/30 border-white ring-2 ring-white shadow-xl'
                        : 'bg-black/35 border-white/10 hover:bg-black/55 text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/50 text-amber-300 border border-amber-400/30 inline-block mb-1.5">
                        {arch.badge}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-white leading-snug">
                        {arch.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-2 line-clamp-2 font-sans">
                      {arch.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fine-tuning Sliders & Traction Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Custom Load Sliders */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black/45 border border-white/15 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                  Calibración Fina del Vector de Carga del Proyecto
                </span>
                <p className="text-xs text-slate-300 font-sans mb-4">
                  {archetype.description}
                </p>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-200">Sobrecarga de Presión (ΔD):</span>
                      <span className="text-amber-300 font-bold">
                        {(customDeltaD !== null ? customDeltaD : archetype.deltaD1) >= 0 ? '+' : ''}
                        {(customDeltaD !== null ? customDeltaD : archetype.deltaD1).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-0.25"
                      max="0.60"
                      step="0.01"
                      value={customDeltaD !== null ? customDeltaD : archetype.deltaD1}
                      onChange={(e) => setCustomDeltaD(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-200">Impacto en Hombro Ambiental (ΔE):</span>
                      <span className="text-emerald-300 font-bold">
                        {(customDeltaE !== null ? customDeltaE : archetype.deltaE) >= 0 ? '+' : ''}
                        {(customDeltaE !== null ? customDeltaE : archetype.deltaE).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-0.25"
                      max="0.25"
                      step="0.01"
                      value={customDeltaE !== null ? customDeltaE : archetype.deltaE}
                      onChange={(e) => setCustomDeltaE(parseFloat(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                <div>Ecuación de Tracción Auditada:</div>
                <div className="text-white font-bold mt-1">
                  σ_proj = (D₀ + ΔD) / [ (S · (E₀ + ΔE) · K)^(1/3) · Φ_crit ]
                </div>
              </div>
            </div>

            {/* Right: Before vs After Mechanical Telemetry */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-black/45 border border-white/15 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase block">Tensión Basal σ₀</span>
                  <strong className="text-xl text-slate-200">{baselineState.sigma.toFixed(3)}</strong>
                  <span className="text-[10px] text-slate-400 block">H₀ = {baselineState.H.toFixed(3)}</span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/20">
                  <span className="text-[10px] text-amber-300 uppercase block">Tensión Proyecto σ_proj</span>
                  <strong className={`text-xl ${tractionAudit.projState.sigma >= 1.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {tractionAudit.projState.sigma.toFixed(3)}
                  </strong>
                  <span className="text-[10px] text-slate-300 block">
                    Δσ = {tractionAudit.deltaSigma >= 0 ? '+' : ''}{tractionAudit.deltaSigma}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase block">Deformación ε_proj</span>
                  <strong className="text-xl text-white">{tractionAudit.epsProj}</strong>
                  <span className="text-[10px] text-rose-300 block">
                    Daño Plástico: {tractionAudit.plasticLossPct}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase block">Pasivo Histéresis</span>
                  <strong className="text-xl text-amber-300">{tractionAudit.recoveryMonths} m</strong>
                  <span className="text-[10px] text-slate-400 block">Tiempo restitución</span>
                </div>
              </div>

              {/* Visual Stress Gauge Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                  <span>0.0 (Elástico)</span>
                  <span className="text-amber-300">0.85 (Yield / Fluencia)</span>
                  <span className="text-rose-400">1.00 (Plástico)</span>
                  <span className="text-red-500 font-bold">1.25+ (Fractura)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-black/60 border border-white/15 relative overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      tractionAudit.projState.sigma >= 1.25
                        ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-red-700'
                        : tractionAudit.projState.sigma >= 0.85
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((tractionAudit.projState.sigma / 1.6) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Binding Verdict Banner */}
              <div className={`p-4 rounded-2xl border ${tractionAudit.verdictBadge} shadow-lg`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-90">
                    Dictamen Vinculante del Ensayo de Tracción Territorial
                  </span>
                  <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-black/30">
                    Código: {tractionAudit.verdictCode}
                  </span>
                </div>
                <h4 className="font-serif font-extrabold text-base sm:text-lg">
                  {tractionAudit.verdictTitle}
                </h4>
                <p className="text-xs mt-1 leading-relaxed opacity-95 font-sans">
                  {tractionAudit.verdictSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Canonical Figure 7 */}
          <div className="p-4 rounded-2xl bg-[#0c0714] border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7">
              <img
                src={getAssetUrl('docs/figures/fig7_audit_traction_stress_test.png')}
                alt="Figura 7: Auditoría de Ensayo de Tracción Territorial"
                className="w-full max-h-[300px] object-contain rounded-xl border border-white/10"
              />
            </div>
            <div className="lg:col-span-5 space-y-2.5 text-xs text-slate-200 p-2">
              <span className="px-2.5 py-1 rounded-md bg-[#D83F87] text-white font-mono text-[10px] font-bold uppercase">
                Nueva Figura 7 Canónica (R v4.5.2)
              </span>
              <h4 className="font-serif font-bold text-base text-white">
                Benchmark de Ensayo de Tracción Multi-Sitio (<InlineMath math="\sigma_0 \to \sigma_{\text{proj}}" />)
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">
                Compilada por la función <code className="text-amber-300">audit_territorial_traction()</code> en <code className="text-amber-300">scripts/R/02_mechanics_engine.R</code>. Muestra por qué un mismo proyecto de inversión es absorbido elásticamente en una cuenca con holgura (Chanco), pero empuja a metrópolis en fluencia (Copenhague, Bilbao, Berlín) hacia la deformación plástica y agrava la fractura en zonas de sacrificio (Quintero, Aconcagua).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ESLABÓN III: RATING DE SOLVENCIA METABÓLICA & ACTA OFICIAL          */}
      {/* =================================================================== */}
      {(activeAuditStep === 'all' || activeAuditStep === 'step3_rating') && (
        <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#927660]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#28475A] text-white">
                Eslabón Metodológico III · Certificación de Solvencia Biofísica & Justicia Metabólica Scope 3
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black mt-1.5 flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-[#C86D51]" />
                3. Acta Oficial de Dictamen Biofísico & Auditoría Anti-Dumping Scope 3
              </h2>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8] text-slate-800">
              Folio: HOMBROS-2026-{territory.id.toUpperCase()}-AUDIT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Biophysical Solvency Rating */}
            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  1. Rating de Solvencia Metabólica (Reemplazo Moody's/S&P)
                </span>
                <div className={`text-2xl sm:text-3xl font-serif font-black mt-2 ${tractionAudit.solvencyColor}`}>
                  {tractionAudit.solvencyRating}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  Sustituye la calificación de deuda financiera municipal por la solvencia real de sus activos biofísicos (<InlineMath math="H = (S \cdot E \cdot K)^{1/3} \cdot \Phi_{\text{crit}}" />).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-300 flex justify-between">
                <span>Capacidad Portante Efectiva:</span>
                <strong className="text-white">H = {tractionAudit.projState.H.toFixed(3)}</strong>
              </div>
            </div>

            {/* Card 2: Scope 3 Anti-Dumping Audit */}
            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  2. Auditoría de Desplazamiento Entrópico (Scope 3)
                </span>
                <div className={`text-xl font-serif font-black mt-2 ${tractionAudit.isMetabolicCannibalism ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {tractionAudit.isMetabolicCannibalism
                    ? `⚠️ ALERTA: CANIBALISMO METABÓLICO (${tractionAudit.extRatioPct}% Ext.)`
                    : `✓ HONESTIDAD METABÓLICA (${tractionAudit.extRatioPct}% Ext.)`}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  {tractionAudit.isMetabolicCannibalism
                    ? `${territory.name} externaliza el ${tractionAudit.extRatioPct}% de su huella total (${tractionAudit.projState.emissionsMetrics.scope3Upstream} tCO₂e/cap importadas). Se revoca cualquier sello "Net-Zero" local hasta restituir a las cuencas proveedoras.`
                    : `${territory.name} no parasita biocapacidad ajena: su huella importada Scope 3 es baja (${tractionAudit.projState.emissionsMetrics.scope3Upstream} tCO₂e/cap), absorbiendo internamente el esfuerzo productivo.`}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-300 flex justify-between">
                <span>Tributo Fondo Restitución Sintrópica:</span>
                <strong className="text-amber-300">
                  {tractionAudit.restitutionTaxUSDPerCap > 0 ? `$${tractionAudit.restitutionTaxUSDPerCap} USD/hab/año` : '$0 USD (Exento / Acreedor)'}
                </strong>
              </div>
            </div>

            {/* Card 3: Governance Prescription */}
            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  3. Prescripción Operativa Vinculante (Ostrom / Panal)
                </span>
                <div className="text-lg font-serif font-bold mt-2 text-white">
                  {tractionAudit.verdictCode === 'APPROVED'
                    ? 'Autorización con Custodia Comunitaria de Cuenca'
                    : tractionAudit.verdictCode === 'CONDITIONAL'
                    ? 'Compensación Biofísica 1:1 Previa a Ejecución'
                    : 'Bloqueo de Permisos y Activación de Socorro en Red Panal'}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  {tractionAudit.verdictCode === 'APPROVED'
                    ? 'El excedente regenerativo permite operar e intercambiar en la Red Panal sin degradar los hombros basales.'
                    : 'Queda prohibida toda exportación de biomasa o agua virtual desde el hombro deficitario hasta recuperar σ < 0.85.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-emerald-300 flex justify-between">
                <span>Estado de Certificación:</span>
                <strong>AUDITADO CONFORME A CANON v1.0</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

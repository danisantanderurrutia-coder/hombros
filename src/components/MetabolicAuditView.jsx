import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, Scale, Calculator, Activity, FileCheck2,
  AlertTriangle, CheckCircle2, Flame, Globe, Sliders, Printer,
  ArrowRight, Database, Layers, TrendingUp, Lock, Unlock, RotateCcw,
  PlusCircle, Cpu, Download, Coins, Sprout, Sparkles, Radio
} from 'lucide-react';
import { INITIAL_TERRITORIES } from '../models/territories';
import { calculateHombrosFullState } from '../models/santanderModel';
import { NORMALIZATION_GOALPOSTS, normalizeRawValue, denormalizeScoreToRaw } from '../models/normalization';
import { InlineMath, BlockMath } from './KaTeXMath';
import { getAssetUrl } from '../utils/assets';
import KitAuditaTuCuencaBanner from './KitAuditaTuCuencaBanner';
import AgriTwinBasinVecinalConsole from './AgriTwinBasinVecinalConsole';
import ResumenSimple from './ResumenSimple';

const INVESTMENT_ARCHETYPES = [
  {
    id: 'baseline',
    name: '0. Línea Base Actual (Sin Proyecto Incremental)',
    badge: 'Hipótesis Basal σ₀',
    deltaD1: 0.0,
    deltaD2: 0.0,
    deltaD3: 0.0,
    deltaE: 0.0,
    deltaS: 0.0,
    deltaK: 0.0,
    description: 'Evalúa la hipótesis de solvencia metabólica actual de la cuenca sin añadir nueva carga extractiva ni inmobiliaria.'
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

// Preset de Cuenca Propia alimentada por el Gemelo Digital AgriTwin (Río Longaví / Bullileo / Retiro)
const AGRITWIN_LONGAVI_PRESET = {
  id: 'custom_territory',
  name: 'Cuenca Río Longaví - Bullileo (AgriTwin)',
  country: 'Chile · Maule Sur',
  scale: 'Cuenca Hidro-Agrícola (122.070 ha · 5 APRs)',
  population: 21400,
  isCustom: true,
  variables: {
    s1: 0.72, // Cohesión Comités APR (Bullileo, Retiro, Copihue, Romeral, Villaseca)
    s2: 0.58, // Capacidad institucional comunal
    s3: 0.64, // Saberes campesinos + telemetría
    s4: 0.76, // Baja violencia urbana, amenaza piro-forestal en cabeceras
    e1: 0.52, // Sentinel-2 NDRE/NDVI mosaico transicional + relicto nativo
    e2: 0.48, // Embalse Bullileo (110 hm³) + recesión Maillet-Boussinesq Río Longaví
    e3: 0.61, // SOC_proxy Sentinel-2 SWIR + SoilGrids franco-arcilloso (3.8% MO)
    e4: 0.55, // Exposición a viento Puelche y riesgo WUI en laderas con pino
    k1: 0.56, // Diversificación: avellano, viña, cerezo, arroz, pradera, apicultura
    k2: 0.44, // Autonomía presupuestaria rural
    k3: 0.54, // Distribución predial mixta
    k4: 0.62  // Balance biótico con Tranque Keyline (18.500 m³) y manejo FAO-56
  },
  pressureVars: {
    d1: 0.44,
    d2: 0.22,
    d3: 0.36
  },
  kappa: 0.38,
  materialProperties: {
    modulusElasticity: 1.28,
    yieldStrength: 0.85,
    fractureToughness: 1.25
  },
  emissions: {
    scope1: 1.4,
    scope2: 0.8,
    scope3Upstream: 1.9,
    scope3Downstream: 0.9,
    localSequestration: 2.8,
    gridCarbonIntensity: 140
  },
  emissionsMetrics: {
    scope1Direct: 1.4,
    scope2Grid: 0.8,
    scope3Upstream: 1.9,
    consumptionTotal: 4.1,
    biogenicSequestration: 2.8
  }
};

export default function MetabolicAuditView({ initialCustomMode }) {
  const [selectedTerritoryId, setSelectedTerritoryId] = useState(
    initialCustomMode ? 'custom_territory' : 'chanco'
  );
  const [selectedArchetypeId, setSelectedArchetypeId] = useState('agro_forestal');
  const [activeSubtab, setActiveSubtab] = useState('step1_norm'); // 'step1_norm' | 'step2_traction' | 'step3_rating' | 'step4_roi'
  const [rawOverrides, setRawOverrides] = useState({});
  const [customDeltaD, setCustomDeltaD] = useState(null);
  const [customDeltaE, setCustomDeltaE] = useState(null);
  const [agritwinLive, setAgritwinLive] = useState(null); // última lectura de AgriTwin (o null)

  // Subpestañas del Sistema de Auditoría (Espejo de navegación por fases del CORE)
  const auditSubtabs = [
    { 
      id: 'step1_norm', 
      number: '1', 
      label: 'Hipótesis & Variables [0, 1]', 
      tag: 'Calibración & Cuenca', 
      icon: Calculator,
      color: 'from-[#376E6F] to-[#254b4c]' 
    },
    { 
      id: 'step2_traction', 
      number: '2', 
      label: 'Ensayo de Tracción SEIA 2.0', 
      tag: 'Carga Pre-Inversión', 
      icon: Scale,
      color: 'from-[#8D69A6] to-[#44318D]' 
    },
    { 
      id: 'step3_rating', 
      number: '3', 
      label: 'Rating & Salvaguarda', 
      tag: 'Dictamen Vinculante', 
      icon: ShieldCheck,
      color: 'from-[#C86D51] to-[#927660]' 
    },
    { 
      id: 'step4_roi', 
      number: '4', 
      label: 'ROI Biofísico vs. Inacción', 
      tag: 'Gasto Sísifo vs. Sintropía', 
      icon: Coins,
      color: 'from-[#DA7B93] to-[#D83F87]' 
    }
  ];

  // Estado para "+ Evaluar Tu Propio Territorio / Comuna"
  const [customMeta, setCustomMeta] = useState(() => {
    if (initialCustomMode === 'blank') {
      return {
        name: 'Mi Comuna / Cuenca en Estudio',
        region: 'Hipótesis Local Pre-Fondo',
        scale: 'Escala Comunal / Subcuenca',
        population: 15000,
        d1: 0.48,
        kappa: 0.32,
        agritwinLinked: false
      };
    }
    return {
      name: AGRITWIN_LONGAVI_PRESET.name,
      region: AGRITWIN_LONGAVI_PRESET.country,
      scale: AGRITWIN_LONGAVI_PRESET.scale,
      population: AGRITWIN_LONGAVI_PRESET.population,
      d1: AGRITWIN_LONGAVI_PRESET.pressureVars.d1,
      kappa: AGRITWIN_LONGAVI_PRESET.kappa,
      agritwinLinked: true
    };
  });

  useEffect(() => {
    if (initialCustomMode === 'agritwin') {
      handleActivateCustomTerritory(true);
    } else if (initialCustomMode === 'blank') {
      handleActivateCustomTerritory(false);
    }
  }, [initialCustomMode]);

  // Estado para la Calculadora de ROI Biofísico (Costo de Inacción vs. Inversión Sintrópica)
  const [roiInputs, setRoiInputs] = useState({
    aprFamiliesWaterTruck: 1200, // Familias abastecidas por camiones aljibe (~$1.450 USD/familia/año)
    annualFireRiskHectares: 1800, // Hectáreas en riesgo anual de incendio (~$920 USD/ha combate + pérdida edáfica)
    syntropicHectaresTarget: 2500, // Hectáreas a reconvertir con Keyline + Bosque Nativo + Cortafuegos WUI (~$1.350 USD/ha inversión única escalonada)
    horizonYears: 10
  });

  const territory = useMemo(() => {
    if (selectedTerritoryId === 'custom_territory') {
      return {
        ...AGRITWIN_LONGAVI_PRESET,
        name: customMeta.name,
        country: customMeta.region,
        scale: customMeta.scale,
        population: customMeta.population,
        kappa: customMeta.kappa,
        pressureVars: {
          ...AGRITWIN_LONGAVI_PRESET.pressureVars,
          d1: customMeta.d1
        }
      };
    }
    return INITIAL_TERRITORIES.find(t => t.id === selectedTerritoryId) || INITIAL_TERRITORIES[0];
  }, [selectedTerritoryId, customMeta]);

  const archetype = useMemo(() => {
    return INVESTMENT_ARCHETYPES.find(a => a.id === selectedArchetypeId) || INVESTMENT_ARCHETYPES[0];
  }, [selectedArchetypeId]);

  const handleSelectTerritory = (id) => {
    setSelectedTerritoryId(id);
    setRawOverrides({});
  };

  const handleActivateCustomTerritory = (useAgriTwinPreset = true) => {
    setSelectedTerritoryId('custom_territory');
    setActiveSubtab('step1_norm');
    setRawOverrides({});
    if (useAgriTwinPreset) {
      setCustomMeta({
        name: 'Cuenca Río Longaví - Bullileo (AgriTwin)',
        region: 'Chile · Maule Sur',
        scale: 'Cuenca Hidro-Agrícola (122.070 ha · 5 APRs)',
        population: 21400,
        d1: 0.44,
        kappa: 0.38,
        agritwinLinked: true
      });
    } else {
      setCustomMeta({
        name: 'Mi Comuna / Cuenca en Estudio',
        region: 'Hipótesis Local Pre-Fondo',
        scale: 'Escala Comunal / Subcuenca',
        population: 15000,
        d1: 0.48,
        kappa: 0.32,
        agritwinLinked: false
      });
    }
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

  // Cálculo del ROI Biofísico: Costo de Inacción (Gasto Paliativo Entrópico) vs. Inversión Sintrópica (OLCA / Maule)
  const roiMetrics = useMemo(() => {
    const annualWaterTruckUSD = roiInputs.aprFamiliesWaterTruck * 1450; // Costo fiscal camiones aljibe + logística DGA/SENAPRED
    const annualFireSuppressionUSD = roiInputs.annualFireRiskHectares * 920; // Combate aéreo/terrestre + pérdida de suelo y subsidios de emergencia
    const annualInactionTotalUSD = annualWaterTruckUSD + annualFireSuppressionUSD;
    const cumulativeInactionUSD = annualInactionTotalUSD * roiInputs.horizonYears;

    // Inversión Sintrópica (Keyline + Restauración de Vegas + Fajas Agroforestales WUI 45m + Soberanía APR)
    const capexSyntropicUSD = roiInputs.syntropicHectaresTarget * 1350;
    const annualMaintenanceUSD = capexSyntropicUSD * 0.06; // 6% OPEX cooperativo anual
    const annualAgroforestryRevenueUSD = roiInputs.syntropicHectaresTarget * 410; // Retorno local biomasa, miel, frutales/agroforestería y agua infiltrada
    const residualPalliativeUSD = annualInactionTotalUSD * 0.18; // Reducción del 82% en gasto de emergencia tras restaurar H

    const cumulativeSyntropicNetCostUSD =
      capexSyntropicUSD +
      (annualMaintenanceUSD + residualPalliativeUSD - annualAgroforestryRevenueUSD) * roiInputs.horizonYears;

    const netFiscalSavingsUSD = cumulativeInactionUSD - cumulativeSyntropicNetCostUSD;
    const benefitCostRatio = ((cumulativeInactionUSD - residualPalliativeUSD * roiInputs.horizonYears + annualAgroforestryRevenueUSD * roiInputs.horizonYears) /
      Math.max(1, capexSyntropicUSD + annualMaintenanceUSD * roiInputs.horizonYears)).toFixed(2);
    const paybackYears = Math.max(1.2, (capexSyntropicUSD / Math.max(1, annualInactionTotalUSD * 0.82 + annualAgroforestryRevenueUSD - annualMaintenanceUSD))).toFixed(1);

    return {
      annualWaterTruckM: (annualWaterTruckUSD / 1e6).toFixed(2),
      annualFireSuppressionM: (annualFireSuppressionUSD / 1e6).toFixed(2),
      annualInactionTotalM: (annualInactionTotalUSD / 1e6).toFixed(2),
      cumulativeInactionM: (cumulativeInactionUSD / 1e6).toFixed(2),
      capexSyntropicM: (capexSyntropicUSD / 1e6).toFixed(2),
      cumulativeSyntropicNetCostM: (Math.max(0, cumulativeSyntropicNetCostUSD) / 1e6).toFixed(2),
      netFiscalSavingsM: (netFiscalSavingsUSD / 1e6).toFixed(2),
      benefitCostRatio,
      paybackYears
    };
  }, [roiInputs]);

  const handleExportHypothesisJSON = () => {
    const payload = {
      protocol: 'HOMBROS-SEIA-2.0-HYPOTHESIS-ACTA',
      generatedAt: new Date().toISOString(),
      epistemologicalStatus: 'Hipótesis de Calibración Pre-Inversional (Postulación a Fondo de Investigación)',
      territory: {
        id: territory.id,
        name: territory.name,
        region: territory.country,
        scale: territory.scale,
        population: territory.population,
        agritwinCoupled: selectedTerritoryId === 'custom_territory' && customMeta.agritwinLinked
      },
      normalizedShouldersHypothesis: {
        S: baselineState.S,
        E: baselineState.E,
        K: baselineState.K,
        H_effective: baselineState.H,
        phiCrit: baselineState.phiCrit,
        variables: effectiveVariables
      },
      tractionStressTest: {
        archetypeEvaluated: archetype.name,
        sigma0: baselineState.sigma,
        sigmaProj: tractionAudit.projState.sigma,
        verdictCode: tractionAudit.verdictCode,
        solvencyRating: tractionAudit.solvencyRating
      }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HOMBROS_Hipotesis_${territory.id}_SEIA2.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Aplica cambios de variables ya normalizadas (0–1) en un solo paso.
  // 'd1' vive en customMeta (presión); el resto en rawOverrides.
  const applyNormalizedChanges = (changes) => {
    const { d1, ...vars } = changes;
    if (typeof d1 === 'number') {
      setCustomMeta(prev => ({ ...prev, d1: Math.min(0.95, Math.max(0.1, d1)) }));
    }
    if (Object.keys(vars).length > 0) {
      setRawOverrides(prev => {
        const next = { ...prev };
        for (const [k, v] of Object.entries(vars)) {
          next[k] = denormalizeScoreToRaw(k, v);
        }
        return next;
      });
    }
  };

  // Importa un JSON validando rangos. Avisa qué se aceptó y qué se descartó.
  const handleImportAgriTwinJson = (jsonData) => {
    const VALID_KEYS = ['s1','s2','s3','s4','e1','e2','e3','e4','k1','k2','k3','k4'];
    const accepted = {};
    const rejected = [];
    const source = jsonData && typeof jsonData === 'object' ? jsonData : {};
    const vars = source.variables && typeof source.variables === 'object' ? source.variables : {};

    for (const [k, v] of Object.entries(vars)) {
      if (VALID_KEYS.includes(k) && typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1) {
        accepted[k] = v;
      } else {
        rejected.push(k);
      }
    }
    if (typeof source.d1 === 'number' && source.d1 >= 0.1 && source.d1 <= 0.95) accepted.d1 = source.d1;
    else if (source.d1 !== undefined) rejected.push('d1');

    applyNormalizedChanges(accepted);

    if (typeof source.kappa === 'number' && source.kappa >= 0 && source.kappa <= 1) {
      setCustomMeta(prev => ({ ...prev, kappa: source.kappa }));
      accepted.kappa = source.kappa;
    } else if (source.kappa !== undefined) {
      rejected.push('kappa');
    }
    if (typeof source.name === 'string' && source.name.trim()) {
      setCustomMeta(prev => ({ ...prev, name: source.name.trim().slice(0, 120) }));
      accepted.name = true;
    }

    const okCount = Object.keys(accepted).length;
    if (okCount === 0) {
      alert('El archivo no tenía datos válidos. Se esperan números entre 0 y 1 en "variables" (s1…k4), y opcionalmente "kappa", "d1" y "name".');
    } else if (rejected.length > 0) {
      alert(`Se cargaron ${okCount} datos. Se descartaron por estar fuera de rango o mal escritos: ${rejected.join(', ')}.`);
    }
  };

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
      {/* HUD STICKY PERSISTENTE: PULSO BIOFÍSICO EN VIVO (SEIA 2.0 + HOMBROS) */}
      {/* =================================================================== */}
      <div className="sticky top-20 z-40 bg-[#0F1B1E]/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3 shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-300 font-serif text-sm">
              {territory.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              κ={baselineState.kappa?.toFixed(2) ?? '0.00'}
            </span>
          </div>

          {/* Trípode S, E, K y Capacidad H */}
          <div className="hidden sm:flex items-center gap-3 border-x border-white/10 px-3">
            <span className="text-[#DA7B93]">S={baselineState.S.toFixed(2)}</span>
            <span className="text-[#38bdf8]">E={baselineState.E.toFixed(2)}</span>
            <span className="text-[#c084fc]">K={baselineState.K.toFixed(2)}</span>
            <span className="font-bold text-white">➔ H={baselineState.H.toFixed(2)}</span>
          </div>

          {/* Tensión sigma_0 y Dictamen SEIA 2.0 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Tensión:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                baselineState.sigma < 0.70 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                baselineState.sigma <= 1.00 ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                'bg-rose-950 text-rose-300 border border-rose-500/30'
              }`}>
                σ₀={baselineState.sigma.toFixed(2)}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">Rating:</span>
              <span className={`font-bold ${tractionAudit.solvencyColor}`}>
                {tractionAudit.solvencyRating.split('·')[0]}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-slate-300 text-[11px]">Costo camiones aljibe:</span>
              <span className="font-bold text-amber-300" title="Gasto anual estimado con los supuestos del Eslabón IV (ejemplo, no medido)">
                ${roiMetrics.annualWaterTruckM}M USD/año
              </span>
            </div>

            <button
              onClick={handleExportHypothesisJSON}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1 transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* DESCARGO: este kit NO emite dictámenes ni ratings oficiales */}
      <div role="note" className="rounded-xl border border-amber-500/50 bg-amber-50 text-amber-950 px-4 py-2.5 text-xs sm:text-sm font-medium leading-relaxed">
        <strong>Importante:</strong> este kit es una <strong>herramienta de hipótesis y simulación</strong>.
        Los resultados («dictamen», «rating», «moratoria») <strong>no son un dictamen legal, ni una calificación
        financiera, ni una resolución del SEIA</strong>. Los valores marcados como «ejemplo» no son mediciones reales.
      </div>

      {/* RESUMEN EN PALABRAS SIMPLES + SEMÁFORO */}
      <ResumenSimple
        territoryName={territory.name}
        baseline={baselineState}
        projected={tractionAudit.projState}
        archetypeName={archetype.name}
        variables={effectiveVariables}
        dataMode={agritwinLive ? 'agritwin' : 'example'}
      />
      {/* =================================================================== */}
      {/* HEADER EJECUTIVO DEL SISTEMA DE AUDITORÍA & LABORATORIO DE HIPÓTESIS*/}
      {/* =================================================================== */}
      <div className="card-magenta rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D83F87]/35 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D83F87]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C86D51] text-white">
                Laboratorio de Hipótesis Biofísicas · Fase Pre-Fondo de Investigación
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#376E6F] text-white">
                Protocolo SEIA 2.0 + Acople AgriTwin STAC/COG
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-black tracking-tight">
              Sistema de Auditoría de Tracción Territorial, Hipótesis de Hombros & ROI Biofísico
            </h1>
            <p className="text-xs sm:text-sm text-black font-medium mt-1.5 max-w-3xl leading-relaxed">
              Los índices de los Tres Hombros (<InlineMath math="S, E, K" />) operan aquí como <strong>Hipótesis Paramétricas Falsables (Tier 1/2)</strong> diseñadas para ser validadas empíricamente en terreno mediante nuestra postulación a fondos de investigación y el acople con el Gemelo Digital <strong>AgriTwin</strong> (Sentinel-2 + FAO-56 + SEV).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportHypothesisJSON}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#487075] hover:bg-[#376E6F] text-white text-xs font-mono font-bold shadow-md transition-all"
              title="Descargar Ficha JSON de Hipótesis Territorial"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Hipótesis (.JSON)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#28475A] hover:bg-[#1e3544] text-white text-xs font-mono font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Acta</span>
            </button>
          </div>
        </div>

        {/* Selector de Territorio + Acceso Rápido al Kit Comunal */}
        <div className="mt-6 pt-5 border-t border-[#D4C9B8] flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-black mr-1">Hipótesis de Cuenca:</span>
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

            {/* Botón + Kit: Audita tu Propia Cuenca */}
            <button
              onClick={() => handleActivateCustomTerritory(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                selectedTerritoryId === 'custom_territory'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-600 ring-2 ring-amber-400/60 shadow-lg'
                  : 'bg-gradient-to-r from-[#122227] to-[#28475A] text-amber-300 border-amber-400/60 hover:brightness-115 shadow-md'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${selectedTerritoryId === 'custom_territory' ? 'text-slate-950' : 'text-amber-300'}`} />
              <span>⚡ Kit: Audita tu Propia Cuenca</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-800 bg-white/70 px-3 py-1.5 rounded-xl border border-[#D4C9B8]">
            Fase de auditoría: <span className="font-bold text-[#8D69A6]">{auditSubtabs.find(s => s.id === activeSubtab)?.label}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BARRA DE NAVEGACIÓN EN SUBPESTAÑAS DE AUDITORÍA (ESTILO CORE DASHBOARD)
          ========================================================================= */}
      <div className="bg-[#180e25]/90 border border-white/10 p-1.5 rounded-2xl shadow-xl backdrop-blur-md sticky top-20 z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
          {auditSubtabs.map(tab => {
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
          CONTENIDO DINÁMICO EN SUBPESTAÑAS CON ANIMACIÓN (ANIMATE PRESENCE)
          ========================================================================= */}
      <AnimatePresence mode="wait">
        {/* =================================================================== */}
        {/* SUBPESTAÑA 1: HIPÓTESIS, VARIABLES [0, 1] & GEMELO DIGITAL AGRITWIN */}
        {/* =================================================================== */}
        {activeSubtab === 'step1_norm' && (
          <motion.div
            key="subtab_norm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Banner Kit Audita tu Cuenca */}
            <KitAuditaTuCuencaBanner
              isCustomActive={selectedTerritoryId === 'custom_territory'}
              customMeta={customMeta}
              onActivateCustom={handleActivateCustomTerritory}
              onResetToBenchmark={() => handleSelectTerritory('chanco')}
            />

            {/* Consola AgriTwin y Configuración Municipal cuando se activa el Modo Cuenca Personalizada */}
            {selectedTerritoryId === 'custom_territory' && (
              <>
                <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-amber-400/40 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-300" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                          Kit de Autoevaluación Municipal & Conector de Telemetría AgriTwin (Sentinel-2 STAC/COG + FAO-56)
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white mt-0.5">
                        Configura tu Propia Hipótesis Comunal o Carga el Gemelo Digital de la Cuenca del Río Longaví
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleActivateCustomTerritory(true)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                          customMeta.agritwinLinked
                            ? 'bg-emerald-600 text-white border-emerald-300'
                            : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        📡 Preset AgriTwin: Cuenca Longaví / Bullileo
                      </button>
                      <button
                        onClick={() => handleActivateCustomTerritory(false)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                          !customMeta.agritwinLinked
                            ? 'bg-amber-600 text-white border-amber-300'
                            : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        ✏️ Plantilla Comunal en Blanco
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">Nombre Cuenca / Comuna</label>
                      <input
                        type="text"
                        value={customMeta.name}
                        onChange={(e) => setCustomMeta(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">Región / País</label>
                      <input
                        type="text"
                        value={customMeta.region}
                        onChange={(e) => setCustomMeta(prev => ({ ...prev, region: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">Población Expuesta</label>
                      <input
                        type="number"
                        value={customMeta.population}
                        onChange={(e) => setCustomMeta(prev => ({ ...prev, population: parseInt(e.target.value || '0', 10) }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-amber-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">
                        Presión Extractiva Basal (D₁ = {customMeta.d1.toFixed(2)})
                      </label>
                      <input
                        type="range"
                        min="0.10"
                        max="0.95"
                        step="0.02"
                        value={customMeta.d1}
                        onChange={(e) => setCustomMeta(prev => ({ ...prev, d1: parseFloat(e.target.value) }))}
                        className="w-full accent-amber-400 cursor-pointer mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase block mb-1">
                        Amortiguación Gobernanza (κ = {customMeta.kappa.toFixed(2)})
                      </label>
                      <input
                        type="range"
                        min="0.05"
                        max="0.75"
                        step="0.02"
                        value={customMeta.kappa}
                        onChange={(e) => setCustomMeta(prev => ({ ...prev, kappa: parseFloat(e.target.value) }))}
                        className="w-full accent-emerald-400 cursor-pointer mt-2"
                      />
                    </div>
                  </div>

                  {customMeta.agritwinLinked && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-200 flex flex-wrap items-center justify-between gap-2">
                      <span>
                        <strong>✓ Acople Tele-Hidrológico AgriTwin Activo:</strong> Las variables E₁..E₄ se inicializan con la reflectancia BOA Sentinel-2 L2A (Tile 18HYD: NDRE, NDMI, MNDWI, NBR, BSI/SOC) y el balance de masa del Embalse Bullileo (110 hm³) + 5 Comités APR.
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-white font-bold">
                        Tier 2 → Tier 3 Ready
                      </span>
                    </div>
                  )}
                </div>

                <AgriTwinBasinVecinalConsole
                  effectiveVariables={effectiveVariables}
                  onVariableChange={(varKey, normVal) => applyNormalizedChanges({ [varKey]: normVal })}
                  onVariablesChange={applyNormalizedChanges}
                  kappa={customMeta.kappa}
                  onKappaChange={(newKappa) => {
                    setCustomMeta(prev => ({ ...prev, kappa: newKappa }));
                  }}
                  onLoadAgriTwinPreset={() => handleActivateCustomTerritory(true)}
                  onLiveChange={setAgritwinLive}
                  onImportJson={handleImportAgriTwinJson}
                />
              </>
            )}

            {/* =================================================================== */}
            {/* ESLABÓN I: AUDITORÍA DE HIPÓTESIS DE NORMALIZACIÓN (X_raw -> [0,1]) */}
            {/* =================================================================== */}
            <div className="card-teal rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7DB2B2]/40 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-emerald-500/30">
                    Eslabón Metodológico I · Hipótesis Paramétricas de Pre-Validación Empírica (OECD/JRC + Falkenmark + Liebig)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-emerald-300" />
                    1. Formulación de Hipótesis sobre los Tres Hombros: Del Dato Físico Crudo al Espacio [0, 1]
                  </h2>
                  <p className="text-xs text-slate-200 mt-1 max-w-3xl leading-relaxed">
                    En el marco de nuestra postulación a fondos de investigación, los valores de <strong>{territory.name}</strong> no se presentan como dogmas estadísticos cerrados, sino como <strong>hipótesis de trabajo transparentes y refutables</strong>. Ajusta cualquier deslizador físico para simular campañas de medición en terreno y observar cómo recalcula la capacidad portante (<InlineMath math="H" />) y el corte de Liebig (<InlineMath math="H_i < 0.25" />).
                  </p>
                </div>

                {Object.keys(rawOverrides).length > 0 && (
                  <button
                    onClick={() => setRawOverrides({})}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-md shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Hipótesis Base ({Object.keys(rawOverrides).length})</span>
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
                          <span className="text-[10px] font-mono text-slate-300">Hipótesis Nivel 2 (Pre-Fondo)</span>
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
                                <span>Hipótesis Cruda: <strong className="text-amber-300">{currentRaw} {spec.unit}</strong></span>
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
                    Figura 6 Canónica · Pipeline R v4.5.2
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

            {/* Navegación Progresiva al Eslabón II */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setActiveSubtab('step2_traction');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8D69A6] to-[#44318D] text-white font-serif font-bold text-sm shadow-xl hover:brightness-110 transition-all border border-white/20"
              >
                <span>Avanzar al Eslabón II: Ensayo de Tracción SEIA 2.0</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* =================================================================== */}
        {/* SUBPESTAÑA 2: ENSAYO DE TRACCIÓN SEIA 2.0 (CARGA PRE-INVERSIÓN)    */}
        {/* =================================================================== */}
        {activeSubtab === 'step2_traction' && (
          <motion.div
            key="subtab_traction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="card-indigo rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#8D69A6]/40 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-500/30">
                    Eslabón Metodológico II · Ensayo de Carga Virtual Uniaxial (Cauchy + Hooke + Cláusula Pre-Inversional)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2">
                    <Scale className="w-6 h-6 text-amber-300" />
                    2. Ensayo de Tracción Territorial Pre-Inversión (Simulador de Reforma al SEIA)
                  </h2>
                  <p className="text-xs text-slate-200 mt-1 max-w-3xl leading-relaxed">
                    Aplica nuestra propuesta de <strong>Cláusula de Salvaguarda Pre-Inversional</strong> sobre <strong>{territory.name}</strong>: antes de autorizar un proyecto extractivo, energético o inmobiliario, sometemos la hipótesis de capacidad portante (<InlineMath math="H" />) a la tracción incremental del proyecto (<InlineMath math="\Delta D, \Delta E" />).
                  </p>
                </div>
              </div>

          {/* Selector de Arquetipo de Proyecto a Auditar */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-300 font-bold block">
              Selecciona el Proyecto / Intervención a Someter a Auditoría SEIA 2.0 en {territory.name}:
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
                  σ_proj = (D₀ + ΔD) / [ (S · (E₀ + ΔE) · K)^(1/3) · Φ_crit · (1 + κ) ]
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
                    Dictamen Vinculante del Ensayo de Tracción Territorial (SEIA 2.0)
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
                Figura 7 Canónica · Pipeline R v4.5.2
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

        {/* Botones de Navegación Progresiva */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setActiveSubtab('step1_norm');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/20"
          >
            <span>← Volver a Hipótesis & Variables</span>
          </button>
          <button
            onClick={() => {
              setActiveSubtab('step3_rating');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C86D51] to-[#927660] text-white font-serif font-bold text-sm shadow-xl hover:brightness-110 transition-all border border-white/20"
          >
            <span>Avanzar al Eslabón III: Rating & Acta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    )}

    {/* =================================================================== */}
    {/* SUBPESTAÑA 3: RATING DE SOLVENCIA METABÓLICA & ACTA OFICIAL        */}
    {/* =================================================================== */}
    {activeSubtab === 'step3_rating' && (
      <motion.div
        key="subtab_rating"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
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
              Folio: HOMBROS-2026-{territory.id.toUpperCase()}-HYPOTHESIS
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
                <span>Estado Epistemológico:</span>
                <strong>HIPÓTESIS PRE-INVERSIÓN VERIFICABLE</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Navegación Progresiva */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setActiveSubtab('step2_traction');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/20"
          >
            <span>← Volver a Ensayo de Tracción</span>
          </button>
          <button
            onClick={() => {
              setActiveSubtab('step4_roi');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#DA7B93] to-[#D83F87] text-white font-serif font-bold text-sm shadow-xl hover:brightness-110 transition-all border border-white/20"
          >
            <span>Avanzar al Eslabón IV: ROI Biofísico vs. Inacción</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    )}

    {/* =================================================================== */}
    {/* SUBPESTAÑA 4: CALCULADORA DE ROI BIOFÍSICO VS. COSTO DE INACCIÓN    */}
    {/* =================================================================== */}
    {activeSubtab === 'step4_roi' && (
      <motion.div
        key="subtab_roi"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        <div className="card-rose rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DA7B93]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-400/30">
                Eslabón Metodológico IV · Economía Política del «Apague Seguro» (Santander, OLCA 2025)
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2">
                <Coins className="w-6 h-6 text-amber-300" />
                4. Calculadora de Costo de Inacción (Gasto Paliativo de Sísifo) vs. Inversión Sintrópica (ROI Biofísico)
              </h2>
              <p className="text-xs text-slate-200 mt-1 max-w-4xl leading-relaxed">
                Como demostramos en la serie publicada en el <strong>OLCA</strong> (<em>«Las propuestas regenerativas, incluso desde una perspectiva capitalista, se vuelven más rentables en el tiempo al reconocerse los costos ecosistémicos y la deuda ambiental»</em>), el Estado gasta cada año millones de dólares en <strong>medidas paliativas entrópicas</strong> (camiones aljibe eternos para Comités APR secos y combate reactivo de incendios en monocultivos) que no regeneran ni un milímetro de suelo ni de acuífero.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Interactive Fiscal & Biophysical Sliders */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black/45 border border-white/15 flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                  Parámetros de Gasto Paliativo vs. Reconversión de Cuenca
                </span>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-200">Familias APR con Camión Aljibe:</span>
                    <strong className="text-rose-300">{roiInputs.aprFamiliesWaterTruck.toLocaleString()} hogares</strong>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={roiInputs.aprFamiliesWaterTruck}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, aprFamiliesWaterTruck: parseInt(e.target.value, 10) }))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Costo fiscal medio: ~$1.450 USD/hogar/año en suministro de emergencia</span>
                  {(() => {
                    const atRisk = (agritwinLive?.aprs || [])
                      .filter(a => a.status === 'warning_abatimiento' && typeof a.families === 'number')
                      .reduce((sum, a) => sum + a.families, 0);
                    if (!agritwinLive) {
                      return <span className="block text-[10px] text-amber-300/90 mt-1">Conecta AgriTwin (Paso 1) para sugerir este valor con los comités en alerta.</span>;
                    }
                    if (atRisk === 0) {
                      return <span className="block text-[10px] text-emerald-300 mt-1">AgriTwin no reporta comités en alerta de nivel de pozo.</span>;
                    }
                    return (
                      <button
                        onClick={() => setRoiInputs(prev => ({ ...prev, aprFamiliesWaterTruck: Math.min(5000, Math.max(200, atRisk)) }))}
                        className="mt-1.5 px-2.5 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-[11px] font-bold"
                      >
                        Usar {atRisk.toLocaleString()} familias de comités en alerta (AgriTwin, modelado)
                      </button>
                    );
                  })()}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-200">Superficie Anual Expuesta a Megaincendios:</span>
                    <strong className="text-rose-300">{roiInputs.annualFireRiskHectares.toLocaleString()} ha/año</strong>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="8000"
                    step="100"
                    value={roiInputs.annualFireRiskHectares}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, annualFireRiskHectares: parseInt(e.target.value, 10) }))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Combate aéreo/terrestre + pérdida edáfica y subsidios: ~$920 USD/ha</span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-200">Meta de Reconversión Sintrópica (Keyline + Nativo):</span>
                    <strong className="text-emerald-300">{roiInputs.syntropicHectaresTarget.toLocaleString()} ha</strong>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="6000"
                    step="100"
                    value={roiInputs.syntropicHectaresTarget}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, syntropicHectaresTarget: parseInt(e.target.value, 10) }))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">CAPEX regenerativo: ~$1.350 USD/ha (tranques Keyline, fajas WUI 45m, agroforestería)</span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-200">Horizonte de Evaluación Presupuestaria:</span>
                    <strong className="text-amber-300">{roiInputs.horizonYears} años</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={roiInputs.horizonYears}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, horizonYears: parseInt(e.target.value, 10) }))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Comparative Financial & Biophysical Outcome */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-black/45 border border-white/15 flex flex-col justify-between space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Path A: Inaction / Sisyphus */}
                <div className="p-4 rounded-2xl bg-rose-950/45 border border-rose-500/35 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-rose-300 font-bold block">
                    Ruta A · Gasto Paliativo Entrópico (Mito de Sísifo)
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-rose-300">
                    ${roiMetrics.cumulativeInactionM} M USD
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    Gasto público acumulado en {roiInputs.horizonYears} años (${roiMetrics.annualInactionTotalM}M USD/año: ${roiMetrics.annualWaterTruckM}M en camiones aljibe + ${roiMetrics.annualFireSuppressionM}M en fuego/emergencias). <strong>Resultado biofísico: ΔH = 0.00 (la cuenca sigue seca).</strong>
                  </p>
                </div>

                {/* Path B: Syntropic Capitalization */}
                <div className="p-4 rounded-2xl bg-emerald-950/45 border border-emerald-500/35 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold block">
                    Ruta B · Inversión Sintrópica en H (Keyline + Agroforestería)
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-300">
                    ${roiMetrics.capexSyntropicM} M USD <span className="text-xs font-mono font-normal text-slate-300">(CAPEX Inicial)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    Recarga acuíferos APR en la fuente, corta la continuidad de combustible pibanda WUI y genera retorno productivo local. <strong>Resultado biofísico: ΔH +0.16 y caída de σ al rango elástico.</strong>
                  </p>
                </div>
              </div>

              {/* Bottom KPI Row */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Ahorro Neto ({roiInputs.horizonYears} años)</span>
                  <strong className="text-lg sm:text-xl text-emerald-300">
                    +${roiMetrics.netFiscalSavingsM} M USD
                  </strong>
                  <span className="text-[10px] text-slate-400 block">Recursos públicos liberados</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Multiplicador ROI Biofísico</span>
                  <strong className="text-lg sm:text-xl text-amber-300">
                    {roiMetrics.benefitCostRatio}x
                  </strong>
                  <span className="text-[10px] text-slate-400 block">Beneficio / Costo Integrado</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/15">
                  <span className="text-[10px] text-slate-400 uppercase block">Payback Territorial</span>
                  <strong className="text-lg sm:text-xl text-white">
                    {roiMetrics.paybackYears} años
                  </strong>
                  <span className="text-[10px] text-slate-400 block">Punto de equilibrio fiscal</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 font-sans leading-relaxed">
                <strong className="text-amber-300 font-mono uppercase">Conclusión para Fondos de Inversión Pública (ANID / GORE / BID):</strong> Cada dólar invertido en restaurar la sección transversal de la cuenca (<InlineMath math="H" />) ahorra <strong>{roiMetrics.benefitCostRatio} dólares</strong> en gasto fiscal reactivo, recuperando la inversión en <strong>{roiMetrics.paybackYears} años</strong> y dejando un activo hidro-edáfico permanente para las comunidades.
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Navegación Progresiva */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setActiveSubtab('step3_rating');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/20"
          >
            <span>← Volver a Rating & Acta</span>
          </button>
          <button
            onClick={() => {
              setActiveSubtab('step1_norm');
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#376E6F] to-[#254b4c] text-white font-serif font-bold text-sm shadow-xl hover:brightness-110 transition-all border border-white/20"
          >
            <span>↺ Reiniciar en Calibración de Hipótesis</span>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
);
}

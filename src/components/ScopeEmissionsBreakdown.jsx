import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, Zap, Ship, Wind, ArrowRight, ArrowDownRight, 
  HelpCircle, Scale, AlertTriangle, CheckCircle2, TrendingDown,
  Layers, ExternalLink, Terminal, Cpu
} from 'lucide-react';
import { calculateScopeEmissionsMetrics } from '../models/santanderModel';

export default function ScopeEmissionsBreakdown({ 
  territories, 
  selectedTerritoryId, 
  setSelectedTerritoryId 
}) {
  const [chargeScope3ToCity, setChargeScope3ToCity] = useState(true);

  const selectedTerritory = territories.find(t => t.id === selectedTerritoryId) || territories[0];
  const metrics = calculateScopeEmissionsMetrics(selectedTerritory);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Epistemological Banner: The Scope 1-2-3 Metabolic Paradox */}
      <div className="p-6 sm:p-8 rounded-3xl bio-hud-panel shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              Epistemología de los Hombros: Deuda Ecológica & Fricción Entrópica
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              La Paradoja Metabólica de los Alcances 1, 2 y 3
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              La contabilidad tradicional de carbono suele celebrar a las ciudades del Norte Global (como Copenhague o Ámsterdam) 
              como "casi carbono-neutrales" porque su <strong>Scope 1</strong> (chimeneas locales) y <strong>Scope 2</strong> (red eléctrica) 
              son bajos. Sin embargo, bajo la termodinámica del modelo Hombros, esto suele ocultar una 
              <strong> transferencia entrópica</strong>: las ciudades exportan sus industrias pesadas y la extracción biomasal al 
              Sur Global (como Chanco, Quintero o Aconcagua), importando bienes de consumo masivo con una gigantesca 
              huella <strong>Scope 3</strong>.
            </p>
          </div>

          {/* Interactive Toggle: Charge Scope 3 */}
          <div className="p-4 rounded-2xl border border-cyan-500/30 bg-bio-deep shadow-xl shrink-0 font-mono text-xs">
            <span className="block text-[10px] text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              [ PROTOCOLO HOMBROS ]
            </span>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-200">
              <input
                type="checkbox"
                checked={chargeScope3ToCity}
                onChange={e => setChargeScope3ToCity(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-bio-void border-emerald-500/30"
              />
              <span className="text-white">Imputar Scope 3 a la Capacidad</span>
            </label>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-tight">
              {chargeScope3ToCity 
                ? 'El estándar de vida del consumidor asume la degradación que causó fuera.'
                : 'Contabilidad territorial convencional (desconecta el consumo de su origen).'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Visual Tripartite Scope Definition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Scope 1 */}
        <div className="p-6 rounded-3xl bio-hud-panel shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-rose-400">
            <div className="p-2 rounded-xl bg-bio-void border border-rose-500/30">
              <Wind className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Alcance Directo</span>
              <h3 className="font-serif font-bold text-base text-white">Scope 1: Emisiones Físicas</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Combustión directa dentro de la frontera del territorio: calderas de gas, tubos de escape, quemas agrícolas y chimeneas fabriles.
          </p>
          <div className="p-3 rounded-2xl bg-bio-deep border border-rose-500/20 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">Impacto en Hombros:</span>
            <strong className="text-rose-400">Carga Extractiva Directa en E₁ y Presión D₁</strong>
          </div>
        </div>

        {/* Scope 2 */}
        <div className="p-6 rounded-3xl bio-hud-panel shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-cyan-400">
            <div className="p-2 rounded-xl bg-bio-void border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Alcance Indirecto Red</span>
              <h3 className="font-serif font-bold text-base text-white">Scope 2: Electricidad Importada</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Emisiones generadas por las centrales de generación para proveer la electricidad, calor o vapor comprados por el territorio.
          </p>
          <div className="p-3 rounded-2xl bg-bio-deep border border-cyan-500/20 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">Impacto en Hombros:</span>
            <strong className="text-cyan-400">Soberanía Energética en K₂ y Presión Externa D₃</strong>
          </div>
        </div>

        {/* Scope 3 */}
        <div className="p-6 rounded-3xl bio-hud-panel shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-teal-300">
            <div className="p-2 rounded-xl bg-bio-void border border-teal-500/30">
              <Ship className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Cadena de Valor Global</span>
              <h3 className="font-serif font-bold text-base text-white">Scope 3: Huella Incorporada</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            <strong>Upstream:</strong> Carbono y agua virtual en alimentos, ropa y tecnología importados. 
            <strong> Downstream:</strong> Destino de materias primas exportadas (cobre, celulosa).
          </p>
          <div className="p-3 rounded-2xl bg-bio-deep border border-teal-500/20 text-xs font-mono">
            <span className="text-slate-400 block text-[10px] uppercase">Impacto en Hombros:</span>
            <strong className="text-teal-300">Índice de Deuda Metabólica e Intercambio Panal</strong>
          </div>
        </div>

      </div>

      {/* Comparative Matrix: All 9 Territories */}
      <div className="p-6 sm:p-8 rounded-3xl bio-hud-panel shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Matriz Comparativa de Emisiones & Fricción Entrópica
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              Valores per cápita anuales (t CO₂e / hab / año) y Fuentes Oficiales Abiertas
            </p>
          </div>
          <span className="text-[11px] font-mono text-cyan-300 bg-bio-deep px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-inner">
            [ 9 Nodos Planetarios Analizados ]
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-emerald-500/20 text-cyan-400 text-[10px] uppercase tracking-wider">
                <th className="py-3 px-3">Nodo Territorial</th>
                <th className="py-3 px-3">País</th>
                <th className="py-3 px-3 text-right">Scope 1 (Directo)</th>
                <th className="py-3 px-3 text-right">Scope 2 (Red)</th>
                <th className="py-3 px-3 text-right">Scope 3 (Importado)</th>
                <th className="py-3 px-3 text-right">Huella Total Real</th>
                <th className="py-3 px-3 text-right">Tercerización Scope 3</th>
                <th className="py-3 px-3 text-center">Régimen Metabólico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {territories.map(t => {
                const isSelected = t.id === selectedTerritoryId;
                const m = calculateScopeEmissionsMetrics(t);
                const isHighLeakage = m.outsourcingRatio > 2.5;

                return (
                  <tr 
                    key={t.id}
                    onClick={() => setSelectedTerritoryId(t.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-cyan-950/70 font-semibold text-white' 
                        : 'hover:bg-bio-surface/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-3 font-serif font-bold text-white flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-[0_0_8px_#34d399]" 
                        style={{ backgroundColor: t.badgeAccent || '#10b981' }}
                      />
                      {t.name}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{t.country}</td>
                    <td className="py-3.5 px-3 text-right text-rose-400 font-bold">{m.scope1} t</td>
                    <td className="py-3.5 px-3 text-right text-cyan-400 font-bold">{m.scope2} t</td>
                    <td className="py-3.5 px-3 text-right text-teal-300 font-extrabold">{m.scope3Upstream} t</td>
                    <td className="py-3.5 px-3 text-right text-white font-extrabold">{m.consumptionTotal} t</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        isHighLeakage 
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40' 
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {m.outsourcingRatio}x
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                        t.id === 'quintero_puchuncavi'
                          ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                          : m.netMetabolicBalance > 0.8
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                            : isHighLeakage
                              ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
                              : 'bg-bio-deep text-slate-300 border-emerald-500/30'
                      }`}>
                        {t.id === 'quintero_puchuncavi'
                          ? 'Zona Sacrificio'
                          : m.netMetabolicBalance > 0.8
                            ? 'Soberano / Sumidero'
                            : isHighLeakage
                              ? 'Deudor Scope 3'
                              : 'En Transición'
                        }
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Territory Detailed Metabolic Sankey / Flows */}
      <div className="p-6 sm:p-8 rounded-3xl bio-hud-panel shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
              Desglose de Flujo de Carbono para:
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
              {selectedTerritory.name}
            </h3>
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block uppercase">Intensidad Eléctrica de Red</span>
            <strong className="text-cyan-300">{metrics.gridCarbonIntensity} g CO₂/kWh</strong>
          </div>
        </div>

        {/* Visual Metabolic Flow Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          
          {/* Source 1: Chimneys & Direct */}
          <div className="p-4 rounded-2xl bg-bio-deep/90 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
              <Wind className="w-4 h-4" />
              <span>Scope 1 (Territorial)</span>
            </div>
            <div className="text-2xl font-mono font-bold text-rose-300 mt-2">
              {metrics.scope1} <span className="text-xs font-normal">t/cap</span>
            </div>
            <p className="text-[11px] text-slate-300/80 mt-1 leading-snug">
              Transporte motorizado local, calderas domiciliarias y procesos térmicos directos.
            </p>
          </div>

          {/* Source 2: Grid Electricity */}
          <div className="p-4 rounded-2xl bg-bio-deep/90 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>Scope 2 (Red Externa)</span>
            </div>
            <div className="text-2xl font-mono font-bold text-cyan-300 mt-2">
              {metrics.scope2} <span className="text-xs font-normal">t/cap</span>
            </div>
            <p className="text-[11px] text-slate-300/80 mt-1 leading-snug">
              Demanda de la red eléctrica nacional y calefacción urbana distrital.
            </p>
          </div>

          {/* Source 3: Upstream Imports */}
          <div className="p-4 rounded-2xl bg-bio-deep/90 border border-teal-500/30">
            <div className="flex items-center gap-2 text-teal-300 font-bold mb-1">
              <Ship className="w-4 h-4" />
              <span>Scope 3 (Importaciones)</span>
            </div>
            <div className="text-2xl font-mono font-bold text-teal-200 mt-2">
              {metrics.scope3Upstream} <span className="text-xs font-normal">t/cap</span>
            </div>
            <p className="text-[11px] text-slate-300/80 mt-1 leading-snug">
              Bienes de consumo, alimentos globales, computadores y materiales manufacturados fuera.
            </p>
          </div>

          {/* Source 4: Local Biomass Sequestration Sink */}
          <div className="p-4 rounded-2xl bg-bio-deep/90 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Absorción Local (Suelo/Bosque)</span>
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-300 mt-2">
              {metrics.sequestration} <span className="text-xs font-normal">t/cap</span>
            </div>
            <p className="text-[11px] text-slate-300/80 mt-1 leading-snug">
              Capacidad sintrópica de secuestro biomasal en humedales, suelo vivo y reservas nativas.
            </p>
          </div>

        </div>

        {/* Balance Metric Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-bio-deep border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 uppercase block text-[10px]">Huella Real de Consumo (S1 + S2 + S3 Up):</span>
            <strong className="text-base text-white">{metrics.consumptionTotal} toneladas de CO₂e / cápita / año</strong>
          </div>
          <div>
            <span className="text-slate-400 uppercase block text-[10px]">Tasa de Dependencia Externa:</span>
            <strong className="text-base text-cyan-300">
              {Math.round((metrics.scope3Upstream / Math.max(0.1, metrics.consumptionTotal)) * 100)}% de la huella es importada
            </strong>
          </div>
        </div>

      </div>

    </div>
  );
}

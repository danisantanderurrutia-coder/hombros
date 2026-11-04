import React, { useState } from 'react';
import { 
  Factory, Zap, Ship, Wind, Scale, CheckCircle2
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
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border border-[#D4C9B8] shadow-xl relative overflow-hidden text-slate-900">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 bg-[#28475A] text-white shadow-xs">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              Epistemología de los Hombros: Deuda Ecológica & Fricción Entrópica
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-slate-900">
              La Paradoja Metabólica de los Alcances 1, 2 y 3
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              La contabilidad tradicional de carbono suele celebrar a las ciudades del Norte Global (como Copenhague o Ámsterdam) 
              como «casi carbono-neutrales» porque su <strong className="text-slate-900">Scope 1</strong> (chimeneas locales) y <strong className="text-slate-900">Scope 2</strong> (red eléctrica) 
              son bajos. Sin embargo, bajo la termodinámica del modelo Hombros, esto suele ocultar una 
              <strong className="text-[#C86D51]"> transferencia entrópica</strong>: las metrópolis exportan sus industrias pesadas y la extracción biomasal al 
              Sur Global (como Chanco, Quintero o Aconcagua), importando bienes de consumo masivo con una gigantesca 
              huella <strong className="text-[#28475A]">Scope 3</strong>.
            </p>
          </div>

          {/* Interactive Toggle: Charge Scope 3 */}
          <div className="p-4 rounded-2xl border border-[#D4C9B8] bg-white shadow-md shrink-0 font-mono text-xs text-slate-800">
            <span className="block text-[10px] text-[#487075] uppercase tracking-wider mb-2 font-bold">
              [ PROTOCOLO HOMBROS ]
            </span>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-900">
              <input
                type="checkbox"
                checked={chargeScope3ToCity}
                onChange={e => setChargeScope3ToCity(e.target.checked)}
                className="w-4 h-4 rounded accent-[#487075] cursor-pointer"
              />
              <span>Imputar Scope 3 a la Capacidad</span>
            </label>
            <p className="text-[11px] text-slate-600 mt-1.5 max-w-[220px] leading-snug font-sans">
              {chargeScope3ToCity 
                ? 'El estándar de vida del consumidor asume la degradación que causó fuera de sus fronteras.'
                : 'Contabilidad territorial convencional (desconecta el consumo de su origen extractivo).'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Visual Tripartite Scope Definition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Scope 1 */}
        <div className="p-6 rounded-3xl bg-[#FAF7F0] border border-[#C86D51]/40 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#FEECE8] border border-[#F4A79D] text-[#991B1B]">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#991B1B] font-bold block">
                  Alcance Directo Territorial
                </span>
                <h3 className="font-serif font-extrabold text-base text-slate-900">
                  Scope 1: Emisiones Físicas
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 font-medium">
              Combustión directa dentro de la frontera geográfica del territorio: calderas de gas, transporte motorizado, quemas agrícolas y chimeneas fabriles.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] text-xs font-mono">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Impacto en Hombros:</span>
            <strong className="text-[#991B1B] block mt-0.5">Carga Extractiva Directa en E₁ y Presión D₁</strong>
          </div>
        </div>

        {/* Scope 2 */}
        <div className="p-6 rounded-3xl bg-[#FAF7F0] border border-[#28475A]/35 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#E6EEF4] border border-[#B8CDE0] text-[#28475A]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#28475A] font-bold block">
                  Alcance Indirecto de Red
                </span>
                <h3 className="font-serif font-extrabold text-base text-slate-900">
                  Scope 2: Electricidad Importada
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 font-medium">
              Emisiones generadas por las centrales termoeléctricas o de generación externas para proveer la electricidad, calor o vapor consumidos por el territorio.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] text-xs font-mono">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Impacto en Hombros:</span>
            <strong className="text-[#28475A] block mt-0.5">Soberanía Energética en K₂ y Presión Externa D₃</strong>
          </div>
        </div>

        {/* Scope 3 */}
        <div className="p-6 rounded-3xl bg-[#FAF7F0] border border-[#487075]/45 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#E2F4F2] border border-[#7DB2B2] text-[#1B4332]">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B4332] font-bold block">
                  Cadena de Valor Global
                </span>
                <h3 className="font-serif font-extrabold text-base text-slate-900">
                  Scope 3: Huella Incorporada
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 font-medium">
              <strong className="text-slate-900">Upstream:</strong> Carbono y agua virtual en alimentos, ropa y tecnología importados.{' '}
              <strong className="text-slate-900">Downstream:</strong> Destino de materias primas exportadas (cobre, celulosa, fruta).
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] text-xs font-mono">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Impacto en Hombros:</span>
            <strong className="text-[#1B4332] block mt-0.5">Índice de Deuda Metabólica e Intercambio Panal</strong>
          </div>
        </div>

      </div>

      {/* Comparative Matrix: All 9 Territories */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border border-[#D4C9B8] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900">
              Matriz Comparativa de Emisiones & Fricción Entrópica
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-mono font-medium">
              Valores per cápita anuales (t CO₂e / hab / año) y contraste de externalización metabólica
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#28475A] bg-white px-3.5 py-1.5 rounded-xl border border-[#D4C9B8] shadow-2xs">
            [ {territories.length} Nodos Planetarios Analizados ]
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#D4C9B8] bg-white">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#D4C9B8] bg-[#EDE8DC] text-slate-900 text-[10px] uppercase tracking-wider font-extrabold">
                <th className="py-3.5 px-4">Nodo Territorial</th>
                <th className="py-3.5 px-3">País</th>
                <th className="py-3.5 px-3 text-right">Scope 1 (Directo)</th>
                <th className="py-3.5 px-3 text-right">Scope 2 (Red)</th>
                <th className="py-3.5 px-3 text-right">Scope 3 (Importado)</th>
                <th className="py-3.5 px-3 text-right">Huella Total Real</th>
                <th className="py-3.5 px-3 text-right">Tercerización Scope 3</th>
                <th className="py-3.5 px-4 text-center">Régimen Metabólico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DEC9]">
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
                        ? 'bg-[#E2F4F2] font-bold text-slate-950' 
                        : 'hover:bg-[#FAF7F0] text-slate-800'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-serif font-bold text-slate-900 flex items-center gap-2.5">
                      <span 
                        className="w-3 h-3 rounded-full inline-block shrink-0 border border-black/20" 
                        style={{ backgroundColor: t.badgeAccent || '#487075' }}
                      />
                      {t.name}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{t.country}</td>
                    <td className="py-3.5 px-3 text-right text-[#991B1B] font-bold">{m.scope1} t</td>
                    <td className="py-3.5 px-3 text-right text-[#28475A] font-bold">{m.scope2} t</td>
                    <td className="py-3.5 px-3 text-right text-[#1B4332] font-extrabold">{m.scope3Upstream} t</td>
                    <td className="py-3.5 px-3 text-right text-slate-950 font-black">{m.consumptionTotal} t</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                        isHighLeakage 
                          ? 'bg-[#FEECE8] text-[#991B1B] border-[#F4A79D]' 
                          : 'bg-[#E2F4F2] text-[#1B4332] border-[#7DB2B2]'
                      }`}>
                        {m.outsourcingRatio}x
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border inline-block ${
                        t.id === 'quintero_puchuncavi'
                          ? 'bg-[#FEECE8] text-[#991B1B] border-[#F4A79D]'
                          : m.netMetabolicBalance > 0.8
                            ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                            : isHighLeakage
                              ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]'
                              : 'bg-[#E6EEF4] text-[#28475A] border-[#B8CDE0]'
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
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border border-[#D4C9B8] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#D4C9B8]">
          <div>
            <span className="text-xs font-mono text-[#487075] uppercase font-bold tracking-wider">
              Desglose de Flujo de Carbono para el Territorio Seleccionado:
            </span>
            <h3 className="text-2xl font-serif font-extrabold text-slate-900 mt-0.5">
              {selectedTerritory.name} ({selectedTerritory.country})
            </h3>
          </div>
          <div className="sm:text-right font-mono bg-white px-4 py-2 rounded-2xl border border-[#D4C9B8]">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Intensidad Eléctrica de Red</span>
            <strong className="text-sm text-[#28475A] font-black">{metrics.gridCarbonIntensity} g CO₂/kWh</strong>
          </div>
        </div>

        {/* Visual Metabolic Flow Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          
          {/* Source 1: Chimneys & Direct */}
          <div className="p-5 rounded-2xl bg-white border border-[#F4A79D] shadow-xs">
            <div className="flex items-center gap-2 text-[#991B1B] font-bold text-xs font-mono uppercase mb-1">
              <Wind className="w-4 h-4" />
              <span>Scope 1 (Territorial)</span>
            </div>
            <div className="text-2xl font-mono font-black text-slate-900 mt-2">
              {metrics.scope1} <span className="text-xs font-semibold text-slate-500">t/cap</span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-snug font-sans">
              Transporte motorizado local, calderas domiciliarias y procesos térmicos directos.
            </p>
          </div>

          {/* Source 2: Grid Electricity */}
          <div className="p-5 rounded-2xl bg-white border border-[#B8CDE0] shadow-xs">
            <div className="flex items-center gap-2 text-[#28475A] font-bold text-xs font-mono uppercase mb-1">
              <Zap className="w-4 h-4" />
              <span>Scope 2 (Red Externa)</span>
            </div>
            <div className="text-2xl font-mono font-black text-slate-900 mt-2">
              {metrics.scope2} <span className="text-xs font-semibold text-slate-500">t/cap</span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-snug font-sans">
              Demanda de la red eléctrica nacional y calefacción urbana distrital.
            </p>
          </div>

          {/* Source 3: Upstream Imports */}
          <div className="p-5 rounded-2xl bg-white border border-[#7DB2B2] shadow-xs">
            <div className="flex items-center gap-2 text-[#1B4332] font-bold text-xs font-mono uppercase mb-1">
              <Ship className="w-4 h-4" />
              <span>Scope 3 (Importaciones)</span>
            </div>
            <div className="text-2xl font-mono font-black text-slate-900 mt-2">
              {metrics.scope3Upstream} <span className="text-xs font-semibold text-slate-500">t/cap</span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-snug font-sans">
              Bienes de consumo, alimentos globales, computadores y materiales manufacturados fuera.
            </p>
          </div>

          {/* Source 4: Local Biomass Sequestration Sink */}
          <div className="p-5 rounded-2xl bg-[#E2F4F2]/60 border border-[#487075] shadow-xs">
            <div className="flex items-center gap-2 text-[#1B4332] font-bold text-xs font-mono uppercase mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#487075]" />
              <span>Absorción Local (Sumidero)</span>
            </div>
            <div className="text-2xl font-mono font-black text-[#1B4332] mt-2">
              {metrics.sequestration} <span className="text-xs font-semibold text-[#487075]">t/cap</span>
            </div>
            <p className="text-xs text-slate-700 mt-1.5 leading-snug font-sans">
              Capacidad sintrópica de secuestro biomasal en humedales, suelo vivo y reservas nativas.
            </p>
          </div>

        </div>

        {/* Balance Metric Bar */}
        <div className="mt-6 p-5 rounded-2xl bg-[#16272E] text-white border border-[#487075] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono shadow-md">
          <div>
            <span className="text-slate-300 uppercase block text-[10px] font-bold">Huella Real de Consumo (S1 + S2 + S3 Upstream):</span>
            <strong className="text-base sm:text-lg text-white font-black">{metrics.consumptionTotal} toneladas de CO₂e / cápita / año</strong>
          </div>
          <div className="sm:text-right">
            <span className="text-slate-300 uppercase block text-[10px] font-bold">Tasa de Dependencia / Externalización:</span>
            <strong className="text-base sm:text-lg text-amber-300 font-black">
              {Math.round((metrics.scope3Upstream / Math.max(0.1, metrics.consumptionTotal)) * 100)}% de la huella es importada
            </strong>
          </div>
        </div>

      </div>

    </div>
  );
}

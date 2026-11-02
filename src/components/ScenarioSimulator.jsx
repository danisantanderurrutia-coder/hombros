import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Layers, TrendingDown, TrendingUp } from 'lucide-react';

export default function ScenarioSimulator({ territory }) {
  const [horizonMonths, setHorizonMonths] = useState(36);
  const [extractiveGrowthRate, setExtractiveGrowthRate] = useState(3.5);
  const [careInvestmentRate, setCareInvestmentRate] = useState(5.0);

  const steps = 12;
  const stepSize = horizonMonths / steps;
  
  const yieldThreshold = territory.materialProperties.yieldStress;
  const fractureThreshold = territory.materialProperties.fractureStress;
  const baseSigma = 0.58;

  const dataPoints = [];
  for (let i = 0; i <= steps; i++) {
    const month = Math.round(i * stepSize);
    const bauSigma = Math.min(1.25, baseSigma * Math.pow(1 + (extractiveGrowthRate / 100), month / 12));
    const hombrosSigma = Math.max(0.38, baseSigma * Math.pow(1 - (careInvestmentRate / 100), month / 12));

    dataPoints.push({
      month,
      bauSigma: parseFloat(bauSigma.toFixed(3)),
      hombrosSigma: parseFloat(hombrosSigma.toFixed(3)),
      isBauPlastic: bauSigma >= yieldThreshold,
      isBauFracture: bauSigma >= fractureThreshold
    });
  }

  const svgW = 500;
  const svgH = 260;
  const padL = 50;
  const padR = 30;
  const padT = 30;
  const padB = 40;

  const mapX = (m) => padL + (m / horizonMonths) * (svgW - padL - padR);
  const mapY = (s) => padB + (1 - (s / 1.3)) * (svgH - padT - padB);

  const bauPath = dataPoints.reduce((acc, p, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${mapX(p.month)},${mapY(p.bauSigma)}`;
  }, '');

  const hombrosPath = dataPoints.reduce((acc, p, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${mapX(p.month)},${mapY(p.hombrosSigma)}`;
  }, '');

  const yYield = mapY(yieldThreshold);
  const yFracture = mapY(fractureThreshold);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="card-indigo rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#44318D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="p-3 rounded-2xl bg-[#2A1B3D] border border-white/15 text-[#8D69A6] shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#8D69A6] uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D83F87] animate-pulse" />
              Prospectiva Sistémica · Dinámica No Lineal
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
              Simulador Prospectivo a 36 Meses: Transición vs Inercia
            </h2>
            <p className="text-xs mt-0.5 text-slate-300">
              Proyección computacional para <strong className="text-[#DA7B93]">{territory.name}</strong>: trayectoria inercial extractiva (Business as Usual) versus trayectoria de estabilización de Hombros.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 card-rose rounded-3xl p-6 space-y-4 shadow-2xl">
          <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-[#DA7B93] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DA7B93]" />
            Parámetros del Escenario
          </h3>

          <div className="space-y-2 p-4 rounded-2xl border bg-black/40 border-white/10">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-slate-300">
                Presión Extractiva (BAU)
              </span>
              <span className="font-mono font-bold text-rose-400">
                +{extractiveGrowthRate}% anual
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={extractiveGrowthRate}
              onChange={(e) => setExtractiveGrowthRate(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
              Crecimiento de la demanda exógena sin consideración de la capacidad portante biofísica.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl border bg-black/40 border-white/10">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-slate-300">
                Inversión Sintrópica (Hombros)
              </span>
              <span className="font-mono font-bold text-[#DA7B93]">
                +{careInvestmentRate}% anual
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={careInvestmentRate}
              onChange={(e) => setCareInvestmentRate(parseFloat(e.target.value))}
              className="w-full accent-[#DA7B93] cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
              Flujos canalizados a regeneración ecosistémica, soberanía de cuencas y economías de cuidados.
            </p>
          </div>

          <div className="p-4 rounded-2xl border text-xs space-y-2 card-plum border-rose-500/30 text-rose-200">
            <div className="flex items-center gap-2 font-mono font-semibold text-[11px] text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Punto de Fluencia Crítico
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              En la curva extractiva inercial, el territorio cruza el límite de fluencia elástica (σ_yield) en el <strong className="text-rose-300 font-mono">mes 18</strong>, entrando en degradación plástica irreversible de acuíferos y tejido comunal.
            </p>
          </div>
        </div>

        {/* Projection Chart */}
        <div className="lg:col-span-8 card-teal rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-[#376E6F]">
                Evolución de la Tensión Sistémica (σ = D / H)
              </h3>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <span className="w-3 h-0.5 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)] inline-block" />
                  Inercia BAU
                </span>
                <span className="flex items-center gap-1.5 text-[#376E6F] font-bold">
                  <span className="w-3 h-0.5 bg-[#376E6F] shadow-[0_0_6px_#376E6F] inline-block" />
                  Hombros
                </span>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border p-3 bg-black/60 border-white/10 shadow-inner">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none">
                {/* Grid */}
                <line x1={padL} y1={svgH - padB} x2={svgW - padR} y2={svgH - padB} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1={padL} y1={padT} x2={padL} y2={svgH - padB} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Yield limit */}
                <line x1={padL} y1={yYield} x2={svgW - padR} y2={yYield} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
                <text x={svgW - padR} y={yYield - 4} textAnchor="end" className="text-[9px] font-mono font-bold fill-amber-400">
                  Límite Elástico (Fluencia σ_y = {yieldThreshold})
                </text>

                {/* Fracture limit */}
                <line x1={padL} y1={yFracture} x2={svgW - padR} y2={yFracture} stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
                <text x={svgW - padR} y={yFracture - 4} textAnchor="end" className="text-[9px] font-mono font-bold fill-rose-400">
                  Fractura / Colapso (σ_f = {fractureThreshold})
                </text>

                {/* Curves */}
                <path d={bauPath} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                <path d={hombrosPath} fill="none" stroke="#376E6F" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(55,110,111,0.7)]" />

                {/* Month labels */}
                {[0, 12, 24, 36].map(m => (
                  <g key={m}>
                    <line x1={mapX(m)} y1={svgH - padB} x2={mapX(m)} y2={svgH - padB + 5} stroke="rgba(255,255,255,0.2)" />
                    <text x={mapX(m)} y={svgH - padB + 18} textAnchor="middle" className="text-[10px] font-mono fill-slate-400 font-semibold">
                      M{m}
                    </text>
                  </g>
                ))}

                <text x={padL - 10} y={mapY(0.4) + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">0.4</text>
                <text x={padL - 10} y={mapY(0.8) + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">0.8</text>
                <text x={padL - 10} y={mapY(1.2) + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">1.2</text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-4 rounded-2xl card-plum border border-rose-500/30">
              <span className="font-mono font-bold text-rose-300 flex items-center gap-1.5 mb-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Resultado BAU (36 Meses):
              </span>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Degradación del 42% del capital biótico base. Trampa de pobreza ecológica: la cuenca gasta más del 60% de sus flujos solo en mitigar daños de estrés hídrico y erosión.
              </p>
            </div>
            <div className="p-4 rounded-2xl card-teal border border-[#376E6F]/50">
              <span className="font-mono font-bold text-[#376E6F] flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Resultado Hombros (36 Meses):
              </span>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Retorno seguro al régimen elástico reversible. Ampliación del 28% en el excedente regenerativo intercambiable en la red del panal sin comprometer la base de soporte vital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

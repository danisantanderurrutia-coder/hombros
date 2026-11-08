import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RotateCcw, Mountain, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import GoldenAtlasHillAscent from './GoldenAtlasHillAscent';
import FilosofiaHombrosModal from './FilosofiaHombrosModal';

export default function FilosofiaHombrosClosingBanner() {
  const [E, setE] = useState(0.72);
  const [S, setS] = useState(0.68);
  const [K, setK] = useState(0.70);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const H = Math.pow(E * S * K, 1 / 3);
  const aritH = (E + S + K) / 3;
  const liebigPenalty = (aritH - H).toFixed(3);

  const applyPreset = (presetE, presetS, presetK) => {
    setE(presetE);
    setS(presetS);
    setK(presetK);
  };

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-xl text-slate-900">
        {/* Top Tri-Color Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]" />

        <div className="p-6 sm:p-10 md:p-12 space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#EDE8DC] text-[#78350F] border border-[#D4A373]/50">
                <Mountain className="w-3.5 h-3.5 text-[#78350F]" />
                <span>FILOSOFÍA DE LOS HOMBROS · ALEGORÍA FUNDACIONAL</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight text-slate-900 leading-tight">
                De Sísifo a Atlas:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]">
                  El Ascenso Territorial
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                La condena no es el peso del mundo, sino la atrofia de los pilares basales. Si el territorio cultiva armónicamente sus tres hombros —la cuenca ecológica (<strong className="text-[#1B4332]">E</strong>), la comunidad cuidadora (<strong className="text-[#C86D51]">S</strong>) y el capital regenerativo (<strong className="text-[#927660]">K</strong>)— la roca deja de rodar hacia el abismo y se transforma en una esfera celeste que asciende con paso firme por la escalinata hacia la soberanía.
              </p>
            </div>

            {/* Quick Presets & Full Philosophy Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-serif font-bold bg-[#28475A] hover:bg-[#1E293B] text-white shadow-sm transition-all"
              >
                <span>Explorar Filosofía Completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8]">
                <button
                  onClick={() => applyPreset(0.20, 0.40, 0.25)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg hover:bg-rose-100 text-rose-800 transition"
                  title="Simular colapso extractivo"
                >
                  Colapso
                </button>
                <button
                  onClick={() => applyPreset(0.55, 0.55, 0.55)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg hover:bg-amber-100 text-amber-800 transition"
                  title="Simular equilibrio basal"
                >
                  Basal
                </button>
                <button
                  onClick={() => applyPreset(0.85, 0.85, 0.85)}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg hover:bg-emerald-100 text-emerald-800 font-bold transition"
                  title="Simular sintropía plena"
                >
                  Sintropía
                </button>
              </div>
            </div>
          </div>

          {/* The Stairs Visual Showcase */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4C9B8] bg-slate-950 shadow-inner">
            <GoldenAtlasHillAscent E={E} S={S} K={K} className="w-full" />
          </div>

          {/* Interactive Sliders Bar */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#D4C9B8] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4C9B8]/70 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#28475A]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  Control Muscular Territorial en Tiempo Real
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-600">Capacidad Portante:</span>
                <span className="text-[#1B4332] font-extrabold text-sm font-mono">H = {H.toFixed(3)}</span>
                <span className="text-slate-500 text-[11px]">(Castigo Liebig: -{liebigPenalty})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* E */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white border border-[#D4C9B8]/60">
                <div className="flex justify-between text-xs">
                  <span className="font-mono font-bold text-[#487075]">Hombro Ecológico (E)</span>
                  <span className="font-mono font-bold text-slate-800">{(E * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.02"
                  value={E}
                  onChange={(e) => setE(parseFloat(e.target.value))}
                  className="w-full accent-[#487075] cursor-pointer h-1.5 bg-slate-200 rounded"
                />
                <span className="text-[10px] text-slate-500 block truncate">Agua viva, suelo y fotosíntesis</span>
              </div>

              {/* S */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white border border-[#D4C9B8]/60">
                <div className="flex justify-between text-xs">
                  <span className="font-mono font-bold text-[#C86D51]">Hombro Social (S)</span>
                  <span className="font-mono font-bold text-slate-800">{(S * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.02"
                  value={S}
                  onChange={(e) => setS(parseFloat(e.target.value))}
                  className="w-full accent-[#C86D51] cursor-pointer h-1.5 bg-slate-200 rounded"
                />
                <span className="text-[10px] text-slate-500 block truncate">Cuidados comunitarios y cohesión cívica</span>
              </div>

              {/* K */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white border border-[#D4C9B8]/60">
                <div className="flex justify-between text-xs">
                  <span className="font-mono font-bold text-[#927660]">Hombro Capital (K)</span>
                  <span className="font-mono font-bold text-slate-800">{(K * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.02"
                  value={K}
                  onChange={(e) => setK(parseFloat(e.target.value))}
                  className="w-full accent-[#927660] cursor-pointer h-1.5 bg-slate-200 rounded"
                />
                <span className="text-[10px] text-slate-500 block truncate">Soberanía productiva y ecotecnología</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal interactivo de la Filosofía de los Hombros */}
      <FilosofiaHombrosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

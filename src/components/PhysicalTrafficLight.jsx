import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, Shield, Activity } from 'lucide-react';

export default function PhysicalTrafficLight({ 
  trafficLight = 'green', 
  actionCode = 'SAFE', 
  actionTitle = 'Margen Biofísico Seguro', 
  sigma = 0.65, 
  hasCriticalShoulder = false 
}) {
  const safeSigma = typeof sigma === 'number' ? sigma : parseFloat(sigma) || 0;
  // Determine which lamps are lit
  // trafficLight can be: 'green' | 'amber' | 'red' | 'critical_red' | 'black'
  const isGreenLit = trafficLight === 'green';
  const isAmberLit = trafficLight === 'amber';
  const isRedLit = trafficLight === 'red' || trafficLight === 'critical_red';
  const isBlackLit = trafficLight === 'black'; // Extreme fracture / strobe mode

  return (
    <div className="rounded-3xl p-6 bg-white/95 border border-[#D4C9B8] shadow-md flex flex-col items-center justify-between relative overflow-hidden text-slate-900">
      {/* Background ambient glow matching the active light */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-20 ${
        isBlackLit ? 'bg-purple-950 animate-pulse' :
        isRedLit ? 'bg-rose-950' :
        isAmberLit ? 'bg-amber-950' :
        'bg-emerald-950'
      }`} />

      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-[#D4C9B8] relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#487075]" />
          <h3 className="font-serif font-bold text-slate-900 text-sm">
            Semáforo Biofísico de Gobernanza
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-[#FAF7F0] border-[#D4C9B8] text-slate-700 font-bold">
          LÁMINA 21
        </span>
      </div>

      {/* PHYSICAL TRAFFIC LIGHT CHASSIS */}
      <div className="my-5 relative z-10 flex flex-col items-center">
        {/* Top Mounting Bracket */}
        <div className="w-8 h-3 bg-zinc-700 rounded-t-md border-t border-x border-zinc-500 shadow" />

        {/* Traffic Light Main Body (Dark Aluminum Chassis) */}
        <div className="w-28 sm:w-32 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-3.5 rounded-3xl border-2 border-zinc-700/80 shadow-[0_12px_30px_rgba(0,0,0,0.9)] flex flex-col items-center gap-4 relative">
          
          {/* Subtle Cyberpunk Screws / Rivets */}
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 absolute top-2 left-2 shadow-inner" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 absolute top-2 right-2 shadow-inner" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 absolute bottom-2 left-2 shadow-inner" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 absolute bottom-2 right-2 shadow-inner" />

          {/* 1. RED LAMP (Sobrecarga / Alerta / Fractura) */}
          <div className="relative flex flex-col items-center">
            {/* Sun Hood / Visor */}
            <div className="w-18 h-3.5 bg-zinc-800 rounded-t-full border-t border-zinc-600 -mb-1 shadow-md z-10" />
            
            {/* Lamp Bulb */}
            <div className={`w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
              isRedLit || isBlackLit
                ? isBlackLit
                  ? 'bg-rose-600 border-white shadow-[0_0_35px_#f43f5e] animate-ping-slow'
                  : 'bg-rose-500 border-rose-200 shadow-[0_0_30px_#f43f5e]'
                : 'bg-rose-950/40 border-rose-950 shadow-inner opacity-40'
            }`}>
              {/* Internal Fresnel Glass Pattern */}
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-white/30" />
              </div>
              {(isRedLit || isBlackLit) && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* 2. AMBER LAMP (Fatiga / Ajuste) */}
          <div className="relative flex flex-col items-center">
            {/* Sun Hood / Visor */}
            <div className="w-18 h-3.5 bg-zinc-800 rounded-t-full border-t border-zinc-600 -mb-1 shadow-md z-10" />
            
            {/* Lamp Bulb */}
            <div className={`w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
              isAmberLit
                ? 'bg-amber-400 border-amber-100 shadow-[0_0_30px_#fbbf24]'
                : 'bg-amber-950/40 border-amber-950 shadow-inner opacity-40'
            }`}>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-white/30" />
              </div>
              {isAmberLit && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* 3. GREEN LAMP (Seguro / Sintrópico) */}
          <div className="relative flex flex-col items-center">
            {/* Sun Hood / Visor */}
            <div className="w-18 h-3.5 bg-zinc-800 rounded-t-full border-t border-zinc-600 -mb-1 shadow-md z-10" />
            
            {/* Lamp Bulb */}
            <div className={`w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
              isGreenLit
                ? 'bg-emerald-400 border-emerald-100 shadow-[0_0_30px_#34d399]'
                : 'bg-emerald-950/40 border-emerald-950 shadow-inner opacity-40'
            }`}>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-white/30" />
              </div>
              {isGreenLit && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
              )}
            </div>
          </div>

        </div>

        {/* Bottom Mounting Post */}
        <div className="w-6 h-5 bg-zinc-800 border-b border-x border-zinc-600 shadow-md" />
      </div>

      {/* State Banner Readout */}
      <div className={`w-full p-3 rounded-2xl border text-center transition-all relative z-10 ${
        isBlackLit ? 'bg-purple-950/90 border-purple-500 text-purple-200 animate-pulse' :
        isRedLit ? 'bg-rose-950/90 border-rose-500 text-rose-200' :
        isAmberLit ? 'bg-amber-950/90 border-amber-500 text-amber-200' :
        'bg-emerald-950/90 border-emerald-500 text-emerald-200'
      }`}>
        <span className="text-[10px] font-mono uppercase tracking-wider block font-bold opacity-80">
          Código: {actionCode}
        </span>
        <strong className="text-sm font-serif block mt-0.5">
          {actionTitle}
        </strong>
        <span className="text-[11px] font-mono opacity-90 block mt-1">
          Tensión Operativa: <strong>σ = {safeSigma.toFixed(3)}</strong>
        </span>
      </div>
    </div>
  );
}

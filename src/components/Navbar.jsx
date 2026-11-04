import React from 'react';
import { Activity, Globe, Layers, Database, BookOpen, GitCompare, Sparkles, ShieldCheck, FileText } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Navbar({ activeTab, setActiveTab, onNavigateCustomAudit }) {
  const navItems = [
    { id: 'articles', label: 'Artículos & Policy', icon: FileText },
    { id: 'core', label: 'CORE', icon: Activity },
    { id: 'world_map', label: 'Atlas Territorial', icon: Globe },
    { id: 'audit', label: 'Auditoría Biofísica', icon: ShieldCheck },
    { id: 'theory', label: 'Marco Epistémico', icon: BookOpen },
  ];

  return (
    <header className="border-b border-[#D4C9B8]/80 bg-[#FAF7F0]/95 backdrop-blur-xl text-slate-800 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2 gap-4">
          
          {/* Logo Brand (Clic para ir al Inicio) */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3.5 cursor-pointer group"
            title="HOMBROS · Ir al Inicio"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src={getAssetUrl('art/hombros_logo.png')} 
                alt="Hombros" 
                className="h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(72,112,117,0.25)] group-hover:scale-105 transition-all duration-300"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="tracking-wide text-2xl font-bold font-serif text-slate-900 tracking-tight">
                  HOMBROS
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold bg-[#28475A]/15 text-[#28475A] border border-[#28475A]/40">
                  Think Tank & Lab
                </span>
              </div>
              <p className="text-[11px] hidden sm:block text-[#64748B] font-mono font-medium">
                Laboratorio de Hipótesis Biofísicas & Gobernanza Sintrópica
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl border border-[#D4C9B8]/70 bg-[#EDE8DC]/80 shadow-inner">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAudit = item.id === 'audit';

              if (isAudit) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all font-mono font-bold ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-700 via-teal-800 to-[#122227] text-white border border-amber-400 ring-2 ring-amber-400/50 shadow-md shadow-emerald-950/40'
                        : 'bg-gradient-to-r from-[#122227] via-[#1A2E33] to-[#28475A] text-amber-300 border border-amber-400/60 hover:brightness-115 shadow-xs'
                    }`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                    <Icon className="w-3.5 h-3.5 text-amber-300" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#487075] to-[#28475A] text-white font-serif font-bold shadow-md shadow-[#487075]/25 border border-white/30'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/80 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#487075]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-[#D4C9B8]/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isAudit = item.id === 'audit';

            if (isAudit) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-700 to-[#122227] text-white border border-amber-400 shadow-md'
                      : 'bg-gradient-to-r from-[#122227] to-[#28475A] text-amber-300 border border-amber-400/50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  <Icon className="w-3.5 h-3.5 text-amber-300" />
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#487075] to-[#28475A] text-white font-bold shadow-md'
                    : 'text-slate-700 bg-white/70 hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

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

            {/* Direct CTA: Kit Audita tu Cuenca + AgriTwin */}
            <button
              onClick={() => {
                if (onNavigateCustomAudit) {
                  onNavigateCustomAudit('agritwin');
                } else {
                  setActiveTab('audit');
                }
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-[#122227] text-emerald-100 hover:text-white border border-emerald-400/40 shadow-sm hover:shadow-emerald-900/30 hover:scale-[1.02] transition-all"
              title="Acceso directo al Kit Biescala AgriTwin (Cuenca Longaví + Mesa Vecinal El Panal)"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>⚡ Audita tu Cuenca</span>
            </button>
          </nav>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-[#D4C9B8]/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
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

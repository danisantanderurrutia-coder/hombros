import React from 'react';
import { Activity, Globe, Layers, Database, BookOpen, GitCompare, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'landing', label: 'Inicio', icon: Sparkles },
    { id: 'core', label: 'El Núcleo', icon: Activity },
    { id: 'world_map', label: 'Mapa Mundi & Datos Crudos', icon: Globe },
    { id: 'cases', label: 'Contraste de Métricas', icon: GitCompare },
    { id: 'scenarios', label: 'Simulador Prospectivo', icon: Layers },
    { id: 'data_sources', label: 'Fuentes de Datos', icon: Database },
    { id: 'theory', label: 'Marco Epistémico', icon: BookOpen },
  ];

  return (
    <header className="border-b border-[#D4C9B8]/80 bg-[#FAF7F0]/95 backdrop-blur-xl text-slate-800 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2 gap-4">
          
          {/* Unboxed, Liberated Logo Brand */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3.5 cursor-pointer group"
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
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold bg-[#7DB2B2]/20 text-[#487075] border border-[#7DB2B2]/50">
                  Solarpunk
                </span>
              </div>
              <p className="text-[11px] hidden sm:block text-[#64748B] font-mono font-medium">
                Desarrollo Sostenido sobre Autosustento Sintrópico
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

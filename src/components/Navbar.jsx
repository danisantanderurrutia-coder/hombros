import React from 'react';
import { Activity, Globe, Layers, Database, BookOpen, GitCompare } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'core', label: 'El Núcleo (Organismo)', icon: Activity },
    { id: 'world_map', label: 'Mapa Mundi & Datos Crudos', icon: Globe },
    { id: 'cases', label: 'Contraste de Métricas', icon: GitCompare },
    { id: 'scenarios', label: 'Simulador Prospectivo', icon: Layers },
    { id: 'data_sources', label: 'Fuentes de Datos', icon: Database },
    { id: 'theory', label: 'Marco Epistémico', icon: BookOpen },
  ];

  return (
    <header className="border-b border-white/10 bg-[#160c22]/90 backdrop-blur-xl text-slate-100 sticky top-0 z-50 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2 gap-4">
          
          {/* Unboxed, Liberated Logo Brand */}
          <div 
            onClick={() => setActiveTab('core')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <img 
                src="/art/hombros_logo.png" 
                alt="Hombros" 
                className="h-12 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(216,63,135,0.45)] group-hover:scale-108 transition-all duration-300"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="tracking-wide text-2xl font-bold font-serif text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  HOMBROS
                </span>
              </div>
              <p className="text-[11px] hidden sm:block text-[#A4B3B6] font-mono font-medium">
                Desarrollo Sostenido sobre Autosustento Sintrópico
              </p>
            </div>
          </div>

          {/* Navigation Links (5 Focused Tabs) */}
          <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-[#221434]/80 shadow-inner">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D83F87] via-[#8D69A6] to-[#376E6F] text-white font-serif font-bold shadow-lg shadow-[#D83F87]/30 border border-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#DA7B93]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-white/10">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D83F87] to-[#376E6F] text-white font-bold shadow-md'
                    : 'text-slate-300 bg-[#221434]/80 hover:bg-white/10'
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

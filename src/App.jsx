import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import TabHeaderBanner from './components/TabHeaderBanner';
import CoreDashboard from './components/CoreDashboard';
import WorldTerritoriesMap from './components/WorldTerritoriesMap';
import DeepDiveCasesView from './components/DeepDiveCasesView';
import ScenarioSimulator from './components/ScenarioSimulator';
import DataSourcesView from './components/DataSourcesView';
import TheoryView from './components/TheoryView';
import MetabolicAuditView from './components/MetabolicAuditView';
import ArticlesPolicyView from './components/ArticlesPolicyView';
import ThinkTankView from './components/ThinkTankView';
import SolarpunkAtlasCanvas from './components/SolarpunkAtlasCanvas';
import { INITIAL_TERRITORIES } from './models/territories';
import { evaluateTerritoryState } from './models/mechanics';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const TAB_SLUGS = {
  landing: 'inicio',
  think_tank: 'think-tank',
  articles: 'articulos',
  core: 'nucleo',
  world_map: 'atlas',
  audit: 'auditoria-cuenca',
  theory: 'teoria',
  cases: 'casos',
  data_sources: 'datos',
  scenarios: 'escenarios'
};

const SLUG_TO_TAB = {
  '': 'landing',
  'inicio': 'landing',
  'landing': 'landing',
  'think-tank': 'think_tank',
  'think_tank': 'think_tank',
  'institucional': 'think_tank',
  'quienes-somos': 'think_tank',
  'articulos': 'articles',
  'articles': 'articles',
  'nucleo': 'core',
  'core': 'core',
  'atlas': 'world_map',
  'mapa': 'world_map',
  'world_map': 'world_map',
  'auditoria-cuenca': 'audit',
  'auditoria': 'audit',
  'audit': 'audit',
  'teoria': 'theory',
  'theory': 'theory',
  'casos': 'cases',
  'cases': 'cases',
  'datos': 'data_sources',
  'data_sources': 'data_sources',
  'escenarios': 'scenarios',
  'scenarios': 'scenarios'
};

function parseHashRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { tab: 'landing', anchor: null };

  let [path, anchor] = raw.split('#');
  const parts = path.split('/');
  const slug = parts[0] ? parts[0].toLowerCase() : '';
  const sub = parts[1] ? parts[1].toLowerCase() : null;

  if (!anchor && sub) {
    if (sub === 'corporeidad' || sub === 'corporeidad-compleja') {
      anchor = 'corporeidad-compleja';
    } else if (sub === 'abstract' || sub === 'resumen') {
      anchor = 'abstract';
    } else if (sub === 'gaps') {
      anchor = 'gaps-estandares';
    } else if (sub === 'mecanica' || sub === 'ecuaciones') {
      anchor = 'formulacion-mecanica';
    } else if (sub === 'benchmark') {
      anchor = 'benchmark-empirico';
    } else if (sub === 'figuras') {
      anchor = 'galeria-figuras';
    }
  }

  const tab = SLUG_TO_TAB[slug] || 'landing';
  return { tab, anchor };
}

function AppContent() {
  const [territories] = useState(INITIAL_TERRITORIES);
  const [selectedTerritoryId, setSelectedTerritoryId] = useState('chanco');
  const initialRoute = useMemo(() => parseHashRoute(), []);
  const [activeTab, setActiveTabState] = useState(initialRoute.tab);
  const [customAuditMode, setCustomAuditMode] = useState(() => {
    return window.location.hash.includes('auditoria-cuenca') ? 'kit_cuenca' : null;
  });

  // Función de navegación con actualización de slugs en la URL
  const handleSelectTab = (tab, targetAnchor = null) => {
    setActiveTabState(tab);
    const slug = TAB_SLUGS[tab] || tab;
    const targetHash = targetAnchor 
      ? `#/${slug}#${targetAnchor}` 
      : (slug === 'inicio' ? '#/' : `#/${slug}`);
    
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    if (!targetAnchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sincronización bidireccional con eventos del navegador (atrás/adelante o enlaces compartidos)
  useEffect(() => {
    const handleHashSync = () => {
      const { tab, anchor } = parseHashRoute();
      setActiveTabState(tab);
      if (window.location.hash.includes('auditoria-cuenca')) {
        setCustomAuditMode('kit_cuenca');
      }
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    };

    // Si había un ancla al inicio, desplazarse
    if (initialRoute.anchor) {
      setTimeout(() => {
        const el = document.getElementById(initialRoute.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [initialRoute.anchor]);

  const handleNavigateCustomAudit = (mode = 'kit_cuenca') => {
    setCustomAuditMode(mode);
    handleSelectTab('audit');
  };

  const [modifiers, setModifiers] = useState({
    climateShock: 0,
    extractivePressure: 0,
    regenerativeInvestment: 0,
  });

  const currentTerritory = useMemo(() => {
    return territories.find(t => t.id === selectedTerritoryId) || territories[0];
  }, [territories, selectedTerritoryId]);

  const territoryState = useMemo(() => {
    return evaluateTerritoryState(currentTerritory, modifiers);
  }, [currentTerritory, modifiers]);

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col justify-between bg-biodigital-canvas text-slate-800 font-sans relative overflow-x-hidden">
      {/* Solarpunk Atlas Canvas Vivo & Dinámico ("Formal Increíble") */}
      <SolarpunkAtlasCanvas />

      <div className="relative z-10">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleSelectTab} 
          onNavigateCustomAudit={handleNavigateCustomAudit}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab !== 'landing' && (
            <TabHeaderBanner activeTab={activeTab} />
          )}

          {activeTab === 'landing' && (
            <LandingView 
              onNavigate={handleSelectTab} 
              onNavigateCustomAudit={handleNavigateCustomAudit}
            />
          )}

          {activeTab === 'think_tank' && (
            <ThinkTankView 
              onNavigate={handleSelectTab} 
              onNavigateCustomAudit={handleNavigateCustomAudit}
            />
          )}

          {activeTab === 'core' && (
            <CoreDashboard />
          )}

          {activeTab === 'audit' && (
            <MetabolicAuditView initialCustomMode={customAuditMode} />
          )}

          {activeTab === 'articles' && (
            <ArticlesPolicyView onNavigateTab={handleSelectTab} />
          )}

          {(activeTab === 'world_map' || activeTab === 'cases' || activeTab === 'data_sources') && (
            <WorldTerritoriesMap
              territories={territories}
              selectedTerritoryId={selectedTerritoryId}
              setSelectedTerritoryId={setSelectedTerritoryId}
              globalModifiers={modifiers}
              onNavigateCustomAudit={handleNavigateCustomAudit}
              initialSubTab={activeTab === 'cases' ? 'cases' : activeTab === 'data_sources' ? 'data_sources' : 'map'}
            />
          )}

          {activeTab === 'scenarios' && (
            <CoreDashboard initialSubtab="prospectiva" />
          )}

          {activeTab === 'theory' && (
            <TheoryView />
          )}
        </main>
      </div>

      {/* Footer Institucional del Think Tank & Laboratorio */}
      <footer className="border-t py-6 mt-12 transition-colors duration-400 text-xs border-[#D4C9B8]/70 bg-[#FAF7F0]/95 text-slate-600 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#487075] animate-pulse"></span>
            <span>
              <strong className="font-serif font-bold text-slate-900 tracking-wide">HOMBROS</strong> · Programa de Investigación en Economía Biofísica, Mecánica Territorial & Gobernanza Sintrópica
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#28475A] font-bold">
            [ Laboratorio de Hipótesis Biofísicas & Incidencia Pública · Cono Sur & Europa ]
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

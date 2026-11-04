import React, { useState, useMemo } from 'react';
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
import SolarpunkAtlasCanvas from './components/SolarpunkAtlasCanvas';
import { INITIAL_TERRITORIES } from './models/territories';
import { evaluateTerritoryState } from './models/mechanics';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [territories] = useState(INITIAL_TERRITORIES);
  const [selectedTerritoryId, setSelectedTerritoryId] = useState('chanco');
  const [activeTab, setActiveTab] = useState('landing');
  const [customAuditMode, setCustomAuditMode] = useState(null); // null | 'agritwin' | 'blank'

  const handleNavigateCustomAudit = (mode = 'agritwin') => {
    setCustomAuditMode(mode);
    setActiveTab('audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          setActiveTab={setActiveTab} 
          onNavigateCustomAudit={handleNavigateCustomAudit}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab !== 'landing' && (
            <TabHeaderBanner activeTab={activeTab} />
          )}

          {activeTab === 'landing' && (
            <LandingView 
              onNavigate={setActiveTab} 
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
            <ArticlesPolicyView onNavigateTab={setActiveTab} />
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

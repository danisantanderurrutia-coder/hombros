import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import TabHeaderBanner from './components/TabHeaderBanner';
import CoreDashboard from './components/CoreDashboard';
import WorldTerritoriesMap from './components/WorldTerritoriesMap';
import DeepDiveCasesView from './components/DeepDiveCasesView';
import ScenarioSimulator from './components/ScenarioSimulator';
import DataSourcesView from './components/DataSourcesView';
import TheoryView from './components/TheoryView';
import { INITIAL_TERRITORIES } from './models/territories';
import { evaluateTerritoryState } from './models/mechanics';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [territories] = useState(INITIAL_TERRITORIES);
  const [selectedTerritoryId, setSelectedTerritoryId] = useState('chanco');
  const [activeTab, setActiveTab] = useState('core');

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
      {/* Dynamic Starlight Field */}
      <div className="fixed inset-0 cosmos-stars pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TabHeaderBanner activeTab={activeTab} />

          {activeTab === 'core' && (
            <CoreDashboard />
          )}

          {activeTab === 'world_map' && (
            <WorldTerritoriesMap
              territories={territories}
              selectedTerritoryId={selectedTerritoryId}
              setSelectedTerritoryId={setSelectedTerritoryId}
              globalModifiers={modifiers}
              onNavigateToCases={(cityId) => {
                if (cityId) setSelectedTerritoryId(cityId);
                setActiveTab('cases');
              }}
            />
          )}

          {activeTab === 'cases' && (
            <DeepDiveCasesView 
              selectedTerritoryId={selectedTerritoryId}
              setSelectedTerritoryId={setSelectedTerritoryId}
              onNavigateToMap={(cityId) => {
                if (cityId) setSelectedTerritoryId(cityId);
                setActiveTab('world_map');
              }}
            />
          )}

          {activeTab === 'scenarios' && (
            <ScenarioSimulator territory={currentTerritory} />
          )}

          {activeTab === 'data_sources' && (
            <DataSourcesView />
          )}

          {activeTab === 'theory' && (
            <TheoryView />
          )}
        </main>
      </div>

      {/* Footer Solarpunk Travertino */}
      <footer className="border-t py-6 mt-12 transition-colors duration-400 text-xs border-[#D4C9B8]/70 bg-[#FAF7F0]/95 text-slate-600 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full inline-block bg-[#487075] animate-pulse"></span>
            <span>
              <strong className="font-serif font-bold text-slate-900 tracking-wide">HOMBROS</strong> · Sistema Metabólico Territorial & Autosustento Sintrópico
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#487075] font-bold">
            [ Solarpunk Travertino & Celadón Edition · Cono Sur & Europa ]
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

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Compass, 
  Waves, 
  Satellite, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';
import { CHILE_DGA_CUENCAS, searchChileCuencas } from '../data/chileCuencasDGA';

/**
 * SelectorCuencasDGA
 * 
 * Selector Georreferenciado Oficial de Cuencas y Comunas de Chile:
 * - Búsqueda en tiempo real por comuna (ej. "Ovalle", "San Felipe", "Longaví", "Temuco") o cuenca DGA.
 * - Carga instantánea de reflectancias Sentinel-2 BOA (Tile ESA), Estación Fluviométrica de referencia DGA-MOP
 *   y perfiles bioclimáticos derivados del motor de teledetección de AgriTwin.
 * 
 * Declaración de Autoría:
 * - Geometría e Hidrología: DGA-MOP (Dirección General de Aguas, Chile).
 * - Algoritmos espectrales: AgriTwin STAC Client (v4.5 / Element84 / ESA Copernicus).
 */
export default function SelectorCuencasDGA({
  selectedCuencaId,
  onSelectCuenca
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCuencas = useMemo(() => {
    return searchChileCuencas(searchQuery);
  }, [searchQuery]);

  const activeCuenca = useMemo(() => {
    return CHILE_DGA_CUENCAS.find(c => c.id === selectedCuencaId) || CHILE_DGA_CUENCAS.find(c => c.id === 'cuenca_maule_longavi');
  }, [selectedCuencaId]);

  const handleChoose = (cuenca) => {
    onSelectCuenca(cuenca);
    setIsOpen(false);
  };

  return (
    <div className="bg-[#0B1518] border border-cyan-500/30 rounded-2xl p-4 shadow-xl text-slate-100 font-sans space-y-3">
      {/* Cabecera del Selector con Declaración de Autoría */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-cyan-500/20 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            Selector Georreferenciado de Cuencas DGA-MOP & AgriTwin
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-cyan-200">
            Fuente: DGA-MOP · Catálogo STAC AgriTwin Tile
          </span>
        </div>
      </div>

      {/* Barra de Búsqueda de Comuna / Cuenca */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Escribe una comuna o cuenca (ej. Ovalle, Petorca, Longaví, Valdivia, Maipo)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/70 border border-cyan-500/40 text-xs sm:text-sm font-mono text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
        </div>

        {/* Dropdown de Resultados Filtrados */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#081013] border border-cyan-500/40 rounded-xl max-h-64 overflow-y-auto shadow-2xl divide-y divide-white/10">
            {filteredCuencas.length === 0 ? (
              <div className="p-4 text-xs font-mono text-slate-400 text-center">
                No encontramos cuencas para "{searchQuery}". Puedes elegir una de la lista o usar la cuenca estándar.
              </div>
            ) : (
              filteredCuencas.map(cuenca => (
                <div
                  key={cuenca.id}
                  onClick={() => handleChoose(cuenca)}
                  className={`p-3 cursor-pointer hover:bg-cyan-950/40 transition-all flex items-start justify-between gap-3 ${
                    activeCuenca?.id === cuenca.id ? 'bg-cyan-950/60 border-l-4 border-cyan-400' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-serif font-bold text-white">{cuenca.nombre}</strong>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        DGA {cuenca.dga_code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5 flex flex-wrap gap-1">
                      <span>{cuenca.region} · </span>
                      <span className="text-slate-300">Comunas: {cuenca.comunas.slice(0, 4).join(', ')}{cuenca.comunas.length > 4 ? '…' : ''}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-cyan-300 block">Tile {cuenca.sentinel_tile}</span>
                    <span className="text-[9px] font-mono text-slate-400">NDRE {cuenca.spectral_profile.ndre}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Ficha Resumen de la Cuenca Seleccionada Activa */}
      {activeCuenca && (
        <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-500/25 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs font-mono">
          <div className="md:col-span-7 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <strong className="text-cyan-200 font-bold text-sm">{activeCuenca.nombre}</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Código DGA {activeCuenca.dga_code}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans">
              <strong>Bioma & Territorio:</strong> {activeCuenca.bioma}
            </p>
            <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
              <span>📍 Lat/Lng: {activeCuenca.coordinates[0]}, {activeCuenca.coordinates[1]}</span>
              <span>🌊 Estación DGA: {activeCuenca.estacion_dga_ref}</span>
              <span>🏞️ Embalse: {activeCuenca.embalse_principal}</span>
            </div>
          </div>

          {/* Telemetría Satelital Sentinel-2 Estimada (AgriTwin) */}
          <div className="md:col-span-5 p-2.5 rounded-lg bg-[#070D10] border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-300 pb-1 border-b border-white/10">
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <Satellite className="w-3 h-3 text-emerald-400" /> Sentinel-2 BOA ({activeCuenca.sentinel_tile})
              </span>
              <span className="text-slate-400">AgriTwin Calibrated</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center">
              <div className="bg-black/60 p-1 rounded">
                <div className="text-[9px] text-emerald-400 font-bold">NDRE</div>
                <div className="text-xs font-bold text-white">{activeCuenca.spectral_profile.ndre}</div>
              </div>
              <div className="bg-black/60 p-1 rounded">
                <div className="text-[9px] text-cyan-400 font-bold">MNDWI</div>
                <div className="text-xs font-bold text-white">{activeCuenca.spectral_profile.mndwi}</div>
              </div>
              <div className="bg-black/60 p-1 rounded">
                <div className="text-[9px] text-amber-400 font-bold">SOC</div>
                <div className="text-xs font-bold text-white">{activeCuenca.spectral_profile.soc_proxy}</div>
              </div>
              <div className="bg-black/60 p-1 rounded">
                <div className="text-[9px] text-rose-400 font-bold">NBR</div>
                <div className="text-xs font-bold text-white">{activeCuenca.spectral_profile.nbr}</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-400 text-right">
              Población cuenca: ~{activeCuenca.poblacion_estimada.toLocaleString('es-CL')} hab.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

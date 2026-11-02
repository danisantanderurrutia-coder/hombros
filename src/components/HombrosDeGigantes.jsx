import React from 'react';
import { Sparkles, Compass, Heart, Globe, Flame, Shield, Sun, Feather } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function HombrosDeGigantes() {
  const pillars = [
    {
      title: 'Buen Vivir Andino (Sumak Kawsay)',
      badge: 'Epistemología del Sur',
      icon: '🌿',
      content: 'El bienestar no es acumulación de capital monetario; es relacionalidad sostenida entre comunidad, territorio y tiempo. La naturaleza es sujeto de derecho y fuente de vida, no depósito de mercancías.'
    },
    {
      title: 'Economía Ecológica',
      badge: 'Metabolismo Biofísico',
      icon: '🌍',
      content: 'La economía humana es un subsistema abierto inserto en la biosfera, no al revés. No existe sustituibilidad perfecta entre capital financiero y capital natural: un acuífero destruido no se reemplaza con deuda soberana.'
    },
    {
      title: 'Teoría de Sistemas & Complejidad',
      badge: 'Cibernética de la Vida',
      icon: '🔄',
      content: 'Los sistemas complejos o se auto-organizan (sintropía) o se disipan (entropía). No hay punto neutral en un territorio: la inacción frente al extractivismo acelera la degradación hacia la fractura.'
    },
    {
      title: 'Economía del Donut & Límites Planetarios',
      badge: 'Techo Ecológico / Piso Social',
      icon: '🍩',
      content: 'Es posible y urgente construir marcos operativos que traduzcan valores éticos en límites cuantitativos tangibles. Los hombros fijan el techo de carga y el piso vital indispensable de cada cuenca.'
    },
    {
      title: 'Ecología Política Latinoamericana',
      badge: 'Soberanía Territorial',
      icon: '✊',
      content: 'El territorio no es recurso ni objeto de explotación; es un sujeto histórico. Las periferias no están condenadas a ser zonas de sacrificio para el consumo opulento de los centros globales.'
    },
    {
      title: 'Autonomía Zapatista & Comunitaria',
      badge: 'Autogobierno',
      icon: '⭐',
      content: '"No necesitamos permiso para ser libres". Si el modelo hegemónico destruye las bases de sustento, las comunidades organizadas construyen sus propios circuitos de economía reproductiva y resistencia.'
    },
    {
      title: 'Permacultura & Agricultura Sintrópica',
      badge: 'Ernst Götsch / Mollison',
      icon: '🌱',
      content: 'Podemos vivir en armonía activa con la naturaleza creando sistemas que acumulan energía, fertilidad y agua a medida que producen alimentos, transformando la entropía en abundancia viva.'
    },
    {
      title: 'Ecología Profunda',
      badge: 'Arne Næss',
      icon: '🦅',
      content: 'Toda forma de vida tiene valor intrínseco independiente de su utilidad para los fines mercantiles humanos. La preservación de los equilibrios ecosistémicos es un deber civilizatorio innegociable.'
    },
    {
      title: 'Genealogía de Pensadores Clave',
      badge: 'Autores Nucleares',
      icon: '📚',
      content: 'Nicholas Georgescu-Roegen (bioeconomía y entropía), Manfred Max-Neef (desarrollo a escala humana), Ruy Mauro Marini (teoría de la dependencia), José Bengoa (historia rural mapuche y campesina), Enrique Dussel (filosofía de la liberación), Arne Næss (ecología profunda) y Ernst Götsch (agricultura sintrópica).'
    }
  ];

  return (
    <div className="bio-hud-panel rounded-3xl p-6 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D4C9B8]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#487075] text-white shadow-xs">
            Marco Epistémico (Lámina 25)
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-black tracking-tight mt-1.5 flex items-center gap-2">
            Construir sobre Hombros de Gigantes
          </h3>
          <p className="text-xs sm:text-sm text-black font-medium mt-0.5">
            Las corrientes de pensamiento, luchas y sabidurías que nutren el modelo de autosustento sintrópico
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono bg-[#C86D51] text-white px-3 py-1.5 rounded-xl font-bold shadow-xs">
          <Feather className="w-4 h-4 text-white" />
          <span>9 Pilares Fundacionales</span>
        </div>
      </div>

      {/* Grid of 9 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map((p, idx) => {
          const cardThemes = [
            'card-rose',
            'card-teal',
            'card-indigo',
            'card-magenta',
            'card-slate',
            'card-plum',
            'card-teal',
            'card-indigo',
            'card-magenta'
          ];
          const badgeColors = [
            'bg-[#C86D51] text-white',
            'bg-[#487075] text-white',
            'bg-[#28475A] text-white',
            'bg-[#D83F87] text-white',
            'bg-[#927660] text-white',
            'bg-[#624F44] text-white',
            'bg-[#487075] text-white',
            'bg-[#28475A] text-white',
            'bg-[#C86D51] text-white'
          ];
          const currentCardClass = cardThemes[idx % cardThemes.length];
          const currentBadgeColor = badgeColors[idx % badgeColors.length];

          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md border border-black/10 ${currentCardClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">{p.icon}</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold shadow-xs ${currentBadgeColor}`}>
                    {p.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-serif text-black mb-1.5 transition-colors">
                  {p.title}
                </h4>
                <p className="text-[11px] text-black leading-relaxed font-sans font-medium">
                  {p.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resignificación de Atlas y Sísifo */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F0] via-[#E2F4F2] to-[#FEECE8] border border-[#D4C9B8] flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-[#927660]/40 shadow-sm bg-white">
          <img 
            src={getAssetUrl('art/hombros_logo.png')} 
            alt="Atlas & Sísifo Colectivos" 
            className="w-full h-full object-cover filter contrast-110"
          />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C86D51]">
            Axioma de la Resignificación Mítica
          </span>
          <h4 className="font-serif font-extrabold text-black text-sm sm:text-base">
            De la Condena Solitaria al Triunfo Colectivo
          </h4>
          <p className="text-xs text-black leading-relaxed font-sans font-medium">
            Atlas ya no sufre un castigo titánico en soledad, ni la roca de Sísifo vuelve a caer al abismo. En <strong>HOMBROS</strong>, la comunidad comparte la elevación del desarrollo territorial: las manos se entrelazan y la roca en la cumbre echa raíces, floreciendo en una biósfera sintrópica bajo el cielo estrellado.
          </p>
        </div>
      </div>
    </div>
  );
}

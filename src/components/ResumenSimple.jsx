import React from 'react';
import { NORMALIZATION_GOALPOSTS } from '../models/normalization';

/**
 * ResumenSimple
 * Traduce el resultado técnico a palabras simples para municipios, comités de agua
 * y dirigentes. No calcula nada nuevo: solo explica lo que ya calculó el modelo.
 */
const SHOULDER_NAMES = { S: 'social (las personas y su organización)', E: 'ambiental (agua, suelo, bosque)', K: 'económico (producción y recursos locales)' };

function trafficFor(sigma, hasCritical) {
  if (hasCritical || sigma > 1.0) return { icon: '🔴', label: 'ROJO', box: 'border-rose-500/60 bg-rose-950/40', text: 'text-rose-300' };
  if (sigma >= 0.7) return { icon: '🟡', label: 'AMARILLO', box: 'border-amber-500/60 bg-amber-950/40', text: 'text-amber-300' };
  return { icon: '🟢', label: 'VERDE', box: 'border-emerald-500/60 bg-emerald-950/40', text: 'text-emerald-300' };
}

export default function ResumenSimple({ territoryName, baseline, projected, archetypeName, variables, dataMode }) {
  const t = trafficFor(baseline.sigma, baseline.hasCriticalShoulder);
  const tp = trafficFor(projected.sigma, projected.hasCriticalShoulder);

  const shoulders = [['S', baseline.S], ['E', baseline.E], ['K', baseline.K]].sort((a, b) => a[1] - b[1]);
  const weakest = shoulders[0];

  const varEntries = Object.entries(variables)
    .filter(([k]) => NORMALIZATION_GOALPOSTS[k])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  const sigmaWithoutKappa = baseline.sigma * (1 + (baseline.kappa || 0));
  const kappaHelps = (baseline.kappa || 0) > 0.001;

  const headline =
    t.label === 'VERDE'
      ? 'Hoy la cuenca soporta la presión que recibe, con margen.'
      : t.label === 'AMARILLO'
      ? 'Hoy la cuenca está cerca de su límite: cualquier presión nueva requiere cuidado.'
      : 'Hoy la cuenca está sobrecargada: una presión nueva podría dañarla de forma difícil de revertir.';

  const dataText =
    dataMode === 'agritwin'
      ? 'Datos: algunos vienen de AgriTwin (modelados, prototipo) y el resto son valores de ejemplo.'
      : 'Datos: son valores de ejemplo. Aún no son mediciones reales de esta cuenca.';

  return (
    <section aria-label="Resumen en palabras simples" className={`rounded-2xl border-2 p-4 sm:p-5 ${t.box} text-slate-100`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl" aria-hidden="true">{t.icon}</span>
        <div>
          <div className="text-xs font-mono uppercase text-slate-300">Resumen en palabras simples · {territoryName}</div>
          <h2 className={`text-lg sm:text-xl font-serif font-bold ${t.text}`}>
            Semáforo {t.label}: {headline}
          </h2>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed list-disc pl-5">
        <li>
          <strong>Lo más débil:</strong> el pilar {SHOULDER_NAMES[weakest[0]]} ({weakest[1].toFixed(2)} de 1).
          {baseline.hasCriticalShoulder && ' Está bajo el mínimo de seguridad (0,25): eso por sí solo ya enciende la alerta.'}
        </li>
        <li>
          <strong>Los 3 puntos a mejorar primero:</strong>{' '}
          {varEntries.map(([k, v]) => `${NORMALIZATION_GOALPOSTS[k].name} (${v.toFixed(2)})`).join(' · ')}.
        </li>
        <li>
          <strong>El efecto de la organización vecinal:</strong>{' '}
          {kappaHelps
            ? `con los acuerdos actuales, la tensión baja de ${sigmaWithoutKappa.toFixed(2)} a ${baseline.sigma.toFixed(2)}. Mientras más organizada la comunidad, más golpe absorbe.`
            : 'hoy no se está contando ninguna amortiguación vecinal.'}
        </li>
        <li>
          <strong>Si se hiciera «{archetypeName.replace(/^\d+\.\s*/, '')}»:</strong>{' '}
          el semáforo pasaría a {tp.icon} {tp.label} (tensión {projected.sigma.toFixed(2)}).
        </li>
      </ul>

      <p className="mt-3 text-xs text-amber-200">{dataText} Es una herramienta para conversar y simular, no un dictamen.</p>

      <details className="mt-3 text-xs">
        <summary className="cursor-pointer font-bold text-slate-200">¿Qué significan las siglas? (clic para ver)</summary>
        <dl className="mt-2 space-y-1 text-slate-300">
          <div><dt className="inline font-bold">S, E, K:</dt> <dd className="inline">los tres pilares: Social, Ambiental (E de «Ecológico») y Económico (K de «Capital»).</dd></div>
          <div><dt className="inline font-bold">H:</dt> <dd className="inline">«capacidad de carga»: cuánta presión aguanta el territorio. Sube si los tres pilares están sanos.</dd></div>
          <div><dt className="inline font-bold">σ (tensión):</dt> <dd className="inline">presión recibida dividida por lo que se aguanta. Bajo 0,70 hay margen; sobre 1,0 hay sobrecarga.</dd></div>
          <div><dt className="inline font-bold">κ:</dt> <dd className="inline">amortiguación por organización vecinal: qué parte del golpe absorbe la comunidad.</dd></div>
          <div><dt className="inline font-bold">Corte de Liebig (0,25):</dt> <dd className="inline">si un pilar cae bajo 0,25, no se compensa con los otros: como una cadena, vale lo que su eslabón más débil.</dd></div>
          <div><dt className="inline font-bold">Ejemplo / modelado / medido:</dt> <dd className="inline">«ejemplo» es un valor de muestra; «modelado» sale de un cálculo del prototipo; «medido» vendrá de estaciones y satélites cuando existan.</dd></div>
        </dl>
      </details>
    </section>
  );
}

/**
 * Cliente de solo lectura hacia el servidor AgriTwin (agritwin-app, server.cjs).
 *
 * HOMBROS nunca escribe en AgriTwin: únicamente consulta GET /api/basin-sync.
 * AgriTwin ya expone CORS abierto (Access-Control-Allow-Origin: *), por lo que
 * no requiere cambios del lado de AgriTwin.
 *
 * Qué es "en vivo" y qué no (verificado en agritwin-app/server.cjs):
 *  - Clima: Open-Meteo en vivo (campo weather_is_real).
 *  - Caudal Longaví / Embalse Bullileo / FWI: MODELO calculado con ese clima,
 *    no lectura directa de estaciones DGA.
 *  - APRs: tabla fija dentro de AgriTwin (no sensores en tiempo real).
 */

export const DEFAULT_AGRITWIN_URL = 'http://localhost:7777';
const STORAGE_KEY = 'hombros.agritwin.baseUrl';

export function loadSavedAgriTwinUrl() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_AGRITWIN_URL;
  } catch {
    return DEFAULT_AGRITWIN_URL;
  }
}

export function saveAgriTwinUrl(url) {
  try {
    window.localStorage.setItem(STORAGE_KEY, url);
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

/**
 * Valida que la respuesta tenga la forma esperada. Devuelve el payload
 * normalizado o lanza un Error con un mensaje en lenguaje simple.
 */
export function validateBasinSync(raw) {
  if (!raw || typeof raw !== 'object') throw new Error('Respuesta vacía o no válida.');
  if (raw.status !== 'connected') throw new Error('AgriTwin respondió, pero no está en estado "connected".');

  const reservoirFill = raw.embalse_bullileo?.fill_pct;
  const fwi = raw.macro_fwi;
  const q = raw.q_longavi_m3_s;
  if (!isNum(reservoirFill) || !isNum(fwi) || !isNum(q)) {
    throw new Error('Faltan campos numéricos esperados (embalse, FWI o caudal).');
  }

  return {
    timestamp: raw.timestamp || null,
    weatherIsReal: raw.weather_is_real === true,
    weatherSource: raw.weather_source || 'desconocida',
    basinName: raw.cuenca || 'Cuenca',
    river: {
      flow: q,
      regime: raw.rio_longavi?.regime || null,
      alert: raw.rio_longavi?.alert_level || null,
      stationName: raw.rio_longavi?.station_name || null
    },
    reservoir: {
      name: raw.embalse_bullileo?.name || 'Embalse Bullileo',
      volumeHm3: isNum(raw.embalse_bullileo?.volume_hm3) ? raw.embalse_bullileo.volume_hm3 : null,
      fillPct: reservoirFill,
      status: raw.embalse_bullileo?.status || null
    },
    canal: {
      deliveryPct: isNum(raw.acople_predial?.canal_matriz?.delivery_pct)
        ? raw.acople_predial.canal_matriz.delivery_pct
        : null
    },
    tranque: {
      capacityM3: isNum(raw.tranque_keyline_capacity_m3) ? raw.tranque_keyline_capacity_m3 : null,
      fillPct: isNum(raw.acople_predial?.tranque_keyline?.fill_pct)
        ? raw.acople_predial.tranque_keyline.fill_pct
        : null
    },
    fwi: { value: fwi, label: raw.macro_fwi_label || '' },
    puelcheGustsKmh: isNum(raw.puelche_gusts_kmh) ? raw.puelche_gusts_kmh : null,
    aprs: Array.isArray(raw.aprs_summary)
      ? raw.aprs_summary
          .filter((a) => a && typeof a.name === 'string')
          .slice(0, 5)
          .map((a) => ({
            id: a.id,
            name: a.name,
            families: isNum(a.families) ? a.families : null,
            depthM: isNum(a.depth_m) ? a.depth_m : null,
            status: a.status || 'normal'
          }))
      : []
  };
}

export async function fetchBasinSync(baseUrl = DEFAULT_AGRITWIN_URL, timeoutMs = 6000) {
  const clean = String(baseUrl || '').trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(clean)) {
    throw new Error('La dirección debe empezar con http:// o https://');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(`${clean}/api/basin-sync`, { signal: controller.signal });
    if (!resp.ok) throw new Error(`AgriTwin respondió con error ${resp.status}.`);
    const json = await resp.json();
    return validateBasinSync(json);
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('AgriTwin no respondió a tiempo. ¿Está encendido?');
    }
    if (err instanceof TypeError) {
      throw new Error('No se pudo conectar. ¿AgriTwin está encendido y la dirección es correcta?');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

const clamp01 = (v) => Math.min(1, Math.max(0.02, v));

/**
 * Traduce señales en vivo a variables de HOMBROS.
 * Son PROXIES simples y declarados (a calibrar), no mediciones directas:
 *   E2 (agua)       ← llenado del embalse (0–1)
 *   E4 (resiliencia) ← 1 − FWI/100 (riesgo de incendio inverso)
 */
export function deriveLiveVariables(live) {
  return {
    e2: parseFloat(clamp01(live.reservoir.fillPct / 100).toFixed(2)),
    e4: parseFloat(clamp01(1 - live.fwi.value / 100).toFixed(2))
  };
}

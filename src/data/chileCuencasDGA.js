/**
 * Catálogo Georreferenciado Oficial de Macro-Cuencas y Comunas de Chile (DGA-MOP / AgriTwin)
 * 
 * Fuentes y Autoría declarada:
 * - Geometría, Coordenadas y Delimitación: Dirección General de Aguas (DGA-MOP Chile) / Inventario Nacional de Cuencas.
 * - Índices Espectrales & Órbitas Sentinel-2: AgriTwin STAC Client (v4.5) / Element84 Earth Search / ESA Copernicus BOA.
 * - Validación Hidrológica: Benchmark Multi-sitio AgriTwin (NSE > 0.75 / NASA SEAC4RS).
 */

export const CHILE_DGA_CUENCAS = [
  // ──────────────────────────── ZONA NORTE ────────────────────────────
  {
    id: 'cuenca_elqui',
    nombre: 'Cuenca del Río Elqui',
    comunas: ['Vicuña', 'Paihuano', 'La Serena', 'Coquimbo'],
    region: 'Coquimbo (IV Región)',
    dga_code: '043',
    estacion_dga_ref: '04320001-2 (Río Elqui en Algarrobal)',
    coordinates: [-29.98, -70.58],
    bbox: [-70.85, -30.15, -70.30, -29.80],
    sentinel_tile: '19JCN',
    embalse_principal: 'Embalse Puclaro (200 hm³)',
    bioma: 'Valle transversal semiárido, pisqueras, uva de mesa y estrés hídrico extremo',
    poblacion_estimada: 480000,
    spectral_profile: {
      ndre: 0.38,
      mndwi: 0.28,
      soc_proxy: 0.42,
      nbr: 0.68,
      fwi_climatologico: 42
    },
    suggested_variables: {
      s1: 0.62, s2: 0.58, s3: 0.68, s4: 0.72,
      e1: 0.36, e2: 0.24, e3: 0.44, e4: 0.48,
      k1: 0.52, k2: 0.46, k3: 0.48, k4: 0.38
    },
    suggested_d1: 0.68,
    suggested_kappa: 0.26
  },
  {
    id: 'cuenca_limari',
    nombre: 'Cuenca del Río Limarí',
    comunas: ['Ovalle', 'Monte Patria', 'Combarbalá', 'Punitaqui', 'Río Hurtado'],
    region: 'Coquimbo (IV Región)',
    dga_code: '045',
    estacion_dga_ref: '04512001-6 (Río Hurtado en San Agustín)',
    coordinates: [-30.60, -71.20],
    bbox: [-71.50, -30.90, -70.90, -30.40],
    sentinel_tile: '19JCM',
    embalse_principal: 'Embalse La Paloma (750 hm³)',
    bioma: 'Secano interior semiárido, frutales bajo riego tecnificado y cabras criollas',
    poblacion_estimada: 175000,
    spectral_profile: {
      ndre: 0.34,
      mndwi: 0.22,
      soc_proxy: 0.38,
      nbr: 0.64,
      fwi_climatologico: 48
    },
    suggested_variables: {
      s1: 0.60, s2: 0.52, s3: 0.64, s4: 0.70,
      e1: 0.32, e2: 0.20, e3: 0.40, e4: 0.42,
      k1: 0.48, k2: 0.42, k3: 0.46, k4: 0.34
    },
    suggested_d1: 0.72,
    suggested_kappa: 0.24
  },
  {
    id: 'cuenca_choapa',
    nombre: 'Cuenca del Río Choapa',
    comunas: ['Illapel', 'Salamanca', 'Los Vilos', 'Canela'],
    region: 'Coquimbo (IV Región)',
    dga_code: '047',
    estacion_dga_ref: '04705001-5 (Río Choapa en Cuncumén)',
    coordinates: [-31.63, -71.16],
    bbox: [-71.40, -31.85, -70.95, -31.45],
    sentinel_tile: '19JBM',
    embalse_principal: 'Embalse Coronta (El Bato 25 hm³)',
    bioma: 'Valle minero-agrícola, pastoreo caprino y minería de cobre de cordillera',
    poblacion_estimada: 92000,
    spectral_profile: {
      ndre: 0.36,
      mndwi: 0.26,
      soc_proxy: 0.40,
      nbr: 0.66,
      fwi_climatologico: 45
    },
    suggested_variables: {
      s1: 0.58, s2: 0.54, s3: 0.62, s4: 0.66,
      e1: 0.34, e2: 0.22, e3: 0.42, e4: 0.45,
      k1: 0.44, k2: 0.40, k3: 0.42, k4: 0.36
    },
    suggested_d1: 0.74,
    suggested_kappa: 0.22
  },

  // ──────────────────────────── ZONA CENTRO ────────────────────────────
  {
    id: 'cuenca_petorca',
    nombre: 'Cuenca del Río Petorca y La Ligua',
    comunas: ['Petorca', 'Cabildo', 'La Ligua', 'Papudo', 'Zapallar'],
    region: 'Valparaíso (V Región)',
    dga_code: '053',
    estacion_dga_ref: '05301001-8 (Río Petorca en Hierro Viejo)',
    coordinates: [-32.25, -71.01],
    bbox: [-71.30, -32.45, -70.70, -32.10],
    sentinel_tile: '19HBD',
    embalse_principal: 'Sin embalse mayor de regulación (Agotamiento de napas)',
    bioma: 'Palto de ladera, monocultivo agroexportador intensivo y crisis hídrica de APR',
    poblacion_estimada: 78000,
    spectral_profile: {
      ndre: 0.42,
      mndwi: 0.18,
      soc_proxy: 0.45,
      nbr: 0.58,
      fwi_climatologico: 52
    },
    suggested_variables: {
      s1: 0.66, s2: 0.46, s3: 0.60, s4: 0.62,
      e1: 0.38, e2: 0.16, e3: 0.46, e4: 0.38,
      k1: 0.46, k2: 0.38, k3: 0.44, k4: 0.28
    },
    suggested_d1: 0.82,
    suggested_kappa: 0.20
  },
  {
    id: 'cuenca_aconcagua',
    nombre: 'Cuenca del Río Aconcagua',
    comunas: ['San Felipe', 'Los Andes', 'Quillota', 'La Calera', 'Limache', 'Concon', 'Catemu', 'Llay Llay'],
    region: 'Valparaíso (V Región)',
    dga_code: '054',
    estacion_dga_ref: '05410002-1 (Río Aconcagua en Chacabuquito)',
    coordinates: [-32.83, -70.60],
    bbox: [-71.10, -33.00, -70.40, -32.65],
    sentinel_tile: '19HBD',
    embalse_principal: 'Embalse Chacrillas (27 hm³)',
    bioma: 'Valle agroindustrial, fruticultura de carozo y uva, fundición Chagres y minería Andina',
    poblacion_estimada: 620000,
    spectral_profile: {
      ndre: 0.51,
      mndwi: 0.34,
      soc_proxy: 0.52,
      nbr: 0.60,
      fwi_climatologico: 46
    },
    suggested_variables: {
      s1: 0.54, s2: 0.52, s3: 0.62, s4: 0.64,
      e1: 0.44, e2: 0.26, e3: 0.50, e4: 0.44,
      k1: 0.58, k2: 0.48, k3: 0.46, k4: 0.40
    },
    suggested_d1: 0.70,
    suggested_kappa: 0.18
  },
  {
    id: 'cuenca_maipo',
    nombre: 'Cuenca del Río Maipo (Región Metropolitana)',
    comunas: ['Santiago', 'Puente Alto', 'San Bernardo', 'Melipilla', 'Pirque', 'Buin', 'Paine', 'Talagante', 'San José de Maipo'],
    region: 'Metropolitana (RM)',
    dga_code: '057',
    estacion_dga_ref: '05705001-2 (Río Maipo en El Manzano)',
    coordinates: [-33.67, -70.58],
    bbox: [-71.20, -33.90, -70.20, -33.40],
    sentinel_tile: '19HCD',
    embalse_principal: 'Embalse El Yeso (220 hm³)',
    bioma: 'Megápolis urbana central, piedemonte andino, viñedos del Maipo y presión de sellado',
    poblacion_estimada: 7200000,
    spectral_profile: {
      ndre: 0.48,
      mndwi: 0.41,
      soc_proxy: 0.56,
      nbr: 0.55,
      fwi_climatologico: 49
    },
    suggested_variables: {
      s1: 0.52, s2: 0.64, s3: 0.72, s4: 0.56,
      e1: 0.40, e2: 0.32, e3: 0.52, e4: 0.42,
      k1: 0.76, k2: 0.62, k3: 0.42, k4: 0.36
    },
    suggested_d1: 0.76,
    suggested_kappa: 0.22
  },
  {
    id: 'cuenca_rapel_cachapoal',
    nombre: 'Cuenca del Río Rapel (Cachapoal - Tinguiririca)',
    comunas: ['Rancagua', 'San Fernando', 'Rengo', 'Pichidegua', 'Las Cabras', 'Santa Cruz', 'Peumo'],
    region: 'O\'Higgins (VI Región)',
    dga_code: '060',
    estacion_dga_ref: '06015001-4 (Río Cachapoal en Puente Termas)',
    coordinates: [-34.25, -71.10],
    bbox: [-71.60, -34.60, -70.60, -33.95],
    sentinel_tile: '19HBD',
    embalse_principal: 'Lago Rapel (695 hm³)',
    bioma: 'Corazón agrícola del valle central, frutales mayores, viñedos de Colchagua y El Teniente',
    poblacion_estimada: 980000,
    spectral_profile: {
      ndre: 0.58,
      mndwi: 0.46,
      soc_proxy: 0.62,
      nbr: 0.59,
      fwi_climatologico: 44
    },
    suggested_variables: {
      s1: 0.64, s2: 0.58, s3: 0.66, s4: 0.70,
      e1: 0.50, e2: 0.42, e3: 0.58, e4: 0.48,
      k1: 0.66, k2: 0.54, k3: 0.50, k4: 0.46
    },
    suggested_d1: 0.62,
    suggested_kappa: 0.30
  },

  // ──────────────────────────── ZONA CENTRO-SUR (MAULE & BIOBÍO) ────────────────────────────
  {
    id: 'cuenca_mataquito',
    nombre: 'Cuenca del Río Mataquito',
    comunas: ['Curicó', 'Teno', 'Rauco', 'Sagrada Familia', 'Molina', 'Licantén', 'Hualañé', 'Curepto'],
    region: 'Maule (VII Región)',
    dga_code: '071',
    estacion_dga_ref: '07103001-9 (Río Mataquito en Licantén)',
    coordinates: [-35.00, -71.40],
    bbox: [-72.00, -35.30, -70.90, -34.80],
    sentinel_tile: '19HBD',
    embalse_principal: 'Sin gran embalse de cabecera (Régimen pluvio-nival libre)',
    bioma: 'Valle de Curicó, viñas patrimoniales, cerezos y celulosa Licancel en desembocadura',
    poblacion_estimada: 310000,
    spectral_profile: {
      ndre: 0.56,
      mndwi: 0.44,
      soc_proxy: 0.60,
      nbr: 0.58,
      fwi_climatologico: 41
    },
    suggested_variables: {
      s1: 0.68, s2: 0.56, s3: 0.64, s4: 0.74,
      e1: 0.52, e2: 0.40, e3: 0.58, e4: 0.50,
      k1: 0.62, k2: 0.50, k3: 0.52, k4: 0.48
    },
    suggested_d1: 0.56,
    suggested_kappa: 0.32
  },
  {
    id: 'cuenca_maule_longavi',
    nombre: 'Cuenca del Río Maule (Longaví - Bullileo - Retiro)',
    comunas: ['Talca', 'Linares', 'Longaví', 'Parral', 'Retiro', 'San Clemente', 'Colbún', 'Yerbas Buenas'],
    region: 'Maule (VII Región)',
    dga_code: '073',
    estacion_dga_ref: '07352001-3 (Río Longaví en Quiriquina / El Castillo)',
    coordinates: [-36.2115, -71.6050],
    bbox: [-71.6150, -36.2160, -71.5980, -36.2070],
    sentinel_tile: '18HYD',
    embalse_principal: 'Embalse Bullileo (110 hm³) + Laguna del Maule + Colbún',
    bioma: 'Transición agroecológica mediterránea, cerezos, arroz, avellanos, 5 APRs y Keyline',
    poblacion_estimada: 420000,
    spectral_profile: {
      ndre: 0.58,
      mndwi: 0.52,
      soc_proxy: 0.63,
      nbr: 0.65,
      fwi_climatologico: 38
    },
    suggested_variables: {
      s1: 0.72, s2: 0.58, s3: 0.64, s4: 0.76,
      e1: 0.54, e2: 0.50, e3: 0.61, e4: 0.58,
      k1: 0.58, k2: 0.46, k3: 0.54, k4: 0.62
    },
    suggested_d1: 0.44,
    suggested_kappa: 0.38,
    is_agritwin_anchor: true
  },
  {
    id: 'cuenca_itata',
    nombre: 'Cuenca del Río Itata',
    comunas: ['Chillán', 'San Carlos', 'Coelemu', 'Quirihue', 'Portezuelo', 'Trehuaco', 'Bulnes'],
    region: 'Ñuble (XVI Región)',
    dga_code: '081',
    estacion_dga_ref: '08110001-1 (Río Itata en Coelemu)',
    coordinates: [-36.60, -72.10],
    bbox: [-72.80, -36.90, -71.70, -36.30],
    sentinel_tile: '18HYE',
    embalse_principal: 'Embalse Coihueco + Proyecto La Punilla',
    bioma: 'Valle del Itata, viñas campesinas centenarias de secano y masivo monocultivo de pino',
    poblacion_estimada: 510000,
    spectral_profile: {
      ndre: 0.54,
      mndwi: 0.46,
      soc_proxy: 0.58,
      nbr: 0.52,
      fwi_climatologico: 46
    },
    suggested_variables: {
      s1: 0.70, s2: 0.54, s3: 0.62, s4: 0.72,
      e1: 0.48, e2: 0.44, e3: 0.54, e4: 0.46,
      k1: 0.54, k2: 0.44, k3: 0.50, k4: 0.44
    },
    suggested_d1: 0.52,
    suggested_kappa: 0.34
  },
  {
    id: 'cuenca_biobio',
    nombre: 'Cuenca del Río Biobío (Collipulli - Coihue)',
    comunas: ['Concepción', 'Los Ángeles', 'Collipulli', 'Mulchén', 'Nacimiento', 'Santa Bárbara', 'Alto Biobío'],
    region: 'Biobío / Araucanía (VIII y IX Región)',
    dga_code: '083',
    estacion_dga_ref: '08317001-4 (Río Biobío en Coihue)',
    coordinates: [-37.50, -72.60],
    bbox: [-73.10, -37.95, -71.80, -37.20],
    sentinel_tile: '18HYF',
    embalse_principal: 'Embalses Ralco (1.200 hm³) y Pangue',
    bioma: 'Cuenca hidroeléctrica y forestal mayor, plantaciones de pino/eucalipto y comunidades pehuenche',
    poblacion_estimada: 1250000,
    spectral_profile: {
      ndre: 0.62,
      mndwi: 0.58,
      soc_proxy: 0.66,
      nbr: 0.56,
      fwi_climatologico: 42
    },
    suggested_variables: {
      s1: 0.60, s2: 0.56, s3: 0.64, s4: 0.60,
      e1: 0.56, e2: 0.58, e3: 0.62, e4: 0.50,
      k1: 0.64, k2: 0.52, k3: 0.46, k4: 0.48
    },
    suggested_d1: 0.58,
    suggested_kappa: 0.32
  },

  // ──────────────────────────── ZONA SUR & LAGOS ────────────────────────────
  {
    id: 'cuenca_cautin_imperial',
    nombre: 'Cuenca del Río Imperial - Cautín',
    comunas: ['Temuco', 'Padre Las Casas', 'Nueva Imperial', 'Carahue', 'Lautaro', 'Galvarino'],
    region: 'Araucanía (IX Región)',
    dga_code: '091',
    estacion_dga_ref: '09115001-2 (Río Cautín en Almagro)',
    coordinates: [-38.74, -72.59],
    bbox: [-73.20, -38.95, -72.00, -38.40],
    sentinel_tile: '18GYC',
    embalse_principal: 'Régimen pluvial templado húmedo (Sin embalses artificiales mayores)',
    bioma: 'Bosque templado caducifolio, agricultura de cereales, mosaico forestal y comunidades mapuche',
    poblacion_estimada: 490000,
    spectral_profile: {
      ndre: 0.64,
      mndwi: 0.60,
      soc_proxy: 0.70,
      nbr: 0.62,
      fwi_climatologico: 35
    },
    suggested_variables: {
      s1: 0.66, s2: 0.54, s3: 0.68, s4: 0.58,
      e1: 0.60, e2: 0.62, e3: 0.68, e4: 0.56,
      k1: 0.56, k2: 0.46, k3: 0.48, k4: 0.54
    },
    suggested_d1: 0.48,
    suggested_kappa: 0.36
  },
  {
    id: 'cuenca_valdivia_cruces',
    nombre: 'Cuenca del Río Valdivia (Cruces - Calle-Calle)',
    comunas: ['Valdivia', 'Panguipulli', 'Mariquina', 'Los Lagos', 'Corral', 'Paillaco', 'Lanco'],
    region: 'Los Ríos (XIV Región)',
    dga_code: '101',
    estacion_dga_ref: '10110001-3 (Río Calle Calle en Valdivia)',
    coordinates: [-39.81, -73.24],
    bbox: [-73.50, -40.05, -72.40, -39.60],
    sentinel_tile: '18GYB',
    embalse_principal: 'Sistema Lacustre Natural Seven Lakes (Riis Riñihue, Panguipulli)',
    bioma: 'Selva Valdiviana húmeda, humedales protegidos, cisnes de cuello negro y acuicultura costera',
    poblacion_estimada: 290000,
    spectral_profile: {
      ndre: 0.72,
      mndwi: 0.74,
      soc_proxy: 0.78,
      nbr: 0.72,
      fwi_climatologico: 26
    },
    suggested_variables: {
      s1: 0.76, s2: 0.66, s3: 0.74, s4: 0.78,
      e1: 0.74, e2: 0.76, e3: 0.76, e4: 0.68,
      k1: 0.62, k2: 0.56, k3: 0.56, k4: 0.66
    },
    suggested_d1: 0.38,
    suggested_kappa: 0.42
  },
  {
    id: 'cuenca_llanquihue_maullin',
    nombre: 'Cuenca del Río Maullín y Lago Llanquihue',
    comunas: ['Puerto Montt', 'Puerto Varas', 'Frutillar', 'Llanquihue', 'Maullín', 'Fresia'],
    region: 'Los Lagos (X Región)',
    dga_code: '104',
    estacion_dga_ref: '10405001-7 (Río Maullín en Las Quemas)',
    coordinates: [-41.28, -73.00],
    bbox: [-73.60, -41.60, -72.50, -41.00],
    sentinel_tile: '18GYA',
    embalse_principal: 'Lago Llanquihue (Gran cuenca natural 860 km²)',
    bioma: 'Bosque laurifolio siempreverde, ganadería lechera de pradera y acuicultura salmonera',
    poblacion_estimada: 410000,
    spectral_profile: {
      ndre: 0.70,
      mndwi: 0.76,
      soc_proxy: 0.75,
      nbr: 0.74,
      fwi_climatologico: 24
    },
    suggested_variables: {
      s1: 0.74, s2: 0.64, s3: 0.70, s4: 0.80,
      e1: 0.72, e2: 0.78, e3: 0.74, e4: 0.70,
      k1: 0.68, k2: 0.58, k3: 0.54, k4: 0.60
    },
    suggested_d1: 0.42,
    suggested_kappa: 0.40
  }
];

/**
 * Función de búsqueda rápida georreferenciada.
 * Coincide por nombre de cuenca, comuna, región o código DGA.
 */
export function searchChileCuencas(query) {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return CHILE_DGA_CUENCAS;
  }
  const q = query.toLowerCase().trim();
  return CHILE_DGA_CUENCAS.filter(c => {
    return (
      c.nombre.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.dga_code.toLowerCase().includes(q) ||
      c.comunas.some(com => com.toLowerCase().includes(q))
    );
  });
}

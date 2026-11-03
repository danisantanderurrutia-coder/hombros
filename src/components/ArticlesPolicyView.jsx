import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Scale, BookOpen, ExternalLink, CheckCircle2,
  AlertTriangle, Landmark, ArrowRight, ArrowLeft, Cpu,
  Clock, Calendar, User, Printer, Tag, Share2, Sparkles, Compass
} from 'lucide-react';
import { InlineMath, BlockMath } from './KaTeXMath';
import { getAssetUrl } from '../utils/assets';

const THINK_TANK_ARTICLES = [
  {
    id: 'reforma-seia-2',
    category: 'Reforma Legislativa',
    folio: 'PROPUESTA LEGISLATIVA INSIGNIA · LEY 19.300 → SEIA 2.0',
    date: 'Noviembre 2026',
    readTime: '14 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Investigador Principal · Geofísico (U. de Chile) & Dual M.Sc. (CAU Kiel / AMU Poznań)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cuenca hidrográfica andina bajo estrés hídrico: la unidad mínima e indivisible del nuevo Ensayo de Tracción Ambiental (Fotografía: Unsplash).',
    title: 'Propuesta de Reforma Estructural al SEIA: De la Ventanilla de Permisos al Ensayo de Tracción Biofísica de Cuenca y la Cláusula de Salvaguarda Pre-Inversional',
    subtitle: 'Por qué el Sistema de Evaluación de Impacto Ambiental fracasa al evaluar proyectos en un vacío histórico y cómo la mecánica de medios continuos permite blindar jurídicamente los soportes vitales del territorio.',
    excerpt: 'El SEIA chileno (Ley 19.300) padece tres fallas de diseño de origen neoclásico: ceguera ante la deuda histórica acumulada, fraccionamiento espacial predial y mercantilización de indulgencias mediante compensaciones asimétricas. Formulamos una reforma de cuatro artículos basada en el tensor de esfuerzo de Cauchy y el principio de inconmensurabilidad de Liebig.',
    tags: ['Reforma al SEIA', 'Cláusula Pre-Inversional', 'Ley 19.300', 'Mecánica de Cuencas', 'Ley de Liebig'],
    hombrosVariables: ['σ₀ (Esfuerzo Basal)', 'σ_proj (Tracción Proyecto)', 'Φ_crit (Corte de Liebig)', 'H (Sección Portante)'],
    leadQuote: '«Un sistema de evaluación ambiental que solo pregunta cuánto daño marginal agregará un proyecto nuevo hacia el futuro, sin medir si la cuenca ya fue vaciada en las décadas previas, no administra justicia ecológica: administra la eutanasia gradual del territorio.»',
    sections: [
      {
        heading: '1. Diagnóstico Crítico: La Anatomía del Fracaso del SEIA 1.0',
        paragraphs: [
          'Desde la promulgación de la Ley N° 19.300 sobre Bases Generales del Medio Ambiente en 1994, el Sistema de Evaluación de Impacto Ambiental (SEIA) chileno ha operado bajo las premisas epistemológicas de la economía ambiental neoclásica de los años noventa. Pese a reformas procedimentales sucesivas, la arquitectura sustantiva del sistema conserva una contradicción insalvable: fue concebido como una ventanilla administrativa para viabilizar proyectos de inversión mediante mitigaciones puntuales, y no como un sistema cibernético de resguardo de la capacidad portante de las cuencas hidrográficas.',
          'Esta falla estructural se manifiesta en tres patologías recurrentes que explican la proliferación de Zonas de Sacrificio (como Quintero-Puchuncaví, Coronel o Huasco) y el agotamiento hídrico severo en las cuencas centro-sur del Maule, Biobío y Valparaíso. La primera patología es la Ceguera ante la Deuda Metabólica Histórica: cuando una empresa ingresa un Estudio o Declaración de Impacto Ambiental (EIA/DIA), el sistema evalúa únicamente el diferencial marginal de impacto futuro (ΔP), tratando la degradación previa acumulada durante décadas como una "línea base" naturalizada e incuestionable.',
          'La segunda patología es el Fraccionamiento Espacial y Predial. Al evaluar polígonos propietarios aislados en lugar de la sección transversal continua de la cuenca hidrográfica y atmosférica, el SEIA aprueba decenas de plantaciones forestales, baterías de pozos profundos o loteos inmobiliarios que, examinados uno por uno, parecen situarse bajo los umbrales de latencia, pero cuya suma vectorial fractura irreversiblemente el acuífero.',
          'La tercera patología es el Comercio de Indulgencias Ambientales fundado en el supuesto de sustituibilidad perfecta de Robert Solow. En la práctica cotidiana del SEIA, la destrucción de un humedal ribereño, la desecación de una vega altoandina o la pérdida de suelo agrícola clase I y II (activos pertenecientes al Hombro Ambiental E) se "compensan" financiando rotondas viales, sedes comunitarias, becas municipales o reforestaciones monoclonales en provincias distantes (transferencias en el Hombro Económico K). Físicamente, sin embargo, ningún flujo monetario hidrata una raíz ni repone la microbiota edáfica extinguida.'
        ]
      },
      {
        heading: '2. El Giro Copernicano: La Cuenca como Sólido Deformable y la Cláusula Pre-Inversional',
        paragraphs: [
          'El marco teórico y matemático de HOMBROS propone reemplazar la contabilidad aditiva del SEIA 1.0 por la Mecánica de Medios Continuos aplicada a sistemas socioecológicos. En lugar de concebir el territorio como un depósito pasivo de recursos, lo modelamos como un cuerpo estructural dotado de una sección transversal resistente H —integrada geométricamente por el Hombro Social (S), el Hombro Ambiental (E) y el Hombro Económico Regenerativo (K)— sometido a una carga de tracción antrópica y climática P.',
          'De esta formulación emerge la principal innovación jurídica de nuestra propuesta: la Cláusula de Salvaguarda Pre-Inversional. A diferencia de la evaluación convencional ex-ante que parte desde cero en cada expediente, la cláusula pre-inversional obliga a medir primero el estado de tensión basal acumulada (σ₀) en que se encuentra la cuenca receptora producto de su historia extractiva. Si la cuenca ya ha superado su límite de fluencia elástica y se encuentra en régimen de deformación plástica (σ₀ ≥ 1.00) o presenta micro-fractura de Liebig en cualquiera de sus soportes vitales (Hᵢ < 0.25), el territorio carece de holgura física para absorber nueva carga.',
          'En tales circunstancias, la admisibilidad de cualquier proyecto nuevo queda condicionada por ley a una inversión previa o simultánea de restitución sintrópica que regenere la sección portante H hasta devolver el esfuerzo total de la cuenca por debajo del umbral de seguridad elástica (σ < 0.85). El pasivo ambiental histórico deja así de ser una externalidad impaga soportada por las comunidades locales y se convierte en una condición suspensiva exigible antes de autorizar cualquier nuevo flujo extractivo.'
        ],
        equation: '\\sigma_0 = \\frac{P_{\\text{hist}}}{H_0 \\cdot (1 + \\kappa)} \\ge 1.00 \\;\\lor\\; \\min(S, E, K) < 0.25 \\implies \\text{MORATORIA PRE-INVERSIONAL VINCULANTE}'
      },
      {
        heading: '3. Articulado Propuesto para la Reforma a la Ley N° 19.300 (Protocolo SEIA 2.0)',
        paragraphs: [
          'Para traducir estos principios biofísicos en derecho positivo operativo, proponemos incorporar cuatro artículos estructurales en el Título II de la Ley N° 19.300 y en el Reglamento del SEIA (DS N° 40):',
          '• ARTÍCULO 1° (Cláusula de Salvaguarda Pre-Inversional por Deuda Histórica): Ningún Estudio o Declaración de Impacto Ambiental (EIA/DIA) de carácter extractivo, industrial, energético, forestal o inmobiliario intensivo podrá ser admitido a calificación si la cuenca hidrográfica receptora registra un Esfuerzo Basal Acumulado σ₀ ≥ 1.00 o si cualquiera de sus tres hombros vitales se sitúa bajo el umbral crítico de Liebig (Hᵢ < 0.25). En dichas cuencas solo se admitirán proyectos cuyo balance neto sea sintrópico (ΔH > 0 y Δσ < 0) hasta restituir el margen elástico.',
          '• ARTÍCULO 2° (Ensayo Obligatorio de Tracción Acumulada de Cuenca): La unidad territorial obligatoria e indivisible de evaluación ambiental será la Cuenca Hidrográfica y Atmosférica delimitada por la Dirección General de Aguas (DGA) y el Ministerio del Medio Ambiente. Todo proyecto deberá someterse a un Ensayo de Tracción Mecánica Uniaxial que compute la tensión proyectada (σ_proj), sumando su vector de presión incremental (ΔD₁, ΔD₂, ΔD₃) y su desgaste ecosistémico (ΔE) a la carga total existente en la cuenca. Se rechazará de plano todo proyecto cuyo esfuerzo resultante supere el Límite de Fluencia (σ_proj > 0.85).',
          '• ARTÍCULO 3° (Principio de Inconmensurabilidad de Liebig y Prohibición de Indulgencias): Conságrase la no-sustituibilidad entre soportes vitales. Queda estrictamente prohibida toda medida de compensación inter-hombros: la pérdida o degradación proyectada sobre el Hombro Ambiental (E: caudales ecológicos, humedales, carbono orgánico edáfico, bosque nativo) o sobre el Hombro Social (S: sistemas de Agua Potable Rural APR, cohesión comunitaria) jamás podrá compensarse mediante transferencias monetarias, obras civiles grises o bonos financieros (K). Toda compensación deberá ser biofísicamente isomórfica, ejecutada en la misma subcuenca y verificada empíricamente antes del inicio de la fase de operación.',
          '• ARTÍCULO 4° (Sistema Público de Telemetría Continua STAC/COG y Auditoría Scope 3): Sustitúyense las líneas base estáticas elaboradas por consultoras privadas del titular por un Sistema Nacional de Telemetría Biofísica Continua y Abierta. Dicho sistema integrará reflectancia satelital multiespectral Sentinel-2 L2A (protocolo STAC/COG para índices NDVI, NDRE, NDMI, MNDWI, NBR y BSI/SOC), balances hidro-edáficos FAO-56 y estaciones DGA/SINCA en tiempo real, otorgando acceso directo y facultad de activación de alerta temprana vinculante a los Municipios y Comités APR.'
        ],
        equation: '\\sigma_{\\text{proj}} = \\frac{D_0 + \\Delta D_{\\text{proy}}}{\\left[ S_0 \\cdot (E_0 + \\Delta E_{\\text{proy}}) \\cdot K_0 \\right]^{1/3} \\cdot \\Phi_{\\text{crit}} \\cdot (1 + \\kappa)} < 0.85 \\quad \\land \\quad \\left( \\Delta E < 0 \\;\\not\\!\\!\\implies \\Delta K > 0 \\right)'
      },
      {
        heading: '4. Impacto Institucional y Viabilidad de Implementación',
        paragraphs: [
          'Lejos de paralizar la inversión productiva sana, el estándar SEIA 2.0 genera certeza jurídica objetiva y reorienta los flujos de capital hacia la regeneración territorial. En una cuenca con holgura elástica (σ₀ < 0.65), los proyectos de escala humana, agroecológicos o industriales limpios obtienen aprobación expedita al demostrarse matemáticamente su absorción elástica.',
          'Por el contrario, en cuencas exhaustas por décadas de monocultivo o contaminación termoeléctrica, la reforma crea un incentivo económico poderoso: para poder operar o expandir capacidades en la región, los grandes titulares deben primero co-financiar la restauración de la sección transversal H (recarga de acuíferos, reconversión de cortafuegos agroforestales, modernización de redes APR), transformando la evaluación ambiental en el motor principal de capitalización biofísica del país.'
        ]
      }
    ],
    policyRecommendations: [
      'Incorporar mediante proyecto de ley la Cláusula de Salvaguarda Pre-Inversional en el artículo 11 y artículo 16 de la Ley N° 19.300, vinculando la admisibilidad a la tensión acumulada de cuenca (σ₀ < 1.00).',
      'Modificar el Reglamento del SEIA (DS N° 40) para prohibir expresamente las compensaciones asimétricas inter-hombros (Dinero K por Agua/Suelo E), exigiendo equivalencia biofísica in-situ.',
      'Habilitar el acoplamiento tecnológico entre el Servicio de Evaluación Ambiental (SEA), la DGA y plataformas abiertas de gemelos digitales satelitales (arquitectura AgriTwin Sentinel-2 STAC/COG) para fiscalización continua Tier 3.'
    ],
    citations: 'Ley N° 19.300 sobre Bases Generales del Medio Ambiente; Georgescu-Roegen, N. (1971). The Entropy Law and the Economic Process; Liebig, J. von (1840). Die organische Chemie in ihrer Anwendung auf Agricultur und Physiologie; Ostrom, E. (1990). Governing the Commons; Santander, D. (2026). Propuesta Doctoral HOMBROS: Mecánica de Medios Continuos y Salvaguarda Pre-Inversional.'
  },
  {
    id: 'olca-policy-1',
    category: 'Serie OLCA · Policy',
    folio: 'POLICY ARTICLE N° 01 · MACROECONOMÍA BIOFÍSICA',
    olcaPart: 'Adaptado de «Ser libres al borde del abismo · Parte 1: El mundo se acerca a un colapso económico»',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111259',
    date: 'Agosto 2025 / Ed. Policy 2026',
    readTime: '12 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Autor Principal · Publicado originalmente en OLCA (Nota #111259)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'La ficción de la liquidez infinita frente al agotamiento físico de los stocks planetarios (Fotografía: Unsplash).',
    title: 'Más Allá de la Ilusión del PIB: Límites Planetarios, Deuda Soberana y Contabilidad de Activos Biofísicos ante el Estancamiento Global',
    subtitle: 'Por qué el endeudamiento público perpetuo y el maquillaje de los mercados de carbono no pueden refinanciar la depreciación termodinámica de la biosfera.',
    excerpt: 'Adaptación a lenguaje de política macroeconómica del primer ensayo de la tetralogía publicada en el OLCA. Examina la convergencia entre la crisis de deuda soberana global (>120% del PIB), el estancamiento secular y la transgresión de los límites planetarios, proponiendo reemplazar el PIB por el Balance de Solvencia Biofísica (H).',
    tags: ['Límites Planetarios', 'Deuda Soberana', 'Crítica al PIB', 'Falsas Soluciones', 'OLCA Parte 1'],
    hombrosVariables: ['K₄ (Balance Biótico)', 'E₂ (Agua Dulce)', 'E₃ (Suelo N/P/SOC)', 'D₁..D₃ (Presión Extractiva)'],
    leadQuote: '«Es necesario recordarle a los ministerios de hacienda que los pueblos no pueden alimentarse de bonos soberanos ni beber liquidez financiera: ningún incremento nominal del PIB puede compensar la extinción física del agua dulce y del suelo fértil.»',
    sections: [
      {
        heading: '1. El Elefante Rosa en la Habitación: Estancamiento Secular y Burbuja de Deuda Soberana',
        paragraphs: [
          'Como planteó el filósofo Slavoj Žižek, la hegemonía cultural contemporánea ha logrado que resulte más fácil imaginar el fin del mundo que el fin del modelo de acumulación vigente. Sin embargo, los indicadores macroeconómicos de la tercera década del siglo XXI revelan que el sistema global no enfrenta una simple fluctuación cíclica pasajera, sino una crisis estructural de solvencia. De acuerdo con los reportes de Naciones Unidas (UN, 2023), los aumentos marginales en el PIB per cápita en África, América Latina y el Caribe evidencian una tendencia de largo plazo hacia el estancamiento económico, fenómeno que ya se ha extendido a las principales locomotoras industriales del planeta: Estados Unidos, China, Japón, Alemania y la Eurozona (EFE, 2024).',
          'El síntoma más grave de este agotamiento es el crecimiento descontrolado de la deuda pública global (FMI, 2023; Reinhart & Rogoff, 2011). Desde el estallido de la burbuja inmobiliaria e hipotecaria subprime en 2008 —cuyo paquete de rescate TARP en Estados Unidos costó 700.000 millones de dólares (Shiller, 2012)—, los bancos centrales implementaron políticas prolongadas de tasas de interés cercanas a cero que incentivaron aún más el endeudamiento y la especulación financiera (Mishkin, 2011; Pettis, 2022). Hoy, la deuda federal estadounidense supera el 120% de su Producto Interno Bruto (CBO, 2024), sostenida mediante la emisión continua de nuevos bonos bajo la premisa fiduciaria de que mañana existirá un crecimiento material aún mayor capaz de refinanciar la burbuja (Candriam, 2024).',
          'Esta arquitectura financiera descansa sobre una falacia termodinámica monumental. Mientras los pasivos financieros crecen a interés compuesto exponencial, el mundo real que debe respaldarlos se contrae: aumenta la concentración global de la tierra agrícola (Land Coalition, 2020), crece la población sin vivienda (Development Aid, 2023) y la automatización robótica e inteligencia artificial erosionan la base salarial de las clases trabajadoras (Statista, 2023; FoxBusiness, 2024). Cuando la burbuja crediticia choca contra la escasez física de energía, agua y materiales, el ajuste recae invariablemente sobre los territorios periféricos.'
        ]
      },
      {
        heading: '2. El Abismo de la Tierra Invernadero (Hothouse Earth) y los Límites Planetarios',
        paragraphs: [
          'Mientras la ortodoxia económica debate tasas de descuento, los gases de efecto invernadero continúan acumulándose en la atmósfera a niveles récord (CarbonBrief, 2022). El Sexto Informe de Evaluación del IPCC (AR6, Lee et al., 2023) ha confirmado que superar la barrera de 1,5°C a 2,0°C respecto a la era preindustrial multiplicará la severidad y frecuencia de los eventos hidrometeorológicos extremos (Hoegh-Guldberg et al., 2019). Más allá de ese umbral se activan cascadas de puntos de inflexión no lineales (*tipping points*) que empujan al sistema planetario hacia una trayectoria irreversible denominada "The Hothouse Earth" (Steffen et al., 2018), acelerando la sexta extinción masiva de especies (Pievani, 2014; DellaSala et al., 2018; Mantyka-Pringle et al., 2015).',
          'Traducido a lenguaje presupuestario fiscal, el costo de la inacción climática es ya insostenible. Tan solo en el año 2023, las pérdidas económicas directas provocadas por inundaciones, megasequías, megaincendios y tormentas severas superaron en un 4% la media del siglo XXI (AON, 2023; Pareek, 2017), alcanzando una cifra equivalente al presupuesto necesario para construir y equipar 190 hospitales de máxima complejidad como el Hospital Universitario Karolinska de Estocolmo.',
          'Pero el cambio climático es apenas una dimensión de la transgresión generalizada de los nueve Límites Planetarios identificados por la ciencia del Sistema Tierra (Rockström et al., 2009; O\'Neill et al., 2018). La alteración del ciclo hidrológico de agua dulce y la disrupción de los flujos biogeoquímicos de nitrógeno y fósforo en los suelos producto de la agroindustria intensiva amenazan con desencadenar un colapso de corto plazo en los sistemas alimentarios globales (Jones & Steffen, 2019). Simultáneamente, la invasión urbana y extractiva sobre hábitats silvestres destruye las barreras ecológicas, creando el caldo de cultivo ideal para el salto zoonótico de nuevas pandemias (Bloom et al., 2021; Hassanin et al., 2021) cuyas repercusiones ya demostraron la fragilidad extrema de las cadenas de suministro neoliberales (Dieppe, 2021).'
        ]
      },
      {
        heading: '3. Sísifo es la Humanidad, la Montaña es el «Desarrollo Sostenible»',
        paragraphs: [
          'En este escenario, el dogma del crecimiento perpetuo del PIB opera exactamente como el mito de Sísifo: los gobiernos empujan la roca del extractivismo montaña arriba prometiendo que el país está "más cerca del desarrollo", solo para que las crisis socioambientales, los aluviones, la desertificación y la violencia territorial arrastren la piedra de vuelta al fondo. El consumo metropolitano actúa como un velo que oculta el metabolismo oculto: cuando se levanta un barrio residencial, el mercado celebra el aporte al PIB de la construcción, pero jamás contabiliza los áridos extraídos ilegalmente de los lechos fluviales ni la tala de bosques nativos que regulaban la cuenca.',
          'Como documentó Partha Dasgupta en su histórico informe para el Tesoro Británico (*The Economics of Biodiversity: The Dasgupta Review*, 2021), el crecimiento económico no puede ser infinito porque es un subsistema físicamente acotado por la tasa de regeneración de la biosfera. La definición clásica de "Desarrollo Sostenible" de la Comisión Brundtland (1987) nació muerta en la medida en que pretendió conciliar la satisfacción de las necesidades futuras con relaciones de producción ancladas en la depredación de stocks finitos: deforestación amazónica para monocultivos de soja (Amaral et al., 2021), vaciamiento biológico de los océanos (Dulvy et al., 2021; Sumaila et al., 2020) y desecación de salares altoandinos como Atacama para la extracción intensiva de litio (Liu et al., 2019; Sánchez-López, 2019).',
          'Frente a la evidencia científica, el establishment corporativo ha desplegado un arsenal de "falsas soluciones" basadas en el *greenwashing* (Kalesnik et al., 2020; Lashitew, 2021; Scanlan, 2017): bonos de carbono, compensaciones net-zero fraudulentas y taxonomías "ecofriendly" carentes de peso jurídico vinculante (Robin Wood, 2022). Con una extracción mundial de materiales que ya se ha triplicado en medio siglo y que proyecta aumentar otro 60% hacia 2060 (UNEP, 2024), la disyuntiva macroeconómica es binaria: o las economías planifican una transición biofísica y decrecimiento metabólico ordenado (Hanaček et al., 2020; Paterson, 2020), o sufrirán una implosión descontrolada por agotamiento de su sección estructural.'
        ],
        equation: 'H = \\left( S \\cdot E \\cdot K \\right)^{1/3} \\cdot \\Phi_{\\text{crit}} \\quad \\xrightarrow{\\;E_2, E_3 \\to 0\\;} \\quad H \\to 0 \\implies \\sigma = \\frac{P}{H \\cdot (1+\\kappa)} \\to \\infty \\; (\\text{Colapso Sistémico})'
      }
    ],
    policyRecommendations: [
      'Sustituir el PIB comunal y regional como indicador rector de asignación presupuestaria por el Índice de Solvencia Biofísica (H) y el Balance Sintrópico Neto (Γ − D).',
      'Exigir a los Ministerios de Hacienda y Bancos Centrales contabilizar la depreciación física de acuíferos (E₂) y carbono orgánico edáfico (E₃) como deuda soberana real en las Cuentas Nacionales (marco Dasgupta / SEEA-ONU).',
      'Suprimir todo subsidio público o crédito fiscal verde a industrias extractivas, monocultivos forestales y proyectos energéticos cuyo Balance Biótico (K₄) sea inferior al umbral de regeneración.'
    ],
    citations: 'Amaral et al. (2021); AON (2023); Bloom et al. (2021); Brundtland (1987); CarbonBrief (2022); CBO (2024); Dasgupta, P. (2021). The Economics of Biodiversity; DellaSala et al. (2018); Dulvy et al. (2021); Hanaček et al. (2020); Hoegh-Guldberg et al. (2019); IPCC AR6 (2023); Jones & Steffen (2019); Kalesnik et al. (2020); Lashitew (2021); Liu et al. (2019); O\'Neill et al. (2018); Pettis (2022); Reinhart & Rogoff (2011); Rockström et al. (2009); Shiller (2012); Steffen et al. (2018); UNEP (2024); Santander, D. (2025, OLCA #111259).'
  },
  {
    id: 'olca-policy-2',
    category: 'Serie OLCA · Policy',
    folio: 'POLICY ARTICLE N° 02 · REFORMA DEL ESTADO Y GOBERNANZA',
    olcaPart: 'Adaptado de «Ser libres al borde del abismo · Parte 2: Se hunde el Titanic: El colapso de los Estados y la agonía del Leviatán»',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111262',
    date: 'Agosto 2025 / Ed. Policy 2026',
    readTime: '13 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Autor Principal · Publicado originalmente en OLCA (Nota #111262)',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'La agonía del Leviatán frente a la tempestad biofísica: del colapso burocrático centralizado a la gobernanza polícéntrica en Red Panal (Fotografía: Unsplash).',
    title: 'Se Hunde el Titanic: Rendimientos Decrecientes de la Complejidad Estatal (Ley de Tainter), Autofagia del Leviatán y Gobernanza Polícéntrica de Cuencas',
    subtitle: 'Por qué ni el desmantelamiento ultraliberal del Estado ni el neo-extractivismo estatal-progresista pueden salvar el Contrato Social cuando se fractura la base material del territorio.',
    excerpt: 'Adaptación en clave de teoría del Estado y gobernanza territorial de la segunda entrega publicada en el OLCA. Analiza la erosión del Contrato Social (Hobbes, Locke, Rousseau), la autofagia estatal ultraliberal frente al neo-extractivismo multipolar y la Ley de Joseph Tainter, proponiendo una arquitectura polícéntrica de cuencas.',
    tags: ['Ley de Tainter', 'Contrato Social', 'Gobernanza Polícéntrica', 'Crítica Mercados de Carbono', 'OLCA Parte 2'],
    hombrosVariables: ['κ (Amortiguación Gobernanza)', 'S₂ (Capacidad Institucional)', 'K₂ (Autonomía Comunal)', 'Red Panal'],
    leadQuote: '«Mientras el Titanic de la economía extractiva se hunde, la agonía del Leviatán expone a los territorios rurales a la ley del sálvese quien pueda: ni las motosierras ultraliberales ni los progresismos extractivistas ofrecen botes salvavidas para las cuencas.»',
    sections: [
      {
        heading: '1. El Hundimiento del Titanic y la Fractura del Contrato Social Moderno',
        paragraphs: [
          'En la célebre secuencia del naufragio del Titanic, el choque contra el iceberg de la realidad física desata el caos bajo la cubierta de opulencia: mientras las élites aseguran su lugar en los botes salvavidas, los pasajeros de tercera clase quedan atrapados o luchan en el agua helada bajo la ley del "sálvese quien pueda". Esta imagen describe con precisión clínica la transición desde el colapso económico (analizado en el Artículo N° 01) hacia el colapso político de los Estados contemporáneos.',
          'La teoría política moderna fundó el orden civil sobre el Contrato Social: para superar el estado de naturaleza y "la guerra de todos contra todos" (Maquiavelo, 1513; Hobbes, 1651), la ciudadanía transfiere su soberanía a las instituciones mediante el "consentimiento de los gobernados" (Locke, 1689) y la "voluntad general" (Rousseau, 1762), dando vida a lo que Thomas Hobbes bautizó como el Leviatán: el Estado. El mandato constitutivo de este ente es administrar la producción, distribución y resguardo de los recursos para garantizar la vida, la coexistencia y las necesidades materiales básicas de la población (Nester, 2010).',
          'Sin embargo, en la fase actual de crisis multidimensional permanente (Žižek, 2011; Yeros & Jha, 2020), el agotamiento de los suelos, la escasez de agua dulce y el encarecimiento energético están llevando a la bancarrota material a los sistemas de protección social. Cuando los ciudadanos de comunas rurales observan que el Estado garantiza el caudal de las agroexportadoras y forestales mientras sus escuelas y Comités APR dependen de camiones aljibe, el Leviatán pierde su razón de ser. Al priorizar los intereses de las corporaciones transnacionales sobre la supervivencia territorial (Mikler, 2018; González, 2000), el Contrato Social se rompe desde adentro.'
        ]
      },
      {
        heading: '2. Autofagia Ultraliberal vs. Neo-Extractivismo Multipolar: Dos Caras del Mismo Naufragio',
        paragraphs: [
          'Lo que hoy presenciamos a escala global es la agonía del Leviatán expresada como un proceso de Autofagia Estatal. Casi medio siglo después del primer ciclo de shock neoliberal impuesto por los "Chicago Boys" en Chile (Letelier, 1976), emerge una segunda ola de ultraliberalismo extremo —simbolizada por las "motosierras" desreguladoras en Argentina (Oxford Analytica, 2023) o los programas de desmantelamiento administrativo en Estados Unidos— que busca inducir la muerte celular del Estado de Bienestar. Pero este desguace no devuelve el poder a las comunidades: traslada la soberanía económica y coercitiva hacia corporaciones globales blindadas por tribunales arbitrales privados e incluso hacia ejércitos mercenarios semiprivados utilizados para disputar recursos estratégicos evadiendo el derecho internacional (Marten, 2019; Sukhankin, 2019).',
          'En la vereda opuesta, las llamadas alternativas geopolíticas hegemónicas tampoco ofrecen una salida real al colapso biofísico. El ascenso de un orden multipolar liderado por el bloque BRICS y China (Stuenkel, 2020; Sahakyan, 2023; Amin, 2006), así como los ciclos neo-progresistas o neo-desarrollistas sudamericanos (Katz, 2016), han demostrado ser igualmente voraces en la reprimarización de las economías y el avasallamiento de territorios indígenas y campesinos (Svampa, 2019; Kothari et al., 2019; Woodley, 2015). Tanto el bloque OTAN como el bloque euroasiático alimentan carreras industriales y conflictos bélicos de desgaste (Cordesman, 2022) que aceleran la extracción de minerales críticos en el Sur Global.',
          'Peor aún, esta descomposición estatal viene acompañada de una arquitectura climática multilateral vaciada de contenido transformador: mercados de carbono que otorgan créditos a industrias que queman y sustituyen bosques nativos (Pearse & Böhm, 2014), "extractivismo verde" y financiarización de reservas naturales en el Sur Global (Bruna, 2022), proyectos de mitigación que no mitigan (Snooks, 2019) y una captura corporativa de los Objetivos de Desarrollo Sostenible (The Africa Report, 2023).'
        ]
      },
      {
        heading: '3. La Ley de Joseph Tainter y la Solución Cibernética de HOMBROS (El Factor κ)',
        paragraphs: [
          'Más allá de las disputas ideológicas, la antropología e historia de los sistemas complejos ofrece una explicación formal contundente sobre por qué fracasan los Estados hiper-centralizados. En su obra clásica *The Collapse of Complex Societies* (1988), Joseph Tainter demostró que las civilizaciones complejas invierten recursos crecientes en expandir sus aparatos burocráticos, regulatorios y paliativos para resolver crisis, hasta alcanzar un punto de inflexión donde la inversión en complejidad socio-administrativa produce rendimientos marginales decrecientes e incluso negativos.',
          'En el modelo matemático de HOMBROS, la Ley de Tainter gobierna directamente el parámetro de amortiguación institucional y gobernanza (κ). Cuando un ministerio central pretende gestionar la sequía de cien cuencas distintas mediante decretos de emergencia, subsidios burocráticos y flotas de camiones aljibe, el costo administrativo se dispara mientras la efectividad real en terreno se desploma (κ → 0). Al anularse κ en el denominador de la ecuación constitutiva σ = P / [H · (1 + κ)], toda la presión extractiva y climática P golpea de lleno y sin amortiguador sobre los hombros físicos del territorio.',
          'Por el contrario, cuando se descentraliza el poder hacia una Gobernanza Polícéntrica de Cuenca (Ostrom, 1990) articulada en una Red Panal de comunas y organizaciones de base, la complejidad burocrática inútil se reemplaza por inteligencia territorial distribuida: los costos de transacción caen, el monitoreo se vuelve inmediato y el coeficiente κ se maximiza, reduciendo drásticamente el esfuerzo mecánico soportado por la cuenca.'
        ],
        equation: '\\lim_{\\text{Burocracia Central} \\to \\infty} \\frac{\\partial \\kappa}{\\partial \\text{Gasto Fiscal}} < 0 \\; (\\text{Ley de Tainter}) \\quad \\Longrightarrow \\quad \\text{Solución: Polícentrismo en Red Panal } (\\kappa \\uparrow \\implies \\sigma \\downarrow)'
      }
    ],
    policyRecommendations: [
      'Crear por ley los Consejos Polícéntricos de Cuenca Hidrográfica con participación vinculante y mayoritaria de Comités de Agua Potable Rural (APR), comunidades indígenas, pequeños productores agroecológicos y gobiernos municipales.',
      'Auditar bajo la Ley de Tainter el gasto público ambiental y de emergencia hídrica, redirigiendo los presupuestos paliativos crónicos (camiones aljibe) hacia inversión directa en infraestructura natural comunal (H).',
      'Instituir los Pactos de Mutualismo Territorial en Red Panal: mecanismos inter-municipales mediante los cuales las cuencas en superávit sintrópico asisten hídrica, alimentaria y energéticamente a las comunas adyacentes que entren en zona de fluencia (σ > 0.85).'
    ],
    citations: 'Amin, S. (2006); Borràs Arumí, J. (2024); Bruna, N. (2022). Green extractivism and financialisation; Cordesman, A. (2022); González, C. G. (2000); Hobbes, T. (1651). Leviathan; Katz, C. (2016); Kothari, A., Salleh, A., Escobar, A., Demaria, F., & Acosta, A. (2019). Pluriverse; Letelier, O. (1976); Locke, J. (1689); Maquiavelo, N. (1513); Marten, K. (2019); Mikler, J. (2018); Nester, W. (2010); Pearse, R., & Böhm, S. (2014); Rousseau, J. J. (1762); Sahakyan, M. (2023); Snooks, G. D. (2019); Svampa, M. (2019); Tainter, J. A. (1988). The Collapse of Complex Societies; Yeros, P., & Jha, P. (2020); Žižek, S. (2011); Santander, D. (2025, OLCA #111262).'
  },
  {
    id: 'olca-policy-3',
    category: 'Serie OLCA · Policy',
    folio: 'POLICY ARTICLE N° 03 · COHESIÓN SOCIAL, CUIDADOS Y SALUD PÚBLICA',
    olcaPart: 'Adaptado de «Ser libres al borde del abismo · Parte 3: Cariño, ¿qué nos pasó? La domesticación del ser humano y la crisis moderna»',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111268',
    date: 'Agosto 2025 / Ed. Policy 2026',
    readTime: '15 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Autor Principal · Publicado originalmente en OLCA (Nota #111268)',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Reconstruir el vínculo comunitario, intergeneracional y espiritual con el territorio frente a la alienación moderna (Fotografía: Unsplash).',
    title: 'La Domesticación Moderna y el Prometeo Cansado: Salud Mental Colectiva, Economía del Cuidado y Reconstrucción del Tejido Comunitario (Hombro S)',
    subtitle: 'Desde los cercamientos históricos de los bienes comunes hasta la epidemia contemporánea de depresión y burnout: por qué es imposible restaurar una cuenca sin sanar la fractura psicosocial y valorizar el trabajo reproductivo.',
    excerpt: 'Adaptación a políticas sociales, de género, educación y salud mental del tercer ensayo publicado en el OLCA. Articula las tesis de Silvia Federici, Friedrich Engels, Erich Fromm, Georg Lukács y Byung-Chul Han con el Hombro Social (S) del modelo HOMBROS.',
    tags: ['Economía del Cuidado', 'Salud Mental Territorial', 'Bienes Comunes', 'Hombro Social (S)', 'OLCA Parte 3'],
    hombrosVariables: ['S₁ (Cohesión Comunitaria)', 'S₃ (Saberes & Educación)', 'S₄ (Paz Territorial)', 'K₃ (Equidad)'],
    leadQuote: '«En la sociedad del cansancio ya no hace falta un capataz externo: el individuo domesticado se convierte en su propio amo y esclavo bajo el eslogan del "¡Tú sí puedes!", mientras la destrucción de la comunidad y del paisaje desata una epidemia silenciosa de soledad, depresión y violencia.»',
    sections: [
      {
        heading: '1. La Metáfora de Colmillo Blanco: Auto-Domesticación, Propiedad y Cercamiento de los Comunes',
        paragraphs: [
          'En su novela *Colmillo Blanco* (1906), Jack London narra el tránsito de un lobo salvaje que, empujado por el hambre y separado de su camada, termina sometido al dominio de la aldea humana. La literatura de London dialoga de manera sorprendente con la antropología evolutiva y la ecología política: a lo largo de su historia, el ser humano experimentó un proceso de auto-domesticación impulsado inicialmente por la necesidad de cooperación y propiedad común de los recursos (Wilkins et al., 2014; Leach, 2003; Lee, 1990), pero que con la sedentarización agrícola acumulativa (Mancuso, 2017; Smith, 1997) derivó en regímenes sucesivos de estratificación, propiedad privada excluyente y dominación (Engels, 1884; Lenin, 1917).',
          'Un hito determinante para comprender la vulnerabilidad actual del Hombro Social (S) en nuestros territorios ocurrió durante la transición del feudalismo al capitalismo entre los siglos XV y XVII: los cercamientos de las tierras comunales (*enclosures*) y su correlato político, la cacería de brujas magistralmente documentada por Silvia Federici en *Calibán y la bruja* (2004). Para privatizar los bosques, pastizales y aguas que garantizaban la subsistencia colectiva del campesinado, el naciente Estado moderno necesitó destruir las redes de solidaridad comunal, atacando sistemáticamente a las mujeres —y en particular a las ancianas custodias de los saberes medicinales, reproductivos y ecológicos de la aldea—.',
          'Como analizaron Friedrich Engels (1884) y Simone de Beauvoir (1949), esta fractura confinó a las mujeres a la esfera privada para garantizar la transmisión patrimonial y la reproducción gratuita de la fuerza de trabajo (Sayers et al., 2012; Luna, 2022). El trabajo doméstico y de cuidados —cuidar la infancia, los enfermos, las semillas, el agua familiar y el tejido vecinal— fue literalmente "domesticado" y subvalorado como si no produjera valor económico (Martín Palomo, 2008), pese a constituir el cimiento biofísico y afectivo sin el cual ninguna economía puede funcionar ni un solo día.'
        ]
      },
      {
        heading: '2. La Caverna de la Razón Instrumental, el Fetiche de la Mercancía y el Desencantamiento',
        paragraphs: [
          'La segunda herida estructural sobre el Hombro Social es epistemológica y espiritual. En la tradición dialéctica (Hegel, 1807), el desarrollo de la libertad humana exige la unidad viva entre conciencia y mundo material. Sin embargo, como diagnosticó Max Weber en *La ética protestante y el espíritu del capitalismo* (1904), la modernidad industrial operó como un proceso de "desencantamiento del mundo": expulsó el misterio, la sacralidad de los ríos y montañas y el vínculo espiritual con la Madre Tierra, reduciendo toda la realidad a cálculo utilitario.',
          'Theodor Adorno y Max Horkheimer (*Dialéctica de la Ilustración*, 1944) advirtieron que esta razón pretendidamente iluminada devino en pura Razón Instrumental, una nueva caverna platónica donde la ciencia y la técnica se emplean para dominar tanto a la naturaleza como a otros seres humanos. En el proceso productivo alienado, las mercancías adquieren vida autónoma mientras las personas y los ecosistemas son cosificados: es el fetichismo de la mercancía (Marx, 1859, 1867) y la reificación de la conciencia analizada por Georg Lukács (2023), consolidados mediante la hegemonía cultural (Gramsci, 1929–1935) y la sociedad del espectáculo (Debord, 1967), donde las relaciones humanas genuinas son sustituidas por el consumo pasivo de imágenes y catálogos de identidad.',
          'Desde la psicología social crítica, Erich Fromm (*El miedo a la libertad*, 1941; *El arte de amar*, 1956; Ewen, 1993) demostró que el ser humano es constitutivamente un ser relacional y situado (*Being-in-the-World*, Heidegger, 1927, 1950; Horrigan-Kelly et al., 2016). Cuando se destruye la tribu comunitaria y se arrasa el paisaje nativo que daba identidad al territorio, el individuo experimenta una angustia e impotencia insoportables, atrofiándose su capacidad de amar y de responsabilizarse por la vida colectiva.'
        ]
      },
      {
        heading: '3. El Prometeo Cansado (Byung-Chul Han) y el Corte de Liebig en el Hombro Social',
        paragraphs: [
          'En el siglo XXI, esta domesticación alcanza su fase más sutil y devastadora: lo que el filósofo Byung-Chul Han (*La sociedad del cansancio*, 2010) denomina el "Prometeo Cansado". La sociedad disciplinaria tradicional de prohibiciones y capataces externos ha sido reemplazada por la sociedad del rendimiento y del exceso de positividad. Bajo el imperativo neoliberal del "¡Tú sí puedes!", el trabajador y el joven precarizado se convierten simultáneamente en su propio amo y su propio esclavo, autoexplotándose hasta el colapso nervioso.',
          'El bombardeo incesante de estímulos digitales, hiperconsumo y exigencia de rendimiento destruye lo que Walter Benjamin (1919) llamó "el pájaro de sueño que incuba el huevo de la experiencia": la quietud contemplativa necesaria para el pensamiento profundo, el arte y la vida en comunidad. El resultado epidemiológico está a la vista en las estadísticas sanitarias de Chile, América Latina y Europa: una explosión de depresión, ansiedad, síndrome de burnout y suicidios. En los barrios periféricos y zonas rurales despojadas de futuro, la falsa promesa del éxito mercantil individual (Si fracasas en salir de la pobreza, la culpa es solo tuya) empuja a miles de jóvenes hacia el abismo de la violencia, el narcotráfico y el consumo ostentoso como única vía de validación.',
          'En la arquitectura matemática de HOMBROS, esta crisis psicosocial no es un fenómeno "blando" o secundario: impacta directamente en las variables S₁ (Cohesión Comunitaria), S₃ (Saberes y Educación Crítica) y S₄ (Ausencia de Violencia Estructural). Debido al operador de discontinuidad de Liebig (Φ_crit), un territorio que permita la destrucción de su tejido comunitario y de cuidados (S < 0.25) sufrirá el colapso de su capacidad portante H aunque exhiba cifras macroeconómicas (K) aparentemente exitosas.'
        ],
        equation: 'S = w_1 S_1(\\text{Cohesión y Cuidados}) + w_2 S_2 + w_3 S_3 + w_4 S_4(\\text{Paz}) < 0.25 \\implies \\Phi_{\\text{crit}} = 0.25 \\; (\\text{Fractura Social de Cuenca})'
      }
    ],
    policyRecommendations: [
      'Reconocer y remunerar públicamente la Infraestructura Comunitaria de Cuidados: integrar a las cuidadoras comunitarias, custodias de semillas y dirigentas de Comités APR en los presupuestos de inversión basal del Estado (elevando directamente S₁ y K₃).',
      'Desplegar Programas de Salud Mental Territorial y Refugios Biofílicos: crear redes comunales de huertos terapéuticos, bosques-escuela y espacios libres de hiper-estímulo mercantil para tratar la depresión, la soledad y el burnout desde la reconexión comunitaria con la naturaleza.',
      'Des-mercantilizar y transformar la Educación Rural y Técnica (pedagogía crítica de Paulo Freire, 2018): formar juventudes en agroecología, hidrología comunitaria, artes y oficios regenerativos en lugar de mano de obra precarizada y descartable.'
    ],
    citations: 'Adorno, T., & Horkheimer, M. (1944). Dialectic of Enlightenment; Benjamin, W. (1919/1996); Byung-Chul Han (2010). La sociedad del cansancio; De Beauvoir, S. (1949). El segundo sexo; Debord, G. (1967). La sociedad del espectáculo; Engels, F. (1884); Federici, S. (2004). Calibán y la bruja; Freire, P. (2018); Fromm, E. (1941, 1956); Gramsci, A. (1929–1935); Hegel, G. W. F. (1807); Heidegger, M. (1927, 1950); Leach, H. (2003); Lee, R. B. (1990); London, J. (1906). White Fang; Lukács, G. (2023); Mancuso, S. (2017); Marcuse, H. (1969); Martín Palomo, M. T. (2008); Marx, K. (1859, 1867); Weber, M. (1904); Wilkins et al. (2014); Santander, D. (2025, OLCA #111268).'
  },
  {
    id: 'olca-policy-4',
    category: 'Serie OLCA · Policy',
    folio: 'POLICY ARTICLE N° 04 · TRANSICIÓN AGROECOLÓGICA Y POST-EXTRACTIVISMO',
    olcaPart: 'Adaptado de «Ser libres al borde del abismo · Parte 4: La llamada de la selva: Autonomía y Ecología Regenerativa»',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111288',
    date: 'Agosto 2025 / Ed. Policy 2026',
    readTime: '15 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Autor Principal · Publicado originalmente en OLCA (Nota #111288)',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'De la entropía extractiva a la sintropía agroecológica: paisajes productivos que regeneran suelo, agua y autonomía comunal (Fotografía: Unsplash).',
    title: 'La Llamada de la Selva y el «Apague Seguro» del Extractivismo: Transición Agroecológica, Redes de Prosumidores y Bio-Civilización del Buen Vivir',
    subtitle: 'Cómo desactivar progresivamente la maquinaria extractiva sin colapsar el empleo familiar, construyendo refugios climáticos, nichos ecológicos de biomasa y circuitos cortos de autosustento.',
    excerpt: 'Adaptación programática de la cuarta entrega publicada en el OLCA. Formula la doctrina de la Administración Ecológica para el Apague Seguro del Extractivismo, integrando el Principio de Esperanza de Ernst Bloch, la bioeconomía de Manfred Max-Neef, la permacultura de Bill Mollison y los paradigmas indígenas del Küme Mongen / Sumak Kawsay.',
    tags: ['Apague Seguro del Extractivismo', 'Agroecología Sintrópica', 'Prosumidores', 'Küme Mongen / Buen Vivir', 'OLCA Parte 4'],
    hombrosVariables: ['Γ (Velocidad Sintrópica)', 'θ (Ángulo Metabólico)', 'ROI Biofísico', 'E₁..E₄ + K₁..K₄'],
    leadQuote: '«No se puede simplemente apagar el switch del capitalismo de la noche a la mañana. El extractivismo es un lobo viviendo en nuestro bosque: requerimos una administración ecológica para su apague seguro mientras encendemos, en paralelo, la economía regenerativa del Buen Vivir.»',
    sections: [
      {
        heading: '1. ElPrincipio de Esperanza, la Praxis Orgánica y la Autonomía sin Permiso',
        paragraphs: [
          'En *La llamada de la selva* (*The Call of the Wild*, 1903), Jack London relata la odisea de Buck, un perro doméstico arrastrado a la fiebre del oro del Yukón bajo la brutal "ley del garrote" que, tras sufrir el agotamiento extremo y perder el último vínculo afectivo que lo ataba a la codicia humana, escucha el llamado ancestral del bosque y retorna a la manada salvaje. Al borde del abismo civilizatorio, la humanidad enfrenta la misma encrucijada: ¿puede renacer nuestro instinto de supervivencia colectiva antes de caer al precipicio de la sexta extinción?',
          'Abandonar la inercia de la modernidad extractiva exige lo que el filósofo Ernst Bloch (*El principio de esperanza*, 1954; Méndez, 2017) definió como la función anticipatoria de la utopía concreta: sueños que no son evasiones ingenuas, sino organización rigurosa de la esperanza fundada en la praxis. En términos de Antonio Gramsci (1935, 1971), esta transición requiere intelectuales y técnicos orgánicos que integren la ciencia crítica con la acción transformadora en los territorios, desaprendiendo la educación bancaria (Freire, 2018) y cultivando una nueva sensibilidad ética y solidaria (Marcuse, 1969; Guevara, 1962, 1965).',
          'En todo el Sur Global, esta praxis ya germina bajo la forma de autonomías territoriales y gestión de los bienes comunes (Esteva, 2019; De Angelis, 2019; Gaudichaud, 2009; Santucho, 1974). Desde las asambleas comunitarias zapatistas ("No necesitamos pedir permiso para ser libres; queremos un mundo donde quepan muchos mundos", EZLN, 2016) hasta el Movimiento de los Trabajadores Rurales Sin Tierra (MST) en Brasil, el confederalismo democrático kurdo y las redes de ecoaldeas y custodios de semillas, emerge lo que Cândido Grzybowski (2019) denomina una Bio-Civilización o Civilización de la Vida, cimentada en la ética de la liberación desde la periferia (Dussel, 2013; Fanon, 1961).'
        ]
      },
      {
        heading: '2. Doctrina del «Apague Seguro» del Extractivismo y Encendido del Buen Vivir',
        paragraphs: [
          'Sin embargo, una propuesta de política pública seria debe abordar con absoluto realismo el dilema material de la transición: no es posible "apagar el switch" del extractivismo por decreto de un día para otro, porque millones de hogares y trabajadores dependen hoy de esa matriz para su sustento diario. La transición ocurre simultáneamente por dentro y por fuera del sistema hegemónico.',
          'Formulamos por ello el concepto de Administración Ecológica para el Apague Seguro del Extractivismo. Así como un reactor nuclear no puede desconectarse sin un protocolo de enfriamiento gradual, las industrias extractivas y monocultivos deben someterse a un cronograma vinculante de desescalada metabólica (reducción progresiva de la tasa D), obligando a que sus excedentes financieros e infraestructuras tecnológicas financien la construcción paralela del nuevo sistema de autosustento que habrá de desplazarlos.',
          'Mientras apagamos ordenadamente el extractivismo, encendemos el Buen Vivir: *Sumak Kawsay* (quechua), *Suma Qamaña* (aymara), *Küme Mongen* (mapudungun), *Mo Ora Riva Riva* (rapa nui), *Das Gute Leben* (Loncon, 2022; Acosta, 2012; Kothari et al., 2014). Esta convergencia articula dos rutas complementarias: en el Norte Global y las élites urbanas, el Decrecimiento del modo de vida imperial (Brand & Wissen, 2021; Kallis, 2011; Acosta & Brand, 2019); y en el Sur Global —históricamente sometido a la dependencia y superexplotación (Mariátegui, 1928/1971; Marini, 1977)—, el Post-Extractivismo (Gudynas, 2013; Svampa, 2012), que une la sabiduría ancestral indígena y campesina con el uso estratégico de la ciencia y las tecnologías limpias.'
        ]
      },
      {
        heading: '3. De la Entropía a la Sintropía: Prosumidores, Permacultura y ROI Biofísico',
        paragraphs: [
          'El habitar humano es un problema profundamente económico, pero no necesariamente monetario. En el lenguaje termodinámico de HOMBROS, la transición consiste en pasar de ciclos económicos regidos por la Entropía —desorden, quema de combustibles fósiles y pérdida irreversible de energía útil (Georgescu-Roegen, 1971)— hacia ciclos regidos por la Sintropía (Γ): la organización consciente de los agroecosistemas para concentrar energía, infiltrar agua, fijar carbono edáfico y multiplicar la biodiversidad (Max-Neef, 1986; Cruz et al., 2009; Götsch, 1994).',
          'Siguiendo los tres principios éticos de la cultura de lo permanente o Permacultura de Bill Mollison (1987, 1988) —(1) Cuidar la Tierra, (2) Cuidar a las Personas y (3) Repartir Justamente los Excedentes—, la ciudadanía deja de ser una masa de consumidores pasivos culpabilizados individualmente por la huella ecológica de las megacorporaciones y se organiza en redes colectivas de "Prosumidores": comunidades que consumen menos energía entrópica y producen colaborativamente sus alimentos, su agua limpia y su energía renovable (Stédile, 2023), articuladas mediante circuitos cortos de comercialización, cooperativas y economías diversas (Gibson-Graham, 2006; Jackson, 2017).',
          'Aquí radica un hallazgo económico crucial para los tomadores de decisión: a medida que se transparentan los pasivos ambientales y el costo fiscal astronómico de los megadesastres, las inversiones regenerativas se vuelven más rentables en el tiempo incluso bajo criterios financieros estrictos. Transformar monocultivos inflamables en Refugios Climáticos y Nichos Ecológicos Productivos de Biomasa y Trabajo (Santander, 2024) ahorra al Estado miles de millones de dólares en gasto paliativo crónico (camiones aljibe y combate de incendios), generando un Retorno sobre la Inversión Biofísica (ROI Sintrópico) positivo que libera recursos públicos y restaura la libertad material de los pueblos.'
        ],
        equation: '\\theta(t) = \\arctan\\left( \\Gamma_{\\text{sintrópico}}(t) - D_{\\text{extractivo}}(t) \\right) > 0 \\quad \\Longleftrightarrow \\quad \\text{Ruta de Apague Seguro } (D \\downarrow,\\; \\Gamma \\uparrow)'
      }
    ],
    policyRecommendations: [
      'Instituir Planes Comunales de «Apague Seguro y Reconversión Sintrópica»: cronogramas a 10 años que reduzcan progresivamente la superficie de monocultivo forestal en cabeceras de cuenca e interfaz WUI, reconvirtiéndola en mosaicos agroforestales sintrópicos, bosque nativo melífero/maderable y cosecha de aguas Keyline sin pérdida de empleo rural.',
      'Reforma Agraria e Hídrica Agroecológica: garantizar acceso preferente a tierra fiscal, derechos de agua para conservación/producción campesina y transferencia tecnológica (energía solar distribuida y telemetría abierta) a cooperativas de jóvenes y mujeres rurales.',
      'Ley de Circuitos Cortos y Prosumidores Públicos: establecer que al menos el 50% de las compras públicas de alimentos (JUNAEB, hospitales, casinos municipales) provenga de redes locales de prosumidores agroecológicos que certifiquen un ángulo metabólico sintrópico (θ > 0).'
    ],
    citations: 'Acosta, A. (2012); Acosta, A., & Brand, U. (2019); Allende, S. (1973); Bloch, E. (1954). El principio de esperanza; Brand, U., & Wissen, M. (2021); Cruz, I., Stahel, A., & Max-Neef, M. (2009); De Angelis, M. (2019); Dussel, E. (2013). Ética de la liberación; Esteva, G. (2019); EZLN (2016); Fanon, F. (1961); Freire, P. (2018); Gaudichaud, F. (2009); Gibson-Graham, J. K. (2006); Gramsci, A. (1935, 1971); Grzybowski, C. (2019); Gudynas, E. (2013); Guevara, E. (1962, 1965); Jackson, T. (2017); Kallis, G. (2011); Kothari et al. (2014, 2019); Loncon, E. (2022); London, J. (1903). The Call of the Wild; Marcuse, H. (1969); Mariátegui, J. C. (1928/1971); Marini, R. M. (1977); Max-Neef, M. (1986). Economía a escala humana; Mollison, B. (1987, 1988); Santander, D. (2024; 2025, OLCA #111288); Stédile, J. P. (2023); Svampa, M. (2012).'
  },
  {
    id: 'agritwin-hombros-arquitectura',
    category: 'Ecosistema AgriTwin',
    folio: 'DOCUMENTO DE ARQUITECTURA CIENTÍFICA · DESTINE × HOMBROS',
    date: 'Noviembre 2026',
    readTime: '11 min de lectura',
    author: 'Daniel Sebastián Santander Urrutia',
    authorRole: 'Arquitecto Principal · AgriTwin Master Suite (v4.2) & HOMBROS Lab',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Del sensor orbital Sentinel-2 L2A y la zona radicular FAO-56 al tensor constitutivo de cuenca (Fotografía: Unsplash).',
    title: 'Del Píxel Orbital al Dictamen Macro-Regional: Cómo el Gemelo Digital «AgriTwin» Alimenta la Mecánica Constitutiva de HOMBROS',
    subtitle: 'Integración multiescala entre la teledetección satelital abierta Sentinel-2 (STAC/COG), el balance hidro-edáfico FAO-56 en la Cuenca del Río Longaví y la validación empírica Tier 3 de los Tres Hombros.',
    excerpt: 'Análisis técnico de la convergencia entre nuestros dos proyectos insignia. Muestra cómo los motores headless de AgriTwin (stac-cog-client, soil-water-engine, basin-hydrology-engine y Cubo 4D) proveen la telemetría física en tiempo real que valida las hipótesis paramétricas de HOMBROS a costo marginal $0 USD.',
    tags: ['Gemelo Digital AgriTwin', 'Sentinel-2 STAC/COG', 'FAO-56 & Hidrología', 'Validación Tier 3', 'Destination Earth'],
    hombrosVariables: ['E₁ (NDRE/NDVI)', 'E₂ (Bullileo + FAO-56)', 'E₃ (BSI + SOC_proxy)', 'E₄ (NDMI + NBR WUI)'],
    leadQuote: '«El satélite público europeo provee el 80% de la línea base espacial continua de la cuenca a costo $0 USD; cuando acoplamos ese sistema nervioso sensorial (AgriTwin) con un motor de mecánica constitutiva y gobernanza (HOMBROS), nace una infraestructura soberana de decisión territorial.»',
    sections: [
      {
        heading: '1. Dos Hemisferios de una Misma Infraestructura Científico-Política',
        paragraphs: [
          'Uno de los mayores desafíos al postular proyectos de ecología política y economía biofísica a fondos de investigación competitivos es responder cómo se obtendrán los datos físicos de alta resolución sin depender de presupuestos prohibitivos de instrumentación propietaria. La articulación entre AgriTwin (Gemelo Digital Biofísico Multiescala inspirado en la iniciativa Destination Earth de la ESA/ECMWF, operativo en la Macro-Cuenca del Maule Sur / Río Longaví / Embalse Bullileo) y HOMBROS resuelve exactamente ese eslabón perdido.',
          'Mientras HOMBROS opera en la escala macro-institucional —formulando la ley constitutiva del esfuerzo territorial σ = P / [H · (1+κ)], el operador de discontinuidad de Liebig Φ_crit y los protocolos vinculantes del SEIA 2.0—, AgriTwin actúa como su sistema nervioso sensorial en las escalas micro (zona radicular 0–150 cm), meso (cuadrante predial y tranques Keyline) y macro-cuenca (122.070 hectáreas del sistema Bullileo–Longaví).',
          'En nuestra fase actual pre-fondo, HOMBROS trabaja con hipótesis paramétricas construidas sobre registros estadísticos Tier 1 y Tier 2. Al conectar los motores modulares de AgriTwin, las variables del Hombro Ambiental (E₁, E₂, E₃, E₄) y los indicadores de vulnerabilidad hidrosocial (S₁) pasan a alimentarse directamente de física radiométrica y ecuaciones diferenciales hidrológicas verificables.'
        ]
      },
      {
        heading: '2. Física de la Luz (Sentinel-2 L2A STAC/COG) Aplicada a las Variables E₁, E₃ y E₄',
        paragraphs: [
          'El motor `stac-cog-client.js` de AgriTwin reemplaza las cartografías estáticas tradicionales por consultas HTTP Range sobre Cloud-Optimized GeoTIFFs (COGs) del satélite Sentinel-2 MSI Level-2A (Reflectancia en el Fondo de la Atmósfera, BOA). A partir de sus 10 bandas ópticas activas (desde el Azul B02 a 490 nm hasta el SWIR 2 B12 a 2.190 nm), AgriTwin resuelve en cada pasada orbital de 5 días los insumos exactos que requiere el módulo `normalization.js` de HOMBROS:',
          '• Alimentación de E₁ (Integridad Ecosistémica y Dosel): En lugar de usar únicamente el NDVI clásico (que se satura cuando el índice de área foliar supera LAI > 3.0 en bosques densos o huertos adultos), AgriTwin incorpora la banda de Borde Rojo 1 (B05, 705 nm) para calcular el índice NDRE y el MCARI, midiendo con precisión la clorofila activa y la continuidad del corredor biológico esclerófilo.',
          '• Alimentación de E₃ (Calidad Edáfica y Carbono Orgánico SOC): Aprovechando la absorción de enlaces C-H, C-O y lignina en las bandas infrarrojas de onda corta SWIR 1 (B11) y SWIR 2 (B12), AgriTwin calcula el Bare Soil Index (BSI) y el proxy radiométrico de Carbono Orgánico Superficial (SOC_proxy), complementado con el pipeline en R conectado a ISRIC SoilGrids a 250 m.',
          '• Alimentación de E₄ y Vector Piro-Climático D₃: La banda B11 (1.610 nm) mide la absorción de agua líquida molecular dentro del tejido foliar a través del índice NDMI (Gao, 1996). Cuando NDMI cae bajo 0.20 en laderas de monocultivo de pino, AgriTwin detecta el estrés hídrico foliar entre 10 y 14 días antes de que el marchitamiento sea visible al ojo humano, acoplándolo con el índice de necromasa NBR (B08 vs B12) y la zonificación táctica de pavesas (CAL FIRE FHSZ / Austin WUI Ember Zone) bajo viento Puelche.'
        ],
        equation: '\\text{NDRE}_{\\text{AgriTwin}} = \\frac{\\rho_{\\text{B08}} - \\rho_{\\text{B05}}}{\\rho_{\\text{B08}} + \\rho_{\\text{B05}}} \\longrightarrow E_1 \\quad ; \\quad \\text{NDMI}_{\\text{AgriTwin}} = \\frac{\\rho_{\\text{B08}} - \\rho_{\\text{B11}}}{\\rho_{\\text{B08}} + \\rho_{\\text{B11}}} \\longrightarrow E_4'
      },
      {
        heading: '3. Acople Hidro-Edáfico (FAO-56 + Maillet-Boussinesq) y Gobernanza de Comités APR',
        paragraphs: [
          'Un principio epistemológico central de AgriTwin es reconocer honestamente "qué ve y qué no ve la física de la luz": un sensor óptico orbital a 786 km de altura no puede ver la humedad radicular a 60 cm de profundidad ni el flujo base subterráneo de un acuífero fracturado. Para resolver esas variables ocultas y alimentar rigurosamente la variable E₂ (Disponibilidad Hídrica de Cuenca) en HOMBROS, AgriTwin acopla dos motores matemáticos deterministas:',
          'En la micro-escala, `soil-water-engine.js` ejecuta el balance diario FAO-56 por estratos radiculares (0–10, 10–30, 30–60, 60–100 y 100–150 cm), calculando el Agua Total Disponible (TAW), el Agua Fácilmente Aprovechable (RAW), el factor de estrés transpirativo Ks y asimilando lecturas de sondas reales mediante un filtro Nudging/Kalman acoplado a la evapotranspiración Penman-Monteith en vivo (Open-Meteo API).',
          'En la macro-escala de cuenca, `basin-hydrology-engine.js` resuelve la ecuación diferencial de balance de masa del Embalse Bullileo (110 hm³ de capacidad nominal, alerta crítica en 35 hm³), la curva de recesión exponencial de Maillet-Boussinesq en el Río Longaví (estación DGA Quilaimo) y las reglas de prorrateo legal de caudales hacia los canales matrices y Tranques de Infiltración Keyline (18.500 m³). Todo este estado cuadridimensional se indexa en un Cubo de Datos 4D (`data-cube-engine.js`) que protege directamente la vulnerabilidad expuesta de los 5 Comités de Agua Potable Rural de la cuenca (Bullileo, Retiro Centro, Copihue, Romeral y Villaseca; 4.850 habitantes rurales), cerrando el ciclo perfecto entre el sensor biofísico y la justicia hídrica comunal.'
        ],
        equation: '\\frac{dV_{\\text{Bullileo}}}{dt} = Q_{\\text{in}} - Q_{\\text{out}} - E_{\\text{evap}} - S_{\\text{seep}} \\quad \\oplus \\quad D_{r,t} = D_{r,t-1} - (P_t - RO_t) - I_t + ET_{c,t} + DP_t \\longrightarrow E_2(t)'
      }
    ],
    policyRecommendations: [
      'Presentar la dupla «AgriTwin + HOMBROS» en las postulaciones a fondos de investigación como una Arquitectura Dual TRL-6/7: AgriTwin aporta el motor de captura y asimilación de datos (Tier 3) y HOMBROS aporta el modelo constitutivo y regulatorio.',
      'Escalar el piloto de la Cuenca del Río Longaví / Embalse Bullileo hacia las comunas costeras y de secano del Maule (Chanco, Cauquenes, Pelluhue) y zonas de sacrificio para validar en terreno las curvas de histéresis plástica.',
      'Entregar licencias públicas gratuitas del visor acoplado AgriTwin-HOMBROS a los Comités APR y direcciones ambientales municipales como herramienta soberana de negociación frente al SEIA.'
    ],
    citations: 'Allen, R. G., Pereira, L. S., Raes, D., & Smith, M. (1998). Crop evapotranspiration: FAO Irrigation and Drainage Paper 56; Bauer, P., et al. (2021). The digital revolution of Earth-system science (Destination Earth, Nature Computational Science); Castaldi et al. (2018); Daughtry et al. (2000); Gao, B. C. (1996). NDWI; Gitelson & Merzlyak (1994); Huete, A. R. (1988); Key & Benson (2006); Rouse et al. (1974); Xu, H. (2006); Santander, D. (2026). Doctrina y Arquitectura Digital Twin: AgriTwin & Destination Earth v4.2.0.'
  }
];

export default function ArticlesPolicyView({ onNavigateTab }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [openedArticleId, setOpenedArticleId] = useState(null);

  const categories = ['Todos', 'Reforma Legislativa', 'Serie OLCA · Policy', 'Ecosistema AgriTwin'];

  const filteredArticles = selectedCategory === 'Todos'
    ? THINK_TANK_ARTICLES
    : THINK_TANK_ARTICLES.filter(a => a.category === selectedCategory);

  const activeArticle = THINK_TANK_ARTICLES.find(a => a.id === openedArticleId) || null;

  const handleOpenArticle = (id) => {
    setOpenedArticleId(id);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setOpenedArticleId(null);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AnimatePresence mode="wait">
        {/* =================================================================== */}
        {/* MODO 1: VISOR DE CATÁLOGO DE BLOG / THINK TANK (MINIATURAS EN GRILLA)*/}
        {/* =================================================================== */}
        {!activeArticle && (
          <motion.div
            key="blog-grid-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Cabecera Editorial y Barra de Filtros del Blog */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border border-[#D4C9B8] shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#28475A] text-white">
                    Revista & Documentos de Trabajo · HOMBROS Think Tank
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C86D51] text-white">
                    6 Ensayos en Extenso Disponibles
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
                  Publicaciones, Reforma al SEIA & Ensayos de Ecología Política (OLCA)
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Selecciona cualquier artículo de nuestra colección para abrirlo en <strong>formato de lectura clásica en extenso</strong>: incluye nuestra propuesta legislativa de Reforma al SEIA, la tetralogía publicada en el <strong>OLCA</strong> adaptada a lenguaje <em>policy</em> y la arquitectura de acoplamiento con <strong>AgriTwin</strong>.
                </p>
              </div>

              {/* Filtro por Categoría Editorial */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selectedCategory === cat
                        ? 'bg-[#28475A] text-white border-[#28475A] shadow-md'
                        : 'bg-white text-slate-700 border-[#D4C9B8] hover:bg-[#EDE8DC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grilla Clásica de Blogs: Tarjetas Lado a Lado con Miniatura Unsplash */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => handleOpenArticle(article.id)}
                  className="group cursor-pointer rounded-3xl bg-[#FAF7F0] border border-[#D4C9B8] hover:border-[#487075] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Miniatura Fotográfica Unsplash */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = getAssetUrl('art/header_theory_library.jpg');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Badges Superiores sobre la Miniatura */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#28475A]/90 backdrop-blur-md text-white border border-white/20 shadow-sm">
                          {article.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-white/15 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Folio Inferior sobre la Miniatura */}
                      <div className="absolute bottom-3 left-3.5 right-3.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 drop-shadow">
                          {article.folio}
                        </span>
                      </div>
                    </div>

                    {/* Cuerpo de la Tarjeta de Blog */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                          {article.date}
                        </span>
                        <span className="text-[#487075] font-bold">Por D. Santander</span>
                      </div>

                      <h2 className="font-serif font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#28475A] transition-colors leading-snug line-clamp-3">
                        {article.title}
                      </h2>

                      <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Pie de Tarjeta: Tags + Botón Leer Artículo */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#E5DEC9] space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#EDE8DC] text-slate-700 border border-[#D4C9B8]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-serif font-bold text-[#C86D51] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                        Leer artículo en extenso
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      {article.olcaUrl && (
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-[#D4C9B8]">
                          Fuente OLCA
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* =================================================================== */}
        {/* MODO 2: LECTOR EDITORIAL EN LARGO (CLASSIC LONG-FORM ARTICLE VIEW)  */}
        {/* =================================================================== */}
        {activeArticle && (
          <motion.article
            key={activeArticle.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAF7F0] rounded-3xl border border-[#D4C9B8] shadow-2xl overflow-hidden text-slate-900"
          >
            {/* Barra Superior de Navegación del Lector */}
            <div className="sticky top-20 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#D4C9B8] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#28475A] hover:bg-[#1d3442] text-white text-xs font-mono font-bold shadow-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Catálogo de Artículos</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {activeArticle.olcaUrl && (
                  <a
                    href={activeArticle.olcaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C86D51] hover:bg-[#b55e43] text-white text-xs font-mono font-bold shadow-sm transition-all"
                  >
                    <span>Publicación Original en OLCA.cl</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('audit')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#487075] hover:bg-[#376E6F] text-white text-xs font-mono font-bold shadow-sm transition-all"
                  >
                    <span>Probar en Simulador SEIA 2.0</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EDE8DC] text-slate-800 border border-[#D4C9B8] text-xs font-mono font-bold transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Artículo</span>
                </button>
              </div>
            </div>

            {/* Cabecera Clásica de Revista / Think Tank */}
            <header className="max-w-4xl mx-auto px-6 sm:px-10 pt-10 pb-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#28475A] text-white">
                  {activeArticle.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#EDE8DC] text-[#487075] border border-[#D4C9B8]">
                  {activeArticle.folio}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight leading-[1.15]">
                {activeArticle.title}
              </h1>

              <p className="text-base sm:text-xl font-serif italic text-slate-700 leading-relaxed">
                {activeArticle.subtitle}
              </p>

              {/* Firma del Autor y Metadatos */}
              <div className="pt-4 border-t border-[#D4C9B8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#28475A] text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
                    DS
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm text-slate-900">
                      {activeArticle.author}
                    </div>
                    <div className="text-xs font-mono text-slate-600">
                      {activeArticle.authorRole}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#C86D51]" />
                    {activeArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#487075]" />
                    {activeArticle.readTime}
                  </span>
                </div>
              </div>
            </header>

            {/* Fotografía Principal de Portada (Unsplash Widescreen) */}
            <figure className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
              <div className="rounded-2xl overflow-hidden border border-[#D4C9B8] shadow-xl bg-slate-900">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full max-h-[480px] object-cover"
                  onError={(e) => {
                    e.target.src = getAssetUrl('art/header_theory_library.jpg');
                  }}
                />
              </div>
              <figcaption className="mt-2.5 text-center text-xs font-mono text-slate-500 italic">
                {activeArticle.imageCaption}
              </figcaption>
            </figure>

            {/* Cuerpo Editorial en Largo (Columna Clásica de Lectura + Barra Lateral de Acoplamiento) */}
            <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Columna Principal de Ensayo en Largo (8 columnas) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Cita Destacada de Apertura (Pull-Quote) */}
                <blockquote className="p-6 rounded-2xl bg-[#EDE8DC] border-l-4 border-[#C86D51] font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed shadow-xs">
                  {activeArticle.leadQuote}
                </blockquote>

                {/* Secciones Desarrolladas en Extenso */}
                {activeArticle.sections.map((section, sIdx) => (
                  <section key={sIdx} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1E293B] pt-2 border-b border-[#E5DEC9] pb-2">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={`text-sm sm:text-base text-slate-800 leading-[1.85] font-sans text-justify ${
                          sIdx === 0 && pIdx === 0
                            ? 'first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-[#28475A] first-letter:mr-3 first-letter:leading-none'
                            : ''
                        }`}
                      >
                        {p}
                      </p>
                    ))}

                    {section.equation && (
                      <div className="my-5 p-4 rounded-2xl bg-[#140b22] text-white border border-[#28475A] shadow-md overflow-x-auto">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block mb-1">
                          Formalización Matemática en el Motor HOMBROS:
                        </span>
                        <BlockMath math={section.equation} />
                      </div>
                    )}
                  </section>
                ))}

                {/* Recuadro de Recomendaciones de Política Pública al Final del Cuerpo */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#16242D] text-white border border-[#487075] space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Síntesis de Prescripciones de Política Pública (Actionable Policy Brief)</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    Hoja de Ruta Legislativa, Municipal y Comunitaria
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeArticle.policyRecommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono font-bold text-xs shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Aparato Bibliográfico y Referencias */}
                <div className="p-5 rounded-2xl bg-[#EDE8DC] border border-[#D4C9B8] space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#28475A]" />
                    <span>Referencias Bibliográficas y Documentales Citadas</span>
                  </h4>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed">
                    {activeArticle.citations}
                  </p>
                </div>
              </div>

              {/* Barra Lateral Derecha del Artículo (4 columnas: Ficha Técnica, Variables & Navegación) */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-36 space-y-6">
                  {/* Tarjeta de Acoplamiento con los Hombros */}
                  <div className="p-5 rounded-2xl bg-white border border-[#D4C9B8] shadow-md space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D51] font-bold block">
                      Acoplamiento con el Modelo HOMBROS
                    </span>
                    <h4 className="font-serif font-bold text-base text-slate-900">
                      Variables y Parámetros Gobernados
                    </h4>
                    <div className="space-y-2">
                      {activeArticle.hombrosVariables.map(v => (
                        <div
                          key={v}
                          className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8] text-xs font-mono font-bold text-[#28475A]"
                        >
                          • {v}
                        </div>
                      ))}
                    </div>
                    {activeArticle.olcaPart && (
                      <div className="pt-3 border-t border-[#E5DEC9] text-[11px] font-sans text-slate-600 leading-relaxed">
                        <strong>Origen del texto:</strong> {activeArticle.olcaPart}.
                      </div>
                    )}
                  </div>

                  {/* Índice Rápido de Capítulos del Artículo */}
                  <div className="p-5 rounded-2xl bg-white border border-[#D4C9B8] shadow-md space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold block">
                      Estructura de este Ensayo
                    </span>
                    <ol className="space-y-2 text-xs font-serif font-bold text-slate-800">
                      {activeArticle.sections.map((sec, idx) => (
                        <li key={idx} className="py-1 border-b border-[#FAF7F0] last:border-0">
                          {sec.heading}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Otros Artículos de la Colección para Seguir Leyendo */}
                  <div className="p-5 rounded-2xl bg-[#EDE8DC] border border-[#D4C9B8] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold block">
                      Seguir Leyendo en el Think Tank
                    </span>
                    <div className="space-y-2.5">
                      {THINK_TANK_ARTICLES.filter(a => a.id !== activeArticle.id).map(other => (
                        <button
                          key={other.id}
                          onClick={() => handleOpenArticle(other.id)}
                          className="w-full p-2.5 rounded-xl bg-white hover:bg-[#28475A] text-slate-800 hover:text-white border border-[#D4C9B8] text-left transition-all flex items-center gap-3 group"
                        >
                          <img
                            src={other.image}
                            alt={other.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono uppercase text-[#C86D51] group-hover:text-amber-300 font-bold block">
                              {other.category}
                            </span>
                            <div className="font-serif font-bold text-xs line-clamp-2 leading-snug">
                              {other.title}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

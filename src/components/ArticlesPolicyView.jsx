import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Scale, ShieldAlert, BookOpen, ExternalLink, CheckCircle2,
  AlertTriangle, Sparkles, Landmark, Layers, ArrowRight, Globe, Cpu,
  Sprout, Users, Flame, Compass, Printer
} from 'lucide-react';
import { InlineMath, BlockMath } from './KaTeXMath';

const SEIA_REFORM_PILLARS = [
  {
    code: 'ARTÍCULO 1° · CLÁUSULA DE SALVAGUARDA PRE-INVERSIONAL',
    title: 'Inadmisibilidad por Deuda Metabólica Histórica Acumulada',
    currentFlaw: 'El SEIA actual (Ley 19.300) evalúa cada proyecto en un vacío histórico: solo pregunta qué daño marginal agregará la nueva inversión hacia el futuro, ignorando si la cuenca ya fue vaciada o fracturada en las décadas previas.',
    proposal: 'Establécese la Cláusula de Salvaguarda Pre-Inversional: ningún Estudio o Declaración de Impacto Ambiental (EIA/DIA) de carácter extractivo, energético, forestal o inmobiliario intensivo podrá ser admitido a tramitación si la cuenca hidrográfica receptora presenta un Esfuerzo Basal Acumulado σ₀ ≥ 1.00 (régimen de deformación plástica) o si cualquiera de sus tres hombros vitales se encuentra bajo el umbral crítico de Liebig (Hᵢ < 0.25). En tales territorios, toda nueva inversión deberá ir precedida obligatoriamente por un Proyecto de Restitución Sintrópica que devuelva la cuenca al rango elástico (σ < 0.85).',
    equation: '\\sigma_0 = \\frac{P_{\\text{hist}}}{H_0 \\cdot (1 + \\kappa)} \\ge 1.00 \\;\\lor\\; \\min(S, E, K) < 0.25 \\implies \\text{MORATORIA PRE-INVERSIONAL VINCULANTE}'
  },
  {
    code: 'ARTÍCULO 2° · ENSAYO DE TRACCIÓN ACUMULADA DE CUENCA',
    title: 'Sustitución de la Línea Base Puntual por Mecánica de Medios Continuos',
    currentFlaw: 'El fraccionamiento de proyectos y la evaluación por límites prediales ficticios permiten aprobar decenas de monocultivos, pozos profundos o plantas industriales que individualmente parecen "tolerables", pero cuya suma colapsa el acuífero.',
    proposal: 'La unidad mínima e indivisible de evaluación ambiental será la Cuenca Hidrográfica y Atmosférica. Todo proyecto deberá someterse a un Ensayo de Tracción Mecánica Uniaxial que calcule la tensión proyectada (σ_proj) integrando la carga del proyecto (ΔD₁, ΔD₂, ΔD₃) y su desgaste ecosistémico (ΔE) sobre el tensor actual de la cuenca. Se prohíbe aprobar proyectos que empujen el esfuerzo más allá del Límite de Fluencia (σ_proj > 0.85) sin regeneración simétrica previa.',
    equation: '\\sigma_{\\text{proj}} = \\frac{D_0 + \\Delta D_{\\text{proy}}}{\\left[ S_0 \\cdot (E_0 + \\Delta E_{\\text{proy}}) \\cdot K_0 \\right]^{1/3} \\cdot \\Phi_{\\text{crit}} \\cdot (1 + \\kappa)} < 0.85'
  },
  {
    code: 'ARTÍCULO 3° · FIN DE LAS INDULGENCIAS AMBIENTALES (LEY DE LIEBIG)',
    title: 'Prohibición de Compensación Asimétrica entre Hombros Inconmensurables',
    currentFlaw: 'Bajo la economía ambiental neoclásica (sustituibilidad perfecta de Solow), el SEIA permite "compensar" la desecación de una vega o la tala de bosque nativo (Hombro E) pavimentando una sede vecinal, entregando becas o plantando pinos en otra provincia (Hombro K).',
    proposal: 'Conságrase el Principio de Inconmensurabilidad Biofísica de Justus von Liebig y Nicholas Georgescu-Roegen: queda estrictamente prohibida toda compensación inter-hombros. El daño proyectado sobre el Hombro Ambiental (E: agua, suelo orgánico, biodiversidad nativa) o sobre el Hombro Social (S: cohesión comunitaria, sistemas APR) jamás podrá ser compensado mediante transferencias monetarias o infraestructura gris (K). Toda mitigación deberá ser biofísicamente isomórfica, en la misma subcuenca y verificada antes de iniciar obras.',
    equation: '\\Delta E < 0 \\;\\not\\!\\!\\implies \\Delta K > 0 \\quad \\left(\\text{Prohibición de Sustitución Financiera de Soporte Vital}\\right)'
  },
  {
    code: 'ARTÍCULO 4° · TELEMETRÍA ABIERTA & AUDITORÍA SCOPE 3',
    title: 'Vigilancia Satelital Soberana (Estándar STAC/COG) y Responsabilidad Metabólica',
    currentFlaw: 'Las líneas base y los seguimientos ambientales dependen de consultoras contratadas por el mismo titular del proyecto, utilizando muestreos estáticos discrecionales y ocultando la huella ecológica importada/exportada.',
    proposal: 'Créase el Sistema Público de Telemetría Biofísica Continua acoplado a constelaciones satelitales abiertas (Sentinel-2 L2A vía protocolo STAC/COG: NDVI, NDRE, NDMI, MNDWI, NBR, BSI/SOC) y balances hidro-edáficos FAO-56 (arquitectura AgriTwin). Los Comités de Agua Potable Rural (APR) y gobiernos comunales tendrán acceso directo a la auditoría en tiempo real de las variables E₁..E₄, con facultad de activar alertas tempranas vinculantes ante caídas del índice de humedad foliar (NDMI < 0.20) o agotamiento de acuíferos.',
    equation: '\\text{Tier 3 Audit} = \\mathcal{F}_{\\text{STAC/COG}}\\left(\\text{Sentinel-2 L2A},\\; \\text{FAO-56},\\; \\text{DGA/SINCA}\\right) \\longrightarrow H(t) \\text{ en Tiempo Real}'
  }
];

const OLCA_POLICY_ARTICLES = [
  {
    id: 'olca-policy-1',
    folio: 'POLICY BRIEF N° 01 · MACROECONOMÍA BIOFÍSICA',
    olcaPart: 'Adaptado de "Ser libres al borde del abismo · Parte 1: El mundo se acerca a un colapso económico"',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111259',
    olcaDate: 'Agosto 2025 · Observatorio Latinoamericano de Conflictos Ambientales (OLCA)',
    title: 'Más Allá de la Ilusión del PIB: Límites Planetarios, Deuda Soberana y Contabilidad de Activos Biofísicos ante el Estancamiento Global',
    subtitle: 'Por qué el endeudamiento perpetuo y los mercados de carbono no pueden refinanciar la depreciación termodinámica de las cuencas hidrográficas.',
    tags: ['Límites Planetarios', 'Deuda Soberana', 'Crítica al PIB', 'Falsas Soluciones Climáticas', 'Termodinámica'],
    accentColor: '#C86D51',
    hombrosVariables: ['K₄ (Balance Biótico)', 'E₂ (Disponibilidad Hídrica)', 'E₃ (Suelo Orgánico SOC)', 'D₁..D₃ (Presión Extractiva)'],
    executiveSummary: 'La economía global atraviesa una convergencia inédita entre estancamiento secular del PIB per cápita, endeudamiento público récord (superando el 120% del PIB en potencias centrales tras los ciclos de rescate post-2008 y post-COVID) y transgresión acelerada de los Límites Planetarios (Rockström et al., 2009; Steffen et al., 2018). Este Policy Brief demuestra que el "Desarrollo Sostenible" convencional (Brundtland, 1987) opera como una ficción contable —el mito de Sísifo— que oculta la liquidación del stock de capital natural bajo burbujas financieras y esquemas de greenwashing corporativo.',
    keyDiagnosis: [
      {
        heading: '1. La Ficción de la Deuda Perpetua frente al Stock Finito (Dasgupta & Georgescu-Roegen)',
        body: 'Los bancos centrales y ministerios de hacienda operan bajo la premisa de que toda crisis puede refinanciarse emitiendo nueva deuda soberana respaldada por crecimiento futuro (Reinhart & Rogoff, 2011; Pettis, 2022). Sin embargo, el crecimiento material está rígidamente acotado por la tasa de regeneración de la biosfera (Dasgupta, 2021). Cuando se agotan el agua dulce, el nitrógeno y el fósforo edáfico (Jones & Steffen, 2019), la emisión monetaria carece de respaldo biofísico real.'
      },
      {
        heading: '2. El Costo Macroeconómico de la Inacción Climática (Hothouse Earth)',
        body: 'Superar el umbral de +1.5°C a +2.0°C (IPCC AR6, 2023) activa cascadas de retroalimentación no lineal hacia una "Tierra Invernadero" (Steffen et al., 2018). Solo en 2023, las pérdidas directas por megaincendios, sequías e inundaciones superaron en un 4% la media del siglo XXI (AON, 2023), equivalentes al presupuesto de construcción de 190 hospitales de alta complejidad como el Karolinska de Estocolmo. La inacción fiscal es hoy el mayor pasivo contingente de los Estados.'
      },
      {
        heading: '3. Desmantelamiento de las "Falsas Soluciones" y el Maquillaje Verde',
        body: 'La llamada "economía verde" corporativa ha respondido con terminología jurídicamente débil (Scanlan, 2017; Kalesnik et al., 2020; Lashitew, 2021): bonos de carbono que subsidian monocultivos inflamables, tala de bosques nativos para biocombustibles o soja (Amaral et al., 2021) y desecación de salares altoandinos para litio (Liu et al., 2019). Se hipoteca la sección estructural de las cuencas del Sur Global para sostener el consumo del Norte.'
      }
    ],
    hombrosTranslation: 'En la formulación matemática de HOMBROS, el crecimiento del PIB que se logra destruyendo suelo y agua reduce el Hombro Ambiental (E → 0) y el Balance Biótico (K₄ → 0). Por la estructura multiplicativa H = (S · E · K)^(1/3) · Φ_crit, ningún incremento financiero nominal puede evitar que la capacidad portante H colapse a cero cuando E cruza el umbral de Liebig (0.25).',
    policyRecommendations: [
      'Sustituir el PIB comunal/regional como métrica de éxito presupuestario por el Índice de Solvencia Metabólica (H) y el Balance Sintrópico Neto (Γ − D).',
      'Incorporar el Pasivo por Histéresis Ecosistémica (meses de recuperación plástica ε_p) en las cuentas nacionales y en la evaluación de riesgo soberano.',
      'Eliminar subsidios públicos (tipo DL 701 o incentivos a biomasa industrial) a monocultivos e industrias con Balance Biótico K₄ < 0.35.'
    ],
    citations: 'Rockström et al. (2009); Steffen et al. (2018); Dasgupta (2021); IPCC AR6 (2023); Reinhart & Rogoff (2011); Liu et al. (2019); Kalesnik et al. (2020); Santander (2025, OLCA #111259).'
  },
  {
    id: 'olca-policy-2',
    folio: 'POLICY BRIEF N° 02 · REFORMA DEL ESTADO Y GOBERNANZA',
    olcaPart: 'Adaptado de "Ser libres al borde del abismo · Parte 2: Se hunde el Titanic: El colapso de los Estados y la agonía del Leviatán"',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111262',
    olcaDate: 'Agosto 2025 · Observatorio Latinoamericano de Conflictos Ambientales (OLCA)',
    title: 'Rendimientos Decrecientes de la Complejidad Estatal (Ley de Tainter), Autofagia Institucional y Descentralización hacia la Gobernanza Polícéntrica de Cuencas',
    subtitle: 'Por qué ni el desmantelamiento ultraliberal ni el extractivismo estatal centralizado pueden evitar la fractura del Contrato Social en territorios hidrostresados.',
    tags: ['Ley de Tainter', 'Contrato Social', 'Gobernanza Polícéntrica', 'Falsos Mercados de Carbono', 'Red Panal'],
    accentColor: '#28475A',
    hombrosVariables: ['κ (Gobernanza & Amortiguación)', 'S₂ (Capacidad Institucional Local)', 'K₂ (Autonomía Fiscal Comunal)'],
    executiveSummary: 'El Contrato Social moderno (Hobbes, 1651; Locke, 1689; Rousseau, 1762) transfirió el poder ciudadano al Estado ("El Leviatán") bajo la promesa de garantizar la vida, la seguridad material y la provisión de bienes básicos. Hoy, la bancarrota biofísica de los territorios está desencadenando la agonía del Leviatán: los Estados centrales fallan en proteger a las comunidades rurales frente a la megasequía y el despojo, oscilando entre la "autofagia ultraliberal" (desmantelamiento de lo público en favor de corporaciones transnacionales) y el "neo-extractivismo estatal" (progresismos y bloques multipolares que financian gasto social destruyendo cuencas).',
    keyDiagnosis: [
      {
        heading: '1. La Ley de Joseph Tainter en la Administración Pública Ambiental',
        body: 'Joseph Tainter (1988) demostró en "The Collapse of Complex Societies" que las estructuras burocráticas hiper-centralizadas invierten cada vez más energía y presupuesto en mantener su propia complejidad administrativa, obteniendo rendimientos marginales decrecientes. En Chile y América Latina, el Estado gasta miles de millones en burocracia reactiva (camiones aljibe eternos, subsidios paliativos, litigios fragmentados) sin resolver la causa biofísica de la escasez.'
      },
      {
        heading: '2. El Falso Dilema: Autofagia Ultraliberal vs. Neo-Extractivismo Hegemónico',
        body: 'El segundo ciclo de shock neoliberal (heredero de Letelier, 1976) utiliza la crisis fiscal para desguazar el Estado ("la motosierra") y entregar la soberanía territorial a tribunales arbitrales y corporaciones globales (Mikler, 2018; Gonzalez, 2000). Pero la alternativa de los bloques estatales hegemónicos o multipolares (Katz, 2016; Svampa, 2019; Kothari et al., 2019) mantiene intacta la matriz colonial-extractivista. Ambos hunden el Titanic mientras las élites acaparan los botes salvavidas.'
      },
      {
        heading: '3. El Fracaso de la Gobernanza Climática Cosmética (Fondos Verdes Extractivos)',
        body: 'Los mecanismos multilaterales actuales otorgan bonos de carbono a industrias que sustituyen ecosistemas nativos por plantaciones (Pearse & Böhm, 2014) y financian "extractivismo verde" que desplaza comunidades locales (Bruna, 2022; Snooks, 2019), erosionando la legitimidad democrática.'
      }
    ],
    hombrosTranslation: 'En HOMBROS, la hipertrofia burocrática centralizada reduce el coeficiente de amortiguación cibernética κ → 0 (Ley de Tainter), haciendo que todo el peso de la presión extractiva P caiga sin filtro sobre el territorio: σ = P / [H · (1 + κ)]. La solución estructural es maximizar κ mediante gobernanza polícéntrica local (Ostrom) y solidaridad biomecánica en Red Panal.',
    policyRecommendations: [
      'Transferir competencias vinculantes de ordenamiento hidro-territorial a Consejos de Cuenca Polícéntricos integrados por Comités APR, comunidades indígenas, pequeños productores y municipios.',
      'Reemplazar el gasto estatal paliativo crónico (ej. compra perpetua de agua en camiones aljibe) por Fondos de Capitalización Sintrópica Comunal auditados por telemetría abierta.',
      'Establecer protocolos de Mutualismo en Red Panal: cuando una comuna entra en fatiga elástica (σ > 0.85), las comunas adyacentes con superávit sintrópico absorben temporalmente la cuota de carga productiva.'
    ],
    citations: 'Tainter (1988); Hobbes (1651); Locke (1689); Rousseau (1762); Svampa (2019); Pearse & Böhm (2014); Bruna (2022); Kothari et al. (2019); Santander (2025, OLCA #111262).'
  },
  {
    id: 'olca-policy-3',
    folio: 'POLICY BRIEF N° 03 · COHESIÓN SOCIAL, CUIDADOS Y SALUD PÚBLICA',
    olcaPart: 'Adaptado de "Ser libres al borde del abismo · Parte 3: Cariño, ¿qué nos pasó? La domesticación del ser humano y la crisis moderna"',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111268',
    olcaDate: 'Agosto 2025 · Observatorio Latinoamericano de Conflictos Ambientales (OLCA)',
    title: 'Salud Mental Colectiva, Economía del Cuidado y Reconstrucción del Tejido Comunitario (Hombro S) frente a la Fatiga de Rendimiento y la Fragmentación Social',
    subtitle: 'De los cercamientos históricos de los bienes comunes a la "Sociedad del Cansancio": por qué no existe resiliencia ecológica sin des-alienación social y valorización del trabajo reproductivo.',
    tags: ['Economía del Cuidado', 'Salud Mental Territorial', 'Bienes Comunes', 'Cohesión Social (S₁)', 'Sociedad del Cansancio'],
    accentColor: '#DA7B93',
    hombrosVariables: ['S₁ (Cohesión Comunitaria)', 'S₃ (Saberes & Capital Humano)', 'S₄ (Paz Territorial)', 'K₃ (Equidad Distributiva)'],
    executiveSummary: 'Los modelos ambientales tecnocráticos suelen fracasar porque tratan al territorio como un sistema físico vacío de subjetividad, ignorando que la degradación ecológica está íntimamente acoplada a la fractura del tejido comunitario y psicosocial (Hombro S). Este Policy Brief traza la genealogía de esa ruptura —desde el cercamiento de tierras comunales y la subordinación del trabajo de cuidados (Federici, 2004; Engels, 1884; De Beauvoir, 1949) hasta la comodificación relacional (Lukács, 2023; Debord, 1967) y la epidemia contemporánea de depresión, burnout y autoexplotación diagnosticada por Byung-Chul Han (2010)— proponiendo políticas concretas de reconstrucción del Hombro Social.',
    keyDiagnosis: [
      {
        heading: '1. Cercamiento de los Comunes y Subvaloración del Trabajo de Cuidados (Federici)',
        body: 'La transición hacia la acumulación moderna requirió desmantelar la propiedad comunal de bosques y aguas, destruyendo las redes comunitarias custodiadas históricamente por mujeres y relegando el trabajo reproductivo y de cuidados a una esfera invisible y "domesticada" (Federici, 2004; Martín Palomo, 2008). Sin embargo, el trabajo de cuidado —de las semillas, del agua comunitaria, de la infancia y la vejez— es la infraestructura basal que sostiene todo el edificio productivo.'
      },
      {
        heading: '2. Razón Instrumental, Desencantamiento y Pérdida de Vínculo Territorial (Weber & Adorno)',
        body: 'El giro hacia una racionalidad puramente instrumental (Adorno & Horkheimer, 1944; Weber, 1904) redujo la naturaleza viviente a un inventario de recursos inertes y cosificó los vínculos humanos (Marx, 1867; Fromm, 1956). En zonas rurales y periféricas despojadas de sus ecosistemas, esta pérdida de "tribu" y de paisaje propio se traduce en anomia, violencia estructural y ruptura intergeneracional.'
      },
      {
        heading: '3. El "Prometeo Cansado" y la Epidemia de Fatiga en la Periferia (Byung-Chul Han)',
        body: 'En la modernidad tardía, la coacción externa fue reemplazada por el imperativo de autoexplotación ("¡Tú sí puedes!", Byung-Chul Han, 2010). En sociedades profundamente desiguales, esta promesa ilusoria de éxito mercantil empuja a millones de personas al agotamiento crónico, la ansiedad, el endeudamiento familiar y, en periferias vulneradas, a economías ilícitas y violencia.'
      }
    ],
    hombrosTranslation: 'En HOMBROS, el deterioro psicosocial y la invisibilización de los cuidados desploman S₁ (Cohesión Comunitaria) y S₄ (Ausencia de Violencia). Incluso si un municipio atrae inversión privada (K alto), una caída de S bajo 0.25 activa la discontinuidad de Liebig (Φ_crit = 0.25), fracturando la capacidad portante H del territorio.',
    policyRecommendations: [
      'Integrar la Contabilidad del Trabajo de Cuidados y Custodia Comunitaria del Agua/Semillas dentro del cálculo de inversión pública comunal (fortalecimiento directo de S₁ y K₃).',
      'Crear una Red de Refugios Biofílicos, Huertos Terapéuticos y Bosques Escuela Comunales como infraestructura de salud pública mental y reconexión intergeneracional con el paisaje.',
      'Reorientar la educación técnica rural desde la formación de mano de obra para monocultivos hacia Saberes Agroecológicos, Hidrología Comunitaria y Telemetría Ciudadana (elevando S₃).'
    ],
    citations: 'Federici (2004); Byung-Chul Han (2010); Fromm (1941, 1956); Adorno & Horkheimer (1944); Weber (1904); Lukács (2023); Debord (1967); Martín Palomo (2008); Santander (2025, OLCA #111268).'
  },
  {
    id: 'olca-policy-4',
    folio: 'POLICY BRIEF N° 04 · TRANSICIÓN AGROECOLÓGICA Y POST-EXTRACTIVISMO',
    olcaPart: 'Adaptado de "Ser libres al borde del abismo · Parte 4: La llamada de la selva: Autonomía y Ecología Regenerativa"',
    olcaUrl: 'https://olca.cl/articulo/nota.php?id=111288',
    olcaDate: 'Agosto 2025 · Observatorio Latinoamericano de Conflictos Ambientales (OLCA)',
    title: 'Hoja de Ruta para el "Apague Seguro" del Extractivismo: Transición Agroecológica, Redes de Prosumidores y Bio-Civilización del Buen Vivir',
    subtitle: 'Cómo desactivar progresivamente la dependencia extractiva sin colapsar el empleo local, construyendo nichos ecológicos productivos de biomasa, agua y soberanía alimentaria.',
    tags: ['Apague Seguro del Extractivismo', 'Ecología Regenerativa', 'Prosumidores', 'Buen Vivir / Küme Mongen', 'ROI Sintrópico'],
    accentColor: '#376E6F',
    hombrosVariables: ['Γ (Tasa Sintrópica)', 'E₁..E₄ (Restauración de Cuenca)', 'K₁ (Diversificación)', 'K₄ (Economía Regenerativa)'],
    executiveSummary: 'Superar el modelo extractivista no puede lograrse mediante un decreto abrupto que ignore que miles de familias aún dependen salarialmente de esas industrias: "no se puede simplemente apagar el switch del capitalismo". Este Policy Brief formula la doctrina de la Administración Ecológica para el Apague Seguro del Extractivismo: una estrategia dual que regula, grava y reduce progresivamente la presión extractiva (D) mientras construye, en paralelo, una nueva matriz bioeconómica de autosustento (Γ) basada en agroforestería sintrópica, cosecha de aguas, circuitos cortos de prosumidores y bienes comunes (Gudynas, 2013; Max-Neef, 1986; Acosta & Brand, 2019; Santander, 2024).',
    keyDiagnosis: [
      {
        heading: '1. Administración Ecológica para el "Apague Seguro" del Extractivismo',
        body: 'El extractivismo opera como "un lobo viviendo en nuestro bosque": desactivarlo exige una transición planificada donde las rentas y tecnologías del sistema actual sean redirigidas forzosamente a financiar la regeneración de los suelos, aguas y economías locales que lo reemplazarán. A medida que los pasivos ambientales se vuelven inocultables, la inversión regenerativa demuestra ser económicamente más rentable que el subsidio perpetuo a la degradación.'
      },
      {
        heading: '2. De la Entropía a la Sintropía: Permacultura, Agroforestería y Prosumidores (Max-Neef & Mollison)',
        body: 'Frente a la economía lineal entrópica (Georgescu-Roegen), la bioeconomía a escala humana (Max-Neef, 1986; Cruz et al., 2009) y la cultura de lo permanente (Mollison, 1987) organizan el territorio para producir alimento, agua infiltrada y biomasa simultáneamente. La ciudadanía transita de consumidores pasivos a "prosumidores" articulados en cooperativas, cadenas cortas de valor e intercambios locales no especulativos (Gibson-Graham, 2006; Jackson, 2017).'
      },
      {
        heading: '3. Refugios Climáticos y Nichos Ecológicos Productivos (Küme Mongen / Sumak Kawsay)',
        body: 'Inspirada en los paradigmas indígenas del Buen Vivir —Sumak Kawsay, Suma Qamaña, Küme Mongen (Loncon, 2022; Acosta, 2012; Kothari et al., 2014)— y en la ética de la liberación (Dussel, 2013), la naturaleza deja de ser vista como una plantación inerte o un parque ornamental para convertirse en un mosaico de Refugios Climáticos y Nichos Ecológicos Productivos de biomasa y empleo digno (Santander, 2024).'
      }
    ],
    hombrosTranslation: 'En HOMBROS, el "Apague Seguro" corresponde a una trayectoria de control óptimo en 36 a 120 meses donde la tasa extractiva D(t) decrece escalonadamente al mismo ritmo en que la velocidad de regeneración sintrópica Γ(t) crece por inversión agroecológica, garantizando que el ángulo metabólico θ = arctan(Γ − D) cruce hacia el cuadrante sintrópico positivo sin inducir shock de desempleo en K.',
    policyRecommendations: [
      'Implementar Programas de Reconversión Forestal y Agrícola Justa: transformar gradualmente monocultivos de pino/eucalipto en zonas de pendiente e interfaz WUI hacia mosaicos agroforestales sintrópicos y bosque nativo melífero/maderable.',
      'Desplegar Infraestructura Hídrica Sintrópica Descentralizada (diseño Keyline, zanjas de infiltración, restauración de vegas y humedales ribereños) gestionada por cooperativas locales y Comités APR.',
      'Establecer Compras Públicas Preferentes (hospitales, escuelas JUNAEB, municipios) abastecidas en un 50%+ por redes locales de prosumidores agroecológicos certificados en solvencia biofísica.'
    ],
    citations: 'Max-Neef (1986); Gudynas (2013); Acosta & Brand (2019); Loncon (2022); Dussel (2013); Mollison (1987); Gibson-Graham (2006); Jackson (2017); Santander (2024; 2025, OLCA #111288).'
  }
];

const AGRITWIN_SYNERGY_MATRIX = [
  {
    agritwinModule: 'stac-cog-client.js · Sentinel-2 L2A (B08, B05, B04)',
    agritwinMetric: 'Índices NDRE, NDVI, MCARI y SAVI (10m - 20m BOA)',
    hombrosTarget: 'Variable E₁ · Integridad Ecosistémica y Dosel Nativo',
    tierUpgrade: 'Eleva Hipótesis Tier 1 → Telemetría Satelital Continua Tier 3'
  },
  {
    agritwinModule: 'basin-hydrology-engine.js + soil-water-engine.js',
    agritwinMetric: 'Balance Embalse Bullileo (110 hm³) + Recesión Maillet-Boussinesq + Ks FAO-56',
    hombrosTarget: 'Variable E₂ · Disponibilidad Hídrica de Cuenca (Falkenmark)',
    tierUpgrade: 'Acople Hidrológico Macro-Meso-Micro en Tiempo Real'
  },
  {
    agritwinModule: 'Sentinel-2 SWIR (B11, B12) + isric_soilgrids_soc.R',
    agritwinMetric: 'Bare Soil Index (BSI) + Proxy SOC Superficial + SoilGrids 250m',
    hombrosTarget: 'Variable E₃ · Calidad de Suelo y Carbono Orgánico (SOC %)',
    tierUpgrade: 'Auditoría Radiométrica + Edafológica Espacialmente Explícita'
  },
  {
    agritwinModule: 'Doctrina C2 Multi-Amenaza · NBR + NDMI + FWI',
    agritwinMetric: 'Humedad Foliar (NDMI < 0.20), Necromasa (NBR) y Zonificación CAL FIRE WUI',
    hombrosTarget: 'Variable E₄ · Resiliencia Piro-Climática & Vector de Presión D₃',
    tierUpgrade: 'Pronóstico Determinista de Fatiga Térmica e Incendios'
  },
  {
    agritwinModule: 'Matriz de Vulnerabilidad Expuesta (V) en Cuencas Rurales',
    agritwinMetric: 'Monitoreo de 5 Comités APR (Bullileo, Retiro, Copihue, Romeral, Villaseca)',
    hombrosTarget: 'Variables S₁ (Cohesión APR) y K₄ (Balance Biótico Predial)',
    tierUpgrade: 'Protección Directa de Soberanía Hídrica Rural (4.850 hab.)'
  }
];

export default function ArticlesPolicyView({ onNavigateTab }) {
  const [selectedBriefId, setSelectedBriefId] = useState('olca-policy-1');
  const [activeSection, setActiveSection] = useState('all'); // 'all' | 'seia' | 'olca' | 'agritwin'

  const activeBrief = OLCA_POLICY_ARTICLES.find(b => b.id === selectedBriefId) || OLCA_POLICY_ARTICLES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* =================================================================== */}
      {/* CABECERA EJECUTIVA DEL THINK TANK & LABORATORIO DE POLÍTICA PÚBLICA */}
      {/* =================================================================== */}
      <div className="card-magenta rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D83F87]/35 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#28475A] text-white">
                Unidad de Incidencia Legislativa & Ecología Política · Think Tank HOMBROS
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C86D51] text-white">
                Programa de Investigación Pre-Inversional
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-black tracking-tight">
              Artículos de Política Pública, Reforma al SEIA & Ensayos del OLCA
            </h1>
            <p className="text-xs sm:text-sm text-black font-medium mt-1.5 max-w-3xl leading-relaxed">
              Traducción programática de nuestra investigación teórica y empírica hacia instrumentos vinculantes de Estado: 
              <strong> (1) Propuesta de Reforma Estructural al Sistema de Evaluación de Impacto Ambiental (SEIA 2.0 Biofísico)</strong>, 
              <strong> (2) Tetralogía de Policy Briefs adaptados de los ensayos publicados en el OLCA</strong> y 
              <strong> (3) Arquitectura de integración tele-hidrológica con el Gemelo Digital AgriTwin</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#28475A] hover:bg-[#1e3544] text-white text-xs font-mono font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Dossier Policy</span>
            </button>
          </div>
        </div>

        {/* Section Filter Pills */}
        <div className="mt-6 pt-5 border-t border-[#D4C9B8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Dossier Completo (SEIA + 4 Policy Briefs + AgriTwin)' },
              { id: 'seia', label: '1. Propuesta de Reforma al SEIA (Ley 19.300 → SEIA 2.0)' },
              { id: 'olca', label: '2. Los 4 Policy Briefs (Serie OLCA: Ser Libres al Borde del Abismo)' },
              { id: 'agritwin', label: '3. Sinergia HOMBROS × Gemelo Digital AgriTwin' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  activeSection === sec.id
                    ? 'bg-[#487075] text-white border-[#376E6F] shadow-md'
                    : 'bg-white/85 text-slate-800 border-[#D4C9B8] hover:bg-white'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SECCIÓN 1: PROPUESTA ESTRELLA DE REFORMA AL SEIA (SEIA 2.0)         */}
      {/* =================================================================== */}
      {(activeSection === 'all' || activeSection === 'seia') && (
        <div className="card-indigo rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#8D69A6]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Propuesta Legislativa Estrella · Reforma a la Ley 19.300 sobre Bases Generales del Medio Ambiente
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2.5">
                <Landmark className="w-6 h-6 text-amber-300" />
                Propuesta de Reforma al SEIA: De la Ventanilla de Permisos al Ensayo de Tracción Biofísica de Cuenca
              </h2>
              <p className="text-xs text-slate-200 mt-1.5 max-w-4xl leading-relaxed">
                El Sistema de Evaluación de Impacto Ambiental (SEIA) chileno fue diseñado bajo el paradigma neoclásico de los años noventa: evalúa cada proyecto de inversión de forma aislada, ignora el daño histórico acumulado en la cuenca (<InlineMath math="\sigma_0" />) y permite comprar indulgencias ambientales mediante compensaciones monetarias asimétricas. Proponemos una <strong>Reforma Estructural de 4 Artículos</strong> fundamentada en la mecánica de medios continuos y la cláusula de salvaguarda pre-inversional.
              </p>
            </div>
          </div>

          {/* Comparative Diagnosis Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Paradigma Actual · SEIA 1.0 (Ley 19.300 Vigente)</span>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside leading-relaxed font-sans">
                <li><strong>Ceguera Histórica:</strong> Evalúa únicamente el incremento marginal futuro (<InlineMath math="\Delta P" />), sin importar si la cuenca ya está en bancarrota hídrica o saturada de contaminantes.</li>
                <li><strong>Fraccionamiento Espacial:</strong> Evalúa polígonos prediales aislados en lugar de la sección transversal completa de la cuenca hidrográfica.</li>
                <li><strong>Sustituibilidad Débil (Solow):</strong> Permite destruir humedales o suelo agrícola (<InlineMath math="\Delta E < 0" />) a cambio de mitigaciones cosméticas o aportes financieros (<InlineMath math="\Delta K > 0" />).</li>
                <li><strong>Autocontrol Corporativo:</strong> Las líneas base dependen de muestreos puntuales pagados por el propio titular del proyecto.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Paradigma Propuesto · SEIA 2.0 Biofísico (HOMBROS)</span>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside leading-relaxed font-sans">
                <li><strong>Cláusula de Salvaguarda Pre-Inversional:</strong> Si la cuenca presenta <InlineMath math="\sigma_0 \ge 1.00" /> o <InlineMath math="H_i < 0.25" />, se exige reparación previa antes de admitir proyectos extractivos.</li>
                <li><strong>Ensayo de Tracción de Cuenca (<InlineMath math="\sigma_{\text{proj}} < 0.85" />):</strong> Todo proyecto se modela como un vector de esfuerzo sobre el tensor continuo de la cuenca completa.</li>
                <li><strong>Inconmensurabilidad de Liebig:</strong> Prohibición absoluta de compensar pérdida de agua o suelo vivo con infraestructura gris o bonos financieros.</li>
                <li><strong>Telemetría Pública STAC/COG:</strong> Monitoreo continuo e inalterable vía satélite (Sentinel-2) y sensores de cuenca abiertos a las comunidades.</li>
              </ul>
            </div>
          </div>

          {/* 4 Articles of the SEIA Reform */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SEIA_REFORM_PILLARS.map((art, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/45 border border-white/15 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-bold uppercase inline-block">
                    {art.code}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                    {art.title}
                  </h3>
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-slate-300">
                    <strong className="text-rose-300 font-mono text-[10px] uppercase block mb-0.5">Vacío Legal Actual:</strong>
                    {art.currentFlaw}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-emerald-300 font-mono text-[10px] uppercase block mb-0.5">Texto Normativo Propuesto:</strong>
                    {art.proposal}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0c0714] border border-white/10 overflow-x-auto">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Regla Matemática Vinculante:</span>
                  <BlockMath math={art.equation} />
                </div>
              </div>
            ))}
          </div>

          {onNavigateTab && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-200">
                <strong className="text-amber-300 font-mono uppercase">Simulador Legislativo en Vivo:</strong> Puedes poner a prueba ahora mismo esta Reforma al SEIA sometiendo 5 arquetipos de proyectos de inversión al Ensayo de Tracción en la pestaña de Auditoría Biofísica.
              </div>
              <button
                onClick={() => onNavigateTab('audit')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#b55e43] text-white text-xs font-mono font-bold shrink-0 shadow-md transition-all"
              >
                <span>Ejecutar Simulador SEIA 2.0</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 2: LOS 4 POLICY BRIEFS ADAPTADOS DE LA SERIE DEL OLCA       */}
      {/* =================================================================== */}
      {(activeSection === 'all' || activeSection === 'olca') && (
        <div className="card-teal rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7DB2B2]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-emerald-500/30">
                Tetralogía de Ecología Política Aplicada · Publicaciones Originales en OLCA (Agosto 2025)
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1.5 flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-emerald-300" />
                De «Ser Libres al Borde del Abismo» a 4 Policy Briefs para la Transición Biofísica
              </h2>
              <p className="text-xs text-slate-200 mt-1.5 max-w-4xl leading-relaxed">
                Adaptación en formato ejecutivo de <em>Policy Brief</em> de la serie de cuatro ensayos publicados por <strong>Daniel Santander Urrutia</strong> en el <strong>Observatorio Latinoamericano de Conflictos Ambientales (OLCA)</strong>. Cada entrega articula el diagnóstico de la crisis sistémica (económica, estatal y psicosocial) y su resolución mediante la autonomía territorial, el apague seguro del extractivismo y la ecología regenerativa.
              </p>
            </div>
          </div>

          {/* Selector Cards for the 4 Policy Briefs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {OLCA_POLICY_ARTICLES.map((brief, idx) => {
              const isSelected = selectedBriefId === brief.id;
              return (
                <button
                  key={brief.id}
                  onClick={() => setSelectedBriefId(brief.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#140b22] border-emerald-300 ring-2 ring-emerald-300/80 shadow-xl'
                      : 'bg-black/35 border-white/10 hover:bg-black/55 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        BRIEF 0{idx + 1} · OLCA PARTE {idx + 1}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-white leading-snug">
                      {brief.title}
                    </h3>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-amber-300">
                    <span>Leer Policy Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Policy Brief Reader */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101820] border border-white/15 space-y-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeBrief.folio}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeBrief.olcaDate}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white leading-tight">
                  {activeBrief.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  {activeBrief.subtitle}
                </p>
              </div>

              <a
                href={activeBrief.olcaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#b55e43] text-white text-xs font-mono font-bold shrink-0 shadow-md transition-all"
              >
                <span>Ver Publicación Original en OLCA.cl</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Executive Summary + Coupled HOMBROS Variables */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                  Resumen Ejecutivo para Tomadores de Decisión (Executive Policy Abstract)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeBrief.executiveSummary}
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {activeBrief.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/50 text-slate-300 border border-white/10">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-black/50 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-2">
                    Variables de HOMBROS Gobernadas por este Brief
                  </span>
                  <div className="space-y-1.5">
                    {activeBrief.hombrosVariables.map(v => (
                      <div key={v} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white font-bold">
                        • {v}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                  Fuente base: <span className="text-slate-200">{activeBrief.olcaPart}</span>
                </div>
              </div>
            </div>

            {/* 3 Analytical Diagnosis Columns */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Evidencia Científica, Diagnóstico Estructural y Marco Epistémico
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {activeBrief.keyDiagnosis.map((diag, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-white leading-snug">
                      {diag.heading}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {diag.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Translation to HOMBROS Mathematical Mechanics & Policy Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 p-5 rounded-2xl bg-[#1a1128] border border-[#D83F87]/40 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#DA7B93] font-bold block">
                  Acoplamiento con el Motor Matemático HOMBROS
                </span>
                <h5 className="font-serif font-bold text-sm text-white">
                  Traducción Termodinámica y Constitutiva
                </h5>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {activeBrief.hombrosTranslation}
                </p>
              </div>

              <div className="lg:col-span-7 p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/35 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                  Prescripciones de Política Pública (Acción Legislativa, Municipal y Comunitaria)
                </span>
                <ul className="space-y-2 text-xs text-slate-100 font-sans">
                  {activeBrief.policyRecommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        P{i + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bibliographic Apparatus of the Brief */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-slate-400">
              <strong className="text-slate-200">Aparato Bibliográfico Citado en el Ensayo:</strong> {activeBrief.citations}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECCIÓN 3: SINERGIA ARQUITECTÓNICA HOMBROS × GEMELO DIGITAL AGRITWIN*/}
      {/* =================================================================== */}
      {(activeSection === 'all' || activeSection === 'agritwin') && (
        <div className="card-slate rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#927660]/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4C9B8]">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#28475A] text-white">
                Arquitectura Integrada de Ecosistema · Del Píxel Orbital y la Raíz al Dictamen Macro-Regional
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-black mt-1.5 flex items-center gap-2.5">
                <Cpu className="w-6 h-6 text-[#487075]" />
                Ecosistema Dual: ¿Cómo se Articulan «AgriTwin» (DestinE) y «HOMBROS»?
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-4xl leading-relaxed">
                <strong>AgriTwin</strong> (Gemelo Digital Biofísico Multiescala inspirado en <em>Destination Earth</em> de la ESA/ECMWF, desplegado en la Cuenca del Río Longaví / Embalse Bullileo) y <strong>HOMBROS</strong> no son proyectos separados: constituyen <strong>los dos hemisferios de una misma infraestructura científico-política</strong> para nuestra postulación a fondos de investigación.
              </p>
            </div>
          </div>

          {/* 3-Column Conceptual Synergy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-white/15 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase">
                Hemisferio I · AgriTwin (Tier 3 Sensor Engine)
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                El «Sistema Nervioso Sensorial» (Micro, Meso y Cuenca Hidro-Agrícola)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Resuelve la física de la luz y del agua en terreno: ingesta 10 bandas ópticas de <strong>Sentinel-2 L2A vía STAC/COG</strong> (<code className="text-emerald-300">NDVI, NDRE, NDMI, MNDWI, NBR, BSI/SOC</code>), modela la humedad radicular <strong>FAO-56</strong> (<code className="text-emerald-300">soil-water-engine.js</code> con asimilación Kalman) y acopla la recesión del Río Longaví y el Embalse Bullileo (<code className="text-emerald-300">basin-hydrology-engine.js</code>) en un Cubo de Datos 4D.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-amber-400/30 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase">
                El Puente Epistemológico · Tier 1/2 → Tier 3
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                De la Hipótesis Paramétrica a la Validación Empírica Financiada
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                En esta fase pre-fondo, HOMBROS formula <strong>hipótesis de calibración</strong> sobre los tres hombros (<InlineMath math="S, E, K" />) usando registros públicos agregados (Tier 1/2). Al conectar el motor de <strong>AgriTwin</strong>, las variables <InlineMath math="E_1, E_2, E_3, E_4" /> dejan de ser promedios estadísticos anuales y pasan a alimentarse de reflectancia BOA real cada 5 días y balances hidrológicos diarios a costo marginal $0 USD.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#140b22] text-white border border-white/15 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded bg-[#D83F87]/30 text-pink-300 font-mono text-[10px] font-bold uppercase">
                Hemisferio II · HOMBROS (Macro Policy Engine)
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                El «Córtex de Mecánica Constitutiva y Gobernanza» (SEIA 2.0 & ROI)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Recibe el estado biofísico medido por AgriTwin y lo integra con la cohesión social (<InlineMath math="S" />) y la estructura económica (<InlineMath math="K" />) para calcular la capacidad portante <InlineMath math="H" />, el esfuerzo constitutivo <InlineMath math="\sigma" /> y los dictámenes jurídicos vinculantes de inversión pública, reforma al SEIA y tributación al canibalismo metabólico Scope 3.
              </p>
            </div>
          </div>

          {/* Coupling Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#D4C9B8] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#28475A] text-white font-mono text-[11px] uppercase">
                  <th className="p-3.5 border-b border-white/15">Motor / Módulo en AgriTwin (v4.2 DestinE)</th>
                  <th className="p-3.5 border-b border-white/15">Métrica Física / Espectral Calculada</th>
                  <th className="p-3.5 border-b border-white/15">Variable Receptora en HOMBROS</th>
                  <th className="p-3.5 border-b border-white/15">Salto de Calidad Metodológica (Grant Value)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8DC] font-sans text-slate-800">
                {AGRITWIN_SYNERGY_MATRIX.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAF7F0] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#28475A]">{row.agritwinModule}</td>
                    <td className="p-3.5">{row.agritwinMetric}</td>
                    <td className="p-3.5 font-mono font-bold text-[#C86D51]">{row.hombrosTarget}</td>
                    <td className="p-3.5 font-medium text-[#376E6F]">{row.tierUpgrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}

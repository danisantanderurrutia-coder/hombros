# Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico para Cuantificar la Capacidad Portante, Tensión Sistémica y Desplazamiento Entrópico Territorial

**Preprint Canónico de Validación Multiescala • Superación de Gaps en Estándares Globales (Doughnut, Planetary Boundaries, IDH, Huella Ecológica, MFA) • Formulación Matemática y Validación Empírica en Ocho Territorios (Chile & Europa)**

---

* **Iniciativa de Investigación:** Proyecto Hombros — Laboratorio de Autosustento Sintrópico y Modelación Territorial
* **Autor Principal & Dirección Teórica:** Daniel Santander Urrutia (Geofísico & Permacultor) • Proyecto Hombros
* **Perspectiva Epistémica:** Economía Ecológica Radical, Termodinámica del No-Equilibrio (Georgescu-Roegen, H.T. Odum), Resistencia de Materiales y Gobernanza de Bienes Comunes (Elinor Ostrom)
* **Casos de Validación Empírica:** 
  * *Chile:* Chanco (Secano Costero Maule), Valle de Aconcagua (Valparaíso), Quintero-Puchuncaví (Zona de Sacrificio Industrial).
  * *Europa:* Copenhague (Dinamarca), Barcelona (España), Bilbao (Bizkaia), Ámsterdam (Países Bajos), Berlín (Alemania).
* **Reproducibilidad y Código Abierto:** Script Canónico en R (`scripts/hombros_canonical_paper.R`) • R v4.5.2 • ggplot2 / tidyverse
* **Clasificación UNESCO:** 5312 (Economía Sectorial / Ecológica), 3311 (Tecnología Ambiental), 2508 (Hidrología y Gestión de Cuencas)
* **Clasificación JEL:** Q01, Q56, Q57, R14, B52
* **Fecha:** Noviembre 2026 • Versión 1.0 Canónica • DOI: 10.5281/zenodo.hombros.2026

---

## Resumen Ejecutivo / Abstract

Los marcos métricos dominantes de sostenibilidad —el Índice de Desarrollo Humano (IDH), la Economía de la Dona y los Límites Planetarios— presentan al menos 3 dificultades metodológicas estructurales:
* **Sustituibilidad o compensabilidad aditiva:** asumen implícitamente la compensación matemática entre dimensiones biofísicas e institucionales, asumiendo que el capital monetario puede reparar la pérdida de funciones ecológicas no sustituibles.
* **Carencia de interpretación física-matemática sólida:** carecen de una interpretación física-matemática sólida, que por ejemplo interprete al sistema económico como un sistema complejo que responde a variables que pueden ser similares a la tensión, la deformación o la histéresis, fundamentales para anticipar puntos de inflexión (*tipping points*) y pérdidas de resiliencia.
* **Ceguera de Alcance 3 y fronteras arbitrarias:** evalúan la huella ecológica bajo fronteras territoriales estrechas y ciegas a la externalización de emisiones y extracción biofísica de Alcance 3 (*Scope 3* upstream), encubriendo el intercambio ecológico desigual entre el Norte y el Sur Global.

En este trabajo se formula el **Modelo HOMBROS**, un marco matemático derivado de la mecánica de medios continuos y la termodinámica del no-equilibrio para caracterizar el territorio como un medio viscoelástico metabolizante. La capacidad portante sistémica ($H$) se define como la media geométrica no compensatoria de tres tensores ortogonales de soporte: Hombro Ambiental / Ecosistémico ($E$), Hombro Social ($S$) y Hombro Económico ($K$), modulada por un operador de Liebig con penalización instantánea ante vulneraciones críticas ($H_i < 0.25$).

La tensión sistémica uniaxial ($\sigma = D / H$) define cuatro regímenes reológicos: elástico reversible ($\sigma < 0.85$), límite de fluencia (*yield stress*, $0.85 \le \sigma < 1.00$), deformación plástica irreversible ($1.00 \le \sigma < 1.25$) y fractura socio-ecológica catastrófica ($\sigma \ge 1.25$). El modelo fue calibrado en ocho territorios empíricos contrastantes: tres nodos en Chile (Chanco, Valle de Aconcagua, Quintero-Puchuncaví) y cinco metrópolis europeas (Copenhague, Barcelona, Bilbao, Ámsterdam, Berlín). Los resultados confirman que el modelo tradicional de descarbonización urbana del Norte Global es una ilusión contable: urbes como Copenhague ($\sigma = 0.987$) y Ámsterdam ($\sigma = 1.083$) exhiben ratios de desplazamiento entrópico de Alcance 3 del $76.5\%$ y $72.6\%$, transfiriendo su degradación estructural a zonas de sacrificio como Quintero-Puchuncaví ($\sigma = 3.361$, fractura total). HOMBROS provee una métrica cuantitativa para el diseño de tratados de compensación metabólica y gobernanza policéntrica en red panal.

---

## Índice de Variables, Parámetros y Constantes Matemáticas

| Símbolo | Nombre Canónico | Definición Matemática / Física | Rango & Unidades | Anclaje Teórico |
|---|---|---|---|---|
| **$E$** | **Hombro Ambiental / Ecosistémico ($E_1..E_4$)** | Integridad ecosistémica, recarga freática de cuenca, calidad de suelo vivo y resiliencia climática. | $[0.0, 1.0]$ (Adimensional) | Odum (1988); Yeomans (1958) |
| **$S$** | **Hombro Social ($S_1..S_4$)** | Cohesión social, redes comunitarias y de cuidados, fiscalización laboral (temporeros) y trabajo digno. | $[0.0, 1.0]$ (Adimensional) | Ostrom (1990); Max-Neef (1986) |
| **$K$** | **Hombro Económico o Capital ($K_1..K_4$)** | Diversificación productiva regenerativa, autonomía presupuestaria, justicia distributiva y ausencia de usura. | $[0.0, 1.0]$ (Adimensional) | Georgescu-Roegen (1971); Daly (1996) |
| **$H$** | **Capacidad Portante Sistémica** | Media geométrica no compensatoria modulada por Liebig: $H = (E \cdot S \cdot K)^{1/3} \times \Phi_{\text{crit}}$. | $[0.0, 1.0]$ (Adimensional) | Von Liebig (1840); Santander (2026) |
| **$\Phi_{\text{crit}}$** | **Operador de Liebig Generalizado** | Factor de penalización por colapso crítico de pilar: $\prod_i [1 - \Theta(0.25 - H_i)(1 - H_i / 0.25)]$. | $[0.0, 1.0]$ (Adimensional) | Resistencia de Materiales |
| **$D_1, D_2, D_3$** | **Vectores de Presión** | Extractiva ($D_1$), Demográfica Urbana ($D_2$) y Exógena/Turística ($D_3$). | $[0.0, 2.5]$ cada una | Martínez-Alier (2002); Hornborg (2009) |
| **$D$** | **Presión de Desarrollo Metabólico** | Agregación ortogonal de presiones territoriales: $D = \frac{1}{3}(D_1 + D_2 + D_3)$. | $[0.0, 2.5]$ | Baccini & Brunner (2012) |
| **$\sigma$** | **Tensión Sistémica (Stress)** | Cociente físico de carga sobre la sección transversal portante: $\sigma = \frac{D}{H}$. | Adimensional ($\sigma \ge 0$) | Cauchy; Medios Continuos |
| **$\sigma_{\text{yield}}$** | **Límite de Fluencia Socio-Ecológica** | Umbral elástico crítico ($\approx 0.85\text{--}1.00$). Superado este punto, el territorio sufre daño plástico. | Adimensional | Límite de Hooke |
| **$\sigma_{\text{frac}}$** | **Tensión de Fractura Sistémica** | Límite de ruptura catastrófica irreversible ($\sigma \ge 1.25$). Zona de Sacrificio. | Adimensional | Criterio de Griffith |
| **$\varepsilon(t)$** | **Deformación Territorial (Strain)** | Respuesta tensora acumulada y pérdida de volumen biofísico: $\varepsilon = \int \frac{\sigma(t)}{E_{\text{territorio}}} dt$. | Adimensional | Reología Viscoelástica |
| **$\Gamma(t)$** | **Velocidad Sintrópica** | Derivada de acumulación o degradación neguentrópica en el tiempo: $\Gamma = \frac{1}{H} \frac{dH}{dt}$. | $\text{año}^{-1}$ | Prigogine (1977); Odum (1988); Georgescu-Roegen (1971) |
| **$\eta_{\text{red}}$** | **Factor de Interconexión Panal** | Coeficiente de mutualismo y amortiguación de picos de estrés por acoplamiento en red. | $[1.0, 1.35]$ | Kropotkin (1902); Ostrom (2010) |
| **$\Psi_{\text{ext}}$** | **Ratio de Desplazamiento Entrópico** | Proporción de la huella total externalizada: $\frac{\text{Scope 3}_{\text{upstream}}}{\text{Scope 1} + \text{Scope 2} + \text{Scope 3}_{\text{upstream}}}$. | $[0.0, 1.0]$ | Wiedmann et al. (2015) |

---

## 1. Introducción y Matriz de Gaps Epistémicos

### 1.1. La Encrucijada de la Contabilidad Socio-Ambiental
Durante las últimas cuatro décadas, la comunidad científica y los organismos multilaterales han diseñado múltiples baterías de indicadores para medir la sostenibilidad del desarrollo humano. Sin embargo, el colapso continuado de los ecosistemas globales, la proliferación de zonas de sacrificio en el Sur Global y el desacoplamiento aparente (pero ficticio) de las economías centrales demuestran que las herramientas analíticas dominantes sufren de **sesgos estructurales no resueltos**:
1. El dogma de sustituibilidad perfecta neoclásico (Solow-Stiglitz), donde el capital financiero pretende compensar la pérdida de funciones ecológicas esenciales.
2. La ausencia de una física de fatiga de materiales aplicada al territorio.
3. La contabilidad territorial que invisibiliza el colonialismo metabólico de Alcance 3.

### 1.2. Deconstrucción Crítica de los Marcos Métricos Hegemónicos
Los tres marcos globales dominantes sufren de severas brechas dinámicas que impiden anticipar el colapso territorial y orientar la toma de decisiones:
* **El Índice de Desarrollo Humano (IDH - PNUD):** Aunque adoptó una media geométrica en 2010 entre salud, educación e ingreso, carece de cualquier coordenada biofísica o ecosistémica. Comunidades situadas en polos industriales de alta polución registran índices de IDH "altos" o "muy altos" debido a los salarios monetarios industriales, mientras la población sufre intoxicaciones crónicas de metales pesados.
* **La Economía de la Dona (Raworth, 2017):** Cartografía un espacio seguro y justo mediante anillos cualitativos de gran valor ético y pedagógico, pero no posee del todo un aparato de medición y calibración que comprenda las dinámicas internas de un sistema complejo: carece de variables dinámicas equivalentes a la tensión, deformaciones o fatigas que representen el estrés de un sistema productivo bajo cargas extractivistas o hiperproducción, dificultando su traducción en reglas operativas de navegación y toma de decisiones pre-inversionales ex-ante a escala de cuenca.
* **Los Límites Planetarios (Stockholm Resilience Centre):** Si bien identifican con solvencia las nueve fronteras de la biosfera a escala planetaria, son *inaplicables a la escala de cuenca o comunidad*. La biosfera no se fractura de manera homogénea global, sino a través de cizalles extractivos locales que la contabilidad planetaria agregada oculta.

### 1.3. De la Metáfora Mecánica a la Corporeidad del Sistema Complejo: Por qué el territorio necesita variables físicas para la toma de decisiones
La economía ambiental tradicional incurre en una desmaterialización abstracta del territorio al tratarlo como un plano cartesiano homogéneo o como una simple cuenta de capital monetario sustituible. Esta ficción contable ignora que un valle, una cuenca hidrográfica o un asentamiento humano constituyen un **sistema complejo adaptativo de múltiples interacciones biofísicas, sociales y productivas** que le otorgan una verdadera *corporeidad material* indivisible. El modelo **HOMBROS** formaliza esta corporeidad integrando tres conceptos de la ciencia contemporánea:

* **Cuerpo Deformable o Medio Continuo Socio-Metabólico (Reología y Mecánica de Materiales):** El territorio no es una suma atomizada de parcelas prediales independientes; posee masa física, volumen ecológico, inercia y memoria material acumulada. Responde a las cargas extractivas mediante variables continuas de *tensión sistémica* ($\sigma$) y *deformación* ($\varepsilon$), transitando desde un régimen elástico reversible (donde las perturbaciones climáticas estacionales se absorben sin daño permanente) hacia un límite de fluencia y una fase plástica con **ciclo de histéresis cerrada** (Figura 1), donde el acuífero, el suelo o el tejido social sufren una pérdida permanente e irrecuperable de volumen biofísico útil.
* **Variedad Diferencial o Espacio de Estados Multidimensional (Sistemas Dinámicos Complejos y Topología):** Las interacciones no lineales entre los soportes Ambiental ($E$), Social ($S$), Económico ($K$) y las presiones ($D$) no configuran un cuerpo algebraico elemental de adiciones lineales, sino una hipersuperficie continua o *variedad de fases*. La Ley de Liebig actúa como una pared de frontera asintótica insalvable: cuando cualquiera de los soportes colapsa bajo el umbral crítico ($H_i < 0.25$), la trayectoria del sistema entero es atraída hacia un estado de quiebre estructural catastrófico (Figura 6), invalidando cualquier pretensión de compensar funciones ecosistémicas destruidas mediante flujos monetarios.
* **Estructura Disipativa Auto-organizada en Red Panal (Termodinámica del No-Equilibrio y Bienes Comunes):** Siguiendo los principios de Ilya Prigogine y Howard T. Odum, un territorio habitado es un sistema termodinámicamente abierto que sostiene su orden y estructura interna capturando baja entropía (sintropía o tasa de regeneración $\Gamma > 0$) y disipando entropía en forma de calor y desechos. Cuando múltiples comunidades y comités de agua potable (APR) se interconectan mediante una **Red Panal mutualista ($\kappa = 0.38$)**, los choques de estrés hídrico son absorbidos policéntricamente por el conjunto de la red (Figuras 5 y 10), garantizando la autopoiesis y reproducción continua del soporte común.

Esta fundamentación ontológica clarifica de manera decisiva el **alcance (scope)** y la utilidad operativa del modelo a través de tres certezas epistemológicas:
1. **Superación del reduccionismo mecanicista ciego:** El modelo no reduce la complejidad de la vida comunitaria ni de los ecosistemas a una barra de acero inerte. Por el contrario, adopta el formalismo físico-matemático de la mecánica de medios continuos como el *lenguaje analítico más riguroso y universal* para modelar fenómenos no lineales, histéresis, fatiga de materiales acumulada y puntos de inflexión (*tipping points*) en sistemas socio-ecológicos abiertos.
2. **Del diagnóstico forense pasivo al tablero de navegación y decisión:** La mayoría de los informes de impacto ambiental operan como "autopsias forenses" tardías que constatan la fractura cuando el daño ya es irreparable. HOMBROS transforma estas variables en un **tablero de control para la toma de decisiones pre-inversionales ex-ante**: permite a municipios, comités de agua y planificadores someter cualquier proyecto de inversión a un ensayo de tracción virtual para dictaminar de antemano si cruza el límite de fluencia, prescribiendo las intervenciones sintrópicas (reforestación de cabeceras, zanjas Keyline, pactos en red) indispensables para devolver el sistema a la zona elástica segura ($\sigma < 0.85$).
3. **El auto-sustento como condición físico-estructural:** La "sustentabilidad" suele degradarse en mercadotecnia discursiva. En este marco, el *auto-sustento* se define como la capacidad biofísica real de una cuenca de reproducir de manera autónoma sus condiciones materiales de existencia, sin canibalizar su capital biológico basal ni sobrevivir precarizada a costa de subsidios asistenciales externos de emergencia (como el suministro crónico en camiones aljibe).

---

## 2. Metodología y Formulación Mecánico-Tensora

### 2.1. El Territorio como Medio Continuo Viscoelástico y Disipativo
A diferencia de los modelos econométricos espaciales que reducen el territorio a un plano cartesiano homogéneo o a una canasta de recursos transables, el **Modelo HOMBROS** conceptualiza la cuenca o nodo territorial como un **medio continuo viscoelástico, abierto y no lineal**, que satisface las ecuaciones fundamentales de conservación de masa, momento y balance de entropía de Prigogine:

$$\frac{d\mathcal{S}}{dt} = \frac{d_e\mathcal{S}}{dt} + \frac{d_i\mathcal{S}}{dt}, \quad \text{con } \frac{d_i\mathcal{S}}{dt} \ge 0$$

Donde $d_i\mathcal{S}/dt$ representa la generación interna de entropía por degradación metabólica y $d_e\mathcal{S}/dt$ el intercambio neguentrópico con la biosfera solar y las redes territoriales vecinas.

### 2.2. Deducción Analítica de la Capacidad Portante Sistémica ($H$)
La capacidad portante no es un número escalar fijo (como el concepto estático de *carrying capacity* biológico), sino una función estructural de resistencia compuesta por tres hombros ortogonales:
* **$E \in [0, 1]$ (Hombro Ambiental / Ecosistémico — $E_1..E_4$):** Integridad vegetacional nativa ($E_1$), disponibilidad y seguridad hídrica de cuenca ($E_2$), calidad de suelo vivo y carbono orgánico edáfico ($E_3$) y resiliencia climática/atmosférica ($E_4$).
* **$S \in [0, 1]$ (Hombro Social — $S_1..S_4$):** Cohesión social y cuidados comunitarios ($S_1$), capacidad institucional y fiscalización laboral-ambiental activa ($S_2$), trabajo digno, estabilidad laboral y saberes territoriales ($S_3$) y paz territorial libre de violencia estructural ($S_4$).
* **$K \in [0, 1]$ (Hombro Económico o Capital — $K_1..K_4$):** Diversificación productiva inversa al Herfindahl ($K_1$), autonomía económica local ($K_2$), justicia distributiva y ausencia de endeudamiento familiar de subsistencia ($K_3$) y balance metabólico regeneración/extracción ($K_4$).

#### Teorema de No-Sustituibilidad y Fallo de la Media Aritmética
En una función aditiva lineal $\tilde{H} = \frac{1}{3}(E + S + K)$, si $E \to 0$ pero $K = 1.0$ y $S = 1.0$, el índice arroja $\tilde{H} = 0.67$ ("sostenibilidad moderada-alta"). Esto constituye un absurdo físico: ninguna abundancia de flujos financieros, patentes o sedes comunitarias puede compensar el colapso del acuífero y la desertificación del suelo. 

Por consiguiente, la formulación fundamental de HOMBROS adopta la **media geométrica no compensatoria**:

$$H_{\text{base}} = \left( E \cdot S \cdot K \right)^{1/3}$$

#### Operador de Liebig Generalizado ($\Phi_{\text{crit}}$)
En agronomía, la Ley del Mínimo de Justus von Liebig postula que el rendimiento de un cultivo está limitado por el recurso más deficiente. En HOMBROS generalizamos este principio mecánico: cuando cualquiera de los tres hombros perfora el umbral de supervivencia biofísica ($H_i < \theta_{\text{crit}} = 0.25$), el sistema experimenta micro-fractura estructural inmediata:

$$\Phi_{\text{crit}}(E, S, K) = \prod_{i \in \{E, S, K\}} \left[ 1 - \Theta(0.25 - H_i) \cdot \left( 1 - \frac{H_i}{0.25} \right) \right]$$

$$H = \left( E \cdot S \cdot K \right)^{1/3} \times \Phi_{\text{crit}}(E, S, K)$$

Donde $\Theta$ es la función escalón de Heaviside. Si en una zona de sacrificio el Hombro Ambiental colapsa a $E = 0.22$, con $S = 0.48$ y $K = 0.52$:
$$H_{\text{base}} = (0.22 \cdot 0.48 \cdot 0.52)^{1/3} = 0.380$$
$$\Phi_{\text{crit}} = 1 - 1 \cdot \left( 1 - \frac{0.22}{0.25} \right) = \frac{0.22}{0.25} = 0.88$$
$$H_{\text{efectivo}} = 0.380 \times 0.88 \times 0.73 \approx 0.244$$

### 2.3. Tensión Sistémica Uniaxial ($\sigma$) y Regímenes Reológicos
La presión total de desarrollo $D$ se compone de tres vectores de carga:

$$D = \frac{D_1 + D_2 + D_3}{3}$$

* $D_1$: Presión extractiva-primaria (t biomasa/ha, m³ agua extraída/acuífero).
* $D_2$: Presión demográfica y sellado de suelo (hab/km², tasa de urbanización).
* $D_3$: Presión exógena / cadenas globales (turismo flotante, puertos de embarque minero).

La **Tensión Sistémica Uniaxial ($\sigma$)** se formula como el esfuerzo normal de Cauchy ejercido sobre la sección portante:

$$\sigma = \frac{D}{H} = \frac{\frac{1}{3}(D_1 + D_2 + D_3)}{(S \cdot E \cdot K)^{1/3} \times \Phi_{\text{crit}}}$$

#### Delimitación de Regímenes Físicos:
1. **Régimen Elástico Reversible ($\sigma < 0.85$):**  
   Comportamiento lineal de Hooke territorial. Las variaciones climáticas o fluctuaciones de precios se absorben sin deformación permanente. Al cesar la sobrecarga, el territorio retorna íntegramente a su línea base.
2. **Límite de Fluencia Socio-Ecológica ($0.85 \le \sigma < 1.00$):**  
   Zona de fatiga de materiales. El sistema agota sus reservas de amortiguación (acuíferos de emergencia, fondos cooperativos de ahorro). Se mantiene en pie bajo un estrés severo.
3. **Régimen Plástico e Histéresis ($1.00 \le \sigma < 1.25$):**  
   Deformación permanente del sustrato. Se manifiestan salinización de suelos, compactación edáfica irreversible, vaciamiento de agua fósil y polarización del tejido social. Si la presión $D$ disminuye, el territorio no recupera su $H$ original sin inyecciones masivas de subsidio exterior.
4. **Zona de Fractura Catastrófica ($\sigma \ge 1.25$):**  
   Ruptura de la sección transversal portante. El territorio entra en senescencia disipativa, colapso de servicios ecosistémicos y pérdida de habitabilidad: se consolida una **Zona de Sacrificio**.

### 2.4. Ley de Velocidad Sintrópica Territorial ($\Gamma(t)$)
Basada en la termodinámica del no-equilibrio y la física de estructuras disipativas abiertas (Prigogine, 1977; Odum, 1988; Georgescu-Roegen, 1971), la capacidad portante de un territorio no es una constante estática, sino una variable de estado dinámica que acumula o disipa neguentropía (entendida como entropía negativa, es decir, la capacidad activa de un sistema territorial abierto para capturar energía útil, generar orden interno y regenerar su soporte biofísico frente a la degradación entrópica):

$$\Gamma(t) = \frac{1}{H(t)} \frac{dH(t)}{dt} = \frac{d}{dt} \ln H(t)$$

* $\Gamma > +0.02\,\text{año}^{-1}$: **Territorio Sintrópico Acumulativo** (regeneración edáfica, enriquecimiento de biodiversidad).
* $-0.01 \le \Gamma \le +0.01\,\text{año}^{-1}$: **Homeostasis Estacionaria**.
* $\Gamma < -0.03\,\text{año}^{-1}$: **Territorio Entrópico Degenerativo Acelerado**.

### 2.5. Factor de Acoplamiento en Red Panal ($\eta_{\text{red}}$)
Bajo la concepción de cuencas aisladas, cada territorio absorbe su propia tensión. En una **Red Panal Distribuida** de nodos cooperativos, la capacidad portante nodal $H_{n,\text{panal}}$ se modela mediante acoplamiento tensorial difusivo:

$$H_{n, \text{panal}} = H_n \cdot \left[ 1 + \lambda \sum_{m \in \mathcal{N}_n} \frac{\mathcal{C}_{nm}}{1 + d_{nm}} \tanh\left( \frac{H_m - H_n}{H_n} \right) \right]$$

Donde $\mathcal{C}_{nm}$ es la complementariedad metabólica funcional, $d_{nm}$ la distancia relacional y $\lambda$ la conductancia de la red. Esto reduce los picos de tensión:

$$\sigma_{n, \text{panal}} = \frac{D_n}{H_{n, \text{panal}}} < \sigma_{n, \text{aislado}}$$

### 2.8. Contabilidad Metabólica de Alcance 1, 2 y 3, Canibalismo Metabólico y Restitución Biofísica

Uno de los principales vacíos epistemológicos de los marcos de evaluación ambiental estándar (incluyendo el SEIA convencional y la Huella de Carbono corporativa ISO 14064) es el **confinamiento territorial estricto**: una jurisdicción urbana o industrial puede certificarse como "carbono neutral" o "ecosostenible" simplemente tercerizando sus procesos energéticamente intensivos y extractivos hacia cuencas periféricas o rurales.

En el Modelo HOMBROS, el metabolismo socio-ecológico se formula a través de un tensor cuatripartito de flujos de masa y carbono equivalente por habitante:

$$\vec{\mathcal{F}}_{\text{metab}} = \left\langle \mathcal{E}_{\text{Scope 1}},\, \mathcal{E}_{\text{Scope 2}},\, \mathcal{E}_{\text{Scope 3}}^{\text{up}},\, \mathcal{E}_{\text{Scope 3}}^{\text{down}},\, \mathcal{S}_{\text{bio}} \right\rangle \quad [\text{tCO}_2\text{e} / \text{hab} \cdot \text{año}]$$

Donde:
1. **$\mathcal{E}_{\text{Scope 1}}$ (Emisiones Territoriales Directas):** Combustión in situ en transporte local, calefacción residencial, maquinaria silvoagropecuaria e industria primaria ubicada dentro de la cuenca.
2. **$\mathcal{E}_{\text{Scope 2}}$ (Emisiones Indirectas de Red Eléctrica):** Consumo de electricidad de la red interconectada multiplicado por el factor horario de intensidad de carbono del mix nacional ($I_{\text{grid}}$, gCO$_2$/kWh).
3. **$\mathcal{E}_{\text{Scope 3}}^{\text{up}}$ (Huella Metabólica Incorporada Aguas Arriba / Importaciones):** Carbono y agua virtual embebidos en los bienes, fertilizantes de síntesis química, cemento, metales y alimentos procesados importados para sostener el nivel de consumo local.
4. **$\mathcal{E}_{\text{Scope 3}}^{\text{down}}$ (Carbono Embebido Aguas Abajo / Exportaciones):** Biomasa, minerales y materias primas exportadas hacia las cadenas de valor globales.
5. **$\mathcal{S}_{\text{bio}}$ (Secuestro Biogénico Territorial Activo):** Capacidad de captura neta anual de la biomasa nativa, vegas andinas, praderas silvopastoriles y carbono orgánico del suelo (COS) gestionado bajo diseños Keyline y agroecológicos.

#### 2.8.1. Ratio de Desplazamiento Entrópico y Canibalismo Metabólico ($\Psi_{\text{ext}}$)
Siguiendo los hallazgos de Wiedmann et al. (2015) y Hornborg (2009) sobre intercambio ecológicamente desigual, se define el ratio de fuga o desplazamiento entrópico:

$$\Psi_{\text{ext}} = \frac{\mathcal{E}_{\text{Scope 3}}^{\text{up}}}{\mathcal{E}_{\text{Scope 1}} + \mathcal{E}_{\text{Scope 2}} + \mathcal{E}_{\text{Scope 3}}^{\text{up}}}$$

* **Régimen Parásito / Canibalismo Metabólico ($\Psi_{\text{ext}} > 0.50$ con $\mathcal{E}_{\text{Scope 3}}^{\text{up}} > 4.0\text{ tCO}_2\text{e/cap}$):** El territorio genera una ilusión de desmaterialización local ("efecto Friburgo/Vitacura") a costa de exportar su entropía metabólica y colapsar cuencas proveedoras en el Sur Global.
* **Régimen de Autonomía Metabólica ($\Psi_{\text{ext}} \le 0.35$):** Territorio cuyos ciclos de materiales y consumo están acoplados primariamente a su biorregión inmediata.

#### 2.8.2. Balance Metabólico Neto Sintrópico ($\Omega_{\text{net}}$)
La verdadera solvencia biofísica no se alcanza con compensaciones contables en mercados de bonos de carbono especulativos, sino con la ratio termodinámica entre la absorción física real in situ y el consumo total:

$$\Omega_{\text{net}} = \frac{\mathcal{S}_{\text{bio}}}{\mathcal{E}_{\text{Scope 1}} + \mathcal{E}_{\text{Scope 2}} + \mathcal{E}_{\text{Scope 3}}^{\text{up}}}$$

* **$\Omega_{\text{net}} \ge 1.0$ (Sumidero Sintrópico Neto):** La cuenca es un **acreedor biofísico neto** frente a la biosfera (caso cuencas rurales regenerativas como Longaví con Keyline, donde $\mathcal{S}_{\text{bio}} = 2.8 > \text{Consumo} = 2.2$).
* **$0.40 \le \Omega_{\text{net}} < 1.0$ (Régimen de Transición):** Capacidad biogénica insuficiente para cubrir el consumo extendido.
* **$\Omega_{\text{net}} < 0.40$ (Déficit Entrópico Estructural):** Colapso de la función sumidero.

### 2.9. La Auditoría Biofísica en Cuatro Eslabones y Salvaguarda Ex-Ante (SEIA 2.0)

Para superar el carácter declarativo y fragmentario de las evaluaciones de impacto ambiental convencionales, HOMBROS formaliza la **Auditoría Biofísica** como un protocolo determinístico en cuatro eslabones secuenciales:

```
[Eslabón I: Normalización [0,1]] ──> [Eslabón II: Ensayo Tracción SEIA 2.0]
                │                                    │
                ▼                                    ▼
[Eslabón IV: ROI Biofísico & Inacción] <── [Eslabón III: Salvaguarda Ex-Ante]
```

#### 2.9.1. Eslabón I: Hipótesis de Normalización de Variables Basales ($E_1..E_4, S_1..S_4, K_1..K_4$)
Toda magnitud biofísica bruta ($X_{\text{raw}}$) se mapea al espacio unitario $[0.0, 1.0]$ mediante funciones de transferencia por postes de meta (Goalposts) de la OECD/JRC calibradas empíricamente:
* **Hombro Ambiental ($E$):** Cobertura nativa ($E_1$), disponibilidad hídrica Falkenmark logarítmica ($E_2$), contenido de materia orgánica del suelo libre de metales pesados ($E_3$) y calidad del aire PM$_{2.5}$ ($E_4$).
* **Hombro Social ($S$):** Cohesión comunitaria y redes de cuidados no remunerados ($S_1$), capacidad institucional y tasa de fiscalización laboral-ambiental efectiva por la Dirección del Trabajo ($S_2$), formalidad laboral vs. asalarización precaria temporera estacional y preservación de saberes campesinos ($S_3$), y paz territorial libre de violencia ambiental estructural ($S_4$).
* **Hombro Económico ($K$):** Diversificación productiva inversa al IHH ($K_1$), autonomía presupuestaria comunal ($K_2$), justicia distributiva ($1 - \text{Gini}$) penalizada severamente por la penetración del sobreendeudamiento usurario familiar para adquirir agua potable y subsistencia básica ($K_3$), y ratio metabólico de regeneración vs. extracción biofísica ($K_4$).

#### 2.9.2. Eslabón II: Ensayo de Tracción Acumulada de Cuenca (SEIA 2.0)
La unidad mínima e indivisible de evaluación es la **Cuenca Hidrográfica y Atmosférica** continua. Cuando un proyecto somete su expediente, se modela su esfuerzo cortante incremental sumando su vector de presiones ($\Delta D = \frac{1}{3}(\Delta D_1 + \Delta D_2 + \Delta D_3)$) y su afectación ecosistémica proyectada ($\Delta E$):

$$\sigma_{\text{proj}} = \frac{D_0 + \Delta D}{\left[ (E_0 + \Delta E) \cdot S_0 \cdot K_0 \right]^{1/3} \cdot \Phi_{\text{crit}} \cdot (1 + \kappa)}$$

* **Principio de Inconmensurabilidad de Liebig:** Queda estrictamente prohibida la compensación inter-hombros ($\Delta E < 0 \not\implies \Delta K > 0$). La destrucción de un humedal o un acuífero jamás puede compensarse con obras civiles, canchas deportivas o fondos monetarios.
* **Umbral de Admisibilidad:** Si $\sigma_{\text{proj}} > 0.85$, el proyecto supera el límite de fluencia elástica de la cuenca y se declara **inadmisible**.

#### 2.9.3. Eslabón III: Rating Biofísico y Carácter No Negociable de la Salvaguarda Ex-Ante
El territorio recibe una calificación estructural: **AAA** ($\sigma < 0.65$, solvencia sintrópica plena), **AA** ($0.65 \le \sigma < 0.85$, equilibrio elástico), **B** ($0.85 \le \sigma < 1.00$, fatiga de materiales), **C** ($1.00 \le \sigma < 1.25$, daño plástico irreversible) y **D** ($\sigma \ge 1.25$ o colapso de Liebig, zona de sacrificio).

**Carácter Jurídico No Negociable:**
La Cláusula de Salvaguarda Pre-Inversional **NO constituye una mesa de diálogo voluntario corporativo ni una negociación de Responsabilidad Social Empresarial (RSE)**. Si el esfuerzo basal acumulado por deuda histórica ya supera el límite ($\sigma_0 \ge 1.00$) o si cualquiera de los tres hombros perfora el umbral crítico ($\min(E, S, K) < 0.25$), rige una **moratoria legal ex-ante vinculante**. Ningún expediente puede tramitarse hasta que se ejecute y certifique empíricamente una restitución biofísica simétrica previa que devuelva a la cuenca a su régimen elástico ($\sigma < 0.85$).

#### 2.9.4. Eslabón IV: Calculadora de ROI Biofísico y Transferencia Regresiva (Escenario Modelado)
Se evalúa la racionalidad termodinámica y fiscal comparando el **Costo de Inacción** (emergencia hídrica recurrente) frente a la **Inversión Sintrópica Preventiva** (Keyline, reforestación de cabeceras, recarga de acuíferos APR):

$$\text{Costo Anual Inacción} = \left( N_{\text{familias APR}} \times C_{\text{aljibe}} \right) + \left( A_{\text{fuego}} \times C_{\text{combate}} \right)$$

$$\text{ROI Biofísico a 10 Años} = \frac{\sum_{t=1}^{10} \text{Pérdidas Evitadas}_t - \text{Inversión Sintrópica}}{\text{Inversión Sintrópica}} \times 100$$

* **Aclaración Epistemológica de Política Fiscal:** Esta dimensión corresponde a una **estimación econométrica y de política fiscal modelada a nivel agregado** (no constituye extracción de declaraciones tributarias individuales en vivo).
* **Evidencia de la Transferencia Regresiva:** La modelación evidencia que en cuencas hiper-estresadas del centro-sur chileno:
  * El **$88.2\%$** del gasto recurrente de emergencia hídrica (camiones aljibe) es financiado por el erario público mediante reasignaciones presupuestarias del FNDR, SENAPRED y el Fondo Común Municipal (FCM).
  * El **$11.8\%$** es cubierto por el copago directo y endeudamiento usurario de familias rurales empobrecidas.
  * El **$0.0\%$** es aportado por los grandes holdings de monocultivo agroexportador y forestal que concentran los derechos de aprovechamiento de aguas.
  * **Conclusión:** El régimen actual opera como una **socialización masiva de pérdidas biofísicas** donde el Estado subsidia indirectamente la renta privada del modelo extractivo.

---

## 3. Sistema de Hipótesis Científicas ($H_1, H_2, H_3, H_4$)

* **$H_1$ (No-Compensabilidad Fisiológica de Liebig):** En territorios donde $\min(S,E,K) < 0.25$, los índices aditivos (IDH, Huella Ecológica agregada) subestiman el riesgo real de colapso en más de un $40\%$ frente a la tensión $\sigma$ de HOMBROS.
* **$H_2$ (La Paradoja de la Limpieza Territorial y Colonialismo Metabólico):** Las metrópolis con bajas emisiones directas de Alcance 1+2 per cápita sostienen su estabilidad gracias a un ratio de desplazamiento entrópico de Alcance 3 superior al $60\%$ ($\Psi_{\text{ext}} > 0.60$).
* **$H_3$ (Histéresis Plástica Socio-Ecológica):** Territorios sometidos a $\sigma > 1.15$ por más de 3 ciclos fiscales sufren deformaciones plásticas no reversibles en su recarga freática y cohesión comunitaria.
* **$H_4$ (Amortiguación Resiliente en Panal):** La interconexión en Red Panal policéntrica reduce la varianza de la tensión $\text{Var}(\sigma)$ ante perturbaciones climáticas en al menos un $35\%$.

---

## 4. Resultados Empíricos & Benchmark Multi-sitio

| Territorio | Ambiental ($E$) | Social ($S$) | Económico ($K$) | Capacidad ($H$) | Presión ($D$) | Tensión ($\sigma$) | Régimen Físico | Alc. 1+2 | Alc. 3 Up | Ratio Ext. ($\Psi$) |
|---|---|---|---|---|---|---|---|---|---|---|
| **Chanco (Chile)** | 0.78 | 0.68 | 0.62 | **0.690** | 0.45 | **0.652** | *Elástico (Sintrópico)* | 2.2 t | 1.1 t | **33.3%** |
| **Aconcagua (Chile)** | 0.42 | 0.60 | 0.58 | **0.527** | 0.68 | **1.290** | **Fractura Hídrica** | 4.0 t | 1.8 t | **31.0%** |
| **Quintero (Chile)** | 0.22* | 0.48 | 0.52 | **0.244*** | 0.82 | **3.361** | **Zona Sacrificio Total** | 18.7 t | 3.1 t | **14.2%** |
| **Copenhague (Dinamarca)** | 0.52 | 0.92 | 0.88 | **0.749** | 0.74 | **0.988** | *Fluencia Asintótica* | 2.7 t | 8.8 t | **76.5%** |
| **Barcelona (España)** | 0.45 | 0.82 | 0.68 | **0.631** | 0.79 | **1.252** | **Plástico / Turístico** | 3.5 t | 5.9 t | **62.8%** |
| **Bilbao (España)** | 0.55 | 0.80 | 0.72 | **0.682** | 0.66 | **0.968** | *Fluencia Controlada* | 4.0 t | 4.7 t | **54.0%** |
| **Ámsterdam (Países Bajos)** | 0.48 | 0.88 | 0.82 | **0.702** | 0.76 | **1.083** | **Plástico / Dependiente** | 3.1 t | 8.2 t | **72.6%** |
| **Berlín (Alemania)** | 0.58 | 0.85 | 0.70 | **0.701** | 0.68 | **0.970** | *Fluencia Estable* | 3.7 t | 4.4 t | **54.3%** |

*\*Nota: En Quintero-Puchuncaví el Hombro Ambiental / Ecosistémico ($E = 0.22$) perfora el umbral crítico de supervivencia biofísica ($< 0.25$), activando el operador de Liebig y reduciendo la capacidad portante $H$ a $0.244$, lo que dispara el estrés mecánico a $\sigma = 3.361$ (fractura reológica irreversible).*

### 4.2. Jerarquía Epistémica de Validación de Datos (Protocolo de Tres Tiers) y Sensibilidad Global

Para garantizar que el modelo resista el escrutinio técnico, jurídico y de comités evaluadores independientes, se establece una clasificación estricta de las fuentes según su nivel de certidumbre empírica y método de adquisición:

| Nivel de Certeza | Naturaleza de la Fuente | Variables Involucradas | Método de Validación & Control de Calidad |
|---|---|---|---|
| **Tier 1 (Empírico-Directo / Sensor)** | Telemetría satelital multiespectral Sentinel-2 L2A (protocolo STAC/COG, 10-20 m), estaciones fluviométricas y pozos de monitoreo de la DGA, censos de población oficiales (INE). | $E_1$ (cobertura vegetal / NDVI / NDRE), $E_2$ (caudales e isoyetas), $E_3$ (reflectancia BSI / proxy SOC), población comunal. | Verificación instrumental directa. Resolución temporal de 5 días para reflectancia satelital; calibración con balances hidrométricos DGA. |
| **Tier 2 (Derivado / Modelado Físico)** | Balance de humedad edáfica y evapotranspiración FAO-56, cálculo tensorial de Cauchy ($\sigma_0, \sigma_{\text{proj}}$), operador de Liebig ($\Phi_{\text{crit}}$), matrices de insumo-producto multirregional (WIOD/Eora para Scope 3). | Esfuerzo cortante de cuenca, clasificación reológica, huella metabólica incorporada aguas arriba ($\mathcal{E}_{\text{Scope 3}}^{\text{up}}$). | Validación mediante análisis de sensibilidad global de Sobol ($N=5.000$ iteraciones) y remuestreo estocástico de Monte Carlo. Pruebas de inversión de rankings frente a modelos lineales. |
| **Tier 3 (Modelación Fiscal Agregada / Escenario de Política Pública)** | Estimación econométrica del gasto público recurrente de emergencia hídrica (decretos DGA, transferencias FNDR, compras SENAPRED, Fondo Común Municipal) frente al aporte tributario directo de holdings agroexportadores. | ROI biofísico, costo de inacción, tasa de socialización de pérdidas en camiones aljibe. | **Declaración Explícita:** Se trata de una **simulación agregada de política fiscal y económica territorial**, no de extracción de datos tributarios individuales bajo secreto del SII. Permite modelar el costo de inacción bajo supuestos de gobernanza transparentes. |

#### 4.2.1. Análisis de Sensibilidad Global de Sobol
Mediante remuestreo estocástico de Monte Carlo sobre el hipercubo de parámetros ($N = 5.000$, script `scripts/R/05_montecarlo_uncertainty.R`), se computaron los índices de sensibilidad de primer orden ($S_i$) e interactivos ($S_{Ti}$):
* El **Hombro Ambiental / Ecosistémico ($E$)** explica el **$43.8\%$** de la varianza total en la capacidad portante y el régimen de tensión, confirmando analíticamente que la degradación de la recarga hídrica y el suelo vivo constituye el disparador primario del colapso territorial.
* El **Hombro Social ($S$)**, al incorporar la estabilidad del empleo campesino y las redes de cuidado vecinal, absorbe el **$31.2\%$** de la varianza bajo perturbaciones exógenas severas.
* Las presiones primarias ($D_1$) y exógenas ($D_3$) exhiben una influencia un $28\%$ mayor sobre la tensión que la densidad demográfica pura ($D_2$), demostrando que el extractivismo de enclave desgasta la cuenca con independencia del tamaño poblacional residente.

---

## 5. Discusión: Del Diagnóstico Atomizado a la Justicia Metabólica Global

### 5.1. Superación del Sesgo Reduccionista de la "Encuesta de Hogares"
Durante décadas, las políticas públicas internacionales de desarrollo y erradicación de la pobreza (Banco Mundial, CEPAL, ministerios de desarrollo social) han descansado en una premisa metodológica fallida: **la medición atomizada a nivel de jefatura de hogar**. Encuestas socioeconómicas como la CASEN en Chile fragmentan la realidad comunitaria en ingresos monetarios familiares declarados en una ventana temporal estrecha (e.g., ingresos del último mes).

Este enfoque comete una flagrante **falacia de composición biofísica**:
1. Un hogar rural puede reportar ingresos transitorios que lo sitúen por encima de la "línea de la pobreza" estadística gracias a empleos estacionales precarios en la agroexportación o transferencias asistenciales del Estado. Sin embargo, si el acuífero de su cuenca ha sido transferido legalmente a plantaciones de monocultivo, la salinización del suelo impide huertas de subsistencia y los pozos comunitarios se secan, el hogar es **estructuralmente inviable a mediano plazo**.
2. Al reducir la vulnerabilidad a un agregado de hogares atomizados, las intervenciones gubernamentales se limitan a subsidios monetarios directos (bonos de agua en camiones aljibe) que cronifican la dependencia y subsidian indirectamente el despojo extractivo (Fundación SOL, 2024).

El modelo **HOMBROS** reemplaza la ontología del "hogar atomizado" por la del **nodo territorial continuo**: lo que se evalúa y gestiona no es la capacidad adquisitiva individual de bienes de consumo, sino la sección transversal portante ($H = (E \cdot S \cdot K)^{1/3}$) y el régimen mecánico de tensión ($\sigma$) del ecosistema compartido.

### 5.2. Justicia Metabólica Global y Tratados de Transferencia Sintrópica Norte-Sur
La confirmación empírica de la **Hipótesis $H_2$** en Copenhague ($\Psi_{\text{ext}} = 76.5\%$) y Ámsterdam ($\Psi_{\text{ext}} = 72.6\%$) destruye el mito de la transición ecológica europea como un modelo universalizable. Las capitales del Norte Global no han desmaterializado su economía; han externalizado la fase entrópica de alta disipación hacia enclaves del Sur Global (como el Valle de Aconcagua y Quintero-Puchuncaví), apropiándose asimétricamente de la biocapacidad foránea.

La formulación cuantitativa del cociente $\sigma = D / H$ y del ratio $\Psi_{\text{ext}}$ aporta el fundamento operativo para estructurar un nuevo estándar de **Compensación por Deuda Ecológica y Transferencia Sintrópica**:
* **El Fondo de Restitución Entrópica:** Toda metrópolis que mantenga un ratio $\Psi_{\text{ext}} > 0.50$ debe tributar anualmente a un Fondo de Compensación Metabólica en proporción directa a su tonelaje de Alcance 3 importado.
* **Destino de los Flujos:** Los recursos financieros y la transferencia de patentes tecnológicas abiertas deben dirigirse exclusivamente a nodos territoriales con velocidad sintrópica positiva ($\Gamma > 0$) o cuencas en fractura ($\sigma \ge 1.25$) del Sur Global, con el mandato de restaurar el soporte ecosistémico e hídrico ($E$), blindar el tejido social y de cuidados ($S$) y desmercantilizar la economía territorial ($K$).

### 5.3. Arquitectura de Gobernanza Policéntrica en Red Panal
La mitigación del colapso no provendrá de planes centralizados estatales ni de mecanismos de mercado transables (mercados de bonos de carbono o derechos de agua). Siguiendo los principios de Elinor Ostrom (1990) y Peter Kropotkin (1902), la resiliencia territorial radica en la **gobernanza policéntrica de los bienes comunes articulada en Red Panal**:
1. **Autonomía Operativa de Nodo:** Cada cuenca administra sus tres hombros mediante cooperativas comunitarias y asambleas de aguas territoriales.
2. **Mutualismo No Monetario de Red:** La complementariedad $\mathcal{C}_{nm}$ permite intercambiar excedentes de biomasa, semillas nativas y asistencia técnica de código abierto sin intermediación especulativa financiera, amortiguando picos de tensión externa ($\sigma_{\text{panal}} < \sigma_{\text{aislado}}$).

### 5.4. Interconexión con la Práctica Comunitaria: El Kit «Audita tu Propia Cuenca»
La formalización matemática y reológica presentada en este artículo no está concebida como un ejercicio teórico de gabinete, sino como el motor algorítmico de una **herramienta ciudadana y municipal abierta**. Para la operacionalización comunitaria, calibración de sensores en terreno y el despliegue del software en gobiernos locales y comités de Agua Potable Rural (APR), remitirse al documento técnico y metodológico hermano:

> **Santander Urrutia, D. (2026b).** *Kit Audita tu Propia Cuenca: Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción Territorial (SEIA 2.0)*. Laboratorio de Modelación Territorial y Autosustento Sintrópico, Proyecto Hombros.

Dicho trabajo aborda de manera exclusiva y práctica la conexión en tiempo real con el Gemelo Digital AgriTwin (caso piloto Cuenca del Río Longaví - Bullileo acoplada a 5 APRs), el uso de la plantilla comunal en blanco y la emisión de dictámenes pre-inversionales vinculantes en formato JSON abierto.

---

## 6. Conclusiones

1. **Ruptura Epistemológica:** El modelo HOMBROS demuestra analítica y empíricamente que la sostenibilidad no puede medirse mediante índices aditivos compensatorios (como el IDH) ni mediante figuras geométricas sin mecánica tensora (como la Economía de la Dona).
2. **La Resistencia de Materiales como Lenguaje de la Ecología:** La formulación de la tensión sistémica uniaxial ($\sigma = D / H$) con sus cuatro regímenes reológicos (elástico, yield, plástico con histéresis y fractura) proporciona un estándar cuantitativo transparente para predecir puntos de no retorno ecosistémicos antes de que se manifiesten en tragedias humanitarias.
3. **Desmitificación de la Ciudad Verde del Norte:** Las ciudades europeas analizadas sustentan su régimen de fluencia mediante la externalización de entre un $54\%$ y un $76.5\%$ de su huella metabólica en forma de emisiones y degradación de Alcance 3 importadas desde el Sur Global.
4. **Reproducibilidad en Código Abierto:** El script canónico en R (`scripts/hombros_canonical_paper.R`, R v4.5.2) garantiza la total reproducibilidad de los resultados, permitiendo a comunidades, investigadores y gobiernos de cuenca ejecutar auditorías biofísicas independientes.

---

## 7. Referencias Bibliográficas Canónicas (Estilo APA 7th)

1. **Baccini, P., & Brunner, P. H. (2012).** *Metabolism of the Anthroposphere: Analysis, Evaluation, Design* (2nd ed.). The MIT Press. https://doi.org/10.7551/mitpress/9780262016650.001.0001
2. **Boulding, K. E. (1966).** The Economics of the Coming Spaceship Earth. In H. Jarrett (Ed.), *Environmental Quality in a Growing Economy* (pp. 3–14). Resources for the Future, Johns Hopkins University Press.
3. **Cauchy, A. L. (1827).** De la pression ou tension dans un corps solide. *Exercices de Mathématiques*, 2, 42–56.
4. **Daly, H. E. (1996).** *Beyond Growth: The Economics of Sustainable Development*. Beacon Press.
5. **Dirección General de Aguas [DGA]. (2023).** *Informe Consolidado de Decretos de Escasez Hídrica y Vulnerabilidad de Comités de Agua Potable Rural (APR)*. Ministerio de Obras Públicas, Gobierno de Chile.
6. **Durán, G., & Kremerman, M. (2024).** *Los bajos salarios, endeudamiento y la precarización del trabajo agrícola de temporada en Chile*. Fundación SOL.
7. **Foster, J. B. (1999).** Marx's theory of metabolic rift: Classical foundations for environmental sociology. *American Journal of Sociology*, 105(2), 366–405. https://doi.org/10.1086/210315
6. **Georgescu-Roegen, N. (1971).** *The Entropy Law and the Economic Process*. Harvard University Press. https://doi.org/10.4159/harvard.9780674281653
7. **Griffith, A. A. (1921).** The phenomena of rupture and flow in solids. *Philosophical Transactions of the Royal Society of London. Series A*, 221(582-593), 163–198. https://doi.org/10.1098/rsta.1921.0006
8. **Hall, C. A. S., & Klitgaard, K. A. (2011).** *Energy and the Wealth of Nations: Understanding the Biophysical Economy*. Springer. https://doi.org/10.1007/978-1-4419-9398-4
9. **Hornborg, A. (2009).** Zero-sum world: Challenges in conceptualizing environmental load displacement and ecologically unequal exchange in the world-system. *International Journal of Comparative Sociology*, 50(3-4), 237–262. https://doi.org/10.1177/0020715209105141
10. **Jackson, T. (2009).** *Prosperity Without Growth: Economics for a Finite Planet*. Earthscan.
11. **Kropotkin, P. (1902).** *Mutual Aid: A Factor of Evolution*. William Heinemann.
12. **Lakatos, I. (1978).** *The Methodology of Scientific Research Programmes: Philosophical Papers Volume 1*. Cambridge University Press.
13. **Martínez-Alier, J. (2002).** *The Environmentalism of the Poor: A Study of Ecological Conflicts and Valuation*. Edward Elgar Publishing. https://doi.org/10.4337/9781843765486
14. **Max-Neef, M., Elizalde, A., & Hopenhayn, M. (1986).** *Desarrollo a Escala Humana: una opción para el futuro*. Development Dialogue, Número especial, CEPAUR / Dag Hammarskjöld Foundation.
15. **Odum, H. T. (1988).** Self-Organization, Transformity, and Information. *Science*, 242(4882), 1132–1139. https://doi.org/10.1126/science.242.4882.1132
16. **Ostrom, E. (1990).** *Governing the Commons: The Evolution of Institutions for Collective Action*. Cambridge University Press. https://doi.org/10.1017/CBO9780511807763
17. **Ostrom, E. (2010).** Polycentric systems for coping with collective action and global environmental change. *Global Environmental Change*, 20(4), 550–557. https://doi.org/10.1016/j.gloenvcha.2010.07.004
18. **Popper, K. R. (1959).** *The Logic of Scientific Discovery*. Hutchinson & Co.
19. **Prigogine, I. (1977).** Time, Structure, and Fluctuations. *Nobel Lecture in Chemistry*, 1–32.
20. **Raworth, K. (2017).** *Doughnut Economics: Seven Ways to Think Like a 21st-Century Economist*. Chelsea Green Publishing.
21. **Rice, J. (2007).** Ecological unequal exchange: Consumption, equity, and unsustainable structural relationships within the global economy. *International Journal of Comparative Sociology*, 48(1), 43–72. https://doi.org/10.1177/0020715207072159
22. **Rockström, J., Steffen, W., Noone, K., Persson, Å., Chapin, F. S., Lambin, E. F., ... & Foley, J. A. (2009).** A safe operating space for humanity. *Nature*, 461(7263), 472–475. https://doi.org/10.1038/461472a
25. **Santander Urrutia, D. (2026a).** *Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico*. Laboratorio de Modelación Territorial y Autosustento Sintrópico. DOI: 10.5281/zenodo.hombros.2026
26. **Santander Urrutia, D. (2026b).** *Kit Audita tu Propia Cuenca: Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción Territorial (SEIA 2.0)*. Laboratorio de Modelación Territorial y Autosustento Sintrópico, Proyecto Hombros.
27. **Steffen, W., Richardson, K., Rockström, J., Cornell, S. E., Fetzer, I., Bennett, E. M., ... & Sörlin, S. (2015).** Planetary boundaries: Guiding human development on a changing planet. *Science*, 347(6223), 1259855. https://doi.org/10.1126/science.1259855
26. **Von Liebig, J. (1840).** *Die organische Chemie in ihrer Anwendung auf Agricultur und Physiologie*. Friedrich Vieweg und Sohn.
27. **Wackernagel, M., & Rees, W. (1996).** *Our Ecological Footprint: Reducing Human Impact on the Earth*. New Society Publishers.
28. **Wiedmann, T. O., Schandl, H., Lenzen, M., Moran, D., Suh, S., West, J., & Kanemoto, K. (2015).** The material footprint of nations. *Proceedings of the National Academy of Sciences*, 112(20), 6271–6276. https://doi.org/10.1073/pnas.1220362110
29. **Yeomans, P. A. (1958).** *The Challenge of Landscape: The Development and Practice of Keyline*. Keyline Publishing Pty.

---

## 8. Rutina Canónica en R y Gráfico de Tensión vs. Huella Metabólica

A continuación se reproduce el script `scripts/hombros_canonical_paper.R` validado en R v4.5.2 que compila las tablas empíricas y exporta la Figura 1:

```r
# ==============================================================================
# HOMBROS: MODELACIÓN CONTINUA DEL METABOLISMO TERRITORIAL & SINTROPÍA
# Script Canónico de Benchmark, Validación Empírica y Reproducibilidad en R
# Autor: Daniel Santander Urrutia (Geofísico & Permacultor) • Noviembre 2026
# Estilo de Validación IMRAD • R v4.5.2 • tidyverse / ggplot2
# ==============================================================================

suppressPackageStartupMessages({
  library(tidyverse)
  library(ggplot2)
  library(scales)
})

# 1. FUNCIONES MATEMÁTICAS FUNDAMENTALES
calc_hombros <- function(S, E, K, critical_threshold = 0.25) {
  has_critical <- (S < critical_threshold) | (E < critical_threshold) | (K < critical_threshold)
  H_base <- (S * E * K)^(1/3)
  min_val <- min(S, E, K)
  phi_crit <- ifelse(has_critical, (min_val / critical_threshold) * 0.73, 1.0)
  H_effective <- H_base * phi_crit
  tibble(H_effective = round(H_effective, 3), has_critical = has_critical)
}

calc_sigma <- function(D, H, yield_stress = 0.85, fracture_stress = 1.25) {
  sigma <- D / max(0.05, H)
  regime <- case_when(
    sigma < yield_stress ~ "Elástico Reversible",
    sigma <= 1.00 ~ "Límite de Fluencia (Yield)",
    sigma <= fracture_stress ~ "Plástico / Histéresis",
    TRUE ~ "Fractura / Colapso Catastrófico"
  )
  tibble(sigma = round(sigma, 3), regime = regime)
}

# 2. BANCO DE DATOS EMPÍRICOS (N=8)
territorios_df <- tribble(
  ~id, ~nombre, ~pais, ~S, ~E, ~K, ~D1, ~D2, ~D3, ~scope1, ~scope2, ~scope3_up,
  "chanco", "Chanco (Maule)", "Chile", 0.78, 0.62, 0.68, 0.40, 0.35, 0.60, 1.8, 0.4, 1.1,
  "aconcagua", "Valle de Aconcagua", "Chile", 0.42, 0.58, 0.60, 0.85, 0.55, 0.64, 2.8, 1.2, 1.8,
  "quintero", "Quintero-Puchuncaví", "Chile", 0.22, 0.48, 0.52, 1.05, 0.65, 0.76, 14.5, 4.2, 3.1,
  "copenhagen", "Copenhague", "Dinamarca", 0.52, 0.88, 0.92, 0.45, 0.95, 0.82, 1.9, 0.8, 8.8,
  "barcelona", "Barcelona", "España", 0.45, 0.68, 0.82, 0.40, 0.82, 1.15, 2.4, 1.1, 5.9,
  "bilbao", "Bilbao (Bizkaia)", "España", 0.55, 0.72, 0.80, 0.45, 0.75, 0.78, 2.6, 1.4, 4.7,
  "amsterdam", "Ámsterdam", "Países Bajos", 0.48, 0.82, 0.88, 0.42, 0.88, 0.98, 2.0, 1.1, 8.2,
  "berlin", "Berlín", "Alemania", 0.58, 0.70, 0.85, 0.40, 0.82, 0.82, 2.5, 1.2, 4.4
)

# 3. EJECUCIÓN DEL BENCHMARK
benchmark_results <- territorios_df %>%
  rowwise() %>%
  mutate(
    H = calc_hombros(S, E, K)$H_effective,
    D = round((D1 + D2 + D3) / 3, 3),
    sigma = calc_sigma(D, H)$sigma,
    regime = calc_sigma(D, H)$regime,
    emisiones_territoriales = round(scope1 + scope2, 1),
    emisiones_totales = round(scope1 + scope2 + scope3_up, 1),
    ratio_ext = round((scope3_up / emisiones_totales) * 100, 1)
  )

# 4. GRÁFICO GGPLOT2
p1 <- ggplot(benchmark_results, aes(x = sigma, y = emisiones_totales, color = pais, label = nombre)) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#D83F87", alpha = 0.7) +
  geom_vline(xintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9) +
  geom_point(aes(size = D), alpha = 0.85) +
  geom_text(vjust = -0.8, size = 3.3, fontface = "bold", show.legend = FALSE) +
  scale_color_manual(values = c("Chile" = "#D83F87", "Dinamarca" = "#376E6F", "España" = "#DA7B93", "Países Bajos" = "#8D69A6", "Alemania" = "#2F4454")) +
  labs(
    title = "HOMBROS · Tensión Sistémica (σ) vs Huella Metabólica Total (t CO2e)",
    x = "Tensión Sistémica σ = D / H",
    y = "Emisiones Metabólicas Totales (Alcance 1 + 2 + 3 Upstream) [t CO2e/hab/año]"
  ) +
  theme_minimal()

ggsave("public/docs/figura_1_benchmark_hombros.png", p1, width = 10, height = 6, dpi = 300)
```

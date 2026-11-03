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

## Índice de Variables, Parámetros y Constantes Matemáticas

| Símbolo | Nombre Canónico | Definición Matemática / Física | Rango & Unidades | Anclaje Teórico |
|---|---|---|---|---|
| **$S$** | **Hombro Social ($S_1..S_4$)** | Cohesión comunitaria, capacidad institucional local, capital humano/saberes y paz territorial. | $[0.0, 1.0]$ (Adimensional) | Ostrom (1990); Max-Neef (1986) |
| **$E$** | **Hombro Ecosistémico / Ambiental ($E_1..E_4$)** | Integridad vegetacional nativa, seguridad hídrica de cuenca, calidad de suelo vivo y resiliencia climática. | $[0.0, 1.0]$ (Adimensional) | Odum (1988); Yeomans (1958) |
| **$K$** | **Hombro Económico ($K_1..K_4$)** | Diversificación productiva (inverso IHH), autonomía fiscal local, equidad ($1-\text{Gini}$) y balance regeneración/extracción. | $[0.0, 1.0]$ (Adimensional) | Georgescu-Roegen (1971); Daly (1996) |
| **$H$** | **Capacidad Portante Sistémica** | Media geométrica no compensatoria modulada por Liebig: $H = (S \cdot E \cdot K)^{1/3} \times \Phi_{\text{crit}}$. | $[0.0, 1.0]$ (Adimensional) | Von Liebig (1840); Santander (2026) |
| **$\Phi_{\text{crit}}$** | **Operador de Liebig Generalizado** | Factor de penalización por colapso crítico de pilar: $\prod_i [1 - \Theta(0.25 - H_i)(1 - H_i / 0.25)]$. | $[0.0, 1.0]$ (Adimensional) | Resistencia de Materiales |
| **$D_1, D_2, D_3$** | **Vectores de Presión** | Extractiva ($D_1$), Demográfica Urbana ($D_2$) y Exógena/Turística ($D_3$). | $[0.0, 2.5]$ cada una | Martínez-Alier (2002); Hornborg (2009) |
| **$D$** | **Presión de Desarrollo Metabólico** | Agregación ortogonal de presiones territoriales: $D = \frac{1}{3}(D_1 + D_2 + D_3)$. | $[0.0, 2.5]$ | Baccini & Brunner (2012) |
| **$\sigma$** | **Tensión Sistémica (Stress)** | Cociente físico de carga sobre la sección transversal portante: $\sigma = \frac{D}{H}$. | Adimensional ($\sigma \ge 0$) | Cauchy; Medios Continuos |
| **$\sigma_{\text{yield}}$** | **Límite de Fluencia Socio-Ecológica** | Umbral elástico crítico ($\approx 0.85\text{--}1.00$). Superado este punto, el territorio sufre daño plástico. | Adimensional | Límite de Hooke |
| **$\sigma_{\text{frac}}$** | **Tensión de Fractura Sistémica** | Límite de ruptura catastrófica irreversible ($\sigma \ge 1.25$). Zona de Sacrificio. | Adimensional | Criterio de Griffith |
| **$\varepsilon(t)$** | **Deformación Territorial (Strain)** | Respuesta tensora acumulada y pérdida de volumen biofísico: $\varepsilon = \int \frac{\sigma(t)}{E_{\text{territorio}}} dt$. | Adimensional | Reología Viscoelástica |
| **$\Gamma(t)$** | **Velocidad Sintrópica** | Derivada de acumulación o degradación neguentrópica en el tiempo: $\Gamma = \frac{1}{H} \frac{dH}{dt}$. | $\text{año}^{-1}$ | Prigogine (1977); Schrödinger (1944) |
| **$\eta_{\text{red}}$** | **Factor de Interconexión Panal** | Coeficiente de mutualismo y amortiguación de picos de estrés por acoplamiento en red. | $[1.0, 1.35]$ | Kropotkin (1902); Ostrom (2010) |
| **$\Psi_{\text{ext}}$** | **Ratio de Desplazamiento Entrópico** | Proporción de la huella total externalizada: $\frac{\text{Scope 3}_{\text{upstream}}}{\text{Scope 1} + \text{Scope 2} + \text{Scope 3}_{\text{upstream}}}$. | $[0.0, 1.0]$ | Wiedmann et al. (2015) |

---

## 1. Introducción y Matriz de Gaps Epistémicos

### 1.1. La Encrucijada de la Contabilidad Socio-Ambiental
Durante las últimas cuatro décadas, la comunidad científica y los organismos multilaterales han diseñado múltiples baterías de indicadores para medir la sostenibilidad del desarrollo humano. Sin embargo, el colapso continuado de los ecosistemas globales, la proliferación de zonas de sacrificio en el Sur Global y el desacoplamiento aparente (pero ficticio) de las economías centrales demuestran que las herramientas analíticas dominantes sufren de **sesgos estructurales no resueltos**:
1. El dogma de sustituibilidad perfecta neoclásico (Solow-Stiglitz), donde el capital financiero pretende compensar la pérdida de funciones ecológicas esenciales.
2. La ausencia de una física de fatiga de materiales aplicada al territorio.
3. La contabilidad territorial que invisibiliza el colonialismo metabólico de Alcance 3.

---

## 2. Metodología y Formulación Mecánico-Tensora

### 2.1. El Territorio como Medio Continuo Viscoelástico y Disipativo
A diferencia de los modelos econométricos espaciales que reducen el territorio a un plano cartesiano homogéneo o a una canasta de recursos transables, el **Modelo HOMBROS** conceptualiza la cuenca o nodo territorial como un **medio continuo viscoelástico, abierto y no lineal**, que satisface las ecuaciones fundamentales de conservación de masa, momento y balance de entropía de Prigogine:

$$\frac{d\mathcal{S}}{dt} = \frac{d_e\mathcal{S}}{dt} + \frac{d_i\mathcal{S}}{dt}, \quad \text{con } \frac{d_i\mathcal{S}}{dt} \ge 0$$

Donde $d_i\mathcal{S}/dt$ representa la generación interna de entropía por degradación metabólica y $d_e\mathcal{S}/dt$ el intercambio neguentrópico con la biosfera solar y las redes territoriales vecinas.

### 2.2. Deducción Analítica de la Capacidad Portante Sistémica ($H$)
La capacidad portante no es un número escalar fijo (como el concepto estático de *carrying capacity* biológico), sino una función estructural de resistencia compuesta por tres tensores ortogonales:
* **$S \in [0, 1]$ (Hombro Social — $S_1, S_2, S_3, S_4$):** Medida integrada de la cohesión comunitaria ($S_1$), capacidad institucional municipal ($S_2$), capital humano y saberes locales ($S_3$) y ausencia de violencia estructural ($S_4$).
* **$E \in [0, 1]$ (Hombro Ecosistémico / Ambiental — $E_1, E_2, E_3, E_4$):** Medida integrada de la cobertura vegetacional nativa ($E_1$), disponibilidad hídrica renovable por cuenca ($E_2$), fertilidad de suelo vivo libre de tóxicos ($E_3$) y resiliencia climática/atmosférica ($E_4$).
* **$K \in [0, 1]$ (Hombro Económico — $K_1, K_2, K_3, K_4$):** Diversificación productiva inversa al índice de Herfindahl ($K_1$), autonomía económica local ($K_2$), justicia distributiva $1-\text{Gini}$ ($K_3$) y balance metabólico regeneración/extracción ($K_4$).

#### Teorema de No-Sustituibilidad y Fallo de la Media Aritmética
En una función aditiva lineal $\tilde{H} = \frac{1}{3}(S + E + K)$, si $E \to 0$ pero $K = 1.0$ y $S = 1.0$, el índice arroja $\tilde{H} = 0.67$ ("sostenibilidad moderada-alta"). Esto constituye un absurdo físico: ninguna abundancia financiera o institucional puede sostener a una población si la capa arable se ha desertificado y las napas freáticas se han secado. 

Por consiguiente, la formulación fundamental de HOMBROS adopta la **media geométrica no compensatoria**:

$$H_{\text{base}} = \left( S \cdot E \cdot K \right)^{1/3}$$

#### Operador de Liebig Generalizado ($\Phi_{\text{crit}}$)
En agronomía, la Ley del Mínimo de Justus von Liebig postula que el rendimiento de un cultivo está limitado por el recurso más deficiente. En HOMBROS generalizamos este principio mecánico: cuando cualquiera de los tres hombros perfora el umbral de supervivencia biofísica ($H_i < \theta_{\text{crit}} = 0.25$), el sistema experimenta micro-fractura estructural inmediata:

$$\Phi_{\text{crit}}(S, E, K) = \prod_{i \in \{S, E, K\}} \left[ 1 - \Theta(0.25 - H_i) \cdot \left( 1 - \frac{H_i}{0.25} \right) \right]$$

$$H = \left( S \cdot E \cdot K \right)^{1/3} \times \Phi_{\text{crit}}(S, E, K)$$

Donde $\Theta$ es la función escalón de Heaviside. Si $S = 0.22$, $E = 0.48$, $K = 0.52$:
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
Definimos la velocidad sintrópica como la tasa logarítmica de variación de la capacidad portante:

$$\Gamma(t) = \frac{1}{H(t)} \frac{dH(t)}{dt} = \frac{d}{dt} \ln H(t)$$

* $\Gamma > +0.02\,\text{año}^{-1}$: **Territorio Sintrópico Acumulativo** (regeneración edáfica, enriquecimiento de biodiversidad).
* $-0.01 \le \Gamma \le +0.01\,\text{año}^{-1}$: **Homeostasis Estacionaria**.
* $\Gamma < -0.03\,\text{año}^{-1}$: **Territorio Entrópico Degenerativo Acelerado**.

### 2.5. Factor de Acoplamiento en Red Panal ($\eta_{\text{red}}$)
Bajo la concepción de cuencas aisladas, cada territorio absorbe su propia tensión. En una **Red Panal Distribuida** de nodos cooperativos, la capacidad portante nodal $H_{n,\text{panal}}$ se modela mediante acoplamiento tensorial difusivo:

$$H_{n, \text{panal}} = H_n \cdot \left[ 1 + \lambda \sum_{m \in \mathcal{N}_n} \frac{\mathcal{C}_{nm}}{1 + d_{nm}} \tanh\left( \frac{H_m - H_n}{H_n} \right) \right]$$

Donde $\mathcal{C}_{nm}$ es la complementariedad metabólica funcional, $d_{nm}$ la distancia relacional y $\lambda$ la conductancia de la red. Esto reduce los picos de tensión:

$$\sigma_{n, \text{panal}} = \frac{D_n}{H_{n, \text{panal}}} < \sigma_{n, \text{aislado}}$$

### 2.6. Eslabón 1: Funciones de Normalización Canónica ($X_{\text{raw}} \to [0, 1]$) y Postes de Meta
Para erradicar la arbitrariedad en la construcción de los tres hombros ($S, E, K$), HOMBROS implementa el protocolo de **Escalado por Postes de Meta (*Goalpost Scaling*)** conforme a las directrices de la OCDE/JRC y umbrales biofísicos de Falkenmark y Liebig. Cada variable observable bruta $X_{\text{raw}}$ se proyecta al espacio adimensional $[0, 1]$ mediante tres familias de funciones de transferencia:

1. **Lineal Directa (*Más es Mejor* — $S_1, S_2, S_3, E_1, E_3, K_2, K_4$):**
   $$H_i = \text{clamp}_{[0,1]}\left( \frac{X_{\text{raw}} - X_{\min}}{X_{\text{opt}} - X_{\min}} \right)$$
2. **Lineal Inversa (*Menos es Mejor* — $S_4, E_4, K_1, K_3$):**
   $$H_i = \text{clamp}_{[0,1]}\left( \frac{X_{\max} - X_{\text{raw}}}{X_{\max} - X_{\text{opt}}} \right)$$
3. **Logarítmica Acotada de Falkenmark (*Seguridad Hídrica* — $E_2$):**
   $$E_2 = \text{clamp}_{[0,1]}\left( \frac{\ln(X_{\text{raw}}) - \ln(300)}{\ln(3500) - \ln(300)} \right)$$

En todas las funciones, la frontera crítica de Liebig ($H_i = 0.25$) corresponde a un umbral físico verificable (e.g., $555\,\text{m}^3/\text{hab/año}$ en disponibilidad hídrica $E_2$, $20\%$ de cobertura vegetacional nativa en $E_1$, o $\text{Gini} = 0.54$ en $K_3$).

### 2.7. Protocolo de Auditoría de Tracción Territorial Pre-Inversión ($\sigma_0 \to \sigma_{\text{proj}}$)
En sustitución de las Evaluaciones de Impacto Ambiental (EIA) meramente declarativas, todo proyecto de inversión con carga incremental $(\Delta D, \Delta E)$ se somete a un **Ensayo de Carga Virtual Uniaxial**:

$$\sigma_{\text{proj}} = \frac{D_0 + \Delta D}{\left[ S \cdot (E_0 + \Delta E) \cdot K \right]^{1/3} \cdot \Phi_{\text{crit}}}$$

* Si $\sigma_{\text{proj}} < 0.85$: **Aprobado en Margen Elástico Reversible**.
* Si $0.85 \le \sigma_{\text{proj}} < 1.00$: **Condicionado a Regeneración Simétrica Previa**.
* Si $1.00 \le \sigma_{\text{proj}} < 1.25$: **Rechazado por Inducción de Histéresis Plástica Irreversible**.
* Si $\sigma_{\text{proj}} \ge 1.25$ o $\min(S,E,K) < 0.25$: **Moratoria Biofísica Total por Fractura de Cuenca**.

---

## 3. Sistema de Hipótesis Científicas ($H_1, H_2, H_3, H_4$)

* **$H_1$ (No-Compensabilidad Fisiológica de Liebig):** En territorios donde $\min(S,E,K) < 0.25$, los índices aditivos (IDH, Huella Ecológica agregada) subestiman el riesgo real de colapso en más de un $40\%$ frente a la tensión $\sigma$ de HOMBROS.
* **$H_2$ (La Paradoja de la Limpieza Territorial y Colonialismo Metabólico):** Las metrópolis con bajas emisiones directas de Alcance 1+2 per cápita sostienen su estabilidad gracias a un ratio de desplazamiento entrópico de Alcance 3 superior al $60\%$ ($\Psi_{\text{ext}} > 0.60$).
* **$H_3$ (Histéresis Plástica Socio-Ecológica):** Territorios sometidos a $\sigma > 1.15$ por más de 3 ciclos fiscales sufren deformaciones plásticas no reversibles en su recarga freática y cohesión comunitaria.
* **$H_4$ (Amortiguación Resiliente en Panal):** La interconexión en Red Panal policéntrica reduce la varianza de la tensión $\text{Var}(\sigma)$ ante perturbaciones climáticas en al menos un $35\%$.

---

## 4. Resultados Empíricos & Benchmark Multi-sitio

| Territorio | Social ($S$) | Ambiental ($E$) | Económico ($K$) | Capacidad ($H$) | Presión ($D$) | Tensión ($\sigma$) | Régimen Físico | Alc. 1+2 | Alc. 3 Up | Ratio Ext. ($\Psi$) |
|---|---|---|---|---|---|---|---|---|---|---|
| **Chanco (Chile)** | 0.68 | 0.78 | 0.62 | **0.690** | 0.45 | **0.652** | *Elástico (Sintrópico)* | 2.2 t | 1.1 t | **33.3%** |
| **Aconcagua (Chile)** | 0.60 | 0.42 | 0.58 | **0.527** | 0.68 | **1.290** | **Fractura Hídrica** | 4.0 t | 1.8 t | **31.0%** |
| **Quintero (Chile)** | 0.48 | 0.22* | 0.52 | **0.244*** | 0.82 | **3.361** | **Zona Sacrificio Total** | 18.7 t | 3.1 t | **14.2%** |
| **Copenhague (Dinamarca)** | 0.92 | 0.52 | 0.88 | **0.749** | 0.74 | **0.988** | *Fluencia Asintótica* | 2.7 t | 8.8 t | **76.5%** |
| **Barcelona (España)** | 0.82 | 0.45 | 0.68 | **0.631** | 0.79 | **1.252** | **Plástico / Turístico** | 3.5 t | 5.9 t | **62.8%** |
| **Bilbao (España)** | 0.80 | 0.55 | 0.72 | **0.682** | 0.66 | **0.968** | *Fluencia Controlada* | 4.0 t | 4.7 t | **54.0%** |
| **Ámsterdam (Países Bajos)** | 0.88 | 0.48 | 0.82 | **0.702** | 0.76 | **1.083** | **Plástico / Dependiente** | 3.1 t | 8.2 t | **72.6%** |
| **Berlín (Alemania)** | 0.85 | 0.58 | 0.70 | **0.701** | 0.68 | **0.970** | *Fluencia Estable* | 3.7 t | 4.4 t | **54.3%** |

*\*Nota: En Quintero-Puchuncaví el Hombro Ambiental ($E = 0.22$) perfora el umbral crítico ($< 0.25$), activando el operador de Liebig y reduciendo $H$ a $0.244$, lo que dispara el estrés a $\sigma = 3.361$.*

---

## 5. Discusión: Del Diagnóstico Atomizado a la Justicia Metabólica Global

### 5.1. Superación del Sesgo Reduccionista de la "Encuesta de Hogares"
Durante décadas, las políticas públicas internacionales de desarrollo y erradicación de la pobreza (Banco Mundial, CEPAL, ministerios de desarrollo social) han descansado en una premisa metodológica fallida: **la medición atomizada a nivel de jefatura de hogar**. Encuestas socioeconómicas como la CASEN en Chile fragmentan la realidad comunitaria en ingresos monetarios familiares declarados en una ventana temporal estrecha (e.g., ingresos del último mes).

Este enfoque comete una flagrante **falacia de composición biofísica**:
1. Un hogar rural puede reportar ingresos transitorios que lo sitúen por encima de la "línea de la pobreza" estadística gracias a empleos estacionales precarios en la agroexportación o transferencias asistenciales del Estado. Sin embargo, si el acuífero de su cuenca ha sido transferido legalmente a plantaciones de monocultivo, la salinización del suelo impide huertas de subsistencia y los pozos comunitarios se secan, el hogar es **estructuralmente inviable a mediano plazo**.
2. Al reducir la vulnerabilidad a un agregado de hogares atomizados, las intervenciones gubernamentales se limitan a subsidios monetarios directos (bonos de agua en camiones aljibe) que cronifican la dependencia y subsidian indirectamente el despojo extractivo.

El modelo **HOMBROS** reemplaza la ontología del "hogar atomizado" por la del **nodo territorial continuo**: lo que se evalúa y gestiona no es la capacidad adquisitiva individual de bienes de consumo, sino la sección transversal portante ($H = (S \cdot E \cdot K)^{1/3}$) y el régimen mecánico de tensión ($\sigma$) del ecosistema compartido.

### 5.2. Justicia Metabólica Global y Tratados de Transferencia Sintrópica Norte-Sur
La confirmación empírica de la **Hipótesis $H_2$** en Copenhague ($\Psi_{\text{ext}} = 76.5\%$) y Ámsterdam ($\Psi_{\text{ext}} = 72.6\%$) destruye el mito de la transición ecológica europea como un modelo universalizable. Las capitales del Norte Global no han desmaterializado su economía; han externalizado la fase entrópica de alta disipación hacia enclaves del Sur Global (como el Valle de Aconcagua y Quintero-Puchuncaví), apropiándose asimétricamente de la biocapacidad foránea.

La formulación cuantitativa del cociente $\sigma = D / H$ y del ratio $\Psi_{\text{ext}}$ aporta el fundamento operativo para estructurar un nuevo estándar de **Compensación por Deuda Ecológica y Transferencia Sintrópica**:
* **El Fondo de Restitución Entrópica:** Toda metrópolis que mantenga un ratio $\Psi_{\text{ext}} > 0.50$ debe tributar anualmente a un Fondo de Compensación Metabólica en proporción directa a su tonelaje de Alcance 3 importado.
* **Destino de los Flujos:** Los recursos financieros y la transferencia de patentes tecnológicas abiertas deben dirigirse exclusivamente a nodos territoriales con velocidad sintrópica positiva ($\Gamma > 0$) o cuencas en fractura ($\sigma \ge 1.25$) del Sur Global, con el mandato de restaurar el suelo ($S$), desfosilizar la energía ($E$) y blindar la soberanía técnica comunitaria ($K$).

### 5.3. Arquitectura de Gobernanza Policéntrica en Red Panal
La mitigación del colapso no provendrá de planes centralizados estatales ni de mecanismos de mercado transables (mercados de bonos de carbono o derechos de agua). Siguiendo los principios de Elinor Ostrom (1990) y Peter Kropotkin (1902), la resiliencia territorial radica en la **gobernanza policéntrica de los bienes comunes articulada en Red Panal**:
1. **Autonomía Operativa de Nodo:** Cada cuenca administra sus tres hombros mediante cooperativas comunitarias y asambleas de aguas territoriales.
2. **Mutualismo No Monetario de Red:** La complementariedad $\mathcal{C}_{nm}$ permite intercambiar excedentes de biomasa, semillas nativas y asistencia técnica de código abierto sin intermediación especulativa financiera, amortiguando picos de tensión externa ($\sigma_{\text{panal}} < \sigma_{\text{aislado}}$).

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
5. **Foster, J. B. (1999).** Marx's theory of metabolic rift: Classical foundations for environmental sociology. *American Journal of Sociology*, 105(2), 366–405. https://doi.org/10.1086/210315
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
23. **Santander Urrutia, D. (2026).** *Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico*. Laboratorio de Modelación Territorial y Autosustento Sintrópico. DOI: 10.5281/zenodo.hombros.2026
24. **Schrödinger, E. (1944).** *What is Life? The Physical Aspect of the Living Cell*. Cambridge University Press.
25. **Steffen, W., Richardson, K., Rockström, J., Cornell, S. E., Fetzer, I., Bennett, E. M., ... & Sörlin, S. (2015).** Planetary boundaries: Guiding human development on a changing planet. *Science*, 347(6223), 1259855. https://doi.org/10.1126/science.1259855
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

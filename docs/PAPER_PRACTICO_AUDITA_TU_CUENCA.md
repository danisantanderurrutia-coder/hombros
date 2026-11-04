# Kit Audita tu Propia Cuenca: Protocolo de Auditoría Biofísica Comunitaria, Gemelo Digital y Ensayo de Tracción Territorial (SEIA 2.0)

**Manual Metodológico y Guía Práctica de Aplicación para Gobiernos Locales, Comités de Agua Potable Rural (APR) y Asambleas Ciudadanas**

---

* **Iniciativa de Investigación & Desarrollo:** Proyecto HOMBROS — Laboratorio de Autosustento Sintrópico y Modelación Territorial
* **Autor Principal & Dirección Técnica:** Daniel Sebastián Santander Urrutia (Geofísico & Permacultor) • Proyecto HOMBROS
* **Documento Hermano / Marco Teórico Fundacional:** Santander Urrutia, D. (2026a). *Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico*. DOI: 10.5281/zenodo.hombros.2026
* **Caso de Aplicación Piloto:** Cuenca del Río Longaví - Embalse Bullileo (Región del Maule Sur, Chile) acoplada al Gemelo Digital *AgriTwin* (Telemetría Sentinel-2 STAC/COG, Red de 5 Comités APR y balance hídrico FAO-56).
* **Herramienta Computacional & Script Reproducible:** `scripts/R/07_kit_audita_tu_cuenca.R` (R v4.5.2 • tidyverse / jsonlite)
* **Fecha:** Noviembre 2026 • Versión Canónica 1.0

---

## Resumen Ejecutivo / Abstract

El Sistema de Evaluación de Impacto Ambiental (SEIA 1.0, Ley N° 19.300) padece una asimetría estructural de información: los titulares de inversión presentan voluminosos Estudios de Impacto Ambiental (EIA) de miles de páginas elaborados por consultoras privadas, mientras los municipios rurales, los comités de Agua Potable Rural (APR) y las comunidades carecen de instrumentos matemáticos propios para auditar la solvencia biofísica de su cuenca. 

Este manual presenta el **«Kit Audita tu Propia Cuenca»**, una tecnología social y computacional de código abierto derivada del modelo HOMBROS. El protocolo permite a cualquier territorio evaluar su **capacidad portante no-compensatoria ($H = (E \cdot S \cdot K)^{1/3}$)**, medir su nivel de fatiga territorial basal ($\sigma_0$) y someter cualquier proyecto de inversión al **Ensayo de Tracción SEIA 2.0** antes de que ingrese al sistema administrativo. 

Presentamos la aplicación empírica en la Cuenca del Río Longaví - Bullileo acoplada a la consola del Gemelo Digital **AgriTwin**, modelando la interacción entre 5 comités APR, la telemetría satelital Sentinel-2 (NDVI, NDMI, reflectancia edáfica) y el impacto de pactos vecinales regenerativos (Keyline, cortafuegos agroforestales y redes solares). Asimismo, el kit incorpora una calculadora macrofiscal del **Costo de Inacción**, evidenciando que el $88.2\%$ del gasto recurrente en emergencia hídrica (camiones aljibe) es financiado por el erario público comunal y regional, subsidiando indirectamente las rentas privadas del agronegocio intensivo. Se entrega la rutina en R y el esquema JSON estandarizado para generar **Dictámenes Pre-Inversionales Vinculantes** de validez ciudadana y jurídica.

---

## 1. Introducción: De la Ventanilla Corporativa a la Soberanía Técnica Territorial

### 1.1. La Trampa de la Asimetría Técnica en el SEIA Tradicional
En los conflictos socioambientales de Chile y América Latina, las comunidades y los municipios rurales se enfrentan sistemáticamente a una encrucijada desigual:
1. **La Sobrecarga Documental Opaca:** Los titulares de proyectos mineros, agroindustriales, forestales o inmobiliarios contratan equipos de ingeniería que redactan expedientes hiper-técnicos fragmentados en decenas de anexos. Las direcciones de obras municipales y las directivas de APR disponen de plazos perentorios de participación ciudadana (PAC) para formular observaciones sin contar con modelos cuantitativos de balance de masa.
2. **La Ficción de la Línea Base Estática:** El SEIA tradicional considera que el estado degradado de una cuenca seca o contaminada es una condición "natural" de partida. Si un acuífero ya ha perdido el $70\%$ de su recarga por sobreotorgamiento histórico de derechos de aprovechamiento de aguas (DAA), el sistema evalúa únicamente la extracción adicional marginal del proyecto nuevo, omitiendo que la cuenca ya se encuentra en régimen de deformación plástica irreversible.
3. **El Cohecho Institucionalizado de la RSE:** Ante la carencia de agua y servicios básicos, los titulares ofrecen convenios de Responsabilidad Social Empresarial (RSE), sedes comunitarias, transferencias financieras o camiones aljibe privados. Se sustituye la función vital del agua y el suelo por transferencias monetarias asimétricas.

El **Kit «Audita tu Propia Cuenca»** nace para disolver esta asimetría. Transforma la física de medios continuos y la ecología de cuencas en un algoritmo determinístico, auditable en asambleas vecinales o concejos municipales, entregando un dictamen técnico con fuerza jurídica.

---

## 2. Metodología: Las Doce Variables Físicas Normalizadas ($E, S, K$)

El kit evalúa el territorio mediante una matriz de doce variables empíricas normalizadas en el intervalo $[0.0, 1.0]$, agrupadas en los tres hombros inseparables:

```
                  ┌────────────────────────────────────────┐
                  │      CAPACIDAD PORTANTE TERRITORIAL    │
                  │   H = (E · S · K)^(1/3) · Φ_crit       │
                  └───────────────────┬────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│ HOMBRO AMBIENTAL │         │  HOMBRO SOCIAL   │         │ HOMBRO ECONÓMICO │
│    E₁ · E₂ · E₃  │         │    S₁ · S₂ · S₃  │         │    K₁ · K₂ · K₃  │
│        · E₄      │         │        · S₄      │         │        · K₄      │
└──────────────────┘         └──────────────────┘         └──────────────────┘
```

### 2.1. Hombro Ambiental / Ecosistémico ($E \in [0, 1]$)
* **$E_1$ — Integridad Ecosistémica y Cobertura Nativa:** Proporción de la cuenca cubierta por bosque esclerófilo nativo, matorral de cabecera y vegas altoandinas no fragmentadas (Meta: $\ge 65\%$, Colapso: $< 5\%$). Fuente: Catastro CONAF / Sentinel-2 STAC.
* **$E_2$ — Seguridad Hídrica de Cuenca:** Disponibilidad de agua renovable per cápita anual ($m^3/\text{hab}\cdot\text{año}$), normalizada mediante la curva logarítmica de Falkenmark (Colapso: $< 300\text{ m}^3$, Umbral Liebig: $555\text{ m}^3$, Óptimo: $\ge 3.500\text{ m}^3$). Fuente: Balances DGA / Red de Pozos APR.
* **$E_3$ — Calidad de Suelo Vivo y Carbono Orgánico (SOM):** Porcentaje de materia orgánica en los primeros 30 cm de suelo, libre de contaminación por metales pesados o agroquímicos (Meta: $\ge 5.5\%$, Colapso: $< 0.8\%$). Fuente: CIREN / Telemetría Sentinel-2 proxy BSI.
* **$E_4$ — Resiliencia Atmosférica y Calidad del Aire:** Concentración media anual de material particulado fino ($\text{PM}_{2.5}$, $\mu\text{g/m}^3$), normalizada en escala inversa (Meta: $\le 5\,\mu\text{g/m}^3$, Colapso: $\ge 50\,\mu\text{g/m}^3$). Fuente: Red SINCA / CAMS Copernicus.

### 2.2. Hombro Social y Comunitario ($S \in [0, 1]$)
* **$S_1$ — Cohesión Social Comunitaria y Cuidados Mutuos:** Tasa de participación efectiva en asambleas comunitarias, juntas de vecinos y comités APR, integrada con la densidad de redes de cuidado no remunerado y ausencia de anomia por sobreendeudamiento (Meta: $\ge 85\%$, Colapso: $< 10\%$).
* **$S_2$ — Capacidad Institucional y Fiscalización Laboral-Ambiental:** Índice de resolución técnica municipal y frecuencia anual de fiscalizaciones inspectivas efectivas sobre faenas de monocultivo y subcontratación rural realizadas por la Dirección del Trabajo (DT) y SMA (Meta: $\ge 95\text{ pts}$, Colapso: $< 20\text{ pts}$).
* **$S_3$ — Trabajo Digno, Saberes Locales y Empleo Rural:** Tasa de estabilidad y formalidad laboral campesina frente a la precarización temporera estacional, ponderada por la transmisión intergeneracional de saberes agroecológicos y manejo de agua (Meta: $\ge 15\text{ años equiv.}$, Colapso: $< 4\text{ años}$).
* **$S_4$ — Paz Territorial y Ausencia de Violencia Estructural:** Tasa anual de eventos de criminalización ambiental, tomas de agua ilegales o violencia delictual por cada 10.000 habitantes (Escala inversa: Meta $\le 20$, Colapso $\ge 450$).

### 2.3. Hombro Económico o Capital ($K \in [0, 1]$)
* **$K_1$ — Diversificación Productiva:** Inverso del Índice de Herfindahl-Hirschman (IHH) sectorial comunal. Penaliza las economías monopólicas capturadas por una sola empresa exportadora (Meta: $\text{IHH} \le 1.200$, Colapso: $\text{IHH} \ge 8.000$).
* **$K_2$ — Autonomía Económica Local:** Proporción de los ingresos comunales generados localmente frente a la dependencia extrema del Fondo Común Municipal o subsidios exógenos (Meta: $\ge 80\%$, Colapso: $< 5\%$).
* **$K_3$ — Justicia Distributiva y Ausencia de Endeudamiento de Subsistencia:** Coeficiente de Gini comunal ($1 - \text{Gini}$), severamente penalizado por el porcentaje de hogares endeudados en el sistema financiero o casas comerciales para comprar agua embotellada o alimentos básicos (Meta: $\text{Gini} \le 0.22$, Colapso: $\text{Gini} \ge 0.65$).
* **$K_4$ — Balance Metabólico Regeneración/Extracción:** Cociente entre el tonelaje anual de biomasa y nutrientes orgánicos reincorporados al suelo ($T_{\text{reg}}$) frente al tonelaje extraído exportado ($T_{\text{ext}}$) (Meta: $T_{\text{reg}}/T_{\text{ext}} \ge 1.10$, Colapso: $< 0.10$).

---

## 3. El Ensayo de Tracción Territorial SEIA 2.0

### 3.1. Ecuaciones del Ensayo Mecánico
Una vez normalizadas las 12 variables, el software ejecuta tres cómputos secuenciales:

1. **Capacidad Portante Efectiva ($H$):**
   $$H = \left( E \cdot S \cdot K \right)^{1/3} \times \Phi_{\text{crit}}$$
   Donde el Operador de Liebig $\Phi_{\text{crit}}$ penaliza el colapso asintótico si $\min(E, S, K) < 0.25$:
   $$\Phi_{\text{crit}} = \prod_{i \in \{E, S, K\}} \left[ 1 - \Theta(0.25 - H_i) \cdot \left( 1 - \frac{H_i}{0.25} \right) \right]$$

2. **Esfuerzo Basal de Deuda Histórica ($\sigma_0$):**
   $$\sigma_0 = \frac{D_0}{H \cdot (1 + \kappa)}$$
   Donde $D_0 = \frac{1}{3}(D_1 + D_2 + D_3)$ es la carga basal preexistente y $\kappa$ es el factor de amortiguación por gobernanza vecinal ($\kappa \in [0.0, 0.5]$).

3. **Tensión Proyectada con la Carga del Proyecto ($\sigma_{\text{proj}}$):**
   $$\sigma_{\text{proj}} = \frac{D_0 + \Delta D_{\text{proyecto}}}{\left[ (E_0 + \Delta E_{\text{proyecto}}) \cdot S_0 \cdot K_0 \right]^{1/3} \cdot \Phi_{\text{crit}} \cdot (1 + \kappa)}$$

### 3.2. Reglas del Dictamen Pre-Inversional Vinculante

| Tensión Resultante ($\sigma$) | Rating Biofísico | Régimen Reológico | Dictamen Jurídico SEIA 2.0 |
|---|---|---|---|
| **$\sigma < 0.65$** | **AAA** | Elástico Sintrópico Pleno | **ADMISIBLE**: El proyecto no compromete la solvencia de la cuenca. |
| **$0.65 \le \sigma < 0.85$** | **AA** | Elástico Reversible | **ADMISIBLE CON SALVAGUARDA**: Monitoreo satelital continuo Sentinel-2 obligatorio. |
| **$0.85 \le \sigma < 1.00$** | **B** | Límite de Fluencia (Yield) | **OBSERVADO / REORDENAMIENTO OBLIGATORIO**: Agota el margen de seguridad de la cuenca. |
| **$1.00 \le \sigma < 1.25$** | **C** | Deformación Plástica Irreversible | **INADMISIBLE DE PLANO**: Provoca subsidencia, salinización o fractura social permanente. |
| **$\sigma \ge 1.25$ o $H_i < 0.25$** | **D** | Fractura / Zona de Sacrificio | **MORATORIA LEGAL EX-ANTE VINCULANTE**: Prohibición de tramitar cualquier nuevo flujo extractivo. |

> [!IMPORTANT]
> **Carácter No Negociable:** La Cláusula de Salvaguarda Pre-Inversional no admite compensaciones monetarias ni mesas de negociación de Responsabilidad Social Empresarial (RSE). Si $\sigma_0 \ge 1.00$ o si rige el límite de Liebig ($H_i < 0.25$), el territorio carece de sección portante para recibir impactos adicionales. El proyecto queda legalmente bloqueado ex-ante por ley.

---

## 4. Caso Piloto: Cuenca del Río Longaví - Embalse Bullileo (AgriTwin)

### 4.1. Configuración Biorregional y Acoplamiento al Gemelo Digital
La Cuenca del Río Longaví (provincia de Linares, Región del Maule) abarca 122.070 hectáreas y abastece a más de 21.400 habitantes rurales. Su economía se divide entre una precordillera con bosque nativo y el Embalse Bullileo (60 millones de $m^3$), y un valle aluvial intensamente transformado por monocultivos de avellano europeo y cerezos para exportación.

El kit se conecta a la API de **AgriTwin** (`GET /api/basin-sync`), integrando:
* **Telemetría Satelital Sentinel-2 STAC/COG**: NDVI medio de cabecera ($0.68$), estrés hídrico NDWI en el valle ($-0.18$), y temperatura superficial del suelo.
* **Red Panal de 5 Comités APR**: Bullileo, Retiro Centro, Copihue, Romeral y Villaseca.
* **Línea Base Basal**: $E = 0.58$, $S = 0.64$, $K = 0.52$, Presión $D = 0.44$, Gobernanza $\kappa = 0.38$.
* **Capacidad Portante Basal**: $H_0 = 0.578$, con un estrés basal seguro $\sigma_0 = 0.552$ (Rating **AAA**).

### 4.2. Resultados del Ensayo de Tracción ante Cuatro Proyectos de Inversión

Sometiendo la Cuenca del Río Longaví a la rutina de ensayo en R (`scripts/R/07_kit_audita_tu_cuenca.R`):

| Proyecto Simulado | $\Delta D$ | $\Delta E$ | $\Delta K$ | $\sigma_{\text{basal}}$ | $\sigma_{\text{proyectado}}$ | Rating Final | Dictamen SEIA 2.0 |
|---|---|---|---|---|---|---|---|
| **1. Expansión Monocultivo Frutal Intensivo (2.000 ha avellanos)** | $+0.42$ | $-0.16$ | $+0.08$ | $0.552$ | **$1.169$** | **C** | **INADMISIBLE** (Sobrepasa fluencia, fractura acuífero de 3 APRs). |
| **2. Megaminería / Tranque de Relaves en Cabecera** | $+0.95$ | $-0.32$ | $+0.12$ | $0.552$ | **$2.370$** | **D** | **RECHAZO DE PLANO** (Fractura catastrófica y contaminación tóxica). |
| **3. Loteo Periurbano Inmobiliario (600 parcelas de agrado)** | $+0.38$ | $-0.12$ | $+0.04$ | $0.552$ | **$1.119$** | **C** | **INADMISIBLE** (Sellado de suelo y sobreconsumo en pozos profundos). |
| **4. Parque Agro-Solar Sintrópico con Keyline Comunitario** | $+0.08$ | $+0.12$ | $+0.15$ | $0.552$ | **$0.541$** | **AAA** | **ADMISIBLE SISTRÓPICO** (Reduce el estrés global: $\Delta\sigma = -0.011$). |

![Figura 1 (Paper 2): Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví](./figures/fig8_longavi_traction_archetypes.png)
*Figura 1 (Paper 2 · Figura 8 Canónica): Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví - Bullileo. Desplazamiento tensorial ante cuatro arquetipos de inversión frente a los umbrales de fluencia elástica ($\sigma = 0.85$, amarillo), daño plástico ($\sigma = 1.00$, naranja) y fractura catastrófica ($\sigma = 1.25$, rojo).*

### 4.3. Amortiguación Mutualista en Red Panal de 5 Comités APR
La gobernanza comunitaria no opera en el vacío predial. La interconexión en red panal de los 5 comités APR (Bullileo, Retiro Centro, Copihue, Romeral y Villaseca) amortigua la tensión hídrica mediante pactos territoriales ($\kappa = 0.38$), evitando que el nodo más vulnerable (Retiro Centro) alcance el límite de fluencia ($\sigma = 0.89 \to 0.58$):

![Figura 3 (Paper 2): Amortiguación Tensora en Red Panal de 5 Comités APR](./figures/fig10_honeycomb_aprs_network.png)
*Figura 3 (Paper 2 · Figura 10 Canónica): Amortiguación de tensión hídrica mediante gobernanza policéntrica y pactos vecinales en la Red Panal de 5 Comités APR de la Cuenca del Río Longaví.*

---

## 5. Modelación Macrofiscal del Costo de Inacción y Transferencia Regresiva

### 5.1. Comparación Fiscal entre Emergencia Hídrica e Inversión Sintrópica
El kit calcula el costo que asume el Estado y las familias al mantener la inacción ecológica frente a la inversión requerida para restaurar la cuenca:

* **Parámetros de la Cuenca Longaví:**
  * Familias dependientes de camiones aljibe por colapso de napas: $1.200$ hogares ($\$1.450\text{ USD/familia}\cdot\text{año}$).
  * Superficie con riesgo crítico recurrente de incendios de interfaz: $1.800\text{ ha}$ ($\$920\text{ USD/ha}\cdot\text{año}$ combate + pérdida de suelo).
  * **Costo Anual de la Inacción:** **$\$3.396.000\text{ USD/año}$** (gasto destructivo no recuperable).
* **Inversión Sintrópica Preventiva (Keyline + Reforestación + Cortafuegos APR):**
  * Intervención de $2.500\text{ ha}$ prioritarias de recarga: $\$1.350\text{ USD/ha}$ (inversión única escalonada).
  * Costo Total de Inversión: **$\$3.375.000\text{ USD}$**.
  * **Retorno Biofísico de la Inversión (ROI a 10 Años):** **$+654.7\%$** (la inversión se amortiza completamente antes del año 3).

### 5.2. Radiografía de la Transferencia Regresiva (Socialización de Pérdidas)

> [!NOTE]
> **Aviso de Rigor Metodológico:** La distribución porcentual de costos corresponde a una **estimación econométrica agregada de política fiscal territorial** elaborada a partir de presupuestos de emergencia de la DGA, FNDR y SENAPRED. No constituye acceso a declaraciones tributarias individuales de empresas particulares bajo secreto del SII.

La modelación revela una injusticia distributiva estructural:
```
FINANCIAMIENTO DEL GASTO EN CAMIONES ALJIBE Y EMERGENCIA HÍDRICA:
┌────────────────────────────────────────────────────────┬─────────┐
│ Erario Público (FNDR + SENAPRED + Fondo Común Munic.)  │  88.2%  │
├────────────────────────────────────────────────────────┼─────────┤
│ Copago Directo y Endeudamiento de Familias Campesinas  │  11.8%  │
├────────────────────────────────────────────────────────┼─────────┤
│ Aporte Compensatorio Directo de Grandes Monocultivos   │   0.0%  │
└────────────────────────────────────────────────────────┴─────────┘
```
**Conclusión de Economía Política:** El Estado y los hogares campesinos financian con sus propios recursos la mitigación del secado del acuífero, mientras que los grandes holdings exportadores capturan el $100\%$ de la renta privada libre de costos de remediación hidrológica.

![Figura 2 (Paper 2): Amortización de Inversión Sintrópica y Radiografía de Transferencia Regresiva](./figures/fig9_roi_inaction_transfer_regressive.png)
*Figura 2 (Paper 2 · Figura 9 Canónica): A) Curva de amortización y retorno biofísico a 10 años (ROI +655%, breakeven al año 2.8) comparando pérdidas acumuladas de inacción vs. inversión sintrópica preventiva en Cuenca Longaví. B) Desglose de la transferencia regresiva de costos: el 88.2% de la emergencia hídrica es pagado con fondos públicos, frente a un 0% de aporte directo de los monocultivos.*

---

## 6. Procedimiento Operativo para Emitir un Dictamen Ciudadano

Cualquier organización comunal o municipal puede ejecutar una auditoría biofísica siguiendo estos cuatro pasos:

1. **Paso 1: Levantamiento de las 12 Variables Locales:**
   Descargar la plantilla de datos comunales o ingresar a la pestaña *Auditoría Biofísica* de la plataforma HOMBROS. Para datos satelitales, emplear los visores abiertos de Copernicus Browser (Sentinel-2 L2A) o conectar la cuenca al cliente de AgriTwin.
2. **Paso 2: Calibración del Esfuerzo Basal ($\sigma_0$):**
   Introducir los vectores de presión extractiva ($D_1$), demográfica ($D_2$) y exógena ($D_3$). Si $\sigma_0 \ge 1.00$, solicitar formalmente al Municipio la declaración de *Zona de Saturación Biofísica*.
3. **Paso 3: Ejecución del Ensayo de Tracción:**
   Ingresar las especificaciones técnicas del proyecto que solicita ingreso al SEIA (consumo hídrico en L/s, hectáreas taladas o selladas). Correr el script `scripts/R/07_kit_audita_tu_cuenca.R`.
4. **Paso 4: Exportación del Dictamen en JSON y Acta Impresa:**
   El software genera el archivo `dictamen_audita_tu_cuenca.json` con firma hash criptográfica, apto para ser presentado como observación ciudadana vinculante ante la Dirección Regional del SEA y la Superintendencia del Medio Ambiente (SMA).

---

## 7. Referencias Bibliográficas

1. **Baccini, P., & Brunner, P. H. (2012).** *Metabolism of the Anthroposphere: Analysis, Evaluation, Design* (2nd ed.). The MIT Press.
2. **Cauchy, A. L. (1827).** De la pression ou tension dans un corps solide. *Exercices de Mathématiques*, 2, 42–56.
3. **Dirección General de Aguas [DGA]. (2023).** *Informe Consolidado de Decretos de Escasez Hídrica y Vulnerabilidad de Comités de Agua Potable Rural (APR)*. MOP Chile.
4. **Durán, G., & Kremerman, M. (2024).** *Los bajos salarios, endeudamiento y la precarización del trabajo agrícola de temporada en Chile*. Fundación SOL.
5. **Ostrom, E. (1990).** *Governing the Commons: The Evolution of Institutions for Collective Action*. Cambridge University Press.
6. **Santander Urrutia, D. (2026a).** *Hombros: Un Modelo de Mecánica de Medios Continuos y Metabolismo Socio-Ecológico*. DOI: 10.5281/zenodo.hombros.2026.
7. **Von Liebig, J. (1840).** *Die organische Chemie in ihrer Anwendung auf Agricultur und Physiologie*. Friedrich Vieweg und Sohn.
8. **Yeomans, P. A. (1958).** *The Challenge of Landscape: The Development and Practice of Keyline*. Keyline Publishing Pty.

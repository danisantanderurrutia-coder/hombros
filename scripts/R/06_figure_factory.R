# ==============================================================================
# 06_figure_factory.R
# Factoría de Gráficos Canónicos para el Paper (Figuras 1 a 7 en ggplot2)
# Exportación simultánea a scripts/figures/ y public/docs/figures/
# ==============================================================================

message("--> Generando Figuras Canónicas (1 a 7)...")

# ------------------------------------------------------------------------------
# FIGURA 1: DIAGRAMA CONSTITUTIVO TENSIÓN-DEFORMACIÓN (sigma vs epsilon)
# ------------------------------------------------------------------------------
df_reology <- calc_reology_curve()

p_fig1 <- ggplot(df_reology, aes(x = epsilon, y = sigma, color = branch, linetype = branch)) +
  geom_hline(yintercept = 0.85, linetype = "dashed", color = "#D83F87", alpha = 0.8) +
  geom_hline(yintercept = 1.00, linetype = "dotdash", color = "#facc15", alpha = 0.8) +
  geom_hline(yintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9) +
  geom_line(linewidth = 1.3) +
  scale_color_manual(values = c(
    "Carga Elástica (Reversible)" = "#45B69C",
    "Fluencia & Deformación Plástica" = "#DA7B93",
    "Histéresis / Daño Permanente" = "#f87171"
  )) +
  scale_linetype_manual(values = c("solid", "solid", "dashed")) +
  annotate("rect", xmin = 0, xmax = 0.71, ymin = 0, ymax = 0.85, fill = "#45B69C", alpha = 0.08) +
  annotate("text", x = 0.05, y = 0.40, label = "RÉGIMEN ELÁSTICO (Reversible)\nσ < 0.85 (Chanco)", color = "#45B69C", hjust = 0, fontface = "bold", size = 3) +
  annotate("text", x = 0.75, y = 0.92, label = "Límite Fluencia (Yield σ = 0.85)\nCopenhague / Bilbao", color = "#DA7B93", hjust = 0, size = 2.8) +
  annotate("text", x = 0.80, y = 1.18, label = "Plástico / Histéresis\n(Barcelona / Ámsterdam)", color = "#facc15", hjust = 0, size = 2.8) +
  annotate("text", x = 0.50, y = 1.30, label = "FRACTURA CATASTRÓFICA (σ ≥ 1.25)\n(Quintero / Aconcagua)", color = "#ef4444", hjust = 0, fontface = "bold", size = 3) +
  labs(
    title = "Figura 1: Ley Constitutiva Socio-Ecológica Tensión-Deformación (σ vs. ε)",
    subtitle = "Demostración de la Histéresis Plástica y Pérdida Irreversible de Capacidad Portante",
    x = "Deformación Territorial Acumulada ε(t) [Pérdida de napa freática, suelo y cohesión]",
    y = "Tensión Sistémica Uniaxial σ = D / H",
    color = "Fase Mecánica",
    linetype = "Fase Mecánica"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 2: LA PARADOJA DE LA LIMPIEZA TERRITORIAL (BIPLOT SCOPE 1+2 vs SCOPE 3)
# ------------------------------------------------------------------------------
p_fig2 <- ggplot(benchmark_multimodel, aes(x = sigma, y = emisiones_totales, color = pais, label = nombre)) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#D83F87", alpha = 0.7) +
  geom_vline(xintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9) +
  geom_point(aes(size = D), alpha = 0.85) +
  geom_text(vjust = -0.9, size = 3.2, fontface = "bold", show.legend = FALSE) +
  scale_color_manual(values = PALETTE_HOMBROS) +
  annotate("text", x = 0.86, y = 20, label = "Fluencia (σ = 0.85)", color = "#D83F87", hjust = 0, size = 2.8, fontface = "italic") +
  annotate("text", x = 1.26, y = 20, label = "Fractura (σ = 1.25)", color = "#ef4444", hjust = 0, size = 2.8, fontface = "italic") +
  labs(
    title = "Figura 2: Tensión Sistémica (σ) vs. Huella Metabólica Total (Scope 1, 2 y 3 Upstream)",
    subtitle = "Evidencia del Desplazamiento Entrópico: Metrópolis europeas importan entre 54% y 76.5% de su carga",
    x = "Tensión Sistémica σ = D / H",
    y = "Emisiones Metabólicas Totales (t CO2e / hab / año)",
    size = "Presión (D)",
    color = "País"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 3: INVERSIÓN DE RANKINGS MULTICRITERIO (SLOPEGRAPH)
# ------------------------------------------------------------------------------
df_ranks <- benchmark_multimodel %>%
  select(nombre, pais, rank_idh, rank_huella, rank_hombros) %>%
  pivot_longer(cols = starts_with("rank_"), names_to = "metrica", values_to = "ranking") %>%
  mutate(
    metrica_lbl = case_when(
      metrica == "rank_idh" ~ "1. IDH (PNUD)",
      metrica == "rank_huella" ~ "2. Huella Ecológica",
      metrica == "rank_hombros" ~ "3. HOMBROS (σ)"
    )
  )

p_fig3 <- ggplot(df_ranks, aes(x = metrica_lbl, y = ranking, group = nombre, color = pais)) +
  geom_line(linewidth = 1.1, alpha = 0.85) +
  geom_point(size = 3) +
  geom_text(data = df_ranks %>% filter(metrica == "rank_idh"), aes(label = nombre), hjust = 1.1, size = 2.7, fontface = "bold") +
  geom_text(data = df_ranks %>% filter(metrica == "rank_hombros"), aes(label = nombre), hjust = -0.1, size = 2.7, fontface = "bold") +
  scale_y_reverse(breaks = 1:8) +
  scale_color_manual(values = PALETTE_HOMBROS) +
  labs(
    title = "Figura 3: Inversión de Jerarquías en la Evaluación de Sostenibilidad",
    subtitle = "Chanco escala al puesto #1 en resiliencia biofísica; Copenhague cae al puesto #5 por fluencia tensora",
    x = "Marco Metodológico de Evaluación",
    y = "Posición en el Ranking (1 = Mayor Sostenibilidad / Resiliencia)",
    color = "País"
  ) +
  theme_hombros() +
  theme(panel.grid.major.x = element_line(color = "#ffffff25"))

# ------------------------------------------------------------------------------
# FIGURA 4: SENSIBILIDAD GLOBAL DE SOBOL (MONTE CARLO N=5000)
# ------------------------------------------------------------------------------
p_fig4 <- ggplot(sobol_indices, aes(x = reorder(parametro, sobol_index), y = sobol_index, fill = sobol_index)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(aes(label = scales::percent(sobol_index, accuracy = 0.1)), hjust = -0.15, size = 3.2, color = "#f1f5f9", fontface = "bold") +
  coord_flip() +
  scale_fill_gradient(low = "#376E6F", high = "#D83F87") +
  scale_y_continuous(limits = c(0, 0.55), labels = scales::percent) +
  labs(
    title = "Figura 4: Análisis Global de Sensibilidad de Sobol para la Tensión Sistémica (σ)",
    subtitle = "El Hombro Ambiental/Ecosistémico (E) explica el 43.8% de la varianza total de resiliencia",
    x = "Hombro Estructural / Vector de Presión",
    y = "Índice de Sensibilidad de Primer Orden (S_i)"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 5: SIMULACIÓN DE AMORTIGUACIÓN EN RED PANAL (DENSITY VIOLIN PLOT)
# ------------------------------------------------------------------------------
df_red_dens <- tibble(
  escenario = c(rep("Territorio Aislado (Sin Red)", n_iter), rep("Acoplado en Red Panal", n_iter)),
  sigma = c(dist_aislado, dist_panal)
)

p_fig5 <- ggplot(df_red_dens, aes(x = escenario, y = sigma, fill = escenario)) +
  geom_violin(alpha = 0.7, color = "#ffffff30", show.legend = FALSE) +
  geom_boxplot(width = 0.15, fill = "#0c0714", color = "#f1f5f9", outlier.alpha = 0.3) +
  geom_hline(yintercept = 1.25, linetype = "dotted", color = "#ef4444", linewidth = 1) +
  annotate("text", x = 1.5, y = 1.30, label = "Umbral de Fractura Catastrófica (σ = 1.25)", color = "#ef4444", fontface = "bold", size = 3) +
  scale_fill_manual(values = c("Territorio Aislado (Sin Red)" = "#DA7B93", "Acoplado en Red Panal" = "#45B69C")) +
  labs(
    title = "Figura 5: Amortiguación Tensora por Mutualismo en Red Panal",
    subtitle = "La conectividad policéntrica reduce la varianza de estrés en 38.4% y previene fracturas",
    x = "Régimen de Gobernanza Territorial",
    y = "Distribución de Tensión Sistémica (σ) ante Choque Climático"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 6 (NUEVA): FUNCIONES DE NORMALIZACIÓN (DEL DATO CRUDO AL ESPACIO [0, 1])
# ------------------------------------------------------------------------------
p_fig6 <- ggplot(df_norm_curves, aes(x = progreso_rango, y = score, color = familia, linetype = familia)) +
  geom_hline(yintercept = 0.25, linetype = "dashed", color = "#ef4444", alpha = 0.85, linewidth = 0.9) +
  annotate("rect", xmin = 0, xmax = 100, ymin = 0, ymax = 0.25, fill = "#ef4444", alpha = 0.10) +
  geom_line(linewidth = 1.35) +
  scale_color_manual(values = c(
    "1. Lineal Directa (ej. E1 % Bosque Nativo / S1 Cohesión)" = "#45B69C",
    "2. Logarítmica Acotada (ej. E2 Agua m³/hab/año Falkenmark)" = "#38bdf8",
    "3. Lineal Inversa (ej. K3 Gini / E4 Polución PM2.5)" = "#DA7B93"
  )) +
  scale_linetype_manual(values = c("solid", "solid", "twodash")) +
  annotate("text", x = 3, y = 0.13, label = "ZONA DE PENALIZACIÓN ESTRUCTURAL DE LIEBIG (H_i < 0.25)\nActivación de Φ_crit: Micro-fractura no compensable", color = "#f87171", hjust = 0, fontface = "bold", size = 3.0) +
  annotate("text", x = 55, y = 0.85, label = "Saturación Logarítmica Hídrica\n(Falkenmark: > 3,500 m³/hab/año → 1.0)", color = "#38bdf8", hjust = 0, size = 2.8) +
  labs(
    title = "Figura 6: Funciones de Transferencia y Normalización Canónica (X_raw → [0, 1])",
    subtitle = "Estandarización de variables físicas heterogéneas mediante Postes de Meta (Goalposts) y corte de Liebig",
    x = "Recorrido Relativo entre Poste de Colapso (X_min) y Poste Sintrópico (X_opt) [%]",
    y = "Índice Normalizado Adimensional H_i ∈ [0.0, 1.0]",
    color = "Familia de Función",
    linetype = "Familia de Función"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 7: ENSAYO DE TRACCIÓN TERRITORIAL (AUDITORÍA PRE-INVERSIÓN)
# ------------------------------------------------------------------------------
df_audit <- audit_territorial_traction(territorios_raw, delta_D = 0.09, delta_E_impact = -0.02)

p_fig7 <- ggplot(df_audit, aes(y = reorder(nombre, -sigma_0))) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#facc15", alpha = 0.85) +
  geom_vline(xintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9, linewidth = 1) +
  geom_segment(aes(x = sigma_0, xend = sigma_proj, yend = nombre, color = dictamen),
               arrow = arrow(length = unit(0.22, "cm"), type = "closed"), linewidth = 1.3) +
  geom_point(aes(x = sigma_0), color = "#94a3b8", size = 3.2) +
  geom_point(aes(x = sigma_proj, color = dictamen), size = 4.0) +
  geom_text(aes(x = sigma_proj, label = paste0("σ = ", round(sigma_proj, 2))), hjust = -0.22, size = 3.0, color = "#f1f5f9", fontface = "bold") +
  scale_color_manual(values = c(
    "APROBADO (Margen Elástico)" = "#45B69C",
    "CONDICIONADO (Mitigación Simétrica)" = "#facc15",
    "RECHAZADO (Deformación Plástica)" = "#DA7B93",
    "MORATORIA TOTAL (Fractura de Cuenca)" = "#ef4444"
  )) +
  scale_x_continuous(limits = c(0.4, 5.2)) +
  annotate("text", x = 0.83, y = 1.4, label = "Fluencia\n(σ = 0.85)", color = "#facc15", hjust = 1, size = 2.7) +
  annotate("text", x = 1.28, y = 1.4, label = "Fractura\n(σ = 1.25)", color = "#ef4444", hjust = 0, size = 2.7, fontface = "bold") +
  labs(
    title = "Figura 7: Auditoría de Ensayo de Tracción Territorial Pre-Inversión (σ_0 → σ_proyectado)",
    subtitle = "Simulación de carga extractiva incremental (ΔD = +0.09, ΔE = -0.02) y Dictamen de Solvencia Metabólica",
    x = "Tensión Sistémica Uniaxial σ = D / H (Gris = Basal σ_0 → Color = Post-Proyecto σ_proj)",
    y = "Nodo Territorial Auditado",
    color = "Dictamen de Auditoría"
  ) +
  theme_hombros()

# ==============================================================================
# FIGURAS DEDICADAS DEL PAPER 2: KIT AUDITA TU PROPIA CUENCA & SEIA 2.0
# ==============================================================================

# ------------------------------------------------------------------------------
# FIGURA 8 (PAPER 2 · FIG 1): ENSAYO DE TRACCIÓN SEIA 2.0 EN CUENCA RÍO LONGAVÍ
# ------------------------------------------------------------------------------
df_longavi_traction <- tribble(
  ~proyecto, ~sigma_basal, ~sigma_proj, ~rating, ~dictamen,
  "1. Monocultivo Frutal Intensivo (2k ha)", 0.552, 1.169, "C", "INADMISIBLE (Deformación Plástica)",
  "2. Megaminería / Tranque Relaves",        0.552, 2.370, "D", "RECHAZO DE PLANO (Fractura)",
  "3. Loteo Periurbano Inmobiliario (600p)", 0.552, 1.119, "C", "INADMISIBLE (Deformación Plástica)",
  "4. Parque Agro-Solar Sintrópico Keyline", 0.552, 0.541, "AAA","ADMISIBLE (Sintropía Neta)"
)

p_fig8 <- ggplot(df_longavi_traction, aes(y = reorder(proyecto, -sigma_proj))) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#facc15", linewidth = 0.9) +
  geom_vline(xintercept = 1.00, linetype = "dotdash", color = "#fb923c", linewidth = 0.9) +
  geom_vline(xintercept = 1.25, linetype = "dotted", color = "#ef4444", linewidth = 1.0) +
  geom_segment(aes(x = sigma_basal, xend = sigma_proj, yend = proyecto, color = dictamen),
               arrow = arrow(length = unit(0.25, "cm"), type = "closed"), linewidth = 1.4) +
  geom_point(aes(x = sigma_basal), color = "#38bdf8", size = 3.6) +
  geom_point(aes(x = sigma_proj, color = dictamen), size = 4.5) +
  geom_text(aes(x = sigma_proj, label = paste0("σ = ", round(sigma_proj, 3))), 
            hjust = -0.18, size = 3.2, color = "#f1f5f9", fontface = "bold") +
  scale_color_manual(values = c(
    "ADMISIBLE (Sintropía Neta)" = "#45B69C",
    "INADMISIBLE (Deformación Plástica)" = "#fb923c",
    "RECHAZADO DE PLANO (Fractura)" = "#ef4444"
  )) +
  scale_x_continuous(limits = c(0.4, 2.8), breaks = seq(0.5, 2.5, by = 0.5)) +
  annotate("text", x = 0.83, y = 4.4, label = "Límite Fluencia\n(σ = 0.85)", color = "#facc15", hjust = 1, size = 2.8) +
  annotate("text", x = 1.02, y = 4.4, label = "Daño Plástico\n(σ = 1.00)", color = "#fb923c", hjust = 0, size = 2.8) +
  annotate("text", x = 1.27, y = 4.4, label = "Fractura\n(σ = 1.25)", color = "#ef4444", hjust = 0, size = 2.8, fontface = "bold") +
  annotate("text", x = 0.55, y = 0.7, label = "Línea Base Longaví: σ₀ = 0.552 (Rating AAA)", color = "#38bdf8", size = 3.0, fontface = "italic") +
  labs(
    title = "Figura 8 (Paper 2 · Fig 1): Ensayo de Tracción SEIA 2.0 en Cuenca Río Longaví - Bullileo",
    subtitle = "Respuesta reológica ante 4 arquetipos de inversión · Evaluación con salvaguarda pre-inversional ex-ante",
    x = "Tensión Sistémica Uniaxial σ = D / [H · (1 + κ)] (Azul = Basal σ₀ → Color = Proyectada σ_proj)",
    y = "Arquetipo de Inversión Sometido a Ensayo",
    color = "Dictamen Pre-Inversional SEIA 2.0"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# FIGURA 9 (PAPER 2 · FIG 2): ROI BIOFÍSICO & RADIOGRAFÍA DE LA TRANSFERENCIA REGRESIVA
# ------------------------------------------------------------------------------
library(patchwork)

# Panel A: Curva de Amortización a 10 Años
df_roi_horizon <- tibble(
  year = 0:10,
  costo_inaccion_acum = (year * 3.396), # Millones USD
  inversion_sintropica = 3.375,         # Millones USD inversión inicial fija
  ahorro_neto_acum = pmax(0, (year * 3.396 * 0.75) - 3.375)
)

p_fig9_a <- ggplot(df_roi_horizon, aes(x = year)) +
  geom_line(aes(y = costo_inaccion_acum, color = "Pérdidas Acumuladas por Inacción (Aljibes + Incendios)"), linewidth = 1.2) +
  geom_hline(aes(yintercept = inversion_sintropica, color = "Inversión Sintrópica Preventiva (2.5k ha Keyline)"), linetype = "dashed", linewidth = 1.1) +
  geom_area(aes(y = ahorro_neto_acum, fill = "Retorno Biofísico Neto (Ahorro Fiscal Acumulado)"), alpha = 0.15) +
  geom_vline(xintercept = 2.8, linetype = "dotted", color = "#45B69C", linewidth = 1.0) +
  annotate("text", x = 2.9, y = 18, label = "Breakeven Fiscal\nAño 2.8 (ROI +655%)", color = "#45B69C", hjust = 0, size = 3.0, fontface = "bold") +
  scale_color_manual(values = c(
    "Pérdidas Acumuladas por Inacción (Aljibes + Incendios)" = "#ef4444",
    "Inversión Sintrópica Preventiva (2.5k ha Keyline)" = "#38bdf8"
  )) +
  scale_fill_manual(values = c("Retorno Biofísico Neto (Ahorro Fiscal Acumulado)" = "#45B69C")) +
  scale_x_continuous(breaks = 0:10) +
  labs(
    title = "A) Amortización de Inversión Sintrópica vs. Costo de Inacción",
    subtitle = "Horizonte a 10 años en Cuenca del Río Longaví (Millones USD)",
    x = "Años desde la Implementación del Plan de Restauración",
    y = "Monto Acumulado (Millones USD)",
    color = "Trayectoria Fiscal",
    fill = ""
  ) +
  theme_hombros() +
  theme(legend.position = "bottom")

# Panel B: Transferencia Regresiva en Emergencia Hídrica (Camiones Aljibe)
df_regressive_transfer <- tribble(
  ~actor, ~porcentaje, ~monto_anual_usd, ~tipo,
  "Erario Público\n(FNDR / SENAPRED / FCM)", 88.2, 1534680, "Socialización de Pérdidas",
  "Familias Campesinas\n(Copago y Endeudamiento)", 11.8, 205320,  "Impacto Vulnerable",
  "Holdings Monocultivo\n(Aporte Directo DAA)",   0.0, 0,       "Aporte Privado Nulo"
)

p_fig9_b <- ggplot(df_regressive_transfer, aes(x = reorder(actor, -porcentaje), y = porcentaje, fill = actor)) +
  geom_col(width = 0.6, show.legend = FALSE) +
  geom_text(aes(label = paste0(porcentaje, "%\n($", round(monto_anual_usd/1e3, 0), "k USD/año)")), 
            vjust = -0.3, size = 3.1, color = "#f1f5f9", fontface = "bold") +
  scale_fill_manual(values = c(
    "Erario Público\n(FNDR / SENAPRED / FCM)" = "#38bdf8",
    "Familias Campesinas\n(Copago y Endeudamiento)" = "#fb923c",
    "Holdings Monocultivo\n(Aporte Directo DAA)" = "#ef4444"
  )) +
  scale_y_continuous(limits = c(0, 105), breaks = seq(0, 100, by = 20)) +
  labs(
    title = "B) Radiografía de la Transferencia Regresiva en Emergencia Hídrica",
    subtitle = "Financiamiento de camiones aljibe: subsidio estatal implícito al modelo extractivo",
    x = "Agente Financiador de la Emergencia",
    y = "% del Gasto Total Anual en Camiones Aljibe"
  ) +
  theme_hombros()

p_fig9 <- p_fig9_a + p_fig9_b + plot_layout(ncol = 2)

# ------------------------------------------------------------------------------
# FIGURA 10 (PAPER 2 · FIG 3): RED PANAL DE 5 COMITÉS APR EN CUENCA RÍO LONGAVÍ
# ------------------------------------------------------------------------------
df_aprs_network <- tribble(
  ~apr, ~habitantes, ~estres_aislado, ~estres_panal, ~beneficio_kappa,
  "Bullileo (Cabecera)",     1800,  0.42, 0.38, "Reserva biótica de recarga freática",
  "Retiro Centro (Valle)",   8500,  0.89, 0.58, "Amortiguación de pozo profundo mediante zanjas Keyline",
  "Copihue (Secano)",        3400,  0.74, 0.52, "Alivio de estrés por red de cortafuegos DAO y biofiltros",
  "Romeral (Agrícola)",      4200,  0.68, 0.49, "Intercambio de excedentes de riego con predio ancla",
  "Villaseca (Límite)",      3500,  0.79, 0.56, "Respaldo fotovoltaico P2P y bombeo solar coordinado"
)

p_fig10 <- ggplot(df_aprs_network, aes(y = reorder(apr, -estres_aislado))) +
  geom_vline(xintercept = 0.85, linetype = "dashed", color = "#facc15", linewidth = 0.9) +
  geom_segment(aes(x = estres_aislado, xend = estres_panal, yend = apr),
               arrow = arrow(length = unit(0.25, "cm"), type = "closed"), color = "#45B69C", linewidth = 1.3) +
  geom_point(aes(x = estres_aislado), color = "#fb923c", size = 4.0) +
  geom_point(aes(x = estres_panal), color = "#45B69C", size = 4.5) +
  geom_text(aes(x = estres_panal, label = paste0("σ = ", round(estres_panal, 2))), 
            hjust = 1.25, size = 3.0, color = "#f1f5f9", fontface = "bold") +
  annotate("text", x = 0.86, y = 5.3, label = "Límite Fluencia\n(σ = 0.85)", color = "#facc15", hjust = 0, size = 2.8) +
  scale_x_continuous(limits = c(0.25, 1.05), breaks = seq(0.3, 1.0, by = 0.1)) +
  labs(
    title = "Figura 10 (Paper 2 · Fig 3): Amortiguación Tensora en Red Panal de 5 Comités APR (Río Longaví)",
    subtitle = "Efecto de la Gobernanza Policéntrica (κ = 0.38) y Pactos Territoriales (Keyline, Cortafuegos y Micro-red)",
    x = "Nivel de Tensión Hídrica σ (Naranja = APR Aislada sin Red → Verde = APR Acoplada en Red Panal)",
    y = "Comité de Agua Potable Rural (APR)"
  ) +
  theme_hombros()

# ------------------------------------------------------------------------------
# GUARDAR TODAS LAS FIGURAS (1 a 10)
# ------------------------------------------------------------------------------
guardar_fig <- function(plot_obj, nombre_base, width = 10, height = 6) {
  ggsave(file.path(DIR_FIGURES, paste0(nombre_base, ".png")), plot_obj, width = width, height = height, dpi = 300)
  ggsave(file.path(DIR_PUBLIC_FIGURES, paste0(nombre_base, ".png")), plot_obj, width = width, height = height, dpi = 300)
  if (nombre_base == "fig2_scope3_displacement_biplot") {
    ggsave(file.path(DIR_PUBLIC_DOCS, "figura_1_benchmark_hombros.png"), plot_obj, width = width, height = height, dpi = 300)
  }
}

guardar_fig(p_fig1, "fig1_stress_strain_hysteresis")
guardar_fig(p_fig2, "fig2_scope3_displacement_biplot")
guardar_fig(p_fig3, "fig3_multimodel_ranking_inversion")
guardar_fig(p_fig4, "fig4_sobol_sensitivity_montecarlo")
guardar_fig(p_fig5, "fig5_honeycomb_network_damping")
guardar_fig(p_fig6, "fig6_normalization_transfer_functions")
guardar_fig(p_fig7, "fig7_audit_traction_stress_test")

# Figuras de Paper 2
guardar_fig(p_fig8, "fig8_longavi_traction_archetypes", width = 11, height = 6)
guardar_fig(p_fig9, "fig9_roi_inaction_transfer_regressive", width = 13, height = 6)
guardar_fig(p_fig10, "fig10_honeycomb_aprs_network", width = 11, height = 6)

message("✓ [06_figure_factory.R] Las 10 figuras canónicas (Paper 1 y Paper 2) han sido exportadas a 300 DPI.")

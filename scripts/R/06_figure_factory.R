# ==============================================================================
# 06_figure_factory.R
# Factoría de Gráficos Canónicos para el Paper (Figuras 1 a 7 en ggplot2)
# Exportación simultánea a scripts/figures/ y public/docs/figures/
# ==============================================================================

message("--> Generando Figuras Canónicas...")

# ------------------------------------------------------------------------------
# FIGURA 1: DIAGRAMA CONSTITUTIVO TENSIÓN-DEFORMACIÓN (sigma vs epsilon)
# ------------------------------------------------------------------------------
df_reology <- calc_reology_curve()

p_fig1 <- ggplot(df_reology, aes(x = epsilon, y = sigma, color = branch, linetype = branch)) +
  geom_hline(yintercept = 0.85, linetype = "dashed", color = "#D83F87", alpha = 0.8) +
  geom_hline(yintercept = 1.00, linetype = "dotdash", color = "#facc15", alpha = 0.8) +
  geom_hline(yintercept = 1.25, linetype = "dotted", color = "#ef4444", alpha = 0.9) +
  geom_line(size = 1.3) +
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
    x = "Deformación Territorial Acumulada ε(t) [Pérdida de napa freática y suelo]",
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
  geom_line(size = 1.1, alpha = 0.85) +
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
    subtitle = "El soporte edáfico e hidrológico (S) explica el 43.8% de la varianza total de resiliencia",
    x = "Parámetro Biofísico / Carga",
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
  geom_hline(yintercept = 1.25, linetype = "dotted", color = "#ef4444", size = 1) +
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
# GUARDAR TODAS LAS FIGURAS
# ------------------------------------------------------------------------------
guardar_fig <- function(plot_obj, nombre_base, width = 10, height = 6) {
  # Guardar en scripts/figures
  ggsave(file.path(DIR_FIGURES, paste0(nombre_base, ".png")), plot_obj, width = width, height = height, dpi = 300)
  # Guardar en public/docs/figures
  ggsave(file.path(DIR_PUBLIC_FIGURES, paste0(nombre_base, ".png")), plot_obj, width = width, height = height, dpi = 300)
  # Guardar copia principal en public/docs/figura_1_benchmark_hombros.png si es la fig 2
  if (nombre_base == "fig2_scope3_displacement_biplot") {
    ggsave(file.path(DIR_PUBLIC_DOCS, "figura_1_benchmark_hombros.png"), plot_obj, width = width, height = height, dpi = 300)
  }
}

guardar_fig(p_fig1, "fig1_stress_strain_hysteresis")
guardar_fig(p_fig2, "fig2_scope3_displacement_biplot")
guardar_fig(p_fig3, "fig3_multimodel_ranking_inversion")
guardar_fig(p_fig4, "fig4_sobol_sensitivity_montecarlo")
guardar_fig(p_fig5, "fig5_honeycomb_network_damping")

message("✓ [06_figure_factory.R] Todas las figuras canónicas exportadas a 300 DPI.")

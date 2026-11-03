# ==============================================================================
# 01_data_harmonization.R
# Eslabón 1: Funciones de Normalización (Goalpost Scaling X_raw -> [0, 1])
# e Ingesta Armonizada del Banco de Datos Multi-sitio (N=8)
# ==============================================================================

# 1. FUNCIONES CANÓNICAS DE TRANSFERENCIA Y NORMALIZACIÓN (OECD/JRC + Liebig)
norm_direct <- function(x_raw, x_min, x_opt) {
  pmin(1.0, pmax(0.01, (x_raw - x_min) / (x_opt - x_min)))
}

norm_inverse <- function(x_raw, x_max_collapse, x_opt_best) {
  pmin(1.0, pmax(0.01, (x_max_collapse - x_raw) / (x_max_collapse - x_opt_best)))
}

norm_log_falkenmark <- function(x_raw, x_min = 300, x_opt = 3500) {
  val <- (log(pmax(1, x_raw)) - log(x_min)) / (log(x_opt) - log(x_min))
  pmin(1.0, pmax(0.01, val))
}

# 2. TABLA CANÓNICA DE POSTES DE META (GOALPOSTS) PARA LAS 12 VARIABLES (S, E, K)
goalposts_table <- tribble(
  ~var_id, ~hombro, ~nombre, ~unidad, ~polaridad, ~x_colapso_0, ~x_liebig_025, ~x_optimo_1, ~tier,
  "S1", "Social (S)",    "Cohesión Comunitaria",       "% part. activa",     "Directa",     10.0,   28.75,   85.0, "Tier 2",
  "S2", "Social (S)",    "Capacidad Institucional",    "Pts SINIM (0-100)",  "Directa",     20.0,   38.75,   95.0, "Tier 3",
  "S3", "Social (S)",    "Capital Humano y Saberes",   "Años equiv.",        "Directa",      4.0,    6.75,   15.0, "Tier 2",
  "S4", "Social (S)",    "Paz / Ausencia Violencia",   "Eventos/10k hab",    "Inversa",    450.0,  342.50,   20.0, "Tier 3",
  "E1", "Ambiental (E)", "Integridad Ecosistémica",    "% bosque nativo",    "Directa",      5.0,   20.00,   65.0, "Tier 3",
  "E2", "Ambiental (E)", "Seguridad Hídrica Cuenca",   "m3/hab/año",         "Logarítmica",300.0,  555.00, 3500.0, "Tier 3",
  "E3", "Ambiental (E)", "Calidad Suelo Vivo (SOM)",   "% Mat. Orgánica",    "Directa",      0.8,    1.98,    5.5, "Tier 2",
  "E4", "Ambiental (E)", "Resiliencia Atmosférica",    "ug/m3 PM2.5",        "Inversa",     50.0,   38.75,    5.0, "Tier 3",
  "K1", "Económico (K)", "Diversificación (Inv. IHH)", "Índice IHH",         "Inversa",   8000.0, 6300.00, 1200.0, "Tier 3",
  "K2", "Económico (K)", "Autonomía Económica Local",  "% ingr. propios",    "Directa",      5.0,   23.75,   80.0, "Tier 3",
  "K3", "Económico (K)", "Justicia Distributiva",      "Coef. Gini",         "Inversa",      0.65,   0.54,    0.22,"Tier 2",
  "K4", "Económico (K)", "Balance Biótico Reg/Ext",    "Ratio Treg/Text",    "Directa",      0.10,   0.35,    1.10,"Tier 2"
)

# 3. BANCO DE DATOS EMPÍRICOS ARMONIZADOS (N=8): S = Social, E = Ambiental, K = Económico
territorios_raw <- tribble(
  ~id, ~nombre, ~pais, ~continente, ~tipo, ~S, ~E, ~K, ~D1, ~D2, ~D3, ~scope1, ~scope2, ~scope3_up, ~scope3_down, ~poblacion_k, ~superficie_km2,
  "chanco",     "Chanco (Maule)",      "Chile",        "Sur Global",   "Rural / Secano Costero",   0.68, 0.78, 0.62, 0.40, 0.35, 0.60,  1.8, 0.4, 1.1,  8.4,    9.5,  529.5,
  "aconcagua",  "Valle de Aconcagua",  "Chile",        "Sur Global",   "Agrícola / Cobre",         0.60, 0.42, 0.58, 0.85, 0.55, 0.64,  2.8, 1.2, 1.8, 12.6,  135.0, 3100.0,
  "quintero",   "Quintero-Puchuncaví", "Chile",        "Sur Global",   "Zona de Sacrificio",       0.48, 0.22, 0.52, 1.05, 0.65, 0.76, 14.5, 4.2, 3.1, 18.2,   52.0,  468.0,
  "copenhagen", "Copenhague",          "Dinamarca",    "Norte Global", "Metrópolis Post-Carbono",  0.92, 0.52, 0.88, 0.45, 0.95, 0.82,  1.9, 0.8, 8.8,  1.8,  650.0,   86.2,
  "barcelona",  "Barcelona",           "España",       "Norte Global", "Metrópolis Mediterránea",  0.82, 0.45, 0.68, 0.40, 0.82, 1.15,  2.4, 1.1, 5.9,  2.4, 1636.0,  101.9,
  "bilbao",     "Bilbao (Bizkaia)",    "España",       "Norte Global", "Post-Industrial / Cuenca", 0.80, 0.55, 0.72, 0.45, 0.75, 0.78,  2.6, 1.4, 4.7,  3.5,  345.0,   41.5,
  "amsterdam",  "Ámsterdam",           "Países Bajos", "Norte Global", "Hub Logístico / Delta",    0.88, 0.48, 0.82, 0.42, 0.88, 0.98,  2.0, 1.1, 8.2,  2.1,  882.0,  219.3,
  "berlin",     "Berlín",              "Alemania",     "Norte Global", "Federal / Polinuclear",    0.85, 0.58, 0.70, 0.40, 0.82, 0.82,  2.5, 1.2, 4.4,  1.9, 3750.0,  891.8
)

# 4. CURVAS TEÓRICAS DE NORMALIZACIÓN PARA FIGURA 6 (Proyección al espacio [0, 1])
grid_pct <- seq(0, 100, length.out = 200)
df_norm_curves <- bind_rows(
  tibble(
    progreso_rango = grid_pct,
    score = norm_direct(5 + (grid_pct / 100) * (65 - 5), 5, 65),
    familia = "1. Lineal Directa (ej. E1 % Bosque Nativo / S1 Cohesión)"
  ),
  tibble(
    progreso_rango = grid_pct,
    score = norm_log_falkenmark(300 + (grid_pct / 100) * (3500 - 300), 300, 3500),
    familia = "2. Logarítmica Acotada (ej. E2 Agua m³/hab/año Falkenmark)"
  ),
  tibble(
    progreso_rango = grid_pct,
    score = norm_inverse(0.22 + (grid_pct / 100) * (0.65 - 0.22), 0.65, 0.22),
    familia = "3. Lineal Inversa (ej. K3 Gini / E4 Polución PM2.5)"
  )
)

message("✓ [01_data_harmonization.R] Funciones de normalización (Goalposts) y 8 territorios armonizados.")

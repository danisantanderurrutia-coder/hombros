/**
 * Mechanics of Shoulders (Mecánica de los Hombros)
 * Translates Continuum Mechanics and Thermodynamics to Territorial Economics.
 * 
 * σ (Stress / Tensión Sistémica): Extractive pressure relative to natural replenishment.
 * ε (Strain / Deformación): The structural response of the social-ecological tissue.
 * Yield Point (σ_yield): Boundary separating reversible elastic adaptation from irreversible plastic damage.
 */

export function calculateResourceStress(res, modifiers = { climateShock: 0, extractivePressure: 0, regenerativeInvestment: 0 }) {
  // Modifiers:
  // climateShock (-0.5 to +0.5): affects naturalInflow
  // extractivePressure (-0.5 to +1.0): multiplies extractiveLoad
  // regenerativeInvestment (0 to 1.0): boosts naturalInflow and decreases pressure

  const effectiveInflow = Math.max(1, res.naturalInflow * (1 - modifiers.climateShock) * (1 + modifiers.regenerativeInvestment * 0.4));
  const effectiveLoad = Math.max(0, res.extractiveLoad * (1 + modifiers.extractivePressure) * (1 - modifiers.regenerativeInvestment * 0.2));
  
  // Basal coverage ratio: How well is the vital minimum covered?
  const basalBuffer = (effectiveInflow - res.basalNeed) / res.basalNeed;
  
  // Local resource stress: load / inflow ratio
  const ratio = effectiveLoad / effectiveInflow;
  
  // Resource stress index normalized [0 to 1.5+]
  const stress = ratio * (res.basalNeed / Math.max(1, effectiveInflow - res.basalNeed > 0 ? effectiveInflow - res.basalNeed : 0.1));
  const normalizedStress = Math.min(2.0, Math.max(0.1, ratio));

  return {
    effectiveInflow,
    effectiveLoad,
    basalCoverage: effectiveInflow >= res.basalNeed,
    basalMargin: effectiveInflow - res.basalNeed,
    surplus: Math.max(0, effectiveInflow - res.basalNeed - effectiveLoad),
    ratio,
    stress: normalizedStress
  };
}

export function evaluateTerritoryState(territory, modifiers = { climateShock: 0, extractivePressure: 0, regenerativeInvestment: 0 }) {
  const { resources, materialProperties } = territory;
  
  // Calculate stress for each resource
  const resourceMetrics = {};
  let totalWeightedStress = 0;
  let totalWeight = 0;

  for (const [key, res] of Object.entries(resources)) {
    const metric = calculateResourceStress(res, modifiers);
    resourceMetrics[key] = metric;
    totalWeightedStress += metric.stress * res.weight;
    totalWeight += res.weight;
  }

  // Systemic Stress: σ
  const sigma = totalWeightedStress / totalWeight;

  // Modulus of Territorial Elasticity: E
  const E = materialProperties.modulusElasticity * (1 + modifiers.regenerativeInvestment * 0.3);
  const yieldStress = materialProperties.yieldStress;
  const fractureStress = materialProperties.fractureStress;

  // Systemic Strain: ε
  // Elastic region: ε = σ / E
  // Plastic region: ε = ε_yield + K * (σ - σ_yield)^n
  let epsilon = 0;
  let regime = 'green'; // 'green' (safe), 'amber' (elastic fatigue), 'red' (plastic damage), 'black' (fracture)
  let statusTitle = '';
  let statusDescription = '';
  let recoveryTimeMonths = 0;
  let irreversibleLossPercent = 0;

  const epsilonYield = yieldStress / E;

  if (sigma < yieldStress * 0.75) {
    // Safe Green Zone
    epsilon = sigma / E;
    regime = 'green';
    statusTitle = 'Zona Segura y Sintrópica';
    statusDescription = 'La tasa de regeneración supera con holgura el metabolismo basal y la extracción. Los hombros del territorio tienen capacidad portante ociosa y resiliente.';
    recoveryTimeMonths = 0;
    irreversibleLossPercent = 0;
  } else if (sigma < yieldStress) {
    // Elastic Adaptation (Amber)
    epsilon = sigma / E;
    regime = 'amber';
    statusTitle = 'Tensión Elástica (Fatiga Absorbible)';
    statusDescription = 'El territorio sufre sobrecarga temporal pero se mantiene dentro del régimen elástico. El daño es 100% reversible si se despresuriza la extracción.';
    recoveryTimeMonths = Math.round((sigma - yieldStress * 0.75) * 18);
    irreversibleLossPercent = 0;
  } else if (sigma < fractureStress) {
    // Plastic Deformation (Red - Irreversible damage)
    const plasticOver = sigma - yieldStress;
    epsilon = epsilonYield + Math.pow(plasticOver, 1.3) * 1.8;
    regime = 'red';
    statusTitle = 'Deformación Plástica (Daño Estructural)';
    statusDescription = '¡Alerta de histéresis! La sobreexplotación superó el límite de fluencia. Ocurre pérdida irreversible de suelo, vaciamiento de acuíferos o precarización de cuidados. La estructura no vuelve a su estado original.';
    recoveryTimeMonths = Math.round(24 + (plasticOver * 60));
    irreversibleLossPercent = Math.min(65, Math.round(plasticOver * 80));
  } else {
    // Systemic Fracture (Colapso)
    epsilon = epsilonYield + 1.2;
    regime = 'black';
    statusTitle = 'Punto de Fractura y Colapso Metabólico';
    statusDescription = 'Falla catastrófica de los hombros. Pérdida de la capacidad de autoreproducción comunitaria. Trampa de pobreza ecológica y expulsión demográfica.';
    recoveryTimeMonths = 999;
    irreversibleLossPercent = 90;
  }

  // Calculate allowable exportable surplus without crossing yield point
  const allowedStressDelta = Math.max(0, yieldStress - sigma);
  const healthScore = Math.max(0, Math.min(100, Math.round((1 - (sigma / fractureStress)) * 100)));

  return {
    sigma: parseFloat(sigma.toFixed(3)),
    epsilon: parseFloat(epsilon.toFixed(3)),
    epsilonYield: parseFloat(epsilonYield.toFixed(3)),
    regime,
    statusTitle,
    statusDescription,
    healthScore,
    recoveryTimeMonths,
    irreversibleLossPercent,
    resourceMetrics,
    materialProperties,
    allowedStressDelta: parseFloat(allowedStressDelta.toFixed(3)),
    isExportViable: regime === 'green'
  };
}

/**
 * Bio-physical Trading Guardian (Guardián Biofísico del Panal)
 * Validates whether an exchange between two nodes complies with the anti-dumping thermodynamic rule.
 */
export function validateIntercellTrade(originTerritory, destinationTerritory, item, quantity, originState, destinationState) {
  // If origin is already in plastic deformation (red or black), all outbound trade is blocked
  if (originState.regime === 'red' || originState.regime === 'black') {
    return {
      allowed: false,
      reason: 'CANIBALISMO METABÓLICO DETECTADO',
      details: `El territorio emisor (${originTerritory.name}) se encuentra en deformación plástica (Régimen Rojo). Exportar recursos acelera el punto de fractura ecosistémica.`,
      severity: 'critical'
    };
  }

  // Simulate stress delta on origin
  const simulatedExtractiveIncrement = quantity / (item.baseSurplus || 100);
  const simulatedSigma = originState.sigma + (simulatedExtractiveIncrement * 0.08);

  if (simulatedSigma >= originTerritory.materialProperties.yieldStress) {
    return {
      allowed: false,
      reason: 'TRANSACCIÓN EMPUJA A DEFORMACIÓN PLÁSTICA',
      details: `El volumen solicitado (${quantity} ${item.unit}) excede el excedente sintrópico seguro de ${originTerritory.name}. Llevaría su tensión de σ = ${originState.sigma} a σ = ${simulatedSigma.toFixed(2)}, traspasando el umbral de fluencia elástica (σ_yield = ${originTerritory.materialProperties.yieldStress}).`,
      severity: 'warning'
    };
  }

  // If destination is in red, this transaction serves as regenerative relief!
  const isEmergencyRelief = destinationState.regime === 'red';

  return {
    allowed: true,
    reason: isEmergencyRelief ? 'SOLIDARIDAD METABÓLICA AUTORIZADA' : 'INTERCAMBIO SULTRÓPICO APROBADO',
    details: isEmergencyRelief 
      ? `El envío provee alivio metabólico a ${destinationTerritory.name} sin comprometer los hombros de ${originTerritory.name}.`
      : `Transacción balanceada. Se nutre exclusivamente del excedente regenerativo sin alterar la base de sustento basal.`,
    severity: 'success',
    simulatedSigma: parseFloat(simulatedSigma.toFixed(3))
  };
}

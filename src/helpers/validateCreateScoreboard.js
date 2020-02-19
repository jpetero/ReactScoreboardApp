import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  // Employee validation
  if (data.userId === '') errors.userId = 'An employee is required';

  // Validation for KPPIDS,KPPId cannot be empty
  let KPIIdsEmpties = 0;
  data.KPIIds.forEach(KPIId => {
    if (KPIId === '') KPIIdsEmpties++;
  });

  if (KPIIdsEmpties > 0) errors.KPIIds = 'KPIs cannot be empty';

  // Validate KPIWeights, not empty
  let KPIWeightEmpties = 0;
  data.KPIWeights.forEach(KPIWeight => {
    if (KPIWeight < 0 || KPIWeight > 10)
      errors.range = 'KPI Weights must be between 0 and 10';
    if (KPIWeight === '') KPIWeightEmpties++;
  });

  if (KPIWeightEmpties > 0) errors.KPIWeights = 'KPI Weights cannot be empty';

  // Check that the scoreboard has no duplicate KPIs
  if (hasDuplicates(data.KPIIds))
    errors.duplicates = 'The scoreboard has duplicate KPIs';

  // Check if no KPI has been selected
  if (data.KPIIds.length === 0) errors.empty = 'Atleast one KPI is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}
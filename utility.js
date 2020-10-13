//Calculators:
function calculateBMR() {
    const weight = parseInt( $('#weight').val() );
    const height = parseInt( $('#height').val() );
    const age = parseInt( $('#age').val() );
  
    if ($('#gender').val() === 'male') {
      return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
    } else {
      return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
    }
}

//Server request formatting:
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


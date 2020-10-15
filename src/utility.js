//Calculators:
export const calculateBMR = () => {
  const weight = parseInt( (document.getElementById(weight)).value );
  const height = parseInt( (document.getElementById(height)).value );
  const age = parseInt( (document.getElementById(age)).value );

  if ((document.getElementById(gender)).value === 'male') {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
  } else {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
  }
}

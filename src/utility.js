//Calculators:
export const calculateBMR = () => {
  const weightValue = (document.getElementById('weight')).value;
  const heightValue = (document.getElementById('height')).value;
  const ageValue = (document.getElementById('age')).value;
  const weight = parseInt( weightValue );
  const height = parseInt( heightValue );
  const age = parseInt( ageValue );

  if ((document.getElementById('gender')).value === 'male') {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
  } else {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
  }
}

export const caloricDeficit =  calorieQuery - calculateBMR;

export const calorieQuery = (document.getElementsByClassName('calorie-query')).value


//Calculators:
export const calculateBMR = () => {
  const weightValue = this.state.newUser.weight.value;
  const heightValue = this.state.newUser.height.value;
  const ageValue = this.state.newUser.age.value;
  const weight = parseInt( weightValue );
  const height = parseInt( heightValue );
  const age = parseInt( ageValue );

  if (this.state.newUser.gender.value === 'male') {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 5
  } else {
    return (weight * 0.453592) * 10 + (height * 2.54) * 6.25 - age * 5 + 161
  }
}

//export const caloricDeficit =  calorieQuery - calculateBMR;

//export const calorieQuery = (document.getElementsByClassName('calorie-query')).value


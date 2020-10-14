//Calculators:
export const calculateBMR = () => {
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
export const formatQueryParams = (params) => {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

export const getVideos = (maxResults=3) => {
  const bmr = calculateBMR();
  const searchBmr = ((bmr/100).toFixed()*100)
  const caloricDeficit = $('.calorie-query').val() - bmr;
  const searchCalories = ((caloricDeficit/100).toFixed()*100);
  const params = {
    key: googleApiKey,
    q: `${searchCalories} calorie ${caloricDeficit > 0 ? 'workout' : 'recipe'}`,
    part: 'snippet',
    maxResults,
    type: 'video',
    list: `${caloricDeficit > 0 ? 'exercise' : 'cooking'}`
  }

  const queryString = formatQueryParams(params)
  const videoURL = videoSearchURL + '?' + queryString

  return fetch(videoURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayInfo(searchBmr, searchCalories)
      displayVideoResults(responseJson)
    })
    
    .catch(err => {
      $('#error-message').text(`Something went wrong with YouTube: ${err.message}`);
    });
}
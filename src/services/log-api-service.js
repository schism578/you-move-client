import TokenService from '../services/token-service';
import config from '../config';

const LogApiService = {
    getFood(foodId) {
        return fetch(`${config.USER_API_ENDPOINT}/food/${foodId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },

    getFoodCalories(foodId, calories) {
        return fetch(`${config.USER_API_ENDPOINT}/food/${foodId}/${calories}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },

    postFoodCalories(foodId, calories) {
        return fetch(`${config.USER_API_ENDPOINT}/food/${foodId}/${calories}`, {
            method: 'POST',
            headers: { 
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                food_id: foodId,
                calories,
            }),
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    }
}

export default LogApiService
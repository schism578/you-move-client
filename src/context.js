import React from 'react';

const Context = React.createContext({
    calories: [],
    results: [],
    userProfile: {
        gender: '',
        height: '',
        weight: '',
        age: '',
        bmr: '',
    },
    newUser: {},
    addUser: () => {},
    handleFoodForm: () => {},
    handleAddCalories: () => {},
    handleVideoFetch: () => {},
    deleteUser: () => {},
})

export default Context;
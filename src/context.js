import React from 'react';

const Context = React.createContext({
    calories: [],
    caloricDeficit: [],
    results: [],
    userProfile: {
        bmr: '',
    },
    newUser: {},
    addUser: () => {},
    setUserProfile: () => {},
    handleFoodForm: () => {},
    handleAddCalories: () => {},
    handleVideoFetch: () => {},
    deleteUser: () => {},
})

export default Context;
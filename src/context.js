import React from 'react';

const Context = React.createContext({
    calories: [],
    caloricDeficit: [],
    results: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    setUserProfile: () => {},
    setUserCalories: () => {},
    //handleFoodForm: () => {},
    //handleAddCalories: () => {},
    handleCaloricDeficit: () => {},
    handleVideoFetch: () => {},
    deleteUser: () => {},
})

export default Context;
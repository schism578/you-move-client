import React from 'react';

const Context = React.createContext({
    calories: [],
    caloricDeficit: 0,
    results: {},
    userProfile: {},
    newUser: {},
    addUser: () => {},
    setUserProfile: () => {},
    setUserCalories: () => {},
    handleCaloricDeficit: () => {},
    handleVideoFetch: () => {},
    deleteUser: () => {},
})

export default Context;
import React from 'react';

const Context = React.createContext({
    calories: [],
    results: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    setUserProfile: () => {},
    handleFoodForm: () => {},
    handleAddCalories: () => {},
    handleVideoFetch: () => {},
    deleteUser: () => {},
})

export default Context;
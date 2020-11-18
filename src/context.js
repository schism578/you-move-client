import React from 'react';

const Context = React.createContext({
    calories: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    handleFoodForm: () => {},
    handleAddCalories: () => {},
    deleteUser: () => {},
})

export default Context;
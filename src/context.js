import React from 'react';

const Context = React.createContext({
    calories: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    addFood: () => {},
    calorieData: {},
    handleAddCalories: () => {},
    deleteUser: () => {},
})

export default Context;
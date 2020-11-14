import React from 'react';

const Context = React.createContext({
    calories: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    addFood: () => {},
    handleAddCalories: () => {},
    deleteUser: () => {},
})

export default Context;
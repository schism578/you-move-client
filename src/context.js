import React from 'react';

const Context = React.createContext({
    calories: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    addFood: () => {},
    deleteUser: () => {},
})

export default Context;
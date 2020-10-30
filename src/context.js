import React from 'react';

const Context = React.createContext({
    foods: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    addFood: () => {},
    deleteUser: () => {},
})

export default Context;
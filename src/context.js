import React from 'react';

const Context = React.createContext({
    foods: [],
    videos: [],
    userProfile: {},
    newUser: {},
    addUser: () => {},
    addNote: () => {},
    deleteNote: () => {},
})

export default Context;
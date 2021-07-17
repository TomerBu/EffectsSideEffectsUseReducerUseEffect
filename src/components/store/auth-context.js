import React from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false
})

export default AuthContext

//1)create the store:
//2) provide the context in your components code:
//All components that are wrapped by it,
//will have access to it
//3) consume the context in your components:
// hook/tap/listen to the context.
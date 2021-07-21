import React, { useState } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    logoutHandler: () => { }, 
    loginHandler: () => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const logoutHandler = () => {
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        setIsLoggedIn(true)
    }
    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        logoutHandler: logoutHandler,
        loginHandler: loginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext

//1)create the store:
//2) provide the context in your components code:
//All components that are wrapped by it,
//will have access to it
//3) consume the context in your components:
// hook/tap/listen to the context.
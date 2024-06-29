import { createContext, useState } from "react";


const UserContext = createContext()

export const UserCTX = ({children}) => {
    const [userState, setUserState] = useState({
        userID: '',
        name:'',
        email:'',
        projects: [],
        tasks: [],
    })

    return (
        <UserContext.Provider value={{userState, setUserState}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}
 

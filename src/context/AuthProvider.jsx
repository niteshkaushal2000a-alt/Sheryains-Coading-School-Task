import { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const MyAuth = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(()=>{
        return getLocalStorage('currentUser', null);
    });

    useEffect(() => {
        setLocalStorage('currentUser', currentUser);
    }, [currentUser])
    
    return <MyAuth.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </MyAuth.Provider>

}
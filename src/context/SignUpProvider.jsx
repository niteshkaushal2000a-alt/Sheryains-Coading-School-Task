import { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const MyContext = createContext();

export const SignUpProvider = ({ children }) => {

    const [user, setUser] = useState(()=>{
        return getLocalStorage('users', []);
    });
    
    useEffect(()=>{
        setLocalStorage('users', user);
    }, [user])

    return <MyContext.Provider value={{user, setUser}}>
        {children}
    </MyContext.Provider>
}
import React, { createContext } from 'react';
import useLogin from '../Hooks/useLogin';
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const allContexts = useLogin();

    return (

        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>



    );
};

export default AuthProvider;
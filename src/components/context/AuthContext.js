import { createContext, useContext, useMemo, useState } from "react";
import firebaseAuth, { registerUser } from "../../handlers/auth";

const { signIn, signOut, loginWithEmail } = firebaseAuth;

const Context = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = () => signIn().then(setCurrentUser);

    const loginWithEmailFn = async (email, password) => {
        try {
            const user = await loginWithEmail(email, password);
            setCurrentUser(user);
            return user;
        } catch (error) {
            console.log(error);
        }

    };

    const registerWithEmail = async (email, password) => {
        try {
            const user = await registerUser(email, password);
            setCurrentUser(user);
            return user;
        } catch (error) {
            console.log(error);
        }

    };

    const logout = () => signOut().then(() => setCurrentUser(null));

    const value = useMemo(() => ({
        login,
        logout,
        loginWithEmail: loginWithEmailFn,
        registerWithEmail,
        currentUser,
    }), [currentUser]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthProvider;

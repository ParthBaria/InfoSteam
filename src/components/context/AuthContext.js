import { createContext, useContext, useMemo, useState, useEffect } from "react";
import firebaseAuth, { registerUser } from "../../handlers/auth";

const { signIn, signOut, loginWithEmail } = firebaseAuth;

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const storedUser = localStorage.getItem("authUser");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem("authUser");
    }
  } else {
    console.warn("No stored user found");
  }

  setLoading(false);

  }, []);

  const saveUserToLocalStorage = (user) => {
    setCurrentUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const login = () =>
    signIn().then((user) => {
      saveUserToLocalStorage(user);
    });

  const loginWithEmailFn = async (email, password) => {
    try {
      const user = await loginWithEmail(email, password);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      const user = await registerUser(email, password);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return signOut().then(() => {
      setCurrentUser(null);
      localStorage.removeItem("authUser");
    });
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      loginWithEmail: loginWithEmailFn,
      registerWithEmail,
      currentUser,
      loading,
    }),
    [currentUser]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthProvider;

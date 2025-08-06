import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import firebaseAuth, { registerUser } from "../../handlers/auth";
import { toast } from "react-toastify";

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
      toast.info("please login to use saving functionalities");
    }

    setLoading(false);
  }, []);

  const saveUserToLocalStorage = (user) => {
    setCurrentUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const login = useCallback( () =>
    signIn().then((user) => {
      saveUserToLocalStorage(user);
    }),[]);

  const loginWithEmailFn = useCallback( async (email, password) => {
    try {
      const user = await loginWithEmail(email, password);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  },[]);

  const registerWithEmail = useCallback(async (email, password) => {
    try {
      const user = await registerUser(email, password);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  },[]);

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
    [currentUser,login,loading,loginWithEmailFn,registerWithEmail]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthProvider;

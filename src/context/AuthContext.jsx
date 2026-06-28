import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getMe } from "../services/authService";
import { API_BASE_URL } from "../config/apiurl";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    bootstrapAuth(storedToken).finally(() => setLoading(false));
  }, []);

  const login = async (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);

    await bootstrapAuth(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.reload();
  };

  const bootstrapAuth = async (storedToken) => {
    try {
      const me = await getMe(storedToken);
      setUser(me);
      setToken(storedToken);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getMe, refreshAccessToken, logoutRequest } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const didInit = useRef(false);


  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedAccessToken || !storedRefreshToken) {
      setLoading(false);
      return;
    }

    bootstrapAuth(storedAccessToken, storedRefreshToken).finally(() => setLoading(false));
  }, []);


  const login = async (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken",refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    await bootstrapAuth(accessToken, refreshToken);
  };


  const refreshSession = async () => {
    const tokenToUse = refreshToken || localStorage.getItem("refreshToken");

    if (!tokenToUse) {
      throw new Error("No refresh token");
    }
    const newAccessToken = await refreshAccessToken(tokenToUse);
    localStorage.setItem("accessToken", newAccessToken);
    setAccessToken(newAccessToken);

    return newAccessToken;
  };


  const logout = async () => {
    if (refreshToken) {
      try {
        await logoutRequest(refreshToken);
      } catch {}
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    window.location.reload();
  };


  const bootstrapAuth = async (storedAccessToken, storedRefreshToken) => {
    try {
      const me = await getMe(storedAccessToken);

      setUser(me);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    } catch {
      try {
        const newAccessToken = await refreshAccessToken(storedRefreshToken);

        localStorage.setItem("accessToken", newAccessToken);

        const me = await getMe(newAccessToken);

        setUser(me);
        setAccessToken(newAccessToken);
        setRefreshToken(storedRefreshToken);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
      }
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        login,
        logout,
        refreshSession,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
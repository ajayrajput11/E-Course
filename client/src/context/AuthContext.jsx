import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  // IMPORTANT ---> Accept token + role
  const login = (tokenValue, roleValue) => {
    setToken(tokenValue);
    setRole(roleValue);

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
  };

  const logout = () => {
    setToken(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAdmin: role === "admin",
        isUser: role === "user",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

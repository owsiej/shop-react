import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    username: "",
    password: "",
  });
  const [availableUsers, setAvailableUsers] = useState([]);
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  useEffect(() => {
    setAvailableUsers(
      JSON.parse(window.localStorage.getItem("availableUsers")) ?? []
    );
    setAuthUser(JSON.parse(window.localStorage.getItem("currentUser")) ?? "");
  }, []);

  const login = (userData) => {
    const loggingUser = availableUsers.find(
      (u) => u.username === userData.username
    );
    if (!loggingUser) {
      setAuthErrorMessage("Podany nazwa użytkownika nie istnieje");
      return false;
    } else if (loggingUser.password !== userData.password) {
      setAuthErrorMessage("Podane hasło jest błędne.");
      return false;
    }
    window.localStorage.setItem("currentUser", JSON.stringify(userData));
    setAuthUser(userData);
    return true;
  };

  const register = (userData) => {
    if (availableUsers.find((u) => u.username === userData.username)) {
      setAuthErrorMessage("Podany użytkownik istnieje.");
      return false;
    }
    const updatedUserList = [...availableUsers, userData];
    setAvailableUsers(updatedUserList);
    window.localStorage.setItem(
      "availableUsers",
      JSON.stringify(updatedUserList)
    );
    setAuthUser(userData);
    window.localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    window.localStorage.removeItem("currentUser");
    setAuthUser({
      username: "",
      password: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        authErrorMessage,
        setAuthErrorMessage,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

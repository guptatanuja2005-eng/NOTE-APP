import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "null" || token === "undefined") {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        console.log(error);
      }
    };

    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;

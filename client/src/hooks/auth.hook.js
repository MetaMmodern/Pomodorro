import { useState, useCallback, useEffect } from "react";

const storageName = "userData";
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const login = useCallback((jwtToken, id, inUsername) => {
    console.log("login got", jwtToken, id);
    setToken(jwtToken);
    setUserId(id);
    setUsername(inUsername);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, username: inUsername })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.username);
      // history push
    }
  }, [login]);
  return { login, logout, token, userId, username };
};

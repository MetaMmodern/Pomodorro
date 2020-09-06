import { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          headers["Content-Type"] = "application/json";
          headers["Accept"] = "application/json";
        }
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers,
        });
        if (response.status === 403) {
          logout();
          history.push("/login");
          return {};
        }
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message ||
              "Something went wrong. Check your internet connection."
          );
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [history, logout]
  );
  const clearError = () => {
    setError(null);
  };
  return { loading, request, error, clearError };
};

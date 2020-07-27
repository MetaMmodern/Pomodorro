import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          body: JSON.stringify(body),
          headers,
        });
        console.log(JSON.stringify(body));
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
    []
  );
  const clearError = () => {
    setError(null);
  };
  return { loading, request, error, clearError };
};

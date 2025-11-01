import { useCallback, useReducer } from "react";

const initialState = { isLoad: false, error: null, data: null };

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoad: true, error: null, data: null };
    case "RESP":
      return { ...state, isLoad: false, data: action.data };
    case "ERR":
      return { isLoad: false, error: action.errormsg, data: null };
    case "CLEAR_ERROR":
      return { ...state, error: null }; // ✅ new case
    default:
      throw new Error("Something went wrong in httpReducer!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(async (url, method = "GET", body = null) => {
    dispatchHttp({ type: "SEND" });

    try {
      const response = await fetch(url, { method, body });
      const data = await response.json();

      if (!data || (!data.articles && !data.sources)) {
        dispatchHttp({ type: "ERR", errormsg: "No data received from server!" });
        return;
      }

      dispatchHttp({ type: "RESP", data: data });
      return data;
    } catch (err) {
      dispatchHttp({ type: "ERR", errormsg: err.message || "Request failed!" });
    }
  }, []);

  // ✅ Add this function to clear the error
  const clearError = useCallback(() => {
    dispatchHttp({ type: "CLEAR_ERROR" });
  }, []);

  return {
    isLoading: httpState.isLoad,
    error: httpState.error,
    data: httpState.data,
    sendRequest,
    clearError, // ✅ now returned properly
  };
};

export default useHttp;

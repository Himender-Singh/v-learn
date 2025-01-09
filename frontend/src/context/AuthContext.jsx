import { createContext, useEffect, useReducer } from "react";

// Initial state for the authentication context
const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

// Create the authentication context
export const authContext = createContext(initialState);

// Reducer function to handle authentication actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state, // Keep the existing state
        user: action.payload.user, // Ensure this is the correct user object
        role: action.payload.role, // Ensure this is the role
        token: action.payload.token, // Ensure this is the token
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return initialState; // Reset to initial state on logout

    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state; // Return the current state if action type is unknown
  }
};

// Provider component for authentication context
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token); // Save as a string
    localStorage.setItem("role", state.role); // Save as a string
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch // Include dispatch in the context value
      }}
    >
      {children}
    </authContext.Provider>
  );
};

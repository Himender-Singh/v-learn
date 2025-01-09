import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer /> {/* Moved outside of AuthContextProvider for clarity */}
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);

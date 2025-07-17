import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import AuthProvider from "./components/context/AuthContext";
import { SearchProvider } from "./components/context/SearchContext";
import { FavouriteProvider } from "./components/context/FavouriteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FavouriteProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </FavouriteProvider>
    </AuthProvider>
  </React.StrictMode>
);

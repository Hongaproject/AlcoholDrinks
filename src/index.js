import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";
import { UserProvider } from "./auth/Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
);

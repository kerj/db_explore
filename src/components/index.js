import React from "react";
import { hydrateRoot } from "react-dom";
import App from "./app";

const container = document.getElementById("root");




hydrateRoot(container, <App />);

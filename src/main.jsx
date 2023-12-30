import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter or Router if using React Router
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

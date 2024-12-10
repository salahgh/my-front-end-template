import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./appoloClient.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <SnackbarProvider maxSnack={5}>
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </ReduxProvider>
    </ApolloProvider>
  </StrictMode>,
);

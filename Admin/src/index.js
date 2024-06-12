import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
// import Login from "./components/login/Login";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();

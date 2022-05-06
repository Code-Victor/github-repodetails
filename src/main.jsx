import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase.config";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </FirebaseAppProvider>
  </Provider>
);

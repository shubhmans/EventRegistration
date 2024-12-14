import React from "react";
import "./App.css";
import routes from "./routes";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { store } from "./utils/redux/userStore";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Router basename="">
        <div className="App">
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
        </div>
      </Router>
    </Provider>
  );
}

export default App;

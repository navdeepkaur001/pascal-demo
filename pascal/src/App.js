import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/reducers/history";
import Application from "./Application";

import { PersistGate } from "redux-persist/lib/integration/react";
let { store, persistor } = configureStore();

function App() {
  // const store = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Application></Application>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

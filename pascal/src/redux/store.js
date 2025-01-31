import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["connect", "user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  // redux devtools
  const enhancers =
    process.env.NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  // create redux store
  const store = createStore(persistedReducer, enhancers);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;

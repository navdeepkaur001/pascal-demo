import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import connect from "./connectReducer";
import loading from "./loading";
import admin from "./";
import user from "./user.reducer";
export const history = createBrowserHistory();
const appReducer = combineReducers({
  connect: connect,
  user: user,
  loading: loading,
  form: formReducer,
  router: connectRouter(history),
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USERS_PERSIST") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { reducer } from "./reducers";
import thunk from "redux-thunk";
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;

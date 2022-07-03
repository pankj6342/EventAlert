import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const middleware = [thunk];
// import { composeWithDevTools } from "redux-devtools-extension";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// // The store now has the ability to accept thunk functions in `dispatch`
// const store = createStore(rootReducer, composedEnhancer);

// if (process.env.NODE_ENV === "developement") {
middleware.push(logger);
// }

export const store = createStore(rootReducer, applyMiddleware(...middleware));

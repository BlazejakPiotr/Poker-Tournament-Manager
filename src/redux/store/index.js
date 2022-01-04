import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import tournamentReducer from "../reducers/tournament.js";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import userReducer from "../reducers/user.js";
import modalReducer from "../reducers/modal.js";

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  tournament: {
    data: {},
    players: [],
    blinds: [],
    tables: [],
  },
  modal: {
    rounds: false,
    players: false,
    settings: false,
    temp: {}
  },
  user: {},
};

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
      onError: (error) => {
        console.log(error);
      },
    }),
  ],
};

const bigReducer = combineReducers({
  modal: modalReducer,
  tournament: tournamentReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnchancers(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };

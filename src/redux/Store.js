import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootreducer } from "./reducer/root.reducer";
import rootsaga from "./saga/root.saga";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootreducer);

const sagaMiddleware = createSagaMiddleware();

const Middlewares = [sagaMiddleware, thunk];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...Middlewares)
);
export let persistor = persistStore(store);
// return { store, persistor };

sagaMiddleware.run(rootsaga);

import { configureStore } from "@reduxjs/toolkit";
import register from "./reducer/register";
import login from "./reducer/login";
import profile from "./reducer/profile";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const reducers = combineReducers({
  profile,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persistedReducer, register, login },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
const commonConfig = {
  key: "shop/user",
  storage,
  throttle: 500,
};

const userConfig = {
  ...commonConfig,
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

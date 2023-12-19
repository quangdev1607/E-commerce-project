import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./app/appSlice";
import productSlice from "./product/productSlice";
import userSlice from "./user/userSlice";

const commonConfig = {
  storage,
  throttle: 500,
};

const userConfig = {
  key: "shop/user",
  ...commonConfig,
};
const productConfig = {
  key: "shop/deal",
  ...commonConfig,
  whitelist: ["dealDaily"],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
    products: persistReducer(productConfig, productSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

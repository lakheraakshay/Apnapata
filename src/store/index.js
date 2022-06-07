import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import propertyReducer from "./reducers/property-slice";
import authReducer from "./reducers/auth-slice";
import homeReducer from './reducers/home-slice'
import servicesReducer from "./reducers/services-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    property: propertyReducer,
    services: servicesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;

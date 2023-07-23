import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import dialogReducer from "../features/dialog/positionSlice";
import positionReducer from "../features/position/positionSlice";
// import reduxLogger from "redux-logger";

// const logger = reduxLogger.createLogger()
const store = configureStore({
  reducer: {
        dialog: dialogReducer,
      position:positionReducer,
  },
  // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});

export default store;

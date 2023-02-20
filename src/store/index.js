import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../reducer";

//stato globale
const store = configureStore({
  reducer: Reducer,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./pages/FlowContainer/flowReducer";
import { FlowState } from "./types/flowType";

export type State = {
  flow: FlowState;
};

const reducer = {
  flow: flowReducer,
};

export default configureStore({
  reducer,
});

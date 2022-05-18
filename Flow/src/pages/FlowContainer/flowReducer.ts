import { createAction, createReducer } from "@reduxjs/toolkit";
import { FlowState, FlowFilterObj } from "../../types/flowType";
import { generateOutputObj } from "./util";

export const updateInput = createAction<any>("flow/updateInput");
export const updateSelector = createAction<Array<string>>(
  "flow/updateSelector"
);
export const updateFilter = createAction<FlowFilterObj>("flow/updateFiler");
export const updateOutput = createAction("flow/updateOutput");

const initialState = {
  input: [{}],
  output: [],
} as FlowState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateInput, (state, action) => {
      state.input = action.payload;
      state.output = action.payload;
    })
    .addCase(updateSelector, (state, action) => {
      state.selectors = action.payload;
    })
    .addCase(updateFilter, (state, action) => {
      state.filters = action.payload;
    })
    .addCase(updateOutput, (state, action) => {
      state.output = generateOutputObj(state);
    });
});

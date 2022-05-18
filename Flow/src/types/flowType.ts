export enum Operators {
  "gt" = ">",
  "lt" = "<",
  "eq" = "=",
  "neq" = "!=",
  "in" = "in",
  "notin" = "!in",
  "contains" = "contains",
}

export interface FlowFilterObj {
  name: string;
  operator: Operators;
  value: string;
  type: "string" | "number";
}

export interface FlowState {
  input: Array<any>;
  selectors?: Array<string>;
  filters?: FlowFilterObj;
  output: Array<any>;
}

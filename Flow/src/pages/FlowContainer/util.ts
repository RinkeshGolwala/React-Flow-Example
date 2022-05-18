import { FlowState, Operators } from "../../types/flowType";

export const generateOutputObj = (state: FlowState) => {
  const { selectors, filters, input } = state;
  if (selectors) {
    state.output = input.map((element) => {
      if (selectors.length === 0) {
        return element;
      } else if (selectors.length === 1) {
        return element[selectors[0]];
      } else {
        return selectors.reduce((a: any, c: string) => {
          a[c] = element[c];
          return a;
        }, {});
      }
    });
  } else {
    state.output = state.input;
  }

  let output = state.output;
  if (
    filters &&
    (!selectors || !selectors.length || selectors.includes(filters?.name))
  ) {
    const { name, operator, value, type } = filters;

    if (selectors?.length === 1 && selectors[0] === name) {
      if (operator === Operators.eq) {
        if (type === "string") {
          output = output.filter(
            (item) => item.toLowerCase() === value.toLowerCase()
          );
        } else if (type === "number") {
          output = output.filter((item) => item === Number(value));
        }
      } else if (operator === Operators.neq) {
        if (type === "string") {
          output = output.filter(
            (item) => item.toLowerCase() !== value.toLowerCase()
          );
        } else if (type === "number") {
          output = output.filter((item) => item !== Number(value));
        }
      } else if (operator === Operators.lt) {
        output = output.filter((item) => item < Number(value));
      } else if (operator === Operators.gt) {
        output = output.filter((item) => item > Number(value));
      } else if (operator === Operators.contains) {
        output = output.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
      } else if (operator === Operators.in) {
        const numericVal = value.split(",").map((val) => Number(val));
        output = output.filter((item) => numericVal.includes(item));
      } else if (operator === Operators.notin) {
        const numericVal = value.split(",").map((val) => Number(val));
        output = output.filter((item) => !numericVal.includes(item));
      }
    } else {
      if (operator === Operators.eq) {
        if (type === "string") {
          output = output.filter((item) => {
            return item[name].toLowerCase() === value.toLowerCase();
          });
        } else if (type === "number") {
          output = output.filter((item) => item[name] === Number(value));
        }
      } else if (operator === Operators.neq) {
        if (type === "string") {
          output = output.filter(
            (item) => item[name].toLowerCase() !== value.toLowerCase()
          );
        } else if (type === "number") {
          output = output.filter((item) => item[name] !== Number(value));
        }
      } else if (operator === Operators.lt) {
        output = output.filter((item) => item[name] < Number(value));
      } else if (operator === Operators.gt) {
        output = output.filter((item) => item[name] > Number(value));
      } else if (operator === Operators.contains) {
        output = output.filter((item) =>
          item[name].toLowerCase().includes(value.toLowerCase())
        );
      } else if (operator === Operators.in) {
        const numericVal = value.split(",").map((val) => Number(val));
        output = output.filter((item) => numericVal.includes(item[name]));
      } else if (operator === Operators.notin) {
        const numericVal = value.split(",").map((val) => Number(val));
        output = output.filter((item) => !numericVal.includes(item[name]));
      }
    }
  }

  return output;
};

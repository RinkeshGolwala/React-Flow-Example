import React, { ChangeEvent, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store";
import { updateFilter, updateOutput } from "../pages/FlowContainer/flowReducer";
import { FlowFilterObj, Operators } from "../types/flowType";

export default () => {
  const [filter, setFilter] = useState<FlowFilterObj>({
    name: "",
    operator: Operators.eq,
    value: "",
    type: "string",
  });
  const [operators2Disp, setOperators2Disp] = useState<Operators[]>([]);
  const dispatch = useDispatch();

  const input = useSelector<State>((state) => state.flow.input) as Array<any>;
  const selectors = useSelector<State>(
    (state) => state.flow.selectors
  ) as Array<string>;

  const inputObject = input[0];
  const keys =
    selectors && selectors.length ? selectors : Object.keys(inputObject);

  const updateFilterName = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    const type = typeof inputObject[name] as "string" | "number";
    if (type === "string") {
      setOperators2Disp([Operators.eq, Operators.contains, Operators.neq]);
    } else if (type === "number") {
      setOperators2Disp([
        Operators.eq,
        Operators.lt,
        Operators.gt,
        Operators.in,
        Operators.notin,
        Operators.neq,
      ]);
    }

    setFilter({ ...filter, name, type });
  };

  const updateOperator = (e: ChangeEvent<HTMLSelectElement>) => {
    const operator = e.target.value as Operators;
    setFilter({ ...filter, operator: operator });
  };

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, value: e.target.value });
  };

  useEffect(() => {
    if (filter.name && filter.value && filter.operator) {
      dispatch(updateFilter(filter));
      dispatch(updateOutput());
    }
  }, [filter.name, filter.value, filter.operator]);

  useEffect(() => {
    if (filter.name && !keys.includes(filter.name)) {
      const newFilter: FlowFilterObj = {
        ...filter,
        name: "",
        operator: Operators.eq,
        value: "",
      };
      setFilter(newFilter);
      dispatch(updateFilter(newFilter));
      dispatch(updateOutput());
    }
  }, [selectors]);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="card selector-container">
        <h4 className="title">Filter</h4>
        <div className="py-2 px-2">
          {keys.length ? (
            <div className="filter-container">
              <select
                className="select"
                value={filter.name}
                onChange={updateFilterName}
              >
                <option disabled value="">
                  Please Select
                </option>
                {keys.map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
              <select
                className="select"
                value={filter.operator}
                onChange={updateOperator}
              >
                <option disabled value="">
                  Please Select
                </option>
                {operators2Disp.map((op) => (
                  <option value={op} key={op}>
                    {op}
                  </option>
                ))}
              </select>
              <input
                className="text-input"
                value={filter.value}
                onChange={updateValue}
              />
              {(filter.operator === Operators.in ||
                filter.operator === Operators.notin) && (
                <p>Add comma sepated number</p>
              )}
            </div>
          ) : (
            <p>Upload a JSON to use Filter</p>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

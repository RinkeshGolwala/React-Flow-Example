import React, { ChangeEvent } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store";
import Checkbox from "../components/Checkbox";
import { updateOutput, updateSelector } from "../pages/FlowContainer/flowReducer";

export default () => {
  const dispatch = useDispatch();
  const input = useSelector<State>((state) => state.flow.input) as Array<object>;
  let selectors = useSelector<State>(state => state.flow.selectors || []) as Array<string>;
  const keys = Object.keys(input[0]);
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    if(checked) {
      if(!selectors.includes(name)) {
        selectors = [...selectors, name];
      }
    } else {
      if(selectors.includes(name)) {
        selectors = selectors.filter(n => n !== name);
      }
    }
    dispatch(updateSelector(selectors));
    dispatch(updateOutput());
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="card selector-container">
        <h4 className="title">Selector</h4>
        <div className="py-2 px-2">
        {keys.length ? (
          keys.map((key) => (
            <Checkbox label={key} key={key} name={key} onChange={onChange}/>
          ))
        ) : (
          <p>Upload a JSON to use Selector</p>
        )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

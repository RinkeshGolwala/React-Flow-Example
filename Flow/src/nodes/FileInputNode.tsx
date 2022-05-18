import React, { FormEvent, useRef, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { updateInput } from "../pages/FlowContainer/flowReducer";

export default () => {
  const dispatch = useDispatch();
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fileName, setFileName] = useState("");

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0]!;
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (event) => {
      const fileContent = JSON.parse(event.target!.result! as string);
      dispatch(updateInput(fileContent));
      setFileName(file.name);
    };
  };

  const openFileUpload = () => {
    fileRef.current.click();
  };

  return (
    <>
      <div className="card">
        <h4 className="title">Input</h4>
        <p className="m-1">{fileName || "Upload JSON only"}</p>
        <input ref={fileRef} type="file" onChange={handleChange} hidden />
        <button className="button" onClick={openFileUpload}>
          Select File
        </button>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

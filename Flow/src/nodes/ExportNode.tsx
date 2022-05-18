import React from "react";
import CsvDownload from "react-json-to-csv";
import { Handle, Position } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { State } from "../store";

export default () => {
  const output = useSelector<State>((state) => state.flow.output) as Array<any>;
  const selectors = useSelector<State>(
    (state) => state.flow.selectors
  ) as Array<string>;
  let exportJSON = output;

  if (selectors?.length === 1 && typeof output[0] !== "object") {
    const sel = selectors[0];
    exportJSON = output.map((item) => ({ [sel]: item }));
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="card wide">
        <h4 className="title">Output (Preview)</h4>
        {output.length ? (
          <div style={{ maxHeight: "20rem", overflow: "scroll", textAlign: 'left' }}>
            <pre>{JSON.stringify(output, null, 2)}</pre>
          </div>
        ) : (
          <p>Upload JSON</p>
        )}
        <CsvDownload className="button" data={exportJSON}>
          Export
        </CsvDownload>
      </div>
    </>
  );
};

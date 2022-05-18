import React, { useCallback, ReactElement, useState, ReactNode } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from "react-flow-renderer";
import "./FlowContainer.css";
import FileInputNode from "../../nodes/FileInputNode";
import ExportNode from "../../nodes/ExportNode";
import SelectorNode from "../../nodes/SelectorNode";
import FilterNode from "../../nodes/FilterNode";
import { filterNode, initialNodes, selectorNode } from "./nodes";

const nodeTypes = {
  fileInput: FileInputNode,
  selector: SelectorNode,
  filter: FilterNode,
  export: ExportNode,
};

const initialEdges = [
  {
    id: "e1-2",
    source: "input",
    target: "export",
    stroke: "#333333",
    animated: true,
  },
];

function App() {
  const [disabledSelectorButton, setDisableSelectorButton] = useState(false);
  const [disabledFilterButton, setDisableFilterButton] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Edge<any> | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addSelectorNode = () => {
    setNodes((nds) => {
      const [n0, ...n] = nds;
      return [n0, selectorNode, ...n];
    });
    setEdges((eds) => {
      const [e0, ...e] = eds;
      return [
        { ...e0, target: "selector" },
        {
          id: "e2-3",
          source: "selector",
          target: e.length ? "filter" : "export",
          stroke: "#333333",
          animated: true,
        },
        ...e,
      ];
    });
    setDisableSelectorButton(true);
  };

  const addFilterNode = () => {
    setNodes((nds) => {
      const [n0, ...n] = nds;
      return [n0, filterNode, ...n];
    });
    setEdges((eds) => {
      const [e0, e1] = edges;
      if (e1) {
        return [
          e0,
          { ...e1, target: "filter" },
          {
            id: "e3-4",
            source: "filter",
            target: "export",
            stroke: "#333333",
            animated: true,
          },
        ];
      } else {
        return [
          { ...e0, target: "filter" },
          {
            id: "e3-4",
            source: "filter",
            target: "export",
            stroke: "#333333",
            animated: true,
          },
        ];
      }
    });
    setDisableFilterButton(true)
  };

  return (
    <div className="app">
      <header className="app-header">
        <p>React Flow!</p>
      </header>
      <section className="flow-section">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultZoom={0.8}
        >
          <Background variant={BackgroundVariant.Lines} gap={48} size={1} />
        </ReactFlow>
      </section>
      <div className="button-container">
        <button className="primary button" onClick={addSelectorNode} disabled={disabledSelectorButton}>
          Selector Node
        </button>
        <button className="primary button" onClick={addFilterNode} disabled={disabledFilterButton}>
          Filter Node
        </button>
      </div>
    </div>
  );
}

export default App;

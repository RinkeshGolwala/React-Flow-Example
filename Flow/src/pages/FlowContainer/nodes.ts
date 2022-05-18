import { ReactElement } from "react";
import { Node } from "react-flow-renderer";

interface NodeData {
  label?: ReactElement | string;
}

const inputNode = {
  id: "input",
  type: "fileInput",
  data: {},
  position: { x: 100, y: 100 },
};

const exportNode = {
  id: "export",
  type: "export",
  draggable: false,
  position: { x: 1300, y: 100 },
  data: {},
};

export const selectorNode = {
  id: "selector",
  type: "selector",
  data: {},
  position: { x: 400, y: 150 },
};

export const filterNode = {
  id: "filter",
  type: "filter",
  data: {},
  position: { x: 900, y: 150 },
};

export const initialNodes: Node<NodeData>[] = [inputNode, exportNode];

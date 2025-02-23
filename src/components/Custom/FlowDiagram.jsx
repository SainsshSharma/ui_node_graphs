"use client";

import dagre from "dagre";
import { FileCode2, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Handle,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "../ui/button";

const CustomNode = ({ data }) => (
  <div
    className={`border-[#FFAD62] text-white border bg-[#181E25] rounded-sm w-[300px] pb-4 ${
      data.isSelected && "shadow-lg shadow-[#ffae6238]"
    }`}
  >
    <div className="flex justify-between items-center ">
      <strong className="p-2 text-[14px]">
        {data.label.split(":")[0].split("/").at(-1)}
      </strong>
      <Image src="/arrow.png" width={16} height={16} alt="arrow" className="mr-2"/>
    </div>
    <hr className="border-[#FFAD62] pb-4" />
    <strong className="p-2 text-[14px] ">
      {data.label.split(":").at(-1).split(".").at(-1)}
    </strong>

    {data.params?.map((item, key) => (
      <div key={key} className=" px-2 flex space-x-1 ">
        <p className="text-[10px] text-[#FFAD62] min-w-fit">
          "{item.identifier}" :{" "}
        </p>
        <p className="text-[10px]">"{item.type}"</p>
      </div>
    ))}

    <Handle type="target" position="left" className="opacity-0" />
    <Handle type="source" position="right" className="opacity-0" />
  </div>
);

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

dagreGraph.setGraph({
  rankdir: "LR",
  nodesep: 100,
  edgesep: 100,
  ranksep: 300,
});

const getLayoutedElements = (nodes, edges) => {
  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: 300, height: 100 })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 90,
      y: nodeWithPosition.y - 30,
    };
  });

  return { nodes, edges };
};

const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];
  const nodeMap = new Map();

  const traverse = (node, parentId = null, index = 0) => {
    const id = `${parentId ? parentId + "-" : ""}${index}`;

    nodes.push({
      id,
      data: {
        label: node.function,
        params: node.params,
        response_object: node.response_object,
        isSelected: false,
        childNodesLength: node.children.length,
      },
      type: "custom",
    });

    nodeMap.set(node.function, id);

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: "step",
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          strokeWidth: 2,
        },
      });
    }

    node.children?.forEach((child, idx) => traverse(child, id, idx));
  };

  traverse(data[0]);
  return getLayoutedElements(nodes, edges);
};

export default function FlowDiagram({ selectedNode, setSelectedNode, data }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  useEffect(() => {
    if (data) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        generateNodesAndEdges(data);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [data]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (event, node) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => ({
        ...n,
        data: { ...n.data, isSelected: n.id === node.id },
      }))
    );
    setSelectedNode(node);
  };
  useEffect(() => {
    if (nodes.length > 1 && selectedNode == undefined) {
      nodes[0].data.isSelected = true;
      setSelectedNode(nodes[0]);
    }
  }, [nodes]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls
          position="bottom-right"
          showZoom
          showFitView={false}
          showInteractive={false}
          className="!absolute !bottom-16 right-4 flex flex-row  p-2 rounded-lg shadow-md"
        />
        <Background variant="line" gap={40} size={1} color="#2D3748" />
        <div className="!absolute !bottom-16 left-4 p-4 z-50">
          <Button className="bg-[#F27400]">
            <Plus /> Add Methods
          </Button>
        </div>
      </ReactFlow>
      <div className="flex items-center gap-4 bg-[#363636] bottom-0 fixed  w-full p-2">
        <FileCode2 className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {selectedNode?.data?.label}
        </span>
      </div>
    </div>
  );
}

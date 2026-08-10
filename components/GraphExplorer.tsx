"use client";

import { useState, useMemo, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Search,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  type: "recipe" | "ingredient" | "cuisine" | "diet" | "category";
  sublabel?: string;
  x?: number;
  y?: number;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
}

interface GraphExplorerProps {
  initialNodes?: NodeData[];
  initialEdges?: EdgeData[];
  height?: string;
}

export function GraphExplorer({
  initialNodes = [],
  initialEdges = [],
  height = "h-[650px]",
}: GraphExplorerProps) {
  const [selectedNodeType, setSelectedNodeType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const positionedNodes = useMemo(() => {
    const nodes = initialNodes.length > 0 ? initialNodes : [];
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const recipes = nodes.filter((n) => n.type === "recipe");
    const ingredients = nodes.filter((n) => n.type === "ingredient");
    const cuisines = nodes.filter((n) => n.type === "cuisine");
    const diets = nodes.filter((n) => n.type === "diet");

    return nodes.map((node) => {
      let radius = 180;
      let angle = 0;

      if (node.type === "recipe") {
        const idx = recipes.findIndex((r) => r.id === node.id);
        radius = 140;
        angle = (idx / Math.max(recipes.length, 1)) * 2 * Math.PI;
      } else if (node.type === "ingredient") {
        const idx = ingredients.findIndex((i) => i.id === node.id);
        radius = 240;
        angle = (idx / Math.max(ingredients.length, 1)) * 2 * Math.PI + 0.3;
      } else if (node.type === "cuisine") {
        const idx = cuisines.findIndex((c) => c.id === node.id);
        radius = 70;
        angle = (idx / Math.max(cuisines.length, 1)) * 2 * Math.PI;
      } else {
        const idx = diets.findIndex((d) => d.id === node.id);
        radius = 300;
        angle = (idx / Math.max(diets.length, 1)) * 2 * Math.PI;
      }

      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  }, [initialNodes]);

  const filteredNodes = useMemo(() => {
    return positionedNodes.filter((node) => {
      const matchesType = selectedNodeType === "all" || node.type === selectedNodeType;
      const matchesSearch =
        !searchQuery ||
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [positionedNodes, selectedNodeType, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return initialEdges.filter(
      (edge) => filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
    );
  }, [initialEdges, filteredNodeIds]);

  const connectedDetails = useMemo(() => {
    if (!selectedNode) return null;

    const connectedEdges = initialEdges.filter(
      (e) => e.source === selectedNode.id || e.target === selectedNode.id
    );

    const neighborIds = connectedEdges.map((e) =>
      e.source === selectedNode.id ? e.target : e.source
    );

    const neighbors = positionedNodes.filter((n) => neighborIds.includes(n.id));

    return {
      edges: connectedEdges,
      neighbors,
    };
  }, [selectedNode, initialEdges, positionedNodes]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "svg" || (e.target as HTMLElement).id === "graph-canvas") {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "recipe":
        return { bg: "#C85A32", fill: "#FDF6F3", stroke: "#AC4A27", text: "text-terracotta-500" };
      case "ingredient":
        return { bg: "#2B533F", fill: "#F2F6F3", stroke: "#203E2F", text: "text-herb-600" };
      case "cuisine":
        return { bg: "#4F46E5", fill: "#EEF2FF", stroke: "#3730A3", text: "text-indigo-600" };
      case "diet":
        return { bg: "#E29D38", fill: "#FFFBEB", stroke: "#B45309", text: "text-amber-600" };
      default:
        return { bg: "#6B7280", fill: "#F9FAFB", stroke: "#374151", text: "text-gray-600" };
    }
  };

  return (
    <div className={`relative w-full ${height} bg-white rounded-3xl border border-cream-300 shadow-card overflow-hidden flex flex-col md:flex-row`}>
      {/* Canvas Area */}
      <div className="relative flex-1 h-full bg-cream-100 overflow-hidden select-none">
        {/* Controls Toolbar */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-cream-300 shadow-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-charcoal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter relationship map..."
              className="pl-8 pr-3 py-1.5 bg-cream-50 rounded-xl text-xs font-medium text-charcoal-800 focus:outline-none border border-cream-300 w-36 sm:w-48"
            />
          </div>

          <div className="flex items-center gap-1 border-l border-cream-300 pl-2">
            {["all", "recipe", "ingredient", "cuisine", "diet"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedNodeType(type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  selectedNodeType === type
                    ? "bg-herb-500 text-white shadow-xs"
                    : "text-charcoal-600 hover:bg-cream-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-cream-300 shadow-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.5))}
            className="p-2 hover:bg-cream-200 rounded-xl text-charcoal-700 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.4))}
            className="p-2 hover:bg-cream-200 rounded-xl text-charcoal-700 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="p-2 hover:bg-cream-200 rounded-xl text-charcoal-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Canvas */}
        <div
          id="graph-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <svg className="w-full h-full">
            <g
              transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
              style={{ transformOrigin: "center center" }}
            >
              {filteredEdges.map((edge) => {
                const sourceNode = positionedNodes.find((n) => n.id === edge.source);
                const targetNode = positionedNodes.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected =
                  selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

                return (
                  <g key={edge.id}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnected ? "#C85A32" : "#E9E2D7"}
                      strokeWidth={isConnected ? 2.5 : 1.2}
                      strokeDasharray={edge.label === "SUBSTITUTES" ? "4,4" : "none"}
                    />
                  </g>
                );
              })}

              {filteredNodes.map((node) => {
                const colors = getNodeColor(node.type);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#C85A32"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      r="16"
                      fill={colors.bg}
                      stroke={isSelected ? "#C85A32" : colors.stroke}
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125"
                    />
                    <text
                      y="28"
                      fill="#1A1816"
                      fontSize="10"
                      fontWeight={isSelected ? "bold" : "600"}
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Side Inspector Panel */}
      <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-cream-300 p-6 flex flex-col justify-between overflow-y-auto">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getNodeColor(selectedNode.type).bg }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                  {selectedNode.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg hover:bg-cream-100 text-charcoal-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-charcoal-900">
                {selectedNode.label}
              </h3>
              {selectedNode.sublabel && (
                <span className="text-xs text-charcoal-500">{selectedNode.sublabel}</span>
              )}
            </div>

            {connectedDetails && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Direct Culinary Connections ({connectedDetails.neighbors.length})
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {connectedDetails.neighbors.map((neighbor) => (
                    <div
                      key={neighbor.id}
                      onClick={() => setSelectedNode(neighbor)}
                      className="p-3 rounded-2xl bg-cream-50 hover:bg-cream-100 border border-cream-200 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-xs text-charcoal-900 block">
                          {neighbor.label}
                        </span>
                        <span className="text-[10px] text-herb-600 font-mono capitalize">
                          {neighbor.type}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-charcoal-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-herb-50 text-herb-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-charcoal-900">
              Food Connections Map
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Select any item in the visualizer to explore its recipe pairings, substitution alternatives, and global regional origins.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-cream-200 text-xs space-y-2">
          <span className="font-semibold text-charcoal-700 block">Legend:</span>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32]" /> Recipe
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2B533F]" /> Ingredient
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" /> Cuisine
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E29D38]" /> Diet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

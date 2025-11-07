import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Save, Share2, PanelLeftOpen, FileEdit, PlayCircle, BarChart3, Webhook } from 'lucide-react';
import { CustomNode } from '@/components/workflow/CustomNode';
import { NodeSidebar } from '@/components/workflow/NodeSidebar';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Webhook Trigger',
      icon: Webhook,
      type: 'trigger',
      description: 'Start workflow on HTTP request'
    },
  },
];

const initialEdges: Edge[] = [];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: 'hsl(var(--primary))' },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: 'hsl(var(--primary))',
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeData = event.dataTransfer.getData('application/reactflow');
      if (!nodeData) return;

      const parsedData = JSON.parse(nodeData);
      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: parsedData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none outline-none focus:ring-0 text-foreground"
            />
            <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
              Draft
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="bg-gradient-primary" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Test Workflow
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Node Sidebar */}
        {isSidebarOpen && <NodeSidebar />}

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-muted/30"
          >
            <Background color="hsl(var(--primary) / 0.1)" gap={16} />
            <Controls className="bg-card border border-border rounded-lg shadow-lg" />
            <MiniMap
              className="bg-card border border-border rounded-lg shadow-lg"
              nodeColor={(node) => {
                if (node.data.type === 'trigger') return 'hsl(var(--primary))';
                if (node.data.type === 'action') return 'hsl(var(--accent))';
                return 'hsl(var(--muted))';
              }}
            />
            <Panel position="top-right" className="bg-card border border-border rounded-lg shadow-lg p-4 m-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileEdit className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Editor</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PlayCircle className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Executions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Evaluations</span>
                </div>
              </div>
            </Panel>
            <Panel position="top-left" className="m-4">
              <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                size="icon"
                variant="outline"
                className="bg-card shadow-lg"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </Button>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

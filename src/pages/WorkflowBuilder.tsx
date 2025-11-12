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
import { Play, Save, Share2, PanelLeftOpen, FileEdit, PlayCircle, BarChart3, Download, Upload, Github, Power } from 'lucide-react';
import { CustomNode } from '@/components/workflow/CustomNode';
import { NodeSidebar } from '@/components/workflow/NodeSidebar';
import { NodeConfigDialog } from '@/components/workflow/NodeConfigDialog';
import { ExecutionsPanel } from '@/components/workflow/ExecutionsPanel';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
      iconName: 'Webhook',
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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'editor' | 'executions' | 'evaluations'>('editor');
  const [isWorkflowActive, setIsWorkflowActive] = useState(false);
  const [executions, setExecutions] = useState<any[]>([]);
  const { toast } = useToast();

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

      const nodeId = `node-${Date.now()}`;
      const newNode: Node = {
        id: nodeId,
        type: 'custom',
        position,
        data: {
          ...parsedData,
          onEdit: () => handleEditNode(nodeId),
          onExecute: () => handleExecuteNode(nodeId),
          onDelete: () => handleDeleteNode(nodeId),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleEditNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setIsConfigDialogOpen(true);
    }
  };

  const handleExecuteNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    toast({
      title: 'Executing Node',
      description: `Running ${node?.data.label}...`,
    });
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    toast({
      title: 'Node Deleted',
      description: 'Node removed from workflow',
    });
  };

  const handleSaveNodeConfig = (nodeId: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
    toast({
      title: 'Node Updated',
      description: 'Node configuration saved successfully',
    });
  };

  const handleTestWorkflow = () => {
    const execution = {
      id: `exec-${Date.now()}`,
      workflowName,
      status: 'running' as const,
      startTime: new Date(),
    };
    setExecutions((prev) => [execution, ...prev]);
    
    toast({
      title: 'Workflow Execution Started',
      description: 'Testing workflow...',
    });

    setTimeout(() => {
      setExecutions((prev) =>
        prev.map((exec) =>
          exec.id === execution.id
            ? { ...exec, status: 'success' as const, duration: 1234 }
            : exec
        )
      );
      toast({
        title: 'Workflow Completed',
        description: 'Test execution finished successfully',
      });
    }, 2000);
  };

  const handleDownloadWorkflow = () => {
    const workflow = {
      name: workflowName,
      nodes,
      edges,
      active: isWorkflowActive,
    };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflowName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Workflow Downloaded',
      description: 'Workflow exported successfully',
    });
  };

  const handleUploadWorkflow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workflow = JSON.parse(e.target?.result as string);
        setWorkflowName(workflow.name);
        setNodes(workflow.nodes);
        setEdges(workflow.edges);
        setIsWorkflowActive(workflow.active || false);
        toast({
          title: 'Workflow Loaded',
          description: 'Workflow imported successfully',
        });
      } catch (error) {
        toast({
          title: 'Import Failed',
          description: 'Invalid workflow file',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="workflow-active"
                checked={isWorkflowActive}
                onCheckedChange={setIsWorkflowActive}
              />
              <Label htmlFor="workflow-active" className="text-sm cursor-pointer">
                {isWorkflowActive ? 'Active' : 'Inactive'}
              </Label>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => document.getElementById('file-upload')?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: 'Coming Soon', description: 'GitHub import will be available soon' })}>
                  <Github className="w-4 h-4 mr-2" />
                  From GitHub
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={handleUploadWorkflow}
              className="hidden"
            />
            
            <Button variant="outline" size="sm" onClick={handleDownloadWorkflow}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toast({ title: 'Link Copied', description: 'Share link copied to clipboard' })}>
                  Copy Share Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: 'Coming Soon', description: 'Team sharing will be available soon' })}>
                  Invite Team Members
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button className="bg-gradient-primary" size="sm" onClick={handleTestWorkflow}>
              <Play className="w-4 h-4 mr-2" />
              Test Workflow
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Node Sidebar */}
        {currentView === 'editor' && isSidebarOpen && <NodeSidebar />}

        {/* Main Content Area */}
        <div className="flex-1 relative">
          <div className="relative h-full">
            {/* View Switcher - Always visible */}
            <div className="absolute top-4 right-4 z-10 bg-card border border-border rounded-lg shadow-lg p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentView('editor')}
                  className={`flex items-center gap-2 text-sm w-full p-2 rounded transition-colors ${
                    currentView === 'editor' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setCurrentView('executions')}
                  className={`flex items-center gap-2 text-sm w-full p-2 rounded transition-colors ${
                    currentView === 'executions' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Executions</span>
                </button>
                <button
                  onClick={() => setCurrentView('evaluations')}
                  className={`flex items-center gap-2 text-sm w-full p-2 rounded transition-colors ${
                    currentView === 'evaluations' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Evaluations</span>
                </button>
              </div>
            </div>

            {currentView === 'editor' ? (
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
            ) : currentView === 'executions' ? (
              <ExecutionsPanel executions={executions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Evaluations</h3>
                  <p className="text-muted-foreground">Workflow evaluation metrics coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <NodeConfigDialog
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        node={selectedNode}
        onSave={handleSaveNodeConfig}
      />
    </div>
  );
}

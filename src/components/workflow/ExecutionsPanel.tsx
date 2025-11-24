import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, Clock, Play, ArrowLeft, User, Hash } from 'lucide-react';
import { useState } from 'react';

interface NodeExecution {
  nodeId: string;
  nodeName: string;
  status: 'success' | 'error' | 'skipped';
  startTime: Date;
  duration: number;
  output?: any;
  error?: string;
}

interface Execution {
  id: string;
  workflowName: string;
  userName: string;
  status: 'success' | 'error' | 'running';
  startTime: Date;
  duration?: number;
  nodeExecutions?: NodeExecution[];
}

interface ExecutionsPanelProps {
  executions: Execution[];
}

export function ExecutionsPanel({ executions }: ExecutionsPanelProps) {
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'running':
        return <Clock className="w-4 h-4 text-primary animate-pulse" />;
      case 'skipped':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'running':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Running</Badge>;
      case 'skipped':
        return <Badge variant="secondary">Skipped</Badge>;
      default:
        return null;
    }
  };

  if (selectedExecution) {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedExecution(null)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </Button>
          </div>
          <h2 className="text-xl font-semibold">{selectedExecution.workflowName}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{selectedExecution.userName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>{selectedExecution.id}</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(selectedExecution.status)}
              {getStatusBadge(selectedExecution.status)}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Execution Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Start Time:</span>
                    <p className="font-medium">{selectedExecution.startTime.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">
                      {selectedExecution.duration ? `${selectedExecution.duration}ms` : 'In progress...'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Nodes:</span>
                    <p className="font-medium">{selectedExecution.nodeExecutions?.length || 0}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Executed By:</span>
                    <p className="font-medium">{selectedExecution.userName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Node Execution Details</CardTitle>
                <CardDescription>
                  Step-by-step execution results for each node
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedExecution.nodeExecutions && selectedExecution.nodeExecutions.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead>Node Name</TableHead>
                          <TableHead>Start Time</TableHead>
                          <TableHead className="w-[100px]">Duration</TableHead>
                          <TableHead>Output / Error</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedExecution.nodeExecutions.map((nodeExec) => (
                          <TableRow key={nodeExec.nodeId}>
                            <TableCell>
                              {getStatusIcon(nodeExec.status)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {nodeExec.nodeName}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {nodeExec.startTime.toLocaleTimeString()}
                            </TableCell>
                            <TableCell className="text-sm">
                              {nodeExec.duration}ms
                            </TableCell>
                            <TableCell>
                              {nodeExec.status === 'error' ? (
                                <div className="text-destructive text-sm">
                                  <p className="font-medium">Error:</p>
                                  <p className="mt-1">{nodeExec.error}</p>
                                </div>
                              ) : nodeExec.status === 'success' ? (
                                <div className="text-sm">
                                  <details className="cursor-pointer">
                                    <summary className="text-muted-foreground hover:text-foreground">
                                      View output
                                    </summary>
                                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                                      {JSON.stringify(nodeExec.output, null, 2)}
                                    </pre>
                                  </details>
                                </div>
                              ) : (
                                <span className="text-sm text-muted-foreground">Skipped</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No node execution data available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">Workflow Executions</h2>
        <p className="text-sm text-muted-foreground">Track all workflow runs and their status</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {executions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Play className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No executions yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Run your workflow to see execution history
                </p>
              </CardContent>
            </Card>
          ) : (
            executions.map((execution) => (
              <Card 
                key={execution.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedExecution(execution)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <CardTitle className="text-base">{execution.workflowName}</CardTitle>
                    </div>
                    {getStatusBadge(execution.status)}
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <User className="w-3 h-3" />
                      <span>{execution.userName}</span>
                      <span>•</span>
                      <Hash className="w-3 h-3" />
                      <span>{execution.id}</span>
                    </div>
                    <div>Started: {execution.startTime.toLocaleString()}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Duration: {execution.duration ? `${execution.duration}ms` : 'In progress...'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExecution(execution);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

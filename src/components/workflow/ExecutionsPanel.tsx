import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, Clock, Play } from 'lucide-react';

interface Execution {
  id: string;
  workflowName: string;
  status: 'success' | 'error' | 'running';
  startTime: Date;
  duration?: number;
}

interface ExecutionsPanelProps {
  executions: Execution[];
}

export function ExecutionsPanel({ executions }: ExecutionsPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'running':
        return <Clock className="w-4 h-4 text-primary animate-pulse" />;
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
      default:
        return null;
    }
  };

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
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <CardTitle className="text-base">{execution.workflowName}</CardTitle>
                    </div>
                    {getStatusBadge(execution.status)}
                  </div>
                  <CardDescription>
                    Started: {execution.startTime.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Duration: {execution.duration ? `${execution.duration}ms` : 'In progress...'}
                    </span>
                    <Button variant="outline" size="sm">
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

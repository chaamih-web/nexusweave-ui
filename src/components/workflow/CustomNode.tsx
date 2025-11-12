import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/components/ui/card';
import { iconMap, IconName } from '@/lib/workflow-icons';
import { NodeContextMenu } from './NodeContextMenu';

interface CustomNodeData {
  label: string;
  iconName: IconName;
  type: 'trigger' | 'action' | 'logic';
  description: string;
  onEdit?: () => void;
  onExecute?: () => void;
  onDelete?: () => void;
}

export const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const Icon = iconMap[data.iconName];
  
  const getNodeColor = () => {
    if (data.type === 'trigger') return 'border-primary bg-primary/5';
    if (data.type === 'action') return 'border-accent bg-accent/5';
    return 'border-muted bg-muted/5';
  };

  const getIconColor = () => {
    if (data.type === 'trigger') return 'text-primary';
    if (data.type === 'action') return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <NodeContextMenu
      onEdit={() => data.onEdit?.()}
      onExecute={() => data.onExecute?.()}
      onDelete={() => data.onDelete?.()}
    >
      <Card
        className={`min-w-[200px] transition-all duration-200 ${getNodeColor()} ${
          selected ? 'ring-2 ring-primary shadow-glow' : 'shadow-md hover:shadow-lg'
        }`}
        onDoubleClick={() => data.onEdit?.()}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-primary border-2 border-background"
        />
        
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${data.type === 'trigger' ? 'bg-primary/10' : data.type === 'action' ? 'bg-accent/10' : 'bg-muted/10'}`}>
              <Icon className={`w-5 h-5 ${getIconColor()}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{data.label}</h4>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{data.description}</p>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-primary border-2 border-background"
        />
      </Card>
    </NodeContextMenu>
  );
});

CustomNode.displayName = 'CustomNode';

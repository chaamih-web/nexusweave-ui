import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { iconMap, IconName } from '@/lib/workflow-icons';

const nodeCategories = [
  {
    name: 'Triggers',
    type: 'trigger',
    nodes: [
      {
        label: 'Webhook',
        iconName: 'Webhook' as IconName,
        type: 'trigger',
        description: 'Start on HTTP request',
      },
      {
        label: 'Schedule',
        iconName: 'Clock' as IconName,
        type: 'trigger',
        description: 'Run on a schedule',
      },
      {
        label: 'Email Received',
        iconName: 'Mail' as IconName,
        type: 'trigger',
        description: 'Trigger on new email',
      },
    ],
  },
  {
    name: 'Actions',
    type: 'action',
    nodes: [
      {
        label: 'Send Email',
        iconName: 'Mail' as IconName,
        type: 'action',
        description: 'Send an email',
      },
      {
        label: 'Database Query',
        iconName: 'Database' as IconName,
        type: 'action',
        description: 'Query a database',
      },
      {
        label: 'HTTP Request',
        iconName: 'Zap' as IconName,
        type: 'action',
        description: 'Make HTTP request',
      },
      {
        label: 'Create Record',
        iconName: 'FileText' as IconName,
        type: 'action',
        description: 'Create database record',
      },
      {
        label: 'Send Message',
        iconName: 'MessageSquare' as IconName,
        type: 'action',
        description: 'Send a message',
      },
      {
        label: 'Update User',
        iconName: 'Users' as IconName,
        type: 'action',
        description: 'Update user data',
      },
    ],
  },
  {
    name: 'Logic',
    type: 'logic',
    nodes: [
      {
        label: 'If/Else',
        iconName: 'GitBranch' as IconName,
        type: 'logic',
        description: 'Conditional branching',
      },
      {
        label: 'Filter',
        iconName: 'Filter' as IconName,
        type: 'logic',
        description: 'Filter items',
      },
      {
        label: 'Code',
        iconName: 'Code' as IconName,
        type: 'logic',
        description: 'Run custom code',
      },
      {
        label: 'Delay',
        iconName: 'Clock' as IconName,
        type: 'logic',
        description: 'Wait for duration',
      },
    ],
  },
];

export function NodeSidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const onDragStart = (event: React.DragEvent, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredCategories = nodeCategories.map(category => ({
    ...category,
    nodes: category.nodes.filter(node =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.nodes.length > 0);

  return (
    <div className="w-80 border-r bg-card/50 backdrop-blur-sm flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold mb-4">Add Nodes</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.nodes.map((node) => {
                  const Icon = iconMap[node.iconName];
                  return (
                    <Card
                      key={node.label}
                      draggable
                      onDragStart={(e) => onDragStart(e, node)}
                      className="p-3 cursor-move hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            node.type === 'trigger'
                              ? 'bg-primary/10'
                              : node.type === 'action'
                              ? 'bg-accent/10'
                              : 'bg-muted/10'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              node.type === 'trigger'
                                ? 'text-primary'
                                : node.type === 'action'
                                ? 'text-accent'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{node.label}</h4>
                          <p className="text-xs text-muted-foreground">
                            {node.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              {category !== filteredCategories[filteredCategories.length - 1] && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

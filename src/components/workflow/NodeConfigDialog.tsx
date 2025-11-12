import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface NodeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: Node | null;
  onSave: (nodeId: string, updates: any) => void;
}

export function NodeConfigDialog({ open, onOpenChange, node, onSave }: NodeConfigDialogProps) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState('');

  useEffect(() => {
    if (node) {
      setLabel(node.data.label || '');
      setDescription(node.data.description || '');
      setConfig(JSON.stringify(node.data.config || {}, null, 2));
    }
  }, [node]);

  const handleSave = () => {
    if (!node) return;
    
    let parsedConfig = {};
    try {
      parsedConfig = JSON.parse(config);
    } catch (e) {
      console.error('Invalid JSON config');
    }

    onSave(node.id, {
      label,
      description,
      config: parsedConfig,
    });
    onOpenChange(false);
  };

  if (!node) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Node: {node.data.label}</DialogTitle>
          <DialogDescription>
            Edit node properties and configuration
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="label">Node Name</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter node name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter node description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="config">Configuration (JSON)</Label>
            <Textarea
              id="config"
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              placeholder='{"key": "value"}'
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

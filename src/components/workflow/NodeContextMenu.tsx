import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Edit, Play, Trash2 } from 'lucide-react';

interface NodeContextMenuProps {
  children: React.ReactNode;
  onEdit: () => void;
  onExecute: () => void;
  onDelete: () => void;
}

export function NodeContextMenu({ children, onEdit, onExecute, onDelete }: NodeContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onEdit} className="cursor-pointer">
          <Edit className="w-4 h-4 mr-2" />
          Edit Node
        </ContextMenuItem>
        <ContextMenuItem onClick={onExecute} className="cursor-pointer">
          <Play className="w-4 h-4 mr-2" />
          Execute Node
        </ContextMenuItem>
        <ContextMenuItem onClick={onDelete} className="cursor-pointer text-destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

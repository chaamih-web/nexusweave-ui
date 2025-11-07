import {
  Webhook,
  Mail,
  Database,
  Zap,
  GitBranch,
  Clock,
  Filter,
  Code,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Webhook,
  Mail,
  Database,
  Zap,
  GitBranch,
  Clock,
  Filter,
  Code,
  MessageSquare,
  FileText,
  Calendar,
  Users,
};

export type IconName = keyof typeof iconMap;

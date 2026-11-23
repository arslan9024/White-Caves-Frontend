export const formatTime = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return date.toLocaleDateString();
};

export const getStatusColor = (type: string): string => {
  switch (type) {
    case 'success':
      return '#10B981';
    case 'active':
      return '#3B82F6';
    case 'pending':
      return '#F59E0B';
    case 'error':
      return '#EF4444';
    case 'info':
      return '#6366F1';
    default:
      return '#64748B';
  }
};

import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LeadershipHeaderProps {
  onAdd?: () => void;
}

export const LeadershipHeader: React.FC<LeadershipHeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-neutral-gray-900">Leadership</h3>
      {onAdd && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onAdd}
          className="text-primary-ocean-500 hover:text-primary-ocean-600"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
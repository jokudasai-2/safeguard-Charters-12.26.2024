import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface StakeholderRowProps {
  department: string;
  email: string;
  onEmailChange: (email: string) => void;
  onRemove?: () => void;
}

export const StakeholderRow: React.FC<StakeholderRowProps> = ({
  department,
  email,
  onEmailChange,
  onRemove
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-2">
        <span className="text-sm font-medium text-neutral-gray-600">{department}</span>
      </div>
      <div className={onRemove ? 'col-span-9' : 'col-span-10'}>
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={`Enter ${department.toLowerCase()} stakeholder email`}
          className="w-full"
        />
      </div>
      {onRemove && (
        <div className="col-span-1 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-neutral-gray-400 hover:text-secondary-red"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { X, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { StakeholderDepartment } from '@/types/database';
import { DEPARTMENTS } from '../constants';

interface AddLeadershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string, department: StakeholderDepartment) => void;
}

export const AddLeadershipDialog: React.FC<AddLeadershipDialogProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState<StakeholderDepartment>(DEPARTMENTS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(email, department);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <Target className="h-5 w-5 text-neutral-gray-600" />
            <span>Add Department Leader</span>
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as StakeholderDepartment)}
              className="w-full h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={`Enter ${department} leader's email`}
              className="w-full"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Leader</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
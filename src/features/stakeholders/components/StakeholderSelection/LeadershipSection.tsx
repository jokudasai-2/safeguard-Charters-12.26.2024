import React, { useState } from 'react';
import { Target, ChevronDown, ChevronRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StakeholderRow } from './StakeholderRow';
import { DEPARTMENTS } from '../../constants';
import type { Stakeholder } from '../../types';

interface LeadershipSectionProps {
  leadership: Stakeholder[];
  onChange: (leadership: Stakeholder[]) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  leadership,
  onChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(
    new Set(leadership.map(l => l.department))
  );

  const handleAddDepartment = (department: string) => {
    setSelectedDepartments(prev => new Set([...prev, department]));
    onChange([
      ...leadership,
      { department, email: '', role: 'leadership' }
    ]);
  };

  const handleEmailChange = (department: string, email: string) => {
    const newLeadership = leadership.map(l =>
      l.department === department ? { ...l, email } : l
    );
    onChange(newLeadership);
  };

  const handleRemoveDepartment = (department: string) => {
    setSelectedDepartments(prev => {
      const next = new Set(prev);
      next.delete(department);
      return next;
    });
    onChange(leadership.filter(l => l.department !== department));
  };

  const availableDepartments = DEPARTMENTS.filter(
    dept => !selectedDepartments.has(dept)
  );

  return (
    <div className="space-y-4 mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-neutral-gray-700 hover:text-neutral-gray-900"
      >
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span className="text-xl font-semibold">Leadership</span>
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-6 pl-7">
          <p className="text-sm text-neutral-gray-600">
            Add department leaders to ensure strategic alignment and support.
          </p>

          {leadership.length > 0 && (
            <div className="space-y-4">
              {leadership.map((leader) => (
                <div key={leader.department} className="relative">
                  <StakeholderRow
                    department={leader.department}
                    email={leader.email}
                    onEmailChange={(email) => handleEmailChange(leader.department, email)}
                    onRemove={() => handleRemoveDepartment(leader.department)}
                  />
                </div>
              ))}
            </div>
          )}

          {availableDepartments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-gray-700">Add Department Leader</p>
              <div className="flex flex-wrap gap-2">
                {availableDepartments.map((department) => (
                  <Button
                    key={department}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddDepartment(department)}
                    className="flex items-center space-x-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>{department}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
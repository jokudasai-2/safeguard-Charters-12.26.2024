import React from 'react';
import { Users } from 'lucide-react';
import { StakeholderRow } from './StakeholderRow';
import { DEPARTMENTS } from '../../constants';
import type { Stakeholder } from '../../types';

interface ContributorSectionProps {
  contributors: Stakeholder[];
  onChange: (contributors: Stakeholder[]) => void;
}

export const ContributorSection: React.FC<ContributorSectionProps> = ({
  contributors,
  onChange
}) => {
  const handleEmailChange = (department: string, email: string) => {
    const newContributors = [...contributors];
    const index = newContributors.findIndex(c => c.department === department);
    if (index >= 0) {
      newContributors[index] = { ...newContributors[index], email };
    }
    onChange(newContributors);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-neutral-gray-700" />
        <h2 className="text-xl font-semibold text-neutral-gray-900">Contributors</h2>
      </div>
      <p className="text-sm text-neutral-gray-600">
        Add contributors from each department to ensure comprehensive input and alignment.
      </p>
      
      <div className="space-y-4">
        {DEPARTMENTS.map((department) => (
          <StakeholderRow
            key={department}
            department={department}
            email={contributors.find(c => c.department === department)?.email || ''}
            onEmailChange={(email) => handleEmailChange(department, email)}
          />
        ))}
      </div>
    </div>
  );
};
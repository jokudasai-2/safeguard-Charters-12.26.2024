import React, { useState, useEffect } from 'react';
import { ContributorSection } from './ContributorSection';
import { LeadershipSection } from './LeadershipSection';
import { DEPARTMENTS } from '../../constants';
import type { Stakeholder } from '../../types';

interface StakeholderSelectionProps {
  onChange: (stakeholders: Stakeholder[]) => void;
}

export const StakeholderSelection: React.FC<StakeholderSelectionProps> = ({ onChange }) => {
  const [contributors, setContributors] = useState<Stakeholder[]>(
    DEPARTMENTS.map(department => ({
      department,
      email: '',
      role: 'contributor'
    }))
  );
  
  const [leadership, setLeadership] = useState<Stakeholder[]>([]);

  useEffect(() => {
    // Combine contributors and leadership, filtering out empty emails
    const allStakeholders = [
      ...contributors,
      ...leadership
    ].filter(s => s.email.trim());
    
    onChange(allStakeholders);
  }, [contributors, leadership, onChange]);

  return (
    <div className="space-y-8">
      <ContributorSection
        contributors={contributors}
        onChange={setContributors}
      />
      <LeadershipSection
        leadership={leadership}
        onChange={setLeadership}
      />
    </div>
  );
};
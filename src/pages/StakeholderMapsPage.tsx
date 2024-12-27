import React, { useState, useMemo } from 'react';
import { useCharters } from '@/features/charters/hooks/useCharters';
import { StakeholderMap } from '@/features/stakeholders/components/StakeholderMap';
import { MapFilters } from '@/features/stakeholders/components/StakeholderMap/MapFilters';
import { AddStakeholderDialog } from '@/features/stakeholders/components/AddStakeholderDialog';
import { AddLeadershipDialog } from '@/features/stakeholders/components/AddLeadershipDialog';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusCircle, Network } from 'lucide-react';
import { useStakeholders } from '@/features/stakeholders/hooks/useStakeholders';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/features/auth/hooks/useToast';
import type { CharterSummary } from '@/features/charters/types';
import type { StakeholderRole, StakeholderDepartment } from '@/types/database';

interface AssignmentDialog {
  isOpen: boolean;
  charterId: string;
  department: StakeholderDepartment;
}

interface LeadershipDialog {
  isOpen: boolean;
  charterId: string;
}

export const StakeholderMapsPage: React.FC = () => {
  const { charters, isLoading } = useCharters();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'steward' | 'date'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dialog, setDialog] = useState<AssignmentDialog | null>(null);
  const [leadershipDialog, setLeadershipDialog] = useState<LeadershipDialog | null>(null);
  const { toast, showToast, hideToast } = useToast();

  // Get stakeholder management functions for the current charter
  const { addStakeholder } = useStakeholders(dialog?.charterId || leadershipDialog?.charterId || '');

  const handleAssign = (charterId: string, department: StakeholderDepartment) => {
    setDialog({
      isOpen: true,
      charterId,
      department
    });
  };

  const handleAddLeader = (charterId: string) => {
    setLeadershipDialog({
      isOpen: true,
      charterId
    });
  };

  const handleAddStakeholder = async (email: string, role: StakeholderRole) => {
    if (!dialog) return;

    try {
      const success = await addStakeholder(email, role, dialog.department);
      if (success) {
        showToast('Stakeholder added successfully');
        setDialog(null);
      } else {
        showToast('Failed to add stakeholder', 'error');
      }
    } catch (error) {
      console.error('Error adding stakeholder:', error);
      showToast('Failed to add stakeholder', 'error');
    }
  };

  const handleAddLeadership = async (email: string, department: StakeholderDepartment) => {
    if (!leadershipDialog) return;

    try {
      const success = await addStakeholder(email, 'leadership', department);
      if (success) {
        showToast('Leadership stakeholder added successfully');
        setLeadershipDialog(null);
      } else {
        showToast('Failed to add leadership stakeholder', 'error');
      }
    } catch (error) {
      console.error('Error adding leadership stakeholder:', error);
      showToast('Failed to add leadership stakeholder', 'error');
    }
  };

  const filteredCharters = useMemo(() => {
    if (!charters) return [];

    let filtered = [...charters];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((charter) => {
        const titleMatch = charter.title.toLowerCase().includes(searchLower);
        const descriptionMatch = charter.description?.toLowerCase().includes(searchLower);
        return titleMatch || descriptionMatch;
      });
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter((charter) =>
        charter.stakeholders.some((s) => s.department === departmentFilter)
      );
    }

    // Apply sorting
    filtered.sort((a: CharterSummary, b: CharterSummary) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'steward': {
          const aName = a.profiles 
            ? `${a.profiles.first_name} ${a.profiles.last_name}`.trim()
            : '';
          const bName = b.profiles 
            ? `${b.profiles.first_name} ${b.profiles.last_name}`.trim()
            : '';
          comparison = aName.localeCompare(bName);
          break;
        }
        case 'date':
          comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [charters, search, sortBy, sortDirection, departmentFilter]);

  if (isLoading) {
    return <div className="text-center py-8">Loading charters...</div>;
  }

  if (!charters?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-900">Stakeholder Maps</h1>
          <p className="mt-1 text-sm text-neutral-gray-600">
            View stakeholder relationships and department coverage across all charters.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Network className="h-12 w-12 text-primary-ocean-300" />
          </div>
          <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">
            No Charters Found
          </h3>
          <p className="text-neutral-gray-600 mb-6">
            Create your first charter to start mapping stakeholder relationships
          </p>
          <div className="flex justify-center">
            <Link to="/create">
              <Button className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5" />
                <span>Create Charter</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-gray-900">Stakeholder Maps</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          View stakeholder relationships and department coverage across all charters.
        </p>
      </div>

      <MapFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
      />

      <div className="space-y-6">
        {filteredCharters.map((charter) => (
          <div key={charter.id} className="bg-white rounded-lg shadow-sm">
            <StakeholderMap
              title={charter.title}
              charterId={charter.id}
              stakeholders={charter.stakeholders}
              ownerId={charter.user_id}
              onAssign={
                charter.isOwner 
                  ? (department) => handleAssign(charter.id, department as StakeholderDepartment)
                  : undefined
              }
              onAddLeader={
                charter.isOwner
                  ? () => handleAddLeader(charter.id)
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      {dialog && (
        <AddStakeholderDialog
          isOpen={dialog.isOpen}
          onClose={() => setDialog(null)}
          onAdd={handleAddStakeholder}
          department={dialog.department}
        />
      )}
      {leadershipDialog && (
        <AddLeadershipDialog
          isOpen={leadershipDialog.isOpen}
          onClose={() => setLeadershipDialog(null)}
          onAdd={handleAddLeadership}
        />
      )}
      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};
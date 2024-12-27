import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { FeedbackStats } from '@/features/feedback/components/FeedbackStats';
import { FeedbackFilters } from '@/features/feedback/components/FeedbackFilters';
import { FeedbackTable } from '@/features/feedback/components/FeedbackTable';
import { useFeedbackList } from '@/features/feedback/hooks/useFeedbackList';
import type { FeedbackFilters as Filters } from '@/features/feedback/types';

export const FeedbackPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const { feedback, isLoading } = useFeedbackList(filters);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-gray-900">Feedback</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          Track and manage feedback across all your charters.
        </p>
      </div>

      <FeedbackStats />
      
      {feedback.length === 0 && !isLoading ? (
        <EmptyState
          icon={MessageSquare}
          title="No Feedback Yet"
          description="Create a charter to start collecting and managing structured feedback from your stakeholders."
        />
      ) : (
        <div className="space-y-4">
          <FeedbackFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
          <FeedbackTable
            feedback={feedback}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};
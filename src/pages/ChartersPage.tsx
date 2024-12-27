import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CharterStats } from '@/features/charters/components/CharterStats';
import { CharterTabs } from '@/features/charters/components/CharterTabs';
import { ContextPanel } from '@/features/charters/components/ChartersPage/ContextPanel';
import { useCharterData } from '@/features/charters/hooks/useCharterData';

export const ChartersPage: React.FC = () => {
  const { stats, charters, isLoadingStats, isLoadingCharters } = useCharterData();

  return (
    <div className="space-y-8">
      <ContextPanel />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-900">Your Charters</h1>
          <p className="mt-1 text-sm text-neutral-gray-600">
            Manage and track all your charter documents in one place.
          </p>
        </div>
        <Link to="/create">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>New Charter</span>
          </Button>
        </Link>
      </div>

      <CharterStats stats={stats} isLoading={isLoadingStats} />

      {charters.length === 0 && !isLoadingCharters ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-primary-ocean-300" />
          </div>
          <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">
            Create Your First Charter
          </h3>
          <p className="text-neutral-gray-600 mb-6">
            Start by creating a charter to align stakeholders and gather feedback.
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
      ) : (
        <CharterTabs charters={charters} isLoading={isLoadingCharters} />
      )}
    </div>
  );
};
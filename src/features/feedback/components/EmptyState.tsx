import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <MessageSquare className="h-12 w-12 text-primary-ocean-300" />
      </div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">
        No Feedback Yet
      </h3>
      <p className="text-neutral-gray-600 mb-6">
        Create a charter to start collecting and managing structured feedback from your stakeholders.
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
  );
};
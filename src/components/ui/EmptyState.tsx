import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, PlusCircle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  buttonText = 'Create Charter'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <Icon className="h-12 w-12 text-primary-ocean-300" />
      </div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-neutral-gray-600 mb-6">
        {description}
      </p>
      <div className="flex justify-center">
        <Link to="/create">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>{buttonText}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
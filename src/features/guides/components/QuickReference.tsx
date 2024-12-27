import React from 'react';
import { FileText, Users, MessageSquare, Target } from 'lucide-react';

export const QuickReference: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Quick Reference</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Charter Status</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li><strong>Draft:</strong> Initial creation and editing</li>
              <li><strong>In Review:</strong> Under stakeholder review</li>
              <li><strong>Approved:</strong> All stakeholders approved</li>
              <li><strong>No-Go:</strong> Charter rejected</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Stakeholder Roles</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li><strong>Contributor:</strong> Domain expertise input</li>
              <li><strong>Leadership:</strong> Strategic alignment</li>
              <li><strong>Owner:</strong> Charter steward</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Feedback Types</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li><strong>General:</strong> Overall observations</li>
              <li><strong>Technical:</strong> Implementation details</li>
              <li><strong>Business:</strong> Strategic impact</li>
              <li><strong>Legal:</strong> Compliance concerns</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Key Metrics</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li><strong>Stakeholder Coverage:</strong> Department representation</li>
              <li><strong>Feedback Resolution:</strong> Issues addressed</li>
              <li><strong>Approval Rate:</strong> Stakeholder sign-offs</li>
              <li><strong>Time to Approval:</strong> Process efficiency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
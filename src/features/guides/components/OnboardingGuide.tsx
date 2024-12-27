import React from 'react';
import { Rocket, Flag, Users, MessageSquare } from 'lucide-react';

export const OnboardingGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Getting Started</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-3">
          <Rocket className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">First Steps</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li>• Create your first charter with clear objectives</li>
              <li>• Define the problem statement and target users</li>
              <li>• Add key stakeholders from different departments</li>
              <li>• Set up initial success criteria</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Flag className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Key Milestones</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li>• Draft completion and initial review</li>
              <li>• Stakeholder feedback collection</li>
              <li>• Addressing critical feedback</li>
              <li>• Final approvals and sign-off</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Collaboration Tips</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li>• Engage stakeholders early in the process</li>
              <li>• Keep communication channels open</li>
              <li>• Document decisions and rationale</li>
              <li>• Regular status updates</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Feedback Best Practices</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
              <li>• Provide specific, actionable feedback</li>
              <li>• Use appropriate feedback types</li>
              <li>• Set clear conviction levels</li>
              <li>• Track feedback resolution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { GitBranch, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export const WorkflowGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Charter Workflows</h3>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <GitBranch className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Charter Creation Flow</h4>
            <ol className="text-sm text-neutral-gray-600 space-y-2 mt-2 list-decimal list-inside">
              <li>Draft charter with initial content</li>
              <li>Add stakeholders from key departments</li>
              <li>Submit for stakeholder review</li>
              <li>Collect and address feedback</li>
              <li>Obtain stakeholder approvals</li>
              <li>Final approval and implementation</li>
            </ol>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Approval Process</h4>
            <ol className="text-sm text-neutral-gray-600 space-y-2 mt-2 list-decimal list-inside">
              <li>Address all high-conviction feedback</li>
              <li>Stakeholders review updated content</li>
              <li>Individual stakeholder approvals</li>
              <li>Automatic status updates</li>
              <li>Final charter approval</li>
            </ol>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Issue Resolution</h4>
            <ol className="text-sm text-neutral-gray-600 space-y-2 mt-2 list-decimal list-inside">
              <li>Identify critical concerns</li>
              <li>Engage relevant stakeholders</li>
              <li>Document resolution approach</li>
              <li>Update charter content</li>
              <li>Verify issue resolution</li>
            </ol>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Stakeholder Management</h4>
            <ol className="text-sm text-neutral-gray-600 space-y-2 mt-2 list-decimal list-inside">
              <li>Identify key stakeholders</li>
              <li>Define roles and responsibilities</li>
              <li>Set up communication channels</li>
              <li>Track engagement and approvals</li>
              <li>Maintain stakeholder alignment</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { BarChart3, Users, Zap, Shield } from 'lucide-react';

export const Statistics: React.FC = () => {
  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Accuracy Rate',
      value: '99.2%',
      color: 'text-green-600'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Emails Analyzed',
      value: '2.4M+',
      color: 'text-blue-600'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Avg Response Time',
      value: '< 0.5s',
      color: 'text-purple-600'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: 'Spam Blocked',
      value: '847K+',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">System Statistics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={stat.color}>{stat.icon}</div>
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-900 mb-2">How It Works</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Advanced NLP algorithms analyze text patterns</li>
          <li>• Machine learning models trained on millions of emails</li>
          <li>• Real-time feature extraction and classification</li>
          <li>• Continuous learning from new spam patterns</li>
        </ul>
      </div>
    </div>
  );
};
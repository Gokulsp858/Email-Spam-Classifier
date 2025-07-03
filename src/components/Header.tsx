import React from 'react';
import { Shield, Mail } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-600" />
              <Mail className="w-4 h-4 text-purple-600 absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Email Spam Classifier
              </h1>
              <p className="text-sm text-gray-600">
                AI-powered spam detection system
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>99.2% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
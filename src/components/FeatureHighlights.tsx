import React from 'react';
import { AlertCircle, Eye, Target, CheckCircle } from 'lucide-react';
import { SpamFeature } from '../types/analysis';

interface FeatureHighlightsProps {
  features: SpamFeature[];
  spamScore: number;
}

export const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ features, spamScore }) => {
  const getFeatureColor = (weight: number) => {
    if (weight >= 0.8) return 'bg-red-100 text-red-800 border-red-200';
    if (weight >= 0.5) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getFeatureIcon = (weight: number) => {
    if (weight >= 0.8) return <AlertCircle className="w-4 h-4" />;
    if (weight >= 0.5) return <Target className="w-4 h-4" />;
    return <Eye className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-900">Spam Features Detected</h3>
      </div>

      {features.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600">No spam features detected</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getFeatureColor(feature.weight)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getFeatureIcon(feature.weight)}
                    <span className="font-medium">{feature.name}</span>
                  </div>
                  <div className="text-sm font-bold">
                    {Math.round(feature.weight * 100)}%
                  </div>
                </div>
                <p className="text-sm opacity-90">{feature.description}</p>
                {feature.examples.length > 0 && (
                  <div className="mt-2 text-xs opacity-75">
                    Examples: {feature.examples.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Feature Analysis Summary
            </div>
            <div className="text-xs text-gray-600">
              {features.length} spam indicators detected with an average confidence of{' '}
              {Math.round((features.reduce((sum, f) => sum + f.weight, 0) / features.length) * 100)}%.
              These features contribute to the overall spam score of {Math.round(spamScore * 100)}%.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
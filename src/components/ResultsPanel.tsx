import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface ResultsPanelProps {
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ analysis, isAnalyzing }) => {
  const getStatusColor = (score: number) => {
    if (score >= 0.7) return 'text-red-600';
    if (score >= 0.4) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusBg = (score: number) => {
    if (score >= 0.7) return 'bg-red-50 border-red-200';
    if (score >= 0.4) return 'bg-orange-50 border-orange-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusIcon = (score: number) => {
    if (score >= 0.7) return <AlertTriangle className="w-6 h-6 text-red-600" />;
    if (score >= 0.4) return <Shield className="w-6 h-6 text-orange-600" />;
    return <CheckCircle className="w-6 h-6 text-green-600" />;
  };

  const getVerdict = (score: number) => {
    if (score >= 0.7) return { label: 'SPAM DETECTED', desc: 'High probability of spam' };
    if (score >= 0.4) return { label: 'SUSPICIOUS', desc: 'Potentially suspicious content' };
    return { label: 'LEGITIMATE', desc: 'Appears to be legitimate' };
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Analyzing email content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Paste email content to begin analysis</p>
          </div>
        </div>
      </div>
    );
  }

  const verdict = getVerdict(analysis.spamScore);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
      </div>

      <div className={`p-6 rounded-xl border-2 ${getStatusBg(analysis.spamScore)} mb-6`}>
        <div className="flex items-center space-x-4 mb-4">
          {getStatusIcon(analysis.spamScore)}
          <div>
            <h4 className={`text-lg font-bold ${getStatusColor(analysis.spamScore)}`}>
              {verdict.label}
            </h4>
            <p className="text-sm text-gray-600">{verdict.desc}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Spam Confidence</span>
            <span className={`text-sm font-bold ${getStatusColor(analysis.spamScore)}`}>
              {Math.round(analysis.spamScore * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                analysis.spamScore >= 0.7 ? 'bg-red-500' : 
                analysis.spamScore >= 0.4 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${analysis.spamScore * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Detection Metrics</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {analysis.features.length}
            </div>
            <div className="text-sm text-gray-600">Spam Indicators</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {analysis.wordCount}
            </div>
            <div className="text-sm text-gray-600">Words Analyzed</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Risk Factors</div>
          <div className="space-y-2">
            {analysis.riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
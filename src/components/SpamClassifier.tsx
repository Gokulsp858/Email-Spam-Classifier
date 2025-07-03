import React, { useState, useEffect } from 'react';
import { TextAnalyzer } from './TextAnalyzer';
import { ResultsPanel } from './ResultsPanel';
import { FeatureHighlights } from './FeatureHighlights';
import { Statistics } from './Statistics';
import { classifyEmail } from '../utils/spamDetection';
import { AnalysisResult } from '../types/analysis';

export const SpamClassifier: React.FC = () => {
  const [emailText, setEmailText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (emailText.trim()) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        const result = classifyEmail(emailText);
        setAnalysis(result);
        setIsAnalyzing(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAnalysis(null);
      setIsAnalyzing(false);
    }
  }, [emailText]);

  const handleSampleLoad = (sample: string) => {
    setEmailText(sample);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Analyze Your Email for Spam
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Paste any email content below and our advanced AI will analyze it in real-time 
          to determine if it's spam or legitimate, with detailed insights and confidence scores.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TextAnalyzer
            text={emailText}
            onTextChange={setEmailText}
            onSampleLoad={handleSampleLoad}
            isAnalyzing={isAnalyzing}
          />
          
          {analysis && (
            <FeatureHighlights 
              features={analysis.features}
              spamScore={analysis.spamScore}
            />
          )}
        </div>

        <div className="space-y-6">
          <ResultsPanel 
            analysis={analysis} 
            isAnalyzing={isAnalyzing}
          />
          
          <Statistics />
        </div>
      </div>
    </div>
  );
};
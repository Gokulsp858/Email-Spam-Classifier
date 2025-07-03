import React from 'react';
import { FileText, Zap, Copy, RotateCcw } from 'lucide-react';

interface TextAnalyzerProps {
  text: string;
  onTextChange: (text: string) => void;
  onSampleLoad: (sample: string) => void;
  isAnalyzing: boolean;
}

const sampleEmails = [
  {
    title: "Suspicious Offer",
    content: "CONGRATULATIONS! You've won $1,000,000! Click here NOW to claim your prize! Limited time offer! Act fast before it expires! Send your personal details immediately!"
  },
  {
    title: "Legitimate Newsletter",
    content: "Hi John, Thank you for subscribing to our weekly newsletter. This week we're featuring our latest product updates and customer success stories. Best regards, The Marketing Team"
  },
  {
    title: "Phishing Attempt",
    content: "URGENT: Your account has been suspended! Click this link immediately to verify your identity and avoid permanent closure. You have 24 hours to respond or lose access forever!"
  }
];

export const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ 
  text, 
  onTextChange, 
  onSampleLoad, 
  isAnalyzing 
}) => {
  const handleClear = () => {
    onTextChange('');
  };

  const handleSampleLoad = (sample: string) => {
    onSampleLoad(sample);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Email Content Analysis
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClear}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear text"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Analyzing...</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Paste your email content here to analyze for spam..."
            className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {text.length} characters
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Try these sample emails:
          </h4>
          <div className="grid gap-2">
            {sampleEmails.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleLoad(sample.content)}
                className="flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {sample.title}
                </span>
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
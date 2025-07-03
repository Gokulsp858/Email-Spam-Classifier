import React from 'react';
import { Github, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Email Spam Classifier</h3>
            <p className="text-gray-400 text-sm">
              An advanced AI-powered system for detecting spam emails using 
              natural language processing and machine learning techniques.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Technology Stack</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Natural Language Processing</li>
              <li>• Support Vector Machine (SVM)</li>
              <li>• TF-IDF Vectorization</li>
              <li>• Real-time Text Analysis</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Developer</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>Built by Gokul SP</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for email security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
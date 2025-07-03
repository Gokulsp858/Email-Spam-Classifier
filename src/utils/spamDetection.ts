import { AnalysisResult, SpamFeature } from '../types/analysis';

// Spam keywords and patterns
const spamKeywords = {
  urgent: ['urgent', 'immediate', 'act now', 'limited time', 'expires', 'deadline'],
  financial: ['money', 'cash', 'prize', 'winner', 'lottery', 'million', 'dollars', 'free'],
  suspicious: ['click here', 'verify', 'suspended', 'account', 'login', 'password'],
  promotional: ['offer', 'deal', 'discount', 'save', 'special', 'exclusive'],
  emotional: ['congratulations', 'amazing', 'incredible', 'fantastic', 'unbelievable'],
  contact: ['call now', 'contact us', 'reply', 'respond', 'send details']
};

const spamPatterns = {
  allCaps: /[A-Z]{3,}/g,
  multipleExclamation: /!{2,}/g,
  numbers: /\d+/g,
  emailPattern: /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  urlPattern: /(https?:\/\/[^\s]+)/g,
  phonePattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g
};

export function classifyEmail(text: string): AnalysisResult {
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = words.length;
  const features: SpamFeature[] = [];
  let spamScore = 0;
  const riskFactors: string[] = [];

  // Check for spam keywords
  Object.entries(spamKeywords).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (found.length > 0) {
      const weight = Math.min(found.length * 0.2, 0.9);
      features.push({
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} Keywords`,
        weight,
        description: `Contains ${found.length} ${category} keywords commonly used in spam`,
        examples: found.slice(0, 3)
      });
      spamScore += weight * 0.3;
    }
  });

  // Check for patterns
  const capsMatches = text.match(spamPatterns.allCaps);
  if (capsMatches && capsMatches.length > 2) {
    const weight = Math.min(capsMatches.length * 0.15, 0.8);
    features.push({
      name: 'Excessive Capitalization',
      weight,
      description: 'Contains multiple words in ALL CAPS, common in spam',
      examples: capsMatches.slice(0, 3)
    });
    spamScore += weight * 0.25;
    riskFactors.push('Excessive use of capital letters');
  }

  const exclamationMatches = text.match(spamPatterns.multipleExclamation);
  if (exclamationMatches && exclamationMatches.length > 0) {
    const weight = Math.min(exclamationMatches.length * 0.2, 0.7);
    features.push({
      name: 'Multiple Exclamation Marks',
      weight,
      description: 'Uses multiple exclamation marks to create urgency',
      examples: exclamationMatches.slice(0, 3)
    });
    spamScore += weight * 0.2;
    riskFactors.push('Creates false urgency');
  }

  const urlMatches = text.match(spamPatterns.urlPattern);
  if (urlMatches && urlMatches.length > 0) {
    const weight = Math.min(urlMatches.length * 0.3, 0.6);
    features.push({
      name: 'Suspicious Links',
      weight,
      description: 'Contains URLs that may lead to malicious sites',
      examples: urlMatches.slice(0, 2)
    });
    spamScore += weight * 0.3;
    riskFactors.push('Contains external links');
  }

  // Check for short length with high spam indicators
  if (wordCount < 50 && features.length > 2) {
    spamScore += 0.2;
    riskFactors.push('Short message with multiple spam indicators');
  }

  // Check for suspicious patterns
  if (text.includes('$') && text.match(/\d+/)) {
    spamScore += 0.15;
    riskFactors.push('Contains monetary amounts');
  }

  // Personal information requests
  if (text.toLowerCase().includes('personal') || text.toLowerCase().includes('details')) {
    spamScore += 0.1;
    riskFactors.push('Requests personal information');
  }

  // Normalize spam score
  spamScore = Math.min(spamScore, 1);

  return {
    isSpam: spamScore >= 0.5,
    spamScore,
    wordCount,
    features: features.sort((a, b) => b.weight - a.weight),
    riskFactors
  };
}
import { PLATFORMS } from '../constants/platforms';

// Validation rules and functions
export const validateContent = (content, platformIds) => {
  const errors = {};
  const warnings = {};

  if (!content || content.trim().length === 0) {
    errors.content = 'Content cannot be empty';
  }

  platformIds.forEach((platformId) => {
    const platform = PLATFORMS[platformId];
    if (!platform) return;

    // Character limit validation
    if (content.length > platform.maxCharacters) {
      errors[platformId] = `Exceeds ${platform.name} character limit (${content.length}/${platform.maxCharacters})`;
    }

    // Warning for nearing limit
    if (content.length > platform.maxCharacters * 0.85) {
      warnings[platformId] = `Approaching character limit on ${platform.name}`;
    }

    // Check for links on platforms that don't support them
    if (!platform.supportsLinks && content.includes('http')) {
      errors[platformId] = `${platform.name} doesn't support direct links`;
    }

    // Hashtag warnings
    const hashtagCount = (content.match(/#\w+/g) || []).length;
    if (hashtagCount > 10) {
      warnings[platformId] = `Consider reducing hashtags for ${platform.name}`;
    }
  });

  return { errors, warnings };
};

// Get character count for specific platform
export const getCharacterCount = (content, platformId) => {
  if (!platformId || !PLATFORMS[platformId]) return content.length;
  return content.length;
};

// Get remaining characters for specific platform
export const getRemainingCharacters = (content, platformId) => {
  const platform = PLATFORMS[platformId];
  if (!platform) return null;
  return Math.max(0, platform.maxCharacters - content.length);
};

// Get character limit for platform
export const getCharacterLimit = (platformId) => {
  const platform = PLATFORMS[platformId];
  return platform ? platform.maxCharacters : null;
};

// Check if content is valid for all selected platforms
export const isContentValid = (content, platformIds) => {
  const { errors } = validateContent(content, platformIds);
  return Object.keys(errors).length === 0;
};

// Get validation status for content
export const getValidationStatus = (content, platformIds) => {
  if (!content.trim()) return 'empty';

  const { errors } = validateContent(content, platformIds);
  if (Object.keys(errors).length > 0) return 'error';

  return 'valid';
};

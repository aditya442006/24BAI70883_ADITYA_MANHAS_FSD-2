import React, { useState, useCallback } from 'react';
import { PLATFORM_LIST, PLATFORMS } from '../constants/platforms';
import { validateContent, getRemainingCharacters, getCharacterLimit } from '../utils/validation';
import '../styles/PostComposer.css';

const PostComposer = () => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [media, setMedia] = useState([]);
  const [publishStatus, setPublishStatus] = useState(null);

  // Handle platform selection
  const togglePlatform = useCallback((platformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  }, []);

  // Handle content change
  const handleContentChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  // Handle media upload
  const handleMediaUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setMedia((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
        },
      ]);
    });
  }, []);

  // Remove media file
  const removeMedia = useCallback((mediaId) => {
    setMedia((prev) => prev.filter((m) => m.id !== mediaId));
  }, []);

  // Validate and publish
  const handlePublish = useCallback(() => {
    if (!content.trim()) {
      alert('Please write some content before publishing');
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }

    const { errors } = validateContent(content, selectedPlatforms);

    if (Object.keys(errors).length > 0) {
      alert(
        'Please fix validation errors:\n' +
        Object.values(errors).join('\n')
      );
      return;
    }

    // Simulate publishing
    setPublishStatus({
      success: true,
      platforms: selectedPlatforms.length,
      time: new Date().toLocaleTimeString(),
    });

    // Reset form after successful publish
    setTimeout(() => {
      setContent('');
      setSelectedPlatforms([]);
      setMedia([]);
      setPublishStatus(null);
    }, 3000);
  }, [content, selectedPlatforms]);

  // Handle clear
  const handleClear = useCallback(() => {
    setContent('');
    setSelectedPlatforms([]);
    setMedia([]);
  }, []);

  // Get validation data
  const { errors, warnings } = validateContent(content, selectedPlatforms);

  // Render character counter for a specific platform
  const renderCharCounter = (platformId) => {
    const platform = PLATFORMS[platformId];
    const remaining = getRemainingCharacters(content, platformId);
    const limit = getCharacterLimit(platformId);
    const percentage = (content.length / limit) * 100;

    let counterClass = '';
    if (percentage > 100) counterClass = 'error';
    else if (percentage > 85) counterClass = 'warn';

    return (
      <div key={platformId} className={`char-counter ${counterClass}`}>
        <strong>{platform.name}</strong>: {content.length}/{limit} characters
        {remaining !== null && remaining >= 0 && (
          <> ({remaining} remaining)</>
        )}
      </div>
    );
  };

  return (
    <div className="post-composer">
      {/* Publishing Success Alert */}
      {publishStatus && (
        <div className="success-alert">
          <div className="alert-content">
            <span className="alert-icon">✓</span>
            <div>
              <strong>Published Successfully!</strong>
              <p>
                Posted to {publishStatus.platforms} platform{publishStatus.platforms > 1 ? 's' : ''} at{' '}
                {publishStatus.time}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Platform Selection */}
      <div className="platform-section">
        <h3>📱 Select Platforms</h3>
        <div className="platforms-grid">
          {PLATFORM_LIST.map((platform) => (
            <button
              key={platform.id}
              className={`platform-button ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
              onClick={() => togglePlatform(platform.id)}
              style={{
                '--platform-color': platform.color,
              }}
              title={platform.hashtagRules}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Composer Area */}
      <div className="composer-section">
        <h3>✍️ Compose Your Post</h3>
        <div className="textarea-wrapper">
          <textarea
            className="composer-textarea"
            placeholder="What's on your mind? Share your thoughts with your audience..."
            value={content}
            onChange={handleContentChange}
            maxLength={63206}
          />
          {selectedPlatforms.length > 0 && content.length > 0 && (
            <div className="char-count-indicator">
              {content.length} chars
            </div>
          )}
        </div>
      </div>

      {/* Media Upload */}
      <div className="media-section">
        <h3>🖼️ Attach Media</h3>
        <div className="media-upload-area">
          <label htmlFor="image-upload" className="upload-button">
            📸 Upload Image
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleMediaUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="video-upload" className="upload-button">
            🎥 Upload Video
          </label>
          <input
            id="video-upload"
            type="file"
            multiple
            accept="video/*"
            onChange={handleMediaUpload}
            style={{ display: 'none' }}
          />
        </div>

        {/* Media List */}
        {media.length > 0 && (
          <div className="media-list">
            <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
              {media.length} file{media.length > 1 ? 's' : ''} attached:
            </p>
            {media.map((file) => (
              <div key={file.id} className="media-item">
                <span className="media-item-name">
                  {file.type.startsWith('image') ? '🖼️' : '🎥'} {file.name}
                </span>
                <button
                  className="media-item-remove"
                  onClick={() => removeMedia(file.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Real-time Feedback */}
      {selectedPlatforms.length > 0 && (
        <div className="feedback-section">
          <h3>📊 Platform Compatibility Check</h3>

          {/* Character Counters */}
          {content.length > 0 && (
            <div className="feedback-counters">
              {selectedPlatforms.map(renderCharCounter)}
            </div>
          )}

          {/* Error and Warning Messages */}
          {(Object.keys(errors).length > 0 || Object.keys(warnings).length > 0) && (
            <div className="feedback-cards">
              {selectedPlatforms.map((platformId) => {
                const platform = PLATFORMS[platformId];
                const hasError = errors[platformId];
                const hasWarning = warnings[platformId] && !hasError;

                if (!hasError && !hasWarning) return null;

                return (
                  <div
                    key={platformId}
                    className={`platform-feedback ${hasError ? 'error' : 'warning'}`}
                  >
                    <div className="feedback-header">
                      <span className="feedback-icon">
                        {hasError ? '❌' : '⚠️'}
                      </span>
                      <span className="platform-name-feedback">
                        {platform.name}
                      </span>
                    </div>
                    <div className="feedback-text">
                      {hasError ? errors[platformId] : warnings[platformId]}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* All Clear Message */}
          {Object.keys(errors).length === 0 &&
            Object.keys(warnings).length === 0 &&
            content.length > 0 && (
              <div className="feedback-cards">
                {selectedPlatforms.map((platformId) => {
                  const platform = PLATFORMS[platformId];
                  return (
                    <div key={platformId} className="platform-feedback valid">
                      <div className="feedback-header">
                        <span className="feedback-icon">✅</span>
                        <span className="platform-name-feedback">
                          {platform.name}
                        </span>
                      </div>
                      <div className="feedback-text">
                        Ready to publish! All constraints met.
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {/* Empty State */}
          {content.length === 0 && selectedPlatforms.length > 0 && (
            <div className="feedback-cards">
              {selectedPlatforms.map((platformId) => {
                const platform = PLATFORMS[platformId];
                return (
                  <div
                    key={platformId}
                    className="platform-feedback"
                    style={{ border: 'none', background: '#f9f9f9' }}
                  >
                    <div className="feedback-header">
                      <span className="feedback-icon">📝</span>
                      <span className="platform-name-feedback">
                        {platform.name}
                      </span>
                    </div>
                    <div className="feedback-text">
                      Max {platform.maxCharacters} characters • {platform.hashtagRules}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-section">
        <button
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={!content && selectedPlatforms.length === 0 && media.length === 0}
        >
          Clear All
        </button>
        <button
          className="btn btn-primary"
          onClick={handlePublish}
          disabled={!content.trim() || selectedPlatforms.length === 0 || Object.keys(errors).length > 0}
        >
          Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};

export default PostComposer;

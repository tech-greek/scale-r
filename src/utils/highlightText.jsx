import React from 'react';

/**
 * Highlights matched text in a case-insensitive manner
 * @param {string} text - The text to search within
 * @param {string} query - The search query to highlight
 * @returns {React.ReactElement} - JSX with highlighted matches
 */
export const highlightText = (text, query) => {
  // Handle edge cases
  if (!text || typeof text !== 'string') {
    return <>{text}</>;
  }

  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  const searchTerm = query.trim();
  
  // Escape special regex characters in the search query
  const escapedQuery = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a case-insensitive regex pattern
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  // Split text into parts: matched and unmatched
  const parts = text.split(regex).filter(part => part.length > 0);
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches the search query (case-insensitive)
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          return (
            <span
              key={index}
              style={{
                backgroundColor: '#FFE082',
                color: '#1b3a4b',
                fontWeight: 600,
                padding: '2px 4px',
                borderRadius: '3px'
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

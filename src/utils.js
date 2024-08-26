// src/utils.js

// Optional utility functions can be added here for data formatting or cleaning.
function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
  }
  
  module.exports = {
    cleanText,
  };
  
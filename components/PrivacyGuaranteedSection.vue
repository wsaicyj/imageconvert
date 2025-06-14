<template>
    <div class="info-card">
      <div class="icon-placeholder">
          <!-- Placeholder for icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.552 4.125 1.045 9.361 5.929 11.624a1.562 1.562 0 0 0 1.329 0c4.884-2.263 6.481-7.499 5.929-11.624a.481.481 0 0 0-.328-.39c-.651-.213-1.307-.395-1.97-.57v9.459a.5.5 0 0 1-.793.407l-2.837-2.838a1 1 0 0 0-1.414 0L5.338 1.59z"/>
            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          </svg>
      </div>
      <h3>Privacy Guaranteed</h3>
      <p>
        We know that file security and privacy are important to you. That is why we use 256-bit SSL encryption when transferring files and automatically delete them after a few hours.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PrivacyGuaranteedSection'
  }
  </script>
  
  <style scoped>
  .info-card {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .icon-placeholder {
      margin-bottom: 15px;
      color: #727cf5; /* Example color */
  }
  
  .info-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #333;
  }
  
  .info-card p {
    font-size: 1em;
    color: #555;
    line-height: 1.6;
  }
  </style>
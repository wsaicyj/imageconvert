<template>
  <div class="data-priority-section">
    <div class="content-area">
      <h3>Your Data, Our Priority</h3>
      <p>
        At ImageConvert, we go beyond just converting files—we protect them. Our robust security framework ensures that your data is always safe, whether you're converting an image, video, or document. With advanced encryption, secure data centers, and vigilant monitoring, we've covered every aspect of your data's safety.
      </p>
    
    </div>
    <div class="features-area">
      <div class="feature-item">
        <div class="icon-placeholder">
            <!-- Placeholder for icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 0-2 2v4H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V3a3 3 0 0 1 6 0v4a.5.5 0 0 0 1 0V3a4 4 0 0 0-8 0v4h-.5a.5.5 0 0 0-1 0V7h2V3a2 2 0 0 0-2-2zm2 6V3a2 2 0 1 0-4 0v4h4zM5 8h6v2H5V8z"/>
            </svg>
        </div>
        <span>SSL/TLS Encryption</span>
      </div>
      <div class="feature-item">
        <div class="icon-placeholder">
            <!-- Placeholder for icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-server" viewBox="0 0 16 16">
              <path d="M1.333 2.667C1.333 1.194 4.03 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.7 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z"/>
              <path d="M1.333 6.333C1.333 4.86 4.03 3.667 8 3.667s6.667 1.194 6.667 2.667V8c0 1.473-2.7 2.667-6.667 2.667S1.333 9.473 1.333 8V6.333z"/>
              <path d="M1.333 10C1.333 8.527 4.03 7.333 8 7.333s6.667 1.194 6.667 2.667v1.333c0 1.473-2.7 2.667-6.667 2.667S1.333 12.8 1.333 11.333V10z"/>
            </svg>
        </div>
        <span>Secured Data Centers</span>
      </div>
      <div class="feature-item">
        <div class="icon-placeholder">
            <!-- Placeholder for icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
              <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 0-.708 0L13 10.207l-.646-.647a.5.5 0 0 0-.708 0L11 10.207l-.646-.647a.5.5 0 0 0-.708 0L9 10.207l-.646-.647A.5.5 0 0 0 8 9.5v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 0-.5.5v.207l-.646.647a.5.5 0 0 0-.708 0L6 14.207l-.646-.647a.5.5 0 0 0-.708 0L4 14.207l-.646-.647a.5.5 0 0 0-.708 0L2 14.207l-.646-.647A.5.5 0 0 0 .5 13.5V13a.5.5 0 0 0-.5-.5zM1.5 9.659l-.49-.49A3.5 3.5 0 0 0 1 8a3.5 3.5 0 0 0 3.5 3.5c.383 0 .76-.072 1.105-.207l-.915-.915A.5.5 0 0 0 4 10.5v-.5a1.5 1.5 0 0 1 1.5-1.5h1A.5.5 0 0 0 7 8.5v-.5A1.5 1.5 0 0 1 8.5 7h1A.5.5 0 0 0 10 6.5v-.5A1.5 1.5 0 0 1 11.5 5h1A.5.5 0 0 0 13 4.5v-.5A1.5 1.5 0 0 1 14.5 3h1a.5.5 0 0 0 .354-.854l-1.5-1.5A.5.5 0 0 0 14 1H7.465A4 4 0 0 1 0 8z"/>
            </svg>
        </div>
        <span>Access Control and Authentication</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataPrioritySection'
}
</script>

<style scoped>
.data-priority-section {
  background-color: #f8f9fa; /* Light grey background */
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 30px; /* Space between content and features */
  align-items: flex-start; /* Align items to the top */
}

.data-priority-section .content-area {
    flex: 1; /* Allow content area to grow */
    min-width: 300px; /* Minimum width before wrapping */
}

.data-priority-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.8em;
  color: #333;
}

.data-priority-section p {
  font-size: 1em;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.data-priority-section .learn-more-button {
    /* Inherits .button.secondary styles from ImageConverter */
}

.data-priority-section .features-area {
    flex-shrink: 0; /* Prevent features area from shrinking */
    display: flex;
    flex-direction: column;
    gap: 15px; /* Space between feature items */
}

.data-priority-section .feature-item {
    display: flex;
    align-items: center;
    gap: 10px; /* Space between icon and text */
    font-size: 1em;
    color: #555;
}

.data-priority-section .feature-item .icon-placeholder {
    color: #727cf5; /* Example color for feature icons */
    display: flex; /* Center SVG */
    align-items: center;
    justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .data-priority-section {
        flex-direction: column;
        align-items: stretch;
    }
    .data-priority-section .content-area,
    .data-priority-section .features-area {
        min-width: auto;
        width: 100%;
    }
}
</style>
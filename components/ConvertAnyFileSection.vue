<template>
  <div class="info-card">
    <div class="icon-placeholder">
        <!-- Placeholder for icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
        </svg>
    </div>
    <h3>Convert Any Image</h3>
    <p>
      ImageConvert supports more than 1500 images conversions. You can convert images. There are tons of Advanced Options to fine-tune your conversions.
    </p>
  </div>
</template>

<script>
export default {
  name: 'ConvertAnyFileSection'
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

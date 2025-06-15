<template>
  <div class="info-card">
    <div class="icon-placeholder">
        <!-- Placeholder for icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
          <path d="M4.406 10.707A5.976 5.976 0 0 1 4 10a6 6 0 0 1 6-6c.696 0 1.372.13 2 .373V7.5a.5.5 0 0 0 1 0V4.5a3.5 3.5 0 1 0-6.89-.87L6.931 5.52a.5.5 0 0 0 .765.11L8 5.293l1.479-1.479a.5.5 0 0 0-.364-.846l-.004-.001C9.184 2.305 8.009 2 6.777 2 4.165 2 2 4.03 2 6.5a4.5 4.5 0 0 0 1.306 3.212l-.036.035A2.5 2.5 0 0 0 1 12.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5c0-.108-.01-.215-.029-.32l-.02-.075a5.5 5.5 0 0 0 1.102-2.906A5.977 5.977 0 0 1 10 14H5a.5.5 0 0 0-.374.832l-.036.035A4.5 4.5 0 0 1 1 12.5a4.5 4.5 0 0 1 1.306-3.212l.036-.035zM14 12.5a1.5 1.5 0 0 1-1.5 1.5H5a.5.5 0 0 0 0 1h8.5a2.5 2.5 0 0 0 2.5-2.5c0-.108-.01-.215-.029-.32l-.02-.075a5.5 5.5 0 0 0 1.102-2.906A5.977 5.977 0 0 1 10 14H5a.5.5 0 0 0-.374.832l-.036.035A4.5 4.5 0 0 1 1 12.5a4.5 4.5 0 0 1 1.306-3.212l.036-.035z"/>
        </svg>
    </div>
    <h3>Works Anywhere</h3>
    <p>
      ImageConvert is an online file converter. So it works on Windows, Mac, Linux, or any mobile device. All major browsers are supported. Simply upload a file and select a target format.
    </p>
  </div>
</template>

<script>
export default {
  name: 'WorksAnywhereSection'
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

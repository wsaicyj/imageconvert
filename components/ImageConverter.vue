<template>
  <div class="image-converter-section">
    <div class="page-title">
      <h2>Image Converter</h2>
      <p>Easily convert Image from one format to another, online.</p>
    </div>

    <div class="initial-upload-area" v-if="files.length === 0">
      <div class="dashed-border-box">
        <input type="file" id="imageInput" accept="image/*" multiple @change="handleFileChange">
        <label for="imageInput" class="button primary choose-files-button">
          <div class="button-main">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square"
                 viewBox="0 0 16 16">
              <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Choose Image
          </div>
          <div class="button-dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </label>
        <p class="upload-info">Max file size 10MB.</p>
      </div>
    </div>

    <div class="file-list-area" v-if="files.length > 0">
      <div class="add-more-files-area">
        <input type="file" id="addMoreInput" accept="image/*" multiple @change="handleAddMoreFiles">
        <label for="addMoreInput" class="button primary add-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square"
               viewBox="0 0 16 16">
            <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add More Files
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </label>
      </div>
      <div class="file-item" v-for="(file, index) in files" :key="file.id">
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatBytes(file.size) }}</span>
        </div>
        <div class="file-status-area">
          <span v-if="file.status === 'pending'" class="status-text pending">Pending</span>
          <div v-if="file.status === 'converting'" class="status-converting">
            <span class="status-text converting">Converting</span>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: file.progress + '%' }"></div>
            </div>
          </div>
          <span v-if="file.status === 'completed'" class="status-text completed">Done</span>
          <span v-if="file.status === 'failed'" class="status-text failed">Failed</span>
        </div>
        <div class="file-options">
          <template v-if="file.status === 'pending' || file.status === 'failed'">
            Output:
            <select v-model="file.targetFormat">
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </template>

          <a v-if="file.status === 'completed' && file.downloadUrl" :href="file.downloadUrl"
             :download="file.downloadFileName" class="button primary download-button">
            Download
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
                 viewBox="0 0 16 16">
              <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </a>

          <span class="icon-button remove-button" @click="removeFile(index)"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                  width="16" height="16"
                                                                                  fill="currentColor"
                                                                                  class="bi bi-x-circle"
                                                                                  viewBox="0 0 16 16"><path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></span>
        </div>
      </div>
      <div class="file-summary">
        Added {{ files.length }} files
      </div>
    </div>

    <div class="bulk-convert-area" v-if="files.length > 0">
      <div class="bulk-convert-options" v-if="!isConverting && !allFilesCompleted">
        Convert All ({{ files.length }}) to:
        <select v-model="bulkTargetFormat" @change="applyBulkFormat">
          <option value="" disabled>Select</option> <!-- Placeholder option -->
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      <div class="main-action-buttons">
        <button
            v-if="!allFilesCompleted"
            :disabled="files.length === 0 || isConverting"
            @click="startConversion"
            class="button success convert-button"
            :class="{ 'please-wait': isConverting }"
        >
              <span v-if="!isConverting">
                Convert
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </span>
          <span v-else>
                Please Wait
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </span>
        </button>

        <button v-if="allFilesCompleted" @click="handleAddMoreFilesClick" class="button secondary convert-more-button">
          Convert More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
            <path fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.146L4.354 9.146a.5.5 0 1 0 .708.708L15 1.707V4.5a.5.5 0 0 0 1 0v-5z"/>
          </svg>
        </button>

        <button v-if="allFilesCompleted" @click="downloadAllFiles" class="button primary download-all-button">
          Download All
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        <span v-if="allFilesCompleted" class="icon-button trash-button" @click="removeAllFiles">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                     viewBox="0 0 16 16">
                  <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </span>
      </div>
    </div>

    <div class="info-cards-container">
      <ConvertAnyFileSection/>
      <WorksAnywhereSection/>
      <PrivacyGuaranteedSection/>
    </div>

    <DataPrioritySection/>

    <div class="footer-info" v-if="files.length > 0">
      Converted files are automatically deleted after 8 hours to protect your privacy. Please download files before they
      are deleted.
    </div>

  </div>
</template>

<script>
import JSZip from 'jszip'; // Import JSZip for creating zip files
import FileSaver from 'file-saver'; // Import file-saver using default import
const saveAs = FileSaver.saveAs; // Access saveAs from the default import
import ConvertAnyFileSection from './ConvertAnyFileSection.vue';
import WorksAnywhereSection from './WorksAnywhereSection.vue';
import PrivacyGuaranteedSection from './PrivacyGuaranteedSection.vue';
import DataPrioritySection from './DataPrioritySection.vue';


export default {
  name: 'ImageConverter', // Add a name for the component
  components: {
    ConvertAnyFileSection,
    WorksAnywhereSection,
    PrivacyGuaranteedSection,
    DataPrioritySection,
  },
  data() {
    return {
      files: [], // Array to store added files
      bulkTargetFormat: '', // New data property for the bulk select dropdown
      isConverting: false, // New state to track if any file is converting
      // originalImage: null, // Keep if you want to preview the *currently selected* file
      // targetFormat: 'png', // No longer needed as format is per file
      // downloadUrl: null, // Removed, downloadUrl is now per file
      // downloadFileName: '', // Removed, downloadFileName is now per file
    };
  },
  computed: {
    // Computed property to check if all files have completed conversion (either success or failed)
    allFilesCompleted() {
      return this.files.length > 0 && this.files.every(file => file.status === 'completed' || file.status === 'failed');
    },
    // Computed property to check if there are any files that can be downloaded
    hasDownloadableFiles() {
      return this.files.some(file => file.status === 'completed' && file.downloadUrl);
    }
  },
  methods: {
    handleFileChange(event) {
      const selectedFiles = Array.from(event.target.files);
      selectedFiles.forEach(file => {
        // Add unique ID and default target format to each file object
        this.files.push({
          id: Date.now() + Math.random(), // Simple unique ID
          file: file,
          name: file.name,
          size: file.size,
          targetFormat: 'png', // Default output format
          status: 'pending', // Initial status
          progress: 0, // Initial progress
          statusMessage: 'Pending', // Initial status message
          downloadUrl: null, // Download URL for the converted file
          downloadFileName: null, // Download file name for the converted file
        });
      });
      // Clear the file input so the same file can be selected again
      event.target.value = '';
      // In a multi-file scenario, you might not immediately draw on canvas
      // this.drawImageOnCanvas(img);
      // this.downloadUrl = null; // Removed
      this.bulkTargetFormat = ''; // Reset bulk select dropdown
      this.isConverting = false; // Ensure converting state is false when adding new files
    },
    // Method to handle adding more files after initial selection
    handleAddMoreFiles(event) {
      this.handleFileChange(event); // Reuse the same logic for now
    },
    // Method triggered by the "Convert More" button
    handleAddMoreFilesClick() {
      // Trigger the hidden file input click
      document.getElementById('addMoreInput').click();
    },
    removeFile(index) {
      // Clean up object URL if it exists before removing
      if (this.files[index] && this.files[index].downloadUrl) {
        URL.revokeObjectURL(this.files[index].downloadUrl);
      }
      this.files.splice(index, 1);
      // If the removed file was being processed or previewed, update UI accordingly
      if (this.files.length === 0) {
        // this.clearCanvas(); // Clear canvas if no files left (if preview is active)
        // this.downloadUrl = null; // Removed
        this.bulkTargetFormat = ''; // Reset bulk select dropdown
        this.isConverting = false; // Ensure converting state is false if all files removed
      }
    },
    // Method to remove all files
    removeAllFiles() {
      this.files.forEach(file => {
        if (file.downloadUrl) {
          URL.revokeObjectURL(file.downloadUrl);
        }
      });
      this.files = [];
      this.bulkTargetFormat = '';
      this.isConverting = false;
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    // Method to apply the selected bulk format to all files
    applyBulkFormat() {
      if (this.bulkTargetFormat) {
        this.files.forEach(file => {
          // Only apply to pending or failed files
          if (file.status === 'pending' || file.status === 'failed') {
            file.targetFormat = this.bulkTargetFormat;
          }
        });
      }
    },
    startConversion() {
      if (this.files.length === 0 || this.isConverting) {
        return;
      }

      this.isConverting = true; // Set converting state

      // Filter for pending or failed files to convert
      const filesToConvert = this.files.filter(file => file.status === 'pending' || file.status === 'failed');

      // Use Promise.all to wait for all conversions to finish
      const conversionPromises = filesToConvert.map(file => this.processSingleFile(file));

      Promise.all(conversionPromises).then(() => {
        this.isConverting = false; // All conversions finished
        console.log('All conversions attempted.');
        // The computed property `allFilesCompleted` will update the UI
      }).catch(error => {
        console.error('An error occurred during conversion:', error);
        this.isConverting = false; // Stop converting state even if one fails
      });
    },
    // Method to process a single file conversion
    processSingleFile(file) {
      return new Promise((resolve) => {
        file.status = 'converting'; // Update status
        file.statusMessage = 'Converting';
        file.progress = 0; // Reset progress

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            // Simulate progress (frontend conversion doesn't have natural progress events)
            // In a real scenario with a backend, progress would be reported via WebSocket or polling
            let currentProgress = 0;
            const progressInterval = setInterval(() => {
              currentProgress += 5; // Simulate 5% progress increments
              if (currentProgress <= 95) { // Stop simulation before 100%
                file.progress = currentProgress;
              } else {
                clearInterval(progressInterval);
                // Actual conversion happens here
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');

                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                tempCtx.drawImage(img, 0, 0);

                let mimeType = 'image/png';
                let fileExtension = 'png';

                switch (file.targetFormat) {
                  case 'jpeg':
                    mimeType = 'image/jpeg';
                    fileExtension = 'jpg';
                    break;
                  case 'webp':
                    mimeType = 'image/webp';
                    fileExtension = 'webp';
                    break;
                  case 'png':
                  default:
                    mimeType = 'image/png';
                    fileExtension = 'png';
                    break;
                }

                tempCanvas.toBlob((blob) => {
                  if (blob) {
                    file.status = 'completed';
                    file.statusMessage = 'Done';
                    file.progress = 100; // Set progress to 100% on completion
                    file.downloadUrl = URL.createObjectURL(blob);
                    // Generate download file name (replace original extension with target)
                    const originalName = file.name.split('.').slice(0, -1).join('.');
                    file.downloadFileName = `${originalName}.${fileExtension}`;
                    resolve(); // Resolve the promise on success
                  } else {
                    file.status = 'failed';
                    file.statusMessage = 'Conversion Failed';
                    file.progress = 0; // Reset progress on failure
                    console.error('Canvas to Blob conversion failed.');
                    resolve(); // Resolve even on failure so Promise.all completes
                  }
                }, mimeType);
              }
            }, 100); // Update progress every 100ms
          };
          img.onerror = () => {
            file.status = 'failed';
            file.statusMessage = 'Image Load Failed';
            file.progress = 0;
            console.error('Failed to load image:', file.name);
            resolve(); // Resolve even on error
          };
          img.src = e.target.result;
        };
        reader.onerror = () => {
          file.status = 'failed';
          file.statusMessage = 'File Read Failed';
          file.progress = 0;
          console.error('Failed to read file:', file.name);
          resolve(); // Resolve even on error
        };
        reader.readAsDataURL(file.file); // Read file as Data URL for Image object
      });
    },
    // Method to download all completed files as a zip
    async downloadAllFiles() {
      if (!this.hasDownloadableFiles) {
        console.log('No files to download.');
        return;
      }

      const zip = new JSZip();
      const downloadPromises = [];

      this.files.forEach(file => {
        if (file.status === 'completed' && file.downloadUrl) {
          // Fetch the blob from the object URL
          const promise = fetch(file.downloadUrl)
              .then(response => response.blob())
              .then(blob => {
                // Add the blob to the zip file
                zip.file(file.downloadFileName, blob);
              })
              .catch(error => {
                console.error(`Failed to fetch blob for ${file.name}:`, error);
                // Optionally update file status to indicate download issue
              });
          downloadPromises.push(promise);
        }
      });

      // Wait for all blobs to be added to the zip object
      await Promise.all(downloadPromises);

      // Generate the zip file
      zip.generateAsync({type: "blob"})
          .then(function (content) {
            // Use file-saver to save the zip file
            saveAs(content, "converted_images.zip");
          })
          .catch(error => {
            console.error('Failed to generate zip file:', error);
          });
    },
  },
  beforeDestroy() {
    // Clean up object URLs when the component is destroyed
    this.files.forEach(file => {
      if (file.downloadUrl) {
        URL.revokeObjectURL(file.downloadUrl);
      }
    });
  }
};
</script>

<style scoped>

.info-cards-container {
  display: grid; /* Use grid for layout */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive columns */
  gap: 20px; /* Space between cards */
  margin-top: 30px; /* Space above the cards */
  margin-bottom: 30px; /* Space below the cards */
}

.image-converter-section {
  /* Add padding or margin if needed */
  padding: 20px; /* Example padding */
  max-width: 800px; /* Limit max width */
  margin: 0 auto; /* Center the component */
  font-family: sans-serif; /* Use a common font */
}

.page-title {
  margin-bottom: 20px;
  text-align: center; /* Center the title */
}

.page-title h2 {
  font-size: 2em; /* Adjust font size */
  margin-bottom: 5px;
  color: #333;
}

.page-title p {
  color: #666; /* Adjust color */
  font-size: 1.1em;
}

/* --- Initial Upload Area Styles --- */
.initial-upload-area {
  margin-bottom: 20px;
  text-align: center; /* Center content inside */
}

.dashed-border-box {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.initial-upload-area input[type="file"],
.add-more-files-area input[type="file"] {
  display: none;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1em;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  gap: 5px;
}

.button.primary {
  background-color: #727cf5;
  color: white;
  border-color: #727cf5;
}

.button.primary:hover {
  background-color: #656ee0;
  border-color: #656ee0;
}

.button.secondary {
  background-color: #e9ecef;
  color: #333;
  border-color: #ced4da;
}

.button.secondary:hover {
  background-color: #d3d9df;
  border-color: #ced4da;
}

.button.success {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.button.success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


.choose-files-button {
  display: inline-flex; /* Use flex layout */
  align-items: center;
  padding: 0; /* Remove default padding */
  border: none; /* Remove default border */
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  overflow: hidden; /* Hide overflow for split button */
  background-color: #727cf5; /* Mimic purple background from image */
  color: white;
  margin-bottom: 15px; /* Add space below button */
}

.choose-files-button .button-main {
  display: flex;
  align-items: center;
  padding: 10px 15px; /* Left button padding */
  gap: 5px; /* Icon and text spacing */
  background-color: #727cf5; /* Left background color */
  color: white;
}

.choose-files-button .button-dropdown {
  display: flex;
  align-items: center;
  padding: 10px 10px; /* Right dropdown icon padding */
  background-color: #656ee0; /* Right background color, slightly darker */
  color: white;
}

.choose-files-button:hover .button-main {
  background-color: #656ee0; /* Hover effect */
}

.choose-files-button:hover .button-dropdown {
  background-color: #5a62d4; /* Hover effect */
}


.upload-info {
  font-size: 0.9em;
  color: #555;
  margin-top: 0; /* Adjust margin */
  margin-bottom: 5px;
}

.terms-info {
  font-size: 0.9em;
  color: #555;
  margin-top: 0; /* Adjust margin */
}

.terms-info a, .upload-info a {
  color: #727cf5; /* Link color */
  text-decoration: none;
}

.terms-info a:hover, .upload-info a:hover {
  text-decoration: underline;
}


/* --- File List Area Styles (when files are added) --- */
.file-list-area {
  border: 1px solid #eee; /* Mimic outer border */
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden; /* Ensure border-radius applies */
  background-color: #fff; /* White background for the list */
}

.add-more-files-area {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  background-color: #f8f9fa; /* Light grey background */
  text-align: left; /* Align button to left */
}

/* "Add More Files" button style */
.add-more-button {
  display: inline-flex; /* Use flex layout */
  align-items: center;
  gap: 5px; /* Icon and text spacing */
  padding: 8px 15px; /* Adjusted padding, smaller than Choose Files */
  border: 1px solid #ced4da; /* Border */
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9em; /* Adjusted font size */
  background-color: #e9ecef; /* Light background */
  color: #333; /* Text color */
  transition: background-color 0.3s ease;
}

.add-more-button:hover {
  background-color: #d3d9df; /* Hover effect */
}


.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee; /* Separator line between file items */
  background-color: #fff; /* Background color */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 10px; /* Gap between flex items */
}

.file-item:last-child {
  border-bottom: none; /* No bottom border for the last item */
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1; /* Allow info area to take more space */
  min-width: 150px; /* Ensure info area has minimum width */
}

.file-name {
  font-size: 1em;
  color: #333;
  word-break: break-all; /* Prevent long file names from overflowing */
}

.file-size {
  font-size: 0.9em;
  color: #666;
}

.file-status-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px; /* Give status area a minimum width */
}

.status-text {
  font-size: 0.9em;
  font-weight: bold;
}

.status-text.pending {
  color: #666;
}

.status-text.converting {
  color: #007bff; /* Blue color for converting */
}

.status-text.completed {
  color: #28a745; /* Green color for completed */
}

.status-text.failed {
  color: #dc3545; /* Red color for failed */
}

.status-converting {
  width: 100%; /* Ensure converting status takes full width */
}

.progress-bar-container {
  width: 100%;
  height: 8px; /* Height of the progress bar */
  background-color: #e9ecef; /* Background of the container */
  border-radius: 4px;
  overflow: hidden; /* Hide overflow of the bar */
  margin-top: 4px; /* Space above the bar */
}

.progress-bar {
  height: 100%;
  background-color: #007bff; /* Blue color for the bar */
  width: 0%; /* Initial width */
  transition: width 0.1s ease; /* Smooth transition for progress updates */
  border-radius: 4px;
}


.file-options {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between options */
  flex-shrink: 0; /* Prevent options from shrinking */
}

.file-options select {
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 0.9em;
  cursor: pointer;
}

.icon-button {
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
  display: flex; /* Center SVG */
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  color: #333;
}

.remove-button:hover {
  color: #dc3545; /* Red color for remove on hover */
}

.download-button {
  padding: 5px 10px; /* Smaller padding for individual download button */
  font-size: 0.9em; /* Smaller font size */
}


.file-summary {
  padding: 10px 15px;
  background-color: #f8f9fa;
  font-size: 0.9em;
  color: #555;
  text-align: right; /* Align summary to the right */
}


/* --- Bulk Convert Area Styles --- */
.bulk-convert-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allow wrapping */
  gap: 15px; /* Space between options and buttons */
}

.bulk-convert-options {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1em;
  color: #333;
}

.bulk-convert-options select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1em;
  cursor: pointer;
}

.main-action-buttons {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between main buttons */
  flex-wrap: wrap; /* Allow buttons to wrap */
}

.convert-button.please-wait {
  background-color: #ffc107; /* Warning color for please wait */
  border-color: #ffc107;
  color: #212529;
  cursor: default; /* Change cursor */
}

.convert-button.please-wait:hover {
  background-color: #ffb300;
  border-color: #ffb300;
}

.download-all-button {
  /* Inherits .button.primary styles */
}

.convert-more-button {
  /* Inherits .button.secondary styles */
}

.trash-button {
  /* Inherits .icon-button styles */
  color: #dc3545; /* Red color for trash */
}

.trash-button:hover {
  color: #c82333; /* Darker red on hover */
}


/* --- Footer Info Styles --- */
.footer-info {
  margin-top: 20px;
  font-size: 0.8em;
  color: #999;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .file-item {
    flex-direction: column;
    align-items: stretch;
  }

  .file-info, .file-status-area, .file-options {
    width: 100%;
    min-width: auto;
    align-items: flex-start;
  }

  .file-options {
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
  }

  .bulk-convert-area {
    flex-direction: column;
    align-items: stretch;
  }

  .main-action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .main-action-buttons button, .main-action-buttons .icon-button {
    width: 100%;
    justify-content: center;
  }

  .bulk-convert-options {
    width: 100%;
    justify-content: space-between;
  }
}

</style>

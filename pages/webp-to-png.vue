<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <div class="breadcrumbs">
          <NuxtLink to="/">Home</NuxtLink> &gt; webp to png Converter
        </div>
        <div class="page-container">
          <h1>Convert webp to png Online</h1>
          <p>Best webp to png converter. Convert webp to png online in the highest quality within seconds. Works on any web browser &amp; 100% free.</p>

          <div class="converter-section">
            <div class="upload-area" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/webp" multiple style="display: none;">
              <p v-if="files.length === 0">Drag &amp; Drop WebP files here, or click to select</p>
              <div v-else class="file-list-area">
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
            </div>
            <div class="main-action-buttons">
              <button
                  v-if="!allFilesCompleted"
                  :disabled="files.length === 0 || converting"
                  @click="startConversion"
                  class="button success convert-button"
                  :class="{ 'please-wait': converting }"
              >
                <span v-if="!converting">
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

              <button v-if="allFilesCompleted" @click="removeAllFiles" class="button secondary convert-more-button">
                Convert More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fill-rule="evenodd"
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.146L4.354 9.146a.5.5 0 1 0 .708.708L15 1.707V4.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </button>

              <button v-if="allFilesCompleted && hasDownloadableFiles" @click="downloadAllFiles" class="button primary download-all-button">
                Download All
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
                     viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>

              <span v-if="files.length > 0" class="icon-button trash-button" @click="removeAllFiles">
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

          <div class="info-sections">
            <div class="section-block">
              <h2>How to Convert webp to png?</h2>
              <ol>
                <li><strong>Upload your WebP file(s):</strong> Click on the upload area or drag and drop your WebP images into the designated box.</li>
                <li><strong>Start Conversion:</strong> Once your files are uploaded, click the "Convert to PNG" button. Our tool will process your images.</li>
                <li><strong>Download PNG:</strong> After conversion, you can download your new PNG files individually or as a batch.</li>
              </ol>
              <div class="feature-cards">
                <div class="feature-card">
                  <div class="feature-icon">✔</div> <!-- Placeholder for icon -->
                  <h3>Easy to Use</h3>
                  <p>Simply upload your WebP files and click the convert button. You can also batch convert webp to png format.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">⭐</div> <!-- Placeholder for icon -->
                  <h3>High Quality Conversion</h3>
                  <p>Our web app transforms your WebP images into high-quality PNG format, preserving image fidelity.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">🔒</div> <!-- Placeholder for icon -->
                  <h3>Free & Secure</h3>
                  <p>Our webp to png converter is free and works on any web browser. Files are protected with 256-bit SSL encryption and automatically delete after a few hours.</p>
                </div>
              </div>
            </div>

            <div class="section-block">
              <h2>What is a WebP file?</h2>
              <p>WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster. WebP images are typically 26% smaller in size compared to PNGs and 25-34% smaller than JPEG images at equivalent SSIM quality index. It supports both lossy and lossless compression, as well as animation and alpha transparency.</p>
              <h3>How to open a WebP file?</h3>
              <p>The default program for opening WebP is Google Chrome (Chrome), which works across platforms. WebP files also open automatically on GIMP and Microsoft Paint. Besides Chrome, all other web browsers support the WebP format.</p>
              <p>Alternative free viewers to try are Pixelmator and Photopea. Also, try Corel PaintShop Pro. Prior to using IrfanView, Windows Photo Viewer, and Adobe Photoshop, be sure to install the plugins for opening WebP.</p>
            </div>

            <div class="section-block">
              <h2>What is a PNG file?</h2>
              <p>PNG (Portable Network Graphics) is a raster graphics file format that supports lossless data compression. PNG was created as an improved, non-patented replacement for GIF, and is the most used lossless image compression format on the Internet. PNG supports palette-based, grayscale, and truecolor images, and also supports alpha transparency, making it ideal for web graphics with transparent backgrounds.</p>
              <h3>How to open a PNG file?</h3>
              <p>Generally, PNG files will open in your operating system's default image viewer. PNG files are also easily viewable on all web browsers. If you are having trouble opening PNG files, use our PNG to JPG, PNG to WebP, or PNG to BMP converters.</p>
              <!-- <p>Generally, PNG files will open in your operating system's default image viewer. PNG files are also easily viewable on all web browsers. If you are having trouble opening PNG files, use our <NuxtLink to="/png-to-jpg">PNG to JPG</NuxtLink>, <NuxtLink to="/png-to-webp">PNG to WebP</NuxtLink>, or <NuxtLink to="/png-to-bmp">PNG to BMP</NuxtLink> converters.</p> -->
              <p>Alternative programs such as GIMP or Adobe Photoshop are useful for opening and editing PNG files. PNG files are a bit larger than other file types, so exercise caution when adding them to a web page. One interesting feature of PNG files is the ability to create transparency in the image, particularly a transparent background.</p>
            </div>

            <div class="section-block data-priority-section">
              <div class="data-priority-content">
                <h2>Your Data, Our Priority</h2>
                <p>At ImageConvert.me, we go beyond just converting files—we protect them. Our robust security framework ensures that your data is always safe, whether you're converting an image, video, or document. With advanced encryption, secure data centers, and vigilant monitoring, we've covered every aspect of your data's safety.</p>
              </div>
              <div class="security-features">
                <div class="security-item">
                  <div class="security-icon">🔒</div> <!-- Placeholder for icon -->
                  <span>SSL/TLS Encryption</span>
                </div>
                <div class="security-item">
                  <div class="security-icon">☁️</div> <!-- Placeholder for icon -->
                  <span>Secured Data Centers</span>
                </div>
                <div class="security-item">
                  <div class="security-icon">🔑</div> <!-- Placeholder for icon -->
                  <span>Access Control and Authentication</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
    <AppFooter />
    <Analytics/>
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
import { ref, computed } from 'vue';
import { useHead } from '@vueuse/head';
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import JSZip from 'jszip'; // Import JSZip for creating zip files
import FileSaver from 'file-saver'; // Import file-saver using default import
const saveAs = FileSaver.saveAs; // Access saveAs from the default import

const fileInput = ref(null);
const files = ref([]); // Renamed from selectedFiles
const converting = ref(false);

// Computed property to check if all files have completed conversion (either success or failed)
const allFilesCompleted = computed(() => {
  return files.value.length > 0 && files.value.every(file => file.status === 'completed' || file.status === 'failed');
});

// Computed property to check if there are any files that can be downloaded
const hasDownloadableFiles = computed(() => {
  return files.value.some(file => file.status === 'completed' && file.downloadUrl);
});

// Function to trigger the hidden file input
const triggerFileInput = () => {
  fileInput.value.click();
};

// Handle file selection via input
const handleFileChange = (event) => {
  const newFiles = Array.from(event.target.files);
  newFiles.forEach(file => {
    files.value.push({
      id: Date.now() + Math.random(), // Simple unique ID
      file: file,
      name: file.name,
      size: file.size,
      status: 'pending', // Initial status
      progress: 0, // Initial progress
      statusMessage: 'Pending', // Initial status message
      downloadUrl: null, // Download URL for the converted file
      downloadFileName: null, // Download file name for the converted file
    });
  });
  // Clear the input to allow selecting the same file again
  event.target.value = '';
};

// Handle file drop
const handleDrop = (event) => {
  event.preventDefault();
  const droppedFiles = Array.from(event.dataTransfer.files).filter(file => file.type === 'image/webp');
  droppedFiles.forEach(file => {
    files.value.push({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
      statusMessage: 'Pending',
      downloadUrl: null,
      downloadFileName: null,
    });
  });
};

// Helper to format file size
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Remove a file from the list
const removeFile = (index) => {
  files.value.splice(index, 1);
};

// Convert a single WebP file to PNG
const convertWebPToPNG = async (fileItem) => {
  fileItem.status = 'converting';
  fileItem.statusMessage = 'Converting...';
  fileItem.progress = 0;

  try {
    const image = await createImageBitmap(fileItem.file);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        fileItem.progress = currentProgress;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1)); // Quality 1 for PNG
    clearInterval(interval); // Ensure interval is cleared
    fileItem.progress = 100;

    fileItem.downloadUrl = URL.createObjectURL(blob);
    fileItem.downloadFileName = fileItem.name.replace(/\.webp$/i, '.png'); // Replace .webp with .png
    fileItem.status = 'completed';
    fileItem.statusMessage = 'Done';

  } catch (error) {
    console.error('Conversion failed:', error);
    fileItem.status = 'failed';
    fileItem.statusMessage = `Failed: ${error.message || 'Unknown error'}`;
    fileItem.progress = 0;
  }
};

// Start conversion for all pending files
const startConversion = async () => {
  if (files.value.length === 0) return;

  converting.value = true;
  for (const fileItem of files.value) {
    if (fileItem.status === 'pending' || fileItem.status === 'failed') {
      await convertWebPToPNG(fileItem);
    }
  }
  converting.value = false;
};

// Download all completed files as a zip
const downloadAllFiles = async () => {
  const zip = new JSZip();
  let filesToZip = 0;

  for (const fileItem of files.value) {
    if (fileItem.status === 'completed' && fileItem.downloadUrl) {
      try {
        const response = await fetch(fileItem.downloadUrl);
        const blob = await response.blob();
        zip.file(fileItem.downloadFileName, blob);
        filesToZip++;
      } catch (error) {
        console.error(`Failed to add ${fileItem.downloadFileName} to zip:`, error);
      }
    }
  }

  if (filesToZip > 0) {
    zip.generateAsync({ type: 'blob' })
        .then(function (content) {
          saveAs(content, 'converted_images.zip');
        });
  } else {
    alert('No completed files to download.');
  }
};

// Remove all files
const removeAllFiles = () => {
  files.value = [];
  converting.value = false;
};

// Set page meta tags for SEO
useHead({
  title: 'webp to png Converter - ImageConvert.me',
  meta: [
    { name: 'description', content: 'Best webp to png converter. Convert webp to png online in the highest quality within seconds. Works on any web browser & 100% free.' },
    { name: 'keywords', content: 'webp to png, convert webp, webp converter, free webp to png, online image converter' },
  ],
  // Add Product Schema Markup for rich snippets
  script: [
  {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2144282767555592',
      crossorigin: 'anonymous'
    },
    // Google tag (gtag.js)
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-97VFP61WF1'
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product", // Or "Service" if you prefer
        "name": "webp to png Converter by ImageConvert.me",
        "description": "Best webp to png converter. Convert webp to png online in the highest quality within seconds. Works on any web browser & 100% free.",
        "image": "https://imageconvert.me/logo.png", // Replace with an actual image URL for your service/product
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9", // Your average rating (e.g., from 1 to 5)
          "reviewCount": "1234" // Total number of reviews
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "0",
          "availability": "https://schema.org/InStock"
        }
      })
    }
  ]
});
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto; /* Center the content within the container--theme */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
  margin-bottom: 40px; /* Space before footer */
}

h1 {
  font-size: 2.2em;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

h2 {
  font-size: 1.8em;
  color: #555;
  margin-top: 30px;
  margin-bottom: 15px;
}

p {
  margin-bottom: 15px;
  text-align: center;
}

.breadcrumbs {
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #666;
}
.breadcrumbs a {
  color: #727cf5;
  text-decoration: none;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}

/* Global styles for main-wrapper, main, container--theme (copied from index.vue for consistency) */
.main-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main {
    flex-grow: 1;
    padding-top: 0; /* Add some vertical padding */
}

.container--theme {
    max-width: 800px; /* Example value */
    margin: 0 auto; /* Center the container */
    padding: 20px; /* Example padding */
}

/* Converter specific styles */
.converter-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure it takes full width of its parent */
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px; /* Adjusted padding */
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: 600px; /* Increased max-width for better file list display */
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: border-color 0.3s ease;
  background-color: #fdfdfd; /* Light background */
}

.upload-area:hover {
  border-color: #727cf5;
}

.upload-area p {
  color: #666;
  font-size: 1.1em;
  margin: 0;
}

/* File List Area */
.file-list-area {
  width: 100%;
  max-height: 400px; /* Limit height for scroll */
  overflow-y: auto; /* Enable scrolling */
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  margin-right: 15px;
  min-width: 150px; /* Ensure file name has enough space */
}

.file-name {
  font-weight: bold;
  color: #333;
  word-break: break-all; /* Break long file names */
}

.file-size {
  font-size: 0.85em;
  color: #777;
}

.file-status-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  min-width: 120px; /* Give status area some fixed width */
}

.status-text {
  font-weight: bold;
  font-size: 0.9em;
  padding: 3px 8px;
  border-radius: 3px;
  white-space: nowrap;
}

.status-text.pending {
  color: #ffa500; /* Orange */
  background-color: #fff3e0;
}

.status-text.converting {
  color: #007bff; /* Blue */
  background-color: #e0f2ff;
}

.status-text.completed {
  color: #28a745; /* Green */
  background-color: #e6ffe6;
}

.status-text.failed {
  color: #dc3545; /* Red */
  background-color: #ffe6e6;
}

.status-converting {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 8px;
  margin-top: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #727cf5;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
}

.file-options {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 15px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping */
}

.button svg {
  margin-left: 5px;
}

.button.primary {
  background-color: #727cf5;
  color: white;
  border: 1px solid #727cf5;
}

.button.primary:hover:not(:disabled) {
  background-color: #656ee0;
  border-color: #656ee0;
}

.button.success {
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
}

.button.success:hover:not(:disabled) {
  background-color: #218838;
  border-color: #1e7e34;
}

.button.secondary {
  background-color: #6c757d;
  color: white;
  border: 1px solid #6c757d;
}

.button.secondary:hover:not(:disabled) {
  background-color: #5a6268;
  border-color: #545b62;
}

.button:disabled {
  background-color: #a0a0a0;
  border-color: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.7;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.3s ease;
}

.icon-button:hover {
  color: #333;
}

.remove-button svg {
  color: #dc3545; /* Red for remove icon */
}

.remove-button:hover svg {
  color: #c82333;
}

.file-summary {
  text-align: right;
  margin-top: 15px;
  font-size: 0.9em;
  color: #555;
  width: 100%;
}

.main-action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px; /* Align with upload area */
  flex-wrap: wrap; /* Allow buttons to wrap */
}

.main-action-buttons .button {
  flex-grow: 1; /* Allow buttons to grow */
  min-width: 120px; /* Minimum width for buttons */
}

.main-action-buttons .trash-button {
  margin-left: auto; /* Push trash button to the right */
  color: #dc3545;
}

.main-action-buttons .trash-button:hover {
  color: #c82333;
}

/* Please wait animation for convert button */
.please-wait {
  position: relative;
  overflow: hidden;
}

.please-wait::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: loading-shine 1.5s infinite;
}

@keyframes loading-shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Styles for the new info sections (kept from previous turn) */
.info-sections {
  margin-top: 40px;
  background-color: #fff; /* Ensure background for these sections */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Lighter shadow for internal blocks */
}

.section-block {
  margin-bottom: 40px; /* Space between each main section */
  padding-bottom: 20px;
  border-bottom: 1px solid #eee; /* Separator between sections */
}

.section-block:last-child {
  border-bottom: none; /* No border for the last section */
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-block h2 {
  text-align: left; /* Align h2 to left within these sections */
  margin-top: 0; /* Reset margin */
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
}

.section-block h3 {
  font-size: 1.4em;
  color: #555;
  margin-top: 25px;
  margin-bottom: 10px;
}

.section-block p, .section-block ul, .section-block ol {
  text-align: left; /* Align text to left within these sections */
  margin-bottom: 15px;
}

.section-block ul, .section-block ol {
  margin-left: 20px;
}

.section-block li {
  margin-bottom: 8px;
}

.section-block a {
  color: #727cf5;
  text-decoration: none;
}

.section-block a:hover {
  text-decoration: underline;
}

/* How to Convert webp to png? - Feature Cards */
.feature-cards {
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-around; /* Distribute cards evenly */
  gap: 20px; /* Space between cards */
  margin-top: 30px;
  text-align: center;
}

.feature-card {
  flex: 1;
  min-width: 50px; /* Minimum width for cards before wrapping */
  max-width: 30%; /* Max width to allow 3 cards per row */
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card h3 {
  font-size: 1.2em;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #333;
}

.feature-card p {
  font-size: 0.95em;
  color: #666;
  text-align: center;
}

.feature-icon {
  font-size: 2.5em;
  color: #727cf5; /* Icon color */
  margin-bottom: 10px;
}

/* Your Data, Our Priority Section */
.data-priority-section {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  align-items: flex-start; /* Align items to the top */
  gap: 30px; /* Space between content and features */
  background-color: #f8f8f8; /* Light background for this section */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* More prominent shadow */
}

.data-priority-content {
  flex: 2; /* Takes more space */
  min-width: 300px; /* Minimum width before wrapping */
}

.data-priority-content h2 {
  margin-top: 0;
  margin-bottom: 15px;
}

.data-priority-content p {
  margin-bottom: 20px;
}

.learn-more-button {
  background-color: transparent;
  color: #727cf5;
  border: 1px solid #727cf5;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, color 0.3s;
}

.learn-more-button:hover {
  background-color: #727cf5;
  color: white;
}

.security-features {
  flex: 1; /* Takes less space */
  min-width: 200px; /* Minimum width before wrapping */
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 50px; /* Indent features slightly */
}

.security-item {
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #333;
}

.security-icon {
  font-size: 1.5em;
  color: #54f59d; /* Green checkmark color */
  margin-right: 10px;
}

/* Responsive adjustments for info sections */
@media (max-width: 768px) {
  .feature-cards {
    flex-direction: column; /* Stack feature cards vertically */
    align-items: center;
  }
  .feature-card {
    max-width: 90%; /* Take more width on small screens */
  }
  .data-priority-section {
    flex-direction: column; /* Stack data priority content and features vertically */
    padding: 20px;
  }
  .security-features {
    padding-left: 0; /* Remove indent on small screens */
    margin-top: 20px; /* Add space when stacked */
  }
  .section-block h2, .section-block h3, .section-block p, .section-block ul, .section-block ol {
    text-align: center; /* Center text on small screens for better readability */
  }
  .section-block ul, .section-block ol {
    margin-left: auto;
    margin-right: auto;
    width: fit-content; /* Center list items */
  }
}
</style>

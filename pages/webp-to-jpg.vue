<template>
    <div class="main-wrapper">
      <AppHeader />
      <main class="main">
        <div class="container container--theme">
          <div class="breadcrumbs">
            <NuxtLink to="/">Home</NuxtLink> &gt; WebP to JPG Converter
          </div>
          <div class="page-container">
            <h1>Convert WebP to JPG Online</h1>
            <p>Best WebP to JPG converter. Convert WebP to JPG online in the highest quality within seconds. Works on any web browser &amp; 100% free.</p>
  
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
                <h2>How to Convert WebP to JPG?</h2>
                <ol>
                  <li><strong>Upload your WebP file(s):</strong> Click on the upload area or drag and drop your WebP images into the designated box.</li>
                  <li><strong>Start Conversion:</strong> Once your files are uploaded, click the "Convert" button. Our tool will process your images.</li>
                  <li><strong>Download JPG:</strong> After conversion, you can download your new JPG files individually or as a batch.</li>
                </ol>
                <div class="feature-cards">
                  <div class="feature-card">
                    <div class="feature-icon">✔</div> <!-- Placeholder for icon -->
                    <h3>Easy to Use</h3>
                    <p>Simply upload your WebP files and click the convert button. You can also batch convert WebP to JPG format.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">⭐</div> <!-- Placeholder for icon -->
                    <h3>High Quality Conversion</h3>
                    <p>Our web app transforms your WebP images into high-quality JPG format, preserving image fidelity.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔒</div> <!-- Placeholder for icon -->
                    <h3>Free & Secure</h3>
                    <p>Our WebP to JPG converter is free and works on any web browser. Files are protected with 256-bit SSL encryption and automatically delete after a few hours.</p>
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
                <h2>What is a JPG file?</h2>
                <p>JPG (Joint Photographic Experts Group) is a widely used method of lossy compression for digital images, particularly for photographs. The degree of compression can be adjusted, allowing a selectable trade-off between storage size and image quality. JPG is the most common image format used for storing and transmitting photographic images on the World Wide Web.</p>
                <h3>How to open a JPG file?</h3>
                <p>JPG files are universally supported and can be opened by virtually any image viewer, web browser, or photo editing software on any operating system. This includes default applications like Windows Photos, macOS Preview, and all major web browsers (Chrome, Firefox, Edge, Safari). No special software or plugins are typically required to view JPG images.</p>
                <p>For editing JPG files, popular programs like Adobe Photoshop, GIMP, Paint.NET, and many others offer comprehensive tools. Due to their excellent compression and wide compatibility, JPG files are ideal for sharing photos online and embedding them in documents.</p>
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
    </div>
  </template>
  
  <script setup>
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
  
  // Convert a single WebP file to JPG
  const convertWebPToJPG = async (fileItem) => {
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
  
      // Changed to 'image/jpeg' with a quality of 0.9 (common for JPG)
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9)); 
      clearInterval(interval); // Ensure interval is cleared
      fileItem.progress = 100;
  
      fileItem.downloadUrl = URL.createObjectURL(blob);
      fileItem.downloadFileName = fileItem.name.replace(/\.webp$/i, '.jpg'); // Replace .webp with .jpg
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
        await convertWebPToJPG(fileItem); // Call the JPG conversion function
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
    title: 'WebP to JPG Converter - ImageConvert.me',
    meta: [
      { name: 'description', content: 'Best WebP to JPG converter. Convert WebP to JPG online in the highest quality within seconds. Works on any web browser & 100% free.' },
      { name: 'keywords', content: 'webp to jpg, convert webp, webp converter, jpg converter, free webp to jpg, online image converter' },
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
          "name": "WebP to JPG Converter by ImageConvert.me",
          "description": "Convert WebP images to JPG format online for free. Optimize file size for web and maintain good image quality with our easy-to-use converter.",
          "url": "https://www.imageconvert.me/webp-to-jpg",
          "image": "https://www.imageconvert.me/logo.png",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })
      }
    ]
  });
  </script>
  
  <style scoped>
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
  
  .page-container {
    margin-top: 0;
    margin-bottom: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  h1 {
    color: #333;
    font-size: 2em;
    margin-bottom: 15px;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .converter-section {
    margin-top: 30px;
    margin-bottom: 30px;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  .upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 40px 20px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #777;
    font-size: 1.1em;
  }
  
  .upload-area:hover {
    border-color: #727cf5;
  }
  
  .file-list-area {
    width: 100%;
    margin-top: 20px;
    text-align: left;
  }
  
  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .file-item:last-child {
    border-bottom: none;
  }
  
  .file-info {
    flex-grow: 1;
  }
  
  .file-name {
    font-weight: bold;
    color: #333;
    display: block;
    word-break: break-all;
  }
  
  .file-size {
    font-size: 0.85em;
    color: #888;
  }
  
  .file-status-area {
    min-width: 120px;
    text-align: right;
    margin-left: 15px;
  }
  
  .status-text {
    font-weight: bold;
  }
  
  .status-text.pending {
    color: #ffa500; /* Orange */
  }
  
  .status-text.converting {
    color: #727cf5; /* Blue */
  }
  
  .status-text.completed {
    color: #28a745; /* Green */
  }
  
  .status-text.failed {
    color: #dc3545; /* Red */
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
    width: 0%;
    border-radius: 5px;
    transition: width 0.1s ease-out;
  }
  
  .file-options {
    margin-left: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    border: none;
  }
  
  .button.primary {
    background-color: #727cf5;
    color: white;
  }
  
  .button.primary:hover {
    background-color: #5a67d8;
  }
  
  .button.success {
    background-color: #28a745;
    color: white;
  }
  
  .button.success:hover {
    background-color: #218838;
  }
  
  .button.secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .button.secondary:hover {
    background-color: #5a6268;
  }
  
  .button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .button svg {
    margin-left: 8px;
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
  }
  
  .icon-button:hover {
    color: #333;
  }
  
  .remove-button svg, .trash-button svg {
    width: 20px;
    height: 20px;
  }
  
  .main-action-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .file-summary {
    margin-top: 15px;
    font-size: 0.9em;
    color: #666;
    text-align: center;
  }
  
  .info-sections {
    margin-top: 40px;
  }
  
  .section-block {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  
  .section-block h2 {
    color: #333;
    font-size: 1.6em;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .section-block h3 {
    color: #444;
    font-size: 1.2em;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .section-block ol, .section-block ul {
    margin-left: 20px;
    margin-bottom: 15px;
  }
  
  .section-block li {
    margin-bottom: 8px;
    color: #555;
  }
  
  .feature-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
  }
  
  .feature-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    flex: 1 1 calc(33% - 20px); /* Three cards per row */
    min-width: 280px; /* Minimum width for responsiveness */
    text-align: center;
  }
  
  .feature-card .feature-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
  }
  
  .feature-card h3 {
    font-size: 1.3em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .feature-card p {
    font-size: 0.95em;
    color: #666;
  }
  
  .data-priority-section {
    background-color: #e6f7ff; /* Light blue background */
    border: 1px solid #91d5ff;
    color: #333;
  }
  
  .data-priority-section h2 {
    color: #1890ff; /* Darker blue for heading */
    border-bottom-color: #bae7ff;
  }
  
  .security-features {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
  }
  
  .security-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    font-size: 0.95em;
    color: #555;
  }
  
  .security-item .security-icon {
    font-size: 1.5em;
    margin-right: 10px;
  }
  
  /* Global styles for main-wrapper, main, container--theme (copied from index.vue for consistency) */
  .main-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
  }
  
  .main {
      flex-grow: 1;
      padding: 0 0; /* Add some vertical padding */
  }
  
  .container--theme {
      max-width: 800px; /* Example value */
      margin: 0 auto; /* Center the container */
      padding: 20px; /* Example padding */
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .page-container {
      margin: 20px;
      padding: 15px;
    }
    h1 {
      font-size: 1.8em;
    }
    h2 {
      font-size: 1.5em;
    }
    .feature-card {
      flex: 1 1 100%; /* Stack cards on small screens */
    }
    .main-action-buttons {
      flex-direction: column;
      gap: 10px;
    }
    .button {
      width: 100%;
    }
  }
  </style>
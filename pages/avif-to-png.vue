<template>
    <div class="main-wrapper">
      <AppHeader />
      <main class="main">
        <div class="container container--theme">
          <div class="breadcrumbs">
            <NuxtLink to="/">Home</NuxtLink> &gt; AVIF to PNG Converter
          </div>
          <div class="page-container">
            <h1>Convert AVIF to PNG Online</h1>
            <p>Best AVIF to PNG converter. Convert AVIF to PNG online in the highest quality within seconds. Works on any web browser &amp; 100% free.</p>
  
            <div class="converter-section">
              <div class="upload-area" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/avif" multiple style="display: none;">
                <p v-if="files.length === 0">Drag &amp; Drop AVIF files here, or click to select</p>
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
                <h2>How to Convert AVIF to PNG?</h2>
                <ol>
                  <li><strong>Upload your AVIF file(s):</strong> Click on the upload area or drag and drop your AVIF images into the designated box.</li>
                  <li><strong>Start Conversion:</strong> Once your files are uploaded, click the "Convert" button. Our tool will process your images.</li>
                  <li><strong>Download PNG:</strong> After conversion, you can download your new PNG files individually or as a batch.</li>
                </ol>
                <div class="feature-cards">
                  <div class="feature-card">
                    <div class="feature-icon">✔</div> <!-- Placeholder for icon -->
                    <h3>Easy to Use</h3>
                    <p>Simply upload your AVIF files and click the convert button. You can also batch convert AVIF to PNG format.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">⭐</div> <!-- Placeholder for icon -->
                    <h3>High Quality Conversion</h3>
                    <p>Our web app transforms your AVIF images into high-quality PNG format, preserving image fidelity.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔒</div> <!-- Placeholder for icon -->
                    <h3>Free & Secure</h3>
                    <p>Our AVIF to PNG converter is free and works on any web browser. Files are protected with 256-bit SSL encryption and automatically delete after a few hours.</p>
                  </div>
                </div>
              </div>
  
              <div class="section-block">
                <h2>What is an AVIF file?</h2>
                <p>AVIF (AV1 Image File Format) is an image file format specification for storing images or image sequences compressed with AV1. It was developed by the Alliance for Open Media (AOMedia) and is designed to be a royalty-free image format. AVIF offers significant compression efficiency compared to older formats like JPEG, PNG, and even WebP, often resulting in smaller file sizes while maintaining high image quality. It supports features like HDR (High Dynamic Range), wide color gamut, and transparency.</p>
                <h3>How to open an AVIF file?</h3>
                <p>Modern web browsers like Google Chrome, Mozilla Firefox, and Microsoft Edge have native support for AVIF images, allowing them to be viewed directly in the browser. Some image viewers and editing software, such as Paint.NET (with a plugin), GIMP (with a plugin), and various online converters, also support AVIF. As AVIF gains more adoption, support in more applications is expected to grow.</p>
              </div>
  
              <div class="section-block">
                <h2>What is a PNG file?</h2>
                <p>PNG (Portable Network Graphics) is a raster graphics file format that supports lossless data compression. PNG was created as an improved, non-patented replacement for GIF, and is the most used lossless image compression format on the Internet. PNG supports transparency (alpha channel), making it ideal for web graphics, logos, and images that require a transparent background. It is well-suited for images with sharp transitions, such as line drawings, text, and graphics with large areas of uniform color.</p>
                <h3>How to open a PNG file?</h3>
                <p>PNG files are universally supported across all operating systems, web browsers, and image editing software. You can open PNG files with default image viewers on Windows (Photos), macOS (Preview), and Linux. All major web browsers (Chrome, Firefox, Edge, Safari) display PNG images natively. For editing, popular software like Adobe Photoshop, GIMP, Paint.NET, and many others provide full support for PNG files, including their transparency features.</p>
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
    // Filter for AVIF files
    const droppedFiles = Array.from(event.dataTransfer.files).filter(file => file.type === 'image/avif');
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
  
  // Convert a single AVIF file to PNG
  const convertAvifToPNG = async (fileItem) => {
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
  
      // Changed to 'image/png' (PNG is lossless, no quality parameter needed)
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png')); 
      clearInterval(interval); // Ensure interval is cleared
      fileItem.progress = 100;
  
      fileItem.downloadUrl = URL.createObjectURL(blob);
      // Replace original extension with .png
      fileItem.downloadFileName = fileItem.name.replace(/\.avif$/i, '.png'); 
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
        await convertAvifToPNG(fileItem); // Call the AVIF to PNG conversion function
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
    title: 'AVIF to PNG Converter - ImageConvert.me',
    meta: [
      { name: 'description', content: 'Best AVIF to PNG converter. Convert AVIF to PNG online in the highest quality within seconds. Works on any web browser & 100% free.' },
      { name: 'keywords', content: 'avif to png, convert avif, avif converter, png converter, free avif to png, online image converter' },
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
          "name": "AVIF to PNG Converter by ImageConvert.me",
          "description": "Convert AVIF images to PNG format online for free. Optimize file size for web and maintain good image quality with our easy-to-use converter.",
          "url": "https://www.imageconvert.me/avif-to-png",
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
  
  // ... existing code ...

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
    background-color: #fff; /* Completed the background-color property */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .converter-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s ease;
    min-height: 150px; /* Ensure it's tall enough for drag/drop */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f9f9f9;
  }
  
  .upload-area:hover {
    border-color: #727cf5;
  }
  
  .upload-area p {
    margin: 0;
    color: #555;
    font-size: 1.1em;
  }
  
  .file-list-area {
    width: 100%;
  }
  
  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .file-item:last-child {
    border-bottom: none;
  }
  
  .file-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .file-name {
    font-weight: bold;
    color: #333;
  }
  
  .file-size {
    font-size: 0.85em;
    color: #777;
  }
  
  .file-status-area {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 150px; /* Give status area some space */
  }
  
  .status-text {
    font-weight: bold;
  }
  
  .status-text.pending {
    color: #ffa500; /* Orange */
  }
  
  .status-text.converting {
    color: #007bff; /* Blue */
  }
  
  .status-text.completed {
    color: #28a745; /* Green */
  }
  
  .status-text.failed {
    color: #dc3545; /* Red */
  }
  
  .status-converting {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .progress-bar-container {
    width: 80px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #007bff;
    width: 0%;
    transition: width 0.1s ease-out;
  }
  
  .file-options {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .button.primary {
    background-color: #727cf5;
    color: white;
    border: 1px solid #727cf5;
  }
  
  .button.primary:hover {
    background-color: #5d67e0;
    border-color: #5d67e0;
  }
  
  .button.success {
    background-color: #28a745;
    color: white;
    border: 1px solid #28a745;
  }
  
  .button.success:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  .button.secondary {
    background-color: #6c757d;
    color: white;
    border: 1px solid #6c757d;
  }
  
  .button.secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
  
  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .main-action-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-button svg {
    width: 20px;
    height: 20px;
    color: #666;
    transition: color 0.3s ease;
  }
  
  .icon-button:hover svg {
    color: #333;
  }
  
  .trash-button svg {
    color: #dc3545;
  }
  
  .trash-button:hover svg {
    color: #c82333;
  }
  
  .file-summary {
    margin-top: 10px;
    font-size: 0.9em;
    color: #777;
    text-align: right;
  }
  
  .info-sections {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .section-block {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  
  .section-block h2 {
    color: #333;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.5em;
  }
  
  .section-block h3 {
    color: #555;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  
  .section-block p, .section-block ol {
    color: #666;
    line-height: 1.6;
  }
  
  .section-block ol {
    padding-left: 20px;
  }
  
  .section-block ol li {
    margin-bottom: 10px;
  }
  
  .feature-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .feature-card {
    flex: 1 1 calc(33% - 20px); /* Three cards per row on larger screens */
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    text-align: center;
    min-width: 280px; /* Minimum width for cards */
  }
  
  .feature-card .feature-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
    color: #727cf5;
  }
  
  .feature-card h3 {
    margin-top: 0;
    color: #333;
  }
  
  .feature-card p {
    font-size: 0.95em;
    color: #666;
  }
  
  .data-priority-section {
    background-color: #e6f7ff; /* Light blue background */
    border: 1px solid #91d5ff;
    padding: 30px;
    text-align: center;
  }
  
  .data-priority-section h2 {
    color: #1890ff; /* Darker blue for heading */
  }
  
  .data-priority-section p {
    color: #333;
    max-width: 800px;
    margin: 0 auto 20px auto;
  }
  
  .security-features {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 20px;
  }
  
  .security-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .security-item .security-icon {
    font-size: 2.5em;
    color: #1890ff;
  }
  
  .security-item span {
    font-weight: bold;
    color: #333;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .feature-card {
      flex: 1 1 calc(50% - 20px); /* Two cards per row on medium screens */
    }
  }
  
  @media (max-width: 480px) {
    .feature-card {
      flex: 1 1 100%; /* One card per row on small screens */
    }
    .main-action-buttons {
      flex-direction: column;
      align-items: center;
    }
    .button {
      width: 100%;
      max-width: 250px;
    }
  }
  </style>
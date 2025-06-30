<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <ImageConverter />
        <h1>Free Online Image Converter</h1>
        <p>Welcome to ImageConvert.me, your go-to online tool for quick and easy image conversions. Whether you need to change formats for web optimization, sharing, or specific software requirements, our converter handles it all with simplicity and speed.</p>
        <p>Our service supports a variety of popular image formats, ensuring your files are always compatible with your needs. Just upload your image, choose your desired output format, and let us do the rest. It's fast, free, and secure!</p>
        
        <!-- Added content to increase word count and provide more details -->
        <h2>Why Choose ImageConvert.me?</h2>
        <p>At ImageConvert.me, we prioritize your convenience and data security. Our platform is designed to be intuitive, allowing you to convert images without any technical expertise. There's no software to download or install, and you can access our service from any device with an internet connection. We ensure your privacy by automatically deleting uploaded files from our servers shortly after conversion, so your data remains yours.</p>

        <h2>How It Works: Simple Steps to Convert Your Images</h2>
        <p>Converting your images is a breeze with our user-friendly interface:</p>
        <ol>
          <li><strong>Upload Your Image:</strong> Click the "Upload" button or drag and drop your image file into the designated area. We support various input formats.</li>
          <li><strong>Select Output Format:</strong> Choose the desired format for your converted image from our available options (e.g., WebP to PNG).</li>
          <li><strong>Download Your Converted Image:</strong> Once the conversion is complete, a download link will appear. Click it to save your new image to your device.</li>
        </ol>
        <p>Experience the simplicity and efficiency of ImageConvert.me today. Start converting your images now and enjoy high-quality results in seconds!</p>
        <!-- End of added content -->

        
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import ImageConverter from '~/components/ImageConverter.vue'
import AppFooter from '~/components/AppFooter.vue'
import {useHead} from '@vueuse/head'

useHead({
  title: 'Image Converter - Convert Images Online',
  meta: [
    {name: 'description', content: 'Convert your images to JPG, PNG, WebP, and more online for free.'},
    {name: 'keywords', content: 'image converter, convert image, JPG, PNG, WebP, online converter'},
  ],
  script: [
     // Google AdSense
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
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-97VFP61WF1');
      `
    }
  ]
})
</script>

<style>

body {
    margin: 0;
    line-height: 1.5;
}
.main-wrapper {

}
.container--theme {
    max-width: 800px; 
    margin: 0 auto; 
    padding: 20px;
}
</style>
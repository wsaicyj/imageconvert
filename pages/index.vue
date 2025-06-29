<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <h1>Free Online Image Converter</h1>
        <p>Welcome to ImageConvert.me, your go-to online tool for quick and easy image conversions. Whether you need to change formats for web optimization, sharing, or specific software requirements, our converter handles it all with simplicity and speed.</p>
        <p>Our service supports a variety of popular image formats, ensuring your files are always compatible with your needs. Just upload your image, choose your desired output format, and let us do the rest. It's fast, free, and secure!</p>
        <ImageConverter />
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
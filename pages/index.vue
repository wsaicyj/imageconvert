<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <ImageConverter />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import ImageConverter from '~/components/ImageConverter.vue'
import AppFooter from '~/components/AppFooter.vue' // 假设您会创建这个组件
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
// export default {
//   components: {
//     AppHeader,
//     ImageConverter,
//     AppFooter
//   }
//   // 您可以在这里添加页面的 meta 信息等
// }
</script>

<style>
/* 在这里可以放置一些全局或基础的样式 */
/* 例如，从原文件中复制 body, html 的基础样式 */
body {
    margin: 0;
    line-height: 1.5;
    /* ... copy other base styles from original file ... */
}
.main-wrapper {
    /* 模仿原文件的 .main-wrapper 样式 */
}
.container--theme {
    /* 模仿原文件的 .container--theme 样式 */
    max-width: 800px; /* Example value */
    margin: 0 auto; /* Center the container */
    padding: 20px; /* Example padding */
}
/* ... copy other global styles ... */
</style>
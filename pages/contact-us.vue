<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <div class="breadcrumbs">
          <NuxtLink to="/">Home</NuxtLink> &gt; Contact Us
        </div>
        <div class="page-container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! If you have any questions, feedback, or need assistance, please don't hesitate to reach out.</p>

          <h2>How to Reach Us</h2>
          <p>The easiest way to contact us is via email:</p>
          <ul>
            <li><strong>Email:</strong> support@imageconvert.me</li>
          </ul>

          <p>We strive to respond to all inquiries within 24-48 business hours.</p>

          <p>Thank you for using ImageConvert.me!</p>

          <h2>Frequently Asked Questions</h2>
          <p>Before contacting us, you might find the answer to your question in our frequently asked questions section:</p>
          <ul>
            <li><strong>Q: How long does it take to convert an image?</strong><br>A: Conversion usually takes only a few seconds, depending on your internet speed and the image size.</li>
            <li><strong>Q: Are my uploaded images stored?</strong><br>A: No, your uploaded images are temporary and automatically deleted from our servers within a few hours after conversion. We do not store or share them.</li>
            <li><strong>Q: What image formats do you support?</strong><br>A: We currently support WebP to PNG conversion. We are continuously working to add more formats.</li>
            <li><strong>Q: Is ImageConvert.me free to use?</strong><br>A: Yes, our service is completely free for all users.</li>
          </ul>
          <p>If your question is not answered above, please feel free to reach out to us via email. We are here to help!</p>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';
import AppHeader from '~/components/AppHeader.vue'; // Import AppHeader
import AppFooter from '~/components/AppFooter.vue'; // Import AppFooter

useHead({
  title: 'Contact Us - ImageConvert.me',
  meta: [
    { name: 'description', content: 'Get in touch with ImageConvert.me support. Contact us for questions, feedback, or assistance with our online image converter.' },
    { name: 'keywords', content: 'contact, contact us, ImageConvert.me support, image converter contact' },
  ],
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
  /* Remove top margin as it's now inside a padded container */
  margin-top: 0;
  /* Keep bottom margin for spacing before footer, or adjust as needed */
  margin-bottom: 40px;
  /* Ensure background and shadow are applied to the content box */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px; /* Ensure padding is inside the box */
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
}
</style>
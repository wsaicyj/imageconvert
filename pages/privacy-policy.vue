<template>
  <div class="main-wrapper">
    <AppHeader />
    <main class="main">
      <div class="container container--theme">
        <div class="breadcrumbs">
          <NuxtLink to="/">Home</NuxtLink> &gt; Privacy Policy
        </div>
        <div class="page-container">
          <h1>Privacy Policy for ImageConvert.me</h1>
          <p>Last updated: {{ lastUpdatedDate }}</p>

          <p>At ImageConvert.me, accessible from https://www.imageconvert.me, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ImageConvert.me and how we use it.</p>

          <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

          <h2>Information We Collect</h2>
          <p>We do not directly collect any personally identifiable information from our users. Our service is designed to be used without the need for user accounts or personal data submission.</p>
          <p>When you use our image conversion service:</p>
          <ul>
            <li><strong>Uploaded Files:</strong> Images you upload for conversion are processed on our servers. These files are temporary and are automatically deleted from our servers within a few hours after conversion. We do not store, share, or use your uploaded files for any purpose other than the conversion process you initiate.</li>
            <li><strong>Usage Data:</strong> We may collect non-personal usage data, such as the type of conversion performed, the time of conversion, and general technical information about your browser and operating system. This data is aggregated and anonymized and is used solely for improving our service and understanding user trends.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>The information we collect (primarily non-personal usage data) is used for:</p>
          <ul>
            <li>Providing, operating, and maintaining our website and services.</li>
            <li>Improving, personalizing, and expanding our website and services.</li>
            <li>Understanding and analyzing how you use our website and services.</li>
            <li>Developing new products, services, features, and functionality.</li>
          </ul>

          <h2>Log Files</h2>
          <p>ImageConvert.me follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

          <h2>Cookies and Web Beacons</h2>
          <p>Like any other website, ImageConvert.me uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        
          <h2>Third Party Privacy Policies</h2>
          <p>ImageConvert.me's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>

          <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

          <h2>Children's Information</h2>
          <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
          <p>ImageConvert.me does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

          <h2>Online Privacy Policy Only</h2>
          <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ImageConvert.me. This policy is not applicable to any information collected offline or via channels other than this website.</p>

          <h2>Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>

          <h2>Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: <a href="mailto:contact@imageconvert.me">contact@imageconvert.me</a></li>
          </ul>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import AppHeader from '~/components/AppHeader.vue'; // Import AppHeader
import AppFooter from '~/components/AppFooter.vue'; // Import AppFooter

const lastUpdatedDate = ref(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

useHead({
  title: 'Privacy Policy - ImageConvert.me',
  meta: [
    { name: 'description', content: 'Read the Privacy Policy for ImageConvert.me to understand how we handle your data and ensure your privacy during image conversion.' },
    { name: 'keywords', content: 'privacy policy, data privacy, image converter privacy, ImageConvert.me privacy' },
  ],
});
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.2em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

h2 {
  font-size: 1.8em;
  color: #555;
  margin-top: 30px;
  margin-bottom: 15px;
}

p, ul {
  margin-bottom: 15px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

a {
  color: #727cf5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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
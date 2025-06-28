<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <ul class="footer-links">
          <li><NuxtLink to="/privacy-policy">Privacy</NuxtLink></li>
          <li><NuxtLink to="/contact-us">Contact</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} ImageConvert.me. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa; 
  color: #f00909;
  padding: 40px 20px;
  font-size: 0.9em;
}

.app-footer .container {
  max-width: 960px; 
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: left; /* Center the single ul.footer-links */
  align-items: center; /* Vertically center if needed */
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(13, 13, 13, 0.1); 
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* Make links horizontal */
  gap: 20px; /* Space between horizontal links */
  flex-wrap: wrap; /* Allow links to wrap on smaller screens */
  justify-content: center; /* Center links within the ul if they wrap */
}

.footer-links li {
  margin-bottom: 0; /* Remove vertical margin for horizontal links */
}

.footer-links a {
  color: #101010;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.footer-links a:hover {
  color: #727cf5; 
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  font-size: 0.85em;
  color: rgba(10, 10, 10, 0.7);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .footer-content {
    /* On small screens, the ul.footer-links will still be centered */
  }
  .footer-links {
    flex-direction: column; /* Stack links vertically on small screens */
    gap: 8px; /* Adjust gap for vertical stacking */
  }
  .footer-links li {
    margin-bottom: 0; /* No need for margin-bottom on li if gap is used on flex-direction: column */
  }
}
</style>
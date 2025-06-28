<template>
  <header class="app-header">
    <div class="header-content">
      <img src="/logo.png" alt="Site Logo" class="site-logo">
      <span class="site-title"><NuxtLink to="/">ImageConvert</NuxtLink></span>
      <nav>
        <ul>
          <li><NuxtLink to="/webp-to-png">Webp to PNG</NuxtLink></li>
          <!-- Add more navigation links here if needed -->
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  // Header
}
</script>

<style scoped>
.app-header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky; 
  top: 0; 
  z-index: 1000; 
}

.header-content {
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: center;
}

.site-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 50px; 
}
.site-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 50px; 
}

.site-title a { /* Add this new rule */
  text-decoration: none;
  color: inherit; /* Inherit color from parent .site-title */
}

.site-logo {
  height: 30px; 
  margin-right: 10px; 
}

.site-logo {
  height: 30px; 
  margin-right: 10px; 
}

/* Navigation styles */
nav ul {
  list-style: none; 
  margin: 0;
  padding: 0;
  display: flex; 
  gap: 20px; 
}

nav li {
  display: inline-block;
}

nav a {
  text-decoration: none; 
  color: #555; 
  font-weight: 500;
  padding: 5px 0;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #727cf5;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .header-content {
    flex-direction: column; 
    align-items: flex-start; 
  }

  .site-title {
    margin-right: 0;
    margin-bottom: 10px; 
  }


  nav {
    width: 100%; 
    margin-top: 10px;
  }

  nav ul {
    flex-direction: column; 
    gap: 10px; 
  }

  nav a {
    padding: 8px 0; 
    display: block; 
  }


}
</style>

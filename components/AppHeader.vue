<template>
  <header class="app-header">
    <div class="header-content">
      <img src="/logo.png" alt="Site Logo" class="site-logo">
      <span class="site-title"><NuxtLink to="/">ImageConvert</NuxtLink></span>
      <nav>
        <ul>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle">WebP <span class="dropdown-arrow"></span></a>
            <ul class="dropdown-menu">
              <li><NuxtLink to="/webp-to-png">WebP to PNG</NuxtLink></li>
              <li><NuxtLink to="/webp-to-jpg">WebP to JPG</NuxtLink></li>
            </ul>
          </li>
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

/* Dropdown styles */
.dropdown {
  position: relative; /* For positioning the dropdown menu */
}

.dropdown-toggle {
  cursor: pointer; /* Indicate it's clickable */
  /* Inherit nav a styles */
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 5px 0;
  transition: color 0.3s ease;
  display: flex; /* Use flexbox to align text and arrow */
  align-items: center; /* Vertically center them */
}

.dropdown-toggle:hover {
  color: #727cf5;
}

.dropdown-arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 5px; /* Space between text and arrow */
  vertical-align: middle;
  border-top: 4px solid #555; /* Arrow pointing down */
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  transition: transform 0.3s ease; /* Smooth rotation */
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg); /* Rotate arrow when dropdown is open */
}

.dropdown-menu {
  display: none; /* Hidden by default */
  position: absolute;
  background-color: #f9f9f9; /* Background for the dropdown */
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  list-style: none; /* Remove bullet points */
  padding: 0;
  margin: 0;
  border-radius: 4px;
  top: 100%; /* Position below the toggle */
  left: 0;
}

.dropdown-menu li {
  display: block; /* Each item takes full width */
}

.dropdown-menu li a {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  white-space: nowrap; /* Prevent text wrapping */
}

.dropdown-menu li a:hover {
  background-color: #ddd;
  color: #727cf5;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-menu {
  display: block;
}

/* Responsive adjustments for dropdown */
@media (max-width: 600px) {
  .dropdown-menu {
    position: static; /* Stack vertically on small screens */
    box-shadow: none;
    background-color: transparent;
    min-width: auto;
    width: 100%; /* Take full width of parent nav */
    padding-left: 20px; /* Indent dropdown items */
  }

  .dropdown:hover .dropdown-menu {
    display: block; /* Always show on small screens if parent is expanded */
  }

  /* Adjust the dropdown toggle for mobile */
  .dropdown-toggle {
    display: block; /* Make it behave like other nav links */
    padding: 8px 0;
  }

  .dropdown-arrow {
    border-top-color: #555; /* Ensure arrow color is visible on mobile */
  }
}
</style>

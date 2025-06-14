<template>
  <header class="app-header">

    <div class="header-content">
      <img src="/logo.png" alt="Site Logo" class="site-logo">
      <span class="site-title">ImageConvert</span>

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
  position: sticky; /* 使元素在滚动时固定 */
  top: 0; /* 固定在顶部 */
  z-index: 1000; /* 确保在其他内容之上 */
}

.header-content {
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.site-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.site-logo {
    height: 30px; /* 根据您的 Logo 大小调整高度 */
    margin-right: 10px; /* 在 Logo 和标题之间添加一些间距 */
    /* 如果 Logo 是 SVG 或需要其他样式，可以在这里添加 */
}
</style>
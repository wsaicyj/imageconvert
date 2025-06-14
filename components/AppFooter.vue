<template>
  <footer class="app-footer">
    <!-- 在这里放置底部内容，例如版权信息, 链接等 -->
    <div class="footer-content">
      <p>&copy; {{ currentYear }} ImageConvert. All rights reserved.</p>
      <!-- 您可以根据原文件添加底部链接 -->
      <!-- <div class="footer-links">
        <a href="#">隐私政策</a>
        <a href="#">服务条款</a>
      </div> -->
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
}
</script>

<style scoped>
/* 在这里复制和调整原 imageconvert.html 中底部相关的 CSS 样式 */
/* 例如： */
.app-footer {
  background-color: #f8f9fa; /* 示例颜色，请根据原文件调整 */
  padding: 20px;
  margin-top: 30px; /* 示例顶部间距 */
  border-top: 1px solid #e9ecef; /* 示例顶部边框 */
  text-align: center;
  color: #6c757d; /* 示例文字颜色 */
  font-size: 14px;
}

.footer-content {
    max-width: 800px; /* 模仿主内容区域的最大宽度 */
    width: 100%;
    margin: 0 auto; /* 居中 */
}

/* 复制和调整底部链接的样式 */
/* .footer-links a {
    margin: 0 10px;
    color: #6c757d;
    text-decoration: none;
}
.footer-links a:hover {
    color: #5a6268;
} */

/* 复制和调整响应式样式 @media */
</style>
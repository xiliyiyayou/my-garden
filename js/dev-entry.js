// 开发者入口脚本 - 添加到所有页面
(function() {
  const params = new URLSearchParams(window.location.search);
  const showDev = params.has('dev') || params.has('admin') || params.has('d');
  
  // 如果URL参数包含dev，显示开发者入口
  if (showDev) {
    // 为当前页面添加开发者入口
    addDevEntry();
    // 监听URL变化（支持hash路由或后续跳转）
    window.addEventListener('popstate', addDevEntryOnNavigate);
  }
  
  function addDevEntry() {
    const footer = document.querySelector('.footer .container');
    if (!footer) return;
    
    let devArea = document.getElementById('dev-area');
    if (!devArea) {
      devArea = document.createElement('div');
      devArea.id = 'dev-area';
      devArea.style.cssText = 'display: none; margin-top: 10px;';
      footer.appendChild(devArea);
    }
    
    devArea.innerHTML = '<a href="admin.html" style="font-size: 10px; color: var(--color-text-muted);">开发者入口</a>';
    devArea.style.display = 'block';
    sessionStorage.setItem('showDevEntry', 'true');
  }
  
  function addDevEntryOnNavigate() {
    if (sessionStorage.getItem('showDevEntry') === 'true') {
      setTimeout(addDevEntry, 100);
    }
  }
  
  // 检查sessionStorage，支持页面跳转后仍然显示
  if (sessionStorage.getItem('showDevEntry') === 'true') {
    addDevEntry();
  }
})();
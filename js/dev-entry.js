// 开发者入口脚本 - 添加到所有页面
(function() {
  // 页面加载后立即检测URL参数
  function checkAndShowDevEntry() {
    const params = new URLSearchParams(window.location.search);
    const showDev = params.has('dev') || params.has('admin') || params.has('d');
    
    if (showDev) {
      addDevEntry();
      sessionStorage.setItem('showDevEntry', 'true');
    } else if (sessionStorage.getItem('showDevEntry') === 'true') {
      addDevEntry();
    }
  }
  
  function addDevEntry() {
    const footer = document.querySelector('.footer .container');
    if (!footer) return;
    
    let devArea = document.getElementById('dev-area');
    if (!devArea) {
      devArea = document.createElement('div');
      devArea.id = 'dev-area';
      devArea.style.cssText = 'margin-top: 10px;';
      footer.appendChild(devArea);
    }
    
    devArea.innerHTML = '<a href="admin.html" style="font-size: 10px; color: var(--color-text-muted);">开发者入口</a>';
  }
  
  // 立即执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndShowDevEntry);
  } else {
    checkAndShowDevEntry();
  }
})();
// 开发者入口脚本 - 添加到所有页面
(function() {
  function addDevEntry() {
    const footer = document.querySelector('.footer .container');
    if (!footer) return;
    
    let devArea = document.getElementById('dev-area');
    if (!devArea) {
      devArea = document.createElement('div');
      devArea.id = 'dev-area';
      devArea.style.cssText = 'margin-top: 15px; text-align: center;';
      footer.appendChild(devArea);
    }
    
    devArea.innerHTML = '<a href="admin.html" style="font-size: 11px; color: #555; text-decoration: none;">管理</a>';
  }
  
  // 页面加载后立即添加入口
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDevEntry);
  } else {
    addDevEntry();
  }
})();
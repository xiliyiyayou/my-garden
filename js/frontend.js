const GardenData = {
  getLogs: () => JSON.parse(localStorage.getItem('garden_logs') || '[]'),
  getNotes: () => JSON.parse(localStorage.getItem('garden_notes') || '[]'),
  getPhotos: () => JSON.parse(localStorage.getItem('garden_photos') || '[]'),
  
  hasData: () => {
    const logs = localStorage.getItem('garden_logs');
    const notes = localStorage.getItem('garden_notes');
    const photos = localStorage.getItem('garden_photos');
    return (logs && logs !== '[]') || (notes && notes !== '[]') || (photos && photos !== '[]');
  }
};

function renderTimelineLogs() {
  const container = document.getElementById('timeline-list');
  if (!container) return;
  
  const logs = GardenData.getLogs();
  
  if (logs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>暂无记录，<a href="admin.html">登录后台</a> 添加内容</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = logs.map(log => `
    <article class="timeline-card">
      <div class="date">${log.date}</div>
      <h3>${escapeHtml(log.title)}</h3>
      <p class="excerpt">${escapeHtml(log.content)}</p>
      ${log.tags && log.tags.length ? `
        <div class="tags">
          ${log.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}
    </article>
  `).join('');
}

function renderNotesList() {
  const container = document.getElementById('notes-list-content');
  if (!container) return;
  
  const notes = GardenData.getNotes();
  
  if (notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>暂无笔记，<a href="admin.html">登录后台</a> 添加</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = notes.map(note => `
    <article class="note-card card">
      <h3>${escapeHtml(note.title)}</h3>
      <div class="note-meta">
        <span>${note.date}</span> · <span>${note.tags ? note.tags[0] : '未分类'}</span>
      </div>
      <p class="note-excerpt">${escapeHtml(note.content.substring(0, 100))}...</p>
      ${note.tags && note.tags.length ? `
        <div class="tags" style="margin-top: 12px;">
          ${note.tags.map(tag => `<span class="tag tag-blue">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}
    </article>
  `).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-content');
  if (!container) return;
  
  const photos = GardenData.getPhotos();
  
  if (photos.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>暂无照片，<a href="admin.html">登录后台</a> 上传</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = photos.map(photo => `
    <div class="gallery-item">
      <img src="${photo.src}" alt="${escapeHtml(photo.name || '')}">
    </div>
  `).join('');
  
  if (window.reinitLightbox) {
    window.reinitLightbox();
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimelineLogs();
  renderNotesList();
  renderGallery();
});
async function loadAndRender() {
  const logsContainer = document.getElementById('timeline-list');
  const notesContainer = document.getElementById('notes-list-content');
  const galleryContainer = document.getElementById('gallery-content');
  
  try {
    // 加载个人资料
    const profile = await window.supabaseApi.getProfile();
    if (profile) {
      // 首页
      const nameEl = document.getElementById('hero-name');
      const subtitleEl = document.getElementById('hero-subtitle');
      if (nameEl && profile.name) {
        nameEl.innerHTML = `你好，我是 <span>${escapeHtml(profile.name)}</span>`;
      }
      if (subtitleEl && profile.subtitle) {
        subtitleEl.textContent = profile.subtitle;
      }
      
      // 关于页
      const aboutAvatar = document.getElementById('about-avatar');
      const aboutName = document.getElementById('about-name');
      const aboutSubtitle = document.getElementById('about-subtitle');
      const aboutBio = document.getElementById('about-bio');
      const aboutLocation = document.getElementById('about-location');
      const aboutEmail = document.getElementById('about-email');
      
      if (aboutAvatar && profile.avatar) {
        aboutAvatar.src = profile.avatar;
      }
      if (aboutName && profile.name) {
        aboutName.innerHTML = `你好，我是 <span style="color: var(--color-accent);">${escapeHtml(profile.name)}</span>`;
      }
      if (aboutSubtitle && profile.subtitle) {
        aboutSubtitle.textContent = profile.subtitle;
      }
      if (aboutBio && profile.bio) {
        aboutBio.innerHTML = profile.bio.replace(/\n/g, '<br>');
      }
      if (aboutLocation && profile.location) {
        aboutLocation.textContent = profile.location;
      }
      if (aboutEmail && profile.email) {
        aboutEmail.textContent = profile.email;
      }
    }
    
    if (logsContainer) {
      const logs = await window.supabaseApi.getLogs() || [];
      if (logs.length === 0) {
        logsContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <p>暂无记录，<a href="admin.html">登录后台</a> 添加内容</p>
          </div>
        `;
      } else {
        logsContainer.innerHTML = logs.map(log => `
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
    }
    
    if (notesContainer) {
      const notes = await window.supabaseApi.getNotes() || [];
      if (notes.length === 0) {
        notesContainer.innerHTML = `
          <div class="empty-state">
            <p>暂无笔记，<a href="admin.html">登录后台</a> 添加</p>
          </div>
        `;
      } else {
        notesContainer.innerHTML = notes.map(note => `
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
    }
    
    if (galleryContainer) {
      const photos = await window.supabaseApi.getPhotos() || [];
      if (photos.length === 0) {
        galleryContainer.innerHTML = `
          <div class="empty-state">
            <p>暂无照片，<a href="admin.html">登录后台</a> 上传</p>
          </div>
        `;
      } else {
        galleryContainer.innerHTML = photos.map(photo => `
          <div class="gallery-item">
            <img src="${photo.src}" alt="${escapeHtml(photo.name || '')}">
          </div>
        `).join('');
        
        if (window.reinitLightbox) {
          window.reinitLightbox();
        }
      }
    }
  } catch (e) {
    console.error('加载数据失败', e);
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  loadAndRender();
});
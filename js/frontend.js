async function loadAndRender() {
  document.body.classList.add('loading-state');
  
  const logsContainer = document.getElementById('timeline-list');
  const notesContainer = document.getElementById('notes-list-content');
  const galleryContainer = document.getElementById('gallery-content');
  const cubeFaces = document.getElementById('cube-faces');
  
  try {
    // 加载首页3D旋转相册照片
    if (cubeFaces) {
      const photos = await window.supabaseApi.getPhotos();
      if (photos && photos.length >= 6) {
        const faces = cubeFaces.querySelectorAll('.cube-face img');
        faces[0].src = photos[0].src;
        faces[1].src = photos[1].src;
        faces[2].src = photos[2].src;
        faces[3].src = photos[3].src;
        faces[4].src = photos[4].src;
        faces[5].src = photos[5].src;
        const hint = document.getElementById('cube-hint');
        if (hint) hint.textContent = '拖动旋转 · 点击跳转相册';
      }
    }
    
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
      
      // 成长历程
      const journeyContainer = document.getElementById('journey-content');
      if (journeyContainer) {
        const journey = await window.supabaseApi.getJourney();
        if (journey && journey.length > 0) {
          journeyContainer.innerHTML = journey.map(j => `
            <div class="journey-item">
              <div class="journey-year">${escapeHtml(j.year)}</div>
              <div class="journey-content">
                <h4>${escapeHtml(j.title)}</h4>
                <p>${escapeHtml(j.description || '')}</p>
              </div>
            </div>
          `).join('');
        }
      }
    }
    
    if (logsContainer) {
      const logs = await window.supabaseApi.getLogs() || [];
      if (logs.length === 0) {
        logsContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <p>暂无记录</p>
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
            <p>暂无笔记</p>
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
            <p>暂无照片</p>
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
    
    // 移除加载状态
    document.body.classList.remove('loading-state');
    document.body.classList.add('loaded');
  } catch (e) {
    console.error('加载数据失败', e);
    document.body.classList.remove('loading-state');
    document.body.classList.add('loaded');
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
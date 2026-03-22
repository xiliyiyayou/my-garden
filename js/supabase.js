var SUPABASE_URL = 'https://gfghweunfkwetamseteb.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZ2h3ZXVuZmt3ZXRhbXNldGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTE2ODAsImV4cCI6MjA4OTcyNzY4MH0.o-V0CmBaM0lYhFi4cqigfwmunXW1XzzW0OFyIUD4fKM';

// 缓存机制 - 使用 localStorage 持久化缓存
var CACHE_DURATION = 60000; // 1分钟缓存
var cache = JSON.parse(localStorage.getItem('garden_cache') || '{}');

function saveCache() {
  try {
    localStorage.setItem('garden_cache', JSON.stringify(cache));
  } catch(e) {}
}

const supabaseApi = {
  async getLogs() {
    if (cache.logs && Date.now() - cache.logsTime < CACHE_DURATION) return cache.logs;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs?order=date.desc&limit=50`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Cache-Control': 'no-cache' }
    });
    cache.logs = await res.json();
    cache.logsTime = Date.now();
    saveCache();
    return cache.logs;
  },

  async getNotes() {
    if (cache.notes && Date.now() - cache.notesTime < CACHE_DURATION) return cache.notes;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?order=date.desc&limit=50`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Cache-Control': 'no-cache' }
    });
    cache.notes = await res.json();
    cache.notesTime = Date.now();
    saveCache();
    return cache.notes;
  },

  async getPhotos() {
    if (cache.photos && Date.now() - cache.photosTime < CACHE_DURATION) return cache.photos;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?order=date.desc&limit=100`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Cache-Control': 'no-cache' }
    });
    cache.photos = await res.json();
    cache.photosTime = Date.now();
    saveCache();
    return cache.photos;
  },

  async addLog(log) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs`, {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(log)
    });
    return res.ok;
  },

  async updateLog(id, log) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(log)
    });
    return res.ok;
  },

  async deleteLog(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.ok;
  },

  async addNote(note) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes`, {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(note)
    });
    return res.ok;
  },

  async updateNote(id, note) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(note)
    });
    return res.ok;
  },

  async deleteNote(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.ok;
  },

  async addPhoto(photo) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos`, {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(photo)
    });
    return res.ok;
  },

  async deletePhoto(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.ok;
  },

  async getProfile() {
    if (cache.profile && Date.now() - cache.profileTime < CACHE_DURATION) return cache.profile;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profile?id=eq.1`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Cache-Control': 'no-cache' }
    });
    const data = await res.json();
    cache.profile = data && data.length > 0 ? data[0] : null;
    cache.profileTime = Date.now();
    saveCache();
    return cache.profile;
  },
  
  // 清除缓存
  clearCache() {
    cache = {};
    localStorage.removeItem('garden_cache');
  },
  
  // 成长历程
  async getJourney() {
    if (cache.journey && Date.now() - cache.journeyTime < CACHE_DURATION) return cache.journey;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/journey?order=sort_order.asc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Cache-Control': 'no-cache' }
    });
    cache.journey = await res.json();
    cache.journeyTime = Date.now();
    saveCache();
    return cache.journey;
  },
  
  async addJourney(item) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/journey`, {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(item)
    });
    cache.journey = null;
    return res.ok;
  },
  
  async updateJourney(id, item) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/journey?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(item)
    });
    cache.journey = null;
    return res.ok;
  },
  
  async deleteJourney(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/journey?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    cache.journey = null;
    return res.ok;
  }
};

window.supabaseApi = supabaseApi;
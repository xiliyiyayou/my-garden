var SUPABASE_URL = 'https://gfghweunfkwetamseteb.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZ2h3ZXVuZmt3ZXRhbXNldGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTE2ODAsImV4cCI6MjA4OTcyNzY4MH0.o-V0CmBaM0lYhFi4cqigfwmunXW1XzzW0OFyIUD4fKM';

// 缓存机制
var cache = {
  logs: null,
  notes: null,
  photos: null,
  profile: null,
  timestamp: 0
};
var CACHE_DURATION = 30000; // 30秒缓存

const supabaseApi = {
  async getLogs() {
    if (cache.logs && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.logs;
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    cache.logs = await res.json();
    cache.timestamp = Date.now();
    return cache.logs;
  },

  async getNotes() {
    if (cache.notes && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.notes;
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    cache.notes = await res.json();
    cache.timestamp = Date.now();
    return cache.notes;
  },

  async getPhotos() {
    if (cache.photos && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.photos;
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    cache.photos = await res.json();
    cache.timestamp = Date.now();
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
    if (cache.profile && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.profile;
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profile?id=eq.1`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const data = await res.json();
    cache.profile = data && data.length > 0 ? data[0] : null;
    cache.timestamp = Date.now();
    return cache.profile;
  }
};

window.supabaseApi = supabaseApi;
const SUPABASE_URL = 'https://gfghweunfkwetamseteb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZ2h3ZXVuZmt3ZXRhbXNldGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTE2ODAsImV4cCI6MjA4OTcyNzY4MH0.o-V0CmBaM0lYhFi4cqigfwmunXW1XzzW0OFyIUD4fKM';

const supabaseApi = {
  async getLogs() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/logs?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.json();
  },

  async getNotes() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notes?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.json();
  },

  async getPhotos() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?order=date.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.json();
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
  }
};

window.supabaseApi = supabaseApi;
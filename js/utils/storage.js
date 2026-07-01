/* ===========================
   LOCAL STORAGE UTILITIES
   =========================== */

const StorageManager = {
  // Get item from localStorage
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },

  // Set item in localStorage
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting item in storage:', error);
      return false;
    }
  },

  // Remove item from localStorage
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing item from storage:', error);
      return false;
    }
  },

  // Clear all localStorage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  // Check if key exists
  hasItem(key) {
    return localStorage.getItem(key) !== null;
  },

  // Get all keys
  getAllKeys() {
    return Object.keys(localStorage);
  },

  // Cart operations
  getCart() {
    return this.getItem('cart') || { items: [], total: 0 };
  },

  setCart(cart) {
    return this.setItem('cart', cart);
  },

  // Wishlist operations
  getWishlist() {
    return this.getItem('wishlist') || [];
  },

  setWishlist(wishlist) {
    return this.setItem('wishlist', wishlist);
  },

  // User preferences
  getUserPreferences() {
    return this.getItem('preferences') || {
      theme: 'light',
      language: 'en',
      notifications: true
    };
  },

  setUserPreferences(preferences) {
    return this.setItem('preferences', preferences);
  },

  // User session
  getUserSession() {
    return this.getItem('userSession') || null;
  },

  setUserSession(session) {
    return this.setItem('userSession', session);
  },

  clearUserSession() {
    return this.removeItem('userSession');
  }
};

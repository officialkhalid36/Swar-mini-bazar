/* ===========================
   AUTHENTICATION MODULE
   =========================== */

const AuthModule = {
  currentUser: null,
  isAuthenticated: false,

  // Initialize auth
  init() {
    this.checkUserSession();
    this.setupAuthListeners();
  },

  // Check existing user session
  checkUserSession() {
    const session = StorageManager.getUserSession();
    if (session) {
      this.currentUser = session;
      this.isAuthenticated = true;
      this.onAuthStateChange(this.currentUser);
    }
  },

  // Login user
  async login(email, password) {
    try {
      if (!Helpers.validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!Helpers.validatePassword(password)) {
        throw new Error('Password must be at least 8 characters');
      }

      // Mock Firebase login
      const user = {
        id: Helpers.generateID(),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?img=${Math.random()}`
      };

      StorageManager.setUserSession(user);
      this.currentUser = user;
      this.isAuthenticated = true;
      this.onAuthStateChange(user);

      Helpers.showNotification('Login successful!', 'success');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      Helpers.showNotification(error.message, 'error');
      throw error;
    }
  },

  // Sign up user
  async signup(name, email, password, confirmPassword) {
    try {
      if (!name || name.trim().length === 0) {
        throw new Error('Name is required');
      }
      if (!Helpers.validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!Helpers.validatePassword(password)) {
        throw new Error('Password must be at least 8 characters');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Mock Firebase signup
      const user = {
        id: Helpers.generateID(),
        email,
        name,
        createdAt: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?img=${Math.random()}`,
        role: 'customer'
      };

      StorageManager.setUserSession(user);
      this.currentUser = user;
      this.isAuthenticated = true;
      this.onAuthStateChange(user);

      Helpers.showNotification('Account created successfully!', 'success');
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      Helpers.showNotification(error.message, 'error');
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      StorageManager.clearUserSession();
      this.currentUser = null;
      this.isAuthenticated = false;
      this.onAuthStateChange(null);
      Helpers.showNotification('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      Helpers.showNotification(error.message, 'error');
    }
  },

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  },

  // Check if authenticated
  isLoggedIn() {
    return this.isAuthenticated;
  },

  // Update user profile
  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      this.currentUser = { ...this.currentUser, ...updates };
      StorageManager.setUserSession(this.currentUser);
      Helpers.showNotification('Profile updated successfully', 'success');
      return this.currentUser;
    } catch (error) {
      console.error('Update profile error:', error);
      Helpers.showNotification(error.message, 'error');
      throw error;
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      if (!Helpers.validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      // Mock password reset
      Helpers.showNotification('Password reset link sent to your email', 'success');
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      Helpers.showNotification(error.message, 'error');
      throw error;
    }
  },

  // Setup auth listeners
  setupAuthListeners() {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'userSession') {
        this.checkUserSession();
      }
    });
  },

  // Auth state change callback
  onAuthStateChange(user) {
    const event = new CustomEvent('authStateChanged', { detail: user });
    document.dispatchEvent(event);
  }
};

// Initialize auth when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AuthModule.init());
} else {
  AuthModule.init();
}

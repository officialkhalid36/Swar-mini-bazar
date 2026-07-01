/* ===========================
   HELPER FUNCTIONS
   =========================== */

const Helpers = {
  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Format date
  formatDate(date, format = 'MM/DD/YYYY') {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  },

  // Format time
  formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  },

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate password
  validatePassword(password) {
    return password.length >= 8;
  },

  // Truncate text
  truncateText(text, length = 50) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  },

  // Generate unique ID
  generateID() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Debounce function
  debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Throttle function
  throttle(func, limit = 1000) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Get query parameter
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Show notification
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slide-in-up`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'times-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => notification.remove(), 300);
    }, duration);
  },

  // Deep clone object
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Check if object is empty
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  },

  // Merge objects
  mergeObjects(target, source) {
    return { ...target, ...source };
  },

  // Get browser info
  getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser, version;
    
    if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox';
      version = ua.substring(ua.indexOf('Firefox') + 8);
    } else if (ua.indexOf('Chrome') > -1) {
      browser = 'Chrome';
      version = ua.substring(ua.indexOf('Chrome') + 7);
    } else if (ua.indexOf('Safari') > -1) {
      browser = 'Safari';
      version = ua.substring(ua.indexOf('Version') + 8);
    }
    
    return { browser, version };
  },

  // Check if online
  isOnline() {
    return navigator.onLine;
  },

  // Get device type
  getDeviceType() {
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },

  // Capitalize string
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Remove duplicates from array
  removeDuplicates(arr) {
    return [...new Set(arr)];
  },

  // Sort array of objects
  sortByKey(arr, key, order = 'asc') {
    return arr.sort((a, b) => {
      if (order === 'desc') {
        return b[key] > a[key] ? 1 : -1;
      }
      return a[key] > b[key] ? 1 : -1;
    });
  }
};

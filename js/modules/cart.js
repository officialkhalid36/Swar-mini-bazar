/* ===========================
   SHOPPING CART MODULE
   =========================== */

const CartModule = {
  items: [],
  total: 0,
  taxRate: 0.1, // 10% tax

  // Initialize cart
  init() {
    this.loadCart();
    this.setupCartListeners();
  },

  // Load cart from storage
  loadCart() {
    const savedCart = StorageManager.getCart();
    this.items = savedCart.items || [];
    this.calculateTotal();
  },

  // Save cart to storage
  saveCart() {
    StorageManager.setCart({
      items: this.items,
      total: this.total
    });
    this.notifyCartChange();
  },

  // Add item to cart
  addItem(product, quantity = 1) {
    try {
      const existingItem = this.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity,
          addedAt: new Date().toISOString()
        });
      }

      this.calculateTotal();
      this.saveCart();
      Helpers.showNotification(`${product.name} added to cart!`, 'success');
      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      Helpers.showNotification('Failed to add item to cart', 'error');
      return false;
    }
  },

  // Remove item from cart
  removeItem(productId) {
    try {
      this.items = this.items.filter(item => item.id !== productId);
      this.calculateTotal();
      this.saveCart();
      Helpers.showNotification('Item removed from cart', 'success');
      return true;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Helpers.showNotification('Failed to remove item', 'error');
      return false;
    }
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    try {
      if (quantity <= 0) {
        return this.removeItem(productId);
      }

      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotal();
        this.saveCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  },

  // Clear cart
  clearCart() {
    try {
      this.items = [];
      this.total = 0;
      this.saveCart();
      Helpers.showNotification('Cart cleared', 'success');
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  },

  // Calculate total
  calculateTotal() {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * this.taxRate;
    this.total = subtotal + tax;
    return this.total;
  },

  // Get cart summary
  getCartSummary() {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * this.taxRate;
    const shipping = this.getShippingCost();
    const total = subtotal + tax + shipping;

    return {
      itemCount: this.items.length,
      subtotal,
      tax,
      shipping,
      total,
      items: this.items
    };
  },

  // Get shipping cost
  getShippingCost() {
    if (this.items.length === 0) return 0;
    if (this.getSubtotal() > 100) return 0; // Free shipping over $100
    return 9.99;
  },

  // Get subtotal
  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  // Get items count
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Get cart items
  getItems() {
    return this.items;
  },

  // Check if item in cart
  hasItem(productId) {
    return this.items.some(item => item.id === productId);
  },

  // Apply coupon
  applyCoupon(couponCode) {
    // Mock coupon validation
    const coupons = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'WELCOME': 0.15
    };

    if (coupons[couponCode.toUpperCase()]) {
      const discount = this.getSubtotal() * coupons[couponCode.toUpperCase()];
      Helpers.showNotification(`Coupon applied! You saved $${discount.toFixed(2)}`, 'success');
      return discount;
    }

    Helpers.showNotification('Invalid coupon code', 'error');
    return 0;
  },

  // Setup cart listeners
  setupCartListeners() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        this.loadCart();
      }
    });
  },

  // Notify cart change
  notifyCartChange() {
    const event = new CustomEvent('cartUpdated', {
      detail: this.getCartSummary()
    });
    document.dispatchEvent(event);
  }
};

// Initialize cart
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CartModule.init());
} else {
  CartModule.init();
}

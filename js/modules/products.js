/* ===========================
   PRODUCTS MODULE
   =========================== */

const ProductsModule = {
  products: [],
  filteredProducts: [],
  currentPage: 1,
  itemsPerPage: 12,

  // Initialize products
  async init() {
    await this.loadProducts();
  },

  // Load products from API/Firebase
  async loadProducts() {
    try {
      // Mock products data
      this.products = [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          originalPrice: 299.99,
          category: 'electronics',
          image: 'https://via.placeholder.com/200?text=Headphones',
          rating: 4.5,
          reviews: 128,
          inStock: true,
          description: 'High-quality wireless headphones with noise cancellation',
          tags: ['audio', 'wireless', 'premium']
        },
        {
          id: 2,
          name: 'Comfortable Running Shoes',
          price: 89.99,
          originalPrice: 129.99,
          category: 'footwear',
          image: 'https://via.placeholder.com/200?text=Shoes',
          rating: 4.8,
          reviews: 256,
          inStock: true,
          description: 'Ergonomic design for maximum comfort during workouts',
          tags: ['shoes', 'sports', 'comfort']
        },
        {
          id: 3,
          name: 'Smart Watch Pro',
          price: 299.99,
          originalPrice: 399.99,
          category: 'electronics',
          image: 'https://via.placeholder.com/200?text=SmartWatch',
          rating: 4.6,
          reviews: 189,
          inStock: true,
          description: 'Advanced fitness tracking and health monitoring',
          tags: ['smartwatch', 'fitness', 'tech']
        },
        {
          id: 4,
          name: 'Designer Backpack',
          price: 79.99,
          originalPrice: 119.99,
          category: 'bags',
          image: 'https://via.placeholder.com/200?text=Backpack',
          rating: 4.4,
          reviews: 94,
          inStock: true,
          description: 'Spacious and stylish backpack for everyday use',
          tags: ['backpack', 'travel', 'style']
        },
        {
          id: 5,
          name: 'Camera 4K',
          price: 599.99,
          originalPrice: 799.99,
          category: 'electronics',
          image: 'https://via.placeholder.com/200?text=Camera',
          rating: 4.7,
          reviews: 145,
          inStock: true,
          description: 'Professional 4K video recording capability',
          tags: ['camera', 'video', 'professional']
        },
        {
          id: 6,
          name: 'Casual T-Shirt',
          price: 29.99,
          originalPrice: 49.99,
          category: 'clothing',
          image: 'https://via.placeholder.com/200?text=TShirt',
          rating: 4.3,
          reviews: 212,
          inStock: true,
          description: 'Soft cotton t-shirt in multiple colors',
          tags: ['clothing', 'casual', 'tshirt']
        }
      ];

      this.filteredProducts = [...this.products];
      return this.products;
    } catch (error) {
      console.error('Error loading products:', error);
      Helpers.showNotification('Failed to load products', 'error');
      return [];
    }
  },

  // Get product by ID
  getProductById(id) {
    return this.products.find(product => product.id === parseInt(id));
  },

  // Search products
  searchProducts(query) {
    if (!query || query.trim() === '') {
      this.filteredProducts = [...this.products];
      return this.filteredProducts;
    }

    const lowerQuery = query.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );

    return this.filteredProducts;
  },

  // Filter by category
  filterByCategory(category) {
    if (!category || category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === category
      );
    }
    return this.filteredProducts;
  },

  // Filter by price range
  filterByPrice(minPrice, maxPrice) {
    this.filteredProducts = this.products.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );
    return this.filteredProducts;
  },

  // Filter by rating
  filterByRating(minRating) {
    this.filteredProducts = this.products.filter(
      product => product.rating >= minRating
    );
    return this.filteredProducts;
  },

  // Sort products
  sortProducts(sortBy) {
    switch (sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    return this.filteredProducts;
  },

  // Get paginated products
  getPaginatedProducts(page = 1) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  },

  // Get total pages
  getTotalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  },

  // Get flash sale products (50% discount)
  getFlashSaleProducts() {
    return this.products
      .filter(p => (p.originalPrice - p.price) / p.originalPrice >= 0.3)
      .slice(0, 8);
  },

  // Get trending products
  getTrendingProducts() {
    return this.products
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 8);
  },

  // Get best sellers
  getBestSellers() {
    return this.products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  },

  // Get categories
  getCategories() {
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.map(cat => ({
      name: cat,
      displayName: Helpers.capitalize(cat),
      icon: this.getCategoryIcon(cat)
    }));
  },

  // Get category icon
  getCategoryIcon(category) {
    const icons = {
      electronics: 'fa-laptop',
      footwear: 'fa-shoe-prints',
      bags: 'fa-backpack',
      clothing: 'fa-shirt',
      accessories: 'fa-ring'
    };
    return icons[category] || 'fa-shopping-bag';
  }
};

// Initialize products
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ProductsModule.init());
} else {
  ProductsModule.init();
}

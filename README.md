# Swar Mini Bazar - Online Shopping Platform

🛍️ A modern, responsive e-commerce web application built with vanilla JavaScript.

## Features

✨ **Core Features**
- 🏠 Home page with hero section and product showcases
- 🔍 Search and filter products by category
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist functionality
- 👤 User authentication (Login/Sign Up)
- 📦 Order management and tracking
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage (browser storage)
- **Icons**: FontAwesome 6.0
- **Architecture**: Modular JavaScript with separate modules

## Project Structure

```
swar-mini-bazar/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Styling
├── js/
│   ├── config/
│   │   └── firebase-config.js
│   ├── utils/
│   │   ├── storage.js     # LocalStorage management
│   │   ├── helpers.js     # Utility functions
│   │   └── animations.js  # Animation utilities
│   ├── modules/
│   │   ├── auth.js        # Authentication module
│   │   ├── products.js    # Products module
│   │   ├── cart.js        # Shopping cart module
│   │   ├── wishlist.js    # Wishlist module
│   │   ├── orders.js      # Orders module
│   │   └── notifications.js # Notifications module
│   └── app.js             # Main app initialization
└── README.md              # This file
```

## Modules Overview

### 🔐 Auth Module
- User registration and login
- Session management
- Profile updates
- Password reset

### 📦 Products Module
- Product listing with pagination
- Search functionality
- Category filtering
- Price range filtering
- Sorting options (popular, price, rating)

### 🛒 Cart Module
- Add/remove items
- Update quantities
- Calculate totals with tax
- Apply coupon codes
- Checkout process

### ❤️ Wishlist Module
- Add/remove items from wishlist
- Toggle wishlist status
- View all wishlist items

### 📋 Orders Module
- Create orders from cart
- Order history tracking
- Order status management
- Order cancellation

### 🔔 Notifications Module
- Toast notifications
- Multiple notification types (success, error, info, warning)
- Auto-dismiss functionality

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/officialkhalid36/Swar-mini-bazar.git
cd Swar-mini-bazar
```

2. Open `index.html` in your browser or serve it using a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## Usage

### Shopping
1. Browse products on the home page or products page
2. Use search to find specific items
3. Filter by category or sort by price/rating
4. Click "Add to Cart" to add items
5. Click heart icon to add/remove from wishlist

### Checkout
1. Click on shopping cart icon
2. Review items and quantities
3. Click "Proceed to Checkout"
4. Login or create an account
5. Review order summary and confirm

### Account Management
1. Click user icon in header
2. Login with email and password
3. View order history
4. Manage profile information

## Features in Detail

### 🎨 Theme Toggle
- Click moon icon in header to toggle between light and dark themes
- Theme preference is saved in localStorage

### 🔍 Search & Filter
- Real-time search as you type
- Filter by categories
- Sort by popularity, price, and rating

### 💳 Checkout Process
- Cart summary with tax calculation
- Free shipping on orders over $100
- Mock coupon codes: SAVE10, SAVE20, WELCOME

### 📱 Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Sample Data

The app comes with sample products for demonstration:
- Wireless Headphones
- Running Shoes
- Smart Watch Pro
- Designer Backpack
- 4K Camera
- Casual T-Shirt

## Mock Coupon Codes

- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `WELCOME` - 15% discount

## Data Persistence

All data is stored in browser's localStorage:
- User sessions
- Shopping cart
- Wishlist items
- Orders history
- User preferences (theme)

## Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] User profile with addresses
- [ ] Order tracking with real-time updates
- [ ] Admin panel for product management
- [ ] Email notifications
- [ ] Push notifications
- [ ] Social login
- [ ] Product recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, contact: support@swarbazar.com

## Author

**Khalid** - [@officialkhalid36](https://github.com/officialkhalid36)

---

**Happy Shopping! 🛍️**

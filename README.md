# HEMS - Firebase Authentication Login System

A modern, responsive login form with Firebase authentication featuring email/password sign-in, form validation, and user feedback mechanisms.

## Features

### 🔐 Authentication
- Email/password login with Firebase
- Remember me functionality
- Password reset capability
- Secure auth state persistence
- Comprehensive error handling

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout (mobile-friendly)
- Smooth animations and transitions
- Loading states and feedback
- Hover effects and focus states

### ✅ Form Validation
- Real-time input validation
- Email format verification
- Password strength requirements
- Clear error messaging
- Success confirmations

## Quick Start

1. **Setup Firebase Project**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Get your Firebase configuration

2. **Configure the App**
   - Update `firebase-config.js` with your Firebase credentials
   - See `SETUP.md` for detailed instructions

3. **Test the Application**
   - Open `index.html` in your browser
   - Create test users in Firebase Console
   - Try logging in with the credentials

## File Structure

```
/
├── index.html          # Main login page
├── styles.css          # Modern CSS styling
├── firebase-config.js  # Firebase configuration
├── auth.js            # Authentication logic
├── dashboard.html     # Sample dashboard
├── SETUP.md           # Detailed setup guide
└── README.md          # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript ES6+** - Authentication logic
- **Firebase Auth** - Backend authentication service

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Setup Instructions

For detailed setup instructions, see [SETUP.md](SETUP.md).

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
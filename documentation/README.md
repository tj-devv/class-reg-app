# 🎓 Class Registration App

A modern, React-based classroom registration system with **Firebase authentication**, email confirmations, and student management.

## ✨ Features

### 🔐 Authentication

- **Student Registration** - Create accounts with email and password
- **Student Login** - Login with email or student ID
- **Admin Login** - Secure admin access (Firebase managed)
- **Session Persistence** - Stay logged in across browser sessions
- **Secure Logout** - Clear all authentication tokens

### 🎯 Core Functionality

- Student course registration
- Email confirmation via EmailJS
- Student dashboard
- Admin management dashboard
- Dark/Light mode toggle
- Responsive mobile design
- Real-time error notifications

### 🔒 Security

- Firebase password encryption
- Email validation
- Session token management
- Automatic logout on token expiry
- HTTPS encrypted communications

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd class-reg-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Documentation

### Getting Started

- **[COMPLETE_IMPLEMENTATION_GUIDE.md](COMPLETE_IMPLEMENTATION_GUIDE.md)** - Overview of what was implemented
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Detailed Firebase setup instructions

### Testing & Deployment

- **[FIREBASE_TESTING.md](FIREBASE_TESTING.md)** - Complete testing guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-launch verification

### Technical Reference

- **[FIREBASE_CODE_EXAMPLES.md](FIREBASE_CODE_EXAMPLES.md)** - Code snippets and examples
- **[VISUAL_ARCHITECTURE_GUIDE.md](VISUAL_ARCHITECTURE_GUIDE.md)** - Architecture diagrams
- **[FIREBASE_IMPLEMENTATION_SUMMARY.md](FIREBASE_IMPLEMENTATION_SUMMARY.md)** - Technical summary

## 🔑 Key Technologies

| Technology   | Purpose        | Version |
| ------------ | -------------- | ------- |
| React        | UI Framework   | 19.2.3  |
| Vite         | Build Tool     | 7.2.4   |
| Firebase     | Authentication | 12.7.0  |
| Tailwind CSS | Styling        | 4.1.18  |
| EmailJS      | Email Service  | 4.4.1   |
| Lucide React | Icons          | 0.562.0 |

## 🏗️ Project Structure

```
src/
├── App.jsx              # Main component with auth logic
├── firebase.js          # Firebase configuration (NEW)
├── index.css            # Global styles
├── main.jsx             # App entry point
└── assets/              # Static assets

public/                  # Static files
package.json            # Dependencies
vite.config.js          # Vite configuration
eslint.config.js        # ESLint rules
```

## 🔐 Firebase Configuration

Firebase is already configured with:

- **Project**: classroom-registration-ed25d
- **Authentication**: Email/Password enabled
- **Database**: Firestore (ready for future use)

### Firebase Credentials

Credentials are in `src/firebase.js` - keep secure in production!

For production, use environment variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other credentials
```

## 🧪 Testing Authentication

### Test Student Registration

1. Click "Student Registration"
2. Fill all fields
3. Use password: at least 6 characters
4. Submit → Should see success page

### Test Student Login

1. Click "Student Login"
2. Enter email or student ID
3. Enter password
4. Click Login → Should see dashboard

### Test Session Persistence

1. Login as student
2. Refresh page (F5)
3. Should still be logged in

### Test Logout

1. Click "Logout" in sidebar
2. Should return to home
3. Refresh page - should be logged out

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 Firebase Console Access

Access your Firebase project:

- **URL**: https://console.firebase.google.com
- **Project**: classroom-registration-ed25d

View:

- **Users**: Authentication → Users
- **Database**: Firestore Database
- **Settings**: Project Settings

## 🆘 Troubleshooting

### Firebase Not Initialized?

```bash
npm install firebase
```

### Module Not Found?

Check that `src/firebase.js` exists in your src folder.

### Login Issues?

1. Check browser console for errors (F12)
2. Verify Firebase project is active
3. Create test admin account in Firebase Console

### Email Not Sending?

Verify EmailJS configuration in `src/App.jsx`

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
# Or use Netlify CLI: netlify deploy
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📊 Features Implemented

- ✅ Firebase authentication
- ✅ Student registration with email verification
- ✅ Student login with email or ID
- ✅ Admin login
- ✅ Session persistence
- ✅ Secure logout
- ✅ Error handling
- ✅ Dark/Light mode
- ✅ Responsive design
- ✅ Email notifications

## 🎯 Next Steps

1. **Test thoroughly** - Use FIREBASE_TESTING.md
2. **Create admin accounts** in Firebase Console
3. **Verify email service** - Check EmailJS setup
4. **Review security** - Move config to .env
5. **Deploy to production** - Choose a hosting provider

## 📞 Support & Resources

- **Firebase Issues**: [Firebase Docs](https://firebase.google.com/docs)
- **React Issues**: [React Community](https://react.dev/community)
- **Deployment Help**: Check deployment platform docs
- **Project Files**: See documentation markdown files

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Implementation

**Firebase Authentication Integration**: January 9, 2026

- Complete authentication system
- Firebase backend integration
- Secure session management
- Production-ready code

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Firebase SDK**: v12.7.0

**Start the app with `npm run dev` and test the authentication flows!**

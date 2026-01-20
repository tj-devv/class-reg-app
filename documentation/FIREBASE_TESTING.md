# Firebase Authentication Quick Reference

## What Changed in Your Code

### 1. **New Imports**

```javascript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
```

### 2. **Student Registration with Firebase**

When user registers, the app now:

- Creates a Firebase user with `createUserWithEmailAndPassword()`
- Stores additional student data in localStorage
- Sends confirmation email
- Sets up the user session

### 3. **Student/Admin Login with Firebase**

When user logs in, the app:

- Uses `signInWithEmailAndPassword()` to authenticate
- Retrieves user session from Firebase
- Manages local state for the dashboard

### 4. **Auto Login on Page Refresh**

The `useEffect()` hook uses `onAuthStateChanged()` to:

- Check if user is already logged in when app loads
- Automatically restore user session if valid
- Clear session if no user is authenticated

### 5. **Logout with Firebase**

When user logs out:

- Calls Firebase `signOut()` function
- Clears local state
- Returns to home page

## Testing Checklist

### ✅ Student Registration

- [ ] Go to home page
- [ ] Click "Student Registration"
- [ ] Fill all fields (password min 6 chars)
- [ ] Submit form
- [ ] Should see success page with confirmation email

### ✅ Student Login (with email)

- [ ] Click "Student Login"
- [ ] Enter email from registration
- [ ] Enter password
- [ ] Should see student dashboard

### ✅ Student Login (with ID)

- [ ] Click "Student Login"
- [ ] Enter student ID (shown on success page)
- [ ] Enter password
- [ ] Should see student dashboard

### ✅ Session Persistence

- [ ] Login as student
- [ ] Refresh browser page (F5)
- [ ] Should still be logged in
- [ ] Verify dashboard loads with user info

### ✅ Logout

- [ ] Click "Logout" in sidebar
- [ ] Should return to home
- [ ] Refresh page - should be logged out

### ✅ Error Handling

- [ ] Try registering with existing email - should show error
- [ ] Try registering with weak password - should show error
- [ ] Try login with wrong password - should show error
- [ ] Try login with non-existent email - should show error

## Admin Login Setup

### Create Test Admin Account

1. Open Firebase Console: https://console.firebase.google.com
2. Go to your project "classroom-registration-ed25d"
3. Click "Authentication" in left menu
4. Click "Users" tab
5. Click "Add User"
6. Enter: `admin@test.com` and password `Admin123`
7. Click "Create User"

### Test Admin Login

- [ ] Click "Admin Login" on home page
- [ ] Enter `admin@test.com`
- [ ] Enter `Admin123`
- [ ] Should see admin dashboard

## Troubleshooting

### Issue: "Firebase is not defined"

**Solution**: Make sure firebase is installed

```bash
npm install firebase
```

### Issue: "Cannot find module './firebase'"

**Solution**: Verify firebase.js exists in src/ folder

### Issue: Login not persisting after refresh

**Solution**: Check browser console for errors, ensure Firebase is properly initialized

### Issue: Registration email not sending

**Solution**: Check EmailJS configuration in App.jsx is correct

## Important Files

- `src/firebase.js` - Firebase initialization
- `src/App.jsx` - All authentication logic
- `package.json` - Has firebase dependency installed

## Environment Variables (Optional for Production)

For security, move Firebase config to .env file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

Then update firebase.js:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... rest of config
};
```

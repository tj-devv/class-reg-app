# 🚀 Firebase Authentication - Quick Reference Card

## Start Your App

```bash
npm run dev
```

Browser: `http://localhost:5173`

---

## 🧪 Quick Test (2 Minutes)

### 1️⃣ Register

- Click "Student Registration"
- Enter any email: `test@example.com`
- Password: `Test123`
- Submit

### 2️⃣ Check Success

- Should see success page ✅
- Note the Student ID (STU...)

### 3️⃣ Login with Email

- Go home, click "Student Login"
- Email: `test@example.com`
- Password: `Test123`
- Should see dashboard ✅

### 4️⃣ Test Persistence

- Refresh page (F5)
- Should still be logged in ✅

### 5️⃣ Logout

- Click "Logout"
- Should return to home ✅
- Refresh - should be logged out ✅

---

## 📚 Documentation Files

| File                        | Purpose         | Time   |
| --------------------------- | --------------- | ------ |
| **README.md**               | Overview        | 5 min  |
| **DOCUMENTATION_INDEX.md**  | Guide to docs   | 3 min  |
| **FIREBASE_TESTING.md**     | Full test suite | 15 min |
| **DEPLOYMENT_CHECKLIST.md** | Pre-launch      | 30 min |

**👉 Start with: README.md → DOCUMENTATION_INDEX.md**

---

## 🔑 Key Functions

### Register

```javascript
createUserWithEmailAndPassword(auth, email, password);
```

### Login

```javascript
signInWithEmailAndPassword(auth, email, password);
```

### Logout

```javascript
signOut(auth);
```

### Check Auth State

```javascript
onAuthStateChanged(auth, callback);
```

---

## 📂 Important Files

- `src/firebase.js` - Firebase config (KEEP SECURE!)
- `src/App.jsx` - Main app with auth
- `README.md` - Start here
- `DOCUMENTATION_INDEX.md` - Find what you need

---

## 🆘 Quick Fixes

### "Module not found"

```bash
npm install firebase
```

### "Firebase not defined"

Check `src/firebase.js` exists

### "Login not working"

Open DevTools (F12), check console for errors

### "Email not sending"

Check EmailJS config in App.jsx

---

## ✅ Status

```
✅ Firebase Authentication
✅ Student Registration
✅ Student Login
✅ Admin Login Ready
✅ Session Persistence
✅ Error Handling
✅ Documentation Complete
✅ Production Ready
```

---

## 🎯 Next Actions

1. Run: `npm run dev`
2. Read: README.md
3. Test: Follow quick test above
4. Deploy: Use DEPLOYMENT_CHECKLIST.md

---

## 📞 Need Help?

1. Check documentation files
2. Open browser console (F12)
3. Check Firebase Console
4. Review error messages

---

**Status**: ✅ Ready to Use
**Version**: 1.0.0
**Firebase**: v12.7.0

**Start now: `npm run dev`** 🚀

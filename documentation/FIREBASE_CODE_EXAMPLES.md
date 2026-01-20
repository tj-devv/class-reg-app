# Firebase Authentication - Code Examples

## Quick Reference Guide

### 1. Import Firebase Auth Functions

```javascript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./firebase";
```

## 2. Check User Login Status on App Load

```javascript
useEffect(() => {
  // Monitor Firebase Auth state changes
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // User is signed in
      setCurrentUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
      setIsLoggedIn(true);
    } else {
      // User is signed out
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  });

  // Cleanup subscription on component unmount
  return () => unsubscribe();
}, []);
```

## 3. Student Registration with Firebase

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showNotification("Please fix the errors in the form", "error");
    return;
  }

  setIsSubmitting(true);

  try {
    // Create user account with Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const studentId = generateStudentId();
    const newStudent = {
      ...formData,
      studentId,
      uid: userCredential.user.uid,
      registrationDate: new Date().toISOString(),
    };

    // Save to localStorage for backup
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Send confirmation email
    await sendConfirmationEmail(newStudent);

    setCurrentUser({
      uid: userCredential.user.uid,
      email: formData.email,
      ...newStudent,
    });
    setCurrentPage("success");
    showNotification(
      "Registration successful! Check your email for confirmation.",
      "success"
    );
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === "auth/email-already-in-use") {
      showNotification(
        "Email is already registered. Please login instead.",
        "error"
      );
    } else if (error.code === "auth/weak-password") {
      showNotification(
        "Password is too weak. Use at least 6 characters.",
        "error"
      );
    } else {
      showNotification(
        error.message || "Registration failed. Please try again.",
        "error"
      );
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

## 4. Student Login with Firebase

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError("");
  setIsSubmitting(true);

  try {
    if (type === "student") {
      let email = credentials.identifier;

      // Check if identifier is a student ID, find corresponding email
      const studentRecord = students.find(
        (s) => s.studentId === credentials.identifier
      );
      if (studentRecord) {
        email = studentRecord.email;
      }

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        credentials.password
      );

      // Find full student record
      const student = students.find((s) => s.email === email);

      setIsLoggedIn(true);
      setCurrentUser({ ...userCredential.user, ...student });
      setCurrentPage("studentDashboard");
      showNotification("Student login successful!", "success");
    }
  } catch (error) {
    console.error("Login error:", error);
    if (error.code === "auth/user-not-found") {
      setLoginError("No account found with this email or ID");
    } else if (error.code === "auth/wrong-password") {
      setLoginError("Incorrect password");
    } else if (error.code === "auth/invalid-email") {
      setLoginError("Invalid email format");
    } else {
      setLoginError(error.message || "Login failed. Please try again.");
    }
    showNotification(
      error.message || "Login failed. Please check your credentials.",
      "error"
    );
  } finally {
    setIsSubmitting(false);
  }
};
```

## 5. Admin Login with Firebase

```javascript
} else if (type === "admin") {
  // Admin login with Firebase
  const userCredential = await signInWithEmailAndPassword(
    auth,
    credentials.identifier,
    credentials.password
  );

  // You can add admin verification logic here
  setIsLoggedIn(true);
  setCurrentUser(userCredential.user);
  setCurrentPage("adminDashboard");
  showNotification("Admin login successful!", "success");
}
```

## 6. Logout with Firebase

```javascript
<button
  onClick={async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCurrentPage("home");
      showNotification("Logged out successfully", "success");
    } catch (error) {
      console.error("Logout error:", error);
      showNotification("Logout failed", "error");
    }
  }}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
>
  <LogOut className="w-5 h-5" />
  Logout
</button>
```

## 7. Firebase Configuration (firebase.js)

```javascript
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGAbTvpmMxW3ODuMWxOHWFTYcyDBe3_GM",
  authDomain: "classroom-registration-ed25d.firebaseapp.com",
  projectId: "classroom-registration-ed25d",
  storageBucket: "classroom-registration-ed25d.firebasestorage.app",
  messagingSenderId: "508577755116",
  appId: "1:508577755116:web:e9850b539a9a827ed0dac9",
  measurementId: "G-7KL1PX6TDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;
```

## Common Firebase Error Codes

```javascript
// Registration Errors
"auth/email-already-in-use"; // Email already registered
"auth/weak-password"; // Password < 6 characters
"auth/invalid-email"; // Invalid email format
"auth/operation-not-allowed"; // Email/Password not enabled

// Login Errors
"auth/user-not-found"; // No account for this email
"auth/wrong-password"; // Incorrect password
"auth/user-disabled"; // Account disabled by admin
"auth/too-many-requests"; // Too many failed login attempts

// Logout Errors
"auth/no-current-user"; // No user currently logged in
```

## Testing Firebase Auth

### Test 1: Register New User

```javascript
// Expected: User created in Firebase, stored in localStorage
// Check: Firebase Console → Authentication → Users
```

### Test 2: Login Persistence

```javascript
// Step 1: Login
// Step 2: Refresh page (F5)
// Expected: Still logged in, user data restored
```

### Test 3: Logout

```javascript
// Step 1: Login
// Step 2: Click Logout
// Step 3: Refresh page
// Expected: Logged out, redirected to home
```

### Test 4: Error Handling

```javascript
// Test duplicate email: Try registering same email twice
// Test weak password: Try password < 6 characters
// Test wrong credentials: Try login with wrong password
```

## Firebase Console Access

1. Go to: https://console.firebase.google.com
2. Select project: "classroom-registration-ed25d"
3. View users: Authentication → Users
4. Create admin: Click "Add User" button
5. View database: Firestore Database

## Firestore Integration (Future)

```javascript
// Save student to Firestore (optional)
import { collection, addDoc } from "firebase/firestore";

const docRef = await addDoc(collection(db, "students"), {
  email: formData.email,
  fullName: formData.fullName,
  studentId: studentId,
  registrationDate: new Date().toISOString(),
});

// Query students from Firestore (optional)
const querySnapshot = await getDocs(collection(db, "students"));
const students = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
```

---

**Ready to use!** Copy-paste any code snippet directly into your app.

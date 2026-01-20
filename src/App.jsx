import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  Users,
  BookOpen,
  Settings,
  LogOut,
  Home,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Download,
  Search,
  Filter,
} from "lucide-react";

// EmailJS configuration placeholder
const EMAILJS_SERVICE_ID = "service_ywx4e5a";
const EMAILJS_TEMPLATE_ID = "template_qszoa15";
const EMAILJS_PUBLIC_KEY = "-SrJLBF7N7IdE4b0a";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState(null); // 'student' or 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Sample courses data
  const courses = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Computer Science",
    "Art & Design",
    "Physical Education",
    "Music",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    // Load students from localStorage
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }

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

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const generateStudentId = () => {
    return "STU" + Date.now().toString().slice(-8);
  };

  const sendConfirmationEmail = async (studentData) => {
    try {
      // EmailJS implementation would go here
      // For demo purposes, we'll simulate it
      console.log("Sending email to:", studentData.email);
      console.log("Student data:", studentData);

      // Uncomment and configure when EmailJS is set up:

      const templateParams = {
        email: studentData.email,
        to_name: studentData.fullName,
        student_id: studentData.studentId,
        course: studentData.course,
        level: studentData.level,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      return true;
    } catch (error) {
      console.error("Email error:", error);
      return false;
    }
  };

  // Home/Landing Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-8 shadow-lg animate-float">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
            EduClass Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Register for your classroom courses easily and manage your
            educational journey with our modern platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-8 rounded-2xl text-center hover:border-primary hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-4 shadow-lg">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-primary">
              Easy Registration
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Quick and simple course registration process
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-2 border-secondary/20 p-8 rounded-2xl text-center hover:border-secondary hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-secondary">
              Multiple Courses
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Choose from a wide range of subjects
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 p-8 rounded-2xl text-center hover:border-accent hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-accent">
              Instant Confirmation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get email confirmation immediately
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              setUserType("student");
              setCurrentPage("register");
            }}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 min-w-[240px]"
          >
            <User className="w-5 h-5" />
            Student Registration
          </button>
          <button
            onClick={() => {
              setUserType("student");
              setCurrentPage("studentLogin");
            }}
            className="bg-gradient-to-r from-card to-secondary/20 hover:from-secondary/10 hover:to-secondary/30 text-card-foreground border-2 border-border hover:border-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 min-w-[240px]"
          >
            <User className="w-5 h-5" />
            Student Login
          </button>
          <button
            onClick={() => {
              setUserType("admin");
              setCurrentPage("adminLogin");
            }}
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 min-w-[240px]"
          >
            <Settings className="w-5 h-5" />
            Admin Login
          </button>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );

  // Student Registration Form
  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      course: "",
      level: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
      const newErrors = {};

      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.course) newErrors.course = "Please select a course";
      if (!formData.level) newErrors.level = "Please select a level";
      if (!formData.gender) newErrors.gender = "Please select gender";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

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

        // Also save to localStorage for backup
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setCurrentPage("home")}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Student Registration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.fullName ? "border-destructive" : "border-input"
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-destructive" : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? "border-destructive" : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                    placeholder="+1234567890"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Select Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.course ? "border-destructive" : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.course}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Select Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.level ? "border-destructive" : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                  >
                    <option value="">Choose a level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.level && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.level}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Gender *
                </label>
                <div className="flex gap-6">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="text-foreground">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.gender}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.dateOfBirth ? "border-destructive" : "border-input"
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                />
                {errors.dateOfBirth && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password ? "border-destructive" : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-destructive"
                        : "border-input"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary hover:via-primary hover:to-secondary text-primary-foreground py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8 animate-gradient"
              >
                {isSubmitting ? "✨ Submitting..." : "🚀 Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Login Forms (Student & Admin)
  const LoginForm = ({ type }) => {
    const [credentials, setCredentials] = useState({
      identifier: "",
      password: "",
    });
    const [loginError, setLoginError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        } else if (type === "admin") {
          // Admin login with Firebase
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.identifier,
            credentials.password
          );

          // You can add admin verification logic here
          // For now, we'll assume the user is an admin if they can sign in with admin credentials
          setIsLoggedIn(true);
          setCurrentUser(userCredential.user);
          setCurrentPage("adminDashboard");
          showNotification("Admin login successful!", "success");
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 py-12 px-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage("home")}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          <div className="bg-card border-2 border-accent/20 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 shadow-lg animate-pulse-glow">
                {type === "admin" ? (
                  <Settings className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <User className="w-10 h-10 text-primary-foreground" />
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {type === "admin" ? "Admin Login" : "Student Login"}
              </h2>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-gradient-to-r from-destructive/10 to-destructive/20 border-2 border-destructive/50 rounded-xl flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive font-medium">
                  {loginError}
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  {type === "admin" ? "Admin ID" : "Student ID or Email"}
                </label>
                <input
                  type="text"
                  value={credentials.identifier}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      identifier: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder={
                    type === "admin"
                      ? "Enter admin ID"
                      : "Enter student ID or email"
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
              >
                🔐 Login
              </button>
            </form>

            {type === "student" && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setUserType("student");
                      setCurrentPage("register");
                    }}
                    className="text-primary hover:text-secondary font-semibold transition-colors"
                  >
                    Register here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Student Login Page
  const StudentLoginPage = () => <LoginForm type="student" />;

  // Admin Login Page
  const AdminLoginPage = () => <LoginForm type="admin" />;

  // Success Page
  const SuccessPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 animate-gradient flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full mb-6 shadow-2xl animate-pulse-glow">
          <CheckCircle className="w-12 h-12 text-primary-foreground" />
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
          Registration Successful!
        </h2>
        <div className="bg-card border-2 border-accent/20 rounded-2xl p-8 mb-6 shadow-xl">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Your registration has been completed successfully. A confirmation
            email has been sent to your email address with your student ID and
            course details.
          </p>
          {currentUser && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-4 border-2 border-primary/20">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Your Student ID
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentUser.studentId}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setCurrentPage("home");
            setCurrentUser(null);
          }}
          className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );

  // Student Dashboard
  const StudentDashboard = () => {
    return (
      <div className="flex h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-card to-primary/5 border-r-2 border-primary/20 shadow-xl">
          <div className="flex items-center gap-3 p-6 border-b-2 border-primary/20">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduClass
            </span>
          </div>

          <nav className="flex-1 p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold mb-2 shadow-lg">
              <Home className="w-5 h-5" />
              Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-secondary/20 hover:to-secondary/10 hover:text-secondary-foreground transition-all duration-300 mb-2">
              <BookOpen className="w-5 h-5" />
              My Courses
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-secondary/20 hover:to-secondary/10 hover:text-secondary-foreground transition-all duration-300 mb-2">
              <Calendar className="w-5 h-5" />
              Schedule
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-secondary/20 hover:to-secondary/10 hover:text-secondary-foreground transition-all duration-300 mb-2">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>

          <div className="p-4 border-t-2 border-primary/20">
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-destructive/20 hover:to-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-card to-primary/5 border-b-2 border-primary/20 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground mb-1">
                  Welcome back, {currentUser?.fullName || "Student"}
                </h1>
                <p className="text-muted-foreground">
                  Student ID: {currentUser?.studentId || "STU12345678"}
                </p>
              </div>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Enrolled Course
                </p>
                <p className="text-2xl font-bold text-primary">
                  {currentUser?.course || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-2xl font-bold text-secondary">
                  {currentUser?.level || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Registration Date
                </p>
                <p className="text-lg font-bold text-accent">
                  {currentUser?.registrationDate
                    ? new Date(
                        currentUser.registrationDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Course Details Card */}
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">
                    {currentUser?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-foreground">
                    {currentUser?.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Gender</p>
                  <p className="font-medium text-foreground">
                    {currentUser?.gender || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Date of Birth
                  </p>
                  <p className="font-medium text-foreground">
                    {currentUser?.dateOfBirth || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin Dashboard
  const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCourse, setFilterCourse] = useState("");
    // Removed filterLevel as it's not used in the updated filter logic

    const filteredStudents = students.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = !filterCourse || student.course === filterCourse;
      // Removed level filter from here
      return matchesSearch && matchesCourse;
    });

    const exportToCSV = () => {
      const headers = [
        "Student ID",
        "Name",
        "Email",
        "Phone",
        "Course",
        "Level",
        "Gender",
        "Date of Birth",
        "Registration Date",
      ];
      const csvData = [
        headers.join(","),
        ...filteredStudents.map((s) =>
          [
            s.studentId,
            s.fullName,
            s.email,
            s.phone,
            s.course,
            s.level,
            s.gender,
            s.dateOfBirth,
            new Date(s.registrationDate).toLocaleDateString(),
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
      a.click();
      showNotification("CSV exported successfully!", "success");
    };

    return (
      <div className="flex h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        {/* Admin Sidebar */}
        <div className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-card to-accent/5 border-r-2 border-accent/20 shadow-xl">
          <div className="flex items-center gap-3 p-6 border-b-2 border-accent/20">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>

          <nav className="flex-1 p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold mb-2 shadow-lg">
              <Users className="w-5 h-5" />
              Students
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-secondary/20 hover:to-secondary/10 hover:text-secondary-foreground transition-all duration-300 mb-2">
              <BookOpen className="w-5 h-5" />
              Courses
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-secondary/20 hover:to-secondary/10 hover:text-secondary-foreground transition-all duration-300 mb-2">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>

          <div className="p-4 border-t-2 border-accent/20">
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gradient-to-r hover:from-destructive/20 hover:to-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-card to-accent/5 border-b-2 border-accent/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  Student Management
                </h1>
                <p className="text-muted-foreground">
                  Total Students: {students.length}
                </p>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="p-6">
            <div className="bg-card border-2 border-accent/20 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
                      <th className="text-left p-4 font-semibold text-foreground">
                        Student ID
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Name
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Email
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Course
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Level
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center p-8 text-muted-foreground"
                        >
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr
                          key={student.studentId}
                          className="border-b border-border hover:bg-gradient-to-r hover:from-accent/5 hover:to-primary/5 transition-all duration-300"
                        >
                          <td className="p-4 font-mono text-sm text-foreground">
                            {student.studentId}
                          </td>
                          <td className="p-4 text-foreground">
                            {student.fullName}
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {student.email}
                          </td>
                          <td className="p-4 text-foreground">
                            {student.course}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border border-secondary/30">
                              {student.level}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground text-sm">
                            {new Date(
                              student.registrationDate
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notification Toast
  // Moved to the bottom of the component and used the new animation classes
  // Removed the old NotificationToast component definition

  // Main render
  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div
            className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border-2 min-w-[300px] max-w-md ${
              notification.type === "success"
                ? "bg-gradient-to-r from-accent/90 to-primary/90 backdrop-blur-sm border-accent text-accent-foreground"
                : "bg-gradient-to-r from-destructive/90 to-destructive/70 backdrop-blur-sm border-destructive text-destructive-foreground"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {currentPage === "home" && <HomePage />}
      {currentPage === "register" && <RegistrationForm />}
      {currentPage === "success" && <SuccessPage />}
      {currentPage === "studentLogin" && <StudentLoginPage />}
      {currentPage === "studentDashboard" && <StudentDashboard />}
      {currentPage === "adminLogin" && <AdminLoginPage />}
      {currentPage === "adminDashboard" && <AdminDashboard />}

      {/* Removed the old style jsx block */}
    </div>
  );
};

export default App;

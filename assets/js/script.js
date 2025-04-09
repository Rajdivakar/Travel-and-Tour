const firebaseConfig = {
    apiKey: "AIzaSyB3IdwDDFg2LDBw5XedM4gi7sUUekqxUTk",
    authDomain: "travel-website-9154b.firebaseapp.com",
    databaseURL: "https://travel-website-9154b-default-rtdb.firebaseio.com",
    projectId: "travel-website-9154b",
    storageBucket: "travel-website-9154b.firebasestorage.app",
    messagingSenderId: "97663824093",
    appId: "YOUR_APP_I1:97663824093:web:4a91b47db66843184f2b34"
  };
  
  // 🔹 Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  //  Mobile Navigation Toggle
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbar = document.querySelector(".navbar");
  
  navToggleBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("open");
  });
  
  // Sticky Header on Scroll
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
  
  // Scroll-to-Top Button
  const goTopBtn = document.querySelector("[data-go-top]");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      goTopBtn.classList.add("show");
    } else {
      goTopBtn.classList.remove("show");
    }
  });
  
  //  Newsletter Subscription (Saves email to Firebase)
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      let emailInput = document.querySelector(".newsletter-input");
      let email = emailInput.value.trim();
  
      if (email === "") {
        alert("Please enter a valid email.");
        return;
      }
  
      database.ref("subscribers").push({ email: email, timestamp: new Date().toISOString() });
  
      alert("Thank you for subscribing!");
      emailInput.value = ""; // Clear input after submission
    });
  }
  
  //  Contact Form Submission (Saves data to Firebase)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let message = document.getElementById("message").value.trim();
  
      if (name === "" || email === "" || message === "") {
        alert("All fields are required!");
        return;
      }
  
      database.ref("messages").push({
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      });
  
      alert("Message sent successfully!");
      contactForm.reset(); // Clear the form
    });
  }

  // 🔹 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🚀 Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get user input
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    // Validate input
    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    // Firebase Login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            alert("Login successful! Welcome " + user.email);
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});
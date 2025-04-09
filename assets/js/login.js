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
  const auth = firebase.auth();
  const database = firebase.database(); // Reference to Firebase database
  
  // 🚀 Login Form Submission
  document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();
  
      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;
      let messageBox = document.getElementById("loginMessage");
  
      if (email === "" || password === "") {
          messageBox.style.color = "red";
          messageBox.innerText = "Please enter both email and password.";
          return;
      }
  
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              let user = userCredential.user;
              
              // Store login details in Firebase Database
              database.ref("logins/" + user.uid).set({
                  email: user.email,
                  loginTime: new Date().toISOString()
              });
  
              // Show success message
              messageBox.style.color = "green";
              messageBox.innerText = "Login successful! Redirecting...";
  
              // Redirect to dashboard after 2 seconds
              setTimeout(() => {
                  window.location.href = "dashboard.html"; 
              }, 2000);
          })
          .catch((error) => {
              messageBox.style.color = "red";
              messageBox.innerText = "Login failed: " + error.message;
          });
  });
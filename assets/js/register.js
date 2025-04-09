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
  
  // 🚀 Registration Form Submission
  document.querySelector(".submit-btn").addEventListener("click", function(event) {
      event.preventDefault();
  
      let fullName = document.getElementById("fullName").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      let confirmPassword = document.getElementById("confirmPassword").value.trim();
  
      let messageBox = document.createElement("p");
      messageBox.style.textAlign = "center";
  
      if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
          messageBox.style.color = "red";
          messageBox.innerText = "All fields are required!";
          document.querySelector(".form-container").appendChild(messageBox);
          return;
      }
  
      if (password !== confirmPassword) {
          messageBox.style.color = "red";
          messageBox.innerText = "Passwords do not match!";
          document.querySelector(".form-container").appendChild(messageBox);
          return;
      }
  
      // Firebase Registration
      auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              let user = userCredential.user;
  
              // Store user details in Firebase Database
              database.ref("users/" + user.uid).set({
                  fullName: fullName,
                  email: email,
                  createdAt: new Date().toISOString()
              });
  
              // Show success message
              messageBox.style.color = "green";
              messageBox.innerText = "Registration successful! Redirecting...";
              document.querySelector(".form-container").appendChild(messageBox);
  
              // Redirect to login page after 2 seconds
              setTimeout(() => {
                  window.location.href = "login.html";
              }, 2000);
          })
          .catch((error) => {
              messageBox.style.color = "red";
              messageBox.innerText = "Registration failed: " + error.message;
              document.querySelector(".form-container").appendChild(messageBox);
          });
  });
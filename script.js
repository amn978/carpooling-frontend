document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://your-app-name.up.railway.app"; // Change this to your deployed URL when needed

  // Registration
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      try {
        const res = await fetch(`${API_BASE_URL}/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        document.getElementById("message").innerText =
          res.ok ? "Registration successful! Please log in." : `Error: ${data.message || "Try again"}`;
      } catch (error) {
        document.getElementById("message").innerText = "Server error. Please try again later.";
      }
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const credentials = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };

      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("token", data.token); // Save JWT token
          document.getElementById("loginMessage").innerText = "Login successful!";
          setTimeout(() => {
            window.location.href = "ride.html"; // Redirect to ride page after login
          }, 1000);
        } else {
          document.getElementById("loginMessage").innerText = data.message || "Login failed";
        }
      } catch (error) {
        document.getElementById("loginMessage").innerText = "Server error. Please try again later.";
      }
    });
  }

  // Protected Request Example (e.g., creating a ride)
  const createRideBtn = document.getElementById("createRideBtn");
  if (createRideBtn) {
    createRideBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
      }

      const ride = {
        source: document.getElementById("source").value,
        destination: document.getElementById("destination").value,
        date: document.getElementById("date").value,
      };

      try {
        const res = await fetch(`${API_BASE_URL}/rides/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ride),
        });

        const data = await res.json();
        alert(res.ok ? "Ride created!" : `Failed: ${data.message}`);
      } catch (error) {
        alert("Server error while creating ride.");
      }
    });
  }
});

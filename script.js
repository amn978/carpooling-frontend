// script.js
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://your-backend-url.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // JWT storage
      window.location.href = "ride.html"; // Redirect on success
    } else {
      alert("Login failed. Check credentials.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
});

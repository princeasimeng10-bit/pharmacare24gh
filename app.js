document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  // 1️⃣ Collect form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // 2️⃣ Send to Google Apps Script Web App
  fetch("https://script.google.com/macros/s/AKfycbyLEaww4MxR4pYSWPUyUFnW00n1w0EZbGDKDzpXqNWwfd_m97KNsweh9FRCsc47d1yMKQ/exec", {  // <-- REPLACE this with your actual URL
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json()) // Expect JSON response
  .then(result => {
    if (result.status === "success") {
      alert("Request submitted successfully!");
      this.reset(); // clear the form
    } else {
      alert("Submission failed: Unexpected response");
      console.log("Server response:", result);
    }
  })
  .catch(error => {
    alert("Submission failed: Check console for details");
    console.error("Error sending form data:", error);
  });
});

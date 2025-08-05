const scriptURL = 'https://script.google.com/macros/s/AKfycbzf2C-_XSfJVg7zDrX6fKWB3cpOFV91mtNszJQOVNO4BfppNB6fZ3oz2BcUVt-yob0Y/exec';

document.getElementById("tshirtForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  // Show QR section
  document.getElementById("qrSection").style.display = "block";

  // Generate UPI QR (₹1)
  const upiUrl = `upi://pay?pa=shrinidhikulal25@oksbi&pn=ShrinidhiKulal&am=1&cu=INR`;
  QRCode.toCanvas(document.getElementById("upiQR"), upiUrl, function (error) {
    if (error) console.error(error);
  });

  // Ask user to confirm after payment
  if (confirm("Please confirm you completed the payment.")) {
    // Send to Google Sheet
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ name, gender, size }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.text();
      alert("Submission successful!");
    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed.");
    }
  }
});

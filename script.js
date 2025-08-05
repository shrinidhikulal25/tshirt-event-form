document.getElementById('tshirtForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const size = document.getElementById('size').value;

  // Show QR section
  document.getElementById('qrSection').style.display = 'block';

  // Generate UPI QR code
  const upiLink = `upi://pay?pa=shrinidhikulal25@oksbi&pn=Shrinidhi+Kulal&am=1&cu=INR`;
  QRCode.toCanvas(document.getElementById('upiQR'), upiLink, function (error) {
    if (error) console.error(error);
  });

  // Confirm payment
  setTimeout(() => {
    if (confirm("Please confirm you completed the payment.")) {
      fetch("https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec", {
        method: "POST",
        body: JSON.stringify({ name, gender, size }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.text())
      .then((msg) => {
        alert("✅ " + msg);
        document.getElementById('tshirtForm').reset();
      })
      .catch((err) => alert("❌ Error: " + err));
    }
  }, 3000);
});

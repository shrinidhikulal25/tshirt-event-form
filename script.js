const scriptURL = 'https://script.google.com/macros/s/AKfycbzFG9oLcC_NTVQX9ahbCB3_OSkTRDCPAGqCRtf4gwR4NUghTxrLXO3PEx-VXLJ3W4G_/exec';

document.getElementById("tshirtForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  // Show QR and generate UPI link
  document.getElementById("qrSection").style.display = "block";
  const upiUrl = `upi://pay?pa=shrinidhikulal25@oksbi&pn=ShrinidhiKulal&am=1&cu=INR`;

  QRCode.toCanvas(document.getElementById("upiQR"), upiUrl, function (error) {
    if (error) console.error(error);
  });

  const confirmPayment = confirm("Please confirm you completed the payment.");

  if (confirmPayment) {
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gender, size })
      });

      const result = await response.text();
      alert("Form submitted successfully: " + result);
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  }
});

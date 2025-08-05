
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tshirtForm");
  const qrSection = document.getElementById("qrSection");
  const qrCodeContainer = document.getElementById("qrCode");
  const upiQRContainer = document.getElementById("upiQR");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzf2C-_XSfJVg7zDrX6fKWB3cpOFV91mtNszJQOVNO4BfppNB6fZ3oz2BcUVt-yob0Y/exec"; // replace with your Apps Script web app URL
  const UPI_ID = "shrinidhikulal25@oksbi"; // replace with your real UPI ID
  const AMOUNT = "200"; // replace with your amount

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const size = document.getElementById("size").value;

    // Save to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ name, gender, size }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => console.log("Submitted to sheet."));

    const userData = JSON.stringify({ name, gender, size });

    QRCode.toCanvas(userData, { width: 200 }, (err, canvas) => {
      qrCodeContainer.innerHTML = "";
      qrCodeContainer.appendChild(canvas);
    });

    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=TShirtEvent&am=${AMOUNT}&cu=INR`;
    QRCode.toCanvas(upiUrl, { width: 200 }, (err, canvas) => {
      upiQRContainer.innerHTML = "";
      upiQRContainer.appendChild(canvas);
    });

    qrSection.style.display = "block";
  });
});

document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;

  // Payment simulation: Ask before proceeding
  if (confirm("Have you completed the payment?")) {
    const formData = new FormData(form);
    formData.append("payment", "Paid");

    fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
      method: "POST",
      body: formData
    })
      .then((res) => res.text())
      .then((data) => {
        alert("Submission successful!");

        // Generate QR code with user details
        const name = form.name.value;
        const gender = form.gender.value;
        const size = form.size.value;
        const qrData = `Name: ${name}\nGender: ${gender}\nSize: ${size}\nPayment: Paid`;

        QRCode.toCanvas(document.getElementById("qrCode"), qrData, function (error) {
          if (error) console.error(error);
        });

        // Show QR section and fake UPI QR code
        document.getElementById("qrSection").style.display = "block";
        document.getElementById("upiQR").innerHTML = `
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/BHIM_UPI_Logo.svg/320px-BHIM_UPI_Logo.svg.png" alt="UPI QR" width="200">
          <p>UPI ID: example@upi</p>
        `;

        form.reset();
      })
      .catch((err) => {
        alert("Failed to submit. Try again.");
        console.error(err);
      });
  } else {
    alert("Please complete the payment first.");
  }
});

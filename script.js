document.getElementById("tshirtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;

  // Show payment step first
  if (confirm("Please confirm you completed the payment.")) {
    // After user confirms payment
    const formData = new FormData(form);
    formData.append("payment", "Paid"); // Add payment status

    fetch("https://script.google.com/macros/s/AKfycbzf2C-_XSfJVg7zDrX6fKWB3cpOFV91mtNszJQOVNO4BfppNB6fZ3oz2BcUVt-yob0Y/exec", {
      method: "POST",
      body: formData
    })
      .then((res) => res.text())
      .then((data) => {
        alert("Your response has been recorded!");
        form.reset();
      })
      .catch((error) => {
        alert("Something went wrong!");
        console.error(error);
      });
  } else {
    alert("Please make the payment to proceed.");
  }
});

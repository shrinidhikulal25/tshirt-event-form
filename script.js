// Replace with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzf2C-_XSfJVg7zDrX6fKWB3cpOFV91mtNszJQOVNO4BfppNB6fZ3oz2BcUVt-yob0Y/exec';

const form = document.getElementById('tshirtForm');
const qrSection = document.getElementById('qrSection');
const qrCodeDiv = document.getElementById('qrCode');
const upiQRDiv = document.getElementById('upiQR');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const size = document.getElementById('size').value;

  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      // Show QR Section after successful submission
      qrSection.style.display = 'block';

      // QR Code for user details
      const userDetails = `Name: ${name}\nGender: ${gender}\nSize: ${size}`;
      QRCode.toCanvas(document.createElement('canvas'), userDetails, function (err, canvas) {
        if (!err) {
          qrCodeDiv.innerHTML = ''; // clear
          qrCodeDiv.appendChild(canvas);
        }
      });

      // UPI QR with ₹1 fixed
      const upiLink = `upi://pay?pa=shrinidhikulal25@oksbi&pn=TShirtEvent&am=1&cu=INR`;

      QRCode.toDataURL(upiLink, function (err, url) {
        if (!err) {
          upiQRDiv.innerHTML = `
            <p>Scan this to pay ₹1:</p>
            <img src="${url}" width="200" />
            <p>Or use UPI ID: <strong>shrinidhikulal25@oksbi</strong></p>
            <p><a href="${upiLink}" target="_blank">Click to pay via UPI App</a></p>
          `;
        }
      });

      form.reset(); // clear form
    })
    .catch(error => {
      alert('Error submitting form!');
      console.error('Error!', error.message);
    });
});

let currentMethod = '';

function openOtpModal(method) {
    currentMethod = method;
    const modal = document.getElementById('otp-modal');
    const otpInput = document.getElementById('otp-input');
    const modalText = document.getElementById('modal-text');

    // SABSE IMPORTANT: Naya modal khulne par purana value clear karna
    if (otpInput) {
        otpInput.value = ''; 
    }

    if (method === 'email') {
        modalText.innerText = "We have sent a 6-digit verification code to your email. Enter that code here.";
    } else if (method === 'phone') {
        modalText.innerText = "We have sent an OTP to your phone. Enter that OTP here.";
    }

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('otp-modal');
    modal.style.display = "none";
}

function submitOtp() {
    const otpValue = document.getElementById('otp-input').value;
    
    if (otpValue.length === 6) {
        alert(currentMethod + " verified successfully!");
        closeModal();
        // Yahan aapka baki ka calling logic aayega
    } else {
        alert("Please enter a valid 6-digit code.");
    }
}

// Window click par modal band karne ke liye
window.onclick = function(event) {
    const modal = document.getElementById('otp-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

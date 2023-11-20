const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    sound.src = "";sound.load();
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            
// Find the first phonetic entry with a non-empty 'audio' field
const audioEntry = data[0].phonetics.find(phonetic => phonetic.audio);

// Set the audio source only if a valid audio URL is found
if (audioEntry && audioEntry.audio) {
    sound.setAttribute("src", audioEntry.audio);
    document.getElementById("sound").style.display = "block";
} else {
    document.getElementById("sound").style.display = "none";
    console.log("No audio available for this word.");
}

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    if (sound.src && sound.src !== "") {
        sound.play().catch(e => {
            console.error("Error playing sound:", e);
            // Optionally, alert the user or show an error message
        });
    } else {
        console.log("Setting audio source to:", audioUrl);if (audioUrl && audioUrl !== "") {    sound.setAttribute("src", audioUrl);    console.log("Audio source set. Attempting to play...");} else {    console.log("No valid audio URL provided.");}
}};
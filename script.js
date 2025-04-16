const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rateInput = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");
const speakBtn = document.getElementById("speak-btn");

let voices = [];

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = populateVoices;

speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateInput.value);
  speechSynthesis.speak(utterance);
});

rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});

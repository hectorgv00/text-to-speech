class TextToSpeechApp {
  constructor() {
    // Initialize DOM elements
    this.textInput = document.getElementById("text-input");
    this.voiceSelect = document.getElementById("voice-select");
    this.rateInput = document.getElementById("rate");
    this.rateValue = document.getElementById("rate-value");
    this.speakBtn = document.getElementById("speak-btn");

    // Initialize voices array
    this.voices = [];

    // Bind event listeners
    this.speakBtn.addEventListener("click", () => this.speak());
    this.rateInput.addEventListener("input", () => this.updateRateValue());
    speechSynthesis.onvoiceschanged = () => this.populateVoices();

    // Populate voices on initialization
    this.populateVoices();
  }

  // Populate the voice selection dropdown
  populateVoices() {
    this.voices = speechSynthesis.getVoices();
    this.voiceSelect.innerHTML = "";

    // Sort voices by language
    this.voices.sort((a, b) =>
      a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0
    );

    // Group voices by language
    const languages = {};
    this.voices.forEach((voice) => {
      if (!languages[voice.lang]) {
        languages[voice.lang] = [];
      }
      languages[voice.lang].push(voice);
    });

    // Create grouped options for the dropdown
    for (const lang in languages) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = `${lang} (${this.getLanguageName(lang)})`;

      languages[lang].forEach((voice) => {
        const option = document.createElement("option");
        option.value = this.voices.indexOf(voice);
        option.textContent = `${voice.name}`;
        optgroup.appendChild(option);
      });

      this.voiceSelect.appendChild(optgroup);
    }

    // Select a default Spanish voice if available
    const spanishVoice = this.voices.find((voice) =>
      voice.lang.startsWith("es")
    );
    if (spanishVoice) {
      this.voiceSelect.value = this.voices.indexOf(spanishVoice);
    }
  }

  // Get the display name of a language from its code
  getLanguageName(langCode) {
    const langNames = new Intl.DisplayNames(["es"], { type: "language" });
    return langNames.of(langCode.split("-")[0]);
  }

  // Speak the text input using the selected voice and rate
  speak() {
    const text = this.textInput.value.trim();
    if (!text) {
      alert("Por favor ingresa algún texto para convertir a voz");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = this.voices[this.voiceSelect.value];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    utterance.rate = parseFloat(this.rateInput.value);

    // Stop any ongoing speech and start speaking
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  // Update the displayed rate value when the slider changes
  updateRateValue() {
    this.rateValue.textContent = this.rateInput.value;
  }
}

// Initialize the TextToSpeechApp
document.addEventListener("DOMContentLoaded", () => {
  new TextToSpeechApp();
});

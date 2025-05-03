# Text-to-Speech Converter

This project is a simple web application that converts user-entered text into speech using the browser's Web Speech API.

## Description

The application allows users to type text into a text area, select one of the available voices on their system (grouped by language), and adjust the speech rate. Clicking the "Play" button reads the text aloud with the selected settings.

## Features

- **Text Input:** Text area for entering the text to be converted.
- **Voice Selection:** Dropdown menu to choose from the available voices in the browser, grouped by language. It attempts to select a Spanish voice by default if available.
- **Rate Control:** Slider to adjust the speech rate (from 0.5x to 2x).
- **Playback:** Button to initiate speech synthesis.

## How to Use

1.  Clone or download this repository.
2.  Open the [`index.html`](index.html) file in a modern web browser that supports the Web Speech API (such as Chrome, Firefox, Edge, Safari).
3.  Type the text you want to hear into the text area.
4.  Select the desired voice and adjust the rate if needed.
5.  Click the "Play" button.

## Project Files

- [`index.html`](index.html): Contains the HTML structure of the application, including the text area, voice and rate selection controls, and the play button.
- [`style.css`](style.css): Defines the visual styles for the application, giving it a modern and clean look.
- [`script.js`](script.js): Contains the JavaScript logic for interacting with the Web Speech API. It includes the [`TextToSpeechApp`](script.js) class that handles initialization, populating voices, updating the UI, and the speech synthesis functionality.

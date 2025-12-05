import { guideSpeak, textToSpeech } from "./elevenService.js";
import { enableHoverReading } from "./voiceGuide.js";
enableHoverReading("button, h3, a, label,input, img");

guideSpeak("This is the extracted text. Reading now.");

const output = document.getElementById("ocr-output");

const text = localStorage.getItem("ocrText") || "No text extracted.";
output.value = text;

// for the audio 
window.addEventListener("DOMContentLoaded", () => {
    textToSpeech(text);
});

// Back button
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../index.html";
});
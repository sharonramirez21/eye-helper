import { guideSpeak } from "./elevenService.js";

let lastTextSpoken = "";
let speakCooldown = false;

export function enableHoverReading(selector = "*") {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            const text = el.getAttribute("aria-label") 
                || el.innerText 
                || el.alt 
                || el.title;

            if (!text || speakCooldown || text === lastTextSpoken) return;

            lastTextSpoken = text;
            speakCooldown = true;

            guideSpeak(text);

            setTimeout(() => {
                speakCooldown = false;
            }, 800);
        });
    });
}
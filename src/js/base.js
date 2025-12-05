import { loadHeaderFooter } from "./utils.js";
import { enableHoverReading } from "./voiceGuide.js";

loadHeaderFooter();

document.addEventListener("headerLoaded", () => {
    enableHoverReading("button, h3, a, label, input, img");
});
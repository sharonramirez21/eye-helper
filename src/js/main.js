import { ProcessImgOCR } from "./ocrService.js";
import { guideSpeak } from "./elevenService.js";
import { enableHoverReading } from "./voiceGuide.js";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

document.addEventListener("headerLoaded", () => {});

const mainContainer = document.querySelector(".main-container");

if (mainContainer) {
    guideSpeak("Welcome. Select upload image or take a photo.");

    enableHoverReading("button, h3, a, label,input, img");

    const uploadImg = document.getElementById("upload-img");
    const cameraImg = document.getElementById("camera-img");

    const uploadInput = document.getElementById("upload-input");
    const cameraInput = document.getElementById("camera-input");


    const readBtn = document.getElementById("read-btn");

    let lastSelectedFile = null;  // we save the img for the READ


    // when the user choose a photo
    uploadImg.addEventListener("click", () => {
        uploadInput.click();
    });

    // when the user take a photo
    cameraImg.addEventListener("click", () => {
        cameraInput.click();
    });

    // select a file
    uploadInput.addEventListener("change", (event) => {
        lastSelectedFile = event.target.files[0];
        const label = uploadImg.nextElementSibling;  // label de Upload
        label.textContent = "Image uploaded! ✔️";
        guideSpeak("Image uploaded successfully.");
    });

    // take a photo
    cameraInput.addEventListener("change", (event) => {
        lastSelectedFile = event.target.files[0];
        const label = cameraImg.nextElementSibling;  // label de Upload
        label.textContent = "Image uploaded! ✔️";
        guideSpeak("Image uploaded successfully.");
    });


    readBtn.addEventListener("click", async () => {
        if (!lastSelectedFile) {
            alert("Please upload or take a photo first");
            return;
        }

        readBtn.textContent = "Processing...";
        readBtn.disabled = true;
        guideSpeak("Processing image, please wait.");

        try {
            const text = await ProcessImgOCR(lastSelectedFile);
            const history = JSON.parse(localStorage.getItem("ocrHistory")) || [];

            const newEntry = {
                id: Date.now(),
                text: text,
                date: new Date().toLocaleString()
            };

            // save the note
            history.push(newEntry);
            localStorage.setItem("ocrHistory", JSON.stringify(history));
            window.location.href = "./textOCR/index.html";

        }
        catch (err) {
            alert("Error" + err.message);
        }

        finally {
            readBtn.textContent = "READ";
            readBtn.disabled = false;
        }
    });
}
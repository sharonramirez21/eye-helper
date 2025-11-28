import { ProcessImgOCR } from "./ocrService.js";

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
});

// take a photo
cameraInput.addEventListener("change", (event) => {
    lastSelectedFile = event.target.files[0];
    const label = uploadImg.nextElementSibling;  // label de Upload
    label.textContent = "Image uploaded! ✔️";
});


readBtn.addEventListener("click", async () => {
    if (!lastSelectedFile) {
        alert("Please upload or take a photo first");
        return;
    }

    readBtn.textContent = "Processing";
    readBtn.disabled = true;

    try {
        const text = await ProcessImgOCR(lastSelectedFile);

        alert("OCR result: \n\n" + text);
    }
    catch (err) {
        alert("Error" + err.message);
    }

    finally {
        readBtn.textContent = "READ";
        readBtn.disabled = false;
    }
})
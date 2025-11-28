const output = document.getElementById("ocr-output");

const text = localStorage.getItem("ocrText") || "No text extracted.";
output.value = text;

// Back button
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../index.html";
});

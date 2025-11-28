export async function ProcessImgOCR(file) {
    const apiKey = 'K81129919888957'; // my key

    const url = 'https://api.ocr.space/parse/image';
    const formData = new FormData();

    formData.append("apikey", apiKey);
    formData.append("file", file);
    formData.append("language", "eng");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.IsErroredOnProcessing) {
            throw new Error(data.ErrorMessage || "OCR processing failed");
        }

        return data.ParsedResults[0].ParsedText;
    }
    catch (err) {
        throw new Error("OCR Error: " + err.message);
    }
}

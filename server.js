import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "sk_4a4d2ecbf4150a0c6d27522e99c3a3b1a687132d2bbf94dd";

app.post("/tts", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb", // voice id
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs ERROR:", errText);
      return res.status(500).send("Error in TTS API");
    }

    const audioBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(audioBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("TTS Server running on http://localhost:3000");
});

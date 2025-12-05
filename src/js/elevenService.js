let currentAudio = null;
let hoverEnabled = true;

export async function guideSpeak(text, skipHover = true) {
  if (skipHover) hoverEnabled = false;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const response = await fetch("http://localhost:3000/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();

  if (skipHover) hoverEnabled = true;
}

export async function textToSpeech(text) {
  await guideSpeak(text);
}

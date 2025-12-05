import { loadHeaderFooter } from "./utils";
import { enableHoverReading } from "./voiceGuide";
import { guideSpeak } from "./elevenService";

loadHeaderFooter();
document.addEventListener("headerLoaded", () => {});

enableHoverReading("button, h3, a, label,input, img");
guideSpeak("History loaded. Here are your previous scans.");

const historyList = document.getElementById("history-list");
const filterDate = document.getElementById("filter-date");
const resetFilter = document.getElementById("reset-filter");

const history = JSON.parse(localStorage.getItem("ocrHistory")) || [];
let audioMap = {};


function renderHistory(list) {
    if(list.length === 0){
        historyList.innerHTML = `<p class="result-notfound">No scans found for this date.</p>`;
        return;
    }

    historyList.innerHTML = list.map(entry => `
        <div class="history-card">
            <p class="date-section"><strong>Date:</strong> ${entry.date}</p>
            <p class="text-preview">${entry.text}</p>
            <div class="btn-history">
                <button data-id="${entry.id}" class="listen-btn">Listen</button>
                <button data-id="${entry.id}" class="pause-btn">Pause</button>
            </div>
        </div>
    `).join("");
}


renderHistory(history);


filterDate.addEventListener("change", () => {
    const selectedDate = filterDate.value;
    const filteredHistory = history.filter(entry => entry.date.startsWith(selectedDate));
    renderHistory(filteredHistory);
});


resetFilter.addEventListener("click", () => {
    filterDate.value = "";
    renderHistory(history);
});


historyList.addEventListener("click", async (event) => {
    const button = event.target;
    const id = button.dataset.id;
    if(!id) return;


    if(button.classList.contains("listen-btn")) {
        const entry = history.find(e => e.id === id);
        if(!entry) return;

        if(audioMap[id]) {
            audioMap[id].pause();
            delete audioMap[id];
        }

        const audioUrl = await guideSpeak(entry.text, true);
        const audio = new Audio(audioUrl);
        audioMap[id] = audio;
        audio.play();

        button.classList.add('playing');

        audio.addEventListener('ended', () => {
            button.classList.remove('playing');
            delete audioMap[id];
        });

    } else if(button.classList.contains("pause-btn")) {
        const audio = audioMap[id];
        if(audio) {
            if(audio.paused) {
                audio.play();
                button.textContent = "Pause";
            } else {
                audio.pause();
                button.textContent = "Resume";
            }
        }
    }
});

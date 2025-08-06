// Select DOM elements
const playlistDiv = document.querySelector(".playlist");
const audio = document.getElementById("audio");
const volumeSlider = document.getElementById("volume");

let currentSongIndex = 0;

// Render all songs into the playlist
function renderPlaylist() {
  playlistDiv.innerHTML = "";

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("track");

    div.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="assets/images/${song.cover}" alt="${song.title}" style="width: 60px; height: 60px; border-radius: 10px; margin-right: 15px;">
        <div class="track-info">
          <strong>${song.title}</strong>
          <span>${song.artist}</span>
        </div>
      </div>
      <button onclick="togglePlay(${index})" class="play-btn">▶️</button>
    `;

    playlistDiv.appendChild(div);
  });
}

// Play or pause the selected song
function togglePlay(index) {
  const isSameSong = index === currentSongIndex;

  if (isSameSong && !audio.paused) {
    audio.pause();
    updateButton(index, "▶️");
  } else {
    currentSongIndex = index;
    const song = songs[index];
    audio.src = `assets/music/${song.file}`;
    audio.play();
    highlightCurrent(index);
  }
}

// Move to next song automatically
audio.addEventListener("ended", () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) currentSongIndex = 0;
  togglePlay(currentSongIndex);
});

// Highlight the current track
function highlightCurrent(index) {
  const tracks = document.querySelectorAll(".track");
  const buttons = document.querySelectorAll(".play-btn");

  tracks.forEach((track, i) => {
    if (i === index) {
      track.style.backgroundColor = "#333";
      buttons[i].textContent = "⏸️";
    } else {
      track.style.backgroundColor = "#1e1e1e";
      buttons[i].textContent = "▶️";
    }
  });
}

// Update play button
function updateButton(index, text) {
  const buttons = document.querySelectorAll(".play-btn");
  buttons[index].textContent = text;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Load the playlist when page is ready
window.addEventListener("DOMContentLoaded", () => {
  renderPlaylist();
});

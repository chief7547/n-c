const header = document.querySelector(".js-header"),
  video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range");

video.play();
video.loop = true;

const handleResetContent = () => {
  const mutedPref = localStorage.getItem("muted");
  const volumePref = localStorage.getItem("volume");
  if (mutedPref === "true") {
    range.value = "0";
  } else {
    return;
  }
};

const loadMutePreference = () => {
  const mutedPref = localStorage.getItem("muted");
  const volumePref = localStorage.getItem("volume");
  if (mutedPref !== null) {
    if (mutedPref === "true") {
      video.muted = true;
      muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    } else {
      video.muted = false;
      video.volume = volumePref;
      range.value = volumePref;
      muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    }
  } else {
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
};

const handleScroll = event => {
  const scrollHeight = Math.floor(window.scrollY);
  if (scrollHeight > 300) {
    header.classList.add("black");
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    video.pause();
  } else {
    header.classList.remove("black");
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    video.play();
  }
};

const handleMuteBtnClick = () => {
  if (video.muted) {
    const volumePref = localStorage.getItem("volume");
    video.muted = false;
    range.value = volumePref;
    video.volume = volumePref;
    muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    localStorage.setItem("muted", false);
    localStorage.setItem("volume", video.volume);
  } else {
    range.value = "0";
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    localStorage.setItem("muted", true);
  }
};

const handlePlayBtnClick = event => {
  if (video.paused) {
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    video.play();
  } else {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    video.pause();
  }
};

const handleRangeChange = event => {
  const currentVolume = event.target.value;
  video.volume = currentVolume;
  video.muted = false;
  muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  localStorage.setItem("volume", video.volume);
};
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);
range.addEventListener("change", handleRangeChange);
window.addEventListener("scroll", handleScroll);
window.addEventListener("DOMContentLoaded", handleResetContent);
loadMutePreference();

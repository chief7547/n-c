import css from "./styles.css";

const header = document.querySelector(".js-header"),
  video = document.querySelector(".js-video"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  range = document.querySelector(".js-range"),
  volume = document.querySelector(".js-volume"),
  boxes = document.querySelectorAll(".box"),
  speechBtn = document.querySelector(".js-searchBtn"),
  textBox = document.querySelector(".js-searchBox")

const boxList = Array.from(boxes);

video.autoplay = true;
video.loop = true;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speech = new window.SpeechRecognition();
speech.lang = "en";
speech.interimResults = false;

const startRecording = () => {
  speech.start();
}

const handleResults = (event) => {
  const transcript = event.results[0][0].transcript;
  textBox.value += (" " + transcript);
}

speech.addEventListener("end", startRecording);
speech.addEventListener("result", handleResults);
speechBtn.addEventListener("click", startRecording);


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
      muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg"></i>`;
    } else {
      video.muted = false;
      video.volume = volumePref;
      range.value = volumePref;
      muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    }
  } else {
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg"></i>`;
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
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg"></i>`;
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
  if (currentVolume === "0") {
    video.muted = true;
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg"></i>`;
    localStorage.setItem("muted", true);
  } else {
    video.muted = false;
    muteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    localStorage.setItem("volume", video.volume);
  }
};

const handleVolumeHover = event => {
  range.classList.add("showing");
};

const handleVolumeLeave = event => {
  range.classList.remove("showing");
};

const findAllNext = element => {
  const foundList = [];
  const findNext = element => {
    if (element !== null) {
      foundList.push(element);
      const nextElement = element.nextElementSibling;
      if (nextElement !== null) {
        findNext(nextElement);
      }
    }
  };
  findNext(element.nextElementSibling);
  return foundList;
};

const findAllprevious = element => {
  const foundList = [];
  const findPrevious = element => {
    if (element !== null) {
      foundList.push(element);
      const previousElement = element.previousElementSibling;
      if (previousElement !== null) {
        findPrevious(previousElement);
      }
    }
  };
  findPrevious(element.previousElementSibling);
  return foundList;
};

const handleBoxMouseOver = event => {
  const target = event.target;
  const nextElements = findAllNext(target);
  const previousElements = findAllprevious(target);
  nextElements.forEach(element => {
    element.classList.add("next");
  });
  previousElements.forEach(element => {
    element.classList.add("previous");
  });
};

const handleBoxMouseLeave = event => {
  const { target } = event;
  boxList.forEach(box => {
    box.classList.remove("next", "previous");
  });
};

boxList.forEach(box => {
  box.addEventListener("mouseover", handleBoxMouseOver);
  box.addEventListener("mouseleave", handleBoxMouseLeave);
});

volume.addEventListener("mouseover", handleVolumeHover);
volume.addEventListener("mouseleave", handleVolumeLeave);
muteBtn.addEventListener("click", handleMuteBtnClick);
playBtn.addEventListener("click", handlePlayBtnClick);
range.addEventListener("change", handleRangeChange);
window.addEventListener("scroll", handleScroll);
window.addEventListener("DOMContentLoaded", handleResetContent);
loadMutePreference();

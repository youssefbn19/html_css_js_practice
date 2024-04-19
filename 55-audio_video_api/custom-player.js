const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".toggle");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer .timeline .progress");

media.removeAttribute('controls');
controls.style.visibility = "visible";

play.addEventListener("click", (e) =>{
    if (play.className.includes('play') || media.paused){
        media.play();
        play.classList.replace("play", "pause");
        e.target.src = "./assets/pause.svg";
    } else {
        media.pause();
        play.classList.replace("pause", "play");
        e.target.src = "./assets/play.svg";
    }
})

stop.addEventListener('click', stopVideo)
function stopVideo(){
    media.pause();
    media.currentTime = 0;
    play.firstChild.src = "./assets/play.svg";
}

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

function mediaBackward(){
    if (media.currentTime <= 3){
        stopVideo();
    } else {
        media.currentTime -= 3;
    }
}

function mediaForward(){
    if (media.currentTime >= media.duration - 3){
        stopVideo();
    } else {
        media.currentTime += 3;
    }
}

media.addEventListener("timeupdate", setTime);
function setTime(){
    const hours = Math.floor(media.currentTime / (60 * 60))
    const minutes = Math.floor((media.currentTime - hours * 60) / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);

    const hoursValue = hours.toString().padStart(2, "0");
    const minutesValue = minutes.toString().padStart(2, "0");
    const secondsValue = seconds.toString().padStart(2, "0");

    let mediaTime;
    if (hoursValue == "00"){
        mediaTime = `${minutesValue}:${secondsValue}`;
    } else {
        mediaTime = `${hoursValue}:${minutesValue}:${secondsValue}`;
    }
    timer.textContent = mediaTime;

    let videoLength = media.duration;
    let videoCurrentTime = media.currentTime;

    timerBar.style.width = `${(videoCurrentTime / videoLength) * 100}%`;
    if (videoCurrentTime === videoLength){
        play.firstChild.src = "./assets/play.svg";
    }
    
}
const timeLine = document.querySelector('.timeline');
const timeLinePos = timeLine.getBoundingClientRect();
const timeBarWidth = timeLinePos.width;
const timeBarX = timeLinePos.x; 
timeLine.addEventListener('click', (e) => {
    let seekBarWidth = e.x - timeBarX;
    let videoLength = media.duration;

    media.currentTime = (seekBarWidth / timeBarWidth) * videoLength;
    timerBar.style.width = `${(seekBarWidth / timeBarWidth) * 100}%`;

 })


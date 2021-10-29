const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volume = player.querySelector('.player__volume');
const range = player.querySelector('.player__slider');
const videoCurrent = player.querySelector('.player__current');
const videoDuration = player.querySelector('.player__duration');
const fullscreen = player.querySelector('.player__fullscreen');
const cog = player.querySelector('.player__cog');
const speed = player.querySelector('.player__speed');
const speedrate = player.querySelectorAll('.player__speed-rate');
const speedrateDefault = player.querySelector('.player__default');


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
  toggle.innerHTML = icon;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  if(this.value == 0) {
    volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }else {
    volume.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fixTime(time) {
  var hrs = ~~(time / 3600);
  var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~ time % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}

function updateTime() {
  videoCurrent.textContent = fixTime(video.currentTime);
}

video.ontimeupdate = function() {
  updateTime();
}

function handleCog() {
  speed.classList.toggle('player__speed--active');
}

function toggleFullscreen() {
  document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
}

function handleSpeed(e) {
  speedrateDefault.classList.remove('player__default');
  speedrate.forEach(ele => ele.classList.remove('player__default'));
  e.classList.add('player__default')
  
  video.playbackRate = e.innerHTML.slice(0, 3);
}

function keyboardEventHandlers(e) {
  if (e.keyCode === 32 || e.keyCode === 75) togglePlay();
  if (e.keyCode === 70) toggleFullscreen();
}

video.addEventListener('loadedmetadata', function() {
  videoCurrent.textContent = fixTime(video.currentTime);
  videoDuration.textContent = fixTime(video.duration);
});
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

speedrate.forEach(event => event.addEventListener('click', event => handleSpeed(event.target)));
toggle.addEventListener('click', togglePlay);
cog.addEventListener('click', handleCog);
range.addEventListener('change', handleRangeUpdate);
range.addEventListener('mousemove', handleRangeUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

window.addEventListener("keydown", keyboardEventHandlers);
fullscreen.addEventListener('click', toggleFullscreen);

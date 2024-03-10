let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_img = document.querySelector(".track-img");
let artist_name = document.querySelector(".artist-name");
let playPause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement("audio");
let track_list = [
    {
        name: "Magic",
        path: "Magic-Diljit-Dosanjh.mp3",
        image: "song2.jpeg",
        Artist: "diljit dosanjh"
    },
    {
        name : "Path Beauty",
        path: "path beauty.mp3",
        image: "song5.jpeg",
        Artist: "Henry"
    },
    {
    name: "battle of the dragons",
    path: "C:\Users\LENOVO\Desktop\project\frontend\battle-of-the-dragons.mp3",
    image: "song3.jpeg",
    artist: "William "
    } 
];
function loadTrack(track_index){
   clearInterval(updateTimer) ;
   resetValues();
   curr_track.src=track_list[track_index].path;
   curr_track.load();
   track_img.style.backgroundImage = "url(" + track_list[track_index].image + ")";
   track_name.textContent = track_list[track_index].name;
artist_name.textContent = track_list[track_index].artist;
now_playing.textContent = "PLAYING" + " " + (track_index+1) + " " + "of" + " " +  track_list.length;
updateTimer = setInterval(seekUpdate, 1000);
curr_track.addEventListener("ended", nextTrack);
random_bg_color();
}
function random_bg_color() {
    let red = Math.floor(Math.random()*256) + 64;
    let green = Math.floor(Math.random()*256) + 64;
    let blue = Math.floor(Math.random()*256) + 64;
    let bgColor = "rgb(" + red + "," +blue + ", " + green + ")";
    document.body.style.background = bgColor;
}
function resetValues() {
curr_time.textContent = "00:00";
total_duration.textContent = "00:00";
seek_slider.value = 0;
}
function playPauseTrack() {
    if(!isPlaying) playTrack();
    else pauseTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    playPause_btn.innerHTML = '<i class = "fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
}
function nextTrack() {
    if(track_index<track_list.length-1)
    track_index += 1;
else track_index = 0;
loadTrack(track_index);
playTrack();
}
function previousTrack() {
    if(track_index>0)
    track_index -=1;
track_index = track_list.length-1;
loadTrack(track_index);
playTrack();
};
function seekTo() {
   let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    curr_track.volume = volume_slider.value / 100;
  }
  function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
loadTrack(track_index);
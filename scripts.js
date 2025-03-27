console.log("Welcome to MrArtist Playbox");

let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let mastersongname = document.getElementById('mastersongname');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Senorita", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Panda", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Superstar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Last Night", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Friends", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Save Your Tears", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Dream Haven", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Baby", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Die With a Smile", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Handle Play/Pause for the master play button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayPauseIcons(true);
    } else {
        audioElement.pause();
        updatePlayPauseIcons(false);
    }
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek Song Using Progress Bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Set up playlist UI
songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songName;
});

// Function to reset all play buttons
function makeAllPlay() {
    Array.from(document.getElementsByClassName('playsong')).forEach((element) => {
        element.src = 'play-solid.svg';
    });
}

// Function to update Play/Pause icons
function updatePlayPauseIcons(isPlaying) {
    masterplay.src = isPlaying ? 'pause-solid.svg' : 'play-solid.svg';
    gif.style.opacity = isPlaying ? 1 : 0;
    if (isPlaying) {
        document.getElementsByClassName('playsong')[songindex].src = 'pause-solid.svg';
    } else {
        document.getElementsByClassName('playsong')[songindex].src = 'play-solid.svg';
    }
}

// Play song from the list
Array.from(document.getElementsByClassName('playsong')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        
        if (songindex === clickedIndex && !audioElement.paused) {
            // If the clicked song is already playing, pause it
            audioElement.pause();
            updatePlayPauseIcons(false);
        } else {
            // Play the selected song
            songindex = clickedIndex;
            mastersongname.innerText = songs[songindex].songName;
            audioElement.src = songs[songindex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            makeAllPlay();
            updatePlayPauseIcons(true);
        }
    });
});

// Previous Button
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex === 0) ? songs.length - 1 : songindex - 1;
    playSong();
});

// Next Button
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex === songs.length - 1) ? 0 : songindex + 1;
    playSong();
});

// Play the current song
function playSong() {
    makeAllPlay();
    mastersongname.innerText = songs[songindex].songName;
    audioElement.src = songs[songindex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayPauseIcons(true);
}

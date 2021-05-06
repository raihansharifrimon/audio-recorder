// Verify devices permissions access

const devicesStatus = document.querySelector(".devices-status");

const snackbar = () => {
  setTimeout(() => {
    devicesStatus.classList.add("hide");
  }, 10000); // 10s before disappear
};
// Check access permissions
navigator.permissions.query({name: "microphone"}).then(function (result) {
  // console.log(result)
  if (result.state == "granted") {
    devicesStatus.innerHTML = "Devices Access Granted.";
    // Clear after 10s
    snackbar();
  } else if (result.state == "prompt") {
    devicesStatus.innerHTML = "Acept Access devices access request.";
    // Clear after 10s
    snackbar();
  } else if (result.state == "denied") {
    devicesStatus.innerHTML = "Please Enable Microphone Device.";
    // Clear after 10s
    snackbar();
  }
});

// Select buttons
const title = document.querySelector(".title");
const rec = document.querySelector(".rec");
const stop = document.querySelector(".stop");
const audioPlay = document.querySelector(".audio");
const stopwatch = document.querySelector(".stopwatch");
const recordFile = document.querySelector("#recordFile");

// Type of media to rec
let typeOfMedia = {
  audio: true,
  //, video: true
};
// Create chunks audio container
let chunks = [];
// Media options
var options = {
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
  mimeType: "audio/webm",
};
// Download counter
let counter = 0;

//
// ─── REC FUNCTION ───────────────────────────────────────────────────────────────

// RecStream init
let recStream;

const recFunction = async () => {
  try {
    // Access to computer devices
    const mediaDevices = await navigator.mediaDevices.getUserMedia(typeOfMedia);
    if (mediaDevices.active === true) {
      recStream = new MediaRecorder(mediaDevices, options);
      recStream.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recStream.state == "inactive") {
          let blob = new Blob(chunks, {type: "audio/webm"});
          // Create a Playback and pass it the blob
          createAudioElement(URL.createObjectURL(blob));
        }
      };
      recStream.start();
    }
  } catch (error) {
    if (error) console.log(error);
  }
};

// Return blob files
function createAudioElement(blobUrl) {
  const divEl = document.createElement("div");
  divEl.className = "div-audio";
  const audioEl = document.createElement("audio");
  audioEl.className = "audio";
  audioEl.controls = true;
  // Create source
  const sourceEl = document.createElement("source");
  sourceEl.src = blobUrl;
  // Audio type
  sourceEl.type = "audio/webm";
  // Append source on audio
  audioEl.appendChild(sourceEl);
  divEl.appendChild(audioEl);
  // divEl.appendChild(downloadEl)
  // Append all in the body DOM

  recordFile.appendChild(divEl);
}

// REC CLICK BUTTON EVENT LISTENER
rec.onclick = (e) => {
  rec.disabled = true;
  // Change background color
  rec.style.backgroundColor = "#e35a5a";
  // Animate rec button
  rec.classList.add("scale");
  // Enable stop button (default disabled)
  stop.disabled = false;

  stop.style.background = "#292964";
  stop.style.color = "#ffffff";
  title.style.color = "#e35a5a";

  // Start recording
  recFunction();
  // START STOPWATCH
  clearInterval(swInterval);  
  swIternal = setInterval(stopwatchFunction, 1000);
};

// STOP REC BUTTON EVENT LISTENER
stop.onclick = (e) => {
  // Enable rec button
  rec.disabled = false;
  rec.style.backgroundColor = "red";
  // Disable rec animation
  rec.classList.remove("scale");
  // Disable stop button
  stop.disabled = true;
  // Change stop color back
  stop.style.backgroundColor = "#606eb4";
  stop.style.color = "#fff";
  // Change back title color
  title.style.color = "#313142";
  // STOP and Reset STOPWATCH
  clearInterval(swIternal);
  sec = 0;
  min = 0;
  // Stop Recording
  recStream.stop();
};

// STOPWATCH
let swInterval;
let displayStopwatch;
let sec = 0;
let min = 0;
let stopwatchFunction = () => {
  sec++;
  if (sec <= 9) {
    sec = "0" + sec;
  }
  if (sec === 60) {
    sec = 0;
    min++;
    if (min <= 9) {
      min = "0" + min;
    }
  }
  if (min === 60) {
    min = 0;
  }
  displayStopwatch = "Min: " + min + " : " + "Sec: " + sec;
  // Write output to the screen
  stopwatch.innerHTML = displayStopwatch;
};

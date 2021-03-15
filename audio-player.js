class AudioPlayer extends HTMLElement {

  onTimeUpdate(evt) {
    let currentTime = evt.currentTarget.currentTime;
    let duration = evt.currentTarget.duration;

    this.updateCurrentTimeLabel();

    if (currentTime && duration) {
      let progress = parseInt(((currentTime / duration) * 100), 10);
      this.shadowRoot.querySelector('progress').value = progress;
    }
  }

  updateCurrentTimeLabel() {
    let currentTime = this.audioElement.currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    let formattedMinutes = minutes.toFixed(0).padStart(2, '0');
    let formattedSeconds = seconds.toFixed(0).padStart(2, '0');
    this.shadowRoot.querySelector('span#current').innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  }

  updateDurationLabel() {
    let duration = this.audioElement.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let formattedMinutes = minutes.toFixed(0).padStart(2, '0');
    let formattedSeconds = seconds.toFixed(0).padStart(2, '0');
    this.shadowRoot.querySelector('span#duration').innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  }

  onCanPlay() {
    this.updateDurationLabel();
  }

  onEnded() {
    console.log('ended');
    this.audioElement.currentTime = 0;
    this.shadowRoot.querySelector('img#play').src = 'images/play.svg';
  }

  onSeek(evt) {
    let time = parseFloat(evt.target.dataset.value);
    this.audioElement.currentTime += time;
  }

  onPlayPause() {
    if (this.audioElement.paused) {
      this.audioElement.play();
      this.shadowRoot.querySelector('img#play').src = 'images/pause.svg';
    }
    else {
      this.audioElement.pause();
      this.shadowRoot.querySelector('img#play').src = 'images/play.svg';
    }
  }

  constructor() {
    super();

    const _style = document.createElement('style');
    const _template = document.createElement('template');
    const source = this.getAttribute('src');
    const type = this.getAttribute('type');

    this.audioElement = null;

    _style.innerHTML = `
      :host {
        background-color: inherit;
        padding: 10px 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 15px;
        color: #000;
      }
      div#controls {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
      }
      div#time {
        margin: 0px 20px;
        font-family: sans-serif;
        font-weight: bold;
      }
      progress[value]::-webkit-progress-bar {
        background-color: #666;
      }
      progress[value]::-webkit-progress-value {
        background-color: #000;
      }
      progress[value] {
        -webkit-appearance: none;
        appearance: none;
        height: 5px;
        flex-grow: 1;
      }
      img {
        height: 45px;
        width: 45px;
        margin: 0px 6px;
      }
    `;

    _template.innerHTML = `
      <div id="controls">
        <img id="back" src="images/back5.svg" data-value="-5" />
        <img id="play" src="images/play.svg" />
        <img id="skip" src="images/skip5.svg" data-value="5" />
      </div>
      <div id="time">
        <span id="current">0:00</span> / <span id="duration">0:00</span>
      </div>
      <progress value="0" max="100"></progress>
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(_style);
    this.shadowRoot.appendChild(_template.content.cloneNode(true));

    const playPause = this.shadowRoot.querySelector('img#play');
    const seekBackward = this.shadowRoot.querySelector('img#back');
    const seekForward = this.shadowRoot.querySelector('img#skip');

    seekForward.addEventListener('click', this.onSeek.bind(this));
    seekBackward.addEventListener('click', this.onSeek.bind(this));
    playPause.addEventListener('click', this.onPlayPause.bind(this));

    fetch(source).then(response => {
      if (response.status === 200) {
        response.blob().then(blob => {
          this.audioElement = new Audio(URL.createObjectURL(blob));
          this.audioElement.type = type;
          this.audioElement.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
          this.audioElement.addEventListener('canplay', this.onCanPlay.bind(this));
          this.audioElement.addEventListener('ended', this.onEnded.bind(this));
          this.audioElement.load();
        });
      }
    });

  }
}

window.customElements.define('audio-player', AudioPlayer);
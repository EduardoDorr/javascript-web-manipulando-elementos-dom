const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const timer = document.querySelector('#timer');
const timerButton = document.querySelector('#start-pause');
const timerButtonText = document.querySelector('#start-pause span');
const timerButtonImage = document.querySelector('#start-pause img');
const musicButton = document.querySelector('#alternar-musica');
const music = new Audio('../assets/audio/luna-rise-part-one.mp3');
const timerAudioPlay = new Audio('../assets/audio/play.wav');
const timerAudioPause = new Audio('../assets/audio/pause.mp3');
const timerAudioFinished = new Audio('../assets/audio/beep.mp3');

var initialTimerSetpoint = 1500;
var intervalId = null;
var timerElapsed = 0;

configureMusicOptions();
showTimer();

buttons.forEach(button => {
  button.addEventListener('click', (button) => {
    manipulateButton(button.target);
  });
});

musicButton.addEventListener('change', () => {
  if (music.paused) {
    music.play();
  }
  else {
    music.pause();
  }
});

timerButton.addEventListener('click', toogleTimer);

function configureMusicOptions() {
  music.loop = true;
}

function showTimer() {
  const time = new Date((initialTimerSetpoint - timerElapsed) * 1000);
  const formatedTime = time.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});

  timer.innerHTML = `${formatedTime}`;
}

function manipulateButton(button) {
  const context = button.dataset.contexto;

  setButtonActive(button);

  if (context != undefined) {
    setContext(context);

    switch (context) {
      case 'foco':
        setTitleText('Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>');
        setTimerSetpoint(1500);
        break;
      case 'descanso-curto':
        setTitleText('Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>');
        setTimerSetpoint(300);
        break;
      case 'descanso-longo':
        setTitleText('Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>');
        setTimerSetpoint(900);
        break;
    }
  }
}

function setButtonActive(button) {
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  button.classList.add('active');
}

function setContext(context) {
  html.setAttribute('data-contexto', context);
  banner.setAttribute('src', `../assets/img/${context}.png`);
}

function setTitleText(text) {
  title.innerHTML = text;
}

function timerCountdown() {
  if (timerElapsed < initialTimerSetpoint) {
    timerElapsed++;
    showTimer();
  }
  else {
    timerAudioFinished.play();
    alert("Tempo Finalizado!")
    stopTimer();
  }
}

function toogleTimer() {
  if (intervalId) {
    timerAudioPause.play();
    stopTimer();
  }
  else {
    timerAudioPlay.play();
    startTimer();
  }

  timerAudioFinished.pause();
}

function startTimer() {
  timerButtonText.textContent = 'Pausar';
  timerButtonImage.setAttribute('src', '../assets/img/pause.png');
  intervalId = setInterval(timerCountdown, 1000);
}

function stopTimer() {
  timerButtonText.textContent = 'Começar';
  timerButtonImage.setAttribute('src', '../assets/img/play_arrow.png');
  timerElapsed = 0;
  showTimer();
  clearInterval(intervalId);
  intervalId = null;
}

function setTimerSetpoint(time) {
  initialTimerSetpoint = time;
  showTimer();
}
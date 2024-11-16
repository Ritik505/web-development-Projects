const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');

let progress = 0;
const interval = setInterval(() => {
  progress++;
  progressBar.value = progress;
  progressLabel.textContent = `Progress: ${progress}%`;

  if (progress >= 100) {
    clearInterval(interval);
  }
}, 100);
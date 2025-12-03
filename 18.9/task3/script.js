const progress = (timeInSeconds, progressBarId, timerId) => {
  const bar = document.getElementById(progressBarId);
  const timeLabel = document.getElementById(timerId);
  if (!bar) return;

  const duration = Math.max(timeInSeconds, 2);

  bar.style.transition = 'none';
  bar.style.transform = 'scaleX(0)';
  if (timeLabel) {
    timeLabel.textContent = '0 c';
  }

  requestAnimationFrame(() => {
    bar.style.transition = `transform ${duration}s linear`;
    bar.style.transform = 'scaleX(1)';
  });

  if (timeLabel) {
    let elapsed = 0;
    const intervalId = setInterval(() => {
      elapsed += 1;

      if (elapsed <= duration) {
        timeLabel.textContent = `${elapsed} c`;
      }

      if (elapsed >= duration) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
};

function fetchCats() {
  const time = 3;

  progress(time, 'cats-progress-bar', 'cats-timer');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['cat1.jpg', 'cat2.jpg', 'cat3.jpg']);
    }, time * 1000);
  });
}

function fetchDogs() {
  const time = 2;

  progress(time, 'dogs-progress-bar', 'dogs-timer');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['dog1.jpg', 'dog2.jpg', 'dog3.jpg']);
    }, time * 1000);
  });
}

function renderImages(containerId, urls) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  urls.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    container.appendChild(img);
  });
}

window.addEventListener('load', () => {
  fetchCats()
    .then((catUrls) => {
      renderImages('cats-images', catUrls);
      return fetchDogs();
    })
    .then((dogUrls) => {
      renderImages('dogs-images', dogUrls);
    });
});
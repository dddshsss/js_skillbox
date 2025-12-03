function getRandomDelay() {
  return 2000 + Math.random() * 3000;
}

function loadCats() {
  return new Promise((resolve) => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve(['cat1.jpg', 'cat2.jpg', 'cat3.jpg']);
    }, delay);
  });
}

function loadDogs() {
  return new Promise((resolve) => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve(['dog1.jpg', 'dog2.jpg', 'dog3.jpg']);
    }, delay);
  });
}

function createRow(urls) {
  const row = document.createElement('div');
  row.className = 'row';
  urls.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    row.appendChild(img);
  });
  return row;
}

function hideAndReturnOnce(root) {
  const rows = Array.from(root.children);
  return new Promise((resolve) => {
    setTimeout(() => {
      root.innerHTML = '';
      setTimeout(() => {
        rows.forEach((row) => root.appendChild(row));
        resolve();
      }, 2000);
    }, 2000);
  });
}

function startRandomCycle(root) {
  root.innerHTML = '';

  const catsPromise = loadCats().then((urls) => {
    const row = createRow(urls);
    root.appendChild(row);
  });

  const dogsPromise = loadDogs().then((urls) => {
    const row = createRow(urls);
    root.appendChild(row);
  });

  return Promise.all([catsPromise, dogsPromise]).then(() =>
    hideAndReturnOnce(root)
  );
}

function startDogsFirstCycle(root) {
  root.innerHTML = '';

  const dogsPromise = loadDogs().then((urls) => {
    const dogsRow = createRow(urls);
    root.appendChild(dogsRow);
  });

  const catsPromise = dogsPromise
    .then(() => loadCats())
    .then((urls) => {
      const catsRow = createRow(urls);
      root.insertBefore(catsRow, root.firstChild);
    });

  return catsPromise.then(() => hideAndReturnOnce(root));
}

window.addEventListener('load', () => {
  const root = document.getElementById('root');

  startRandomCycle(root).then(() => {
    setTimeout(() => {
      startDogsFirstCycle(root);
    }, 2000);
  });
});
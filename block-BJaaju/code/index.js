const input = document.querySelector('input');
const root = document.querySelector('.root');

let url =
  'https://api.unsplash.com/photos/?client_id=fN2RrT5BFsErXgXjqpsbGw0hPGgfMhqEI2BtI0dEOqg';

let searchURL = (query) => {
  return (
    'https://api.unsplash.com/search/photos/?&query=' +
    query +
    '&client_id=fN2RrT5BFsErXgXjqpsbGw0hPGgfMhqEI2BtI0dEOqg'
  );
};

function createUI(info) {
  info.forEach((elm) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = elm.urls.thumb;
    li.append(img);
    root.append(li);
  });
}

function fetch(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  };

  xhr.send();
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && input.value) {
    root.innerHTML = '';

    fetch(searchURL(input.value), (images) => {
      createUI(images.results);
    });

    input.value = '';
  }
});

fetch(url, createUI);

// fN2RrT5BFsErXgXjqpsbGw0hPGgfMhqEI2BtI0dEOqg

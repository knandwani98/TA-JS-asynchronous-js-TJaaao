const input = document.querySelector('input');
const root = document.querySelector('.root');

function createUI(info) {
  console.log(info.results);
  info.results.forEach((elm) => {
    let img = document.createElement(img);
    img.src = elm.urls.small;
    root.append(img);
  });
}

input.addEventListener('keyup', (event) => {
  let url =
    'https://api.unsplash.com/search/photos?&query=' +
    input.value +
    '&client_id=fN2RrT5BFsErXgXjqpsbGw0hPGgfMhqEI2BtI0dEOqg';

  if (event.keyCode === 13 && input.value) {
    root.innerHTML = '';

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
      createUI(JSON.parse(xhr.response));
    };

    xhr.send();

    input.value = '';
  }
});

// fN2RrT5BFsErXgXjqpsbGw0hPGgfMhqEI2BtI0dEOqg

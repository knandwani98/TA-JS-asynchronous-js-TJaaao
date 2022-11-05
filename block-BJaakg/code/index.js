const url = `https://www.anapioficeandfire.com/api/books`;

const header = document.querySelector('header');
const hOne = document.querySelector('h1');
const root = document.querySelector('.root');
const loader = document.querySelector('.loader');
const chartRoot = document.querySelector('.show-character');
const loaderContainer = document.querySelector('.loader-container');

function displayLoader(status = false) {
  if (status) {
    loader.innerHTML = `<div class="ripple-loader">
        <div></div>
        <div></div>
      </div>`;
    root.classList.add('hidden');
  } else {
    loaderContainer.style.display = 'none';
    root.classList.remove('hidden');
  }
}

function toggleClose(toggle = false) {
  displayLoader(true);
  if (toggle) {
    let closeBtn = document.createElement('a');
    hOne.innerText = 'All Characters';
    closeBtn.innerText = 'close';
    closeBtn.classList.add('close-btn');
    header.append(closeBtn);

    closeBtn.addEventListener('click', () => {
      init();
      chartRoot.style.display = 'none';
      root.style.display = 'flex';
      closeBtn.classList.add('hidden');
    });
  }
}

function allCharacters(data) {
  displayLoader(true);
  toggleClose(true);
  Promise.all(data.map((char) => fetch(char).then((res) => res.json())))
    .then((data) => {
      root.style.display = 'none';
      data.forEach((char) => {
        let charDiv = document.createElement('div');
        charDiv.classList.add('char-div');
        let charName = document.createElement('h2');
        let charGender = document.createElement('h3');
        let charAliasas = document.createElement('h4');
        let charSeries = document.createElement('h5');

        charName.innerText = char.name;
        charGender.innerText = char.gender;
        charAliasas.innerText = char.aliases;
        charSeries.innerText = char.tvSeries;

        charDiv.append(charName, charGender, charAliasas, charSeries);
        chartRoot.append(charDiv);
      });
    })
    .finally(displayLoader);
}

function createUI(data) {
  data.map((book) => {
    let container = document.createElement('div');
    container.classList.add('grid');
    let title = document.createElement('h2');
    let author = document.createElement('cite');
    let button = document.createElement('a');
    button.classList.add('button');

    button.addEventListener('click', () => {
      allCharacters(book.characters);
    });

    title.innerText = book.name;
    author.innerText = book.authors;
    button.innerText = `show characters (${book.characters.length})`;

    container.append(title, author, button);
    root.append(container);
  });
  return data;
}

function init() {
  displayLoader(true);
  fetch(url)
    .then((data) => data.json())
    .then(createUI)
    .finally(() => {
      displayLoader();
    });
}

init();

const root = document.querySelector('.root');
const newsRoot = document.getElementById('news-root');
const errorElm = document.querySelector('.errors');
const mainElm = document.querySelector('.main');
let allNews = [];

function displayError(msg = 'Something Went Wrong') {
  errorElm.innerText = msg;
  mainElm.style.display = 'none';
  errorElm.style.display = 'block';
}

function displayLoader(status) {
  if (status) {
    root.innerHTML = `<div class="loader"><div class="donut"></div></div>`;
  }
}

function newsCategories(data = []) {
  const allCategories = data.reduce((acc, cv) => {
    if (!acc.includes(cv.newsSite)) {
      acc.push(cv.newsSite);
    }
    return acc;
  }, []);

  allCategories.forEach((elm) => {
    const option = document.createElement('option');
    option.value = elm;
    option.innerText = elm;
    newsRoot.append(option);
  });
  return data;
}

function createUI(data = allNews) {
  root.innerHTML = '';
  data.forEach((elm) => {
    const article = document.createElement('article');
    article.classList.add('flex');
    const img = document.createElement('img');
    img.src = elm.imageUrl;
    img.alt = elm.title;
    const div = document.createElement('div');
    div.classList.add('content');
    const a = document.createElement('a');
    a.innerText = elm.newsSite;
    const h2 = document.createElement('h2');
    h2.innerText = elm.title;
    const button = document.createElement('a');
    button.classList.add('button');
    button.innerText = 'Read More';
    button.href = elm.url;
    button.target = '_blank';
    div.append(a, h2, button);
    article.append(img, div);
    root.append(article);
  });
  return data;
}

function init() {
  displayLoader(true);
  fetch('https://api.spaceflightnewsapi.net/v3/articles')
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error('Please enter valid URL');
      }
    })
    .then((data) => {
      allNews = data;
      newsCategories(data);
      createUI(data);
    })
    .catch((error) => {
      // displayError(error);
    })
    .finally(() => {
      displayLoader();
    });
}

newsRoot.addEventListener('change', (e) => {
  const site = e.target.value;
  console.log(site);

  if (site) {
    let filteredNews = allNews.filter((news) => {
      return news.newsSite === site;
    });
    createUI(filteredNews);
  } else {
    createUI(allNews);
  }
});

if (navigator.onLine) {
  init();
} else {
  displayError('Please switch to stable internet');
}

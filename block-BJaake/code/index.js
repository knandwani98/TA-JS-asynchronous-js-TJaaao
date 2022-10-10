const root = document.querySelector('.root');
const newsRoot = document.getElementById('news-root');

fetch('https://api.spaceflightnewsapi.net/v3/articles')
  .then((data) => data.json())
  .then(newsCategories)
  .then((data) => filterCategories(data))
  .then(createUI);

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

function filterCategories(data = [], value) {
  return data.filter((elm) => elm.newsSite === value);
}

function createUI(data = []) {
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
    const button = document.createElement('button');
    button.innerText = 'Read More';

    div.append(a, h2, button);
    article.append(img, div);
    root.append(article);
  });
  return data;
}

newsRoot.addEventListener('change', (e) => {
  let input = e.target.value;
  filterCategories(data, input);
});

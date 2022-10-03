const input = document.querySelector('input');
const btn = document.querySelector('.cat button');
const followingRoot = document.querySelector('.following ul');
const followersRoot = document.querySelector('.followers ul');

function createUI(data) {
  const userImg = document.querySelector('.user-img');
  const userName = document.querySelector('h2');
  const userID = document.querySelector('address');

  userImg.src = data.avatar_url;
  userName.innerText = data.name;
  userID.innerText = `@${data.login}`;
}

function follows(url, root) {
  root.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = url[i].avatar_url;
    li.append(img);
    root.append(li);
  }
}

function fetchInfo(url, callBack, root) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = () => {
    callBack(JSON.parse(xhr.response), root);
  };
  xhr.send();
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    let url = 'https://api.github.com/users/' + input.value;
    let followersURL = url + '/followers';
    let followingURL = url + '/following';

    fetchInfo(url, createUI);
    fetchInfo(followersURL, follows, followersRoot);
    fetchInfo(followingURL, follows, followingRoot);
    input.value = '';
  }
});

function catUI(url) {
  const img = document.querySelector('.cat img');
  img.src = '';
  img.src = url[0].url;
  img.alt = 'cat';
}

btn.addEventListener('click', () => {
  let url = 'https://api.thecatapi.com/v1/images/search?limit=1&size=full';
  fetchInfo(url, catUI);
});

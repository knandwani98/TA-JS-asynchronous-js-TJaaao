const input = document.querySelector('input');
const userImg = document.querySelector('.user-img');
const userName = document.querySelector('h2');
const userID = document.querySelector('address');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');

function createUI(data) {
  userImg.src = data.avatar_url;
  userName.innerText = data.name;
  userID.innerText = `@${data.login}`;

  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.append(img);
    followers.append(li);
  }
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);

    xhr.onload = () => {
      const userData = JSON.parse(xhr.response);
      createUI(userData);
      console.log(userData.followers_url);
    };

    xhr.send();
    event.target.value = '';
  }
});

// - Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

const p1 = new Promise((res, rej) => {
    setTimeout(res, 1000, 'fo');
  }),
  p2 = new Promise((res, rej) => {
    setTimeout(res, 2000, 'foo');
  }),
  p3 = new Promise((res, rej) => {
    setTimeout(res, 3000, 'fooo');
  }),
  p4 = new Promise((res, rej) => {
    setTimeout(res, 4000, 'foooo');
  });

Promise.all([p1, p2, p3, p4]).then((values) => console.log(values));

// - Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

const url = `https://api.github.com/users/`,
  userName1 = `damien-roche`,
  userName2 = `jpfinlay`,
  userName3 = `ricn`,
  userName4 = `tomaash`,
  userName5 = `nurugger07`;

Promise.all([userName1, userName2, userName3, userName4, userName5]).then(
  (arr) => {
    arr.forEach((user) =>
      fetch(url + user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.followers, data.name);
        })
    );
  }
);

// - Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

//   - https://random.dog/woof.json
//   - https://aws.random.cat/meow

const api1 = 'https://random.dog/woof.json',
  api2 = 'https://aws.random.cat/meow';

Promise.race([api1, api2]).then((res) => console.log(res));

// - Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

// ```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three]).then((res) => console.log(res));
// ```

// - What will be the output of the following code snippet? How much time will it take for the promise to resolve?

// ```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// ["Arya", "Sam", "John"] // after 1 sec
// ```

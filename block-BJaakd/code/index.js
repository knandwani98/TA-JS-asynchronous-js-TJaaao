// 1. Create a promise. Have it resolve with a value of `Promise Resolved!` in resolve after a delay of 1000ms, using `setTimeout`. Print the contents of the promise after it has been resolved by passing `console.log` to `.then`

// ```js
// Your code
let promise = new Promise((res, rej) => {
  setTimeout(() => {
    res(`Promise Resolved!`);
  }, 1000);
});

promise.then((value) => {
  console.log(value, '- after 1000 ms');
});

// ```

// 2. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch`

// ```js
// Your code
new Promise((res, rej) => {
  rej(`Rejected Promise!`);
}).catch((value) => {
  console.log(value, '- Rejected');
});
// ```

// 3. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch` and also use `.finally` to log message `Promise Settled!`.

// ```js
// // Your code
new Promise((res, rej) => {
  rej(`Rejected Promise!`);
})
  .catch((value) => {
    console.log(value, '- catch');
  })
  .finally(() => console.log('Promise Settled! - Finally'));
// ```

// 4. What will be the output of the code below.

// ```js
// console.log('A');

// // Asynchronous code finises in 0 seconds (Callback Queue)
// setTimeout(() => console.log('B'), 0); // callback queue

// // A promise that resolves right away (Microtask Queue)
// Promise.resolve().then(() => console.log('C'));

// console.log('D');

// 'A';
// 'D';
// 'C';
// 'B';

// ```

// 5. Write a function named `wait` that accepts `time` in ms returns a promise. The promise gets resolved after given time.

// ```js
// // Your code
function wait(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('Promise Resolved!');
    }, time);
  });
}
wait(1000);
// ```

// 6. Do the following:

// - Create a new promise
// - Resolve with 21
// - Use `.then` and return adding `10` to the value you will get as parameter
// - Use `.then` and return adding `100` to the value you will get as parameter
// - Use `.then` and check if the value you get is greater than `100` throw new error with any message
// - Catch the error using `.catch`

// ```js
// // Your code
new Promise((res, rej) => {
  res(21);
})
  .then((v) => v + 10)
  .then((v) => v + 100)
  .then((v) => {
    if (v > 100) {
      throw new Error('Something went wrong');
    }
  })
  .catch(console.error);
// ```

// 7. Do the following:

// - Create a new promise
// - Resolve the promise with `['A']`
// - Use `.then` and concat `B` into the parameter and return
// - Use `.then` and return and object like `{0: 'A', 1: 'B'}`
// - Use `.then` and log the value

// ```js
// // Your code
new Promise((res, rej) => {
  res(['A']);
})
  .then((val) => {
    return val.concat(`B`);
  })
  .then((arr) => {
    return arr.reduce((acc, cv, i) => {
      acc[i] = cv;
      return acc;
    }, {});
  })
  .then(console.log);
// ```

// 8. Do the following:

// - Create a new promise named `first` and resolve it with `1`
// - Use `.then` on `first` and return `2` also check the value you get access to by logging
// - Chain `.then` on above and return `3` also check the value you get access to by logging
// - Chain `.then` on above and return `4` also check the value you get access to by logging

// ```js
// // Your code
let first = new Promise((res, rej) => {
  res('1');
})
  .then((x) => {
    console.log(x, ' - first');
    return '2';
  })
  .then((x) => {
    console.log(x, ' - first');
    return '3';
  })
  .then((x) => {
    console.log(x, ' - first');
    return '4';
  });
// ```

// 9. Do the following:

// - Create a new promise named `first` and resolve it with `1`
// - Use `.then` on `first` and return `2` also check the value you get access to by logging
// - Use `.then` on `first` and return `3` also check the value you get access to by logging
// - Use `.then` on `first` and return `4` also check the value you get access to by logging

// ```js
// // Your code
let second = new Promise((res, rej) => {
  res('1');
});

second.then((x) => {
  console.log(x, ' - second');
  return '2';
});
second.then((x) => {
  console.log(x, ' - second');
  return '3';
});
second.then((x) => {
  console.log(x, ' - second');
  return '4';
});

// ```

// 10. Try to understand the difference between the problem 8 and 9. Write your observation.

// 11. Do the following

// - Create a promise and resolve it with `John`
// - Use `.then` and return another promise that resolves with `Arya`
// - Use `.then` log the value you get access to and return another promise that resolves after 2000ms with value `Bran`
// - Use `.then` to log the value

// ```js
// // Your code
new Promise((res, rej) => {
  res('John');
})
  .then(() => {
    return new Promise((res, rej) => {
      res('Arya');
    });
  })
  .then((v) => {
    console.log(v);
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('Bran');
      }, 2000);
    });
  })
  .then(console.log);
// ```

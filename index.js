const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   //inside this call back function,
//   //we want to do that HTTP request
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       // it only ever gets called in case the promise was successful.
//       //So if it's a fulfilled promise.
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('random dog image');
//       });
//     })
//     .catch((err) => {
//       //for rejected promise
//       console.log(err.message);
//     });
// });

const readFilePro = (file) => {
  //receive a filename, return a promise

  //Promise() receive an executor function
  return new Promise((resolve, reject) => {
    // this is where we actually do all this asynchronous work.
    //In this case the read file work.
    fs.readFile(file, (err, data) => {
      if (err) reject('CANT FIND');
      // whatever variable that we pass into the resolve function
      //is the result of the promise that will be available in the then handler.
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Write failed');
      resolve('successful');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  //So this result variable here will then be the resolved value of this promise
  //that returned from the previous handler, okay?
  .then((res) => {
    // it only ever gets called in case the promise was successful.
    //So if it's a fulfilled promise.
    console.log(res.body.message);

    return writeFilePro('dog-img.txt', res.body.message);
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   console.log('random dog image');
    // });
  })
  .then((data) => console.log(data))
  .catch((err) => {
    //for rejected promise
    console.log(err);
  });

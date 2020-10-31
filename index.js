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

const getDogPic = async () => {
  // async func will return a promise automatically
  //to get the res, use .then or await + IIFE
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);

    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    ); // instead of await the promise, get the resolved value, but save the promise as a variable

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    //receive an array of promise, return an array of promise with resolved value
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((res) => res.body.message);

    // console.log(res.body.message);
    // stop the code from running at this point until this Promise is resolved.
    await writeFilePro('dog-img.txt', imgs.join('\n'));

    console.log('finished');
  } catch (error) {
    console.log(error);

    throw err;
  }

  return '2: dog ready';
};

getDogPic();

// getDogPic()
//   .then((data) => console.log(data))
//   .catch(console.log('err'));

// (async () => {
//   try {
//     const data = await getDogPic();
//     console.log(data);
//   } catch (error) {
//     console.log('err');
//   }
// })();

// readFilePro(`${__dirname}/dog.txt`) //return a promise
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //return a promise
//   })
//   //So this result variable here will then be the resolved value of this promise
//   //that returned from the previous handler, okay?
//   .then((res) => {
//     // it only ever gets called in case the promise was successful.
//     //So if it's a fulfilled promise.
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message); // return a promise
//     // fs.writeFile('dog-img.txt', res.body.message, (err) => {
//     //   console.log('random dog image');
//     // });
//   })
//   .then(() => console.log('finished'))
//   .catch((err) => {
//     //for rejected promise
//     console.log(err);
//   });

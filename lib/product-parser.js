const fs = require("fs");
const csv = require("csv-parser");
const db = require("../models");

const seed = () => {
  // const products = [];
  let count = 0;
  const pipedRead = fs
    .createReadStream(__dirname + "/../product.csv")
    .pipe(csv());
  pipedRead
    .on("data", data => {
      const cleanData = Object.keys(data).reduce(function(acc, key) {
        acc[key.trim()] = data[key].trim();
        return acc;
      }, {});
      // products.push(cleanData);
      db.Product.create(cleanData).catch(e => console.log(e));
      console.log(count);
      count++;
      pipedRead.pause();
      setTimeout(() => {
        pipedRead.resume();
      }, 50);
      //start at 7:58PM
    })
    .on("end", () => {
      //  Products.bulkCreate(products);
      // console.log(products);
      const timeNow = new Date();
      console.log(timeNow.toLocaleTimeString("en-US"));
      process.exit();
    });

  // (async function() {
  //   await on;
  // })();
};

seed();

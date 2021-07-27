const math = require("./math");

// for (let index = 1; index < 8000; index++) {
//   let now = new Date().toISOString();
//   console.log(`${now} Fibonacci for ${index} ${math.fibonacciLoop(index)}`);
// }

(async () => {
  for (var num = 1; num < 8000; num++) {
    await new Promise((resolve, reject) => {
      math.fibonacciAsync(num, (err, fibo) => {
        if (err) reject(err);
        else {
          let now = new Date().toISOString();
          console.log(
            `${now} Fibonacci for ${num} = ${fibo}`
          );
          resolve();
        }
      });
    });
  }
})().catch((err) => {
  console.error(err);
});

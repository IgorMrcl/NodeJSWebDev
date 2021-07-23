const fs = require('fs').promises;

// async function listFiles() {
//   try {
//     let dir = '.';
//     if(process.argv[2]) dir = process.argv[2];
//     const files = await fs.readdir(dir);
    
//     for (const file of files) {
//       console.log(file);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

(async () => {
  var dir = '.';
  if (process.argv[2]) dir = process.argv[2];
  const files = await fs.readdir(dir);
  for (let fn of files) {
    console.log(fn);
  }
})().catch(err => {console.error(err); });

//listFiles();

//console.log(process.argv[2]);

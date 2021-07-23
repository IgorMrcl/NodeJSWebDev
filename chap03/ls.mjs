import { promises as fs } from "fs";

async function listFiles() {
  const files = await fs.readdir(".");
  files.forEach((element) => {
    console.log(element);
  });
}

listFiles().catch((err) => {
  console.error(err);
});

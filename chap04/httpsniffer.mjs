import * as util from "util";
import * as url from "url";

const timestamp = () => {
  return new Date().toISOString();
};

export function sniffOn(server) {
  server.on("request", (req, res) => {
    console.log(`${timestamp()} request`);
    console.log(`${timestamp()} ${reqToString(req)}`);
  });

  server.on("close", (errno) => {
    console.log(`${timestamp()} close errno=${errno}`);
  });

  server.on("checkContinue", (req, res) => {
    console.log(`${timestamp()} checkContinue`);
    console.log(`${timestamp()} ${reqToString(req)}`);
    res.writeContinue();
  });
  server.on("upgrade", (req, socket, head) => {
    console.log(`${timestamp()} upgrade`);
    console.log(`${timestamp()} ${reqToString(req)}`);
  });
  server.on("clientError", () => {
    console.log("clientError");
  }); // server.on('connection', e_connection);
}

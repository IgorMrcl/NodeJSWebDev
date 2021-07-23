//simple commonJS module
var count = 0;

exports.next = function () {
  return ++count;
};

exports.hello = function () {
  return "hello, world!";
};

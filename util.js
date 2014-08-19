var
util = require('util'),
fs = require('fs');

function read(fn) {
  return fs.readFileSync(fn);
}

function write(fn, text, enc) {
  return fs.writeFileSync(fn, text, {encoding: enc});
}

function log() {
  console.error(util.format.apply(null, arguments));
}

function isShow(c) {
  return   8 <= c && c <=  10 ||
          12 <= c && c <=  13 ||
          32 <= c && c <= 126 ||
         161 <= c && c <= 255;
}

function fill(c, n, s) {
  return (Array(n+1).join(c) + s).slice(-n);
}

function toShowCharBuffer(c) {
  return c === 34 ? new Buffer('\\"') : c === 92 ? new Buffer('\\\\') :
         isShow(c) ? new Buffer([c]) : new Buffer('\\' + fill('0', 3, c.toString(8)));
}

function appendShowBuffer(b, s) {
  return s.map(function (c) {
    return toShowCharBuffer(c);
  }).reduce(function (b, cs) {
    return Buffer.concat([b, cs]);
  }, b);
}

global.read = read;
global.write = write;
global.log = log;
global.isShow = isShow;
global.fill = fill;
global.toShowCharBuffer = toShowCharBuffer;
global.appendShowBuffer = appendShowBuffer;

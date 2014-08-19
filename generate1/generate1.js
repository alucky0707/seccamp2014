'use strict';

require('../util');

var
buf = read('../text.md'),
src = new Buffer(0);

log("buf.length = %d", buf.length);

// append header
src = Buffer.concat([src, new Buffer('const char main[] =\n')]);
src = Buffer.concat([src, new Buffer('  "')]);
src = appendShowBuffer(src, [0x48, 0x31, 0xc0]);                         // xor %rax, %rax
src = appendShowBuffer(src, [0x48, 0x89, 0xc2]);                         // mov %rax, %rdx
src = appendShowBuffer(src, [0xfe, 0xc0]);                               // inc %al
src = appendShowBuffer(src, [0x48, 0x89, 0xc7]);                         // mov %rax, %rdi
src = appendShowBuffer(src, [0xb2, 0x08]);                               // mov $8, %dl
src = appendShowBuffer(src, [0x49, 0xc7, 0xc2, 0xff, 0xff, 0xff, 0xff]); // mov $0xffffffffffffffff, %r10
src = Buffer.concat([src, new Buffer('"')]);

// append body
var
len = buf.length,
i, j;

for (i = 0; len > 0; len -= 8) {
  src = Buffer.concat([src, new Buffer('\n  "')]);
  src = appendShowBuffer(src, [0x48, 0xbd]);                             // movabs <str>, %rbp
  // append as little endian
  for (j = i + 8; i < j; i++) {
    src = Buffer.concat([src, toShowCharBuffer((buf.length > i ? buf[i] : 0) ^ 0xff)]);
  }
  src = appendShowBuffer(src, [0x4c, 0x31, 0xd5]);                       // xor %r10, %rbp
  src = appendShowBuffer(src, [0x55]);                                   // push %rbp
  // first time only
  if (i === 8) {
    src = appendShowBuffer(src, [0x48, 0x89, 0xe6]);                     // mov %rsp, %rsi
  }
  src = appendShowBuffer(src, [0x0f, 0x05]);                             // syscall
  src = appendShowBuffer(src, [0x5d]);                                   // pop %rbp
  src = appendShowBuffer(src, [0x48, 0x89, 0xf8]);                       // mov %rdi, %rax
  src = Buffer.concat([src, new Buffer('"')]);
}

// append footer
src = Buffer.concat([src, new Buffer('\n  "')]);
src = appendShowBuffer(src, [0xb0, 0x3c]);                               // mov $60, %al
src = appendShowBuffer(src, [0x48, 0x31, 0xff]);                         // xor %rdi, %rdi
src = appendShowBuffer(src, [0x0f, 0x05]);                               // syscall
src = Buffer.concat([src, new Buffer('";\n')]);

write('generate1.c', src, null);
log('generate1.c created');

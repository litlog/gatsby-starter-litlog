#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.11')
  .command('creating <slug>', 'add creating change for <slug>')
  .command('created <slug> <comment> [timestamp]', 'add created change for <slug> with comment [comment]')
  .command('updating <slug>', 'add updating change for <slug>')
  .command('updated <slug> <comment> [timestamp]', 'add updated change for <slug> with comment [comment]')
  .parse(process.argv);

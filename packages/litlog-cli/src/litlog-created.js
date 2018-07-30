#!/usr/bin/env node

const program = require('commander');
const script = require("./script")

program
  .action(function(slug, comment, timestamp) {
    const args = program.rawArgs;
    if (args.length > 3) {
      script.run("created", args[2], args[3], args[4]);
    } else {
      script.run("created", args[2], args[3]);
    }
  });

program
  .parse(process.argv);

// console.log(program.args);
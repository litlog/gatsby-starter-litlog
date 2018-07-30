#!/usr/bin/env node

const program = require('commander');
const script = require("./script")

program
  .action(function(slug) {
    script.run("updating", slug);
  });

program
  .parse(process.argv);

// console.log(program.args);
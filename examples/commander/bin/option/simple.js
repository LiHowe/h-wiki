const { program } = require('commander')



const simple = program
    .option('-d --debug', 'debug', true)
simple.parse()
console.log(simple.opts())